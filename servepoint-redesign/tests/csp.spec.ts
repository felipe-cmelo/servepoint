import { test, expect } from "@playwright/test";
import { readFileSync, existsSync } from "node:fs";
import { builtRoutes } from "./helpers";

// docs/07 section 6.4. Reads the policy that scripts/csp-headers.mjs wrote to dist/_headers, attaches it to every
// document response (a local server does not apply _headers), visits each built page, scrolls to the bottom and fails
// on any securitypolicyviolation event or console error that mentions the Content Security Policy.
// Phase 1 and 2 extend it: one page of each type, /request-service/ step 2, the document finder, the map, /404.html.

function policy(): string {
  if (!existsSync("dist/_headers")) throw new Error("dist/_headers not found. Run npm run build first.");
  const m = readFileSync("dist/_headers", "utf8").match(/Content-Security-Policy:\s*(.+)/);
  if (!m) throw new Error("No Content-Security-Policy in dist/_headers");
  return m[1].trim();
}

test("the generated policy has the required directives", () => {
  const csp = policy();
  for (const d of ["default-src 'self'", "style-src 'self'", "object-src 'none'", "frame-ancestors 'none'", "form-action 'self'", "base-uri 'self'"]) {
    expect(csp).toContain(d);
  }
  expect(csp).not.toMatch(/script-src[^;]*'unsafe-inline'/);
  expect(csp).not.toMatch(/style-src 'self'[^;]*'unsafe-inline'/);
});

// Vercel and any plain static host do not read dist/_headers, so every page also carries the policy in a meta element. It has
// the same directives, minus the three that only a header may carry, and the same script hashes (they come from one build step).
test("every page carries the same policy as a meta element, without the header-only directives", () => {
  const header = policy();
  const expected = header.split("; ").filter((d) => !/^(frame-ancestors|report-uri|sandbox)/.test(d)).join("; ");
  const files = [...builtRoutes("dist").map((r) => `dist${r}index.html`), "dist/404.html"];
  for (const file of files) {
    const html = readFileSync(file, "utf8");
    const m = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)">/);
    expect(m, `${file} has the meta policy`).not.toBeNull();
    expect(m![1], file).toBe(expected);
    expect(html.indexOf("Content-Security-Policy"), `${file}: the meta comes first in the head`).toBeLessThan(html.indexOf("<script"));
  }
  expect(expected).not.toContain("frame-ancestors");
});

// Until ALLOW_INDEXING is "true" at build time, no page may be indexable on any host.
test("without ALLOW_INDEXING every page says noindex in its robots meta element", () => {
  if (process.env.ALLOW_INDEXING === "true") return;
  for (const file of [...builtRoutes("dist").map((r) => `dist${r}index.html`), "dist/404.html"]) {
    expect(readFileSync(file, "utf8"), file).toContain('<meta name="robots" content="noindex,nofollow">');
  }
});

for (const route of builtRoutes("dist")) {
  test(`no CSP violations on ${route}`, async ({ page }) => {
    const csp = policy();
    const problems: string[] = [];
    await page.route("**/*", async (r) => {
      if (r.request().resourceType() !== "document") return r.continue();
      const res = await r.fetch();
      await r.fulfill({ response: res, headers: { ...res.headers(), "content-security-policy": csp } });
    });
    await page.addInitScript(() => {
      document.addEventListener("securitypolicyviolation", (e) => {
        (window as unknown as { __csp: string[] }).__csp ??= [];
        (window as unknown as { __csp: string[] }).__csp.push(`${e.violatedDirective} ${e.blockedURI}`);
      });
    });
    page.on("console", (m) => {
      if (m.type() === "error" && /content security policy/i.test(m.text())) problems.push(m.text());
    });
    await page.goto(route, { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(200);
    const events = await page.evaluate(() => (window as unknown as { __csp?: string[] }).__csp ?? []);
    expect([...problems, ...events]).toEqual([]);
  });
}
