#!/usr/bin/env node
// Generates the default Open Graph image (1200 x 630): the headline on the navy surface in Source Serif 4 (docs/08 section 2, docs/15).
// Usage: node scripts/generate-og.mjs
// Writes public/og-default.png. Run it again if the wording or the tokens change.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { chromium } from "@playwright/test";

const file = (...parts) => pathToFileURL(join("node_modules", ...parts)).href;
const tokens = readFileSync("src/styles/tokens.css", "utf8");
const get = (name) => tokens.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`))?.[1] ?? "#ffffff";
const navy = get("navy-900"), white = get("on-dark"), muted = get("on-dark-2"), teal = get("teal-400");

const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:"Serif";font-weight:400 700;src:url("${file("@fontsource-variable", "source-serif-4", "files", "source-serif-4-latin-wght-normal.woff2")}")}
@font-face{font-family:"Sans";font-weight:400 700;src:url("${file("@fontsource-variable", "instrument-sans", "files", "instrument-sans-latin-wght-normal.woff2")}")}
html,body{margin:0;width:1200px;height:630px;background:${navy};color:${white};overflow:hidden}
.wrap{box-sizing:border-box;width:1200px;height:630px;padding:76px 88px;display:flex;flex-direction:column;justify-content:space-between}
.brand{font:600 30px/1 "Sans";letter-spacing:.01em;color:${white}}
.brand b{color:${teal};font-weight:600}
h1{font:500 88px/1.06 "Serif";letter-spacing:-.018em;margin:0;max-width:960px}
.rule{height:3px;width:96px;background:${teal};margin-bottom:34px}
.line{font:500 28px/1.4 "Sans";color:${muted}}
</style><div class="wrap"><div class="brand">ServePoint <b>Canada</b></div><div><div class="rule"></div><h1>Process serving in Vancouver, BC</h1></div><div class="line">First attempt typically within 24 hours</div></div>`;

mkdirSync("public", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
writeFileSync("public/og-default.png", await page.screenshot({ type: "png" }));
await browser.close();
console.log("Wrote public/og-default.png");
