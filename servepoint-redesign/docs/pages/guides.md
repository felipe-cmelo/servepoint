# Page spec: Guides (`/guides/` and `/guides/[slug]/`)

## Hub: `/guides/`
**H1:** Guides to serving documents in BC.
Intro states the author: Jasmine Deo, LLB, and that guides are practical, not legal advice. List guides as an editorial list: title, one-sentence description, last reviewed date. Group by the stage of the file when there are more than eight (Before service, Serving, Proving service).

## Guide template: `/guides/[slug]/`

Front matter (Zod schema):
```yaml
title:
description:        # one sentence, used for meta
primaryKeyword:
author: Jasmine Deo
reviewed: 2026-00-00   # date the founder last verified against current rules
status: draft | published
related: []            # slugs
sources: []            # official URLs with titles
```

Layout:
1. Breadcrumb, H1, one-sentence summary, author line with date reviewed
2. Body at 62 characters measure, H2 sections, short paragraphs
3. "Rules and forms" box: the rule or form numbers with links to the official source (`sources` array)
4. "Next step": one paragraph that links to the matching service page and the form
5. Author block: portrait if available, name, credential, one sentence
6. Two related guides
7. Disclaimer: "This guide gives general information and is not legal advice."

Rules:
- Cite rule numbers and forms. Link to bclaws.gov.bc.ca, bccourts.ca or the Provincial Court site. Do not paraphrase a rule from memory.
- Never tell the reader which method of service their matter requires.
- `status: draft` pages are not built into the sitemap or linked from the hub in production.
- Each guide has `Article` schema and `BreadcrumbList`.

## First guides
See `docs/03` section 6. Build guides 1, 3 and 4 in Phase 4 as drafts for the founder. Official sources to start from:
- Supreme Court Civil Rules, Part 4 Service (Rules 4-1 to 4-7), including Rule 4-3 Personal Service, Rule 4-4 Alternative Methods of Service and Rule 4-6 Proving Service, with Form 15 Affidavit of Personal Service
- Supreme Court Family Rules, Form F15
- BC Supreme Court self-help pages on serving documents (supremecourtbc.ca)
- BC Provincial Court guidance on personal service and certificates of service
