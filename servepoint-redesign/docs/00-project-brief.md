# 00. Project brief

## 1. The business

**ServePoint Canada** is a process serving and legal support company based in Vancouver, BC. It was founded by Jasmine Deo, LLB. The site states the company was built as a more responsive and reliable alternative, focused on dependable service from instruction to completion.

### Services (as published today)

| Service | What it covers | Starting price |
|---|---|---|
| Process serving | Personal service of civil, family, commercial, witness, residential tenancy and corporate documents in Vancouver and the Lower Mainland. Accepts documents issued in other Canadian provinces and the US | From $168 |
| Court services (filing and registry attendance) | Filing and issuing at BC Supreme Court and Provincial Court registries, court file searches, copies of pleadings, orders and entered judgments, digital return of stamped copies, combined filing and service | From $168 |
| Corporate search | BC Registry searches: company summary, directors and officers, registered office, historical search, certificate of status, name and trade name search. Typically delivered within 2 business days | From $168 |

### What the client receives
- First attempt typically within 24 hours of receiving documents and instructions
- Up to 3 service attempts included
- Every attempt documented with date, time and location
- Updates throughout the file
- A sworn Affidavit of Service on completion, or an affidavit of attempted service if service fails
- Same business day confirmation of availability and next steps
- USD invoicing on request for US firms
- Preferred pricing for law firms and high-volume clients. Discounted rates for free legal clinics and community organizations

### Contact facts (published)
- Phone: 778-238-2797
- Email: serve@servepointcanada.com
- Location: Vancouver, BC (no street address, hours or years in business published)

## 2. Business model in one paragraph

ServePoint sells a per-file service fee to law firms that have a deadline and need documents delivered, filed or verified, with proof that stands up in court. Revenue comes from repeat instructions by the same firms, so the site has two jobs: win the first instruction from a firm that does not know ServePoint, and make the tenth instruction take under two minutes. Lead sources are most likely lawyer referrals, direct repeat clients and local search for process serving terms. Rush, travel and special requests are upsells. Corporate search and court filing are cross-sells that raise value per client and shorten the path to service ("search first, serve second").

## 3. Audiences

| Priority | Audience | Job to be done | What convinces them |
|---|---|---|---|
| 1 | Paralegals, legal assistants and articling students at BC law firms | Hand off a service instruction fast and never chase for updates | Clear instruction path, same-day confirmation, a named contact, attempt records |
| 2 | Lawyers who choose or approve vendors | Be sure proof of service will not be challenged | Founder with an LLB, sworn affidavit, documented attempts, sample affidavit |
| 3 | Out-of-province and US firms | Serve someone in BC without a local contact | A page written for them, Pacific Time updates, USD invoicing, plain explanation of what they receive |
| 4 | Legal clinics and community organizations | Affordable service for clients | Visible discounted rates path |
| 5 | Individuals and self-represented litigants | Get papers served correctly | Not a stated audience today. See open question 1 |

## 4. Goals and success measures

| Goal | Measure |
|---|---|
| More instructions | Form submissions, click-to-call, click-to-email per month, tracked as events |
| Easier repeat instruction | Share of submissions from returning visitors, median form completion time under 90 s |
| Local search visibility | Rankings and clicks in Search Console for the cluster list in `docs/03`, Google Business Profile views and calls |
| Trust | Bounce rate on service pages, scroll depth to the sample affidavit and pricing table, requests that already include a court file number and deadline |
| Brand | Site no longer reads as templated. Reviewed against the banned list in `docs/06` |

Set the baseline in Phase 0 from Search Console, analytics and call logs if any exist.

## 5. Constraints

- One-person owner-operator context. The site must be maintainable without a developer: copy and guides live in Markdown, pricing and coverage live in single data files.
- Hosting stays on Netlify unless the owner decides otherwise.
- Confidentiality: no client documents are ever stored on the marketing site. Phase 1 keeps the existing "submit the form, then email documents" flow. Secure upload is a later, separate decision.
- Legal: the site does not give legal advice. Law and procedure content is reviewed by the founder.
- Brand assets: two logo files (`logo.png`, used for Open Graph, and `logo-reversed.png`, used in the header and footer) and one founder headshot (`jasmine.jpg`) exist on the current site. None of the three could be viewed during the audit. Brand colours and fonts are not documented. The design in `docs/06` is built to be compatible with a new logo treatment and may be tuned once the vector logo is available (open question 16).

## 6. Positioning in one line

Process serving in Vancouver, BC that is fast to instruct, documented at every attempt, and backed by a founder who knows what a court expects from proof of service.

Differentiators the evidence supports (see `docs/02`): a legal professional founder, 24 hour first attempt, 3 attempts and a sworn affidavit included in the base price, one instruction for search, filing and service, and a direct contact. Differentiators ServePoint cannot claim today: scale, decades in business, a client portal, GPS tracking, ratings. Do not imply them.

## 7. Assumptions (change only with the owner's approval)

1. Audience is law-firm-first. Individuals are not excluded but are not the voice of the site.
2. The brand stays "ServePoint Canada". Coverage stays Vancouver and the Lower Mainland, with out-of-province firms as instructing clients, not as a service area.
3. URLs change (see `docs/04`). Old URLs 301 to the new ones.
4. Blog-style content is "guides" authored under the founder's name.
5. The visual direction in `docs/06` is the baseline. Colours may be adjusted to the logo.
