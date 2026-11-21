// scripts/csp-headers.mjs
// Runs after "astro build" (npm "postbuild"). Reads the built HTML, hashes every inline executable script,
// writes dist/_headers with the Content-Security-Policy (Netlify) and puts the same policy in a <meta> element in every page
// (Vercel and any static host). Fails the build on anything the policy would block.
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const dist = process.argv[2] ?? "dist";
const indexable = process.env.ALLOW_INDEXING === "true";   // set only on the production site, at launch
const analyticsHost = process.env.ANALYTICS_HOST ?? "";    // for example https://plausible.io. Empty until chosen
const turnstile = process.env.USE_TURNSTILE === "true";    // function phase only

const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (name.endsWith(".html")) pages.push(full);
  }
})(dist);

const hashes = new Set();
const problems = [];
const scriptRe = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const handlerRe = /<[a-zA-Z][^>]*?\son[a-z]+\s*=\s*["']/;

for (const file of pages) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(scriptRe)) {
    const [, attrs, body] = m;
    if (/\bsrc\s*=/.test(attrs)) continue;                    // external file, covered by 'self'
    const type = (attrs.match(/\btype\s*=\s*["']?([^"'\s>]+)/i) || [])[1];
    if (type && !/^(module|text\/javascript|application\/javascript)$/i.test(type)) continue; // JSON-LD and other data blocks never run
    hashes.add(`'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`);
  }
  const markup = html.replace(scriptRe, "");
  if (handlerRe.test(markup)) problems.push(`${file}: inline event handler attribute (blocked by the policy)`);
  if (/href\s*=\s*["']\s*javascript:/i.test(markup)) problems.push(`${file}: javascript: URL (blocked by the policy)`);
  if (/<style\b/i.test(markup)) problems.push(`${file}: inline <style> block (set build.inlineStylesheets to "never")`);
}
if (problems.length) {
  console.error("CSP check failed:\n  " + problems.join("\n  "));
  process.exit(1);
}

const extra = [analyticsHost, turnstile ? "https://challenges.cloudflare.com" : ""].filter(Boolean).join(" ");
const csp = [
  "default-src 'self'",
  ["script-src 'self'", ...hashes, extra].filter(Boolean).join(" "),
  "style-src 'self'",
  "style-src-attr 'unsafe-inline'",                           // style="--i:0" attributes only. Stylesheets stay 'self'
  "img-src 'self' data:",
  "font-src 'self'",
  ["connect-src 'self'", analyticsHost].filter(Boolean).join(" "),
  turnstile ? "frame-src https://challenges.cloudflare.com" : "",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].filter(Boolean).join("; ");

const target = join(dist, "_headers");
const previous = existsSync(target) ? readFileSync(target, "utf8").trimEnd() + "\n\n" : "";
let block = `/*\n  Content-Security-Policy: ${csp}\n`;
if (!indexable) block += "  X-Robots-Tag: noindex, nofollow\n";
writeFileSync(target, previous + block);

// A <meta> copy of the same policy in every page, for hosts that do not read dist/_headers (Vercel and any plain static host).
// It is built from the same hashes, so it can never go out of date. A meta element may not carry frame-ancestors, report-uri or
// sandbox, so framing is covered by the X-Frame-Options header (netlify.toml and vercel.json).
const metaPolicy = csp
  .split("; ")
  .filter((d) => !/^(frame-ancestors|report-uri|sandbox)\b/.test(d))
  .join("; ");
const metaTag = `<meta http-equiv="Content-Security-Policy" content="${metaPolicy}">`;
for (const file of pages) {
  let html = readFileSync(file, "utf8")
    .replace(/<meta http-equiv="Content-Security-Policy"[^>]*>/i, "")
    .replace(/<head([^>]*)>/i, (open) => `${open}${metaTag}`);
  // Until ALLOW_INDEXING is "true" the site must not be indexed on any host: Netlify gets the X-Robots-Tag header above,
  // and every page says it in its robots meta element, which also covers Vercel and previews.
  if (!indexable) html = html.replace(/<meta name="robots" content="[^"]*"\s*\/?>/i, '<meta name="robots" content="noindex,nofollow">');
  writeFileSync(file, html);
}
console.log(`CSP written to ${target} and as a meta element in ${pages.length} page(s): ${hashes.size} inline script hash(es), ${indexable ? "indexable" : "noindex"}`);
