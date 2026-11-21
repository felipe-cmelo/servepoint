---
description: Audit scroll and motion behaviour against docs/06 section 9
---

Audit motion on: $ARGUMENTS (a page path such as `/`, or "all").

1. Build and serve the site. Open the page in Chromium with Playwright.
2. List every animated or scroll-linked element (CSS transitions, keyframes, custom properties written by `scroll-engine.ts`, view transitions). Write the table: element, driver, property, reverses on scroll up (yes or no), reduced-motion behaviour, what state or relationship it shows.
3. Delete or fix every row that shows nothing, animates a layout property, or does not reverse (the load moment is the only exception).
4. Verify with `prefers-reduced-motion: reduce`: every variable at its final value, no listeners added, no view transition, signature and marks drawn.
5. Verify with JavaScript disabled: the page is complete.
6. On the home page at 1440 by 900 scroll each of the four steps to its focus point (`scrollY = step.top + min(step.height * 0.3, innerHeight * 0.28) - innerHeight * 0.42`) and check that the computed `--f1` to `--f4` are 1 for the active step and 0 for the others. Confirm the sheet's paper stack and shadow stay inside the mist surface at the end of the story.
7. Record a Chrome performance trace while scrolling the page with 4x CPU throttling. Report any long task above 50 ms and any layout shift.
8. Report in this form: element, issue, evidence, fix. Fix the issues unless the fix changes the design direction.
