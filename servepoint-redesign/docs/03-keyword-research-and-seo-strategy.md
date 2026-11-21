# 03. Keyword research and SEO strategy

## 1. Method and limits

Keywords were built from three inputs: the services ServePoint sells, how competitors title their pages and describe their services, and how BC court materials name the work (Supreme Court Civil Rules Part 4 on service, Rule 4-6 on proving service, Form 15 affidavit of personal service, and Provincial Court certificates of service).

**No search volume or difficulty data was available.** Priorities below are judgments of commercial value and fit. Before Phase 2 ends:

1. Load `docs/data/keyword-seed.csv` into Google Keyword Planner (Canada, English) and Semrush or Ahrefs.
2. Fill `volume_ca_monthly` and `difficulty`.
3. Re-rank within each cluster. Move any keyword with real volume but no page into the content plan (section 6).

## 2. Search intent model

| Intent | Who | Example | Page type |
|---|---|---|---|
| Hire a vendor now | Paralegal or lawyer with a deadline | process server Vancouver, same day process server Vancouver | Service and city pages |
| Evaluate a vendor | Lawyer or office manager | process server Vancouver reviews, process server pricing Vancouver | Pricing, About, service pages |
| Learn a procedure | Paralegal, junior lawyer, self-represented person | affidavit of service BC, substituted service BC | Guides |
| Instruct from outside | US or out-of-province firm | serve documents in British Columbia, process server in Canada for US attorneys | Out-of-province page, guides |
| Order a search | Law firm, lender, accountant | BC corporate search, registered office BC | Corporate search page |

**Vancouver disambiguation:** many results for "Vancouver process server" belong to Vancouver, Washington, including templated pages from national networks. Write "Vancouver, BC" and "British Columbia" in titles, H1s, schema and body copy on every page.

## 3. Keyword clusters

Priority: **P1** build in launch, **P2** within 90 days, **P3** after data.

### A. Core service, local

| Keyword | Intent | Target page | Priority |
|---|---|---|---|
| process server Vancouver | Hire | `/process-serving/` | P1 |
| process serving Vancouver BC | Hire | `/process-serving/` | P1 |
| process server Lower Mainland | Hire | `/process-serving/` and `/coverage/` | P1 |
| legal document service Vancouver | Hire | `/process-serving/` | P2 |
| serve legal documents Vancouver | Hire | `/process-serving/` | P2 |
| process server for law firms Vancouver | Hire | `/process-serving/` | P1 |
| professional process server BC | Hire | `/process-serving/` | P2 |
| affidavit of service Vancouver | Hire and learn | `/process-serving/` and guide | P2 |

### B. Urgency

| Keyword | Target page | Priority |
|---|---|---|
| same day process server Vancouver | `/process-serving/` section and guide | P1 |
| rush process server Vancouver | `/process-serving/` | P1 |
| urgent legal document delivery Vancouver | guide | P3 |

### C. City and region

Pattern: "process server [city]". Cities: Vancouver, Burnaby, Richmond, Surrey, New Westminster, Coquitlam, Port Coquitlam, Port Moody, North Vancouver, West Vancouver, Delta, Langley, White Rock, Maple Ridge, Pitt Meadows.

| Tier | Cities | Publish when |
|---|---|---|
| 1 | Vancouver, Burnaby, Surrey, Richmond | Launch, with full unique content |
| 2 | Coquitlam, New Westminster, North Vancouver, Langley, Delta | Within 90 days, each with unique content |
| 3 | Port Coquitlam, Port Moody, West Vancouver, White Rock, Maple Ridge, Pitt Meadows | Grouped on the coverage hub until each has enough unique material. Consider group pages ("North Shore", "Tri-Cities", "Fraser Valley edge") |

### D. Document-type and procedure queries

| Keyword | Intent | Target | Priority |
|---|---|---|---|
| serve notice of civil claim BC | Learn and hire | guide, links to process serving | P1 |
| serve notice of family claim BC | Learn and hire | guide | P2 |
| serve subpoena BC | Learn and hire | guide | P2 |
| serve petition BC Supreme Court | Learn and hire | guide | P2 |
| serve RTB notice residential tenancy BC | Learn and hire | guide | P2 |
| serve demand letter BC | Learn | guide | P3 |
| statutory demand service BC | Learn | guide | P3 |
| builders lien notice service BC | Learn | guide | P3 |
| personal service BC rules | Learn | guide | P1 |
| substituted service BC | Learn | guide | P1 |
| what is an affidavit of personal service BC | Learn | guide | P1 |
| how to serve a corporation in BC | Learn | guide, links to corporate search | P1 |
| serving someone who is avoiding service BC | Learn and hire | guide | P2 |
| serving documents in a condo or secured building | Learn and hire | guide | P2 |

### E. Court filing and registry

| Keyword | Target | Priority |
|---|---|---|
| court filing agent Vancouver | `/court-filing/` | P1 |
| court registry services Vancouver | `/court-filing/` | P1 |
| file documents BC Supreme Court agent | `/court-filing/` | P1 |
| court file search BC | `/court-filing/` | P2 |
| court document retrieval Vancouver | `/court-filing/` | P2 |
| issue notice of civil claim Vancouver | `/court-filing/` | P2 |

### F. Corporate search

| Keyword | Target | Priority |
|---|---|---|
| BC corporate search | `/corporate-search/` | P1 |
| BC registry search for lawyers | `/corporate-search/` | P1 |
| registered office address BC company | `/corporate-search/` | P1 |
| BC company directors search | `/corporate-search/` | P2 |
| certificate of status BC | `/corporate-search/` | P2 |
| BC trade name search | `/corporate-search/` | P3 |

Note: BC Registry offers searches directly, so searchers may want the free official route. The page must explain what ServePoint adds: searches ordered with service, interpreted for service purposes, delivered with the instruction.

### G. Out-of-province and US

| Keyword | Target | Priority |
|---|---|---|
| serve documents in British Columbia | `/out-of-province-and-us/` | P1 |
| process server in Canada for US attorneys | `/out-of-province-and-us/` | P1 |
| serve legal papers in Canada from the US | `/out-of-province-and-us/` and guide | P2 |
| Hague Service Convention British Columbia | guide | P3 |
| process server Vancouver USD invoice | `/out-of-province-and-us/` | P3 |

### H. Evaluation and pricing

| Keyword | Target | Priority |
|---|---|---|
| how much does a process server cost Vancouver | `/pricing/` and guide | P1 |
| process server cost BC | `/pricing/` | P1 |
| affordable process server Vancouver | `/pricing/` (only with honest positioning) | P3 |

## 4. Page-to-keyword map

| Page | Primary keyword | Supporting |
|---|---|---|
| `/` | process server Vancouver | process serving Lower Mainland, court filing, BC corporate search |
| `/process-serving/` | process server Vancouver BC | same day, rush, affidavit of service, law firms |
| `/court-filing/` | court filing agent Vancouver | court registry services, court file search |
| `/corporate-search/` | BC corporate search | registered office, directors, certificate of status |
| `/pricing/` | process server cost Vancouver | rush, travel, preferred pricing |
| `/coverage/` | process server Lower Mainland | all cities |
| `/coverage/[city]/` | process server [city] BC | local courts, neighbourhoods |
| `/out-of-province-and-us/` | serve documents in British Columbia | US attorneys, USD invoicing |
| `/guides/*` | see section 3D | internal links to service pages |

One primary keyword per page. Do not target the same keyword on two pages.

## 5. Local SEO

### Google Business Profile
- Create or claim the profile. Category: Process server. Secondary: Legal services, Courier service only if accurate.
- If there is no public office, set it as a service-area business and hide the address. The address is still required privately for verification (open question 7).
- Service areas: the 15 communities. Add the three services as products or services with the same wording as the site.
- Name, address (or service area), phone: identical to the site footer and schema.
- Photos: real only. Add the founder portrait and, when available, work-in-progress images with no personal data.
- Reviews: after launch, ask repeat clients to review. Never gate, buy or invent reviews. Never add `aggregateRating` schema unless it reflects reviews shown on the site.

### Citations and links
Start with accurate, consistent listings on: Google Business Profile, Bing Places, Apple Business Connect, Better Business Bureau, Yellow Pages Canada, Canada411, CanLaw process server directory, and vertical directories such as ServeNow where Canadian listings are accepted. Then pursue earned links: guest guides in BC legal publications, a BC paralegal or legal assistant association event sponsorship, local law firm partner pages, university law student societies.

### Reputation
Dial and File earned authority through a trade publication feature. The local equivalent: the founder writes a short, practical guide series (section 6) and pitches one to a BC legal association newsletter.

## 6. Content plan (guides)

All guides are authored by Jasmine Deo, LLB (reviewed by her before publishing) and follow the guide template in `docs/pages/guides.md`. First ten:

1. Personal service in BC: who can serve, what counts, how proof works
2. What an affidavit of personal service must contain (Form 15, Form F15, Provincial Court certificate of service)
3. Substituted service in BC: when attempts are not enough
4. Serving a corporation in BC: confirming the registered office first
5. Serving a notice of civil claim in BC Supreme Court
6. Serving family law documents in BC
7. Serving a subpoena or witness in BC
8. Serving residential tenancy notices and documents
9. Serving someone who is avoiding service: how documented attempts help
10. How much a process server costs in Vancouver, and what changes the price

Sequence by priority P1 then P2. Each guide links to the matching service page and the request form, and carries a "last reviewed" date.

Accuracy rules: cite the rule or form by number, link to bccourts.ca, bclaws.gov.bc.ca or the Provincial Court site, and do not paraphrase a rule from memory. The founder verifies each against the current text.

## 7. City page rules

Search engines discount templated city pages. A city page ships only when it has all of:

1. A unique introduction (what serving in that city is like: building types, access, hours when people are reachable)
2. The courts and registries nearest that city, named and linked to the official court page (verify; do not guess addresses)
3. A neighbourhood list that is not the whole template list
4. 3 to 5 FAQs specific to that city
5. A short note on typical access challenges (secured condo towers, gated communities, rural lots) where true for that city
6. A link to the request form pre-filled with the city

If a city does not yet have this, it appears on the coverage hub only.

## 8. Measurement

| What | Tool | Cadence |
|---|---|---|
| Impressions, clicks, queries, indexed pages | Google Search Console | Weekly in first 90 days |
| Form submits, click-to-call, click-to-email, form start | Analytics events (see `docs/05`) | Weekly |
| Calls | Tracking number only if the owner agrees. Otherwise count click-to-call events | Monthly |
| Rankings for P1 keywords | Rank tracker, Canada, mobile and desktop, Vancouver location | Weekly |
| Google Business Profile views, calls, requests | GBP Insights | Monthly |

## 9. Ninety-day sequence

| Weeks | Work |
|---|---|
| 0 to 2 | Baseline: current Search Console, rank snapshot, volume data into the CSV. Claim GBP |
| 2 to 8 | Launch site with P1 pages, tier 1 city pages and 3 guides. Submit sitemap. 301s live |
| 8 to 12 | Tier 2 city pages. 4 more guides. Citation set complete. First review requests |
| 12+ | Use Search Console queries to add pages for what already shows impressions |
