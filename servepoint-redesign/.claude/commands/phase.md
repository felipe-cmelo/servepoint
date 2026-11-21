---
description: Run one phase of the ServePoint rebuild plan (usage: /phase 0 to 6)
---

Execute Phase $ARGUMENTS from `docs/10-implementation-plan.md`.

1. Read `CLAUDE.md`, then every document the phase touches (`docs/00` to `docs/09`, the page specs in `docs/pages/`, and the copy in `content/`).
2. If the phase builds anything visual, open `design/direction-specimen.html` and match it.
3. State your plan in at most 12 lines: files you will create or change, components, risks.
4. Execute. After each page run `npm run shots` and critique the screenshots at 375, 768, 1280 and 1536 px against `docs/06-design-direction.md` section 10. Fix before moving on.
5. Run `npm run check` and the tests the phase lists.
6. If the folder is a git repository, commit with a message that lists what changed. If it is not, do not run `git init`: list the files you created or changed instead.
7. Finish with: what was built, what failed and was fixed, open `[CONFIRM]` items mapped to question numbers in `docs/12`, and anything in the documents you believe is wrong or missing, with a proposed edit.

Do not start the next phase.
