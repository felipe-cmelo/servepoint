> **SUPERSEDED on 2026-11-20 by `docs/15-design-direction-v4.md`.** Kept for history. Do not build from this document. The owner rejected this direction because the type, layout and pinned sheet were far too large, and asked for a modern, innovative interface.

# 06. Design direction v3: "chain of record"

Visual reference: open `design/direction-specimen.html` in a browser (desktop and phone width) and **scroll it** before writing any CSS. The scroll behaviour is part of the design. Tokens: `design/tokens.css`. Scroll code: `design/scroll-engine.js`. Map and signature data: `design/coverage-map-data.json`, `design/signature.svg`. The build prompt that uses this document: `docs/14-design-prompt.md`.

## 0. What changed from v2 and why

The owner asked for the same reasoning as the current site, much better visually, with modern UX, a more professional palette, consistent fonts and scroll effects. v2 answered with loud colour blocks (saturated blue, a full-width yellow surface), three type families from different design traditions, and a ban on scroll effects. v3 keeps the content logic and replaces the execution.

| Area | v2 | v3 | Reason |
|---|---|---|---|
| Colour | Saturated royal blue, concrete grey, full-width yellow price surface | Tonal navy and cool mist, one action blue, yellow only as a highlighter mark | Law firms buy trust and calm. Saturation and a yellow surface read as loud, not professional |
| Type | Libre Caslon Display, Atkinson Hyperlegible Next, Atkinson Mono | **IBM Plex** only: Serif for display, Sans for text, Mono for records | One designed family means consistent weights, widths and numerals. Mono carries record data such as timestamps and file numbers |
| Motion | Only four one-time moments. Scroll effects banned | Scroll choreography that proves the process: a sticky sheet that follows the four steps, plus a small set of reversible, scroll-linked effects | The page now shows the process happening while the visitor scrolls |
| Hero | Blue field with a sheet | Navy field with the sheet. The sheet then stays pinned through "How a file progresses" | The signature element does real work for the whole first half of the page |
| Header | Over the hero, plain | Always solid. Progress bar, hides on scroll down, shows on scroll up, section highlight | A legible header at every scroll position |
| Section logic | Same as the current site | Same as the current site (see `docs/13`) | Unchanged on purpose |

Reasoning kept from the current site: first attempt within 24 hours, up to 3 attempts, every attempt recorded, sworn affidavit, same business day confirmation, "search first, serve second", pricing from $168, 15 communities, six document categories, instruct from outside BC, FAQ, one closing action. The order of the home page is the same, with the "How it works" steps merged into the hero story.

## 1. Concept

ServePoint sells **proof**. The product is a record: who was served, when, where and how, sworn by the person who did it. The site shows that record being made.

**The signature element is a finished sample affidavit that stays on screen while the visitor scrolls the four steps.** Each step lights up the part of the record that step produces: Instruct writes the first lines of the log, Attempt the attempt entry, Serve the sworn statement with its three highlighted facts, Prove the sworn line and the signature. The visitor never has to read a promise about "documentation". They watch the documentation form beside the copy.

Design choices that follow:

1. **Calm authority.** A tonal navy and cool grey palette, white sheets, one action blue. No black, no gold, no stock photography.
2. **One type family, three roles.** IBM Plex Serif for statements, Plex Sans for reading and controls, Plex Mono for record data. They share proportions and numerals, so the page reads as one document set.
3. **Motion that carries information.** Scroll effects are tied to meaning: a step lighting its part of the sheet, a line filling to the first attempt, route lines connecting the communities, highlighter marks drawing. They are scrubbed by scroll position and reversible. Nothing fades up for decoration.

**Subject, audience, job:** a Vancouver process serving firm, speaking to legal assistants and lawyers, whose job is to get a service instruction sent in two minutes and to prove the firm can be trusted with a deadline.

## 2. Plan review against the defaults

The plan was reviewed against common generated-page defaults: cream plus serif plus terracotta, near-black plus neon, broadsheet hairlines, identical rounded cards with soft shadows, and template chrome (caps eyebrows, mono data labels, middle-dot meta strings, arrow glyphs).

| Part of the plan | Default it could match | Decision |
|---|---|---|
| Navy and white | Corporate law template | Kept, knowingly. The palette is conservative on purpose for this audience. The distinctive parts are the pinned record, the type system and the scroll choreography. If the page looks generic with the sheet removed, the sheet is not doing enough |
| Plex Serif display | Editorial serif look | Kept. It is set on navy and white with no warm accent and no cream. It is used at large sizes for statements |
| Plex Mono for the log and timestamps | Mono used for decorative data labels | Kept only for literal record data (timestamps, file numbers, the clock). Never for captions or labels |
| Pinned sheet beside long copy | "Sticky scrollytelling" | Kept. The pinned object is the real work product, and each step changes it. Disabled below 1000 px |
| Giant price figure | Big number with small label | Kept once. Price is the fact buyers look for. One figure with an explanation and a table, never a stat strip |
| Large service names as rows | Numbered feature list | Kept as ruled rows with real links. No numbering because the three services are not a sequence |
| Coverage as a drawn route diagram | Decorative map or dashboard | Kept. A schematic of the 15 communities, drawn on scroll, keyboard operable, with a list of buttons that does the same job |
| Cards in a grid, gradients, glass, icon tiles, blobs | SaaS kit | Not used |
| Reveal on every section | Fade-and-slide-up | Not used. One scrubbed mask reveal on H2 headings only |

## 3. Principles

1. **Show the work product first, and keep it in view.** The sample affidavit is in the first viewport and stays pinned through the process.
2. **Surfaces and rules, not boxes.** Sections change surface. Lists and tables are separated by 1 to 2 px rules. Boxes and shadows are reserved for sheets and popovers.
3. **Scale is the decoration.** Large serif statements, plain sans text. No icons, gradients or ornaments to fill gaps.
4. **Motion proves something.** If an animation does not show a state, a sequence or a relationship, remove it.
5. **Complete without script.** Every scroll variable defaults to its finished state. No script, reduced motion and print show a complete page.
6. **Plain statements.** Headlines say what the page is or what the firm does. No slogans in display type.
7. **Fast to read, fast to act.** Left aligned. One primary action in view. The phone number is always one tap away.

## 4. Colour

Use only these, through CSS custom properties (`design/tokens.css`). Contrast ratios were calculated, not estimated.

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--ink` | `#0A1E45` | Text on light surfaces. Navy surfaces (hero, pricing, closing) | 16.4:1 on paper, 14.2:1 on mist |
| `--ink-2` | `#16306A` | Secondary navy, rare (hover on navy, deep panels) | decorative |
| `--pen` | `#2340B3` | Primary button, links, step names, active states | 8.6:1 on paper, 7.4:1 on mist, 8.6:1 with white text |
| `--pen-deep` | `#1A3190` | Hover and pressed | 11.1:1 with white text |
| `--mist` | `#EAEFF6` | Quiet surface (story, coverage, form), sheet header band | 14.2:1 with ink |
| `--mist-2` | `#D3DBE8` | Rules, tracks, unfilled lines | decorative only |
| `--paper` | `#FFFFFF` | Page, sheets, text on navy | |
| `--pad` | `#F6E7A1` | Highlighter marks, quote bars, nothing else. Never a surface | 13.1:1 with ink |
| `--served` | `#0E7C66` | Completed status text | 5.1:1 on paper |
| `--alert` | `#B3261E` | Form errors only | 6.5:1 on paper, 5.7:1 on mist |
| `--muted` | `#4B5B7E` | Secondary text on paper and mist | 6.8:1 on paper, 5.9:1 on mist |
| `--muted-on-ink` | `#B8C4DE` | Secondary text on navy | 9.3:1 on ink |
| `--water` | `#C5D2E6` | Water shapes on the coverage map | decorative only |

Rules:
- Text on `--ink` is `--paper`, or `--muted-on-ink` for secondary text. Text on `--mist` and `--pad` is `--ink`.
- Never put `--muted` text on `--ink`. Never use `--pen` text on `--ink` (1.9:1).
- Never make new colours with opacity. The one allowed use of opacity is the sheet spotlight (section 9), which dims sheet content to between 28 and 100 percent.
- Colour is never the only signal. Errors have text. Status has words.
- Non-text contrast: `--mist-2` rules are decorative. Any border that identifies a control uses `--ink` (16.4:1).
- The supplied logo is navy and teal (Phase 0, 2026-11-20). Decision: keep `--ink` and `--pen`. Teal is not used for buttons or links, because `--served` (`#0E7C66`, hue 168) is already a teal-green that means "served", and a teal action colour would make the two read as one. The logo appears in its own colours on `--paper` and `--mist`, and in its reversed version on `--ink`.
- If the logo's navy sits more than about 10 degrees of hue away from `--ink` (hue 220), shift the hue of `--ink` and `--ink-2` toward it and re-check every pair in the table above.
- If the owner asks for teal in the interface, the only change allowed is one new token, `--pen-teal: #0F766E`, as the primary button fill (white text 5.47:1, hover `#0B5C56` at 7.84:1). Teal link text needs `#0B6B66` (6.35:1 on paper, 5.49:1 on `--mist`). Never use teal text on `--ink`. Keep `--pen` for focus rings. Record the change in `docs/12` question 16.
- **Owner decision, 2026-11-20: teal in the interface.** Added `--pen-teal #0F766E` (primary button fill), `--pen-teal-deep #0B5C56` (hover) and `--link-teal #0B6B66` (link text), in `design/tokens.css` and `src/styles/tokens.css`. Base links are now `--link-teal`. `--ink` and `--pen` are unchanged, and `--pen` stays on focus rings. Watch `--served` (hue 168) next to `--link-teal` (hue 177): status must keep its words.
- Request the logo SVG (`docs/12` question 3) and read its two hex values before locking the palette.

## 5. Typography

One family in three roles. All open source (SIL OFL), self-hosted.

| Role | Family | Use |
|---|---|---|
| Display | **IBM Plex Serif** 500 | H1, H2, step names, service names, price figure, closing number, sample sheet body. Always large except in the sheet |
| Text and UI | **IBM Plex Sans** 400 and 600 | Body, H3 to H6, buttons, forms, tables, navigation, facts |
| Record | **IBM Plex Mono** 500 | Timestamps and entries in the sheet log, file numbers, the clock, form status line |

```
npm i @fontsource/ibm-plex-serif @fontsource/ibm-plex-sans @fontsource/ibm-plex-mono
```

Import only these latin files: serif 400 and 500, sans 400 and 600, mono 500. Five WOFF2 files, about 100 KB in total. Preload serif 500 and sans 400. Create fallback `@font-face` rules with `size-adjust`, `ascent-override`, `descent-override` and `line-gap-override` (Capsize or Fontaine) so font swap causes no layout shift.

Why: Plex Sans has distinct 1, l and I and a slashed zero in Mono, which matters for addresses, times and file numbers. Plex Serif has the weight of printed law without a law-firm template look. Because all three come from one design, weights, x-heights and numerals agree.

### Scale (tokens)

| Token | 375 px to 1440 px | Use |
|---|---|---|
| `--h1` | 46 to 92 px | Home H1 |
| `--h1-page` | 40 to 76 px | H1 on inner pages |
| `--h2` | 34 to 60 px | Every H2 |
| `--h3` | 30 to 52 px | Step names, service names (via `clamp`), "Who handles your file" |
| `--amt` | 112 to 240 px | The price figure. Once per page |
| `--display-close` | 44 to 128 px | The closing phone number |
| `--step-1` | 20 to 24 px | Lead paragraph, step H3, FAQ summary |
| `--step-0` | 17 to 19 px | Body |
| `--step--1` | 15 px | Helper text, table text |
| `--step--2` | 14 px | Smallest allowed |

- Body line height 1.6. Display line height 1.04. Letter spacing on display -0.018em. Body 0.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.
- Measure: body 62 characters. H1 never more than three lines.
- `font-variant-numeric: tabular-nums` for prices, times, file numbers.
- No all-caps labels. The sample sheet uses caps only where the real document does ("AFFIDAVIT OF PERSONAL SERVICE").
- No single accented word in a headline. No small label above a heading. Step names ("1. Instruct") are the step headings of a real sequence, not eyebrows.

## 6. Layout

- 12 column thinking, max content width 1440 px, side padding 20 px on mobile growing to 48 px. Gutter 24 to 32 px.
- **Alignment: left aligned everywhere.** Ragged right. No centred paragraphs.
- **Home page rhythm.** Surfaces alternate. Two neighbouring sections never share a surface and a layout.

| Order | Section | Surface | Notes |
|---|---|---|---|
| 1 | Hero | `--ink` | Header sits on it. Sheet starts pinned here |
| 2 | How a file progresses (4 steps) | `--mist` | Sheet stays pinned in the right column |
| 3 | What we do (3 services) and Who handles your file | `--paper` | Ruled rows |
| 4 | Pricing | `--ink` | Price figure and included table |
| 5 | Coverage | `--mist` | Route map and panel |
| 6 | Instructing from outside BC | `--paper` | Navy clock card |
| 7 | Request service | `--mist` | Two-step form |
| 8 | Common questions | `--paper` | Six FAQ |
| 9 | Close | `--ink` | Phone number as the largest type on the page |
| 10 | Footer | `--mist` | Four link groups, disclaimer |

Inner pages reuse these surfaces. Keep at least two non-white surfaces on every page and never more than three consecutive white sections.

- **Radius by role.** 0 for sheets, surfaces and tables. 4 px for buttons, form controls and panels. Nothing else is rounded.
- **Shadow.** One token, `--shadow-sheet`. Allowed on: the sample sheet and its paper stack, the coverage panel, the form box, the clock card, the Services menu. Nothing else has a shadow.
- Section padding `--space-8` desktop, `--space-7` below 1000 px.

### The flow layout (hero plus how a file progresses)

One CSS grid, `.flow`, holds the hero and the four steps so that a single sticky element can run through both.

```
.flow            grid: [copy 1fr] [sheet 30rem], column gap clamp(2rem,5vw,5rem)
.hero-band       column 1/-1, row 1, display:grid with subgrid, full-bleed navy
                 (box-shadow: 0 0 0 100vmax var(--ink) plus clip-path: inset(0 -100vmax))
.story-bg        column 1/-1, row 2, full-bleed mist (same technique), z-index 0
.pin             column 2, rows 1 to 2, padding-top header height + 3.5rem, padding-bottom 7.5rem, z-index 3
  .sheetwrap     position: sticky; top: header height + 1.25rem
.steps           column 1, row 2, z-index 1
```

- The sheet's paper stack (`::before`, `::after` of `.sheetwrap`) is offset and rotated, and drifts a little with `--hp` as the hero scrolls away.
- `padding-bottom: 7.5rem` on `.pin` keeps the stack and its shadow inside the mist surface when the sheet stops at the end of the story. Without it the shadow bleeds into the next white section.
- Below 1000 px nothing is pinned. `.pin` moves to row 2 inside a full-bleed mist surface and the sheet sits in normal flow above the steps. Steps start below it. All focus weights are 1.

### Home wireframe, 1440 px

```
+--------------------------------------------------------------------------------------+
| [NAVY] ServePoint Canada   Services v  Pricing  Coverage  Out of province  Guides  About   778-238-2797 [Request service] |
|                                                                                      |
|  Process serving                                         +-------------------------+ |
|  in Vancouver, BC                          (large)       | Sample. Fictional...    | |
|                                                          | AFFIDAVIT OF PERSONAL   | |
|  We serve legal documents for law firms ...              | SERVICE                 | |
|  [Request service]  Call 778-238-2797                    | log: 4 mono entries     | |
|                                                          | 1. On [March 4, 9:42]   | |
|  First attempt typically   Up to 3 attempts              | ...                     | |
|  within 24 hours.          included.                     | ~~ signature ~~~~~~~~~  | |
|  Sworn affidavit of        Same business day             +-------------------------+ |
|  service.                  confirmation.                   (two sheets behind it)    |
+----------------------------------------------------------+ sheet keeps sticking -----+
| [MIST]  How a file progresses                            |                          |
|         | 1. Instruct   Send the documents, ...          |  sheet: log rows 1-2 lit |
|         | 2. Attempt    24 hour line fills               |  sheet: log row 3 lit    |
|         | 3. Serve      finder: type or choose           |  sheet: statement lit    |
|         | 4. Prove      two outcomes                     |  sheet: sworn + signature|
+--------------------------------------------------------------------------------------+
| [PAPER] What we do                                                                   |
|   Process serving    description + link         (2 px rules draw in on scroll)       |
|   Court filing       description + link                                              |
|   Corporate search   description + link                                              |
|   Who handles your file     Jasmine Deo, LLB ...                                     |
+--------------------------------------------------------------------------------------+
| [NAVY]  Pricing: each service starts from   |  What is included (table)              |
|         $168 (very large)                    |  [See all pricing]                     |
+--------------------------------------------------------------------------------------+
| [MIST]  Vancouver and the Lower Mainland: route map (8 cols) | panel (4 cols)        |
|         list of 15 buttons below                                                     |
+--------------------------------------------------------------------------------------+
| [PAPER] Instructing from outside BC            | navy card: live Vancouver clock     |
+--------------------------------------------------------------------------------------+
| [MIST]  Request service: form (7 cols)         | what to send, call or email         |
| [PAPER] Common questions                                                             |
| [NAVY]  Request service. 778-238-2797 (huge)   [Request service]  email              |
+--------------------------------------------------------------------------------------+
| [MIST] footer                                                                        |
+--------------------------------------------------------------------------------------+
```

### Home wireframe, 375 px

```
[logo]                    Menu            header solid navy, then paper after the hero
Process serving
in Vancouver, BC
lead paragraph
[ Request service ]           (full width)
4 facts, white rules, one column
------- mist surface -------
[ sample sheet ]               not pinned, all parts lit
How a file progresses
1. Instruct ...
2. Attempt   (24 hour line, labels in 2 columns)
3. Serve     (finder)
4. Prove
...
[Call 778-238-2797 | Request service]   fixed bar, hides while a field has focus
```

### Inner pages
- **Intro:** `--ink` surface containing the header, breadcrumb, the H1 in `--h1-page`, a 2-sentence lead and the two actions. Left aligned. A relevant slice of the sample sheet may appear on `/process-serving/` only.
- **Body:** alternate `--paper`, `--mist` and one navy surface.
- **Close:** the closing section on `--ink`.

## 7. Components

Build each as an Astro component in `src/components/` and document it in the `/dev/components` route (excluded from production). Reproduce the specimen, then adjust only for real content.

### 7.1 Header (`SiteHeader.astro`)
- Fixed, 68 px high. Navy over the hero. After the hero it turns paper with a 1 px `--mist-2` bottom rule. The state is the attribute `data-solid` on `<html>`, set by the scroll engine.
- A 3 px `--pen` progress bar on its bottom edge, `transform: scaleX(var(--sp))`, shown only when the header is paper.
- It slides up (`data-hide`) while scrolling down after 60 percent of the viewport, and returns on any scroll up. It never hides while a menu is open or a field inside it has focus.
- Links: **Services** (a `<details>` disclosure with Process serving, Court filing, Corporate search), Pricing, Coverage, Out of province, Guides, About, the phone number in Plex Mono, and the **Request service** button. The current section gets `aria-current="true"` from the scroll engine (home page anchors) or from the route (inner pages), shown as a 2 px underline.
- Under 1000 px the nav collapses to the wordmark and **Menu**. It opens a full-screen list with the same links. The header phone and button are hidden under 700 px because the bottom bar carries both.
- Wordmark: the supplied logo. The specimen uses text as a stand-in.

### 7.2 Hero (`Hero.astro`)
- Navy surface that contains the header. H1 in `--h1`. Lead (`--step-1`, `--muted-on-ink`, max 34 rem), the two actions, then the four facts in a 2 by 2 grid with a 1 px white-at-38-percent rule above each (use `--muted-on-ink` in code, not opacity).
- Text column plus a 30 rem column for the sheet at 1000 px and above. Facts come from `content/home.md`: only approved facts.
- At 1440 by 900 the whole sheet is visible in the first viewport, and the H1 and primary button are visible without scrolling.

### 7.3 Sample sheet (`SpecimenAffidavit.astro`)
- White sheet, square corners, `--shadow-sheet`. Two paper layers behind it (`::before`, `::after` of the wrapper), offset 8/16 px and rotated 0.7/1.4 degrees, drifting 10 to 28 px with `--hp`. Under 1000 px use offsets 4/8 px with no drift.
- A `--mist` band on top: "Sample. Fictional parties, address and file number." Mandatory, so the sample can never be mistaken for a real record.
- Heading as on a real form: court, registry, file number (mono), parties, title in caps. Then the **log**: four entries in Plex Mono 500, a 2 px ink rule above, 1 px `--mist-2` rules between rows. Then the sworn statement in Plex Serif 400 with numbered paragraphs (a real sequence), then the sworn line and the signature. Do not copy the text of a real court form.
- Log entries and their step: rows 1 and 2 "Instructions received", "Availability confirmed" belong to Instruct. Row 3 "Attempt 1 of 3. Served." belongs to Attempt. The statement paragraphs belong to Serve. Row 4 "Affidavit sworn", the sworn line and the signature belong to Prove.
- Three `<mark>` elements: date and time, address, "handed the document to the person served". Annotations open on hover, focus or tap through one tooltip element placed by script and clamped to the sheet width. No pseudo-element tooltips (they cause horizontal scroll on phones).
- The signature is an SVG path (`design/signature.svg`) with `pathLength="1"`, drawn with `stroke-dashoffset`. The signer is the fictional "Alex Morgan, process server".
- Spotlight: each part's opacity is `calc(0.28 + 0.72 * var(--fN))`. See section 9.

### 7.4 Steps (`Step.astro`, `ProcessSteps.astro`)
Props: `n`, `name`, `heading`. Layout: a 2 px rail on the left (`--mist-2`) with a `--pen` overlay that fills with `scaleY(var(--fN))` as the step comes into focus. Step name in `--h3`, Plex Serif 500, `--pen`. H3 in Plex Serif at `--step-1`. Minimum height 66 svh on desktop so each step has room to be in focus. No minimum height below 1000 px.
- **Instruct:** ruled checklist (2 px ink rule above, 1 px `--mist-2` between rows), one paragraph, a "Deadline this week?" line with a 4 px `--pad` bar on its left, the primary button.
- **Attempt:** the 24 hour line (7.5).
- **Serve:** the document finder (7.6) and one paragraph on out-of-province documents.
- **Prove:** the two outcomes (7.7).

### 7.5 The 24 hour line (`AttemptLine.astro`)
- A 6 px track in `--mist-2` with a `--pen` fill, `transform: scaleX(var(--f2))`. The fill follows scroll, so it fills as Attempt comes into focus and empties as it leaves.
- Four labelled points under the track in a 4 column grid: Received ("Documents and instructions"), Attempt 1 ("Typically within 24 hours"), Attempt 2 ("Recorded the same way"), Attempt 3 ("Up to 3 attempts included").
- Do not state times for attempts 2 and 3. Only the facts in the facts register may be shown.
- Under 700 px the four points become two columns.

### 7.6 Document finder (`DocumentFinder.astro`)
- A search field ("What are you serving?", placeholder "Try: subpoena, demand letter, notice to end tenancy") above six toggle chips: Civil litigation, Family, Witness documents, Commercial and debt, Residential tenancy, Corporate. Typing matches a category by its keywords. Choosing a chip clears the field.
- The panel under it shows the category name, the common documents, and what to send. The exact document lists come from `content/home.md`.
- Server render all six panels in the HTML so the content is crawlable. Script only changes which is visible. Without script, show all six in order and hide the search field.
- Link to the form with the category stored in `sessionStorage`. Never put matter details, names or addresses in the URL.
- The live region is the panel (`aria-live="polite"`).

### 7.7 Outcomes (`Outcomes.astro`)
Two blocks under the Prove heading, each with a 2 px ink rule above: **When service is complete** (a sworn Affidavit of Service recording when, where and how) and **If service cannot be completed** (affidavit of attempted service and an update on next steps; the firm decides what comes next).

### 7.8 Services and "Who handles your file" (`ServiceRows.astro`)
- Three ruled rows. Each row is one link: the service name in Plex Serif 500 (`clamp(2rem, 1.1rem + 3.2vw, 4rem)`), a description at body size and an underlined link phrase. A 2 px ink rule above the list and below each row. The row rule is drawn with `scaleX(var(--r))` as the row enters.
- Hover: the row background becomes `--mist` and the name moves 10 px right and turns `--pen`. The wash extends 14 px past the text edges with `box-shadow`, so the text stays aligned with the heading above.
- No icons, cards or arrows.
- Below the list, a two-column block "Who handles your file": H3 left, founder paragraph and link to `/about/` right. This is the "Why ServePoint" content of the current site.

### 7.9 Pricing surface (`PricingSurface.astro`)
- `--ink` surface. Left: the H2, the price figure in `--amt` (Plex Serif 500, `line-height: 0.9`, a small muted `$` aligned to the cap height), and one sentence: pricing is confirmed before service, and rush, travel and special requests may add to it. Right: a `<table>` of what is included per service (3 rows) with `<caption>` and one button.
- Marks in the first row scrub with scroll (`background-size: calc(var(--r) * 100%) 90%`).
- The figure is the real "from" price from the facts register. It appears once per page. Add rush amounts only after the owner confirms them (`docs/12`).

### 7.10 Coverage route map (`CoverageMap.astro`)
- A drawn diagram, not a geographic map. Inline SVG, viewBox 1000 by 620, built from `design/coverage-map-data.json`: 15 nodes, 5 lines with 45 degree bends, water shapes in `--water` (decoration), water labels in Plex Serif italic at `--muted`.
- Lines are drawn on scroll: each path has `pathLength="1"` and `stroke-dashoffset: calc(1 - var(--r))`. Nodes light in route order: each node has `--t` (0 to 0.85) and its opacity is `clamp(0.3, calc(0.3 + (var(--r) - var(--t)) * 12), 1)`. Fully drawn when the top of the map reaches the top quarter of the viewport.
- Nodes are white dots with a 3.5 px ink outline. The selected node is filled `--pen`. Labels are Plex Sans 600 with a `--mist` halo (`paint-order: stroke`).
- Each node is focusable (`tabindex="0"`, `role="button"`, `aria-pressed`) and works with Enter and Space. A list of 15 real buttons below the map controls the same panel and is the primary control on phones.
- Panel (white, `--shadow-sheet`, 4 px radius): neighbourhoods, nearest courts (cited per city in the build), link to the city page if published, link to the form.
- Under 700 px hide labels except the selected one.
- Caption: "Schematic. Not to scale." Lines mean "service network", not routes the firm drives.

### 7.11 Vancouver clock (`VancouverClock.astro`)
- Navy card on the white "Out of province" surface. Time in Plex Mono 500 at `clamp(3rem, 2rem + 5vw, 6rem)` with "a.m." or "p.m." in Plex Sans 600 at 32 percent of that size. Below it "Vancouver, Pacific Time" and the date.
- `Intl.DateTimeFormat("en-CA", { timeZone: "America/Vancouver", hour12: true })` with `formatToParts`, refreshed every 15 seconds. Server render a placeholder with no layout shift. `aria-live="off"`.
- Do not add office hours or "we are open now" until the owner confirms hours.

### 7.12 Request form (`RequestForm.astro`)
- Mist surface, white form box with `--shadow-sheet`. Two steps: **Step 1 of 2: The file** (firm, name, email, matter reference, service required including "Not sure, please advise", urgency) and **Step 2 of 2: The person and the place** (person or company to be served, address with unit or suite number). A status line in Plex Mono names the step.
- Step change uses `document.startViewTransition` where available, with `view-transition-name: form`, otherwise swaps immediately. Under reduced motion it swaps immediately. Both steps are always in the DOM and the form works with a single submit if script is missing.
- Service and urgency options are large toggle buttons built from radio inputs (visually hidden input, label as button, `:focus-visible` on the label).
- Errors: text in `--alert` below the field, a `--alert` border, and `aria-describedby`. Messages say what to enter ("Enter an email address we can reply to, like name@firm.ca").
- Netlify Forms with a honeypot field `bot-field`. See `content/request-service.md` for the field map.

### 7.13 FAQ (`FaqList.astro`)
Native `<details>`. Summary in Plex Sans 600 at `--step-1`, with a "+" drawn in Plex Mono that rotates 45 degrees when open. 2 px ink rules between items. Open and close animate block size through `::details-content` with `interpolate-size: allow-keywords` (progressive enhancement: unsupported browsers open instantly). Six questions from `content/faqs.md`.

### 7.14 Closing section (`Closing.astro`)
Navy surface. H2, one sentence, the phone number as a link in `--display-close` (hover `--pad`), then the button and the email. One primary action.

### 7.15 Buttons
- Primary on light surfaces: `--pen` fill, white text, 4 px radius, 56 px high, weight 600, hover `--pen-deep`, pressed translate 1 px. No arrows.
- On navy surfaces and in the unscrolled header: white fill, `--ink` text. Hover `--pad`.
- Small variant in the header: 44 px high.
- Secondary: a text link with a 3 px underline (`--pen` on light, `--pad` on navy).
- Focus: 3 px `--pen` outline with 3 px offset on light surfaces, `--pad` on navy.
- Toggle chips (finder, service and urgency, community list): 44 px high, 2 px ink border, 4 px radius, selected = `--ink` fill with white text.

### 7.16 Footer, mobile bar, tables
- Footer: `--mist`, four link groups (Services, Coverage, Company, Contact), disclaimer line "ServePoint Canada provides process serving and legal support services. This website does not provide legal advice."
- Fixed bottom bar under 700 px: **Call 778-238-2797** and **Request service**, 56 px high, 2 px ink top border, hides while a form field has focus. The body gets matching bottom padding.
- Tables: real `<table>` with `<caption>`. Under 700 px rows become stacked label and value pairs, keeping table semantics. `caption { display: block; width: 100% }`.

### 7.17 Logo
Use the supplied logo. A reversed version on navy. Request an SVG (`docs/12`). Minimum height 28 px.

## 8. Imagery

- Ship without photography if none is available. The layout holds because the sheet, the type and the map carry it.
- When photos exist: documentary, natural light, Lower Mainland locations. Building entrances, intercom panels, mailrooms, a registry counter with permission, a hand passing an envelope with no face visible. Full-width on a mist or paper surface, never behind text, never duotoned, never parallaxed.
- The founder portrait (`jasmine.jpg`) is real and goes on the About page and the author block of guides.
- Alt text describes what is shown. No keyword stuffing.
- Never use stock photos of gavels, scales, handshakes, skylines with overlays or people at laptops.
- The live site's images were not visible when this direction was written. Review them with the owner before deciding what to keep.

## 9. Motion and scroll choreography

### 9.1 Rules
1. **Tie it to meaning.** Every effect shows a state, a sequence or a relationship. If it does not, remove it.
2. **Scrub, do not trigger.** Scroll effects are driven by scroll position (a number from 0 to 1), so they run backwards when the visitor scrolls up. No effect plays once and then stays.
3. **One exception: the load moment.** Once, on load, the three highlighter marks draw and then the signature is written.
4. **Finished state by default.** All scroll variables default to their finished value in CSS. The engine sets them to 0 only when script runs and motion is allowed.
5. **Compositor-friendly properties only.** `transform`, `opacity`, `clip-path`, `stroke-dashoffset`, `background-size` on small elements. Never animate `top`, `left`, `width`, `height` or `margin`.
6. **No scroll-jacking.** The page scrolls natively at native speed. No snap, no scroll-hijack, no horizontal scroll sections, no wheel capture.
7. **Reduced motion** (`prefers-reduced-motion: reduce`): the engine sets every variable to its final value, adds no listeners, the load moment is skipped and the sheet shows `drawn`. Transitions are 0 ms. The view transition is skipped.
8. Nothing flashes, nothing loops, nothing autoplays.

### 9.2 The effects

| # | Effect | Driver | Result | Reversible |
|---|---|---|---|---|
| 1 | **Load moment** | page load, once | At 350 ms the sheet gets `.drawn`. Marks draw left to right (700 ms, 140 ms stagger, 400 ms delay). The signature is written 1.5 s later over 1.5 s | n/a |
| 2 | **Header state** | scroll position | Navy over the hero, paper after `hero bottom - 12 svh`. Progress bar `scaleX(--sp)`. Hides on scroll down after 60 svh, returns on scroll up | yes |
| 3 | **Pinned sheet and spotlight** | per-step focus `--f1..--f4` | The sheet stays pinned. Parts dim to 28 percent and light to 100 percent according to the active step (see 9.3) | yes |
| 4 | **Step rail** | `--f1..--f4` | The 2 px `--pen` rail of each step fills with `scaleY(--fN)` | yes |
| 5 | **24 hour line** | `--f2` | The fill follows `scaleX(--f2)` | yes |
| 6 | **Paper stack drift** | `--hp` | The two paper layers drift 10 and 20 px right and 14 and 28 px down over the height of the hero | yes |
| 7 | **H2 mask reveal** | `--r` on each `[data-reveal]` | `clip-path: inset(-.1em 0 calc((1 - var(--r)) * 105%) 0)`. Complete when the heading is above 62 percent of the viewport | yes |
| 8 | **Service rule draw** | `--r` | Each row's bottom rule draws with `scaleX(--r)` | yes |
| 9 | **Pricing marks** | `--r` on `.price-rows` | Highlighter in the first included row scrubs from 0 to 100 percent | yes |
| 10 | **Coverage routes** | `--r` on `#map` | Lines draw with `stroke-dashoffset`. Nodes light in route order from 30 to 100 percent opacity | yes |
| 11 | **Nav spy** | section in the middle of the viewport | `aria-current="true"` on the matching link | yes |
| 12 | **FAQ open** | click | Block size animates (300 ms) | yes |
| 13 | **Form step** | click | View transition (220 ms cross-fade) between step 1 and step 2 | n/a |
| 14 | **Hover and press** | pointer | Buttons 220 ms colour, 1 px press. Service row name moves 10 px. Chips 140 ms | n/a |

Effects 1 to 11 are in `design/scroll-engine.js` and `design/direction-specimen.html`. Effects 12 to 14 are CSS and a few lines of script (also in the specimen).

### 9.3 Focus weights (the spotlight)

For each step `i` (1 to 4), per animation frame:

```
c  = step.top + min(step.height * 0.3, viewportHeight * 0.28)
fi = clamp(1 - abs(c - viewportHeight * 0.42) / (viewportHeight * 0.5), 0, 1)
if i == 1 and c > viewportHeight * 0.42:  fi = 1          // leaving the hero: step 1 takes focus first
fi = max(fi, heroWeight, endWeight)                        // hero and end of story: the whole sheet is lit
if viewport < 1000 px:  fi = 1                             // nothing is pinned on small screens
```

`heroWeight = clamp(1 - scrollY / (viewportHeight * 0.75), 0, 1)`. `endWeight = clamp((viewportHeight * 0.95 - lastStep.bottom) / (viewportHeight * 0.3), 0, 1)`.

| Sheet part | Weight variable | Lit when |
|---|---|---|
| Log rows 1 and 2 | `--f1` | Instruct is in focus |
| Log row 3 | `--f2` | Attempt is in focus |
| Statement paragraphs with the three marks | `--f3` | Serve is in focus |
| Log row 4, sworn line, signature | `--f4` | Prove is in focus |

Verified in the specimen at 1440 by 900: with each step at its focus point the computed weights are exactly 1 for that step and 0 for the others (a small residual appears for steps before the end of the story).

### 9.4 Engine contract
- `design/scroll-engine.js`. One passive `scroll` listener and one `resize` listener, both only schedule a single `requestAnimationFrame`. In the frame: read all `getBoundingClientRect()` values first, then write all custom properties. Never read after write.
- It writes only CSS custom properties and the attributes `data-solid` and `data-hide` on `<html>`. Components never read scroll position themselves.
- Port it to `src/scripts/scroll-engine.ts` without changing behaviour. Inline it in the base layout (about 4 KB) or ship as one deferred module. It must not block rendering.
- Optional upgrade after launch: replace effects 4 to 10 with native scroll-driven animations (`animation-timeline: view()` or `scroll()`) inside `@supports (animation-timeline: scroll())`, which are Baseline Newly available in 2026 (Chrome and Edge 115, Safari 26, Firefox 159). Do not run both drivers on the same property. Keep the JS engine for the focus weights, which depend on viewport height and cross-element logic.
- Cross-page View Transitions (`@view-transition { navigation: auto; }`) are a progressive enhancement for page-to-page navigation: Chrome and Edge 126, Safari 18.2. Firefox support was still flagged in April 2026. Unsupported browsers do a normal page load. The specimen is a single page and does not test this, so add it in phase 6 and verify that it does not delay first paint.
- Performance budget: no long tasks above 50 ms from the engine, scroll stays at 60 fps on a mid-range phone, no layout shift from scroll effects (CLS 0).

## 10. Design review checklist

Run after every page at 375, 768, 1280 and 1536 px using `npm run shots`, **at several scroll positions** (top, hero end, each of the four steps, pricing, coverage, form, close). Fix before continuing.

1. Remove the logo. Could this be any other law or service site? If yes, find what is generic and change it. The pinned sheet and the type system should be the answer.
2. Does the page change surface at least twice, and do neighbouring sections differ in colour and layout?
3. Is the display type large enough to be the personality of the page, with plain text under it?
4. Are all colours tokens? Is black absent? Is `--pad` used only for marks and bars? Is `--muted` never on navy?
5. Is any heading accented on a single word? Any label above a heading? Any all-caps label? Any middle-dot meta string? Any arrow glyph on a button?
6. Are numbered markers used only for real sequences (affidavit paragraphs, the four steps, the form steps)?
7. Are there identical cards, tiles or rounded boxes in a row? There must be none.
8. Is every shadow `--shadow-sheet` on an allowed object, or absent?
9. Is there exactly one primary action in view and is it named correctly?
10. Does every interactive element show a visible focus state on its own surface?
11. Body text under 70 characters per line and at least 17 px at 375 px?
12. Do tables and the map work at 375 px with no horizontal scroll?
13. **Motion:** does every effect show a state or relationship? Does it run backwards on scroll up? Is the final state complete with script disabled and with reduced motion on?
14. **Pinned sheet:** at each step's focus point, is the right part of the sheet lit and the rest dimmed but still readable? Does the stack shadow stay inside the mist surface at the end of the story?
15. Is any fact shown that is not in the facts register (`docs/09`)? Is any price, time or claim invented?
16. Remove one element. Does the page get better? If yes, remove it.

## 11. Banned patterns

Gradients of any kind (the solid-colour highlighter technique on `mark` is the one exception). Glassmorphism or blur. Identical rounded cards in a grid. Soft grey drop shadows under rows of items. Icon-in-circle tiles. Emoji icons. Tracked-out all-caps eyebrows. A single word of a headline in italic, bold or colour. Numbered markers on non-sequences. Rows of stats with small labels. Fake client logo walls and invented counters. Floating blobs, grain or noise overlays. Stock photography of legal clichés. Centre-aligned body paragraphs. A near-black page with a neon accent. A cream page with a terracotta accent. Navy and gold. Arrow glyphs on buttons and links. Decorative stamps.

Motion that is banned: fade-and-slide-up entrances on sections or cards, parallax on photos or text (the paper stack drift in 9.2 is the only parallax), scroll-jacking or scroll snap, horizontal scroll sections, scroll counters, marquees, cursor effects, looping animation, autoplay video or carousels, effects that play once and do not reverse (except the load moment).

## 12. Implementation notes from the render checks

Found while building and testing the specimen at 1440 by 900, 820 by 1100 and 375 by 812 with Chrome 153. Keep these in the build.

- **One sticky element across two sections** needs both to live in one grid. A sticky element is constrained by its containing block, so `.pin` spans rows 1 and 2 and the sheet sticks inside it.
- **Full-bleed surfaces inside a max-width grid:** use `box-shadow: 0 0 0 100vmax <colour>` plus `clip-path: inset(0 -100vmax)` on the surface element. This avoids horizontal overflow from `100vw`.
- **Stack shadow bleed:** the sheet's paper stack and shadow extend about 50 px past the sheet. Give the pin `padding-bottom: 7.5rem` so the end of the story stays inside the mist surface.
- **Transparent header over content** lets the hero buttons run under the navigation. Use a solid navy header from the start. It is invisible against the navy hero and removes the collision.
- **Reveal threshold:** with a scrubbed mask, a heading is half-cut for a moment as it enters. Complete the reveal when the heading reaches 62 percent of the viewport, not later, so headings are never cut while being read.
- **Global H2 size:** set `h2 { font-size: var(--h2) }` in the base layer. Section-specific heading classes cause some H2s to fall back to the browser default.
- **Service rows:** put the hover wash on the link with `box-shadow` instead of padding, so the names stay aligned with the heading above.
- **Highlighter marks:** `background` gradient with `background-size` animated from `0 90%` to `100% 90%` and `box-decoration-break: clone`. No positioned pseudo-element (breaks on wrapped lines) and no `white-space: nowrap`.
- **Tooltip:** one element placed by script and clamped to the sheet. Pseudo-element tooltips cause horizontal scroll on phones.
- **Mobile sheet:** reduce the stack offsets to 4 and 8 px, widen the log time column to 7.7 rem, or "Mar 4, 11:05 a.m." wraps.
- **Clock:** large mono "3:18 p.m." looks clumsy with a full-size meridiem. Render the meridiem in Plex Sans at a third of the size, and keep a real space before it so screen readers read "3:18 p.m.".
- **Tables under 700 px:** stack rows and set `caption { display: block; width: 100% }`.
- **Long strings** such as the email address need `overflow-wrap: anywhere` on links.
- **Measured at test time:** no horizontal overflow at 1440, 820 and 375 px, no console errors, finder search and chips work, map node selection works, form steps switch, the clock shows Vancouver time. With reduced motion every focus weight is 1, the signature is drawn and the marks are filled. With script disabled the page is complete.
- **Not verified:** the specimen was checked in Chrome only. Check Safari and Firefox in phase 6. The live site's images were not seen, so photography decisions are open. There is no traffic data behind any of the UX choices.
