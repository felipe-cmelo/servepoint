/**
 * FAQ bank (content/faqs.md). Each page renders its own subset and its FAQPage schema from this one source.
 * Answers contain only approved facts (docs/09 section 4). Items that wait on the owner are listed in `pending`.
 * Wording tightened on 2026-11-20: short answers, the fact first, nothing repeated.
 */
export type PageKey =
  | "home" | "process-serving" | "court-filing" | "corporate-search" | "pricing" | "out-of-province";

export interface Faq {
  id: string;
  q: string;
  a: string;
  pages: PageKey[];
}

export const faqs: Faq[] = [
  { id: "speed", q: "How quickly can documents be served?", a: "The first attempt is typically within 24 hours of receiving your documents and instructions. Rush service is available within 48 hours or the same day, with pricing confirmed before service.", pages: ["home", "process-serving", "out-of-province"] },
  { id: "proof", q: "What proof of service do I receive?", a: "A sworn affidavit of service. It records when, where and how service was made. If service fails after the included attempts, you receive an affidavit of attempted service.", pages: ["home", "process-serving", "out-of-province"] },
  { id: "evasion", q: "What happens if the person avoids service?", a: "We record each attempt with date, time and location, adjust the approach and keep you informed. After the included attempts, you receive an affidavit of attempted service and an update on next steps.", pages: ["home", "process-serving", "out-of-province"] },
  { id: "out-of-province", q: "Do you accept out-of-province and US court documents?", a: "Yes, for service in Vancouver and the Lower Mainland. Your firm chooses the method of service and any court requirements. We carry out the instruction.", pages: ["home", "process-serving", "out-of-province"] },
  { id: "registered-office", q: "Can you confirm a company's registered office before service?", a: "Yes. We run a BC corporate search to confirm the registered office, then attempt service there. Order both on one instruction.", pages: ["home", "process-serving", "corporate-search", "out-of-province"] },
  { id: "pricing", q: "How is pricing structured?", a: "Each service starts from $168. Process serving includes up to 3 attempts and a sworn affidavit. Rush, travel and special requests may add to the price. Pricing is confirmed before service.", pages: ["home", "process-serving", "pricing"] },
  { id: "get-started", q: "What do you need to get started?", a: "The documents, the service address with unit or suite number, the deadline and your instructions. Use the request form, then email the documents.", pages: ["process-serving", "pricing", "out-of-province"] },
  { id: "fails", q: "What if service is not completed after 3 attempts?", a: "You receive an affidavit of attempted service and an update on next steps. Your firm decides what comes next.", pages: ["process-serving", "pricing"] },
  { id: "filing-scope", q: "What can you file or issue at the registry?", a: "Pleadings, applications and affidavits, and the issuing of Notices of Civil Claim and petitions, at BC Supreme Court and Provincial Court registries.", pages: ["court-filing"] },
  { id: "filing-return", q: "How do I receive filed documents?", a: "Digitally, or by mail if you prefer.", pages: ["court-filing"] },
  { id: "filing-with-service", q: "Can filing and service be done in one instruction?", a: "Yes. Filing or issuing and service can be one instruction, so filed documents go straight to service.", pages: ["court-filing"] },
  { id: "filing-outside-bc", q: "Can a firm outside BC instruct you for court work?", a: "Yes. Firms across Canada can instruct ServePoint directly for work in Vancouver and the Lower Mainland.", pages: ["court-filing", "out-of-province"] },
  { id: "search-types", q: "Which searches can you run?", a: "Company summary, director and officer search, registered office confirmation, historical search, certificate of status, and name and trade name search.", pages: ["corporate-search"] },
  { id: "search-inputs", q: "What do you need to run a search?", a: "A company name, an incorporation number or a trade name.", pages: ["corporate-search"] },
  { id: "search-turnaround", q: "How long does a search take?", a: "Results are typically delivered within 2 business days, digitally by email.", pages: ["corporate-search"] },
  { id: "search-with-service", q: "Can I order a search and service together?", a: "Yes. We confirm the registered office first, then attempt service: search first, serve second.", pages: ["corporate-search"] },
  { id: "corporation", q: "Can you serve a corporation in BC?", a: "Yes, in Vancouver and the Lower Mainland, with an optional corporate search first to confirm the registered office.", pages: ["out-of-province"] },
  { id: "hague", q: "Does the Hague Service Convention apply?", a: "It depends on the matter. Your firm determines the method of service, and we carry out the instruction locally.", pages: ["out-of-province"] },
  { id: "affidavit-records", q: "What does the proof of service record?", a: "When, where and how service was completed.", pages: ["out-of-province"] },
];

/** The FAQs for a page, in bank order, or in the order of `ids` when given. */
export const faqsFor = (page: PageKey, ids?: string[]): Faq[] => {
  if (!ids) return faqs.filter((f) => f.pages.includes(page));
  return ids.map((id) => faqs.find((f) => f.id === id)).filter((f): f is Faq => Boolean(f));
};

/**
 * Waiting on the owner. Not published until answered (docs/12 questions 5, 9, 11 and 15).
 * [CONFIRM: extra-attempts, filing-fees, payment, filing-turnaround]
 * [CONFIRM: founder approves any further wording on the Hague Service Convention]
 */
export const pendingFaqIds = ["extra-attempts", "filing-fees", "payment", "filing-turnaround"];
