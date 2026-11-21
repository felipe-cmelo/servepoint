# 04. Information architecture

## 1. Principles

1. Organize by what a law firm is trying to do, not by company departments.
2. One page per primary keyword and per decision.
3. Flat, readable URLs. Lowercase, hyphenated, trailing slash.
4. Every page has one primary action: Request service.
5. The navigation fits on one line at 1280 px with no dropdown required to find the main services.

## 2. Sitemap

```
/                                     Home
/process-serving/                     Process serving in Vancouver, BC
/court-filing/                        Court filing and registry services
/corporate-search/                    BC corporate search
/pricing/                             Pricing
/coverage/                            Coverage: Vancouver and the Lower Mainland
  /coverage/vancouver/                City pages (tier 1 at launch)
  /coverage/burnaby/
  /coverage/surrey/
  /coverage/richmond/
  /coverage/[city]/                   Tier 2 and 3 added over time
/out-of-province-and-us/              Instructing from outside BC
/guides/                              Guides hub
  /guides/[slug]/                     Guides (see docs/03 section 6)
/about/                               About ServePoint and the founder
/request-service/                     Request service (form)
/privacy/
/terms/
/accessibility/
/404
/sitemap.xml  /robots.txt
```

## 3. Redirects (301, in `netlify.toml`)

| From | To |
|---|---|
| `/services/` | `/process-serving/` |
| `/services/process-serving/` | `/process-serving/` |
| `/services/court-services/` | `/court-filing/` |
| `/services/corporate-search/` | `/corporate-search/` |
| `/areas/` | `/coverage/` |
| `/for-us-law-firms/` | `/out-of-province-and-us/` |
| `/contact/` | `/request-service/` |
| `/thank-you/` | `/request-service/received/` |
| `/index.html` | `/` |

Add a test for each in `test:e2e`. Phase 0 found the production domain parked and only staging live, so these redirects serve the old staging paths and any inbound links, not search equity.

## 4. Navigation

### Header (desktop, 1280 px)
Logo (links home) · Process serving · Court filing · Corporate search · Pricing · Coverage · Out of province · Guides · About · phone number · **Request service** (button)

That is eight text links. Rendered in `design/direction-specimen.html`, eight links plus the phone number and the button do not fit on one line at 1280 px, so build the grouped version:

- **Services**: Process serving, Court filing, Corporate search (a simple disclosure menu, keyboard operable)
- Pricing · Coverage · Out of province · Guides · About

The phone number is a link (`tel:+17782382797`) and stays visible at every width. At under 900 px the header collapses to logo, **Call** and **Menu**. The menu is a full-screen sheet with large targets (minimum 48 px).

### Persistent mobile bar
At under 700 px a bottom bar with two actions: **Call 778-238-2797** and **Request service**. It hides while the form has focus.

### Footer
Four groups. No repeated blocks of marketing copy.

| Group | Links |
|---|---|
| Services | Process serving, Court filing, Corporate search, Pricing |
| Coverage | Vancouver, Burnaby, Surrey, Richmond, All areas |
| Company | About, Guides, Out of province, Request service |
| Contact | Phone, email, "Vancouver, BC", hours when confirmed |

Bottom line: "ServePoint Canada provides process serving and legal support services. This website does not provide legal advice." Then Privacy, Terms, Accessibility, copyright.

## 5. Page hierarchy and breadcrumbs

Breadcrumbs (visible and in schema) on every page except home.

| Page | Breadcrumb |
|---|---|
| Service pages, pricing, about, out of province, request service | Home > Page |
| City page | Home > Coverage > City |
| Guide | Home > Guides > Title |

## 6. Internal linking rules

- Every service page links to: the request form, pricing, the other two services where relevant, coverage, and two to four relevant guides.
- Every guide links to the matching service page in the first 200 words, to the request form at the end, and to 2 related guides.
- Every city page links to process serving, pricing, the request form (pre-filled with `?city=`) and two neighbouring city pages.
- Corporate search links to process serving ("search first, serve second") and the reverse.
- Anchor text is descriptive ("process serving in Burnaby"), never "click here".
- No page is more than three clicks from home. No orphan pages.

## 7. Content model

| Collection | Location | Fields |
|---|---|---|
| Pages | `src/pages/*.astro` with copy in `content/` mapped into components | per page spec |
| Coverage cities | `src/content/coverage/*.md` | name, slug, tier, neighbourhoods, courts, intro, faqs, nearby, published |
| Guides | `src/content/guides/*.mdx` | title, description, slug, author, reviewed (date), status, related, primaryKeyword |
| Pricing | `src/data/pricing.ts` | services, base price, included, extras (amounts when confirmed) |
| Site facts | `src/data/site.ts` | name, phone, email, areas, hours, social, founder |
| FAQ bank | `src/data/faqs.ts` | id, question, answer, pages where used |

All shared facts are defined once in `src/data/site.ts` and imported. No component hard-codes the phone number, email, price or area list.
