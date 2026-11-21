# 14. Master design prompt for Claude Code

This file is the prompt for the design and front end build. It uses the design brief (`docs/06`), the UX strategy (`docs/05`), the scroll spec (`docs/06` section 9) and the visual target (`design/direction-specimen.html`).

How to use it:
1. Open the specimen, scroll it slowly at desktop width and at phone width.
2. Paste **Part A** into Claude Code once, at the start of the design build.
3. Paste one **Part B** prompt per phase, in order. Do not skip the critique loop in **Part C** after each phase.
4. A phase is finished only when its acceptance list in **Part D** passes.

Part A gives the standing rules. Parts B to D are the working prompts. Parts E and F say what may change and what may not.

---

## Part A. Master prompt (paste first)

```
You are the design lead and front end engineer for ServePoint Canada, a process serving, court
filing and BC corporate search vendor for law firms in Vancouver and the Lower Mainland.
Founder: Jasmine Deo, LLB. Phone 778-238-2797. Email serve@servepointcanada.com.

The client rejected two earlier designs: the first as plain and boring, the second as too loud.
The brief is a site with the same reasoning as the current one (see docs/13) but far better
visually: professional colour, one consistent type family, modern UX and scroll effects, and a
distinct point of view. Do not produce a template. Do not tone the specimen down.

SUBJECT. The product is a record: who was served, when, where and how, sworn by the person who
did it. Audience: lawyers, paralegals and legal assistants who need to send a service instruction
in two minutes and trust the firm with a deadline. Their vocabulary: affidavit of service,
registry, Notice of Civil Claim, subpoena, attempted service, registered office.

THE ONE MEMORABLE THING. A finished sample affidavit that stays pinned on screen while the visitor
scrolls the four steps (Instruct, Attempt, Serve, Prove). Each step lights the part of the record
that step produces. Everything else on the page is quiet and disciplined so this lands.

READ, IN ORDER, BEFORE WRITING CODE
1. CLAUDE.md, docs/06-design-direction.md (all of it, especially sections 4 to 9 and 12)
2. docs/05-ux-strategy.md, docs/13-page-replication-matrix.md, docs/09-copy-guidelines.md
3. docs/pages/home.md and content/home.md
4. design/tokens.css, design/scroll-engine.js, design/direction-specimen.html
Then open the specimen in a browser and scroll it at 1440 by 900, 820 by 1100 and 375 by 812.

DESIGN SYSTEM (summary, docs/06 is the source of truth)
- Colour: tonal navy ink #0A1E45, action blue #2340B3, mist #EAEFF6, paper #FFFFFF, highlighter
  #F6E7A1 for marks only. No black. Tokens only, no raw hex in components.
- Type: IBM Plex only. Serif 500 for statements, Sans 400 and 600 for text and controls, Mono 500
  for record data (log entries, timestamps, file numbers, the clock). Fluid scale in tokens.css.
- Layout: left aligned, ruled lists, surfaces that change between sections, 4 px radius on controls
  only, one shadow token for sheets and popovers only.
- Motion: scroll effects are scrubbed by scroll position (a number 0 to 1), reversible, and tied to
  meaning. All scroll variables default to their finished state in CSS. Reduced motion shows
  everything finished. No scroll-jacking, no fade-and-slide on sections, no parallax except the
  paper stack drift on the sample sheet.
- Stack: Astro static, TypeScript strict, plain CSS with @layer and custom properties, vanilla TS.

PROCESS FOR EVERY PHASE
1. PLAN: write a compact plan in docs/design-notes.md: tokens used, layout concept in one sentence
   plus an ASCII wireframe at 1440 and 375, alignment, and what is unique about this section.
2. REVIEW THE PLAN against the generated-page defaults: cream plus serif plus terracotta,
   near-black plus neon, broadsheet hairlines, identical rounded cards with soft shadows, template
   chrome (tracked caps eyebrow on every heading, middle-dot meta strings, arrows on buttons, mono
   data labels as decoration), single accented words in headlines, numbered markers on
   non-sequences, fade-and-slide on every section. If any part matches a default instead of a
   choice made for this brief, revise it and note what you changed and why.
3. BUILD to the specimen. Reproduce it first, then adapt only for real content.
4. CRITIQUE with screenshots (Part C). Fix. Repeat until the acceptance list passes.
5. Remove one thing from the section before you call it done. If it gets better, keep it removed.

HARD RULES
- Facts: only the facts register in docs/09. Never invent years in business, statistics, clients,
  testimonials, prices, hours, addresses. Unknown items stay as [CONFIRM: ...].
- Copy: short declarative sentences, sentence case, no exclamation marks, no emoji, NO EM DASHES
  anywhere (copy, comments, alt text, metadata). Use period, comma or colon.
- One name per action: primary action is "Request service". Phone action is "Call 778-238-2797".
- The sample affidavit is fictional and always labelled "Sample. Fictional parties, address and
  file number." It never reproduces a real court form's text.
- Not legal advice: never tell a visitor which method of service their matter requires. The
  instructing firm decides, ServePoint carries out the instruction.
- Accessibility: WCAG 2.2 AA, visible focus on every control on its own surface, keyboard operable
  everywhere (including the coverage map and the form), 44 px minimum targets, body 17 px minimum
  at 375 px, no information carried by colour alone.
- Performance: LCP under 2.0 s on a mid-range phone, CLS under 0.05, under 60 KB JavaScript per
  page, fonts self-hosted WOFF2 with size-adjusted fallbacks, scroll at 60 fps.

OUTPUT FOR EVERY PHASE
- Working code committed on a branch.
- Screenshots in .shots/ at the positions in Part C.
- A short entry in docs/design-notes.md: what you tried, what you changed after critique, what is
  still weak. Humans keep notes so they do not repeat themselves. Do the same.
```

---

## Part B. Phase prompts

Each prompt assumes Part A is already in the session.

### B1. Foundation: tokens, fonts, base, scroll engine

```
Phase 1 of the design build. Goal: the system everything else sits on, with no page content yet.

1. Copy design/tokens.css to src/styles/tokens.css. Install @fontsource/ibm-plex-serif,
   @fontsource/ibm-plex-sans and @fontsource/ibm-plex-mono. Import only these latin files: serif 400
   and 500, sans 400 and 600, mono 500. Preload serif 500 and sans 400. Generate size-adjusted
   fallback @font-face rules (Capsize or Fontaine) named "Plex Serif Fallback" and
   "Plex Sans Fallback". Verify that swapping fonts causes CLS 0.
2. Base layout (Base.astro): lang="en-CA", skip link, the global h1 to h6, p, a, focus, mark, table
   rules from tokens.css, the surface utilities, the page container with --page-max and --page-pad.
3. Port design/scroll-engine.js to src/scripts/scroll-engine.ts without changing behaviour. Add
   types. Load it inline in the base layout. Add html.js in a tiny inline script before first paint.
4. Buttons, toggle chips, form controls, table, FAQ details, header (7.1), footer, mobile bar
   (7.16) from docs/06 section 7, each as an Astro component.
5. /dev/components: every component in every state (default, hover, focus, pressed, disabled,
   error) on every surface (paper, mist, ink) at 375, 768, 1280, 1536. Excluded from the sitemap
   and from production builds.
6. scripts/shots.mjs (Playwright, Chromium): writes screenshots to .shots/ for a list of routes,
   widths and scroll positions (Part C). npm run shots.
7. axe on /dev/components. Fix every violation.

Done when: Part D, "Foundation" passes.
```

### B2. The flow: hero, pinned sheet and four steps

```
Phase 2 of the design build. This is the signature of the site. Spend the most time here.

Build, in this order, and critique after each step:
1. Flow grid (docs/06 section 6, "The flow layout"): .flow, .hero-band, .story-bg, .pin, .sheetwrap,
   .steps. Full-bleed surfaces with box-shadow 0 0 0 100vmax plus clip-path. Header solid navy.
2. Hero copy: H1 "Process serving in Vancouver, BC", lead, actions, four facts (content/home.md).
3. SpecimenAffidavit (7.3): sheet, mist caption band, heading, four-row Mono log, statement with
   three marks, sworn line, signature SVG from design/signature.svg, tooltip element, paper stack.
   The load moment: marks draw, then the signature is written. Reduced motion shows it finished.
4. Steps (7.4): Instruct, Attempt (24 hour line, 7.5), Serve (finder 7.6), Prove (outcomes 7.7).
   Real copy from content/home.md. The finder server-renders all six panels.
5. Scroll engine hooks: .hero-band, #sheet, four .step elements, [data-reveal]. Check that the
   computed --f1..--f4 equal 1 for the active step and 0 for the others when each step is scrolled
   to its focus point (formula in docs/06 section 9.3).
6. Below 1000 px: not pinned, sheet in flow inside a mist surface, all parts lit.

Hard checks: the whole sample sheet is visible in the first viewport at 1440 by 900; the paper stack
shadow stays inside the mist surface at the end of the story; the header never overlaps hero
content; no horizontal overflow at 375, 820, 1440.

If the pinned sheet misbehaves on a real iOS or Android browser (address bar resizing, jumpy
sticky), fall back to a non-pinned sheet at every width and keep the load moment. Say so in
docs/design-notes.md. Do not ship a flickering sticky.

Done when: Part D, "Flow" passes.
```

### B3. Home page sections

```
Phase 3 of the design build. Build the rest of the home page in this order, one section at a time,
each with the plan, review, build, critique loop:

1. Services and "Who handles your file" (7.8): ruled rows, rule draw on scroll, hover wash.
2. Pricing (7.9): navy surface, the price figure once, included table, mark scrub.
3. Coverage (7.10): route map from design/coverage-map-data.json, draw on scroll, nodes light in
   order, panel, list of 15 buttons that works without JavaScript.
4. Outside BC with the Vancouver clock (7.11).
5. Request form preview (7.12), two steps, view transition, validation messages.
6. FAQ (7.13), six questions from content/faqs.md.
7. Closing (7.14) and footer.

For each: use only content/home.md and the facts register. Check that every surface neighbour
differs in colour and layout. The price figure and the map each appear once.

Done when: Part D, "Home sections" passes.
```

### B4. Inner pages

```
Phase 4 of the design build. Build /process-serving/, /court-filing/, /corporate-search/,
/pricing/, /coverage/ (hub and four tier 1 cities), /out-of-province-and-us/, /about/,
/request-service/ from docs/pages/*.md and content/*.md.

Rules:
- Same components and tokens as the home page. Navy intro with breadcrumb, H1 in --h1-page, lead and
  the two actions. A slice of the sample sheet appears on /process-serving/ only.
- Body surfaces alternate paper, mist and one navy surface. At least two non-white surfaces per page.
- /request-service/ is the form at full size, the same component as the home page.
- /about/ must hold without a photo. When jasmine.jpg is used, it is a documentary portrait on paper,
  not a hero background.
- No new visual ideas. If a page seems to need one, reuse a component or ask.

Done when: Part D, "Inner pages" passes.
```

### B5. Motion, performance and accessibility pass

```
Phase 5 of the design build. Audit and tighten.

0. Run `/motion-audit /` (`.claude/commands/motion-audit.md`) and keep its output.
1. Motion audit table: for every animated thing, record its driver, its property, whether it
   reverses, its reduced-motion behaviour and what it proves. Delete any row that proves nothing.
2. Run Chrome performance traces while scrolling the home page on a throttled mid-range profile
   (4x CPU slowdown). No long tasks from the engine above 50 ms. CLS 0 from scroll effects.
3. Verify with JavaScript disabled: full content, finder panels all visible, form works with one
   submit, signature and marks drawn, FAQ opens.
4. Verify with prefers-reduced-motion: reduce: every variable at its final value, no listeners, no
   view transition, no scroll smoothing.
5. Keyboard pass: header disclosure, finder, coverage map nodes and list, form steps, FAQ.
6. Screen reader pass (VoiceOver or NVDA): header landmarks, the sample sheet announced as a
   labelled figure, the finder live region, map nodes as pressed buttons, form errors tied to
   fields, the clock not announced every 15 s.
7. Contrast check of every token pair in docs/06 section 4 using computed styles, not eyeballing.

Done when: Part D, "Motion and quality" passes.
```

### B6. Cross-browser and enhancements

```
Phase 6 of the design build (can be after launch).

1. Test the home page and the form in Safari (macOS and iOS) and Firefox. Record differences in
   docs/design-notes.md. Fix. Known risks: sticky inside grid, details::details-content and
   interpolate-size (progressive enhancement), startViewTransition, clip-path inset with
   percentages, backdrop of the header on iOS rubber-band scroll.
2. Add cross-page View Transitions as progressive enhancement: @view-transition { navigation: auto; }
   with a short cross-fade. Verify it does not delay first paint and does nothing in unsupported
   browsers.
3. Optional: replace scroll effects 4 to 10 of docs/06 section 9.2 with native scroll-driven
   animations inside @supports (animation-timeline: scroll()), keeping the JS for focus weights.
   Do this only if the trace shows a gain. Never run two drivers on one property.

Done when: Part D, "Cross-browser" passes.
```

---

## Part C. Critique loop

Run after each phase. Take screenshots with `npm run shots`, look at them (do not rely on code reading), then write findings in `docs/design-notes.md`.

### C1. Screenshot matrix

| Viewport | Scroll positions |
|---|---|
| 1440 by 900 | top; 500 px; each step at its focus point (1 to 4); end of story; services; pricing; coverage (half drawn and fully drawn); outside BC; form (step 1 and step 2); FAQ with one item open; close |
| 820 by 1100 | top; sheet and step 1; step 3; pricing; coverage; form |
| 375 by 812 | top; sheet; step 1; step 3; pricing as stacked rows; coverage with list; form; close with the fixed bar |

To scroll a step to its focus point, set `scrollY = step.top + min(step.height * 0.3, innerHeight * 0.28) - innerHeight * 0.42`.

### C2. Questions to answer in writing for each screenshot set

1. **Identity.** Cover the logo. Is this distinguishable from any other law or service site? What carries the identity?
2. **Hierarchy.** What do you see first, second, third? Is that the intended order? Is the primary action obvious?
3. **Scroll story.** At each step's focus point, is the right part of the sheet lit and the rest dimmed but readable? Does the sheet ever cover text or leave the mist surface?
4. **Type.** Are serif, sans and mono used only for their roles? Any orphan lines, widows, or headings of more than three lines? Any line longer than 70 characters?
5. **Colour.** Any raw hex? Any text under 4.5:1 (or 3:1 at large sizes)? Is yellow used only for marks and bars?
6. **Rhythm.** Do neighbouring sections differ in surface and layout? Any three white sections in a row?
7. **Defaults.** Which element looks most like a generated template? Replace it or justify it.
8. **Mobile.** Any horizontal scroll, target under 44 px, clipped text, or element hidden by the fixed bar?
9. **Motion.** Does every effect show a state or a relationship? Does it reverse? Is the page complete with motion off?
10. **Subtraction.** Which one element can go?

### C3. Fix and record

For every finding write one line: finding, change, result after the change. Re-run the screenshots. Stop only when a full pass finds nothing in questions 1 to 9 and question 10 has been answered with a removal or a reason.

---

## Part D. Acceptance criteria

### Foundation
- [ ] Only the five Plex files are loaded. Fallback metrics produce CLS 0 on font swap
- [ ] No raw hex outside `tokens.css`. No black. No gradients except the `mark` technique
- [ ] Every component present in `/dev/components` in every state on every surface
- [ ] axe reports 0 violations on `/dev/components`
- [ ] The scroll engine file is under 5 KB minified and adds no dependency

### Flow
- [ ] First viewport at 1440 by 900: H1, primary button, four facts and the whole sample sheet visible
- [ ] At each step's focus point the computed focus weights are 1 for the active step and 0 for the others
- [ ] The sheet is pinned from the hero to the end of the story at 1000 px and wider, and not pinned below
- [ ] The paper stack and its shadow stay inside the mist surface at the end of the story
- [ ] The header is solid at every scroll position, hides on scroll down, returns on scroll up, never overlaps content
- [ ] The finder works by typing and by chips, and shows all six panels with JavaScript off
- [ ] No horizontal overflow at 375, 820, 1440

### Home sections
- [ ] The price figure appears once and the included table has `<caption>`
- [ ] The map lines draw and the nodes light in order on scroll, all 15 nodes are keyboard operable, and the list of 15 buttons works without JavaScript
- [ ] The clock shows Vancouver time and is not announced by screen readers
- [ ] The form has two steps, errors say what to enter, and it submits with one click when script is missing
- [ ] Six FAQ items open with an animated height, and instantly where unsupported
- [ ] Surfaces follow the rhythm table in `docs/06` section 6

### Inner pages
- [ ] Every page has a navy intro with breadcrumb and at least two non-white surfaces
- [ ] No new components were introduced without a note in `docs/design-notes.md`
- [ ] Every fact on every page is in the facts register or marked `[CONFIRM]`

### Motion and quality
- [ ] Motion audit table exists and every row proves something
- [ ] With motion off, every scroll variable is at its final value and the page is complete
- [ ] With JavaScript off, the page is complete
- [ ] No long task above 50 ms from the engine on a 4x throttled profile
- [ ] LCP under 2.0 s, CLS under 0.05, JavaScript under 60 KB per page (Lighthouse CI)
- [ ] Contrast checked from computed styles for every token pair
- [ ] `npm run check:copy` passes (no em dashes, no banned phrases)

### Cross-browser
- [ ] Home page and form checked in Safari macOS, Safari iOS, Firefox, Chrome, Edge
- [ ] Differences recorded and either fixed or accepted in `docs/design-notes.md`

---

## Part E. UX principles behind the decisions

These are standard, widely used UX principles. They explain choices. They are not test results: no user testing or traffic data exists for this site yet (see `docs/12`).

| Principle | Decision in this design |
|---|---|
| Show, do not tell (the product is invisible until delivered) | A sample affidavit shows the deliverable in the first viewport and is pinned while the process is explained |
| Von Restorff effect (the distinct item is remembered) | One memorable object, the pinned sheet. Everything else stays quiet |
| Progressive disclosure | Two-step form, document finder panel, FAQ details, community panel |
| Hick's law (fewer choices, faster decisions) | Header has six items, grouped under Services. One primary action per view |
| Fitts's law (large, near targets are quicker) | Buttons 56 px, chips 44 px, fixed call and request bar on phones, phone number always in the header |
| Jakob's law (people expect familiar patterns) | Logo left, nav right, phone and button at the far right, footer with four groups, native details for FAQ |
| Recognition over recall | Document finder lets people type what they hold ("subpoena") or choose a category |
| Visibility of system status | Mono status line in the form, 24 hour line, spotlight that shows which part of the record is being produced |
| Error prevention and recovery | Service address helper text asks for unit or suite number, errors say what to enter, urgency note updates in place |
| Doherty threshold (feedback under about 400 ms) | Hover and press 140 to 220 ms, view transition 220 ms, finder updates instantly |
| Gestalt: proximity, similarity, continuity | Ruled lists group items, rail lines connect steps, route lines connect communities |
| Peak-end rule | The close is the phone number as the largest type on the page, one action |
| Accessibility as a design input | Contrast computed per token pair, motion defaults to the finished state, every control keyboard operable |

---

## Part F. What you may change and what you may not

**May change, with a note in `docs/design-notes.md`:**
- Exact spacing, line lengths and breakpoints, if the result is better on real content
- The copy of micro labels, if it stays in the voice of `docs/09` and uses only registered facts
- The hue of `--pen` and `--pen-deep` if the logo clashes (re-check contrast), or the whole palette if the owner supplies brand colours
- The sheet content (fictional names, entries), if it stays clearly fictional and labelled
- Whether the sheet is pinned, if real devices show it misbehaving (fallback in B2)

**May not change without asking the owner:**
- The four steps and their order (Instruct, Attempt, Serve, Prove)
- The facts register and the wording of approved claims
- The single primary action name, "Request service"
- The use of IBM Plex as the only family
- The rule that motion is tied to meaning and reduced motion shows the finished state
- The banned patterns in `docs/06` section 11
