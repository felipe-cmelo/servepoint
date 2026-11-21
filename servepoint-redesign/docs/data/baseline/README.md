# Baseline report: current ServePoint Canada site

Audited 2026-11-20 (Phase 0, docs/10 tasks 5 and 9). Re-run with `node scripts/baseline-audit.mjs <origin> docs/data/baseline` in Phase 6 to compare.

## What was audited

| Target | Result |
|---|---|
| `https://servepointcanada.com/` and `https://www.servepointcanada.com/` | **Not the site.** Both return a 114 byte page that redirects to `/lander`, which is a GoDaddy domain parking page (`lander_type=parkweb`). No ServePoint content is served on the production domain today |
| `https://agent-6af447cc3107871e--fascinating-kulfi-be8328.netlify.app/` (staging, from docs/01) | Live. Served by Netlify. All nine sitemap URLs return 200. This is the only copy of the site that can be audited, and everything below is from it |

The staging host looks like a temporary Netlify agent preview. It can disappear, which is why the pages are saved as screenshots and `crawl.json`, and the three images and the stylesheet are saved here.

## The six findings, with evidence

**1. `servepointcanada.com` is a GoDaddy parking page. Only staging is live.**
`curl -i https://servepointcanada.com/` and the same for `www` return `200 OK`, `Content-Length: 114`, and this body:
`<!DOCTYPE html><html><head><script>window.onload=function(){window.location.href="/lander"}</script></head></html>`.
`/lander` returns a React parking page (`server: openresty`, cookie `lander_type=parkweb`, scripts from `img1.wsimg.com`, which is GoDaddy's CDN). No ServePoint content is served. The staging sitemap, canonicals and `og:` tags all name this domain. A `site:servepointcanada.com` web search returned nothing from the domain, which is consistent but not proof, so confirm in Search Console only if the owner already has a property. Effect: no search equity to protect, DNS must move to Netlify at launch (docs/12 question 17). The staging host (`agent-6af447cc3107871e--fascinating-kulfi-be8328.netlify.app`) is a Netlify agent preview that may expire.

**2. The logo is navy and teal.** Exact values read from the pixels: navy `#002049`, teal `#01A4B7` (reversed logo: white and `#2DC8DA`). Full analysis and a proposal in [logo-colour.md](logo-colour.md). `tokens.css` is unchanged.

**3. The live form shows no `data-netlify`. That is expected after a Netlify deploy (docs/07 section 5.2), so it is not evidence of a fault.**
Served markup: `<form action='/thank-you/' method='POST' name='service-request' novalidate>`, enctype `application/x-www-form-urlencoded`, one submit button "Submit Instructions". Hidden `form-name` (value `service-request`) and a text input `bot-field` labelled "Leave this empty:". Visible fields, with `name` and required flag:

| name | type | required | label |
|---|---|---|---|
| `firm` | text | yes | Firm or Organization |
| `name` | text | yes | Name |
| `email` | email | yes | Email |
| `phone` | tel | no | Phone Number |
| `court` | text | no | Court File Number |
| `service` | select | yes | Service Required (Process Serving, Court Services, Corporate Search, Not Sure with a long dash then Please Advise) |
| `recipient` | text | yes | Person or Company to Be Served |
| `address` | text | yes | Service Address |
| `urgency` | select | yes | Urgency (Standard, Rush with a long dash Within 48 Hours, Rush with a long dash Same Day) |
| `deadline` | date | no | Deadline Date |
| `notes` | textarea | no | Additional Service Details |

Registration was **not** confirmed and no test submission was made, because it would send a real request to the owner. Open: docs/12 question 24 (Forms tab, notification recipient, CSV export of old submissions before the new build is deployed). The old form name is `service-request`. The new one is `request-service` (docs/07 section 5.1), so old and new submissions will be stored under different names.

**4. `/thank-you/` exists.** `200`, `<title>Request Received | ServePoint Canada</title>`, `robots noindex,follow`, canonical `https://servepointcanada.com/thank-you/`. It says: "Thank you. We'll review your instructions and confirm availability and next steps the same business day." Then "Send Us Your Documents": "You may now email your documents to [the email address]. Please include the service address and deadline so they can be prepared for service." Then "If your matter is urgent, call [the phone number] rather than waiting for our reply. Rush requests are prioritized on receipt." A "Back to the Homepage" link and four "What happens next?" items (review, first attempt typically within 24 hours, updates, sworn affidavit of service). docs/07 section 6.1 redirects it to `/request-service/received/`. The old page does not show a reference number.

**5. Meta descriptions are over 155 characters on 7 of 9 pages** (rule: 120 to 155, docs/08 section 1).

| Page | Length |
|---|---|
| `/` | 182 |
| `/services/process-serving/` | 179 |
| `/areas/` | 175 |
| `/for-us-law-firms/` | 173 |
| `/pricing/` | 172 |
| `/services/corporate-search/` | 164 |
| `/contact/` | 160 |
| `/about/`, `/services/court-services/` | 153 each (within the limit) |

Source: `crawl.json`, field `description` of each page.

**6. Mobile LCP is 2.1 s.** Lighthouse 13.6.0 on the staging home page, three runs, 2026-11-20: 2095, 2017 and 2200 ms (median 2095 ms, `lighthouse/home-mobile-run1.json` to `run3.json`). CLS 0, TBT 0 ms, FCP equal to LCP in every run. Setup: Chrome 157 headless on Windows 11, Lighthouse CLI with `--only-categories=performance`, mobile form factor (412 x 823, device scale 1.75), simulated throttling (RTT 150 ms, 1638 kbps, request latency 562.5 ms, 4x CPU slowdown), benchmark index about 2360. The first single run of three pages (home, `/contact/`, `/services/process-serving/`) gave 2.1 s on each. The LCP element is the hero lead paragraph (text): about 440 ms to first byte, then about 780 ms of render delay behind two render-blocking stylesheets (`style.css` and the Google Fonts CSS). Staging is a Netlify preview, so TTFB is not representative of production.

## Other findings

- **Staging sends `X-Robots-Tag: noindex` on every response** while the markup says `index,follow`. Right for staging. It is also why Lighthouse SEO scores 54 to 69 (`is-crawlable`).
- The old site loads Newsreader, Public Sans and IBM Plex Mono from Google Fonts (third party). The rebuild self-hosts IBM Plex only.
- Titles over 60 characters: 4 of 9. Two titles contain a long dash. Schema: see the table below. `og:image` is `/assets/logo.png` on every page.

## Page inventory (staging)

Lengths are characters. Rule from docs/08: title 50 to 60, description 120 to 155.

| URL | Title (length) | Description length | H1 | JSON-LD | Words |
|---|---|---|---|---|---|
| `/` | Process Serving Vancouver \| ServePoint Canada (45) | 182 | Your Documents Served. Your Service Proven. | ProfessionalService, FAQPage | 966 |
| `/services/process-serving/` | Process Serving Vancouver & Lower Mainland \| ServePoint Canada (62) | 179 | Process Serving in Vancouver and the Lower Mainland | Service, FAQPage | 661 |
| `/services/court-services/` | Court Filing & Registry Services Vancouver \| ServePoint Canada (62) | 153 | Court Services in Vancouver and the Lower Mainland | Service | 359 |
| `/services/corporate-search/` | BC Corporate Searches for Law Firms \| ServePoint Canada (55) | 164 | Corporate Searches in BC | Service | 379 |
| `/areas/` | Areas We Serve \| Vancouver & the Lower Mainland, then a long dash and the brand (67) | 175 | Legal Support Services across Vancouver and the Lower Mainland | Service | 457 |
| `/pricing/` | Pricing \| Process Serving, Court Filing & Corporate Searches, then a long dash and the brand (80) | 172 | Pricing | OfferCatalog | 391 |
| `/for-us-law-firms/` | Process Serving in BC for US Law Firms \| ServePoint Canada (58) | 173 | Process Serving in BC for US Law Firms | FAQPage | 445 |
| `/about/` | About ServePoint Canada \| Built with Law Firms in Mind (54) | 153 | Built with Law Firms in Mind | AboutPage | 357 |
| `/contact/` | Request Service \| ServePoint Canada (35) | 160 | Request Service | none | 319 |

Head tags on every page: `lang="en-CA"`, canonical on `servepointcanada.com` with a trailing slash, `robots index,follow`, `og:type/site_name/title/description/url/image/locale`, `twitter:card summary_large_image`. `og:image` is `/assets/logo.png` on every page. There is no `theme-color`. The favicon is `/assets/favicon.png` (180 x 180). One H1 per page. No `hreflang`.

Home schema is `ProfessionalService` with `@id` `https://servepointcanada.com/#business`, `priceRange: "From $168"`, a founder and 15 `City` entries in `areaServed`. The rebuild uses `LegalService` (docs/08 section 3.1). No `aggregateRating` or `review` anywhere.

Meta descriptions over 155 characters: 7 of 9. Titles over 60: 4 of 9. Two titles carry a long dash.

## Redirects and error handling

| Request | Result |
|---|---|
| `/services/` | 301 to `/services/process-serving/` (the rebuild redirects it to `/process-serving/`) |
| `/index.html` | 301 to `/` |
| `/pricing` (no slash) | 301 to `/pricing/` |
| `/process-serving`, `/privacy/`, `/terms/`, `/accessibility/`, any unknown path | 404 with a custom 404 page (3.6 KB) |
| `/thank-you/` | 200, `noindex,follow`, title "Request Received". docs/01 said no confirmation page was found. One exists |
| `robots.txt` | `Allow: /` and the sitemap on the production host |
| `sitemap.xml` | 9 URLs, no `lastmod`, production host |

## Form (`/contact/`)

Twelve visible or hidden fields, one POST to `/thank-you/`, `application/x-www-form-urlencoded`, submit button "Submit Instructions".

Required: Firm or Organization, Name, Email, Service Required, Person or Company to Be Served, Service Address, Urgency. Optional: Phone Number, Court File Number, Deadline Date (date input), Additional Service Details. Service options: Process Serving, Court Services, Corporate Search, "Not Sure" with a long dash. Urgency options: Standard, Rush with a long dash Within 48 Hours, Rush with a long dash Same Day. Confirms docs/01 section 4.3: recipient and service address are required even for filing and search.

## Rendered design (docs/01 section 6 has the detail)

- Type: Newsreader 600 for headings, Public Sans 400/500/600/700 for text, IBM Plex Mono 400/500/600 for small labels. Loaded from Google Fonts (a third party request). The rebuild self-hosts IBM Plex only.
- Surfaces: deep navy hero and header, paper `#F4F6F8` body, teal accent buttons and eyebrows, one navy band for "Why ServePoint" and one for the closing block.
- No gradients in CSS, one small `rowIn` keyframe, a mono uppercase eyebrow above every H2, three identical service cards, three identical price tiles, and an inline SVG coverage map (title and description present) on `/areas/`.
- JavaScript: one 529 byte `main.js` (menu toggle and the copyright year). Netlify also injects `/.netlify/scripts/ar` on the preview host. It is not part of the site.

## Lighthouse (single run per page, mobile preset, simulated slow 4G, 2026-11-20)

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT | Transfer |
|---|---|---|---|---|---|---|---|---|
| `/` | 97 | 91 | 100 | 61 | 2.1 s | 0 | 0 ms | 364 KiB |
| `/contact/` | 97 | 96 | 100 | 69 | 2.1 s | 0 | 0 ms | 379 KiB |
| `/services/process-serving/` | 97 | 94 | 100 | 61 | 2.1 s | 0 | 0 ms | 390 KiB |

Failing audits: `is-crawlable` (the staging `noindex` header, expected), `link-in-text-block`, `heading-order`, and on the home page `link-text` and `dlitem`. `robots-txt` fails on one page only. The 2.1 s LCP is above the 2.0 s budget (finding 6 has the three-run median and setup). The logo PNG (180 KB, header and footer) is a separate weight cost. Full reports: `lighthouse/*.json`.

## Images

| File | Size | Used on |
|---|---|---|
| `logo-reversed.png` | 1198 x 232, 180 KB | Header and footer of every page |
| `logo.png` | 1198 x 232, 175 KB | `og:image` and schema `logo` only |
| `jasmine.jpg` | 747 x 1118, 59 KB | About. Founder on a dark grey backdrop in a black blazer |
| `favicon.png` | 180 x 180, 10 KB | Favicon |

Saved in `assets/` for reference only. Do not ship or hotlink until the owner confirms the files. Ask for the vector logo and the original headshot (docs/12 question 3). The logo colours are analysed in [logo-colour.md](logo-colour.md).

## Not done in Phase 0

- Search Console export: no access. Needed: docs/12 question 17.
- Competitor and keyword volumes (`docs/data/competitor-metrics.csv`, `keyword-seed.csv`): no Semrush, Ahrefs or Keyword Planner access. The files are unchanged.
- Index check of the production domain: inconclusive (see finding 1).
- docs/13 was **spot-checked, not verified row by row.** Checked: page inventory and titles, H1s, image count, form fields, FAQ and community counts, schema types, redirects, the coverage map. The matrix says "image map" for `/areas/`. It is an inline SVG with a title and description. No other mismatch was found. A full row-by-row pass is still open.
- Analytics: no analytics or tag scripts were found on the staging pages. Whether a Google Analytics property exists is a question for the owner.
- Form submission was not tested (finding 3).
