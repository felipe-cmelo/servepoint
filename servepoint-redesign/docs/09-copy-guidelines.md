# 09. Copy guidelines

## 1. Voice

The site speaks the way a careful sworn statement reads: short declarative sentences, concrete nouns, exact times and places. It is calm. It does not sell. It states what happens, who does it and what the client receives.

- Write to a busy legal assistant. She reads the first sentence and the first heading.
- Say what is done, not how good it is. "Every attempt is recorded with date, time and location" beats "meticulous documentation".
- One idea per sentence. Most sentences under 20 words.
- Active voice. "We confirm availability the same business day."
- Canadian spelling: colour, centre, neighbourhood, licence (noun), cheque, defence.
- Use "we" for ServePoint and "you" for the firm. Use "the person served" for the other party.
- Times: "9:42 a.m." and "Pacific Time" or "PT". Dates: "March 4, 2026". Money: "$168" with no cents when whole, "CAD" stated once on pricing and US pages.
- Sentence case for every heading and button.

## 2. Vocabulary (use one word for one thing)

| Concept | Use | Avoid |
|---|---|---|
| A job sent to us | instruction, request | order, ticket, project |
| The primary action | **Request service** | Get started, Submit, Contact us, Get a quote |
| Phone action | **Call 778-238-2797** | Talk to us, Speak to an expert |
| One matter we handle | file | case (that is the firm's word for its matter) |
| A visit to serve | attempt | try, visit |
| Our proof | sworn affidavit of service, affidavit of attempted service | proof pack, certificate (unless the court form is a certificate) |
| The documents | documents | paperwork |

## 3. Banned

Words and phrases: seamless, leverage, unlock, elevate, streamline, cutting-edge, state-of-the-art, game-changer, robust, tailored solutions, world-class, peace of mind, trusted partner, we pride ourselves, second to none, one-stop shop, next level, in today's fast-paced world, at the end of the day.

Constructions: em dashes (use a period, comma or colon). "It's not just X, it's Y". Lists of three adjectives. Rhetorical questions as headings. Exclamation marks. Emoji. "Whether you are A or B" openers. Headlines made of two short slogans ("Documents served. Service proven.").

`scripts/check-banned-patterns.mjs` enforces the em dash rule and the banned phrases in `src/` and `content/`.

## 4. Facts register

### Approved (published on the current site, safe to use)
- ServePoint Canada, Vancouver, BC. Founded by Jasmine Deo, LLB, a legal professional
- Process serving, court services (filing and registry attendance) and corporate search
- Phone 778-238-2797. Email serve@servepointcanada.com
- First attempt typically within 24 hours of receiving documents and instructions
- Up to 3 service attempts included in process serving
- Every attempt recorded with date, time and location
- Sworn Affidavit of Service on completion. Affidavit of attempted service if service fails after the included attempts
- Same business day confirmation of availability and next steps
- Starting price $168 for each of the three services
- Rush service, travel and special requests may incur additional charges. Pricing is confirmed before service
- Preferred pricing for law firms and high-volume clients. Discounted rates for free legal clinics and community organizations that support access to justice
- Accepts documents issued in other Canadian provinces and the US. USD invoicing on request for US firms. Updates in Pacific Time
- Coverage: Vancouver, Burnaby, Richmond, Surrey, New Westminster, Coquitlam, Port Coquitlam, Port Moody, North Vancouver, West Vancouver, Delta, Langley, White Rock, Maple Ridge, Pitt Meadows. Availability checks for addresses outside the area
- Corporate search types: company summary, director and officer search, registered office confirmation, historical search, certificate of status, name and trade name search. Results by email, typically within 2 business days. "Search first, serve second"
- Court services: filing pleadings, applications and affidavits, issuing notices of civil claim and petitions, BC Supreme Court and Provincial Court registries, court file searches, copies of pleadings, orders and entered judgments, digital return of filed documents, combined filing and service
- Document categories served: civil, family, commercial, witness, residential tenancy, corporate. Examples: Notices of Civil Claim, petitions, family claims, protection orders, subpoenas, summonses, demand letters, lien notices, statutory demands, RTB notices, corporate documents
- Urgency options in the form: Standard, Rush within 48 hours, Rush same day
- Disclaimer: "ServePoint Canada provides process serving and legal support services. This website does not provide legal advice."

### Not approved until the owner confirms (write as `[CONFIRM: ...]`)
Years in business. Number of files served. Client names or logos. Testimonials. Ratings. Certifications, bonding, insurance. Office address. Hours. After-hours or weekend service. Amounts for rush, same day, travel, extra attempts. GPS, photo evidence, a client portal or SMS updates. Registration as a BC Court Services Online agent. Languages spoken. Any statement about how a court will treat a specific matter.

### Legal content
Anything stating a rule of procedure (who may serve, how, when, what the affidavit must contain) cites the rule or form by number and links to the official source. The founder reviews it. The site never tells a visitor which method of service their matter requires.

## 5. Before and after

| Current | Replacement | Why |
|---|---|---|
| Your Documents Served. *Your Service Proven.* | Process serving in Vancouver, BC | Names the page. No slogan, no accented phrase |
| Built for the way law firms work. | You send the documents. We attempt service, record each attempt and return a sworn affidavit. | States what happens |
| Legal Experience. Clear Communication. Documented Service. | Founded by Jasmine Deo, LLB. One person knows your file from instruction to affidavit. Each attempt is recorded with date, time and location. | Evidence, not abstractions |
| Let's Move Your File Forward | Request service. We confirm availability the same business day. | Says the action and the result |
| At a Glance | (removed. The price table and the step list say it once) | Repetition |

## 6. Microcopy

- Buttons: **Request service**, **Continue to step 2**, **Send request**, **Copy reference**, **Email documents**.
- Errors: say what is wrong and how to fix it. "Enter a date that is today or later." No apology, no blame.
- Success: "Request received. Your reference is SP-250304-K7M2. Email your documents to serve@servepointcanada.com and include the reference."
- Empty or unavailable: give the next step. "Not on the list? Send the address and we confirm availability the same business day."
- Alt text describes content: "Intercom panel at the entrance of a Burnaby apartment tower". No "image of".

## 7. Legal wording that must stay exact

- Footer: "ServePoint Canada provides process serving and legal support services. This website does not provide legal advice."
- Hague Service Convention: the instructing firm determines the method of service. ServePoint carries out the instruction locally. Do not add commentary beyond what the owner or the founder approves.
