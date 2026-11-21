# Logo colour analysis (docs/12 question 16)

Source files: `assets/logo.png`, `assets/logo-reversed.png`, `assets/favicon.png`, downloaded from the staging site on 2026-11-20. They are PNGs, not vector, so the values below come from pixels. For each file the most common exact colour among fully opaque pixels was taken, in two bands (navy: hue 200 to 245, lightness under 30 percent. Teal: hue 170 to 205). Anti-aliased edge pixels do not change the result because the solid fills dominate (for example 10,514 of 23,301 opaque pixels in `logo.png` are exactly `#002049`).

| Role | Value | HSL | Pixels |
|---|---|---|---|
| Logo navy (S, "SERVE", "PROCESS SERVING") | `#002049` | hue 213.7, sat 100, light 14 | 10,514 in `logo.png`, 1,049 in `favicon.png` |
| Logo teal (pin tail, "POINT", rules) | `#01A4B7` | hue 186.3, sat 99, light 36 | 6,040 in `logo.png`, 281 in `favicon.png` |
| Reversed logo teal | `#2DC8DA` | hue 186.2, sat 70, light 52 | 5,998 in `logo-reversed.png` |
| Reversed logo text | `#FFFFFF` | | 13,543 in `logo-reversed.png` |

The same navy and teal are the old site's own CSS values (`--navy: #002049`, `--teal: #01A4B7`, `--teal-bright: #2DC8DA`), so the logo and the old interface used one palette.

## Contrast (WCAG ratios, calculated)

| Colour | on `--paper` #FFFFFF | on `--mist` #EAEFF6 | on `--ink` #0A1E45 |
|---|---|---|---|
| Logo navy `#002049` | 16.12 | 13.95 | 1.01 |
| Logo teal `#01A4B7` | 3.00 | 2.60 | 5.45 |
| Reversed teal `#2DC8DA` | 2.02 | 1.75 | 8.09 |
| For reference: `--ink` `#0A1E45` | 16.35 | 14.15 | 1.00 |
| For reference: `--pen` `#2340B3` | 8.55 | 7.40 | 1.91 |
| For reference: `--served` `#0E7C66` | 5.13 | 4.44 | 3.19 |

Logos are exempt from the WCAG text contrast rule, so the teal on `--paper` and `--mist` is acceptable inside the logo image. It would fail as text (needs 4.5) or as a control boundary (needs 3 on `--paper` only, and it is 3.00 there, 2.60 on `--mist`).

## Hue difference

- Logo navy hue 213.7 against `--ink` hue 219.7: **6.0 degrees**.
- docs/06 section 4 says to shift the hue of `--ink` and `--ink-2` only if the logo navy is more than about 10 degrees away. **6.0 is under 10, so the rule does not call for a shift.**
- Logo teal hue 186.3 against `--served` hue 168.0: 18.3 degrees. They are close enough to read as one family, which is the reason docs/06 gives for not using teal as an action colour.

## Does docs/06 section 4 say to shift `--ink`? No.

It says to keep `--ink` and `--pen`, show the logo in its own colours on `--paper` and `--mist` (and the reversed logo on `--ink`), and add only `--pen-teal: #0F766E` if the owner asks for teal in the interface. Checked: `#0F766E` with white text is 5.47:1, its hover `#0B5C56` is 7.84:1, and teal link text `#0B6B66` is 6.35:1 on paper and 5.49:1 on mist, matching the document.

## Proposal (nothing changed, waiting for you)

1. **Keep `design/tokens.css` and `src/styles/tokens.css` exactly as they are.** Navy is 6 degrees from `--ink` and teal stays out of the interface.
2. Use `logo.png` on `--paper` and `--mist` and `logo-reversed.png` on `--ink`, as docs/13 already says.
3. Ask the owner for the SVG (docs/12 question 3). If it carries the same two values, close question 16 as "keep `--pen`". If the SVG differs from `#002049` or `#01A4B7`, repeat the hue check.
4. Only if the owner wants teal buttons: add the single `--pen-teal` token above, with a recorded note in docs/12 question 16.
