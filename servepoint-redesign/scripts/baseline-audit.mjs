#!/usr/bin/env node
// Baseline audit of a live or staging site (Phase 0, docs/10 task 5 and 9).
// Reads every URL in sitemap.xml, plus the legacy URLs, in a real browser and records
// head tags, headings, schema, links, images, forms, scripts, computed type and colour,
// response headers and screenshots. Re-run in Phase 6 to compare production against the baseline.
//
// Usage: node scripts/baseline-audit.mjs <origin> [outDir]
//   node scripts/baseline-audit.mjs https://example.netlify.app docs/data/baseline

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "@playwright/test";

const origin = (process.argv[2] ?? "").replace(/\/$/, "");
const outDir = process.argv[3] ?? "docs/data/baseline";
if (!origin) { console.error("Usage: node scripts/baseline-audit.mjs <origin> [outDir]"); process.exit(1); }

mkdirSync(join(outDir, "screenshots"), { recursive: true });
mkdirSync(join(outDir, "assets"), { recursive: true });

const keepHeaders = ["content-type", "cache-control", "server", "x-nf-request-id", "x-robots-tag", "strict-transport-security",
  "content-security-policy", "x-frame-options", "x-content-type-options", "referrer-policy", "permissions-policy", "link", "etag", "age"];

const slug = (u) => (new URL(u).pathname.replace(/^\/|\/$/g, "").replace(/\//g, "_") || "home");

async function text(url) {
  const r = await fetch(url, { redirect: "manual" });
  return { status: r.status, location: r.headers.get("location"), body: await r.text(), headers: Object.fromEntries(r.headers) };
}

const sitemap = await text(`${origin}/sitemap.xml`);
const robots = await text(`${origin}/robots.txt`);
const urls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
console.log(`sitemap: ${urls.length} URL(s)`);

const browser = await chromium.launch();
const results = [];

for (const u of urls) {
  // Fetch the same path on the audited origin, because sitemap hosts may point at the production domain.
  const path = new URL(u).pathname;
  const target = origin + path;
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const consoleErrors = [];
  const requests = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
  page.on("pageerror", (e) => consoleErrors.push(String(e)));
  page.on("response", async (res) => {
    const len = Number(res.headers()["content-length"] ?? 0);
    requests.push({ url: res.url(), status: res.status(), type: res.request().resourceType(), bytes: len });
  });
  const resp = await page.goto(target, { waitUntil: "networkidle" });
  const headers = Object.fromEntries(Object.entries(resp.headers()).filter(([k]) => keepHeaders.includes(k)));

  const data = await page.evaluate(() => {
    const q = (s) => [...document.querySelectorAll(s)];
    const meta = (n) => document.querySelector(`meta[name="${n}"]`)?.content ?? null;
    const prop = (p) => document.querySelector(`meta[property="${p}"]`)?.content ?? null;
    const cs = (el, p) => (el ? getComputedStyle(el).getPropertyValue(p) : null);
    const body = document.body;
    const h1 = document.querySelector("h1");
    const jsonld = q('script[type="application/ld+json"]').map((s) => { try { return JSON.parse(s.textContent); } catch { return { parseError: true }; } });
    const host = location.host;
    const links = q("a[href]").map((a) => ({ href: a.href, text: a.textContent.trim().slice(0, 60) }));
    const internal = links.filter((l) => { try { return new URL(l.href).host === host; } catch { return false; } });
    const hosts = {};
    links.forEach((l) => { try { const h = new URL(l.href).host; hosts[h] = (hosts[h] ?? 0) + 1; } catch { /* mailto, tel */ } });
    const label = (f) => {
      if (f.labels?.[0]) return f.labels[0].textContent.trim().replace(/\s+/g, " ");
      return f.getAttribute("aria-label") ?? null;
    };
    return {
      finalUrl: location.href,
      lang: document.documentElement.lang,
      title: document.title,
      description: meta("description"),
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
      robotsMeta: meta("robots"),
      viewport: meta("viewport"),
      themeColor: meta("theme-color"),
      icons: q('link[rel~="icon"], link[rel="apple-touch-icon"]').map((l) => l.href),
      og: Object.fromEntries(q('meta[property^="og:"]').map((m) => [m.getAttribute("property"), m.content])),
      twitter: Object.fromEntries(q('meta[name^="twitter:"]').map((m) => [m.name, m.content])),
      hreflang: q('link[rel="alternate"][hreflang]').map((l) => [l.hreflang, l.href]),
      h1s: q("h1").map((h) => h.textContent.trim().replace(/\s+/g, " ")),
      headings: q("h2,h3,h4").map((h) => `${h.tagName.toLowerCase()}: ${h.textContent.trim().replace(/\s+/g, " ").slice(0, 80)}`),
      wordCount: (body.innerText.match(/\S+/g) ?? []).length,
      jsonld,
      jsonldTypes: jsonld.flatMap((j) => (j["@graph"] ?? [j]).map((n) => n["@type"])).flat(),
      linkCount: links.length,
      internalLinkCount: internal.length,
      linkHosts: hosts,
      images: q("img").map((i) => ({ src: i.currentSrc || i.src, alt: i.getAttribute("alt"), w: i.naturalWidth, h: i.naturalHeight, loading: i.loading, width: i.getAttribute("width"), height: i.getAttribute("height") })),
      scripts: q("script[src]").map((s) => s.src),
      inlineScripts: q("script:not([src]):not([type='application/ld+json'])").length,
      stylesheets: q('link[rel="stylesheet"]').map((l) => l.href),
      inlineStyleBlocks: q("style").length,
      skipLink: !!q("a[href^='#']").find((a) => /skip/i.test(a.textContent)),
      landmarks: { header: q("header").length, nav: q("nav").length, main: q("main").length, footer: q("footer").length },
      forms: q("form").map((f) => ({
        action: f.getAttribute("action"), method: f.method, name: f.getAttribute("name"),
        netlify: f.hasAttribute("data-netlify") || f.hasAttribute("netlify"), honeypot: f.getAttribute("data-netlify-honeypot") ?? f.getAttribute("netlify-honeypot"),
        enctype: f.enctype,
        fields: [...f.elements].filter((e) => e.name || e.id).map((e) => ({
          name: e.name || e.id, tag: e.tagName.toLowerCase(), type: e.type, required: e.required, label: label(e),
          hidden: e.type === "hidden" || getComputedStyle(e).display === "none" || e.closest("[hidden]") !== null || e.getBoundingClientRect().width === 0,
          options: e.tagName === "SELECT" ? [...e.options].map((o) => o.textContent.trim()) : undefined,
        })),
        submit: [...f.querySelectorAll("button, input[type=submit]")].map((b) => (b.textContent || b.value).trim()),
      })),
      computed: {
        bodyFont: cs(body, "font-family"), bodySize: cs(body, "font-size"), bodyLineHeight: cs(body, "line-height"),
        bodyColor: cs(body, "color"), bodyBackground: cs(body, "background-color"),
        h1Font: cs(h1, "font-family"), h1Size: cs(h1, "font-size"), h1Weight: cs(h1, "font-weight"), h1Color: cs(h1, "color"), h1Style: cs(h1, "font-style"),
        headerBackground: cs(document.querySelector("header"), "background-color"),
        firstButton: (() => { const b = document.querySelector("a.btn, .button, button, a[class*=btn], a[class*=button]"); return b ? { text: b.textContent.trim(), bg: cs(b, "background-color"), color: cs(b, "color"), radius: cs(b, "border-radius"), font: cs(b, "font-family") } : null; })(),
      },
      fontsLoaded: [...document.fonts].filter((f) => f.status === "loaded").map((f) => `${f.family} ${f.weight} ${f.style}`),
      hasGradient: q("*").some((e) => /gradient/.test(getComputedStyle(e).backgroundImage)),
      hasBoxShadow: q("*").filter((e) => getComputedStyle(e).boxShadow !== "none").length,
      animatedElements: q("*").filter((e) => getComputedStyle(e).animationName !== "none" || parseFloat(getComputedStyle(e).transitionDuration) > 0).length,
      bodyTextSample: body.innerText.trim().slice(0, 300),
    };
  });

  const total = requests.reduce((s, r) => s + r.bytes, 0);
  const byType = {};
  requests.forEach((r) => { byType[r.type] = (byType[r.type] ?? 0) + 1; });

  await page.screenshot({ path: join(outDir, "screenshots", `${slug(u)}-1280.png`), fullPage: true });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload({ waitUntil: "networkidle" });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  await page.screenshot({ path: join(outDir, "screenshots", `${slug(u)}-375.png`), fullPage: true });

  results.push({ sitemapUrl: u, auditedUrl: target, status: resp.status(), headers, consoleErrors, requestCount: requests.length, requestsByType: byType, declaredBytes: total, horizontalOverflowAt375: overflow, ...data });
  console.log(`${resp.status()} ${path} "${data.title}"`);
  await ctx.close();
}

// Legacy URL, host and protocol checks
const checks = [];
const probe = async (label, url) => {
  try { const r = await text(url); checks.push({ label, url, status: r.status, location: r.location }); }
  catch (e) { checks.push({ label, url, error: String(e) }); }
};
for (const p of ["/services/", "/services/process-serving/", "/services/court-services/", "/services/corporate-search/", "/areas/", "/pricing/", "/for-us-law-firms/", "/about/", "/contact/", "/index.html", "/process-serving", "/pricing", "/this-page-does-not-exist/", "/privacy/", "/terms/", "/accessibility/"]) {
  await probe(`path ${p}`, origin + p);
}
await browser.close();

const assets = new Set();
results.forEach((r) => r.images.forEach((i) => i.src && assets.add(i.src)));
for (const href of assets) {
  try {
    const res = await fetch(href);
    if (!res.ok) continue;
    const name = new URL(href).pathname.split("/").pop();
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(join(outDir, "assets", name), buf);
    console.log(`asset ${name} (${buf.length} bytes)`);
  } catch (e) { console.warn("asset failed", href, String(e)); }
}

writeFileSync(join(outDir, "crawl.json"), JSON.stringify({ origin, auditedAt: new Date().toISOString(), sitemap: { status: sitemap.status, urls, headers: sitemap.headers }, robots: { status: robots.status, body: robots.body }, checks, pages: results }, null, 2));
console.log(`Wrote ${join(outDir, "crawl.json")}`);
