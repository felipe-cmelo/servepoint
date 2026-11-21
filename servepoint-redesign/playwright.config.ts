import { defineConfig, devices } from "@playwright/test";

// Tests run against the built site in dist/ served with `serve` (it compresses responses, like Netlify).
// Redirect tests and the headers check need Netlify itself: run them against a deploy preview with BASE_URL (docs/07 section 6.4).
const baseURL = process.env.BASE_URL ?? "http://localhost:4325";

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: process.env.BASE_URL
    ? undefined
    : { command: "npm run build && npx serve dist -l 4325", url: "http://localhost:4325/", reuseExistingServer: true, timeout: 120_000 },
});
