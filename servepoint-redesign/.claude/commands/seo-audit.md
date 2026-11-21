---
description: Audit built pages against the ServePoint SEO specification
---

Audit SEO for: $ARGUMENTS (a page path, or "all").

Build the site, then for each page check against `docs/08-seo-implementation-spec.md` and `docs/03-keyword-research-and-seo-strategy.md`:

1. Title and meta description present, unique, within length, primary keyword near the start, "Vancouver, BC" where local.
2. One H1, heading order with no skipped levels.
3. Canonical present and absolute on `https://servepointcanada.com`.
4. Breadcrumb visible and matching `BreadcrumbList`.
5. JSON-LD parses, matches visible phone, email, price and areas, and contains no rating or review unless shown on the page.
6. At least three internal links, anchor text descriptive, no orphan.
7. Primary keyword is unique to this page across the site (`docs/03` section 4).
8. Images have alt text, dimensions and modern formats.
9. City pages pass the six-point uniqueness test in `docs/03` section 7.
10. Guides cite official rules and forms by number and show a last reviewed date.

Output a table: page, check, pass or fail, fix. Fix failures that are mechanical. For content gaps, list what is needed from the owner and which question in `docs/12` it maps to.
