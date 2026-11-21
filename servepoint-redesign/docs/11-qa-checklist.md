# 11. QA checklist

Run against the Netlify preview in Phase 5 and against production after launch. Record results in `docs/data/qa-report.md`.

## Functional
- [ ] Request form: both steps complete with valid data and the success state shows a reference number
- [ ] Each validation error appears beside its field, in words, and is announced to a screen reader
- [ ] Form works with JavaScript disabled (single step)
- [ ] A test submission reaches the owner's email with all fields
- [ ] Honeypot rejects a bot submission
- [ ] "Remember my firm details" stores only firm, name, email and phone, and "Forget these details" clears them
- [ ] `tel:` and `mailto:` links work on iOS and Android
- [ ] Document finder and coverage map update their panels and are keyboard operable
- [ ] All nine redirects in `docs/04` return 301 to the right page
- [ ] 404 page links to main services and the form
- [ ] Mobile bar hides when a form field is focused
- [ ] The form is listed in the Netlify Forms tab, and the old form's submissions were exported before the first deploy (`docs/07` section 5.3)
- [ ] `curl -sI` shows each security header once, and `npm run test:csp` passes against the deploy preview with no policy violations (`docs/07` section 6.4)

## Content
- [ ] No `[CONFIRM` or lorem text anywhere in `dist/`
- [ ] Every fact on the site is in the approved list in `docs/09` or was confirmed by the owner
- [ ] Phone, email, price and coverage list come from `site.ts` and agree everywhere
- [ ] No em dashes, no banned phrases (`npm run check:copy`)
- [ ] The specimen is labelled "Sample. Fictional parties, address and file number."
- [ ] The footer disclaimer is on every page and exact
- [ ] Guides marked `draft` are not published
- [ ] Spelling is Canadian

## SEO
- [ ] One H1 per page. Titles and meta descriptions unique and within length
- [ ] Canonical on every page, on the production host
- [ ] JSON-LD validates and matches visible content (phone, email, price, areas)
- [ ] Sitemap lists every indexable page and no noindex page
- [ ] `robots.txt` correct. `ALLOW_INDEXING=true` is set on the production site only. Production responses carry no `X-Robots-Tag`, staging and previews still do
- [ ] No orphan pages. Every page has at least three internal links
- [ ] No broken links, no redirect chains, no duplicate titles in a full crawl
- [ ] Open Graph image renders for the home page and each guide
- [ ] Google Business Profile matches site name, phone, service areas and services

## Accessibility (WCAG 2.2 AA)
- [ ] axe: zero violations on every built page
- [ ] Keyboard: every function reachable, logical order, visible focus on paper, mist and navy surfaces
- [ ] Screen reader pass (VoiceOver and NVDA) on home, process serving, the form and the coverage map
- [ ] Contrast checked for every token pair used
- [ ] Zoom to 200 percent and 400 percent reflow with no loss
- [ ] Reduced motion: marks and signature drawn, every scroll variable at its final value, no transitions, no view transition, no smooth scrolling
- [ ] Tap targets at least 44 px on mobile (primary buttons 56 px)
- [ ] Forms: labels, helper text and errors programmatically associated
- [ ] Accessibility statement page published

## Performance
- [ ] Lighthouse mobile: Performance 95, Accessibility 100, Best Practices 100, SEO 100 on home and one page of each type
- [ ] LCP under 2.0 s, CLS under 0.05, INP under 200 ms in lab and field data after launch
- [ ] JavaScript under 60 KB per page. Text pages ship none
- [ ] Five font files at most (Plex Serif 400 and 500, Sans 400 and 600, Mono 500), two preloaded, no layout shift on swap
- [ ] Images responsive with explicit dimensions

## Design
- [ ] Design review checklist (`docs/06` section 10) passes on every page at 375, 768, 1280 and 1536 px
- [ ] No raw hex outside `tokens.css`
- [ ] The highlighter colour (`--pad`) appears only on marks and quote bars, never as a surface
- [ ] The page uses surfaces from the token set only (paper, mist, ink). No black
- [ ] IBM Plex is the only family. Mono appears only on literal record data (log entries, timestamps, file numbers, the clock, the form status line)
- [ ] No two adjacent sections share a layout
- [ ] No horizontal scroll at any width
- [ ] Printing the pricing page and a guide produces a clean, readable result

## Scroll and motion
- [ ] At each of the four step focus points on the home page the computed `--f1` to `--f4` are 1 for the active step and 0 for the others (1000 px and wider)
- [ ] Below 1000 px the sheet is not pinned and all parts are lit
- [ ] The sheet's paper stack and shadow stay inside the mist surface at the end of the story
- [ ] Every scroll effect except the load moment reverses when scrolling up
- [ ] Nothing animates `top`, `left`, `width`, `height` or `margin`. No scroll snap, no scroll hijack
- [ ] With JavaScript disabled the page is complete: finder panels visible, signature and marks drawn, form submits once
- [ ] On a 4x CPU throttled profile the scroll engine causes no long task above 50 ms and CLS is 0
- [ ] Header is solid at every scroll position, hides on scroll down, returns on scroll up, and never covers a focused element
- [ ] Motion audit table (`docs/14` B5) exists and every row proves a state or a relationship

## Security and privacy
- [ ] Security headers present (check with securityheaders.com or curl)
- [ ] CSP does not block the form, analytics or fonts and does not allow wildcard scripts
- [ ] No third-party requests other than the chosen analytics
- [ ] Analytics events carry no form content
- [ ] Privacy policy matches what the site actually collects
- [ ] Netlify form notification recipients are correct
- [ ] No secrets or personal data in the repository

## Launch
- [ ] DNS, HTTPS, `www` and `http` redirect to `https://servepointcanada.com`
- [ ] Search Console property verified, sitemap submitted
- [ ] Analytics receiving events from production
- [ ] Owner has the repository, Netlify and DNS access and a short guide to editing copy, pricing and guides
