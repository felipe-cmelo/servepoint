import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/** City pages (docs/04 section 7, docs/pages/coverage.md). A city is published only when it holds unique content. */
const coverage = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/coverage" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    tier: z.number().int().min(1).max(3),
    published: z.boolean().default(false),
    description: z.string().min(120).max(155),
    updated: z.coerce.date(),
    courts: z.array(z.object({ name: z.string(), address: z.string().optional(), note: z.string(), url: z.url() })),
    access: z.array(z.string()).min(2),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).min(3).max(5),
    nearby: z.array(z.string()).length(2),
    sources: z.array(z.object({ label: z.string(), url: z.url() })).min(1),
  }),
});

/** Guides (docs/03 section 6). They stay `draft` until the founder approves, and draft guides are not published. */
const guides = defineCollection({
  loader: glob({ pattern: "*.{md,mdx}", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    description: z.string().min(120).max(155),
    slug: z.string(),
    author: z.string().default("Jasmine Deo, LLB"),
    reviewed: z.coerce.date().nullable().default(null),
    status: z.enum(["draft", "published"]).default("draft"),
    related: z.array(z.string()).default([]),
    primaryKeyword: z.string(),
    service: z.enum(["process-serving", "court-filing", "corporate-search"]),
    sources: z.array(z.object({ label: z.string(), url: z.url() })).min(1),
  }),
});

export const collections = { coverage, guides };
