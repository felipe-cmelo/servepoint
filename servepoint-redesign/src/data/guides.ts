import { getCollection } from "astro:content";

/**
 * Draft guides are written for the founder to review and are not published (docs/pages/guides.md). While ALLOW_INDEXING is
 * not "true" (local, staging, deploy previews) drafts are built, marked as drafts and kept noindex so they can be reviewed.
 * On the production site (ALLOW_INDEXING=true) only guides with status "published" are built or listed.
 */
export const showDrafts = process.env.ALLOW_INDEXING !== "true";

export async function visibleGuides() {
  const all = await getCollection("guides");
  return all
    .filter((g) => g.data.status === "published" || showDrafts)
    .sort((a, b) => a.data.title.localeCompare(b.data.title));
}

export const dateLabel = (d: Date | null) =>
  d ? d.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }) : null;
