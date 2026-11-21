# File mapping and package gaps (Phase 0)

The folder as received (2026-11-20) held 44 flat files whose names did not match their contents (for example `CLAUDE.md` held the About copy, and `README.md` held the 197 KB design specimen). Each file was identified by its own title and moved to the layout described in the package README. No content was changed, apart from the one line added at the top of `CLAUDE.md`. A copy of the files as received is in the session scratchpad, not in this project.

## Old name to new path

| Name as received | Now at |
|---|---|
| `home (5).md` | `docs/00-project-brief.md` |
| `guides.md` | `docs/01-current-site-audit.md` |
| `keyword-seed.csv` | `docs/02-competitor-analysis.md` |
| `coverage (2).md` | `docs/03-keyword-research-and-seo-strategy.md` |
| `08-seo-implementation-spec.md` | `docs/04-information-architecture.md` |
| `13-page-replication-matrix.md` | `docs/05-ux-strategy.md` |
| `03-keyword-research-and-seo-strategy.md` | `docs/06-design-direction.md` |
| `14-design-prompt.md` | `docs/08-seo-implementation-spec.md` |
| `06-design-direction.md` | `docs/09-copy-guidelines.md` |
| `competitor-metrics.csv` | `docs/10-implementation-plan.md` |
| `phase.md` | `docs/11-qa-checklist.md` |
| `pricing (4).md` | `docs/12-open-questions-for-client.md` |
| `court-filing (1).md` | `docs/13-page-replication-matrix.md` |
| `corporate-search (3).md` | `docs/14-design-prompt.md` |
| `09-copy-guidelines.md` | `CLAUDE.md` |
| `request-service.md` | `README.md` |
| `07-technical-spec.md` | `docs/pages/pricing.md` |
| `11-qa-checklist.md` | `docs/pages/corporate-search.md` |
| `LEIA-ME-PT.md` | `docs/pages/home.md` |
| `copy-audit.md` | `docs/pages/process-serving.md` |
| `design-audit.md` | `docs/pages/guides.md` |
| `motion-audit.md` | `docs/pages/out-of-province-and-us.md` |
| `out-of-province-and-us (6).md` | `docs/pages/court-filing.md` |
| `process-serving (7).md` | `docs/pages/coverage.md` |
| `seo-audit.md` | `docs/pages/about-request-service-legal.md` |
| `CLAUDE.md` | `content/about.md` |
| `about.md` | `content/faqs.md` |
| `check-banned-patterns.mjs` | `content/out-of-province-and-us.md` |
| `check-placeholders.mjs` | `content/process-serving.md` |
| `corporate-search.md` | `content/court-filing.md` |
| `faqs.md` | `content/request-service.md` |
| `home.md` | `content/corporate-search.md` |
| `out-of-province-and-us.md` | `content/pricing.md` |
| `pricing.md` | `content/coverage.md` |
| `process-serving.md` | `content/home.md` |
| `direction-specimen.html` | `design/tokens.css` |
| `README.md` | `design/direction-specimen.html` |
| `signature.svg` | `design/scroll-engine.js` |
| `coverage-map-data.json` | `design/signature.svg` |
| `court-filing.md` | `design/coverage-map-data.json` |
| `02-competitor-analysis.md` | `scripts/check-placeholders.mjs` |
| `10-implementation-plan.md` | `scripts/check-banned-patterns.mjs` |
| `00-project-brief.md` | `docs/data/competitor-metrics.csv` |
| `01-current-site-audit.md` | `docs/data/keyword-seed.csv` |

## Package update of 2026-11-20

The updated package replaced `docs/01`, `04`, `06`, `07`, `08`, `10`, `11`, `12`, `13`, `LEIA-ME-PT.md` and the slash commands. What arrived, and what was done:

| Item | State on arrival | Action |
|---|---|---|
| `docs/01`, `06`, `07`, `08`, `10`, `11`, `13` | Saved as `NAME (1).md`. The earlier versions were gone | Renamed to `NAME.md` |
| `docs/02`, `03`, `05`, `09` | Missing from `docs/` (not part of the update) | Restored from the copy of the files as first received. They were not replaced, so those are the current versions |
| `.claude/commands/` | Four files, named `copy-audit (4).md`, `design-audit (2).md`, `motion-audit (4).md`, `seo-audit (4).md`, and the names did not match the contents | Renamed by content: the file titled "Run one phase" is `phase.md`, "Audit built pages against the design direction" is `design-audit.md`, "Audit scroll and motion" is `motion-audit.md`, "Audit SEO" is `seo-audit.md` |
| `/copy-audit` command | **Missing.** No file held its text | Not created. CLAUDE.md lists it |
| `LEIA-ME-PT.md` | Present, read-only | Left as is |
| `docs/pages/` file names | Identified by title in Phase 0. The combined "About, Request service, Legal pages" spec is `docs/pages/about-request-service-legal.md` | Rename if the original names are known |
