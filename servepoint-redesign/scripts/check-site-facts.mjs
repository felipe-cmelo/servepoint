#!/usr/bin/env node
// Fails if the phone number (digits in any format) or the email address appears in any .astro, .ts or .css
// file under src/ other than src/data/site.ts, or in any text file under public/ (docs/07 section 4).
// Markdown under src/content/ is excluded. The drafts in content/ at the repository root are inputs and are not scanned.
// Usage: node scripts/check-site-facts.mjs

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, extname, sep } from "node:path";

const srcExts = new Set([".astro", ".ts", ".css"]);
const publicExts = new Set([".txt", ".xml", ".json", ".svg", ".html", ".css", ".js", ".mjs", ".webmanifest"]);
const allowed = join("src", "data", "site.ts");

// 778-238-2797 in any format: 778 238 2797, (778) 238-2797, 778.238.2797, +1 778 238 2797, +17782382797, 7782382797.
const phone = /\(?778\)?[\s.\-– ]*238[\s.\-– ]*2797/;
const email = /serve@servepointcanada\.com/i;

function walk(dir, exts, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, exts, out);
    else if (exts.has(extname(name))) out.push(full);
  }
  return out;
}

const files = [
  ...walk("src", srcExts).filter((f) => f !== allowed),
  ...walk("public", publicExts),
].filter((f) => !f.startsWith(join("src", "content") + sep));

const problems = [];
for (const file of files) {
  readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    if (phone.test(line)) problems.push(`${file}:${i + 1}  phone number. Import it from src/data/site.ts.`);
    if (email.test(line)) problems.push(`${file}:${i + 1}  email address. Import it from src/data/site.ts.`);
  });
}

if (problems.length) {
  console.error(`Site facts check failed: ${problems.length} problem(s)\n`);
  problems.forEach((p) => console.error("  " + p));
  process.exit(1);
}
console.log(`Site facts check passed (${files.length} file(s) scanned).`);
