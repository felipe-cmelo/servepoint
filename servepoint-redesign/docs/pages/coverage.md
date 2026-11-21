# Page spec: Coverage (`/coverage/` and `/coverage/[city]/`)

## Hub: `/coverage/`

**Purpose:** show where ServePoint serves and send visitors to the right city page or the form.
**Primary keyword:** process server Lower Mainland.
**H1:** Areas we serve: Vancouver and the Lower Mainland.
**Copy:** `content/coverage.md`.

| # | Section | Component |
|---|---|---|
| 1 | Intro with the 15 communities named in the first sentence | Text |
| 2 | Route map and list | `CoverageMap` on the `--ink` surface: route diagram, panel (neighbourhoods, nearest courts, link to the city page when published) and the list of 15 buttons |
| 3 | Not on the list | Text: "Send the address and we confirm availability the same business day." Link to the form. Fraser Valley `[CONFIRM: on request]` |
| 4 | Travel and price | One sentence linking to pricing |
| 5 | Close | Request service |

## City pages: `/coverage/[slug]/`

Tier 1 at launch: **Vancouver, Burnaby, Surrey, Richmond.** Tier 2 after launch: Coquitlam, New Westminster, North Vancouver, Langley, Delta. Tier 3 stay on the hub: Port Coquitlam, Port Moody, West Vancouver, White Rock, Maple Ridge, Pitt Meadows.

**H1:** Process server in [City], BC.

A city page ships only if it passes the six-point test in `docs/03` section 7. Structure:

| # | Section | Notes |
|---|---|---|
| 1 | Intro | Unique, 80 to 120 words. What serving in this city involves in practice |
| 2 | Courts and registries nearby | Names and links to the official court pages. Research and cite. Do not guess addresses |
| 3 | Neighbourhoods | The list for this city below (seed data from the current site) |
| 4 | Access and timing notes | True, specific and useful. Example themes: secured towers, gated communities, rural lots, working hours when people are reachable. Verify before writing |
| 5 | FAQs | 3 to 5 specific to the city |
| 6 | Nearby cities | Links to two neighbours |
| 7 | Request service | Link with `?city=` |

### Research prompts for tier 1 content (verify, cite, write plainly)
- **Vancouver:** downtown, West End, Yaletown and Gastown are dense with towers that have concierge or fob access. The Vancouver registries and courthouses. Typical timing of attempts for working people.
- **Burnaby:** Metrotown and Brentwood high-rise clusters, Lougheed, the mix of single-family areas. The registry that serves Burnaby matters for filing.
- **Surrey:** large geography with City Centre towers and spread-out suburban areas. The Surrey courthouse. Travel time and coverage across Whalley, Guildford, Fleetwood, Newton, Cloverdale, Clayton Heights, South Surrey.
- **Richmond:** City Centre and Brighouse towers, industrial Bridgeport and Sea Island, Steveston. The Richmond court.

### Neighbourhood seed data (copied from the current `/areas/` page and re-checked on 2026-11-16: 15 communities, 109 neighbourhoods)

| City | Neighbourhoods |
|---|---|
| Vancouver | Downtown, West End, Yaletown, Gastown, Strathcona, Mount Pleasant, Kitsilano, Fairview, Point Grey, Dunbar, Kerrisdale, Marpole, Oakridge, Commercial Drive, Hastings-Sunrise, Renfrew-Collingwood, South Vancouver |
| Burnaby | Metrotown, Brentwood, Lougheed, Edmonds, Burnaby Heights, Capitol Hill, Deer Lake, Big Bend |
| Richmond | City Centre, Brighouse, Steveston, Hamilton, Bridgeport, Broadmoor, Seafair, Sea Island |
| Surrey | Surrey Central, Whalley, Guildford, Fleetwood, Newton, Cloverdale, South Surrey, Clayton Heights |
| New Westminster | Downtown, Uptown, Quayside, Sapperton, Queens Park, Connaught Heights, Queensborough |
| Coquitlam | City Centre, Burquitlam, Maillardville, Austin Heights, Burke Mountain, Westwood Plateau |
| Port Coquitlam | Downtown, Mary Hill, Citadel Heights, Birchland Manor, Riverwood, Dominion Triangle |
| Port Moody | Suter Brook, Klahanie, Newport Village, Moody Centre, Heritage Mountain, Heritage Woods |
| North Vancouver | Lower Lonsdale, Central Lonsdale, Lynn Valley, Deep Cove, Seymour, Edgemont Village |
| West Vancouver | Ambleside, Dundarave, British Properties, Caulfeild, Cypress Park, Horseshoe Bay |
| Delta | North Delta, Scottsdale, Sunshine Hills, Ladner, Tsawwassen, Boundary Bay, Annacis Island |
| Langley | Langley City, Willoughby, Walnut Grove, Brookswood, Murrayville, Fort Langley, Aldergrove |
| Maple Ridge | Haney, West Maple Ridge, Albion, Silver Valley, Cottonwood, Websters Corners, Whonnock |
| Pitt Meadows | Central Meadows, South Bonson, Osprey Village, North Meadows, Mid Meadows |
| White Rock | East Beach, West Beach, Five Corners, Marine Drive, Hillside |

The home page of the current site lists 14 communities and omits Pitt Meadows. The current `/areas/` page lists all 15, and its meta description names only ten (it folds the North Shore into one name and leaves out Port Coquitlam, Port Moody, Maple Ridge and Pitt Meadows). Use 15 until the owner answers question 8.

Current `/areas/` page, for the record: H1 "Legal Support Services across Vancouver and the Lower Mainland", an image map of the 15 communities with four reference points (Strait of Georgia, Burrard Inlet, Boundary Bay, Fraser River), one H3 per city with a plain comma list of neighbourhoods and no links, a note to contact for service outside the area ("Check Availability"), and a closing request block. It has no FAQ and names no courts. The map shows Langley as both Township of Langley and Langley City. The rebuild uses one Langley node and lists Langley City among its neighbourhoods.

The current intro says the services are for "law firms, businesses and individuals". The rest of the site speaks only to law firms. See `docs/12` question 1.

## Map data
The map is a drawn diagram, not geography. Use `design/coverage-map-data.json` (15 nodes, 5 lines, 2 water shapes, viewBox 1000 by 620). Caption: "Schematic. Not to scale." Label the four reference points the current map shows (Strait of Georgia, Burrard Inlet, Boundary Bay, Fraser River) as small italic water labels, positions in the JSON `waterLabels`. Do not use boundary data, tiles or an external map. Cities with a published page link to it from the panel.

## Schema
`BreadcrumbList`, `FAQPage` on city pages. `areaServed` on the organization lists all 15.
