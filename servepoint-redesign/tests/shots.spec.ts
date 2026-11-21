import { test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { builtRoutes } from "./helpers";

// Full-page screenshots of every built page at 375, 768, 1280 and 1536 px into .shots/.
// Phase 1 extends this to the scroll positions in docs/14 Part C.
const widths = [375, 768, 1280, 1536];
// Reduced motion shows every page in its finished state, so a full-page capture is complete.
test.use({ reducedMotion: "reduce" });
mkdirSync(".shots", { recursive: true });

for (const route of builtRoutes("dist")) {
  for (const width of widths) {
    test(`shot: ${route} at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route, { waitUntil: "networkidle" });
      const name = (route === "/" ? "home" : route.replace(/^\/|\/$/g, "").replace(/\//g, "_")) + `-${width}.png`;
      await page.screenshot({ path: `.shots/${name}`, fullPage: true });
    });
  }
}
