/**
 * Site facts. Every shared fact is defined here once and imported.
 * No component hard-codes the phone number, email, price or area list (docs/04 section 7).
 *
 * Source: the facts register in docs/09-copy-guidelines.md section 4 ("Approved").
 * Anything not on that list stays null or empty until the owner confirms it.
 *
 * Shape: the TypeScript block in docs/07 section 4 (name, url, phone.display, phone.tel, email,
 * locality, founder, hours, social, basePrice, firstAttempt, attemptsIncluded, disclaimer, areas),
 * plus the extra fields below that were written in Phase 0 and are kept. Nothing here changes a
 * fact. Where both versions used the same key for a different shape, the spec's shape wins and the
 * other version's value sits under a new key (email.address is now `email`, email.href is `emailHref`).
 */

export type CoverageTier = 1 | 2 | 3;

export interface Area {
  name: string;
  slug: string;
  /** Tier 1 gets a city page at launch, tier 2 after launch, tier 3 stays on the hub (docs/pages/coverage.md). */
  tier: CoverageTier;
}

export interface ServiceSummary {
  slug: "process-serving" | "court-filing" | "corporate-search";
  name: string;
  path: string;
  fromPrice: number;
}

const origin = "https://servepointcanada.com";
const basePrice = { amount: 168, currency: "CAD" } as const;
const attemptsIncluded = 3;

export const site = {
  name: "ServePoint Canada",
  shortName: "ServePoint",
  legalDescriptor: "ServePoint Canada provides process serving and legal support services.",
  /** Spec name for the origin. `origin` is the same value, kept for code written against the Phase 0 shape. */
  url: origin,
  origin,
  /** City and province as one string, for titles and the schema address (docs/07 section 4). */
  locality: "Vancouver, BC",
  locale: "en-CA",
  language: "en",
  region: { city: "Vancouver", province: "BC", country: "CA" },

  /** Primary action names. One name per action across the whole site (CLAUDE.md, docs/09 section 2). */
  actions: {
    primary: "Request service",
    primaryPath: "/request-service/",
    phoneLabel: "Call 778-238-2797",
  },

  phone: {
    display: "778-238-2797",
    href: "tel:+17782382797",
    /** docs/07 name for the E.164 number without the tel: prefix. Same value as `e164`. */
    tel: "+17782382797",
    e164: "+17782382797",
    schema: "+1-778-238-2797",
  },
  email: "serve@servepointcanada.com",
  emailHref: "mailto:serve@servepointcanada.com",

  /** Exact footer sentence. Do not edit without the owner (docs/09 section 7). */
  disclaimer:
    "ServePoint Canada provides process serving and legal support services. This website does not provide legal advice.",

  founder: {
    name: "Jasmine Deo",
    credential: "LLB",
    role: "Founder",
    /** The About page has a headshot on the old site. Not shipped until the owner supplies the file. */
    portrait: null as string | null,
  },

  /** [CONFIRM: business hours and whether after-hours or weekend service is offered. docs/12 question 6] */
  hours: null as string | null,

  /** [CONFIRM: public office address. Without one this is a service-area business, city only. docs/12 question 7] */
  address: null as string | null,

  /** No social profiles are published on the current site. Fill sameAs only when confirmed (docs/08 section 3.1). */
  social: [] as { label: string; url: string }[],

  /** Published starting price in CAD, identical for the three services today. Rush, travel and extras are not priced. */
  basePrice,
  startingPrice: { ...basePrice, display: "$168" },

  /** docs/07 section 4. The copy carries the qualifier "typically" (docs/09 facts register). */
  firstAttempt: "within 24 hours",
  attemptsIncluded,

  /** Published promises (docs/09 facts register). */
  promises: {
    firstAttempt: "First attempt typically within 24 hours of receiving documents and instructions",
    attemptsIncluded,
    confirmation: "Same business day confirmation of availability and next steps",
    corporateSearchTurnaround: "Typically within 2 business days",
  },

  urgencyOptions: ["Standard", "Rush within 48 hours", "Rush same day"],

  services: [
    { slug: "process-serving", name: "Process serving", path: "/process-serving/", fromPrice: 168 },
    { slug: "court-filing", name: "Court filing and registry services", path: "/court-filing/", fromPrice: 168 },
    { slug: "corporate-search", name: "BC corporate search", path: "/corporate-search/", fromPrice: 168 },
  ] satisfies ServiceSummary[],

  /** The 15 communities on the published coverage list, in the order of design/coverage-map-data.json. */
  areas: [
    { name: "Vancouver", slug: "vancouver", tier: 1 },
    { name: "Burnaby", slug: "burnaby", tier: 1 },
    { name: "Surrey", slug: "surrey", tier: 1 },
    { name: "Richmond", slug: "richmond", tier: 1 },
    { name: "Coquitlam", slug: "coquitlam", tier: 2 },
    { name: "New Westminster", slug: "new-westminster", tier: 2 },
    { name: "North Vancouver", slug: "north-vancouver", tier: 2 },
    { name: "Langley", slug: "langley", tier: 2 },
    { name: "Delta", slug: "delta", tier: 2 },
    { name: "Port Coquitlam", slug: "port-coquitlam", tier: 3 },
    { name: "Port Moody", slug: "port-moody", tier: 3 },
    { name: "West Vancouver", slug: "west-vancouver", tier: 3 },
    { name: "White Rock", slug: "white-rock", tier: 3 },
    { name: "Maple Ridge", slug: "maple-ridge", tier: 3 },
    { name: "Pitt Meadows", slug: "pitt-meadows", tier: 3 },
  ] satisfies Area[],

  /** Documents the firm may serve, by category (docs/09 facts register). */
  documentCategories: ["Civil", "Family", "Commercial", "Witness", "Residential tenancy", "Corporate"],
} as const;

export type Site = typeof site;

/** Absolute URL on the canonical origin, with a trailing slash for paths (trailingSlash: "always"). */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return new URL(clean, origin).toString();
}
