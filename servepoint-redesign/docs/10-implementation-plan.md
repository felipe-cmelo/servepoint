# 10. Implementation plan

Seven phases. Work in order. Each phase ends with a commit, a short summary of what changed, the list of remaining `[CONFIRM]` items, and screenshots saved in `.shots/`. Use `/phase N` to start a phase.

---

## Phase 0: Setup and baseline

**Goal:** a clean repository, a working toolchain and a measured starting point.

Tasks
1. Scaffold Astro with TypeScript strict. Configure `site`, `trailingSlash: "always"`, `@astrojs/sitemap`, `@astrojs/mdx`.
2. Copy `design/tokens.css` into `src/styles/`. Install the Fontsource packages for IBM Plex Serif, Sans and Mono and wire the five latin files (serif 400 and 500, sans 400 and 600, mono 500) with size-adjusted fallbacks.
3. Add the scripts from `docs/07` section 10. Copy `scripts/` as is. Add Playwright, axe-core and Lighthouse CI.
4. Create `src/data/site.ts` from `docs/07` section 4 and `docs/09` facts register.
5. Run Lighthouse and a crawl against the current live site (production domain, and the staging URL in `docs/01`). Save to `docs/data/baseline/`. Record title tags, canonicals, schema, indexed pages and form behaviour. The production domain is a GoDaddy parking page, so record that and audit the staging URL.
6. The production domain is a GoDaddy parking page, so expect no search history. Check Search Console only if the owner already has a property for it. With the owner's Netlify access (`docs/12` question 17), record the old form's name and notification address and export its submissions as CSV (question 24).
7. Fill `docs/data/competitor-metrics.csv` and `docs/data/keyword-seed.csv` volumes if Semrush, Ahrefs or Keyword Planner access is provided. If not, note it and continue.
8. Create `netlify.toml` with the redirect map from `docs/04` and the headers from `docs/07` section 6.1, and `scripts/csp-headers.mjs` from section 6.3.
9. Open each page of the current site in a browser and check `docs/13-page-replication-matrix.md` row by row. The matrix comes from a text read, so add what only a browser shows (colours, fonts, the three images, any script behaviour) to `docs/01` and note any row that is wrong. Ask the owner for the original logo files and the founder headshot. Save the old images to `docs/data/baseline/assets/` for reference only. Do not ship or hotlink them until the owner confirms the files.

Acceptance: `npm run build` and `npm run check` pass on an empty shell. Baseline report written.

Prompt
> Read CLAUDE.md and docs/00 to docs/09. Execute Phase 0 from docs/10. Start by stating your plan in 10 lines. Scaffold, wire tokens and fonts, add the check scripts, create site.ts, run the baseline audit of the live site and write the findings to docs/data/baseline/. Do not build pages yet.

---

## Phase 1: Foundation and components

**Goal:** the design system as working components, reviewed in isolation.

Tasks
1. `Base.astro` layout: `lang="en-CA"`, skip link, `Seo.astro`, `JsonLd.astro`, header, footer, mobile bar.
2. Port `design/scroll-engine.js` to `src/scripts/scroll-engine.ts` and inline it in `Base.astro` with the `html.js` flag (`docs/06` section 9.4).
3. Components from `docs/06` section 7: Button, Surface, Closing, DataTable, Header, Footer, MobileBar, FaqList, Breadcrumbs, toggle chips and form controls. The signature components (Hero, SpecimenAffidavit, ProcessSteps, Step, AttemptLine, DocumentFinder, Outcomes) are built in Phase 2, with `docs/14` prompt B2. CoverageMap, VancouverClock and RequestForm are built in Phase 2 and 3. Open `design/direction-specimen.html` next to the browser and scroll it while you build.
4. `/dev/components` route showing every component in every state at four widths. Excluded from the sitemap and from production builds.
5. Focus states, hover states and reduced motion verified on each surface (paper, mist, navy).
6. Screenshot script (`npm run shots`) that also scrolls to the positions in `docs/14` Part C, and the axe test running on `/dev/components`.

Acceptance: components match `docs/06`. The design review checklist (section 10) passes for the component page. No raw hex outside `tokens.css`. If the logo colour clashes, adjust `--pen` and `--pen-deep` as described in `docs/06` section 4 and note it.

Prompt
> Execute Phase 1 from docs/10 using docs/14 Part A and prompt B1. Open design/direction-specimen.html first and scroll it. Build the foundation, then the /dev/components page. Run npm run shots and review the images against docs/06 section 10 and docs/14 Part C. Fix issues, then summarise what you changed.

---

## Phase 2: Core pages and the request form

**Goal:** everything needed to take an instruction.

Tasks
1. Pages: `/`, `/process-serving/`, `/court-filing/`, `/corporate-search/`, `/pricing/`, `/request-service/`, `/request-service/received/`. Use `docs/pages/*.md` for structure and `content/*.md` for copy.
2. `RequestForm` with the two-step flow, validation, summary, remember-me, progressive enhancement and the three service variants (`docs/05` section 4). Netlify Forms wiring (`docs/07` section 5).
3. The home page flow with `docs/14` prompts B2 and B3: Hero, the pinned `SpecimenAffidavit`, `ProcessSteps` with `AttemptLine`, `DocumentFinder` and `Outcomes`, then the services, pricing, coverage preview, form, FAQ and close sections. `DocumentFinder` is also used on `/process-serving/`.
4. `src/data/pricing.ts` and the price table. Extras show "Confirmed before service" until amounts are provided.
5. Scroll choreography from `docs/06` section 9: the load moment, header state, sheet spotlight, step rail, 24 hour line, headline reveal, rule and route drawing, and the clock. Verify with script off and with reduced motion on, and run the motion audit in `docs/14` B5.
6. Schema, titles, meta, breadcrumbs per `docs/08`.
7. Analytics events from `docs/05` section 8.
8. e2e tests: form flow (both steps, validation errors, success), click-to-call link, redirects.

Acceptance: page definition of done in `CLAUDE.md` for each page. Form works with and without JavaScript on a Netlify preview deploy and a test submission arrives by email.

Prompt
> Execute Phase 2 from docs/10 using docs/14 Part A and prompts B2, B3 and B4. Build the seven pages from docs/pages and content, starting with the home page flow. Build RequestForm and DocumentFinder. Wire pricing.ts. After each page run npm run shots and critique against docs/06 section 10 and docs/14 Part C. Run /motion-audit on the home page. Add the e2e tests. List any [CONFIRM] markers still open.

---

## Phase 3: Coverage, out of province, about, legal pages

**Goal:** the pages that prove local depth and serve outside firms.

Tasks
1. `CoverageMap` as the route diagram in `docs/06` section 7.10. Copy `design/coverage-map-data.json` to `src/data/coverage-map.json`. No boundary data and no external map service. Add the `VancouverClock` component to the out-of-province page.
2. `/coverage/` hub and the four tier 1 city pages from `docs/pages/coverage.md`. Each city holds unique content. Do not publish a city without it.
3. `/out-of-province-and-us/` per its spec.
4. `/about/` with the founder block. Use a placeholder-free layout that holds without a photo.
5. `/privacy/`, `/terms/`, `/accessibility/`. Draft from the facts in `docs/07` section 9. Mark them for the owner's legal review.
6. Update sitemap and internal links.

Acceptance: city pages pass the six-point test in `docs/03` section 7. The map is fully operable by keyboard and its list works without JavaScript.

Prompt
> Execute Phase 3 from docs/10. Build CoverageMap and the coverage hub with the four tier 1 city pages. Research local content for each city from official sources and cite them. Build the out-of-province, about and legal pages. Do not publish thin city pages.

---

## Phase 4: Guides and SEO depth

**Goal:** informational coverage and technical polish.

Tasks
1. Guide layout with author block, last reviewed date, related links and the end-of-guide next step.
2. Write the first three P1 guides as `status: draft` from `docs/03` section 6. Each cites official rules and forms by number and links to them.
3. Guides hub.
4. Build checks: title and meta length, one H1, JSON-LD validity, orphan pages, internal link count.
5. Open Graph image generation.
6. GBP and citation checklist document for the owner (`docs/data/gbp-checklist.md`).

Acceptance: guides render, are excluded from the sitemap while `draft`, and each rule citation resolves to an official URL.

Prompt
> Execute Phase 4 from docs/10. Build the guide layout and hub. Draft guides 1, 3 and 4 from docs/03 section 6 using only official sources for rules and forms. Mark them draft for the founder. Add the SEO build checks.

---

## Phase 5: QA and launch

Tasks
1. Run everything in `docs/11-qa-checklist.md`.
2. Fix all failures. Re-run.
3. Manual keyboard and screen reader pass on home, process serving, the form and the coverage map.
4. Replace remaining `[CONFIRM]` markers with owner answers or remove the content that depends on them.
5. `node scripts/check-placeholders.mjs --strict` passes.
6. Move the domain's DNS from the GoDaddy parking page to Netlify (owner action, `docs/12` question 17). Deploy to production on the confirmed domain and set `ALLOW_INDEXING=true` on that site only, so the production headers carry no `X-Robots-Tag` (`docs/07` section 6.3). Staging and previews keep it. Verify redirects, sitemap, canonicals and the headers with `curl -sI`.
7. Submit the sitemap in Search Console. Update Google Business Profile links.

Acceptance: all QA items pass on the production URL.

Prompt
> Execute Phase 5 from docs/10. Run the full QA checklist in docs/11 against the Netlify preview, fix every failure, then list what the owner must confirm before launch. Do not deploy to production until I confirm.

---

## Phase 6: After launch

Tasks
1. Week 1: crawl production, check Search Console coverage, confirm form submissions and analytics events.
2. Weeks 2 to 4: compare queries and pages with the baseline. Fix any page that lost ground.
3. Tier 2 city pages and the next four guides by the 90-day sequence.
4. Add real photography and testimonials when the owner supplies them.
5. Revisit the form upload decision and the function-based form with Turnstile.

Prompt
> Execute Phase 6, step N, from docs/10.
