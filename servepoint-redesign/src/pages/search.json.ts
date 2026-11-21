/**
 * Search index for the command palette (docs/15 section 4), generated at build time from the data modules.
 * Pages, services, the 15 communities, the 109 neighbourhoods, visible guides and actions.
 */
import type { APIRoute } from "astro";
import { site } from "../data/site";
import { communities } from "../data/coverage";
import { visibleGuides } from "../data/guides";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const published = new Set((await getCollection("coverage")).filter((c) => c.data.published).map((c) => c.data.slug));
  const cityUrl = (slug: string) => (published.has(slug) ? `/coverage/${slug}/` : `/coverage/?area=${slug}`);
  const guides = await visibleGuides();

  const items = [
    { t: site.actions.primary, s: "Open the request form", u: site.actions.primaryPath, k: "Action", q: "instruct send file new" },
    { t: site.actions.phoneLabel, s: `Phone, ${site.phone.display}`, u: `tel:${site.phone.tel}`, k: "Action", q: "phone call dial" },
    { t: "Email us", s: site.email, u: site.emailHref, k: "Action", q: "mail documents send" },
    { t: "Request rush service", s: "Rush within 48 hours or same day", u: "/request-service/?urgency=rush-same-day", k: "Action", q: "urgent deadline same day" },
    { t: "Process serving", s: "Personal service in Vancouver and the Lower Mainland", u: "/process-serving/", k: "Service", q: "serve affidavit documents attempts" },
    { t: "Court filing", s: "Filing, issuing and registry attendance", u: "/court-filing/", k: "Service", q: "registry court services file" },
    { t: "Corporate search", s: "BC Registry searches, results by email", u: "/corporate-search/", k: "Service", q: "company registered office directors status" },
    { t: "Pricing", s: `Each service starts from $${site.basePrice.amount}`, u: "/pricing/", k: "Page", q: "cost price rush travel quote" },
    { t: "Areas we serve", s: "15 communities across the Lower Mainland", u: "/coverage/", k: "Page", q: "coverage map cities neighbourhoods" },
    { t: "Out of province and US", s: "For firms outside BC", u: "/out-of-province-and-us/", k: "Page", q: "us hague canada pacific time usd" },
    { t: "Guides", s: "Serving documents in BC", u: "/guides/", k: "Page", q: "learn rules forms" },
    { t: "About", s: `${site.founder.name}, ${site.founder.credential}`, u: "/about/", k: "Page", q: "founder jasmine deo" },
    { t: "Privacy", s: "What the form collects and why", u: "/privacy/", k: "Page", q: "data information" },
    { t: "Terms", s: "Terms of use", u: "/terms/", k: "Page", q: "legal" },
    { t: "Accessibility", s: "Our target and how to report a barrier", u: "/accessibility/", k: "Page", q: "wcag a11y" },
    ...communities.map((c) => ({ t: c.name, s: `Community, ${c.neighbourhoods.length} neighbourhoods`, u: cityUrl(c.slug), k: "Area", q: "city serve" })),
    ...communities.flatMap((c) =>
      c.neighbourhoods.map((n) => ({ t: n, s: `${c.name}, neighbourhood`, u: cityUrl(c.slug), k: "Neighbourhood", q: `${c.name} area` }))
    ),
    ...guides.map((g) => ({ t: g.data.title, s: g.data.status === "draft" ? "Guide (draft)" : "Guide", u: `/guides/${g.data.slug}/`, k: "Guide", q: g.data.primaryKeyword })),
  ];

  return new Response(JSON.stringify(items), { headers: { "content-type": "application/json" } });
};
