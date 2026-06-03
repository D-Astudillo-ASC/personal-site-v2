import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";

export type { PostMeta, TocHeading } from "@/lib/post-meta";
export { getUniqueTags } from "@/lib/post-meta";

import type { PostMeta, TocHeading } from "@/lib/post-meta";
import {
  getSeriesForSlug,
  PILLAR_COVERS,
  START_HERE_SLUG_SET,
  START_HERE_SLUGS,
  type BlogSeries,
} from "@/constants/blog";

export { getSeriesForSlug, type BlogSeries };
export {
  BLOG_SERIES,
  START_HERE_SLUGS,
  seriesUsesCaseStudyDisclaimer,
} from "@/constants/blog";

const CONTENT_DIR = path.join(process.cwd(), "app", "blog", "content");

/**
 * List every blog post slug — a directory under app/blog/content that contains
 * a content.mdx. Named content.mdx (not page.mdx) on purpose: page.mdx would
 * register a duplicate /blog/content/<slug> route. Filesystem-driven: drop a
 * folder in, it shows up. Server-only.
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        fs.existsSync(path.join(CONTENT_DIR, entry.name, "content.mdx")),
    )
    .map((entry) => entry.name);
}

/**
 * Parse h2/h3 headings from raw MDX for TOC. Uses github-slugger to match
 * rehype-slug ids on the rendered page.
 */
export function extractHeadings(slug: string): TocHeading[] {
  try {
    const raw = fs.readFileSync(
      path.join(CONTENT_DIR, slug, "content.mdx"),
      "utf8",
    );
    const body = raw
      .replace(/export const metadata[\s\S]*?};/, "")
      .replace(/^import .*$/gm, "");

    const slugger = new GithubSlugger();
    const headings: TocHeading[] = [];
    let inFence = false;

    for (const line of body.split("\n")) {
      const trimmed = line.trim();
      if (trimmed.startsWith("```")) {
        inFence = !inFence;
        continue;
      }
      if (inFence) continue;

      const h2 = line.match(/^## (?!#)(.+)$/);
      const h3 = line.match(/^### (?!#)(.+)$/);

      if (h2) {
        const title = h2[1].trim();
        headings.push({ id: slugger.slug(title), title, level: 2 });
      } else if (h3) {
        const title = h3[1].trim();
        headings.push({ id: slugger.slug(title), title, level: 3 });
      }
    }

    return headings;
  } catch {
    return [];
  }
}

/** Rough reading time from the raw MDX source (excludes frontmatter/imports). */
function estimateReadingTime(slug: string): string {
  try {
    const raw = fs.readFileSync(
      path.join(CONTENT_DIR, slug, "content.mdx"),
      "utf8",
    );
    const body = raw
      .replace(/export const metadata[\s\S]*?};/, "")
      .replace(/^import .*$/gm, "");
    const words = body.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 220));
    return `${minutes} min read`;
  } catch {
    return "1 min read";
  }
}

/**
 * Read a single post's frontmatter (the `metadata` export inside page.mdx).
 * Returns null for posts missing a title or date so they never leak into lists.
 */
export async function getPostMeta(slug: string): Promise<PostMeta | null> {
  try {
    const mod = await import(`../app/blog/content/${slug}/content.mdx`);
    const m = (mod.metadata ?? {}) as Record<string, unknown>;
    const title = typeof m.title === "string" ? m.title : undefined;
    const date = typeof m.date === "string" ? m.date : undefined;
    if (!title || !date) return null;

    const description =
      (typeof m.description === "string" && m.description) ||
      (typeof m.excerpt === "string" && m.excerpt) ||
      "";

    const dateModified =
      typeof m.dateModified === "string" ? m.dateModified : date;

    const coverFromMeta = typeof m.cover === "string" ? m.cover : undefined;
    const pillarCover = PILLAR_COVERS[slug as keyof typeof PILLAR_COVERS];

    return {
      slug,
      title,
      date,
      dateModified,
      description,
      excerpt: (typeof m.excerpt === "string" && m.excerpt) || description,
      cover: coverFromMeta ?? pillarCover,
      tags: Array.isArray(m.tags) ? (m.tags as string[]) : [],
      readingTime: estimateReadingTime(slug),
      featured: START_HERE_SLUG_SET.has(slug),
    };
  } catch {
    return null;
  }
}

/** All publishable posts, newest first. */
export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(slugs.map(getPostMeta));
  return posts
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Pillar posts in editorial “Start here” order. */
export async function getStartHerePosts(): Promise<PostMeta[]> {
  const bySlug = new Map(
    (await getAllPosts()).map((post) => [post.slug, post] as const),
  );
  return START_HERE_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (post): post is PostMeta => post !== undefined,
  );
}

/**
 * Other posts in the same themed series (guide order), excluding the current slug.
 */
export async function getSeriesNeighbors(
  slug: string,
): Promise<{ series: BlogSeries; posts: PostMeta[] } | null> {
  const series = getSeriesForSlug(slug);
  if (!series) return null;

  const bySlug = new Map(
    (await getAllPosts()).map((post) => [post.slug, post] as const),
  );

  const posts = series.links
    .filter((link) => link.slug !== slug)
    .map((link) => bySlug.get(link.slug))
    .filter((post): post is PostMeta => post !== undefined);

  if (posts.length === 0) return null;
  return { series, posts };
}

/**
 * Neighbours of a post in reverse-chronological order. `newer` is the more
 * recent post, `older` the previous one — used for article-to-article nav.
 */
export async function getAdjacentPosts(slug: string): Promise<{
  newer: PostMeta | null;
  older: PostMeta | null;
}> {
  const posts = await getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { newer: null, older: null };
  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index < posts.length - 1 ? posts[index + 1] : null,
  };
}
