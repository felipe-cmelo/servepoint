import { test, expect } from "@playwright/test";

// docs/15 section 8: the type scale stays restrained, nothing is wider than the viewport, and the sticky record panel fits
// short laptop screens. These are the failures the v3 build had (H1 92 px, a 632 px panel on a 650 px screen).

const viewports = [
  [1920, 1080], [1536, 864], [1440, 900], [1366, 768], [1280, 650], [1024, 700], [768, 1024], [414, 896], [375, 667], [320, 640],
] as const;
const routes = ["/", "/process-serving/", "/court-filing/", "/corporate-search/", "/pricing/", "/coverage/", "/coverage/vancouver/", "/request-service/", "/out-of-province-and-us/", "/about/", "/guides/", "/privacy/"];

for (const [w, h] of viewports) {
  test.describe(`${w}x${h}`, () => {
    test.use({ viewport: { width: w, height: h }, reducedMotion: "reduce" });

    test("no horizontal overflow and a restrained type scale", async ({ page }) => {
      const failures: string[] = [];
      for (const route of routes) {
        await page.goto(route, { waitUntil: "load" });
        const r = await page.evaluate(() => {
          const px = (el: Element | null) => (el ? parseFloat(getComputedStyle(el).fontSize) : 0);
          const wide = Array.from(document.querySelectorAll<HTMLElement>("body *"))
            .filter((e) => {
              const b = e.getBoundingClientRect();
              const cs = getComputedStyle(e);
              return b.width > 0 && b.right > innerWidth + 1 && cs.position !== "fixed" && !e.closest("svg, .sr-only, dialog, [popover], .tip, .combo-list, .seg, .subnav-in, .show-tabs");
            })
            .slice(0, 2)
            .map((e) => `${e.tagName}.${(e.className as string).toString().slice(0, 40)}`);
          return {
            over: document.documentElement.scrollWidth > innerWidth + 1,
            wide,
            h1: px(document.querySelector("h1")),
            h2: Math.max(0, ...Array.from(document.querySelectorAll("main h2")).map(px)),
            body: px(document.body),
          };
        });
        if (r.over) failures.push(`${route}: horizontal overflow ${JSON.stringify(r.wide)}`);
        if (r.h1 > 52.5) failures.push(`${route}: H1 is ${r.h1}px`);
        if (r.h2 > 36.5) failures.push(`${route}: an H2 is ${r.h2}px`);
        if (r.body !== 16) failures.push(`${route}: body is ${r.body}px`);
      }
      expect(failures).toEqual([]);
    });
  });
}

test.describe("short laptop screen, 1280x650", () => {
  test.use({ viewport: { width: 1280, height: 650 } });

  test("the home hero shows the H1 and the primary action without scrolling", async ({ page }) => {
    await page.goto("/");
    const cta = await page.locator(".hero-cta .btn").first().boundingBox();
    expect(cta!.y + cta!.height).toBeLessThanOrEqual(650);
    const h1 = await page.locator("h1").boundingBox();
    expect(h1!.y).toBeGreaterThanOrEqual(60);
  });

  test("the pinned sample sheet fits inside the viewport at every stage", async ({ page }) => {
    await page.goto("/");
    for (const stage of [1, 2, 3, 4]) {
      // Instant scrolling: the page scrolls smoothly by default and a measurement mid-scroll means nothing.
      await page.evaluate((s) => {
        const el = document.querySelector(`[data-stage="${s}"]`)!;
        el.scrollIntoView({ block: s === 1 ? "start" : "center", behavior: "instant" });
        if (s === 1) window.scrollBy({ top: 70, behavior: "instant" }); // far enough for the sheet to be pinned
      }, stage);
      await page.waitForTimeout(250);
      const b = await page.locator(".scene .sheet-stack").boundingBox();
      expect(b!.y, `stage ${stage} top`).toBeGreaterThanOrEqual(60);
      expect(b!.y + b!.height + 16, `stage ${stage} bottom (with the stack beneath)`).toBeLessThanOrEqual(650);
    }
  });

  test("the hero sample sheet starts on the first screen", async ({ page }) => {
    await page.goto("/");
    const b = await page.locator(".hero .sheet").boundingBox();
    expect(b!.y).toBeLessThan(200);
    expect(b!.y + b!.height).toBeLessThanOrEqual(650);
  });
});

// docs/15 section 9: a phone gets a short first screen with the promise, both actions and the start of the sample sheet.
test.describe("phone first screen, 390x844", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: "reduce" });

  test("the home hero shows the H1, both actions and the start of the sample sheet", async ({ page }) => {
    await page.goto("/");
    const h1 = (await page.locator("h1").boundingBox())!;
    const cta = (await page.locator(".hero-cta .btn").last().boundingBox())!;
    const sheet = (await page.locator(".hero .sheet").boundingBox())!;
    expect(h1.y).toBeGreaterThanOrEqual(60);
    expect(cta.y + cta.height).toBeLessThan(844);
    expect(sheet.y).toBeLessThan(844);
  });
});

// docs/15 section 9: the pinned scene must fit its frame on the small phones too. The frame is the window height minus the header,
// and the tallest stage plus the step bar has to sit inside it.
for (const [w, h] of [[360, 640], [375, 667], [390, 844], [414, 896]] as const) {
  test.describe(`phone ${w}x${h}`, () => {
    test.use({ viewport: { width: w, height: h }, hasTouch: true, isMobile: true });

    test("every stage of the pinned scene fits inside the frame", async ({ page }) => {
      await page.goto("/");
      for (const [p, n] of [[0.05, 1], [0.35, 2], [0.6, 3], [0.9, 4]] as const) {
        await page.evaluate((pp) => {
          const track = document.querySelector<HTMLElement>(".scene-pin")!;
          const frame = document.querySelector<HTMLElement>(".scene-pinned")!;
          window.scrollTo({ top: track.getBoundingClientRect().top + scrollY - 60 + pp * (track.offsetHeight - frame.offsetHeight), behavior: "instant" });
        }, p);
        await expect(page.locator("[data-scene]")).toHaveAttribute("data-now", String(n));
        await page.waitForTimeout(900);
        const f = (await page.locator(".scene-pinned").boundingBox())!;
        const bar = (await page.locator(".scene-tabs").boundingBox())!;
        const s = (await page.locator(".stage.is-active").boundingBox())!;
        expect(s.y, `stage ${n} starts under the step bar`).toBeGreaterThanOrEqual(bar.y + bar.height - 1);
        expect(s.y + s.height, `stage ${n} ends inside the frame`).toBeLessThanOrEqual(f.y + f.height + 1);
        // The card is stretched to the frame, so also check the content inside it: the lowest element ends above the card's edge.
        const room = await page.locator(".stage.is-active").evaluate((card) => {
          let lowest = 0;
          card.querySelectorAll<HTMLElement>(".stage-body *").forEach((e) => {
            const r = e.getBoundingClientRect();
            if (r.height > 0 && getComputedStyle(e).display !== "none") lowest = Math.max(lowest, r.bottom);
          });
          return card.getBoundingClientRect().bottom - lowest;
        });
        expect(room, `stage ${n} content ends inside its card`).toBeGreaterThanOrEqual(6);
      }
    });
  });
}

// A real phone widens the layout viewport to fit overflowing content and then shows the page zoomed out. A desktop window
// does not, so this runs with mobile emulation: the layout viewport must stay as wide as the screen on every page.
for (const w of [320, 375, 414]) {
  test.describe(`phone ${w}, the page is not wider than the screen`, () => {
    test.use({ viewport: { width: w, height: 800 }, hasTouch: true, isMobile: true });
    test("every page keeps the layout viewport at the screen width", async ({ page }) => {
      const failures: string[] = [];
      for (const route of routes) {
        await page.goto(route, { waitUntil: "load" });
        await page.waitForTimeout(300);
        const r = await page.evaluate(() => ({ inner: innerWidth, scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
        if (r.inner !== w || r.scroll > w + 1) failures.push(`${route}: layout viewport ${r.inner}, scroll width ${r.scroll}`);
      }
      expect(failures).toEqual([]);
    });
  });
}
