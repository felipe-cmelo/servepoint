# Page specs: About, Request service, Legal pages

## About (`/about/`)
**H1:** About ServePoint Canada.
**Purpose:** show who is behind the work and how a file is handled. This is the trust page for Daniel the litigator.
**Copy:** `content/about.md`.

| # | Section | Notes |
|---|---|---|
| 1 | Founder statement | Jasmine Deo, LLB. A short first-person or third-person statement, written by or approved by her. The current About page has a headshot (`jasmine.jpg`): ask the owner for the original file. `[CONFIRM: bio, years, practice background]` |
| 2 | How a file is handled | A plain list of the four commitments published today (the current page headings are Responsiveness, Communication, Documentation, Confidentiality): requests reviewed promptly and deadlines confirmed before a file is accepted, a direct contact who knows the file from instruction to affidavit, every attempt recorded, documents, parties and file information kept confidential. Not four identical cards: a ruled list |
| 3 | What we do and do not do | States the services. States that ServePoint does not provide legal advice |
| 4 | Contact | Phone, email, Request service |

No team grid, no values wall, no mission statement. Layout holds without photographs.
Schema: `AboutPage` with the founder `Person`.

## Request service (`/request-service/`)
**H1:** Request service.
**Purpose:** the conversion page. Everything in `docs/05` section 4.
**Copy:** `content/request-service.md`.

Layout: form on the left (7 columns) in two steps. On the right (5 columns): "What to send" list, "After you submit" list, phone and email as alternatives. At 375 px these stack with the form first.

Field mapping from the current form, the extra "Not sure" step and the honeypot are in `content/request-service.md`. Step 2 changes with the service chosen: process serving, court filing, corporate search or not sure.

Behaviour:
- `?service=process-serving|court-filing|corporate-search`, `?city=`, `?topic=` pre-fill and pre-select.
- Success goes to `/request-service/received/` (noindex) with `?ref=SP-...`.
- No marketing, no newsletter, no extra fields.

## Legal pages
`/privacy/`, `/terms/`, `/accessibility/`. Plain language, short. Draft from `docs/07` section 9 and the real behaviour of the site. Mark each "Draft for the owner's legal review" in the phase summary, not on the page. The accessibility page states the target (WCAG 2.2 AA), known issues if any, and how to report a barrier by email or phone.
