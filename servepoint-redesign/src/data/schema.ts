/** JSON-LD builders (docs/08 section 3). Only mark up what is visible on the page. */
import { site, absoluteUrl } from "./site";
import type { Faq } from "./faqs";

const orgId = `${site.url}/#organization`;

export const organization = () => ({
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": orgId,
  name: site.name,
  url: `${site.url}/`,
  logo: `${site.url}/logo.png`,
  telephone: site.phone.schema,
  email: site.email,
  description: "Process serving, court filing and BC corporate searches for law firms in Vancouver and the Lower Mainland.",
  address: { "@type": "PostalAddress", addressLocality: "Vancouver", addressRegion: "BC", addressCountry: "CA" },
  areaServed: site.areas.map((a) => ({ "@type": "City", name: a.name })),
  founder: { "@type": "Person", name: site.founder.name, honorificSuffix: site.founder.credential },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: site.services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name } })),
  },
});

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
});

export const faqPage = (faqs: Pick<Faq, "q" | "a">[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const service = (opts: { name: string; serviceType: string; description: string; path: string }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: opts.name,
  serviceType: opts.serviceType,
  description: opts.description,
  url: absoluteUrl(opts.path),
  provider: { "@id": orgId },
  areaServed: site.areas.map((a) => ({ "@type": "City", name: a.name })),
  offers: {
    "@type": "Offer",
    priceSpecification: { "@type": "PriceSpecification", minPrice: site.basePrice.amount, priceCurrency: site.basePrice.currency },
  },
});

export const aboutPage = () => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `About ${site.name}`,
  url: absoluteUrl("/about/"),
  mainEntity: {
    "@type": "Person",
    name: site.founder.name,
    honorificSuffix: site.founder.credential,
    jobTitle: site.founder.role,
    worksFor: { "@id": orgId },
  },
});

export const article = (opts: { title: string; description: string; path: string; modified: Date | null; image: string }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: opts.title,
  description: opts.description,
  mainEntityOfPage: absoluteUrl(opts.path),
  author: { "@type": "Person", name: site.founder.name, honorificSuffix: site.founder.credential },
  publisher: { "@id": orgId },
  image: absoluteUrl(opts.image),
  ...(opts.modified ? { datePublished: opts.modified.toISOString().slice(0, 10), dateModified: opts.modified.toISOString().slice(0, 10) } : {}),
});
