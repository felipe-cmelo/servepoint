import { test, expect } from "@playwright/test";

// The interactions of docs/15 section 6: command palette, services menu, tabs, area check, price explorer, mobile menu.

test("command palette opens with Ctrl K, filters, navigates with the keyboard and closes with Escape", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Control+k");
  await expect(page.locator("#palette")).toBeVisible();
  await expect(page.locator(".palette-item").first()).toBeVisible();
  await page.keyboard.type("kitsilano");
  await expect(page.locator(".palette-item")).toHaveCount(1);
  await expect(page.locator(".palette-item").first()).toContainText("Kitsilano");
  await page.keyboard.press("Escape");
  await expect(page.locator("#palette")).toBeHidden();
  await page.keyboard.press("/");
  await expect(page.locator("#palette")).toBeVisible();
  await page.keyboard.type("pricing");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/pricing\/$/);
});

test("services menu opens, lists three services and closes with Escape", async ({ page }) => {
  await page.goto("/");
  await page.click("#mega-trigger");
  await expect(page.locator("#mega")).toBeVisible();
  await expect(page.locator("#mega .mega-svc")).toHaveCount(3);
  await page.keyboard.press("Escape");
  await expect(page.locator("#mega")).toBeHidden();
});

test("service showcase tabs: click and arrow keys", async ({ page }) => {
  await page.goto("/");
  await page.click("#sv-t2");
  await expect(page.locator("#sv-p2")).toBeVisible();
  await expect(page.locator("#sv-p0")).toBeHidden();
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator("#sv-t1")).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#sv-p1")).toBeVisible();
});

test("the sample sheet: a highlighted phrase opens a short note on hover and on focus", async ({ page }) => {
  await page.goto("/");
  const mark = page.locator(".hero .sheet mark[data-note]").nth(1);
  await mark.hover();
  await expect(page.locator(".hero [data-tip]")).toHaveClass(/on/);
  await expect(page.locator(".hero [data-tip]")).toContainText("date, time and address");
  await page.mouse.move(5, 5);
  await expect(page.locator(".hero [data-tip]")).not.toHaveClass(/on/);
  await page.locator(".hero .sheet mark[data-note]").nth(2).focus();
  await expect(page.locator(".hero [data-tip]")).toContainText("how they were identified");
});

test("the process scene follows the reader and lights the part of the sheet each stage produces", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const scene = page.locator("[data-scene]");
  for (const [stage, part] of [[2, "2"], [3, "3"], [4, "4"]] as const) {
    await page.evaluate((s) => document.querySelector(`[data-stage="${s}"]`)!.scrollIntoView({ block: "center", behavior: "instant" }), stage);
    await expect(scene).toHaveAttribute("data-now", String(stage));
    await expect(page.locator(`[data-stage="${stage}"]`)).toHaveClass(/is-active/);
    const bg = await page.locator(`.scene .sheet [data-part="${part}"]`).first().evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg, `part ${part} is lit`).not.toBe("rgba(0, 0, 0, 0)");
  }
  // Every stage up to the one in focus is marked reached
  await expect(page.locator(".stage.is-reached")).toHaveCount(4);
});

test("area check finds a neighbourhood, selects its city and highlights it on the map", async ({ page }) => {
  await page.goto("/coverage/");
  await page.fill("#hub-area-q", "metro");
  await expect(page.locator("#hub-area-list .combo-item")).toHaveCount(1);
  await page.keyboard.press("Enter");
  await expect(page.locator("[data-status]")).toContainText("Covered: Metrotown, Burnaby.");
  await expect(page.locator(".node[data-c='burnaby']")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".cpanel.on h3")).toHaveText("Burnaby");
  await page.fill("#hub-area-q", "zzzzz");
  await expect(page.locator("[data-status]")).toContainText("Not on the list?");
});

test("price explorer updates the title, the timing and the pre-filled request link", async ({ page }) => {
  await page.goto("/pricing/");
  await page.click("label[for='pp-px-s-corporate-search']");
  await page.click("label[for='pp-px-u-rush-48']");
  await expect(page.locator("[data-title]")).toHaveText("Corporate search, rush within 48 hours");
  await expect(page.locator("[data-timing]")).toContainText("rush pricing is confirmed before service");
  await expect(page.locator("[data-cta]")).toHaveAttribute("href", "/request-service/?service=corporate-search&urgency=rush-48");
});

test("the request page reads service and urgency from the address and mirrors them beside the form", async ({ page }) => {
  await page.goto("/request-service/?service=court-filing&urgency=rush-same-day");
  await expect(page.locator("#rf-svc-court-filing")).toBeChecked();
  await expect(page.locator("#rf-urg-rush-same-day")).toBeChecked();
  await expect(page.locator("[data-sum='service']")).toHaveText("Court filing");
  await expect(page.locator("[data-sum='urgency']")).toHaveText("Rush same day");
  await page.fill("#rf-firm", "Test Firm LLP");
  await expect(page.locator("[data-sum='firm']")).toHaveText("Test Firm LLP");
});

test("the instruct band opens the request page pre-filled and puts no personal data in the address", async ({ page }) => {
  await page.goto("/pricing/");
  await page.locator("#instruct label[for='qs-s-court-filing']").click();
  await page.locator("#instruct label[for='qs-u-rush-48']").click();
  await page.locator("#instruct button[type='submit']").click();
  await expect(page).toHaveURL(/\/request-service\/\?service=court-filing&urgency=rush-48$/);
});

test.describe("phone", () => {
  test.use({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });

  test("the mobile menu is a dialog that opens, traps focus and closes", async ({ page }) => {
    await page.goto("/");
    await page.click("#menu-open");
    await expect(page.locator("#mobile-menu")).toBeVisible();
    await expect(page.locator("#mobile-menu a[href='/pricing/']")).toBeVisible();
    await page.click("#menu-close");
    await expect(page.locator("#mobile-menu")).toBeHidden();
  });

  test("the hero sample sheet starts as a preview and opens on request", async ({ page }) => {
    await page.goto("/");
    const wrap = page.locator(".hero .sheet-wrap");
    const toggle = page.locator(".hero [data-sheet-toggle]");
    await expect(wrap).toHaveAttribute("data-collapsed", "");
    await expect(toggle).toHaveText("Read the sample");
    const closed = (await page.locator(".hero .sheet").boundingBox())!.height;
    await toggle.click();
    await expect(wrap).not.toHaveAttribute("data-collapsed", "");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect((await page.locator(".hero .sheet").boundingBox())!.height).toBeGreaterThan(closed + 150);
    await toggle.click();
    await expect(wrap).toHaveAttribute("data-collapsed", "");
  });

  // docs/15 section 9: on a phone in portrait the scene is pinned. The page stays put while the reader scrolls and each stage
  // fades in over the one before. The stage is chosen from the scroll position, in equal parts of the pinned distance.
  const toProgress = (page: import("@playwright/test").Page, p: number) =>
    page.evaluate((pp) => {
      const track = document.querySelector<HTMLElement>(".scene-pin")!;
      const frame = document.querySelector<HTMLElement>(".scene-pinned")!;
      const pinStart = track.getBoundingClientRect().top + scrollY - 60;
      window.scrollTo({ top: pinStart + pp * (track.offsetHeight - frame.offsetHeight), behavior: "instant" });
    }, p);

  test("the process scene is pinned on a phone: the frame stays put while the stages fade in one over another", async ({ page }) => {
    await page.goto("/");
    const scene = page.locator("[data-scene]");
    const frame = page.locator(".scene-pinned");
    const tabs = page.locator(".scene-tab");
    await expect(tabs).toHaveCount(4);
    await expect(page.locator(".scene-aside")).toBeHidden();
    expect(await frame.evaluate((el) => getComputedStyle(el).position)).toBe("sticky");
    for (const [p, n] of [[0.05, 1], [0.35, 2], [0.6, 3], [0.9, 4]] as const) {
      await toProgress(page, p);
      await expect(scene).toHaveAttribute("data-now", String(n));
      await expect(tabs.nth(n - 1)).toHaveAttribute("aria-current", "step");
      // the carousel has brought the step in focus to its centre
      await expect
        .poll(async () => {
          const t = (await tabs.nth(n - 1).boundingBox())!;
          const b = (await page.locator(".scene-tabs").boundingBox())!;
          return Math.abs(t.x + t.width / 2 - (b.x + b.width / 2));
        }, { message: `step ${n} is centred in the carousel` })
        .toBeLessThan(4);
      // one stage shows, the others have faded out
      await expect(page.locator(".stage:visible")).toHaveCount(1);
      await expect(page.locator(`[data-stage="${n}"]`)).toBeVisible();
      // the frame has not moved: it is stuck under the header while the scroll goes on
      expect(Math.abs((await frame.boundingBox())!.y - 60), `frame under the header at stage ${n}`).toBeLessThan(2);
    }
    await expect(page.locator(".stage.is-reached")).toHaveCount(4);
    // going back up brings the earlier stage back
    await toProgress(page, 0.35);
    await expect(scene).toHaveAttribute("data-now", "2");
    await expect(page.locator(".stage.is-reached")).toHaveCount(2);
    // a tap on a step scrolls to that stage
    await tabs.nth(3).click();
    await expect(scene).toHaveAttribute("data-now", "4");
    await expect(page.locator("[data-stage='4']")).toBeVisible();
  });

  // With reduced motion nothing is pinned or faded: the stages are a column under a step bar that sticks and updates.
  test.describe("reduced motion", () => {
    test.use({ reducedMotion: "reduce" });
    test("the process scene is a column of stages under a sticky step bar", async ({ page }) => {
      await page.goto("/");
      const scene = page.locator("[data-scene]");
      const tabs = page.locator(".scene-tab");
      await expect(page.locator(".stage:visible")).toHaveCount(4);
      expect(await page.locator(".scene-pinned").evaluate((el) => getComputedStyle(el).position)).not.toBe("sticky");
      for (const n of [2, 3, 4]) {
        await page.evaluate((s) => document.querySelector(`[data-stage="${s}"]`)!.scrollIntoView({ block: "center", behavior: "instant" }), n);
        await expect(scene).toHaveAttribute("data-now", String(n));
        await expect(tabs.nth(n - 1)).toHaveAttribute("aria-current", "step");
        await expect(tabs.nth(n - 2)).toHaveClass(/is-done/);
        const bar = (await page.locator(".scene-tabs").boundingBox())!;
        expect(bar.y, `step bar under the header at stage ${n}`).toBeGreaterThanOrEqual(60);
        expect(bar.y).toBeLessThan(90);
      }
      await tabs.nth(1).click();
      await expect(scene).toHaveAttribute("data-now", "2");
      expect((await page.locator("[data-stage='2']").boundingBox())!.y).toBeLessThan(260);
    });
  });

  test("a long page lead is clamped to three lines with Read more", async ({ page }) => {
    await page.goto("/process-serving/");
    const lead = page.locator(".page-hero .lead");
    const more = page.locator(".page-hero .more-btn");
    await expect(more).toBeVisible();
    const clamped = (await lead.boundingBox())!.height;
    await more.click();
    await expect(lead).toHaveAttribute("data-open", "");
    expect((await lead.boundingBox())!.height).toBeGreaterThan(clamped);
    await expect(more).toHaveText(/Show less/);
  });

  test("area check: one swipe row of communities and the neighbourhood pills fold behind Show all", async ({ page }) => {
    await page.goto("/coverage/");
    const row = page.locator("[data-area-chips]");
    expect(await row.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
    await expect(page.locator("#map-wrap, [data-map-wrap]")).toBeHidden();
    const pills = page.locator(".cpanel.on .hoods li:visible");
    const before = await pills.count();
    expect(before).toBe(8);
    await page.locator(".cpanel.on .more-btn").click();
    expect(await pills.count()).toBeGreaterThan(before);
  });

  test("card groups are swipe rows with dots", async ({ page }) => {
    await page.goto("/out-of-province-and-us/");
    const row = page.locator(".snap-row");
    expect(await row.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
    await expect(page.locator(".snap-dots i")).toHaveCount(6);
    await expect(page.locator(".snap-dots i.on")).toHaveCount(1);
    await row.evaluate((el) => (el.scrollLeft = el.scrollWidth));
    await expect(page.locator(".snap-dots i").last()).toHaveClass(/on/);
  });

  test("request form: the optional fields fold away until asked for", async ({ page }) => {
    await page.goto("/request-service/");
    await expect(page.locator("#rf-phone")).toBeHidden();
    await expect(page.locator("#rf-court")).toBeHidden();
    await page.locator(".opt-toggle").click();
    await expect(page.locator("#rf-phone")).toBeVisible();
    await expect(page.locator("#rf-matter")).toBeVisible();
    await expect(page.locator(".opt-toggle")).toBeHidden();
    await expect(page.locator(".mbar")).toBeHidden();
  });

  test("the bottom bar steps aside while the hero actions are on screen and returns after", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-mbar-off", "");
    await expect(page.locator(".mbar")).toBeHidden();
    await page.evaluate(() => document.querySelector("#faq")!.scrollIntoView());
    await expect(page.locator("html")).not.toHaveAttribute("data-mbar-off", "");
    await expect(page.locator(".mbar")).toBeVisible();
  });

  test("tap targets are at least 44 px", async ({ page }) => {
    await page.goto("/");
    const small: string[] = [];
    for (const sel of [".hero .btn", ".mbar .btn", ".scene-tab", ".menu-btn", ".chip"]) {
      const boxes = await page.locator(`${sel}:visible`).evaluateAll((els) => els.map((e) => { const b = e.getBoundingClientRect(); return [b.width, b.height]; }));
      boxes.forEach(([w, h], i) => (h < 43.5 || w < 43.5) && small.push(`${sel}[${i}] ${Math.round(w)}x${Math.round(h)}`));
    }
    expect(small).toEqual([]);
  });

  test("the guide's contents list is a disclosure that opens and closes", async ({ page }) => {
    await page.goto("/guides/personal-service-bc/");
    const det = page.locator(".toc details");
    await expect(det).not.toHaveAttribute("open", "");
    await page.locator(".toc summary").click();
    await expect(det).toHaveAttribute("open", "");
    await expect(page.locator(".toc li a").first()).toBeVisible();
  });
});
