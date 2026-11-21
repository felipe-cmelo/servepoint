# Page spec: Out of province and US (`/out-of-province-and-us/`)

**Purpose:** give a firm that has never served in BC a complete, plain explanation and a path to instruct.
**Primary keyword:** serve documents in British Columbia. **Supporting:** process server in Canada for US attorneys, USD invoicing.
**Copy:** `content/out-of-province-and-us.md`.
**H1:** Process serving in BC for US and out-of-province law firms.
Replaces "For US Law Firms" (current title: "Process Serving in BC for US Law Firms"). The page covers other Canadian provinces and the US. "US" stays in the H1, title and meta description because the current page already targets that wording and the rebuild must not lose it. The URL changes to `/out-of-province-and-us/` with a 301 from `/for-us-law-firms/`.

## Sections in order

| # | Section | Component | Notes |
|---|---|---|---|
| 1 | Intro | Breadcrumb, H1, lead, actions | Who it is for. States that firms across Canada and the US instruct ServePoint directly |
| 2 | What to send | Short list | Documents, service address, deadline, any requirements set by your court. Instruct by the form or email |
| 3 | What happens next | Numbered list (real sequence): instruct, we confirm the same business day, first attempt typically within 24 hours, each attempt recorded, proof of service recording when, where and how. Next to it on a `--paper` or `--mist` surface, the navy `VancouverClock` card | In Pacific Time. The clock states the time only, never availability |
| 3b | What to expect | Ruled list of six items, same pattern as the checklist on the home page | The six items on the current page: clear communication, documented attempts, electronic documents by email, Pacific Time with a BC-based provider, USD invoicing on request (not the default), proof of service. Wording in `content/out-of-province-and-us.md` |
| 4 | Documents we accept | Text | Documents issued in other Canadian provinces and the US. The current page lists no document types, so name the six categories from the process serving page and link there |
| 5 | Corporate defendants | Text | Optional corporate search to confirm the registered office before service. Link to corporate search |
| 6 | Billing | Short text | USD invoicing on request. Amounts `[CONFIRM: payment terms]` |
| 7 | The Hague Service Convention | `FaqList` entry and a short text | Applicability depends on the matter. The instructing firm determines the method. ServePoint carries out the instruction locally. Nothing beyond what the founder approves |
| 8 | FAQ | 5 questions | The 5 on the current page plus "What does the affidavit record" |
| 9 | Close | `Closing`: Request service | |

## Schema
`Service` (areaServed Canada and US as audience), `BreadcrumbList`, `FAQPage`.

## Acceptance
- Does not describe how Canadian or US law applies to a matter
- Every statement matches the facts register
