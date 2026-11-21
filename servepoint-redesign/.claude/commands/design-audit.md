---
description: Audit built pages against the ServePoint design direction
---

Audit the design of: $ARGUMENTS (a page path such as `/process-serving/`, or "all").

1. Build and serve the site, then capture screenshots at 375, 768, 1280 and 1536 px and at the scroll positions in `docs/14` Part C (`npm run shots`).
2. Look at every screenshot. For each page, walk `docs/06-design-direction.md` section 10 item by item and answer yes or no with a one-line reason.
3. Search the code for violations: raw hex outside `tokens.css`, `box-shadow` other than `--shadow-sheet`, `linear-gradient` (the only allowed use is the solid-colour highlighter technique on `mark`), `radial-gradient`, `backdrop-filter`, `text-transform: uppercase` outside the specimen, `border-radius` other than the two tokens, scroll-triggered animation libraries, any font family other than IBM Plex, animation or transition of `top`, `left`, `width`, `height` or `margin`, `scroll-snap`, `scroll-behavior` outside the reduced-motion media query, scroll listeners that are not passive.
4. Report in this form: page, issue, evidence (screenshot or file and line), fix.
5. Fix the issues unless the fix changes the design direction. In that case propose the change and wait.
6. Answer the ten critique questions in `docs/14` Part C2 for each screenshot set.
7. End with the single most generic-looking element you can still find and a proposal to replace it.
