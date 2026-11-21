// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// Paths that must never appear in the sitemap (docs/08 section 2).
const noindexPrefixes = ["/dev/", "/request-service/received/", "/404"];

// The component gallery under /dev/ exists in the dev server only. It is deleted from the production build (docs/10 Phase 1).
const dropDevRoutes = {
  name: "drop-dev-routes",
  hooks: {
    "astro:build:done": async ({ dir }) => {
      await rm(fileURLToPath(new URL("dev/", dir)), { recursive: true, force: true });
    },
  },
};

export default defineConfig({
  site: "https://servepointcanada.com",
  output: "static",
  trailingSlash: "always",
  // "never": every stylesheet is a same-origin file, so the CSP needs no unsafe-inline for <style> (docs/07 section 3).
  build: { format: "directory", inlineStylesheets: "never" },
  integrations: [
    mdx(),
    dropDevRoutes,
    sitemap({
      filter: (page) => !noindexPrefixes.some((p) => new URL(page).pathname.startsWith(p)),
    }),
  ],
});
