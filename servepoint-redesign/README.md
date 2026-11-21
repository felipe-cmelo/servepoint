# ServePoint Canada redesign package

Everything Claude Code needs to rebuild https://servepointcanada.com, produced on 2026-11-16 from an analysis of the current site, the Vancouver and Canadian process serving market, and keyword intent for the category.

## Status and deployment

The site is built (Astro, static output). `docs/data/progress.md` says what is done and what is open. `docs/15-design-direction-v4.md` is the live design direction. `docs/16-deploy-vercel.md` is the Vercel deployment guide, including the one launch blocker there (the request form was built for Netlify Forms and needs a handler on Vercel).

```
npm ci               # install
npm run dev          # local dev server
npm run build        # static build into dist/ (also writes the Content-Security-Policy)
npm run verify       # build, checks, axe, e2e, CSP and Lighthouse
```

## How to use this folder

1. Copy the whole folder into a new empty repository (it becomes the repo root).
2. Open Claude Code in that folder. It reads `CLAUDE.md` automatically.
3. Send the owner the questions in `docs/12-open-questions-for-client.md` so they can be answered while Phase 0 and 1 run.
4. Type `/phase 0` and continue phase by phase. Slash commands live in `.claude/commands/`.
5. Open `design/direction-specimen.html` in a browser, at desktop width and at phone width. **Scroll it**, because the scroll behaviour is part of the design. It is the visual target (direction v3, "chain of record"): tonal navy and mist surfaces, IBM Plex type, a sample affidavit pinned beside the four steps that lights the part each step produces, a 24 hour line, a route map that draws on scroll and a live Vancouver clock.
6. `LEIA-ME-PT.md` is a guide in Portuguese for the person who commissioned this package. Claude Code does not need it.

## Contents

| Path | What it is |
|---|---|
| `CLAUDE.md` | Rules, stack, commands and working method. Claude Code reads this first |
| `docs/00` to `docs/14` | Brief, audit, competitors, keywords, IA, UX, design, technical specs, copy rules, plan, QA, open questions, the page replication matrix (every current page and section, and what it becomes), and the master design prompt with per-phase prompts and a critique loop (`docs/14`) |
| `docs/pages/` | One specification per page and template |
| `docs/data/keyword-seed.csv` | Keyword list to validate with real volume data |
| `content/` | Draft copy per page, with `[CONFIRM]` markers where facts are missing |
| `design/tokens.css` | Design tokens (colour, type scale, space, motion, scroll variables, surfaces) |
| `design/scroll-engine.js` | Reference scroll code. Writes CSS variables for every scroll effect. Port to TypeScript |
| `design/direction-specimen.html` | Self-contained, scrollable visual target at desktop, tablet and phone width. Reproduce it |
| `design/coverage-map-data.json` | Nodes, lines and water shapes for the route map |
| `design/signature.svg` | The sample signature path |
| `LEIA-ME-PT.md` | Guide in Portuguese for the project owner |
| `scripts/` | Copy and placeholder checks |
| `.claude/commands/` | `/phase`, `/design-audit`, `/motion-audit`, `/seo-audit`, `/copy-audit` |

## Known limits of the research

- Traffic and keyword volume tools (Semrush, Ahrefs, Similarweb, Google Keyword Planner) were not available. Competitor weight was judged from scale, directory presence and published claims. `docs/02` ends with a worksheet to replace those judgments with data, and `docs/data/keyword-seed.csv` is ready for volumes.
- The current site could be read as text but its raw HTML and CSS could not be inspected, and its images could not be viewed. Phase 0 includes a technical baseline audit of the live site. The design specimen was checked in Chrome only: Safari and Firefox are tested in design phase 6.
- Prices, years in business and other business facts are not on the current site. They are marked `[CONFIRM]` and listed for the owner.
