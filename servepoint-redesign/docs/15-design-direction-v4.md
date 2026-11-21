# 15. Design direction v4: "docket"

Written 2026-11-20 on the project owner's instruction to rebuild the style and the UX. **This document supersedes `docs/06` where they differ** (type scale, colour, surfaces, motion, components, the banned list). `docs/06` is kept for history. Copy rules (`docs/09`), SEO (`docs/08`), the facts register and the information architecture URLs (`docs/04`) are unchanged.

**v4.1, the same day, on the owner's second round of feedback.** The first v4 build was liked, with four corrections: the hero looked like a tech company and should look like a law firm; the scroll animations should feel natural; the site should work much better on a phone (more interactive, less text, more professional); the copy should be shorter. The buttons stay exactly as v4 had them. This file describes the site as it is after v4.1.

## 1. Why v3 was replaced

Measured on the v3 build at common laptop sizes: H1 80 to 92 px, H2 54 to 60 px, body 19 px, lead 24 px, the price figure 240 px, the closing phone number 128 px. The pinned sample sheet was 632 px tall, so at 1280 x 650 its bottom edge sat 106 px below the viewport. Everything was too large, the pinned element did not fit short screens, and the page read as one long poster rather than a tool.

## 2. Concept

**A brief on a desk.** The interface is calm and precise, like a well-set legal brief: flat navy and white pages, serif headings, hairlines, a single sheet of paper as the picture. The documents it shows (the sworn affidavit, the attempt log, the registry search result) keep legal typography: serif body, ruled lines, tabular figures. Everything a visitor does on the site (find a document type, check an area, price a file, instruct) assembles a record.

Principles:
1. **Smaller and quieter.** Hierarchy comes from weight, space and colour, not size. Body 16 px, H1 at most 52 px, H2 at most 36 px, the price figure at most 88 px.
2. **Every section is a tool or a deliverable**, never a slogan. The visitor can try something or see what they will receive.
3. **One signature: the sample sheet**, a sheet of paper (a fictional affidavit of personal service) with a record of service on it. It appears in the hero, pinned beside the process scene, and on the process serving page. Highlighted phrases open a short note.
4. **Not a tech company.** No grid lines, no glows, no network art in the hero, no glass panels, no mono type outside file numbers, no keyboard-shortcut chips in the header. Navy is flat.
5. **Motion is time, not scroll.** A block rises a few pixels and fades in once, when it comes into view. Nothing is scrubbed by the scroll position. Everything is complete with no script and under reduced motion.
6. **Show less on a phone, let the reader open more.** See section 9.
7. **Robust at any viewport.** Sticky elements are sized from `svh` so they fit a 1280 x 650 laptop. Nothing is wider than the viewport at 320 px.
8. **Keyboard first.** Command palette (Ctrl or Cmd K, or `/`), native popover menu, native dialog, visible focus everywhere.
9. **Fast.** No framework. Under 25 KB of script per page. Three font files.
10. **Say it short.** One idea per sentence, the fact first, nothing said twice on the same screen.

## 3. Tokens (live file: `src/styles/tokens.css`)

| Role | Value |
|---|---|
| Navy | `--navy-950 #06132B`, `--navy-900 #0A1E45`, `--navy-800 #102A5C`, `--navy-700 #193873` (logo navy `#002049`) |
| Teal | `--teal-400 #2DC8DA` (reversed logo, accents and buttons on navy), `--teal-500 #01A4B7` (logo, graphics only), `--teal-600 #007785` (actions on light, 5.28:1 with white), `--teal-700 #006570` (text and hover on light, 6.78:1) |
| Light surfaces | `--bg #F5F7FA`, `--surface #FFFFFF`, `--surface-2 #EDF1F6` |
| Text on light | `--text #0A1E45` (15:1), `--text-2 #44546F` (7.1:1 on `--bg`), `--text-3 #5B6B85` (5.0:1 on `--bg`) |
| Text on navy | `#FFFFFF`, `--on-dark-2 #B8C4DE` (9.3:1), `--on-dark-3 #9FB0CC` (7.4:1) |
| Lines | `--line #E2E8F0` (decoration), `--line-2 #CFD8E4`, `--control #76869F` (control borders, 3:1) |
| Marks | `--mark #F6E7A1` (highlighter on the sample sheet only), `--served #0B7A5E`, `--alert #B3261E` |

The teal hue (186) is the logo's. Light teal is never used for text on light surfaces. Surfaces carry their own colour roles through `.theme-light`, `.theme-paper` and `.theme-dark`, so components never branch on colour. Navy sections are flat `--navy-900`. The footer and the closing band sit on `--navy-950`.

Type: **Source Serif 4** (variable, one file) for H1, H2, the process stage titles, the price figure, the clock and every document artifact. **Instrument Sans** (variable, one file) for the interface, body text and H3 and below. **IBM Plex Mono 500** only for file and reference numbers. Scale (fluid, 360 to 1440 px): `--fs-sm 14`, `--fs-md 16`, `--fs-lead 17 to 19`, `--fs-h3 18 to 21`, `--fs-h2 24 to 36`, `--fs-h1 32 to 52`, `--fs-fig 56 to 88`. Headings use `--font-heading`, so the family can be changed in one place.

**Buttons are the v4 buttons**: a soft gradient, an inset highlight, depth, a coloured glow, a sheen that sweeps across on hover, a 1 px lift, an arrow that nudges. Primary is teal 400 with near-black navy text on navy, teal 600 with white text on light. Secondary is a quiet card with a hairline. Do not restyle them.

Radius 8 (controls), 14 (cards), 20 (panels). Shadows are soft and belong to cards, menus and the sheet. No grain, no neon, no blobs, no stock photography, no emoji, no glows on sections.

## 4. Structure and navigation

URLs are unchanged (`docs/04`). What changes is how people move.

**Header** (60 px, always the reversed logo): transparent over the hero, solid navy with a hairline once the page moves. Services (mega menu) · Pricing · Coverage · Guides · About · phone · **Request service**. There is no search field in the header (removed at the owner's request). "Out of province" is under Services, "Who we serve", and stays in the footer and on the home page. Under 1060 px: logo and Menu (full-screen dialog with large serif links).

**Services mega menu** (native `popover`): three service entries with a one-line description and "From $168", a "Who we serve" column, a "Resources" column and a call strip.

**Command palette** (native `dialog`): opens with Ctrl or Cmd K, or with the slash key outside a field. There is no button for it in the header. Pages, services, 15 communities and 109 neighbourhoods, guides and actions. Index loaded on first open from `/search.json`.

**Section nav** on service pages and long pages: a sticky bar of anchors that follows the reader and marks the section in view. On a phone it is a swipe row with no button.

**Instruct band** closes every page: a no-script GET form with service and urgency chips that opens `/request-service/` pre-filled (no personal data in the URL), plus phone and email.

## 5. Home page order

1. **Hero** (navy, flat): H1 in serif, one short lead, **Request service** and **Call**, "Founded by Jasmine Deo, LLB, a legal professional", four facts, and the sample sheet as a stack of paper. On a phone the sheet is a preview with Read the sample.
2. **How a file progresses** (light): four stages. On a wide screen they are a column with a rail and numbered nodes, the sample sheet is pinned beside them and the stage in focus lights the part of the sheet it produces. On a phone in portrait the whole scene is pinned and each stage fades in over the one before as the reader scrolls (section 9). Stage 3 holds the document finder.
3. **What we do** (navy): a tabbed showcase of the three deliverables with "From $168" and links.
4. **Where we serve** (light): area check (type a neighbourhood or city), the communities as one row of chips, the community panel, and the schematic map on screens wide enough to read it.
5. **Pricing** (navy): the figure and a price explorer (service and urgency).
6. **Instructing from outside BC** (white): text and the Vancouver clock.
7. **Who handles your file** and **FAQ** (light).
8. **Instruct band** and footer (navy).

Inner pages open with a flat navy hero: breadcrumb, H1, lead, actions and a facts card ("At a glance").

## 6. Interactions

Command palette · mega menu · sample sheet notes and the Read the sample control · the process scene (pinned sheet on wide screens, pinned frame with fading stages on phones) · service tabs (ARIA tablist, swipe on a phone) · document finder · area check combobox linked to the map · price explorer · Vancouver clock · FAQ accordion · pre-filled quick start · two-step request composer with a live summary · copy reference and "Email documents" · table of contents with scroll-spy · cross-page fade.

## 7. Motion rules

- **One reveal.** A block that is below the fold when the page opens gets `rv`. When it comes into view it gets `rv-in`: it rises 20 px and fades in over about 0.8 s with an ease-out curve, then the classes are removed and the block is just a block. Blocks that arrive together are staggered by 70 ms. A block on screen at load is never touched. Implemented with `IntersectionObserver` in `src/scripts/scroll-engine.ts`. There is no scroll listener.
- **The header** turns solid after the first few pixels (a sentinel observed at the top of the page).
- **The scene** writes the stage in focus to `data-now`. In a column of stages that is the stage that crosses a line 45% down the window (`IntersectionObserver`). On a phone in portrait the scene is pinned and the stage comes from the scroll position inside the scroll track, in equal parts, through one passive scroll listener that exists only while the track is on screen. Everything it changes is a CSS transition (the rail fill, the node, the heading colour, the lit part of the sheet, the fade between pinned stages). Module: `src/scripts/scene.ts`, loaded only on the home page.
- **The map** draws its network once when it first comes into view.
- **Load only:** the hero sequence (headline, lead, buttons, facts, sheet), the highlighter on the sample sheet, the signature.
- **Page changes** are a short cross fade.
- Banned: scrubbing opacity or position with the scroll, parallax, wipes, scroll-jacking, page-level scroll snap, text dimmed with opacity. A horizontal swipe row with snap on a phone is a control, not scroll-jacking.
- Animate `transform`, `opacity`, `stroke-dashoffset`, `background-size` and colour. Never layout properties.
- `prefers-reduced-motion: reduce` shows every page finished: the engine adds nothing, durations are cut to zero, no view transition. Print shows every block.

## 8. Acceptance

- Computed sizes at 1280 x 720: H1 at most 52 px, H2 at most 36 px, body 16 px.
- No horizontal overflow and no clipped content at 320, 375, 414, 768, 1024, 1280, 1366, 1440, 1536 and 1920 px wide, and at 1280 x 650 and 1366 x 768.
- The pinned sample sheet, with the paper stack under it, is inside the viewport at 1280 x 650 at every stage. The hero sheet starts on the first screen. On phones at 360 x 640, 375 x 667, 390 x 844 and 414 x 896 every pinned stage fits its frame. With mobile emulation the layout viewport stays as wide as the screen on every page (a desktop window hides this failure).
- axe: zero violations on every page, on a desktop and on a phone. CSP: no violations. Lighthouse budgets in `docs/07` section 7 pass.
- Everything works with script off except the palette, the finder, the map selection, the pinned scene and step bar and the two-step form, which degrade to lists, stacked stages and a single-step form.
- Phone: see section 9.

## 9. Phones and touch

The rule: **show less, let the reader open more.** Breakpoints: 40 rem (640 px) for the phone patterns, 62 rem (992 px) for the single-column layouts. Tap targets are at least 44 px.

| Place | On a phone |
|---|---|
| Home hero | H1, one short lead, both actions stacked, centred, 16 rem wide with a 14 px gap, the byline, four facts in two columns, then the sample sheet as a preview with **Read the sample**. First screen at 390 x 844 holds the H1, both actions and the top of the sheet. |
| Page hero | The lead is clamped to three lines with **Read more**. The facts card stays. |
| How a file progresses | **Pinned.** The scene is a tall scroll track (about 2.1 screens) with a frame that sticks under the header, so the page seems to stand still while the reader scrolls. The step bar at the top of the frame is a **carousel of roomy pills** (1 Instruct, 2 Attempt, 3 Serve, 4 Prove) in a row that swipes, with the neighbours fading out at the edges. The pill for the stage in focus is filled and **always centred**: the scene moves the row as the reader scrolls, and a tap on a pill scrolls to that stage. A hairline under the row grows with the scroll. Each stage is a **card that fills the frame**, with a large quiet numeral in the corner, so no band of the frame is empty: the four things to send are rows that share the height, the attempts are a vertical timeline, the six document types are tiles (a swipe row on a short screen), the two outcomes share the height, and the action sits at the foot. Sizes follow the window height (`svh`). Each stage fades in over the one before: the old one lifts away and fades, the new one rises and fades in (0.5 s, ease-out). Scrolling back up reverses it. Each stage holds only what it needs, so it fits on a 640 px screen (the explanatory sentences carry `pin-hide`). A chevron below the card hints at the scroll and goes away at stage 4. Applies to portrait phones (max 640 px wide, at least 576 px tall) with motion allowed. Tablets, landscape phones and reduced motion get all four stages in a column under a step bar that sticks and follows the scroll. |
| What we do | Three equal tabs (icon over name), swipe between panels, the panel keeps the facts, the price and the action. |
| Area check | The typeahead, one swipe row of 15 communities, the community panel with eight neighbourhoods and **Show all**. The schematic map is hidden below 640 px because its labels cannot be read. |
| Card groups | A swipe row with snap and dots (out-of-province expectations). |
| Long text | `data-collapse="3"` clamps lines and `data-fold` clamps a block, each with Read more. A sentence that only repeats its neighbour carries `m-hide`. |
| Request form | Phone, court file number and matter reference fold behind **Add phone, court file number or matter reference**. Inputs carry `autocapitalize`, `enterkeyhint` and the right `type`. The bottom bar is not shown on this page. |
| Bottom bar | Call and Request service. Hidden while the hero actions or the closing band are on screen, while a field has focus, and in short landscape windows. |
| Footer | Brand and disclaimer, then three accordions (Services, Coverage, Company), closed. |
| Guides and legal | The table of contents is a disclosure above the article, closed. |
| Menu | A full-screen navy dialog with large serif links and both actions at the foot. |

## 10. Copy

Tightened on 2026-11-20 at the owner's request: "the texts are too verbose". The page files hold the final wording (`content/*.md` keeps the earlier drafts). Rules: lead with the fact, one idea per sentence, cut the sentence that repeats the one above it, keep every published fact and the qualifier "typically". The statements that the instructing firm chooses the method of service, that pricing is confirmed before service, and the exact footer disclaimer are never cut.
