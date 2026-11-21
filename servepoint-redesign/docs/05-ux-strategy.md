# 05. UX strategy

## 1. Who is on the page and what they are doing

| Persona | Situation | Wants | Fears |
|---|---|---|---|
| **Maya, legal assistant at a 12-lawyer firm** | A lawyer just handed her a Notice of Civil Claim to serve. It is 2:40 pm. | Send it in two minutes, get a same-day confirmation, stop thinking about it | Missing a limitation deadline. A form that makes her re-enter what she already put in the email |
| **Daniel, litigator reviewing vendors** | His firm's usual server retired. He is checking whether proof will hold up | Evidence of care: what the affidavit says, who signs it, what happens when service fails | A vendor whose affidavit is challenged |
| **Priya, paralegal at a US firm** | A defendant lives in Burnaby. She has never served in Canada | A plain explanation of what to send, timing in Pacific Time, invoice in USD | Doing it wrong across a border |
| **Sam, community legal clinic coordinator** | Many clients, tight budget | Know discounted rates exist and how to ask | Being priced out |

Design every page for Maya first. Daniel needs a path to evidence within one scroll. Priya has her own page. Sam gets a clear line on the pricing page.

## 2. Primary journeys

### J1. Instruct now (most important)
Home or any page → **Request service** → Step 1 (who and what) → Step 2 (the person and the address) → confirmation with a reference number and the email address for documents → documents emailed.

Time target: under 90 seconds for a returning visitor with the browser remembering their firm details.

### J2. Evaluate, then instruct
Search result → service page → sample affidavit and "what you receive" → pricing → request.

### J3. Learn, then instruct
Guide → service page link in the first paragraph → request form pre-filled with context (`?service=process-serving`).

### J4. Call
Any page → tap **Call** (header on mobile, bar on mobile, header on desktop). Track the click.

## 3. Conversion rules

1. One primary action per screen: **Request service**. A secondary phone action sits beside it, not another button style.
2. Place the primary action in the header, the first screen, after the sample affidavit, after the price table, and at the end. Not between every block.
3. Put the reassurance next to the action: "Same business day confirmation. Pricing confirmed before service."
4. Evidence before adjectives. A sample affidavit, a price table and a named founder do more than the words "reliable" or "professional".
5. Never make visitors hunt for the phone number or email.
6. Show what happens next at every decision point (after the form, after a failed attempt, after completion).

## 4. Request form design

Replace the 11-field single page with two short steps and a clear summary. Keep every field the current form collects.

### Step 1: The file
| Field | Type | Notes |
|---|---|---|
| Firm or organization | text, required | autocomplete `organization` |
| Your name | text, required | autocomplete `name` |
| Email | email, required | autocomplete `email` |
| Phone | tel, optional | autocomplete `tel` |
| Matter or file reference | text, optional | New. Firms bill by matter |
| Court file number | text, optional | |
| Service required | radio group, required | Process serving, Court filing, Corporate search, Not sure. Pre-selected from the page that linked here |
| Urgency | radio group, required | Standard, Rush within 48 hours, Rush same day. Short helper text for each: "First attempt typically within 24 hours" for Standard, amounts when confirmed |

### Step 2: The person and the place (changes with the service)
For process serving:
| Field | Type | Notes |
|---|---|---|
| Person or company to be served | text, required | |
| Service address | textarea, required | Helper: "Include unit or suite number. Add a second address if you have one" |
| Deadline date | date, optional | |
| Details that help | textarea, optional | Helper: physical description, working hours, vehicle, previous attempts, anything unusual about the building |

For court filing: document list, registry, deadline, return method (digital or mail).
For corporate search: company name or incorporation number, search types needed (checkboxes), deadline.

### Behaviour
- Progress is stated in words: "Step 1 of 2: The file". No decorative progress bar.
- Validation on blur and on submit. Errors sit beside the field, say what to fix, and are announced to screen readers. Example: "Enter an email address we can reply to, like name@firm.ca".
- A summary of entered answers before sending. One edit link per step.
- On success: heading "Request received", reference number, the sentence "Email your documents to serve@servepointcanada.com and include the reference number", and a copy button for the reference. Then the next steps list: confirmation the same business day, first attempt typically within 24 hours, updates, sworn affidavit.
- Returning visitors: offer "Remember my firm details on this device" (unchecked by default). Stores firm, name, email and phone in `localStorage` only. Add a clear "Forget these details" link.
- Never store the person's name or address to be served in the browser.
- Spam: honeypot plus Cloudflare Turnstile in the function phase. No CAPTCHA puzzles.
- The page works with JavaScript off as a single-step form (progressive enhancement).
- Alternative paths always visible: Call, or Email with documents.

## 5. Key interactions

| Interaction | What it does | Why |
|---|---|---|
| **Sample affidavit** | A specimen of an affidavit of personal service, clearly labelled fictional, with parts annotated on hover or focus (date and time, place, how service was made, the sworn statement) | Shows what the client receives, which is the whole product |
| **Document finder** | Pick what you are serving (from the six categories). Shows the common documents in that category and the checklist of what to send. States that the instructing firm decides the method | Cuts back-and-forth. Helps US firms |
| **Coverage route map** | A drawn diagram of the 15 communities as a service network, on a mist surface. The routes draw as the section scrolls into view. Select a node or a button to see neighbourhoods, nearby courts and the link to its page. The list of 15 buttons is the keyboard and phone control | Replaces a long list with something usable and local. Schematic, not to scale |
| **Price table** | A real table. Rows for each service, columns for starting price, included, and what changes the price | Honest and scannable |
| **Pinned sample sheet** | On the home page the sample affidavit stays on screen beside the four steps (Instruct, Attempt, Serve, Prove). Each step lights the part of the record it produces and dims the rest. Below 1000 px the sheet is not pinned | Shows the deliverable while the process is explained, instead of describing "documented service". The one memorable object of the site |
| **24 hour line** | In the Attempt step a track fills with scroll to the point where the first attempt typically happens, with four labelled points up to three attempts | Makes the speed claim visible without inventing times for later attempts |
| **Scroll choreography** | A short list of reversible, scroll-linked effects: header progress, section highlight in the navigation, step rail, headline mask reveal, drawn rules, drawn coverage routes. List and rules in `docs/06` section 9 | Orientation and rhythm. Each effect shows a state or a relationship. None is decoration |
| **Vancouver clock** | For firms outside BC, a card shows the current time in Vancouver (Pacific Time) | Practical for out-of-province instructing firms. No hours or availability claims |

## 6. Mobile

- Design mobile first: 375 px is the primary canvas.
- Tap targets 48 px minimum. Inputs 16 px font to avoid zoom.
- Phone is a real link. The bottom bar offers Call and Request service.
- The sample affidavit stacks above the fold's secondary content, not hidden behind a tab.
- Tables become labelled lists at under 640 px. Do not use horizontal scroll.

## 7. Accessibility requirements that shape UX

- Contrast targets in `docs/06`. Colour is never the only signal.
- Visible focus style (see `docs/06`).
- Form errors are linked with `aria-describedby` and summarised at the top on submit failure.
- The coverage map is an enhancement over a list. Every function is available from the list.
- Motion respects `prefers-reduced-motion`: every scroll variable takes its final value and no listeners are added. Nothing flashes, loops or autoplays. With script disabled the page is complete.
- Text resizes to 200 percent without loss. Line length under 70 characters in body copy.

## 8. Analytics events

Use a privacy-respecting setup (Plausible or GA4 with consent mode) and name events consistently:

| Event | When |
|---|---|
| `request_start` | First interaction with any form field |
| `request_step_2` | Step 1 completed |
| `request_submit` | Success state shown |
| `click_call` | Tap on a `tel:` link, with page as property |
| `click_email` | Tap on a `mailto:` link |
| `open_sample_affidavit` | Sample annotated or expanded |
| `use_document_finder` | A category chosen |
| `use_coverage_map` | A community chosen |
| `view_pricing_table` | Table enters the viewport |

Never send form content in events.

## 9. Microcopy standards

- Buttons say what happens: **Request service**, **Continue to step 2**, **Send request**, **Copy reference**.
- Errors say what is wrong and how to fix it. They do not apologize and do not blame.
- Empty or unavailable states give the next step. Example: "We could not match that area. Send the address and we will confirm availability the same business day."
- Use the same word for the same thing: instruction, file, attempt, service, affidavit.
