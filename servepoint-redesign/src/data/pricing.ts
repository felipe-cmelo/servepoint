/**
 * Pricing table (docs/04 section 7, content/pricing.md). The page never shows a number that is not here.
 * Extras use amount: null until the owner answers docs/12 question 5. The component then renders
 * "Confirmed before service".
 */
export interface PricedService {
  slug: "process-serving" | "court-filing" | "corporate-search";
  name: string;
  from: number;
  included: string;
  /** Short form of `included` for the home page table. */
  includedShort: string;
  /** The same facts as a list, for the price explorer. */
  list: string[];
  /** What happens at standard urgency. All statements come from the facts register. */
  timing: string;
  path: string;
}

export const services: PricedService[] = [
  {
    slug: "process-serving", name: "Process serving", from: 168, path: "/process-serving/",
    included: "Up to 3 attempts, updates and a sworn affidavit of service. An affidavit of attempted service if service fails.",
    includedShort: "Up to 3 attempts, updates, sworn affidavit of service",
    list: ["Up to 3 attempts", "Service updates", "Sworn affidavit of service", "Affidavit of attempted service if service fails"],
    timing: "First attempt typically within 24 hours of receiving your documents and instructions.",
  },
  {
    slug: "court-filing", name: "Court filing and registry attendance", from: 168, path: "/court-filing/",
    included: "Filing or issuing, registry attendance, and return of filed documents by digital copy or mail.",
    includedShort: "Filing or issuing, registry attendance, return of filed documents",
    list: ["Filing or issuing", "Registry attendance", "Return of filed documents, digital or mail"],
    timing: "We confirm availability and next steps the same business day.",
  },
  {
    slug: "corporate-search", name: "Corporate search", from: 168, path: "/corporate-search/",
    included: "Current and historical company information, registered office and director details, delivered digitally.",
    includedShort: "Company information, registered office and directors, digital delivery",
    list: ["Current and historical company information", "Registered office and director details", "Digital delivery"],
    timing: "Results by email, typically within 2 business days.",
  },
];

export interface Extra {
  name: string;
  amount: number | null;
  note: string;
}

/** [CONFIRM: amounts for rush, same day and travel. docs/12 question 5] */
export const extras: Extra[] = [
  { name: "Rush within 48 hours", amount: null, note: "Confirmed before service" },
  { name: "Rush same day", amount: null, note: "Confirmed before service" },
  { name: "Travel beyond the standard area", amount: null, note: "Confirmed before service" },
  { name: "Special requests", amount: null, note: "Confirmed before service" },
];

export const extraAmount = (e: Extra) => (e.amount === null ? e.note : `$${e.amount}`);

export const coverageLine =
  "Process serving: Vancouver and the Lower Mainland. Court filing: BC Supreme Court and Provincial Court registries. Corporate search: BC companies.";

/** What rush means. Amounts are not published until the owner answers docs/12 question 5. */
export const rushTiming =
  "Rush requests are prioritized. Availability is confirmed the same business day, and rush pricing is confirmed before service.";

export const urgencyOptions = [
  { v: "standard", l: "Standard" },
  { v: "rush-48", l: "Rush within 48 hours" },
  { v: "rush-same-day", l: "Rush same day" },
] as const;
