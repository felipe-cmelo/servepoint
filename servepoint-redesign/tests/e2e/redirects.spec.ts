import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

// The nine redirects of docs/04 section 3 plus /thank-you/ (docs/07 section 6.1).
const expected: Record<string, string> = {
  "/services/": "/process-serving/",
  "/services/process-serving/": "/process-serving/",
  "/services/court-services/": "/court-filing/",
  "/services/corporate-search/": "/corporate-search/",
  "/areas/": "/coverage/",
  "/for-us-law-firms/": "/out-of-province-and-us/",
  "/contact/": "/request-service/",
  "/thank-you/": "/request-service/received/",
  "/index.html": "/",
};

test("netlify.toml holds every redirect as a 301", () => {
  const toml = readFileSync("netlify.toml", "utf8");
  const blocks = [...toml.matchAll(/\[\[redirects\]\]([\s\S]*?)(?=\n\[|$)/g)].map((m) => m[1]);
  const found = Object.fromEntries(
    blocks.map((b) => [b.match(/from = "([^"]+)"/)![1], { to: b.match(/to = "([^"]+)"/)![1], status: Number(b.match(/status = (\d+)/)![1]) }])
  );
  for (const [from, to] of Object.entries(expected)) expect(found[from], from).toEqual({ to, status: 301 });
  expect(Object.keys(found)).toHaveLength(Object.keys(expected).length);
});

// Netlify applies redirects, so the live check only runs against a deploy preview (BASE_URL).
test.describe("live redirects", () => {
  test.skip(!process.env.BASE_URL || /localhost|127.0.0.1/.test(process.env.BASE_URL), "Set BASE_URL to a Netlify deploy preview to test the redirects");
  for (const [from, to] of Object.entries(expected)) {
    test(`${from} to ${to}`, async ({ request }) => {
      const res = await request.get(from, { maxRedirects: 0 });
      expect(res.status()).toBe(301);
      expect(new URL(res.headers()["location"], "http://x").pathname).toBe(to);
    });
  }
});
