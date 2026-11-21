import { test, expect } from "@playwright/test";

// Phase 0 smoke test: the empty shell builds and serves one page with one H1.
test("shell page loads with one H1 and the site language", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en-CA");
  await expect(page.locator("h1")).toHaveCount(1);
});
