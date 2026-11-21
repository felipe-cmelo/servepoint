#!/usr/bin/env node
// Fails if user-facing source contains em dashes or banned phrases.
// Scans src/ and content/ for .astro .md .mdx .ts .tsx .json .css files.
// Usage: node scripts/check-banned-patterns.mjs [dir ...]

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const roots = process.argv.slice(2).length ? process.argv.slice(2) : ["src", "content"];
const exts = new Set([".astro", ".md", ".mdx", ".ts", ".tsx", ".json", ".css"]);

const EM_DASH = "\u2014";
const banned = [
  "seamless", "leverage", "unlock", "elevate", "streamline", "cutting-edge",
  "state-of-the-art", "game-changer", "game changer", "robust", "tailored solutions",
  "world-class", "peace of mind", "trusted partner", "we pride ourselves",
  "second to none", "one-stop shop", "next level", "fast-paced world", "at the end of the day",
  "leading provider", "industry-leading", "best-in-class", "top-notch", "look no further",
  "committed to excellence", "your trusted", "premier",
];

const skipDirs = new Set(["node_modules", "dist", ".astro", ".shots", ".git"]);
const problems = [];

function walk(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    if (skipDirs.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full);
    else if (exts.has(extname(name))) scan(full);
  }
}

function scan(file) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (line.includes(EM_DASH)) {
      problems.push(`${file}:${i + 1}  em dash found. Use a period, comma or colon.`);
    }
    const lower = line.toLowerCase();
    for (const phrase of banned) {
      if (lower.includes(phrase)) {
        problems.push(`${file}:${i + 1}  banned phrase "${phrase}".`);
      }
    }
    if (/!\s*(<|$|\s)/.test(line) && !/<!--|<!doctype|!==|!=|!important/i.test(line) && /^\s*[A-Za-z].*[a-z]!\s*$/.test(line)) {
      problems.push(`${file}:${i + 1}  exclamation mark at end of sentence.`);
    }
  });
}

roots.forEach(walk);

if (problems.length) {
  console.error(`Copy check failed: ${problems.length} problem(s)\n`);
  problems.forEach((p) => console.error("  " + p));
  process.exit(1);
}
console.log("Copy check passed.");
