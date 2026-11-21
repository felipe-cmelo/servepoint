import { test, expect } from "@playwright/test";

// docs/15 section 8: everything works with script off except the palette, the finder, the map selection and the two-step form,
// which degrade to lists and a single-step form.

test.use({ javaScriptEnabled: false });

test("home: the sample sheet and its notes, every stage, every service panel and every community panel show", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#sheet-hero")).toBeVisible();
  await expect(page.locator(".hero .sheet-notes")).toBeVisible();
  await expect(page.locator(".hero .sheet-toggle")).toBeHidden();
  await expect(page.locator(".scene-tabs")).toBeHidden();
  await expect(page.locator(".stage")).toHaveCount(4);
  for (let i = 1; i <= 4; i++) await expect(page.locator(`[data-stage='${i}']`)).toBeVisible();
  for (const id of ["#sv-p0", "#sv-p1", "#sv-p2"]) await expect(page.locator(id)).toBeVisible();
  await expect(page.locator(".show-tabs")).toBeHidden();
  await expect(page.locator(".cpanel")).toHaveCount(15);
  await expect(page.locator(".cpanel").nth(14)).toBeVisible();
  await expect(page.locator(".search-btn")).toHaveCount(0);
  await expect(page.locator("#instruct button[type='submit']")).toBeVisible();
});

test("request page: one single-step form with every service section and a send button", async ({ page }) => {
  await page.goto("/request-service/");
  await expect(page.locator("#rf-send")).toBeVisible();
  await expect(page.locator("#rf-next")).toBeHidden();
  await expect(page.locator(".stepper")).toBeHidden();
  await expect(page.locator(".variant")).toHaveCount(4);
  for (const v of ["process-serving", "court-filing", "corporate-search", "not-sure"]) {
    await expect(page.locator(`.variant[data-v='${v}']`)).toBeVisible();
  }
});

test("the instruct band is a plain GET form that opens the request page pre-filled", async ({ page }) => {
  await page.goto("/pricing/");
  await page.locator("#instruct label[for='qs-s-corporate-search']").click();
  await page.locator("#instruct button[type='submit']").click();
  await expect(page).toHaveURL(/\/request-service\/\?service=corporate-search&urgency=standard$/);
});
