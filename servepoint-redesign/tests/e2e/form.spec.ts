import { test, expect } from "@playwright/test";

// Request form (docs/05 section 4, docs/07 section 5): two steps, validation, summary, click-to-call.
// The final POST is not sent: Netlify Forms answers only on a Netlify deploy (docs/07 section 5.3).

test("form: validation, two steps and a summary", async ({ page }) => {
  await page.goto("/request-service/");
  await expect(page.locator("#rf-status")).toHaveText("Step 1 of 2: The file");

  await page.click("#rf-next");
  await expect(page.locator("#rf-errors")).toBeVisible();
  await expect(page.locator("#rf-errors li")).toHaveCount(3);

  await page.fill("#rf-firm", "Test Firm LLP");
  await page.fill("#rf-name", "A Tester");
  await page.fill("#rf-email", "maya@firm");
  await page.click("#rf-next");
  await expect(page.locator("#rf-email-err")).toHaveText("Enter an email address we can reply to, like name@firm.ca.");

  await page.fill("#rf-email", "a@firm.ca");
  await page.click("#rf-next");
  await expect(page.locator("#rf-status")).toHaveText("Step 2 of 2: The person and the place");

  await page.click("#rf-review");
  await expect(page.locator("#rf-errors")).toBeVisible();
  await page.fill("#rf-recipient", "Person B");
  await page.fill("#rf-address", "1 Example Street, Unit 2");
  await page.fill("#rf-deadline", "2020-01-01");
  await page.click("#rf-review");
  await expect(page.locator("#rf-deadline-err")).toHaveText("Enter a date that is today or later.");
  await page.fill("#rf-deadline", "");
  await page.click("#rf-review");

  await expect(page.locator("#rf-status")).toHaveText("Review: Check your request");
  await expect(page.locator("#rf-summary dd", { hasText: "Person B" })).toBeVisible();
  await expect(page.locator("#rf-send")).toBeVisible();
});

test("form: the service variant follows the choice and hidden fields are disabled", async ({ page }) => {
  await page.goto("/request-service/?service=corporate-search&city=burnaby");
  await expect(page.locator("#rf-svc-corporate-search")).toBeChecked();
  await page.fill("#rf-firm", "Test Firm LLP");
  await page.fill("#rf-name", "A Tester");
  await page.fill("#rf-email", "a@firm.ca");
  await page.click("#rf-next");
  await expect(page.locator(".variant.on")).toHaveAttribute("data-v", "corporate-search");
  await expect(page.locator("#rf-recipient")).toBeDisabled();
  await expect(page.locator("#rf-scomp")).toBeEnabled();
});

test("click-to-call and email links use the site facts", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("header .phone-link").first()).toBeVisible();
  await expect(page.locator("footer a[href^='mailto:']").first()).toBeVisible();
});
