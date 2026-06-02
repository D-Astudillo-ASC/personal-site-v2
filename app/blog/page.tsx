import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/utils/date";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Daniel Astudillo writes about performance engineering, distributed systems, and the trade-offs behind real production systems — query optimization, real-time pipelines, and CRDT sync.",
  alternates: {
    canonical: "https://danielastudillo.io/blog",
  },
  openGraph: {
    title: "Writing — Daniel Astudillo",
    description:
      "Notes on performance, distributed systems, and the engineering trade-offs behind real production work.",
    url: "https://danielastudillo.io/blog",
  },
};

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <PageShell maxWidth="2xl">
      <PageHeader
        label="Writing"
        title="Notes & deep dives"
        description="What I'm building, what I'm learning, and the engineering trade-offs behind it — performance, distributed systems, and the parts of the job that don't fit in a commit message."
        className="mb-16"
      />

      {posts.length === 0 ? (
        <p className="font-mono text-sm text-muted">
          First post landing soon.
        </p>
      ) : (
        <div className="divide-y divide-border border-y border-border">
          {posts.map((post) => (
            <article key={post.slug} className="group py-8">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  <time dateTime={post.date}>
                    {formatDate(new Date(post.date))}
                  </time>
                  <span className="text-muted/40">/</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="mt-3 text-2xl font-medium text-text transition-fast group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-text/5 px-2 py-0.5 font-mono text-[11px] text-muted/80 ring-1 ring-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </article>
          ))}
        </div>
      )}
    </PageShell>
  );
}
