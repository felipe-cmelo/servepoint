import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { builtRoutes } from "./helpers";

// axe-core, WCAG 2.2 AA tags, on every built page. Phase 1 adds the 404, the received page,
// the form in both steps and the map panel open (docs/07 section 8).
const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

for (const route of builtRoutes("dist", ["/dev/"])) {
  test(`axe: ${route}`, async ({ page }) => {
    await page.goto(route);
    // Contrast is judged on the finished page, not on a block that is halfway through its entrance fade. Endless loops (the scroll hint) are skipped.
    await page.evaluate(() => Promise.all(document.getAnimations().filter((a) => a.effect?.getComputedTiming().iterations !== Infinity).map((a) => a.finished.catch(() => undefined))));
    const { violations } = await new AxeBuilder({ page }).withTags(tags).analyze();
    expect(violations, violations.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
  });
}

// The same check on a phone, where the swipe rows, the stepper, the folded footer and the bottom bar are in play.
test.describe("phone", () => {
  test.use({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });
  for (const route of ["/", "/process-serving/", "/out-of-province-and-us/", "/coverage/", "/request-service/", "/guides/personal-service-bc/"]) {
    test(`axe on a phone: ${route}`, async ({ page }) => {
      await page.goto(route);
      await page.evaluate(() => Promise.all(document.getAnimations().filter((a) => a.effect?.getComputedTiming().iterations !== Infinity).map((a) => a.finished.catch(() => undefined))));
      const { violations } = await new AxeBuilder({ page }).withTags(tags).analyze();
      expect(violations, violations.map((v) => `${v.id}: ${v.help} ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`).join("\n")).toEqual([]);
    });
  }
});
