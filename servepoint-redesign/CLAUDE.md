This project is a git repository, created on 2026-11-20 at the owner's request so it can be published on Vercel (`docs/16-deploy-vercel.md`). Commit, branch and push only when the owner asks. Never commit `.env` files or `.claude/settings.local.json`.

# ServePoint Canada: website rebuild

You are building the new marketing website for **ServePoint Canada**, a process serving and legal support company in Vancouver, BC, run by a founder with an LLB. Clients are mostly law firms, paralegals and legal assistants. The site exists to get them to send a service instruction (form, email or phone call) and to trust the company with a deadline.

The current site works but looks and reads like generated output. This rebuild replaces it with a distinctive, professional site, a stronger information architecture and a proper SEO foundation. Do not restyle the old site. Rebuild from these documents.

## Read first, in this order

1. `docs/00-project-brief.md`: business, audience, goals, known facts
2. `docs/01-current-site-audit.md`: what exists today and what is wrong with it. Then `docs/13-page-replication-matrix.md`: every page and section of the current site (all nine were read) and what each becomes. Read it before building any page, so that no published fact or feature is lost
3. `docs/02-competitor-analysis.md`: market map and patterns to borrow or avoid
4. `docs/03-keyword-research-and-seo-strategy.md`: keywords, clusters, page targets
5. `docs/04-information-architecture.md`: sitemap, URLs, navigation, redirects
6. `docs/05-ux-strategy.md`: audiences, journeys, form design, conversion rules
7. `docs/15-design-direction-v4.md`: the live visual direction (supersedes `docs/06-design-direction.md`)
8. `docs/07-technical-spec.md` and `docs/08-seo-implementation-spec.md`
9. `docs/09-copy-guidelines.md`: voice, banned phrases, facts register
10. `docs/pages/*.md`: one spec per page. `content/*.md`: draft copy per page
11. `docs/10-implementation-plan.md`: the phases you will follow
12. `docs/11-qa-checklist.md` and `docs/12-open-questions-for-client.md`

Run the site (`npm run dev`) and look at it at desktop and phone width before changing any CSS. `design/direction-specimen.html` and `design/tokens.css` are the superseded v3 files. The live tokens are `src/styles/tokens.css`. `design/coverage-map-data.json` and `design/signature.svg` still hold the map and signature data.

## Non-negotiables

### Facts
- Only publish facts listed in the facts register in `docs/09-copy-guidelines.md`. Never invent years in business, statistics, client names, testimonials, ratings, awards, certifications, addresses, hours or prices.
- Anything unconfirmed is written as `[CONFIRM: what is needed]` in content files. `npm run check:placeholders` must fail a production build while any `[CONFIRM` remains.
- This site does not give legal advice. Keep the disclaimer in the footer and never write copy that tells a visitor which method of service their matter requires. Say the instructing firm decides and ServePoint carries out the instruction.
- Guides on law and procedure are written or reviewed by the founder before publishing. Mark them `status: draft` in front matter until she approves.

### Copy
- Follow `docs/09-copy-guidelines.md`. Short declarative sentences, concrete nouns, times and places.
- No em dashes anywhere. Not in copy, comments shown to users, alt text or metadata. Use a period, comma or colon. `npm run check:copy` enforces this.
- Sentence case for all headings and buttons. No exclamation marks. No emoji.
- One name per action across the whole site: the primary action is **Request service**. The phone action is **Call 778-238-2797**. Do not invent synonyms.

### Design
- **The design direction is `docs/15-design-direction-v4.md` ("docket"). It supersedes `docs/06` and `design/direction-specimen.html` where they differ.** The project owner rejected v3 on 2026-11-20 because the type and layout were far too large (H1 92 px, body 19 px, a 632 px pinned panel that overflowed laptop screens) and asked for a modern, innovative interface. `docs/06` is kept for history only.
- Concept (v4.1): a brief on a desk. Flat navy and white pages, serif headings (Source Serif 4), Instrument Sans for the interface, hairlines, one sheet of paper as the picture. The signature is the sample sheet, a fictional affidavit with a record of service. The hero must read as a law firm, not a tech company: no grid lines, no glows, no network art, no glass panels, no mono type outside file numbers. Every section is a tool or a deliverable, not a slogan.
- **The buttons are the v4 buttons (gradient, sheen sweep on hover, glow, lift, teal on navy). The owner asked for them back after a restyle. Do not restyle them.**
- Phones matter as much as desktops. Show less and let the reader open more (clamped text with Read more, folded lists, swipe rows, a pinned process scene whose stages fade in as the reader scrolls, one bottom bar that steps aside). The patterns and the breakpoints are in `docs/15` section 9. Tap targets are at least 44 px.
- Copy is short: lead with the fact, one idea per sentence, nothing said twice on a screen. Never cut the "your firm chooses the method of service" statement, "pricing is confirmed before service" or the exact footer disclaimer.
- Scale is restrained: body 16 px, H1 at most 52 px, H2 at most 36 px, the price figure at most 88 px. `tests/e2e/layout.spec.ts` enforces this and checks 10 viewports, including 1280 x 650, for overflow and for the sticky panel fitting the screen. Do not raise the scale to "make an impression".
- Use tokens from `src/styles/tokens.css` only (colour roles come from the `.theme-light`, `.theme-paper` and `.theme-dark` classes). No raw hex in components. No Tailwind, no UI kit, no component library.
- Navigation and interaction: header with a Services menu (native popover), command palette (Ctrl or Cmd K, or `/`, index at `/search.json`), section nav on service pages, a no-script instruct band on every page, area check, price explorer, document finder, tabs, a two-step composer with a live summary, cross-page view transitions. Keep them keyboard operable and working without script where `docs/15` section 8 says so.
- Still banned: stock photography of gavels, scales or handshakes, fake client logo walls and invented counters, emoji, neon, blobs and grain, decorative stamps, scroll-jacking and page-level scroll snap, text dimmed with opacity (contrast must hold in every state), effects that scrub opacity or position with the scroll position, parallax, wipes.
- Motion is time based and natural: a block below the fold rises 20 px and fades in once when it comes into view (`IntersectionObserver` in `src/scripts/scroll-engine.ts`, no scroll listener). The process scene (`src/scripts/scene.ts`) writes the stage in focus and everything it changes is a CSS transition. Animate `transform`, `opacity`, `stroke-dashoffset`, `background-size` and colour only. Defaults are the finished state, so no script, print and `prefers-reduced-motion` show a complete page.

### SEO
- Every page has one H1, a unique title and meta description from the templates in `docs/08-seo-implementation-spec.md`, a canonical URL, breadcrumb markup and the schema listed in its page spec.
- Write "Vancouver, BC" in titles and H1s. Search results for "Vancouver" mix in Vancouver, Washington, and other companies' pages already confuse the two.
- City pages are only published when they hold unique, useful local content (see `docs/pages/coverage.md`). No templated duplicates.

### Accessibility and performance
- WCAG 2.2 AA minimum. Visible focus on every interactive element. Keyboard operable everywhere, including the coverage map and the form.
- Budgets: LCP under 2.0 s on a mid-range phone over 4G, CLS under 0.05, under 60 KB of JavaScript per page (most pages ship none), fonts self-hosted as WOFF2 with `font-display: swap` and size-adjusted fallbacks.

## Stack

- Astro (latest stable major) in static output, TypeScript strict
- Plain CSS with custom properties, `@layer`, container queries. Scoped styles in `.astro` components
- Content collections (Markdown/MDX) for guides and coverage pages
- Netlify for hosting, redirects and headers. Forms: Netlify Forms first, a function later (see `docs/07-technical-spec.md`)
- Playwright for screenshots and e2e, axe-core for accessibility, Lighthouse CI for budgets
- No client-side framework unless a component truly needs it. The coverage map and the request form are the only islands, written in vanilla TypeScript

## Commands

```
npm run dev                  # local dev server
npm run build                # static build into dist/
npm run check                # astro check, lint, copy check, placeholder warning
npm run check:copy           # em dashes and banned phrases in src/ and content/
npm run check:placeholders   # fails if [CONFIRM] or lorem remain in dist/ (use --strict for production)
npm run shots                # screenshots at 375, 768, 1280, 1536 into .shots/
npm run test:a11y            # axe on every built page
npm run test:e2e             # form flow, nav, redirects
npm run lighthouse           # budgets from docs/07-technical-spec.md
```

The two check scripts already exist in `scripts/`. Wire the rest as the plan says.

## How to work

1. Work one phase at a time from `docs/10-implementation-plan.md`. At the start of a phase, write a short plan (files you will touch, components you will create) and then execute it.
2. Build components in isolation first (`/dev/components` route that is excluded from production), then compose pages.
3. After each page: run `npm run shots`, look at the screenshots at all four widths, and critique them against `docs/15-design-direction-v4.md` section 8 (acceptance). Fix before moving on.
4. Commit at the end of each phase with a message that lists what changed. Do not commit secrets.
5. When a document and your instinct disagree, the document wins. If a document is wrong or missing something, say so in your phase summary and propose the edit. Do not silently diverge.
6. Ask the owner only about items in `docs/12-open-questions-for-client.md` that block the current phase. Otherwise use the stated default and keep going.

## Definition of done (per page)

- Matches its spec in `docs/pages/` and uses the copy in `content/` (edited only to fix fit, never to add facts)
- Passes `npm run check`, `npm run test:a11y`, and the budgets
- Reviewed at 375, 768, 1280 and 1536 px with no horizontal scroll, clipped text or overlapping elements
- Title, meta description, canonical, breadcrumbs and schema present and valid
- Every link resolves. Every CTA uses the approved name
- No `[CONFIRM` markers remain, or each remaining one is listed in the phase summary for the owner
