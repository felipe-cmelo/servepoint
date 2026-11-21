# Page spec: Corporate search (`/corporate-search/`)

**Purpose:** capture searches for BC corporate searches and registered office confirmation, and feed process serving ("search first, serve second").
**Primary keyword:** BC corporate search. **Supporting:** BC registry search for lawyers, registered office address BC company, certificate of status BC, BC company directors search.
**Copy:** `content/corporate-search.md`.
**H1:** BC corporate search for law firms.

## Sections in order

| # | Section | Component | Notes |
|---|---|---|---|
| 1 | Intro | Breadcrumb, H1, lead, actions | Who needs it: filing, service and related matters. Inputs accepted: company name, incorporation number or trade name |
| 2 | Choose the search | `DataTable` with columns: Search, When you need it, What you receive | Rows: Company summary, Director and officer search, Registered office confirmation, Historical search, Certificate of status, Name and trade name search. Plain-language "when you need it" text, in the style of the best competitor pattern |
| 3 | Search first, serve second | `Surface` blue | Confirm the registered office before service. Order search and service together on one instruction |
| 4 | Turnaround and delivery | Text | Typically within 2 business days. Results delivered by email, digitally |
| 5 | What we add to the official registry | Short text | The official BC Registry offers searches directly. State plainly what ServePoint adds: ordered with the instruction, matter reference, delivered with the service plan. No disparagement |
| 6 | Price | One sentence and link | From $168 |
| 7 | FAQ | 4 to 5 questions | Registered office vs mailing address, certificate of status vs summary, turnaround, what to send |
| 8 | Close | Request service (pre-select Corporate search) and phone | |

## Form integration
The link to the form carries `?service=corporate-search`. Step 2 for this service asks for the company name or incorporation number, the search types needed (checkboxes matching the table) and the deadline. A Matter or file reference field exists in step 1.

## Schema
`Service`, `BreadcrumbList`, `FAQPage`.

## Acceptance
- All six published search types are present and no others
- The official registry is mentioned neutrally with a link to the BC Registry
