# 13. Page replication matrix: current site to rebuild

Every page, section and feature of the current site, read on 2026-11-16, and what happens to it. Use this before building any page. If a current section is not in this file, it was not seen. If a decision here conflicts with a page spec, this file wins on content, the page spec wins on layout.

**Decisions**
- **Keep**: same facts, same job, presented in the new design.
- **Improve**: same facts, new structure or format that proves more.
- **Merge**: folded into another section because it repeated it.
- **Cut**: removed because it only repeated or only decorated. The facts it carried are placed elsewhere, and the table says where.
- **New**: does not exist today.

Sources for the current pages: `docs/01-current-site-audit.md`. Facts register: `docs/09-copy-guidelines.md` section 4.

## A. Site-wide elements

| Current | Decision | In the rebuild | Reason |
|---|---|---|---|
| "Skip to content" link | Keep | First element in the DOM | Accessibility |
| Top bar on every page: area, "First Attempt Within 24 Hours", phone, email | Improve | No separate bar. The 24 hour fact is in the hero facts and the Attempt step. The phone number is in the header at every width and in the mobile bottom bar. Email is in the footer and the closing block | The bar repeats a claim on every page and pushes content down |
| Header logo (`logo-reversed.png`) | Keep, swap for the vector when supplied | Reversed logo on the navy header, then the standard logo (`logo.png`) when the header turns paper after the hero. The footer sits on mist and uses the standard logo | The reversed version only works on dark. Open question 3 |
| Nine nav items | Improve | Services (grouped: process serving, court filing, corporate search), Pricing, Coverage, Out of province, Guides, About, phone, Request service button | `docs/04` section 4 |
| "Menu" toggle | Keep | Full-screen sheet under 900 px, large targets | |
| Breadcrumb | Keep | Visible and in schema on every page except home | |
| Footer: blurb, three link columns, disclaimer, copyright | Improve | Four groups, same disclaimer sentence, plus Privacy, Terms and Accessibility | The three area links all went to one page. Disclaimer must stay |
| "Request Service" about seven times per page | Cut to one primary action per screen | One name per action: Request service. Phone action: Call 778-238-2797 | Padding, and synonyms confuse |
| `og:image` is `logo.png` | Improve | One generated image per page template, text on the navy surface | `docs/08` |
| `sitemap.xml` (9 URLs) and `robots.txt` (allow all) | Keep the behaviour | Generated sitemap, robots allow all and disallow `/dev/` | `docs/08` |

## B. Home (`/`)

| # | Current section and key facts | Decision | In the rebuild | Reason |
|---|---|---|---|---|
| 1 | Hero. H1 "Your Documents Served. Your Service Proven." (second sentence italic). Body: process serving, court filing and corporate searches for law firms in Vancouver, BC. Each attempt documented, sworn affidavit ready for filing. Buttons: Request Service, How It Works | Improve | H1 "Process serving in Vancouver, BC". Same promise in the lead. Four hero facts and the sample affidavit replace the italic phrase. "How It Works" becomes the scroll into the four steps, with the sample sheet pinned beside them | The old H1 holds no keyword. Italic accent is a generated tell |
| 2 | "How a file progresses": four steps (documents received, attempt documented, service completed, proof prepared) | Merge | Steps 1 to 4: Instruct, Attempt, Serve, Prove, beside the pinned sample sheet | This is a real sequence, so numbering stays. It is told once, not twice |
| 3 | Eight attribute tiles | Cut as tiles | Legal Experience: "Who handles your file". Clear Communication and Documented Service: Attempt step. Upfront Pricing: pricing surface. Coverage: coverage section. Turnaround: hero facts. Every File (sworn affidavit): Prove stage. Instructing Firms: Outside BC | Abstract nouns in identical tiles carry no proof |
| 4 | Services: three numbered cards with bullet lists (process serving, court services, corporate search) | Improve | Three large linked rows, no numbers. The bullet lists live on each service page | The numbers imply a sequence that does not exist |
| 5 | Pricing: three tiles, each "From $168" | Improve | One figure, "$168", and a three-row table of what is included | Three identical prices read as padding |
| 6 | "How it works": send the documents, attempted and documented, kept informed, proof provided | Merge | Same steps as row 2 | Duplicate of row 2 |
| 7 | Callout "Deadline this week?": urgent requests are prioritized, availability confirmed the same business day | Keep as a line | Line under the Instruct checklist, pointing to the rush options in the form. No rush amounts | Useful, but a box is not needed |
| 8 | "Why ServePoint": Direct (a consistent point of contact), Documented (every attempt accounted for), Legal experience (founded by a legal professional) | Improve | "Who handles your file": founder named, links to About | Dropping it would drop the strongest trust fact |
| 9 | Service area: 14 cities as links, "files outside the standard area can be checked by sending the address" | Improve | Route map with 15 communities and a list that works without the map. "Outside the area? Send the address" | 14 was wrong. The areas page has 15 |
| 10 | "Instructing from outside BC": firms across Canada and the US, bullets (local service, attempt reporting, sworn proof, direct updates, USD invoicing on request), buttons Request Service and For US Law Firms | Keep | Concrete surface, text, button to the out-of-province page, Vancouver clock card | |
| 11 | FAQ, six questions: speed, proof, evasion, out-of-province, registered office, pricing | Keep | The same six, answers rewritten from the facts register | |
| 12 | Closing block "Let's Move Your File Forward" with Request Service and email | Improve | "Request service" heading, phone in large type, button, email | "Let's move your file forward" is stock phrasing |
| 13 | Footer | See section A | | |
| New | | New | Step 1 of the request form on the home page | Shortens the path for a person with a deadline |

## C. Process serving (current `/services/process-serving/`, new `/process-serving/`)

| Current section and key facts | Decision | In the rebuild |
|---|---|---|
| H1 and intro: civil, family and commercial documents, documented attempts, clear communication, proof on completion | Keep | Intro with the keyword, "Vancouver, BC" and the 24 hour first attempt in the first 100 words |
| Documents We Serve: civil litigation (Notices of Civil Claim, petitions, applications, orders), family (Notices of Family Claim, applications, protection orders), witness documents (subpoenas, summonses), commercial and debt (demand letters, lien notices, statutory demands), residential tenancy (notices to end tenancy, RTB documents), corporate (documents requiring service on companies, registered offices or directors). Includes documents issued outside BC | Improve | `DocumentFinder` with the same six categories and exact document names, plus a "what to send" checklist for each |
| How Service Attempts Are Handled: planned around the address and circumstances, at different times of day where appropriate, each attempt recorded with date, time, location and details | Keep | "How an attempt is handled" with the attempt line. States "up to 3 attempts" (taken from the pricing page) |
| Why Attempt Records Matter: a record may help decide next steps such as an application for substituted service | Merge | Into "When the person is hard to reach", worded as a statement about the record, never as advice |
| Difficult to Serve: a recipient who has moved, an outdated address, other difficulty. Client kept informed. Corporate search can confirm the registered office | Keep | Same section, with the affidavit of attempted service from the pricing page and a link to corporate search |
| What You Receive: a sworn Affidavit of Service with date, time and location, the person served, the documents served and how service was completed | Improve | Annotated sample affidavit (fictional, labelled). The four items become the annotations |
| Instructing from Outside BC | Keep | Short block with a link to the out-of-province page |
| At a Glance: coverage, turnaround, rush "available on request", updates, proof | Cut | Each fact is stated once where it belongs. Rush goes in "Rush and same day" |
| Service Information, six questions (speed, if service fails, documents from outside BC, registered office, what to send, proof) | Keep | All six in the FAQ bank, plus two more (pricing, evasion) |
| Closing request block | Keep | One closing block |

## D. Court services (current `/services/court-services/`, new `/court-filing/`)

| Current section and key facts | Decision | In the rebuild |
|---|---|---|
| H1 "Court Services in Vancouver and the Lower Mainland". Intro: filing, retrieval and registry attendance at BC Supreme Court and Provincial Court registries | Improve | H1 "Court filing and registry services in Vancouver, BC" (the words people search) |
| Filing and Issuing: filing of pleadings, applications and affidavits; issuing of Notices of Civil Claim and petitions; filing at the two registries; digital return of filed documents | Keep | "Filing and issuing" list. "In person" was removed because the current page does not say it |
| Document Retrieval and Searches: court file searches; copies of pleadings, orders and entered judgments; confirmation of documents filed on a court file; retrieval of available court documents | Improve | A table: what you can ask for, what you receive |
| Filing and Service on One Instruction | Keep | Blue surface band |
| Instructing from Outside BC? Firms anywhere in Canada can instruct directly, by email | Merge | "How to instruct" and the FAQ entry "Can a firm outside BC instruct you for court work?" |
| At a Glance: registries, court filing, document retrieval "available on request", return "digitally or by mail", combined service | Cut | Registries get their own `[CONFIRM]` section. Return is in the filing list |
| Button "Request Court Services" | Cut | "Request service", with the service pre-selected |
| No FAQ, no price | New | FAQ of five from the stated facts. A price line: "from $168" (from the pricing page) |
| Home card claims "same-day registry attendance" and "stamped copies" | Open | `[CONFIRM]`, `docs/12` question 21 |

## E. Corporate search (current `/services/corporate-search/`, new `/corporate-search/`)

| Current section and key facts | Decision | In the rebuild |
|---|---|---|
| H1 "Corporate Searches in BC". Intro: confirm legal entities, registered offices, directors, status. Label "BC Registry" | Improve | H1 "BC corporate search for law firms" |
| "Corporate Information You Can Rely On": searches for filing, service and related matters | Merge | Into the intro. The heading is a claim, not information |
| Search Types, six: company summary, director and officer search, registered office confirmation, historical search, certificate of status, name and trade name search | Improve | "Choose the search" table: search, when you need it, what you receive |
| "Search First, Serve Second": confirm the registered office before service. Order together | Keep | Blue surface band, the page's signature idea |
| How It Works, three steps: send the company name, incorporation number or trade name; search through BC Registry; results by email, typically within 2 business days | Merge | Into the intro and "Turnaround and delivery" |
| At a Glance: registry, turnaround, results digital, combined service | Cut | Stated once in "Turnaround and delivery" |
| Buttons "Request a Search" and "Request Service", both to the contact page | Cut | One button: "Request service", with the service pre-selected |
| No FAQ, no price | New | FAQ of five. A price line: "from $168" |
| New paragraph "What we add to the official registry" | New | Marked `[CONFIRM]`, `docs/12` question 22 |

## F. Coverage (current `/areas/`, new `/coverage/`)

| Current section and key facts | Decision | In the rebuild |
|---|---|---|
| H1 "Legal Support Services across Vancouver and the Lower Mainland". Intro says "law firms, businesses and individuals" | Improve | H1 "Areas we serve: Vancouver and the Lower Mainland". The audience wording is held back until `docs/12` question 1 |
| Map image of 15 communities with four reference points (Strait of Georgia, Burrard Inlet, Boundary Bay, Fraser River). Note to contact the company for service outside the area | Improve | Interactive route map, same 15 communities and the same four water labels, with a list of 15 buttons that works without the map |
| Neighbourhoods: one H3 per city with a plain comma list. 15 cities, 109 neighbourhoods, nothing linked | Improve | Same 109 names in the map panel. Tier 1 cities (Vancouver, Burnaby, Surrey, Richmond) get a page with unique content. Others stay in the panel |
| "Need Service Elsewhere?" with "Check Availability" | Keep | "Not on the list?" with the same action name, to the form |
| "Need Documents Served in Vancouver?" request block | Keep | One closing block |
| Meta description naming ten areas | Fix | New description names the communities correctly |
| No FAQ, no court names | New | City pages carry 3 to 5 FAQs and the nearby courts, researched and cited |

## G. Pricing (current `/pricing/`, new `/pricing/`)

| Current section and key facts | Decision | In the rebuild |
|---|---|---|
| H1 "Pricing", "Clear rates for process serving, court services, and corporate searches" | Improve | Keyword-led H1, same promise: starting prices, what is included |
| Three cards, each "From $168": process serving (up to 3 attempts, service updates, sworn affidavit on completion), court filing and registry attendance (filing or issuing, attendance, return digitally or by mail), corporate searches (company information, registered office and director information, digital delivery) | Improve | One table: service, starts at, what is included. Same facts |
| Preferred pricing: law firms and high-volume clients; free legal clinics and community organizations get discounted rates. No amounts. Button "Contact Us About Preferred Pricing" | Keep | Two short sections, one action each ("Ask about preferred pricing", "Ask about the community rate") |
| Pricing Information: confirmed before service; extra charges may apply for rush, travel or special requests; affidavit of service on success; affidavit of attempted service if service fails after the included attempts | Improve | "What changes the price" table (amounts `[CONFIRM]`, `docs/12` question 5) and "How a quote works" |
| Four attribute tiles (Legal Experience, Clear Communication, Documented Service, Upfront Pricing) | Cut | Each fact is already on the page or the home page |
| "Ready to Get Started?" request block | Keep | One closing block |
| No FAQ | New | FAQ from the bank: pricing, if service fails, extras `[CONFIRM]` |

## H. Out of province and US (current `/for-us-law-firms/`, new `/out-of-province-and-us/`)

| Current section and key facts | Decision | In the rebuild |
|---|---|---|
| H1 "Process Serving in BC for US Law Firms", tagline "Direct service. Clear communication. Reliable proof of service." | Improve | H1 "Process serving in BC for US and out-of-province law firms". "US" stays so the page keeps matching what it targets today. The tagline is cut: the lead says it with facts |
| "Local Service for US Firms": firms instruct directly, ServePoint serves per the firm's instructions and its court's requirements | Keep | Intro and "What to send" |
| "Service Instructions": the firm decides the method and requirements, ServePoint carries them out and documents service and attempts | Keep | Stated on this page and the process serving page |
| What US Firms Can Expect, six items: clear communication, documented attempts, electronic documents by email, Pacific Time with a BC-based provider, USD invoicing on request, proof of service | Improve | "What to expect" ruled list with the same six |
| Questions, five: speed, serving a corporation, evasion, proof, the Hague Service Convention ("depends on the matter, the firm decides the method") | Keep | All five, same posture on the Hague question, plus "what does the proof record" |
| Request block | Keep | One closing block |
| The current page lists no document types | Improve | Names the six categories and links to process serving |

## I. About (current `/about/`, new `/about/`)

| Current section and key facts | Decision | In the rebuild |
|---|---|---|
| H1 "Built with Law Firms in Mind", sub "Professional process serving backed by legal experience." Intro: a more responsive and reliable approach | Improve | H1 "About ServePoint Canada". "Built with law firms in mind" is kept once in the lead because it is the owner's own line |
| Legal Experience Behind ServePoint: founded by a legal professional, who knows court documents, confidentiality, law firm workflows and accurate proof of service | Keep | "Founded by a legal professional" |
| Four commitments: Responsiveness (prompt service), Communication (a point of contact who knows your file), Documentation (reliable proof of service), Confidentiality (handled with discretion) | Improve | A ruled list of four plain statements, not four cards |
| Founder: headshot, Jasmine Deo, LLB, Founder, short bio. No years or other credentials | Keep | Founder block. The portrait is wanted as an original file. Bio `[CONFIRM]` |
| Request block | Keep | Contact section |
| New | New | "What we do and what we do not do", including the no legal advice statement |

## J. Request service (current `/contact/`, new `/request-service/`)

| Current section and key facts | Decision | In the rebuild |
|---|---|---|
| H1 "Request Service". Intro: send the service address, deadline and applicable instructions | Keep | Same H1 and lead |
| Label "New Request" and H2 "Service Instructions" | Merge | Form heading only |
| Form of 12 fields (11 real plus a honeypot): firm or organization*, name*, email*, phone, court file number, service required* (process serving, court services, corporate search, not sure), person or company to be served*, service address* (helper: unit or suite, a second address), urgency* (standard, rush within 48 hours, rush same day), deadline date, additional details (helper: description, work hours, vehicle, previous attempts, unusual address details) | Improve | Two steps with a step that changes by service, a summary step, a hidden honeypot. All 11 fields kept. Full map in `content/request-service.md` |
| Button "Submit Instructions" | Improve | "Send request" |
| "After submitting this form, you may email your documents to" the address | Keep | Said on the form side column and the received page |
| "Prefer to email?" and call | Keep | "Prefer to call or email" |
| "What happens next?": review, documents by email, service begins, proof | Keep | "After you submit" list, same four steps |
| `/thank-you/` confirmation page (found in Phase 0, the first read missed it) | Improve | `/request-service/received/` with a reference number and next steps. 301 from `/thank-you/` |

## K. New pages and features

| New | Why |
|---|---|
| Guides hub and guides | The current site cannot rank for informational searches. Founder reviews each guide before publishing |
| City pages, tier 1 | Real local content in place of one long list |
| Privacy, Terms, Accessibility | None exist today |
| Request received page, 404 | The current `/thank-you/` page is replaced by a received page with a reference number. The custom 404 is new |
| Sample affidavit, document finder, route map, Vancouver clock | The evidence and the tools that replace the abstract tiles |

## L. Redirects

Every old URL redirects with a 301: see `docs/04` section 3. All nine pages are covered, plus `/services/` and `/index.html`.

## M. Wording deliberately dropped

"Your Documents Served. Your Service Proven.", "Let's Move Your File Forward", "Direct service. Clear communication. Reliable proof of service.", "Corporate Information You Can Rely On", the eight tile titles, and the arrows on links and buttons. They are slogans, not information. The facts under them are all kept.
