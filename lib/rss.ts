import type { PostMeta } from "@/lib/post-meta";

const SITE_URL = "https://danielastudillo.io";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateIso: string): string {
  return new Date(`${dateIso}T12:00:00.000Z`).toUTCString();
}

export function buildBlogRssFeed(posts: PostMeta[]): string {
  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = toRfc822(post.date);
      const description = escapeXml(post.description || post.excerpt);

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
    </item>`;
    })
    .join("\n");

  const lastBuild =
    posts.length > 0
      ? toRfc822(
          posts.reduce((latest, post) => {
            const modified = post.dateModified ?? post.date;
            return modified > latest ? modified : latest;
          }, posts[0].dateModified ?? posts[0].date),
        )
      : new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Daniel Astudillo — Writing</title>
    <link>${SITE_URL}/blog</link>
    <description>Notes on performance, distributed systems, and engineering trade-offs.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}
