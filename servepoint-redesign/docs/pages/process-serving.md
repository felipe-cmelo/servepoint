# Page spec: Process serving (`/process-serving/`)

**Purpose:** the main money page. Rank for process server Vancouver and convert.
**Primary keyword:** process server Vancouver BC. **Supporting:** same day, rush, affidavit of service, law firms, Lower Mainland.
**Copy:** `content/process-serving.md`.
**H1:** Process serving in Vancouver and the Lower Mainland.

## Sections in order

| # | Section | Component | Notes |
|---|---|---|---|
| 1 | Intro | `--ink` surface with header, breadcrumb, H1 in `--h1-page`, 2-sentence lead, actions | States who it is for, what is done, where, the 24 hour first attempt |
| 2 | What we serve | `DocumentFinder` | Six categories with the exact document names in `content/process-serving.md` (taken from the current page). Checklist of what to send. States the instructing firm decides the method of service |
| 3 | How an attempt is handled | On `--mist`: `AttemptLine` (fills with scroll), then text with a short numbered list (this is a real sequence: receive, confirm, attempt, record, update, complete) | Up to 3 attempts included. Each attempt recorded with date, time and location |
| 4 | Sample affidavit | `--ink` surface: `SpecimenAffidavit` with annotations and the paper stack, in a wider layout than on the home page, not pinned | The "Prove" section for this page. Links to the official forms (see below) |
| 5 | When service is difficult | Text plus a 2-column list: what we record, what you receive | Evasion, secured buildings, a recipient who has moved, an outdated address. Affidavit of attempted service. Registered office check for companies. No legal advice about substituted service, only that the attempt record supports the firm's next step |
| 6 | Rush and same day | Short block, price note linking to pricing | Urgency tiers as in the form: Standard, Rush within 48 hours, Rush same day. Amounts `[CONFIRM]` |
| 7 | Where we serve | Compact list of 15 communities with links | Link to `/coverage/` |
| 8 | Outside BC | Short text and link | Link to `/out-of-province-and-us/` |
| 9 | FAQ | `FaqList`, 6 to 8 questions | See `content/faqs.md` |
| 10 | Close | `Closing` | Request service and phone |

## Official sources to link
- BC Supreme Court Civil Rules, Part 4 (Rules 4-1 to 4-7) on bclaws.gov.bc.ca
- Rule 4-6, proving service, and Form 15, Affidavit of Personal Service
- Supreme Court Family Rules, Form F15
- BC Provincial Court guidance on personal service and the certificate of service
Verify each URL at build time and cite the page title. Do not paraphrase rule text.

## Schema
`Service`, `BreadcrumbList`, `FAQPage`.

## Internal links
Pricing, court filing, corporate search (search first, serve second), coverage, out of province, guides on personal service, affidavit of personal service, substituted service, difficult service.

## Acceptance
- One H1. The keyword and "Vancouver, BC" appear in the first 100 words
- No sentence tells a visitor which method of service they must use
- The sample is labelled as fictional
- Page passes definition of done in `CLAUDE.md`
