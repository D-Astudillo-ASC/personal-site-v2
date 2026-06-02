import { ReactNode } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import ArticleHeader from "@/components/blog/ArticleHeader";
import BlogDisclaimer from "@/components/blog/BlogDisclaimer";
import MobileTableOfContents from "@/components/blog/MobileTableOfContents";
import TableOfContents from "@/components/blog/TableOfContents";
import {
  extractHeadings,
  getAdjacentPosts,
  getPostMeta,
} from "@/lib/posts";
import { notFound } from "next/navigation";

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostMeta(slug);
  if (!post) notFound();

  const headings = extractHeadings(slug);
  const { newer, older } = await getAdjacentPosts(slug);
  const hasBothNeighbors = Boolean(newer && older);

  return (
    <PageShell maxWidth="6xl">
      <div className="blog-post-layout">
        <article className="min-w-0">
          <ArticleHeader post={post} />
          <MobileTableOfContents headings={headings} />
          <BlogDisclaimer />
          <div className="blog-prose max-w-none">{children}</div>
        </article>

        {headings.length >= 2 ? (
          <aside className="blog-toc-rail hidden lg:block">
            <TableOfContents headings={headings} />
          </aside>
        ) : null}
      </div>

      {(newer || older) && (
        <nav
          aria-label="More writing"
          className={`mt-20 overflow-hidden rounded-lg border border-border bg-border ${
            hasBothNeighbors ? "grid grid-cols-1 gap-px sm:grid-cols-2" : ""
          }`}
        >
          {older ? (
            <Link
              href={`/blog/${older.slug}`}
              className="group flex flex-col gap-2 bg-background p-6 transition-fast hover:bg-surface"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted/70">
                ← Older
              </span>
              <span className="font-display text-lg italic leading-snug text-text transition-fast group-hover:text-accent">
                {older.title}
              </span>
            </Link>
          ) : null}

          {newer ? (
            <Link
              href={`/blog/${newer.slug}`}
              className={`group flex flex-col gap-2 bg-background p-6 transition-fast hover:bg-surface ${
                hasBothNeighbors ? "items-start sm:items-end sm:text-right" : ""
              }`}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted/70">
                Newer →
              </span>
              <span className="font-display text-lg italic leading-snug text-text transition-fast group-hover:text-accent">
                {newer.title}
              </span>
            </Link>
          ) : null}
        </nav>
      )}

      <div className="mt-16 border-t border-border pt-8">
        <Link
          href="/blog"
          className="font-mono text-xs uppercase tracking-[0.14em] text-muted transition-fast hover:text-accent"
          aria-label="Back to writing"
        >
          ← Back to writing
        </Link>
      </div>
    </PageShell>
  );
}
