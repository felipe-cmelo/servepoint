# 07. Technical specification

Updated 2026-11-20 after the Phase 0 baseline. Section numbers are referenced by other documents (`CLAUDE.md`, `docs/10`, the page specs). Do not renumber them.

## 1. Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | Astro (latest stable major), static output, TypeScript strict | Content-heavy, SEO-critical site that needs near-zero JavaScript |
| Styling | Plain CSS with custom properties, `@layer`, container queries, scoped styles in `.astro` files | Full control of a distinctive look. No framework look to escape from |
| Content | Astro content collections (Markdown and MDX) with Zod schemas | Owner can edit copy and guides as text |
| Interactivity | Vanilla TypeScript islands: `RequestForm`, `CoverageMap`, `DocumentFinder`, `VancouverClock`, in-view draw (24 hour line, signatures), specimen annotations | Small scripts, no framework. Total JavaScript stays under 60 KB per page |
| Hosting | Netlify (already in use) | Redirects, headers and forms from one config |
| Forms | Phase 1: Netlify Forms. Later: Netlify Function with email provider and Turnstile | Ship fast, upgrade later without changing the front end |
| Analytics | Plausible, or GA4 with consent mode if the owner needs Google data | Cookieless by default |
| Testing | Playwright (e2e, screenshots, CSP), axe-core (accessibility), Lighthouse CI (budgets) | |
| Fonts | Fontsource packages, Latin subset, self-hosted WOFF2 (Instrument Sans, Plex Mono, Plex Serif, see `docs/15`) | No third-party font requests |

Use `npm`. Node 22 or the current LTS. Pin versions in `package.json`. Dev dependencies beyond Astro: `@playwright/test`, `@axe-core/playwright`, `@lhci/cli`, `serve`, `esbuild`.

## 2. Repository layout

```
/
  CLAUDE.md  README.md
  astro.config.mjs  netlify.toml  lighthouserc.json  package.json  tsconfig.json
  .claude/commands/                          (hidden folder: copy it with the rest)
  docs/  content/  design/  scripts/         (this package)
  public/
    favicon.svg  og-default.png  robots.txt
    fonts/                                   (only if not bundled via Fontsource)
  src/
    data/        site.ts  pricing.ts  faqs.ts  coverage-map.json   (copied from design/coverage-map-data.json)
    content/     coverage/*.md  guides/*.mdx  config.ts
    components/  SiteHeader.astro SiteFooter.astro Button.astro Surface.astro Closing.astro DataTable.astro
                 Hero.astro SpecimenAffidavit.astro ProcessSteps.astro Step.astro AttemptLine.astro Outcomes.astro
                 DocumentFinder.astro ServiceRows.astro PricingSurface.astro CoverageMap.astro
                 VancouverClock.astro RequestForm.astro FaqList.astro Breadcrumbs.astro
                 JsonLd.astro Seo.astro MobileBar.astro
    layouts/     Base.astro  Page.astro  Guide.astro
    pages/       index.astro process-serving.astro court-filing.astro corporate-search.astro
                 pricing.astro out-of-province-and-us.astro about.astro
                 request-service/index.astro  request-service/received.astro
                 coverage/index.astro  coverage/[slug].astro
                 guides/index.astro  guides/[slug].astro
                 privacy.astro terms.astro accessibility.astro 404.astro
                 dev/components.astro        (excluded from production)
    scripts/     scroll-engine.ts form.ts map.ts finder.ts clock.ts inview.ts sheet.ts
    styles/      tokens.css (copied from design/)  base.css  utilities.css
  scripts/       check-banned-patterns.mjs  check-placeholders.mjs        (exist)
                 csp-headers.mjs  check-site-facts.mjs                    (create: sections 6.3 and 4)
  tests/         e2e/*.spec.ts  a11y.spec.ts  csp.spec.ts  shots.spec.ts
```

`SiteHeader` and `SiteFooter` are the component names used in `docs/06`.

## 3. CSS architecture

- Layers declared once: `tokens, base, components, utilities`.
- Tokens only through custom properties. A lint rule (stylelint `declaration-property-value-disallowed-list` or a script) rejects raw hex outside `tokens.css`.
- Component styles are scoped. No global class soup. Avoid element-plus-class specificity conflicts: a section's padding is set by the section component only, never by its children.
- Layout helpers: `.page` (max width and padding), `.grid-12`, `.stack` (vertical rhythm), `.split` (7/5 and 5/7).
- Container queries for tables, the specimen sheet and the map panel.
- No CSS-in-JS, no utility framework.
- Set `build.inlineStylesheets: "never"` in `astro.config.mjs`. Every stylesheet is then a same-origin file and the Content-Security-Policy needs no `'unsafe-inline'` for `<style>` (section 6).

### 3.1 Scroll effects and motion

- Scroll effects are driven by CSS custom properties written by one script, `src/scripts/scroll-engine.ts` (a typed port of `design/scroll-engine.js`, about 4 KB). It writes only `--sp`, `--hp`, `--f1` to `--f4`, `--r` and the attributes `data-solid` and `data-hide` on `<html>`. Components never read scroll position.
- The defaults in `tokens.css` are the finished state. The script adds `html.js` and resets variables only when script runs and `prefers-reduced-motion` is not `reduce`. No script, reduced motion and print all show a complete page.
- One passive `scroll` listener and one `resize` listener, each only schedules a `requestAnimationFrame`. In the frame: read every `getBoundingClientRect()` first, then write every variable. Animate only `transform`, `opacity`, `clip-path`, `stroke-dashoffset` and `background-size` on small elements.
- The engine ships inline, with a tiny `html.js` flag script in `<head>` (`docs/14` Part A). Both are inline scripts, so the Content-Security-Policy lists their hashes (section 6.3). Setting a variable with `element.style.setProperty` is allowed by the policy. A suggested way to inline compiled TypeScript in `Base.astro`:

```astro
---
import { readFileSync } from "node:fs";
import { transformSync } from "esbuild";
const engine = transformSync(
  readFileSync(new URL("../scripts/scroll-engine.ts", import.meta.url), "utf8"),
  { loader: "ts", minify: true, target: "es2020" }
).code;
---
<script is:inline set:html={engine} />
```

  Phase 1 confirms this builds. If it does not, ship the engine as a normal bundled module (`/_astro/*.js`) and keep only the flag script inline. `scripts/csp-headers.mjs` hashes whatever ends up inline, so either choice works.
- Optional later: native scroll-driven animations (`animation-timeline: view()` or `scroll()`) inside `@supports (animation-timeline: scroll())`, never alongside the script on the same property. Baseline Newly available in 2026 (Chrome and Edge 115, Safari 26, Firefox 159).
- Cross-page View Transitions: `@view-transition { navigation: auto; }` as progressive enhancement. Supported in Chrome and Edge 126 and Safari 18.2. Unsupported browsers perform a normal navigation. Same-page form step changes use `document.startViewTransition` when it exists.
- `details` animation uses `::details-content` and `interpolate-size: allow-keywords`. Unsupported browsers open and close instantly.
- Spec of every effect: `docs/06` section 9. Verification: `docs/11` section "Scroll and motion".

## 4. Data files

`src/data/site.ts` is the only place for facts that appear in more than one place. The row "Site facts" in `docs/04` section 7 lists name, phone, email, areas, hours, social and founder. This shape contains all of those and adds the facts that `docs/09` approves and that several pages repeat (price, first attempt, attempts, the footer disclaimer, the URL).

```ts
export const site = {
  name: "ServePoint Canada",
  url: "https://servepointcanada.com",
  phone: { display: "778-238-2797", tel: "+17782382797" },
  email: "serve@servepointcanada.com",
  locality: "Vancouver, BC",
  founder: { name: "Jasmine Deo", credential: "LLB", role: "Founder" },
  hours: null as string | null,                        // [CONFIRM] not published today
  social: [] as { label: string; url: string }[],      // [CONFIRM] none confirmed today
  basePrice: { amount: 168, currency: "CAD" },
  firstAttempt: "within 24 hours",                     // "typically", per docs/09. The copy carries the qualifier
  attemptsIncluded: 3,
  disclaimer:
    "ServePoint Canada provides process serving and legal support services. This website does not provide legal advice.",
  areas: [
    { name: "Vancouver", slug: "vancouver", tier: 1 },
    { name: "Burnaby", slug: "burnaby", tier: 1 },
    { name: "Surrey", slug: "surrey", tier: 1 },
    { name: "Richmond", slug: "richmond", tier: 1 },
    { name: "Coquitlam", slug: "coquitlam", tier: 2 },
    { name: "New Westminster", slug: "new-westminster", tier: 2 },
    { name: "North Vancouver", slug: "north-vancouver", tier: 2 },
    { name: "Langley", slug: "langley", tier: 2 },
    { name: "Delta", slug: "delta", tier: 2 },
    { name: "Port Coquitlam", slug: "port-coquitlam", tier: 3 },
    { name: "Port Moody", slug: "port-moody", tier: 3 },
    { name: "West Vancouver", slug: "west-vancouver", tier: 3 },
    { name: "White Rock", slug: "white-rock", tier: 3 },
    { name: "Maple Ridge", slug: "maple-ridge", tier: 3 },
    { name: "Pitt Meadows", slug: "pitt-meadows", tier: 3 },
  ],
} as const;
```

Notes:
- 15 areas. Tiers match `docs/pages/coverage.md` (tier 1 launches with a city page, tier 2 after launch, tier 3 stay on the hub). Pitt Meadows stays until the owner answers `docs/12` question 8.
- A version of `site.ts` written from `docs/04` and `docs/09` alone may differ in: `url`, `locality`, `social`, `disclaimer`, `phone.tel`, the shape of `areas` (plain strings instead of objects with `slug` and `tier`), and the names of the price fields. Keep whichever names the components already use, but keep every fact above and keep `hours` as `null` until confirmed.
- `scripts/check-site-facts.mjs` fails `npm run check` if the phone number (digits in any format) or the email address appears in any `.astro`, `.ts` or `.css` file under `src/` other than `src/data/site.ts`, or in `public/`. Markdown under `src/content/` is excluded. The drafts in `content/` at the repository root are inputs and are not scanned.

`src/data/pricing.ts` holds the table. Extras use `amount: null` until confirmed, and the component renders "Confirmed before service" for null.

`src/data/faqs.ts` holds questions and answers with `pages: string[]` so each page renders its subset and FAQ schema from the same source.

## 5. Request form

### 5.1 Phase 1: Netlify Forms
- Static HTML form in `request-service/index.astro` with `name="request-service"`, `method="POST"`, `data-netlify="true"`, `netlify-honeypot="bot-field"` and `action="/request-service/received/"`.
- One HTML form containing all fields for the three services inside `<fieldset>` blocks that the script shows or hides. Hidden fields are `disabled` so they are not submitted. Every field of every variant exists in the built HTML, so Netlify registers all of them. Field names and labels are in `content/request-service.md`.
- Works without JavaScript as a single-step form.
- With JavaScript: two steps, validation on blur and submit, summary before send, `localStorage` for optional "remember my firm details" (firm, name, email, phone only).
- Reference number: generated in the browser as `SP-YYMMDD-XXXX` (4 random characters, no ambiguous letters), stored in a hidden field named `reference`. The script also sets the form `action` to `/request-service/received/?ref=SP-...` and keeps the value in `sessionStorage`. The received page reads the query string first, then `sessionStorage`. With neither (script off), the page omits the reference and says the client may quote the date and firm name when emailing documents. It is a convenience for the client's email, not a security token.
- Notifications: configured in the Netlify UI to send to the owner's email. Document the setting in the phase summary because it cannot be set in code.
- The received page is `noindex`.

Markup skeleton:

```html
<form name="request-service" method="POST" action="/request-service/received/"
      data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="request-service">
  <input type="hidden" name="reference" value="">
  <p aria-hidden="true" class="hp">
    <label>Leave this empty <input name="bot-field" tabindex="-1" autocomplete="off"></label>
  </p>
  <!-- fieldsets and fields from content/request-service.md -->
</form>
```

`.hp` is moved off screen by CSS (not `display: none` alone, not `hidden`). `tabindex="-1"` on the input keeps axe's `aria-hidden-focus` rule satisfied.

### 5.2 What Netlify does to the form at deploy
Netlify reads the built HTML at deploy time. It removes the `data-netlify` attribute (and `netlify-honeypot`) from the `<form>` tag, keeps the honeypot input, and adds a hidden `form-name` input whose value is the form's `name`. So the deployed page does not show `data-netlify` even when the form is registered. Do not treat that as a fault. Form detection must also be enabled once for the site in the Netlify UI (Forms, Enable form detection) and takes effect on the next deploy.

### 5.3 Verify the wiring (Phase 2 acceptance, Phase 5 and Phase 6 repeat it)
1. In the Netlify dashboard, Forms is enabled for the site.
2. After the first deploy of the new build, the Forms tab lists `request-service` with the expected field names.
3. `curl -s <deploy-url>/request-service/ | grep -E 'form-name|bot-field|netlify'` shows the injected `form-name` input and the honeypot input.
4. Submit a test through the browser, with JavaScript on and again with it off. The entry appears under verified submissions and the notification email reaches the owner with all fields, including `reference`.
5. Submit with `bot-field` filled (for example with a test script). It does not arrive as a verified submission.
6. The received page opens, shows the reference when the script was on, and returns `noindex`.
7. If the form does not appear in the Forms tab: confirm detection is enabled, confirm the `<form>` is in the built HTML (not rendered by script), confirm `name` is unique on the site, redeploy.

Migration from the old site: the old form may have a different name, and its submissions are stored under that name. Before the first deploy of the new build, the owner exports the old submissions as CSV and lists who receives the notification email (`docs/12` question 24).

### 5.4 Spam and limits
Netlify filters every submission with Akismet, and the honeypot adds a cheap first filter. Turnstile arrives with the function phase. Check on the owner's Netlify plan whether form submissions are capped, and look at the count in Phase 6. If the cap matters, move to the function.

### 5.5 Later: function
`netlify/functions/submit-request.ts`: validates with Zod, verifies Cloudflare Turnstile, sends email through the chosen provider (Postmark or Resend) to the owner and an acknowledgement to the sender, returns the reference number. Rate limit by IP. No data is stored beyond the email unless the owner decides otherwise. Secure file upload is a separate decision because it changes the confidentiality posture (open question 12). The function phase adds `https://challenges.cloudflare.com` to `script-src` and `frame-src` (set `USE_TURNSTILE=true`, section 6.3) and changes `form-action` or `connect-src` only if the front end posts to a different origin, which it should not.

## 6. Headers, redirects, caching

### 6.1 `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"

[build.processing]
  skip_processing = true      # no post-build rewriting of HTML or JS, which would change the inline script hashes

[[redirects]]
  from = "/services/"
  to = "/process-serving/"
  status = 301
  force = true

[[redirects]]
  from = "/services/process-serving/"
  to = "/process-serving/"
  status = 301
  force = true

[[redirects]]
  from = "/services/court-services/"
  to = "/court-filing/"
  status = 301
  force = true

[[redirects]]
  from = "/services/corporate-search/"
  to = "/corporate-search/"
  status = 301
  force = true

[[redirects]]
  from = "/areas/"
  to = "/coverage/"
  status = 301
  force = true

[[redirects]]
  from = "/for-us-law-firms/"
  to = "/out-of-province-and-us/"
  status = 301
  force = true

[[redirects]]
  from = "/contact/"
  to = "/request-service/"
  status = 301
  force = true

[[redirects]]
  from = "/thank-you/"
  to = "/request-service/received/"
  status = 301
  force = true

[[redirects]]
  from = "/index.html"
  to = "/"
  status = 301
  force = true

[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"

[[headers]]
  for = "/_astro/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

- The nine redirects are the eight in `docs/04` section 3 plus `/thank-you/`. Add a test for each in `test:e2e`.
- HTML keeps Netlify's default `max-age=0, must-revalidate`. Do not override it.
- Content-Security-Policy and `X-Robots-Tag` are not in this file on purpose. They come from the generated `dist/_headers` (section 6.3), so no header is defined in two places. Netlify joins duplicate headers into one value, and for a Content-Security-Policy that means both policies apply.
- Do not create `public/_headers`. If one exists, the generator appends to it.
- A custom 404 that links to the main services and the form.

### 6.2 Content-Security-Policy design
The generated policy is:

```
default-src 'self';
script-src 'self' 'sha256-<engine>' 'sha256-<flag>' [analytics host] [https://challenges.cloudflare.com];
style-src 'self';
style-src-attr 'unsafe-inline';
img-src 'self' data:;
font-src 'self';
connect-src 'self' [analytics host];
frame-src https://challenges.cloudflare.com;     (function phase only)
form-action 'self';
base-uri 'self';
object-src 'none';
frame-ancestors 'none';
upgrade-insecure-requests
```

Why each part:
- **Inline scripts by hash.** The scroll engine and the `html.js` flag are inline, so each is listed by SHA-256 hash. The hashes are computed from the built HTML on every build, so editing the engine never breaks the policy. No `'unsafe-inline'` for scripts.
- **JSON-LD** (`type="application/ld+json"`) is a data block and is not governed by `script-src`.
- **Styles.** Stylesheets are same-origin files (`build.inlineStylesheets: "never"`). `style-src-attr 'unsafe-inline'` allows `style="--i:0"` attributes that stagger items. It does not allow `<style>` blocks. Writing variables from script through `style.setProperty` is not blocked.
- **Netlify Forms** posts to the same origin, so `form-action 'self'` and `connect-src 'self'` are enough. No third-party form script is loaded.
- **Analytics.** Empty until chosen. For Plausible set `ANALYTICS_HOST=https://plausible.io` (or the owner's proxy path, which needs nothing extra). GA4 needs more hosts and consent mode (`docs/05` section 8), so decide that with the owner before adding it.
- **Fonts** are self-hosted (`font-src 'self'`). **Images** are same-origin or `data:`.
- Deploy previews can show console messages for scripts that Netlify itself injects. Check whether Netlify injected a script before loosening the policy. Production serves only the site's own files.

### 6.3 `scripts/csp-headers.mjs`
Wired as `"postbuild": "node scripts/csp-headers.mjs dist"`, so every `npm run build` (local and on Netlify) writes `dist/_headers`. It fails the build when a built page contains an inline event handler attribute, a `javascript:` link or an inline `<style>` block, because the policy would block them. Set `ALLOW_INDEXING=true` only on the production site, at launch. Without it every build, including staging and deploy previews, sends `X-Robots-Tag: noindex, nofollow`, so a mis-set variable fails safe.

```js
// scripts/csp-headers.mjs
// Runs after "astro build" (npm "postbuild"). Reads the built HTML, hashes every inline executable script,
// and writes dist/_headers with the Content-Security-Policy. Fails the build on anything the policy would block.
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
console.log(`CSP written to ${target}: ${hashes.size} inline script hash(es), ${pages.length} page(s), ${indexable ? "indexable" : "noindex"}`);
```

### 6.4 Verify the headers
- `npm run test:csp` (`tests/csp.spec.ts`): serve `dist/`, read the policy from `dist/_headers`, attach it to every document response with `page.route`, then visit the home page, one page of each type, `/request-service/` and `/404.html`. Scroll each page to the bottom, open the document finder and the coverage map, move to step 2 of the form, and fail on any `securitypolicyviolation` event or console error that mentions the Content Security Policy.
- After each deploy: `curl -sI https://<site>/ | grep -i -E 'content-security|x-robots|strict-transport|x-frame|referrer|permissions|x-content-type'`. Expect each header once. On production there is no `X-Robots-Tag`.
- Run `npm run test:csp` against the Netlify deploy preview URL in Phase 5 as well (`BASE_URL` environment variable), because only Netlify applies `_headers`.
- If a new third-party host is ever needed, add it to the generator through an environment variable, not by editing the output.

## 7. Performance budgets

| Metric | Budget | Lighthouse CI assertion |
|---|---|---|
| LCP (mobile, simulated slow 4G, mid-range CPU) | under 2.0 s | `largest-contentful-paint` max 2000 ms |
| CLS | under 0.05 | `cumulative-layout-shift` max 0.05 |
| INP | under 200 ms | Not measurable in a lab navigation run. `total-blocking-time` max 150 ms is the lab proxy. Field INP is read in Search Console after launch |
| JavaScript per page | under 60 KB compressed. The scroll engine (about 4 KB) runs on every page for the header. Text pages ship nothing else | `resource-summary:script:size` max 61440 bytes |
| CSS per page | under 40 KB compressed | `resource-summary:stylesheet:size` max 40960 bytes |
| Fonts | 4 WOFF2 files, Latin subset, about 85 KB (v4, `docs/15`): Instrument Sans variable, Plex Serif 400 and 500 (documents only), Plex Mono 500. Preload Instrument Sans | `resource-summary:font:size` max 112640 bytes, `resource-summary:font:count` max 5 |
| Images | AVIF or WebP, explicit width and height, `loading="lazy"` below the fold, `fetchpriority="high"` on LCP image only | Covered by the best-practices and performance scores |
| Map SVG | under 40 KB | `scripts/check-site-facts.mjs` or a test measures `src/data/coverage-map.json` and the rendered SVG |
| Category scores | performance 95, accessibility 100, best practices 100, SEO 100 | `categories:*` with `minScore` |

Notes:
- Phase 0 measured mobile LCP of 2.1 s on the current site. The rebuild keeps the 2.0 s lab budget because the LCP element on every page is text and the site ships no hero image. The risk is the web fonts: preload the two files above, use `font-display: swap` and size-adjusted fallbacks (`docs/10` Phase 0 item 2). Save the 2.1 s figure and its setup in `docs/data/baseline/`.
- Lab budgets are stricter than Google's field thresholds (LCP 2.5 s, INP 200 ms, CLS 0.1 at the 75th percentile). After launch, judge real users against the field thresholds in Search Console.
- Run each page 3 times and assert on the median run.
- The local server must compress responses, otherwise the compressed-size budgets read too high. `serve` does.

`lighthouserc.json`:

```json
{
  "ci": {
    "collect": {
      "startServerCommand": "npx serve dist -l 4321",
      "startServerReadyPattern": "Accepting connections",
      "url": [
        "http://localhost:4321/",
        "http://localhost:4321/process-serving/",
        "http://localhost:4321/pricing/",
        "http://localhost:4321/coverage/vancouver/",
        "http://localhost:4321/request-service/",
        "http://localhost:4321/privacy/"
      ],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.95 }],
        "categories:accessibility": ["error", { "minScore": 1 }],
        "categories:best-practices": ["error", { "minScore": 1 }],
        "categories:seo": ["error", { "minScore": 1 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.05 }],
        "total-blocking-time": ["error", { "maxNumericValue": 150 }],
        "resource-summary:script:size": ["error", { "maxNumericValue": 61440 }],
        "resource-summary:stylesheet:size": ["error", { "maxNumericValue": 40960 }],
        "resource-summary:font:size": ["error", { "maxNumericValue": 112640 }],
        "resource-summary:font:count": ["error", { "maxNumericValue": 5 }]
      }
    },
    "upload": { "target": "filesystem", "outputDir": ".lighthouseci" }
  }
}
```

The home page plus one page of each type: service, pricing, city, form, legal. Add the first published guide to the list in Phase 4. `lhci autorun` needs `npm run build` first, so `npm run lighthouse` is `npm run build && lhci autorun`.

## 8. Accessibility engineering

- Semantic landmarks (`header`, `nav`, `main`, `footer`), one H1, heading levels in order.
- Skip link first in the DOM.
- All interactive elements are native elements where possible (`details`, `button`, `a`, `input`).
- Focus management: on step change in the form, move focus to the step heading. On submit error, move focus to the error summary.
- `aria-live="polite"` for the map selection panel and form step status.
- Tables use `<caption>` and `<th scope>`.
- `lang="en-CA"` on `<html>`.
- `tests/a11y.spec.ts` runs axe-core with the tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` and `wcag22aa` on every built page, the 404 and the received page, with the form in both steps and with the map panel open. Zero violations.
- Manual keyboard and screen reader passes (VoiceOver and NVDA) before launch.

## 9. Privacy and compliance

### 9.1 Rules
- Do not send form content to analytics.
- Do not add marketing email capture. If added later it needs CASL-compliant consent wording.
- If cookieless analytics is used there is no cookie banner. If GA4 is used, add consent mode and a minimal banner with equal weight to accept and decline.
- The footer carries the "no legal advice" statement on every page, exactly as in `site.disclaimer`.
- The owner has the three legal pages reviewed (ideally by a lawyer) before launch. Mark each draft with a visible "Draft for owner review" comment in the source, not on the page, and keep it out of the production build once approved.

### 9.2 Facts for the privacy policy (`/privacy/`)
Write for PIPEDA, in plain language. Facts that come from how the site works:

| Topic | Fact | Status |
|---|---|---|
| What the form collects | Firm name, name, email, phone, court file number, service required, urgency, person or company to be served, service address, deadline, details, matter or file reference, and a reference number the site generates | Known (`content/request-service.md`) |
| Third parties' information | The form asks for the name and address of the person to be served, who is not the person submitting. The instructing firm provides it | Known |
| Why | To quote, carry out and record the service, and to reply | Known |
| Where it is stored | Netlify (form storage and hosting) and the owner's email inbox. Documents are sent afterwards by email | Known. Confirm any other system (`docs/12` question 23) |
| In the browser | `localStorage` keeps firm, name, email and phone only if the visitor ticks "Remember my firm details", and "Forget these details" clears it. `sessionStorage` keeps the reference number during the session | Known |
| Analytics | Plausible, cookieless, no personal data and no form content. Or "none" until chosen | Decide with the owner |
| Cookies | None set by the site | Known if Plausible or no analytics |
| Marketing email | None | Known |
| Retention | How long form entries and emails are kept | **[CONFIRM] `docs/12` question 23** |
| Requests | How to ask for access, correction or deletion: email `site.email`, or call `site.phone` | Known. Response time [CONFIRM] |
| Privacy contact | Name and email of the person responsible | **[CONFIRM]** founder |
| Updated | Date of the last review | Set at publication |

### 9.3 Facts for the terms page (`/terms/`)
Only what the business already states. No new legal promises.

| Topic | Fact | Status |
|---|---|---|
| Who | ServePoint Canada, Vancouver, BC. Founder Jasmine Deo, LLB | Known |
| No legal advice | The disclaimer text. The instructing firm decides the method of service | Known (`docs/09`) |
| What the site offers | Process serving, court filing and BC corporate searches for law firms | Known |
| Price | From $168 CAD per service. Extras are confirmed before service | Known |
| Timing | First attempt typically within 24 hours of receiving documents and instructions. Up to 3 attempts are included | Known |
| Proof | A sworn affidavit of service | Known |
| Use of the site | The site is for information and instructions. Content is not legal advice | Known |
| Liability, payment terms, cancellation, governing law | Any wording | **Owner or lawyer. Do not draft from assumptions** |
| Updated | Date | Set at publication |

### 9.4 Facts for the accessibility statement (`/accessibility/`)
- Target: WCAG 2.2 level AA. State it as a target and the date it was last checked. Do not claim full conformance.
- What was done: native controls, keyboard access to everything including the coverage map (its list works without script), visible focus, contrast pairs measured in `docs/06` section 4, `prefers-reduced-motion` respected, a complete page without JavaScript, `lang="en-CA"`.
- Known limits: record what the Phase 5 audit finds. Expected to mention: the sample affidavit is an illustration with fictional data, and the sticky sheet may be static on small screens.
- How to report a barrier: email `site.email` or call `site.phone`. Response time **[CONFIRM]**.
- Date of the last accessibility review: filled in at Phase 5.

## 10. Scripts and CI

`package.json` scripts (the two check scripts already exist in `scripts/`; the two others are created from sections 4 and 6.3):

```json
{
  "dev": "astro dev",
  "build": "astro build",
  "postbuild": "node scripts/csp-headers.mjs dist",
  "preview": "astro preview",
  "check": "astro check && npm run check:copy && npm run check:placeholders && npm run check:site-facts",
  "check:copy": "node scripts/check-banned-patterns.mjs",
  "check:placeholders": "node scripts/check-placeholders.mjs",
  "check:site-facts": "node scripts/check-site-facts.mjs",
  "shots": "playwright test tests/shots.spec.ts",
  "test:a11y": "playwright test tests/a11y.spec.ts",
  "test:e2e": "playwright test tests/e2e",
  "test:csp": "playwright test tests/csp.spec.ts",
  "lighthouse": "npm run build && lhci autorun",
  "verify": "npm run build && npm run check && npm run test:a11y && npm run test:e2e && npm run test:csp && lhci autorun"
}
```

- `npm run verify` is the one command to run before calling a phase done. It works without a git repository.
- If the project is put under version control later: a GitHub Actions workflow on pull request runs install, `npm run verify`. On the production branch also run `node scripts/check-placeholders.mjs --strict`.
- Netlify environment variables: `ALLOW_INDEXING=true` on the production site only. `ANALYTICS_HOST` when analytics is chosen. `USE_TURNSTILE=true` in the function phase.

## 11. Browser support

Last two versions of Chrome, Edge, Safari and Firefox, and iOS Safari 16 or later. Progressive enhancement: CSS features such as container queries, `text-wrap: balance`, `::details-content`, `interpolate-size` and View Transitions degrade gracefully. The sticky sheet needs a test on real iOS and Android devices (see `docs/14` B2 for the fallback).

## 12. Phase 0 baseline findings that shaped this version

| Finding | Effect |
|---|---|
| `servepointcanada.com` is a GoDaddy parking page. Only the staging deployment is live | No search equity to preserve. The redirects serve only old staging paths and inbound links. DNS must move to Netlify at launch (owner action, `docs/12` question 17). Staging and previews stay `noindex` by default (section 6.3) |
| The live form shows no `data-netlify` attribute | Expected after a Netlify deploy (section 5.2). Registration is checked in the Netlify UI and by a test submission (section 5.3). Old submissions are exported first |
| `/thank-you/` exists on the old site | Added `/thank-you/` to the redirect map (section 6.1) |
| Meta descriptions exceed 155 characters on 7 of 9 pages | No spec change. `docs/08` already limits them to 120 to 155 and `check:copy` and `docs/11` enforce it |
| Mobile LCP on the old site is 2.1 s | Budget stays 2.0 s (section 7), with the font plan and a field-data note |
| The logo is navy and teal | Colour decision in `docs/06` section 4. No change to this document |
