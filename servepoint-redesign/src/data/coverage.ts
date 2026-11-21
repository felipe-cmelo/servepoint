/**
 * Coverage seed data: 15 communities and 109 neighbourhoods, copied from the current /areas/ page and re-checked
 * on 2026-11-16 (docs/pages/coverage.md). Neighbourhood names are kept as published.
 * `t` is the route-order threshold at which a map node lights while the routes draw (docs/06 section 9.2, effect 10).
 */
import { site } from "./site";

export interface Community {
  name: string;
  slug: string;
  tier: 1 | 2 | 3;
  neighbourhoods: string[];
  t: number;
}

const hoods: Record<string, { n: string[]; t: number }> = {
  vancouver: { t: 0.12, n: ["Downtown", "West End", "Yaletown", "Gastown", "Strathcona", "Mount Pleasant", "Kitsilano", "Fairview", "Point Grey", "Dunbar", "Kerrisdale", "Marpole", "Oakridge", "Commercial Drive", "Hastings-Sunrise", "Renfrew-Collingwood", "South Vancouver"] },
  burnaby: { t: 0.18, n: ["Metrotown", "Brentwood", "Lougheed", "Edmonds", "Burnaby Heights", "Capitol Hill", "Deer Lake", "Big Bend"] },
  richmond: { t: 0.24, n: ["City Centre", "Brighouse", "Steveston", "Hamilton", "Bridgeport", "Broadmoor", "Seafair", "Sea Island"] },
  surrey: { t: 0.61, n: ["Surrey Central", "Whalley", "Guildford", "Fleetwood", "Newton", "Cloverdale", "South Surrey", "Clayton Heights"] },
  "new-westminster": { t: 0.3, n: ["Downtown", "Uptown", "Quayside", "Sapperton", "Queens Park", "Connaught Heights", "Queensborough"] },
  coquitlam: { t: 0.42, n: ["City Centre", "Burquitlam", "Maillardville", "Austin Heights", "Burke Mountain", "Westwood Plateau"] },
  "port-coquitlam": { t: 0.55, n: ["Downtown", "Mary Hill", "Citadel Heights", "Birchland Manor", "Riverwood", "Dominion Triangle"] },
  "port-moody": { t: 0.36, n: ["Suter Brook", "Klahanie", "Newport Village", "Moody Centre", "Heritage Mountain", "Heritage Woods"] },
  "north-vancouver": { t: 0.06, n: ["Lower Lonsdale", "Central Lonsdale", "Lynn Valley", "Deep Cove", "Seymour", "Edgemont Village"] },
  "west-vancouver": { t: 0, n: ["Ambleside", "Dundarave", "British Properties", "Caulfeild", "Cypress Park", "Horseshoe Bay"] },
  delta: { t: 0.49, n: ["North Delta", "Scottsdale", "Sunshine Hills", "Ladner", "Tsawwassen", "Boundary Bay", "Annacis Island"] },
  langley: { t: 0.79, n: ["Langley City", "Willoughby", "Walnut Grove", "Brookswood", "Murrayville", "Fort Langley", "Aldergrove"] },
  "maple-ridge": { t: 0.73, n: ["Haney", "West Maple Ridge", "Albion", "Silver Valley", "Cottonwood", "Websters Corners", "Whonnock"] },
  "pitt-meadows": { t: 0.67, n: ["Central Meadows", "South Bonson", "Osprey Village", "North Meadows", "Mid Meadows"] },
  "white-rock": { t: 0.85, n: ["East Beach", "West Beach", "Five Corners", "Marine Drive", "Hillside"] },
};

export const communities: Community[] = site.areas.map((a) => ({
  name: a.name,
  slug: a.slug,
  tier: a.tier,
  neighbourhoods: hoods[a.slug].n,
  t: hoods[a.slug].t,
}));

export const communityBySlug = (slug: string) => communities.find((c) => c.slug === slug);
export const neighbourhoodCount = communities.reduce((n, c) => n + c.neighbourhoods.length, 0);
