# Page spec: Home (`/`)

**Purpose:** convert a legal assistant with a deadline in under a minute, and show a lawyer evidence of care in one scroll.
**Primary keyword:** process server Vancouver. **Supporting:** process serving Lower Mainland, court filing, BC corporate search.
**Copy:** `content/home.md`. **Title and meta:** `docs/08` section 1.
**H1:** Process serving in Vancouver, BC.
**Single primary action:** Request service. Secondary: Call 778-238-2797.
**Visual reference:** `design/direction-specimen.html`. Build this page to match it at 1440 px and 375 px, then adjust only for real content. Direction and components: `docs/06`.

## Sections in order

Layout mechanics for rows 1 and 2 (one grid, one pinned sheet) are in `docs/06` section 6, "The flow layout". Scroll behaviour is in `docs/06` section 9.

| # | Section | Surface | Component and layout | Content notes |
|---|---|---|---|---|
| 1 | Hero with header | `--ink` | `Hero`. Text column: H1 in `--h1`, 2-sentence lead, the two actions, four hero facts in a 2 by 2 grid. Right column (30 rem): `SpecimenAffidavit` (sheet, log, statement, signature, paper stack), which starts its pinned run here | The whole sheet is visible at 1440 by 900. Marks draw, then the signature is written, once, on load. Reduced motion and no script: shown finished |
| 2 | How a file progresses | `--mist` | `ProcessSteps`: four `Step` blocks with a left rail, inside the same grid as the hero. The sheet stays pinned in the right column and lights the part each step produces. Heading H2 with mask reveal | **1. Instruct:** H3, ruled checklist (documents, service address, deadline, court file number), one paragraph, the "Deadline this week?" line (4 px highlighter bar), primary button. This merges the current site's "How it works" and its highlighted callout. No rush amounts until `docs/12` question 5 is answered. **2. Attempt:** first attempt typically within 24 hours, up to 3 attempts, each recorded with date, time and location, updates throughout. `AttemptLine` fills with scroll. No times for attempts 2 and 3. **3. Serve:** `DocumentFinder` (type or choose, 6 categories) and one paragraph on out-of-province documents. Server render all six panels. Categories and document names exactly as in `content/home.md`. States that the instructing firm chooses the method of service. **4. Prove:** `Outcomes` (sworn Affidavit of Service; affidavit of attempted service if service fails; your firm decides what comes next) |
| 3 | What we do, then Who handles your file | `--paper` | `ServiceRows`: three large ruled linked rows. Under them, a two-column block: "Who handles your file" left, founder text and link right (text only, portrait goes on `/about/`) | Process serving, court filing, BC corporate search. Mention "Search first, serve second". The founder block carries the three facts of the current "Why ServePoint" section (direct contact, every attempt recorded, founded by a legal professional) and links to `/about/` |
| 4 | Pricing | `--ink` | `PricingSurface` | "from $168" as the one large figure, the included table (3 rows), link to `/pricing/`. Never invent rush amounts |
| 5 | Coverage | `--mist` | `CoverageMap` (route diagram) with panel and the list of 15 buttons | "Outside the area? Send the address". 15 communities |
| 6 | Outside BC | `--paper` | Text and button on the left, `VancouverClock` navy card on the right | USD invoicing on request. Updates in Pacific Time |
| 7 | Request service | `--mist` | `RequestForm`, two steps, with the side column (what to send, call or email) | Same form as `/request-service/` |
| 8 | FAQ | `--paper` | `FaqList`, 6 questions from `content/faqs.md` | |
| 9 | Close | `--ink` | `Closing`: H2, sentence, phone at `--display-close`, button, email | Only one primary action |
| 10 | Footer | `--mist` | Four link groups and the disclaimer | |

Rhythm: navy, mist, paper, navy, mist, paper, mist, paper, navy, mist. No two neighbours share a surface, and the form (mist) and FAQ (paper) read as two blocks.

## Hero facts (use exactly, from the facts register)
- First attempt typically within 24 hours.
- Up to 3 attempts included.
- Sworn affidavit of service.
- Same business day confirmation.

## Specimen content
The sample affidavit text is in `content/home.md`. It states that it is a sample. It does not copy any real court form text. The signer is the fictional Alex Morgan.

## Schema
`LegalService` (site-wide), `FAQPage`, no breadcrumb (home).

## Internal links
`/process-serving/`, `/court-filing/`, `/corporate-search/`, `/pricing/`, `/coverage/`, `/out-of-province-and-us/`, `/request-service/`, guides hub.

## Acceptance
- At 375 px the first screen shows H1, lead, Request service and the fixed bottom bar. The sheet follows after the four facts, inside a mist surface, not pinned
- At 1440 px the H1, the two actions, the four facts and the whole sample sheet are visible without scrolling
- At 1000 px and wider the sheet stays pinned from the hero to the end of the four steps, and each step lights its part of the sheet (`docs/06` section 9.3)
- The paper stack and its shadow stay inside the mist surface at the end of the story
- Marks and signature draw once on load. Every other scroll effect reverses on scroll up. Under reduced motion and with no script, everything is shown finished
- The page uses the surfaces in the order above with no horizontal scroll at 375, 768, 1280 and 1536 px
- The map works with mouse, touch and keyboard, and the list of 15 buttons works without the SVG
- Passes the design review checklist (`docs/06` section 10) at the screenshot positions in `docs/14` Part C
