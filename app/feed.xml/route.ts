import { getAllPosts } from "@/lib/posts";
import { buildBlogRssFeed } from "@/lib/rss";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts();
  const body = buildBlogRssFeed(posts);

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
