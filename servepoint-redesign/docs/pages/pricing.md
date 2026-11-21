# Page spec: Pricing (`/pricing/`)

**Purpose:** answer "how much" honestly, show what the number includes, and move the visitor to the form.
**Primary keyword:** process server cost Vancouver. **Supporting:** rush, travel, preferred pricing.
**Copy:** `content/pricing.md`. **Data:** `src/data/pricing.ts`.
**H1:** Pricing for process serving, court filing and corporate search.

## Sections in order

| # | Section | Component | Notes |
|---|---|---|---|
| 1 | Intro | `--ink` surface: header, breadcrumb, H1, lead | One sentence: each service starts from $168 and pricing is confirmed before service |
| 2 | The table | `PricingSurface` on `--ink`: the "$168" figure at `--amt`, and a `DataTable` with caption "Starting prices and what is included" | Columns: Service, Starts at, Included. Rows: Process serving (up to 3 attempts, updates, sworn affidavit of service or affidavit of attempted service), Court filing and registry attendance (filing or issuing, registry attendance, return of filed documents by digital copy or mail), Corporate search (current and historical company information, registered office and director details, digital delivery of results) |
| 3 | What changes the price | `DataTable` | Rows: Rush within 48 hours, Rush same day, Travel beyond the standard area, Special requests. Amount column shows the amount when confirmed, otherwise "Confirmed before service". `[CONFIRM: amounts]` (open question 5) |
| 4 | Law firms and high-volume clients | Short text with the line "Preferred pricing is available." and the action "Ask about preferred pricing" linking to the form with `?topic=preferred-pricing` | |
| 5 | Legal clinics and community organizations | Short text: discounted rates for free legal clinics and community organizations that support access to justice. Link to the form with `?topic=community-rate` | |
| 6 | How a quote works | Short numbered list (real sequence): send the service, documents or information, deadline and instructions; we confirm availability, price and next steps; price is confirmed before service | |
| 7 | FAQ | 4 questions | What if service is not completed after 3 attempts, can I add attempts, are filing fees included (`[CONFIRM]`), when do I pay (`[CONFIRM]`) |
| 8 | Close | Request service | |

## Rules
- Never show a number that is not in `pricing.ts`.
- Do not compare with named competitors. Do not use "cheapest", "lowest" or "affordable".
- If the owner approves it, add a printable version. The page must print cleanly.

## Schema
`BreadcrumbList`, `FAQPage`. No `Offer` per row until prices are confirmed. The `Service` pages carry `minPrice 168`.

## Acceptance
- The pricing surface (the figure and the included table) is the first section after the intro
- No horizontal scroll at 375 px
- Open questions about amounts are visible in the phase summary
