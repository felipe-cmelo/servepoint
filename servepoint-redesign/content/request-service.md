# Copy: Request service

## Page
**H1:** Request service

**Lead:** Tell us what to serve, file or search. We confirm availability and next steps the same business day.

## Form
Status line: Step 1 of 2: The file / Step 2 of 2: The person and the place

### Step 1 fields
- Firm or organization (required)
- Your name (required)
- Email (required)
- Phone (optional)
- Matter or file reference (optional). Helper: Shown on your confirmation so you can bill the matter.
- Court file number (optional)
- Service required (required): Process serving, Court filing, Corporate search, Not sure, please advise
- Urgency (required): Standard. Helper: first attempt typically within 24 hours. / Rush within 48 hours / Rush same day
- Checkbox: Remember my firm details on this device (unchecked). Link: Forget these details

Button: Continue to step 2

### Step 2: process serving
- Person or company to be served (required)
- Service address (required). Helper: Include the unit or suite number. Add a second address if you have one.
- Deadline date (optional)
- Details that help (optional). Helper: A physical description, working hours, vehicle information, previous attempts, or anything unusual about the address or building.

### Step 2: court filing
- Documents to file or retrieve (required)
- Registry (optional)
- Deadline date (optional)
- How should we return the documents? Digital copy, Mail
- Details that help (optional)

### Step 2: not sure
The current form has "Not Sure, Please Advise" as a fourth choice and no further logic for it. This variant closes that gap.
- What do you need? (required, free text). Helper: Describe the documents or the task. We will tell you the right service and the next step.
- Person or company involved (optional)
- Service address, if there is one (optional)
- Deadline date (optional)
- Details that help (optional)

### Step 2: corporate search
- Company name or incorporation number (required)
- Searches needed (required, checkboxes): Company summary, Director and officer search, Registered office confirmation, Historical search, Certificate of status, Name and trade name search
- Deadline date (optional)
- Details that help (optional)

### Summary step
Heading: Check your request. Show answers with an Edit link per step.
Button: Send request

## Hidden field and spam protection
One visually hidden text field, `bot-field`, as the Netlify honeypot (`netlify-honeypot="bot-field"`). The current form shows a field labelled "Leave this empty:". In the rebuild it is hidden from sight and from assistive technology (`aria-hidden`, `tabindex="-1"`, off-screen), so no real visitor sees or hears it. Turnstile joins it in the function phase. See `docs/07`.

## Where each field of the current form went
The current `/contact/` form is one page with 12 fields (11 real fields and the honeypot). The rebuild keeps all 11 and adds two. Field names are on the left as published.

| Current field | Rebuild |
|---|---|
| Firm or Organization (required) | Step 1, "Firm or organization" |
| Name (required) | Step 1, "Your name" |
| Email (required) | Step 1 |
| Phone Number (optional) | Step 1, "Phone" |
| Court File Number (optional) | Step 1 |
| Service Required (required; Process Serving, Court Services, Corporate Search, Not Sure Please Advise) | Step 1, same four choices, with "Court filing" replacing "Court services" to match the new page name |
| Urgency (required; Standard, Rush within 48 Hours, Rush Same Day) | Step 1, same three choices |
| Person or Company to Be Served (required) | Step 2, process serving only. The current form asks for it on every request, including a court filing or a corporate search |
| Service Address (required, with the unit or suite helper) | Step 2, process serving only. Same helper text |
| Deadline Date (optional) | Step 2, every variant |
| Additional Service Details (optional, helper lists physical description, work hours, vehicle information, previous attempts, unusual address details) | Step 2, "Details that help", same helper |
| New: Matter or file reference | Step 1, optional. Comes back on the confirmation page |
| New: Remember my firm details | Step 1, unchecked checkbox, stored on the device only |

The current page also carries the label "New Request" above the form, the button "Submit Instructions", the heading "Prefer to email?" and a "What happens next?" list of four steps. All four have an equivalent in the side column and the received page below.

## Error messages
- Required field: Enter [field name].
- Email: Enter an email address we can reply to, like name@firm.ca.
- Date in the past: Enter a date that is today or later.
- Send failed: We could not send the request. Call 778-238-2797 or email serve@servepointcanada.com. Your answers are still on this page.

## Side column
**What to send:** The documents, the service address, the deadline and the court file number.
**After you submit:** 1. We confirm availability and next steps the same business day. 2. You email the documents to serve@servepointcanada.com with your reference. 3. Service begins, with updates on each attempt. 4. A sworn affidavit of service is provided when service is complete.
**Prefer to call or email:** Call 778-238-2797 or email serve@servepointcanada.com.

## Received page (`/request-service/received/`)
**H1:** Request received

Your reference is [ref]. (Button: Copy reference)

Email your documents to serve@servepointcanada.com and include the reference and the service address and deadline.

What happens next: the same list as "After you submit".
