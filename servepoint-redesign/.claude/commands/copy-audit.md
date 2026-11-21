---
description: Audit page copy against the ServePoint copy guidelines and facts register
---

Audit copy for: $ARGUMENTS (a page path such as `/process-serving/`, or "all").

DRAFT written in Phase 0 because the original file was missing from the package. Replace it if the original arrives.

1. Run `npm run check:copy` and `npm run check:placeholders`. List every failure with file and line.
2. Build the site. For each page, read the rendered text (headings, body, buttons, alt text, titles, meta descriptions, form labels, error and success messages) and its source in `content/` and `src/`.
3. Check against `docs/09-copy-guidelines.md`:
   - Voice: short declarative sentences, most under 20 words, active voice, concrete nouns, times and places. No selling.
   - Vocabulary: **Request service** is the only name for the primary action and **Call 778-238-2797** for the phone action. One word per concept (instruction or request, file, attempt, documents). No "Get started", "Submit", "Contact us", "Get a quote".
   - Banned: the listed words and phrases, em dashes, "It's not just X, it's Y", lists of three adjectives, rhetorical questions as headings, exclamation marks, emoji, "Whether you are A or B" openers, headlines made of two short slogans.
   - Sentence case on every heading and button. Canadian spelling (colour, centre, neighbourhood, licence as a noun, cheque, defence).
   - Formats: "9:42 a.m." and "Pacific Time" or "PT", "March 4, 2026", "$168" with no cents when whole, CAD stated once on the pricing and US pages.
   - "Vancouver, BC" in titles and H1s where the page is local.
   - Alt text describes the content and never starts with "image of".
4. Check facts against the register in `docs/09` section 4. Flag any sentence that states a fact not in the "Approved" list: years in business, file counts, client names, testimonials, ratings, certifications, insurance, address, hours, amounts for rush, travel or extra attempts, GPS, portal or text updates, Court Services Online agent status, languages. Flag any statement about how a court will treat a matter, and any copy that tells the visitor which method of service they need. The footer disclaimer and the Hague Service Convention wording must match `docs/09` section 7 exactly.
5. Check that numbers agree everywhere they appear (price, 24 hours, 3 attempts, 15 communities, 2 business days). Each must come from `src/data/site.ts` or `src/data/pricing.ts`, not be typed into a page.
6. List every `[CONFIRM: ...]` still in `content/` or `src/`, with the question in `docs/12` it maps to. A `[CONFIRM` in `dist/` is a failure for production.
7. Guides: each rule or form cited by number with a link to the official source, `status: draft` until the founder approves, a last reviewed date.
8. Report as a table: page, location, rule, quote, fix. Fix every mechanical failure (spelling, case, punctuation, banned phrase, wrong action name). For anything that needs a fact, a decision or the founder, do not guess: list what is needed and the question number in `docs/12`.
9. End with the single sentence on each audited page that sounds most like generated text, and a rewrite that states what happens instead.
