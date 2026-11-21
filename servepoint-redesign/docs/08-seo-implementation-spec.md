# 08. SEO implementation specification

## 1. Titles and meta descriptions

Rules: title 50 to 60 characters, meta description 120 to 155. Primary keyword near the start. "Vancouver, BC" or "British Columbia" where the page is local. Brand at the end. No pipes beyond one separator. No em dashes.

| Page | Title | Meta description |
|---|---|---|
| `/` | Process server in Vancouver, BC \| ServePoint Canada | Process serving, court filing and BC corporate searches for law firms in Vancouver and the Lower Mainland. First attempt within 24 hours. |
| `/process-serving/` | Process serving in Vancouver and Lower Mainland \| ServePoint | Personal service of civil, family, commercial and tenancy documents. Up to 3 attempts, every attempt documented, sworn affidavit on completion. |
| `/court-filing/` | Court filing and registry services in Vancouver \| ServePoint | Filing and issuing at BC Supreme Court and Provincial Court registries, file searches and document retrieval, with digital return of filed documents. |
| `/corporate-search/` | BC corporate search for law firms \| ServePoint Canada | BC Registry searches: company summary, directors, registered office, certificate of status. Typically delivered within 2 business days. |
| `/pricing/` | Process server pricing in Vancouver, BC \| ServePoint | Service starts from $168 and includes up to 3 attempts and a sworn affidavit. See what is included and what changes the price. |
| `/coverage/` | Areas we serve: Vancouver and Lower Mainland \| ServePoint | Process serving in Vancouver, Burnaby, Richmond, Surrey, New Westminster, Coquitlam and 9 more communities. Check your neighbourhood and request service. |
| `/coverage/[city]/` | Process server in [City], BC \| ServePoint Canada | Process serving in [City] and nearby: courts we attend, neighbourhoods we cover and what to send. |
| `/out-of-province-and-us/` | BC process serving for US and Canadian firms \| ServePoint | US and Canadian law firms can instruct ServePoint directly to serve documents in Vancouver and the Lower Mainland. Pacific Time updates, sworn proof. |
| `/guides/` | Guides to serving documents in BC \| ServePoint Canada | Practical guides to personal service, proof of service and court filing in British Columbia, reviewed by founder Jasmine Deo, LLB. |
| `/guides/[slug]/` | [Guide title] \| ServePoint guides | One sentence stating what the guide answers and the date last reviewed. |
| `/about/` | About ServePoint Canada and founder Jasmine Deo, LLB | Why ServePoint was founded by Jasmine Deo, LLB, who handles your file, and how every attempt is recorded and proven with a sworn affidavit of service. |
| `/request-service/` | Request service in Vancouver, BC \| ServePoint Canada | Send a process serving, court filing or corporate search instruction. We confirm availability and next steps the same business day. |

Check text lengths in a unit test over the built HTML. The `[City]` and `[Guide title]` rows are patterns: the length rule applies to the rendered result, so test each published city and guide.

## 2. Meta and crawl

- `<link rel="canonical">` on every page, absolute URL on `https://servepointcanada.com`, trailing slash.
- `<meta name="robots" content="index,follow">` by default. `noindex` on `/request-service/received/`, `/dev/*`, and the 404.
- `robots.txt`: allow all, link to `/sitemap.xml`. Disallow `/dev/`.
- `sitemap.xml` from `@astrojs/sitemap`, excluding noindex pages, with `lastmod` from content dates.
- Open Graph and Twitter card tags. `og:image` 1200 x 630, text on `--ink` background using the display face (IBM Plex Serif 500), one default plus one per guide generated at build.
- `<html lang="en-CA">`. Canadian spelling in copy.
- One H1 per page, matching the primary keyword intent in plain language.
- Alt text for informative images. Empty alt for decorative ones.

## 3. Structured data (JSON-LD)

Build one `JsonLd.astro` component that takes an object. Only mark up what is visible on the page.

### 3.1 Site-wide: `LegalService` (Organization)

```json
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": "https://servepointcanada.com/#organization",
  "name": "ServePoint Canada",
  "url": "https://servepointcanada.com/",
  "logo": "https://servepointcanada.com/logo.png",
  "telephone": "+1-778-238-2797",
  "email": "serve@servepointcanada.com",
  "description": "Process serving, court filing and BC corporate searches for law firms in Vancouver and the Lower Mainland.",
  "address": { "@type": "PostalAddress", "addressLocality": "Vancouver", "addressRegion": "BC", "addressCountry": "CA" },
  "areaServed": [
    { "@type": "City", "name": "Vancouver" },
    { "@type": "City", "name": "Burnaby" }
  ],
  "founder": { "@type": "Person", "name": "Jasmine Deo", "honorificSuffix": "LLB" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Process serving" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Court filing and registry attendance" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "BC corporate search" } }
    ]
  }
}
```

Fill `areaServed` with all 15 communities. Add `openingHoursSpecification` and `sameAs` only when confirmed. Add a street address only if the business has a public office and the owner agrees. Never add `aggregateRating` or `review` unless the same reviews are visible on the page.

### 3.2 Service pages: `Service`
`serviceType`, `provider` with `@id` of the organization, `areaServed`, and `offers` using `PriceSpecification` with `minPrice` 168 and `priceCurrency` "CAD". Description matches the visible intro.

### 3.3 Every page except home: `BreadcrumbList` matching the visible breadcrumb.

### 3.4 Pages with a visible FAQ: `FAQPage` from `src/data/faqs.ts`. Google shows FAQ rich results only for a narrow set of sites, so do not expect a visual result. The markup stays for semantic clarity and other consumers.

### 3.5 Guides: `Article` with `author` (Person, Jasmine Deo), `datePublished`, `dateModified` (the last reviewed date), `headline`, `image`, `publisher` referencing the organization.

### 3.6 About: `AboutPage` with `mainEntity` the founder `Person`.

Validate with the Schema Markup Validator and Google's Rich Results Test. Add a CI check that parses every JSON-LD block as valid JSON and that it matches visible content for phone and email.

## 4. Heading and content structure

- H1: names the page in plain words with the place. Example: "Process serving in Vancouver, BC".
- H2s are real sections the reader scans. H3s are used inside them. No skipped levels.
- First 100 words state who it is for, what is done, where, and the main promise.
- Include the keyword and its natural variants once or twice in the first screen, in headings and body. Do not repeat for density.
- FAQ answers are 30 to 80 words, plain, and written to be quoted.
- Each guide ends with a short "Next step" paragraph linking to the matching service and the form.

## 5. Internal linking
Follow `docs/04` section 6. Add a build check that reports orphan pages and pages with fewer than three internal links.

## 6. Images and performance for SEO
- AVIF or WebP with fallbacks, explicit dimensions, descriptive filenames (`vancouver-law-courts-entrance.webp`, not `img1.webp`).
- Use Astro `<Image>` for responsive sizes. No images larger than 200 KB above the fold.

## 7. Redirect and canonical hygiene
- Single canonical host: `https://servepointcanada.com`. Redirect `www` and `http` to it. Confirm with the owner who controls DNS.
- Trailing slash consistent across the site (set `trailingSlash: "always"` in Astro).
- No query-string URLs are indexable. `?service=` and `?city=` on the form canonicalize to `/request-service/`.

## 8. Launch checklist
1. Staging and deploy previews send `X-Robots-Tag: noindex, nofollow` by default (written by `scripts/csp-headers.mjs`, `docs/07` section 6.3). Production sets `ALLOW_INDEXING=true` at launch and the header disappears.
2. 301 map tested.
3. Sitemap submitted in Search Console. Property verified for the domain.
4. Titles, meta, canonicals, schema validated.
5. Google Business Profile updated with the site URL and services.
6. Analytics events verified in the live site.
7. Lighthouse and axe pass on the production URL.
8. Crawl with a site crawler. No 404s, no redirect chains, no duplicate titles.

## 9. After launch
- Weeks 1 to 4: watch Search Console coverage for errors, query data and the pages Google chooses to show.
- Compare old site rankings (baseline from Phase 0). Fix any page that lost visibility.
- Add city and guide pages by the 90-day sequence in `docs/03`.
