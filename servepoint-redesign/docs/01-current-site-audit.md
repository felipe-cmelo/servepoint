# 01. Current site audit

Audited 2026-11-16 from the staging deployment `agent-6af447cc3107871e--fascinating-kulfi-be8328.netlify.app` (canonical declared as `https://servepointcanada.com/`).

**Method and limits.** All nine pages, `sitemap.xml` and `robots.txt` were fetched and read as structured text: headings, labels, lists, links, form fields, meta tags and image references. That is a faithful record of the content. It is not a view of the rendered page. Colours, fonts, spacing, image appearance and animation were **not observed**, and statements about layout below are inferred from the markup. The three images (two logos and one headshot) could not be downloaded from this environment, so their look is unknown. Phase 0 repeats the audit in a browser with Lighthouse and screenshots.

The page-by-page decisions for the rebuild are in `docs/13-page-replication-matrix.md`.

## 1. Page inventory

Sitemap: nine URLs, all on `servepointcanada.com`, no `lastmod`. `robots.txt`: allow all, sitemap declared.

Title tags are shown with a comma where the site uses a pipe, so that the table renders.

| URL | Title tag | H1 | What it holds |
|---|---|---|---|
| `/` | Process Serving Vancouver, ServePoint Canada | Your Documents Served. Your Service Proven. (second sentence in italic) | Hero, a 4-step "How a file progresses", 8 attribute tiles, 3 numbered service cards, pricing teaser (3 tiles "From $168"), a second 4-step "How it works" with a "Deadline this week?" box, "Why ServePoint" (3 cards), service area (14 cities linked), instructing from outside BC, FAQ (6), closing request block |
| `/services/process-serving/` | Process Serving Vancouver & Lower Mainland, ServePoint Canada | Process Serving in Vancouver and the Lower Mainland | Documents we serve (6 categories), how attempts are handled, why attempt records matter, difficult to serve, what you receive, instructing from outside BC, at a glance, FAQ (6) |
| `/services/court-services/` | Court Filing & Registry Services Vancouver, ServePoint Canada | Court Services in Vancouver and the Lower Mainland | Filing and issuing, document retrieval and searches, filing and service on one instruction, instructing from outside BC, at a glance. No FAQ, no price |
| `/services/corporate-search/` | BC Corporate Searches for Law Firms, ServePoint Canada | Corporate Searches in BC | Six search types, "Search first, serve second", 3-step process, at a glance (turnaround 2 business days). No FAQ, no price |
| `/areas/` | Areas We Serve, Vancouver & the Lower Mainland (a long dash before the brand) | Legal Support Services across Vancouver and the Lower Mainland | Image map of 15 communities, 109 neighbourhoods as plain lists, "Need service elsewhere?", request block. No FAQ, no courts named |
| `/pricing/` | Pricing, Process Serving, Court Filing & Corporate Searches (a long dash before the brand) | Pricing | 3 service cards each "From $168", preferred pricing (law firms, community clinics), pricing information, 4 attribute tiles, request block. No FAQ |
| `/for-us-law-firms/` | Process Serving in BC for US Law Firms, ServePoint Canada | Process Serving in BC for US Law Firms | Local service for US firms, service instructions, 6 "what US firms can expect" items, FAQ (5, including the Hague Service Convention) |
| `/about/` | About ServePoint Canada, Built with Law Firms in Mind | Built with Law Firms in Mind | Legal experience, four commitments, founder block with headshot, request block |
| `/contact/` | Request Service, ServePoint Canada | Request Service | One-page form of 12 fields (11 real, 1 honeypot), email-or-call block, "What happens next?" |

## 2. Site-wide elements on every page

- A "Skip to content" link first.
- A top utility bar: "Vancouver & the Lower Mainland" with the bold line "First Attempt Within 24 Hours", the phone number (778-238-2797) and the email, both as links.
- Header: logo (`/assets/logo-reversed.png`, alt text "ServePoint Canada" plus "process serving" (the original joins them with a long dash)), a "Menu" toggle and nine items: Services, Process Serving, Court Services, Corporate Search, Areas We Serve, Pricing, For US Law Firms, About, Request Service.
- A breadcrumb on inner pages (Home / Services / Process Serving).
- Footer: logo, a one-sentence blurb, three link columns (Services; Service Areas: Vancouver, Burnaby & Richmond, Surrey & Delta, All areas we serve, all four going to `/areas/`; Contact), the disclaimer ("provides process serving and legal support services. This website does not provide legal advice"), and "© 2026 ServePoint Canada, Vancouver, BC" with a Request Service link.
- Meta: robots index and follow, locale en_CA, canonical on `servepointcanada.com`, `og:image` `https://servepointcanada.com/assets/logo.png` (a different file from the header logo, which is the "reversed" version, so the header and footer most likely sit on a dark background). No favicon, theme colour or font links were visible in the markup.
- Assets seen: `logo-reversed.png` (header and footer), `jasmine.jpg` (About), `logo.png` (Open Graph). No other images, including no photography of the work.

## 3. What works and must carry over

- The operational promises are specific and strong: first attempt within 24 hours, up to 3 attempts (stated on the pricing page only), documented attempts, a sworn affidavit, an affidavit of attempted service if service fails, same business day confirmation, "Search first, serve second", USD invoicing on request.
- The request form asks the right questions for a law firm: court file number, service required, urgency tiers (Standard, Rush within 48 hours, Rush same day), deadline, and a free-text field whose helper lists physical description, work hours, vehicle information, previous attempts and unusual address details.
- The tone is plain and professional and speaks to lawyers and paralegals without jargon inflation.
- The FAQ on the Hague Service Convention ("depends on the matter, the firm picks the method") is the right posture for a business that does not give legal advice.
- The disclaimer is already in the footer. A skip link exists. The sitemap and robots file are correct and simple.
- The founder is named and has a headshot. The six document categories on the process serving page are precise and useful.

## 4. Problems

### 4.1 It reads and looks generated
These are structural patterns visible in the markup, not taste. Visual claims are inferred from the structure.

| Pattern on the site | Why it is a tell |
|---|---|
| Hero headline "Your Documents Served. *Your Service Proven.*" with the second sentence in italic | Accenting part of a headline is the most common generated-page device |
| A small eyebrow line above most headings ("Vancouver & the Lower Mainland", "How It Works", "Standards", "Founder", "Questions", "Registry Work", "Coverage", "Communities") | Added to every page whatever the content |
| Eight attribute tiles on the home page (Legal Experience, Clear Communication, Documented Service, Upfront Pricing, Coverage, Turnaround, Every File, Instructing Firms), and four of the same tiles again on the pricing page | Abstract nouns in identical tiles carry no proof, and each repeats a fact stated elsewhere |
| Two four-step sequences on the home page ("How a file progresses" and "How it works") that say almost the same thing, plus a third 4-step list on the contact page | The same process told three times |
| Three identical numbered service cards (01, 02, 03) | Content chopped into equal boxes. The numbers imply a sequence that does not exist |
| An "At a Glance" block on each service page that repeats the text above it | Padding |
| "Request Service" about seven times on the home page, with two closing request blocks back to back on most pages | One clear action per screen is enough |
| Pricing teaser with "From $168" three times in a row on the home page, then again in three cards on the pricing page | A table is the honest format. The three prices are identical |
| The same section order on every page: intro, list, process, at a glance, request block | Templated rhythm |
| No photography beyond one headshot, only a logo | Nothing shows the work |

### 4.2 Information architecture
- Nine navigation items. "Services" and the three service pages are listed side by side as if equal, and the same links repeat in the footer.
- "Court Services" is vague for search. People look for court filing, registry services and agents. The page titled "Request Service" lives at `/contact/`, which hides the main action under a passive URL.
- The US page is titled "For US Law Firms" but the process serving page says it also accepts documents from other provinces, and the US page lists no document types.
- No guides or educational content, so the site cannot rank for informational searches.
- No city pages. The areas page is one long list of neighbourhoods with no links.
- The footer "Service Areas" column names four groups, and all four go to the same page.

### 4.3 Content inconsistencies
- Communities: the home page lists 14, the areas page lists 15 (adds Pitt Meadows), and the areas meta description names ten (it names the North Shore as one area and omits Port Coquitlam, Port Moody, Maple Ridge and Pitt Meadows). The footer groups areas a fourth way.
- The home page court services card promises "same-day registry attendance" and "digital return of stamped copies". The court services page promises neither, and gives no turnaround.
- "Up to 3 attempts" appears on the pricing page only. The process serving page says "attempts" without a number.
- The areas page says the services are for "law firms, businesses and individuals". Every other page speaks to law firms.
- Pricing says rush, travel and special requests "may" cost extra and gives no amounts. The areas page says service outside the listed area needs confirmation and gives no hint of price.
- The contact form requires "Person or Company to Be Served" and "Service Address" for every request, including a court filing or a corporate search where nobody is served. The "Not Sure" choice has no follow-up.
- FAQs: home 6, process serving 6, US 5. Court services, corporate search, pricing, areas and about have none.

### 4.4 Missing trust evidence
No years in business, no testimonials, no client names or logos, no photographs of the work, no office address or hours, no sample affidavit, no team beyond the founder, no insurance or confidentiality statement beyond one value on the About page, and no privacy, terms or accessibility pages in the navigation. The About page lists no years of experience, bar membership or other credentials for the founder.

### 4.5 Technical items to verify in Phase 0
- Internal links resolved to the Netlify staging host in the extraction. Confirm production uses relative or canonical URLs.
- Production domain: Phase 0 found that `servepointcanada.com` is a GoDaddy parking page. Only the staging deployment is live, so there are no indexed pages to preserve.
- Structured data, canonicals and Open Graph on the rendered pages. Only `og:image` was confirmed.
- Performance and accessibility baseline. The skip link exists, which is a good sign. Phase 0 measured mobile LCP at 2.1 s (the rebuild budget is under 2.0 s, `docs/07` section 7) and found meta descriptions longer than 155 characters on 7 of 9 pages (`docs/08` limits them to 120 to 155).
- Form: whether it is a Netlify form, what the "Leave this empty" field is wired to, whether a confirmation page exists, where submissions go and whether they are stored. Phase 0 found a `/thank-you/` page, so a confirmation page exists (the first read missed it). The live form shows no `data-netlify` attribute. That is expected on a deployed Netlify site, because the build removes it and adds a hidden `form-name` input, so it neither confirms nor rules out a registered form. Still to confirm with the owner: the form is listed in the Netlify Forms tab, where the notifications go, and whether past submissions were received (`docs/12` question 24).
- The visual identity: Phase 0 found the logo is navy and teal (decision in `docs/06` section 4, `docs/12` question 16). Fonts and favicon are still to record.

## 5. Decisions this audit supports

1. Rebuild rather than reskin. The templated rhythm is in the structure.
2. Replace abstract tiles with evidence: a sample affidavit, a table of what is included, a named person, a real photograph when the owner supplies it.
3. Rename and restructure URLs around how people search (see `docs/04`) and redirect every old URL.
4. Add pricing structure, a document finder, a real coverage map, guides and city pages with unique content.
5. Keep every published operational fact and every published page section that carries information. Merge or cut the ones that only repeat (`docs/13`). Add nothing that is not confirmed.
