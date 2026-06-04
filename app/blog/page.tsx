import { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import BlogIndexClient from "@/components/blog/BlogIndexClient";
import BlogIndexClientFallback from "@/components/blog/BlogIndexClientFallback";
import BlogReadingGuide from "@/components/blog/BlogReadingGuide";
import BlogStartHere from "@/components/blog/BlogStartHere";
import { EARLIER_WORK_SLUG_SET, START_HERE_SLUG_SET } from "@/constants/blog";
import { getAllPosts, getStartHerePosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Daniel Astudillo writes about performance engineering, distributed systems, and the trade-offs behind real production systems — query optimization, real-time pipelines, and CRDT sync.",
  alternates: {
    canonical: "https://danielastudillo.io/blog",
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: "Daniel Astudillo — Writing (RSS)" },
      ],
    },
  },
  openGraph: {
    title: "Writing — Daniel Astudillo",
    description:
      "Notes on performance, distributed systems, and the engineering trade-offs behind real production work.",
    url: "https://danielastudillo.io/blog",
  },
};

export default async function BlogIndex() {
  const [posts, startHerePosts] = await Promise.all([
    getAllPosts(),
    getStartHerePosts(),
  ]);
  const listPosts = posts.filter(
    (post) =>
      !START_HERE_SLUG_SET.has(post.slug) &&
      !EARLIER_WORK_SLUG_SET.has(post.slug),
  );

  return (
    <PageShell maxWidth="2xl">
      <PageHeader
        label="Writing"
        title="Notes & deep dives"
        description="What I'm building, what I'm learning, and the engineering trade-offs behind it — performance, distributed systems, and the parts of the job that don't fit in a commit message."
        className="mb-16"
      />

      {startHerePosts.length > 0 ? <BlogStartHere posts={startHerePosts} /> : null}

      {posts.length > 0 ? <BlogReadingGuide /> : null}

      <Suspense fallback={<BlogIndexClientFallback posts={listPosts} />}>
        <BlogIndexClient posts={posts} />
      </Suspense>
    </PageShell>
  );
}
