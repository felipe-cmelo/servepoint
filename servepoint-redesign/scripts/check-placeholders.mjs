#!/usr/bin/env node
// Looks for unconfirmed facts and leftover placeholders.
// Default: warns on [CONFIRM markers in src/ and content/, fails on lorem ipsum in dist/.
// With --strict (use for production): any [CONFIRM, TODO or lorem in dist/ fails the build.
// Usage: node scripts/check-placeholders.mjs [--strict]

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const strict = process.argv.includes("--strict");
const skipDirs = new Set(["node_modules", ".astro", ".shots", ".git"]);

function listFiles(dir, exts, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (skipDirs.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) listFiles(full, exts, out);
    else if (exts.has(extname(name))) out.push(full);
  }
  return out;
}

function find(files, pattern) {
  const hits = [];
  for (const file of files) {
    readFileSync(file, "utf8").split("\n").forEach((line, i) => {
      if (pattern.test(line)) hits.push(`${file}:${i + 1}  ${line.trim().slice(0, 120)}`);
    });
  }
  return hits;
}

const sourceFiles = [
  ...listFiles("src", new Set([".astro", ".md", ".mdx", ".ts", ".json"])),
  ...listFiles("content", new Set([".md"])),
];
const builtFiles = listFiles("dist", new Set([".html", ".xml", ".txt"]));

const openConfirms = find(sourceFiles, /\[CONFIRM/);
const builtConfirms = find(builtFiles, /\[CONFIRM/);
const builtLorem = find(builtFiles, /lorem ipsum/i);
const builtTodo = find(builtFiles, /\bTODO\b/);

let failed = false;

if (openConfirms.length) {
  console.warn(`${openConfirms.length} unconfirmed item(s) in source (listed in docs/12-open-questions-for-client.md):`);
  openConfirms.slice(0, 40).forEach((l) => console.warn("  " + l));
  if (openConfirms.length > 40) console.warn(`  ... and ${openConfirms.length - 40} more`);
}

if (builtLorem.length) {
  console.error("Lorem ipsum found in dist/:");
  builtLorem.forEach((l) => console.error("  " + l));
  failed = true;
}

if (strict) {
  if (builtConfirms.length) {
    console.error(`[CONFIRM] markers present in dist/ (${builtConfirms.length}):`);
    builtConfirms.forEach((l) => console.error("  " + l));
    failed = true;
  }
  if (builtTodo.length) {
    console.error("TODO found in dist/:");
    builtTodo.forEach((l) => console.error("  " + l));
    failed = true;
  }
}

if (failed) process.exit(1);
console.log(strict ? "Strict placeholder check passed." : "Placeholder check passed (warnings above, if any).");
