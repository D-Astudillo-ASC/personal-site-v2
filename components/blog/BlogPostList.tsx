import Link from "next/link";
import type { PostMeta } from "@/lib/post-meta";
import { formatDate } from "@/utils/date";

interface BlogPostListProps {
  posts: PostMeta[];
  /** When false, titles are plain text (SSR fallback before search hydrates). */
  linked?: boolean;
}

export default function BlogPostList({ posts, linked = true }: BlogPostListProps) {
  if (posts.length === 0) return null;

  return (
    <div className="divide-y divide-border border-y border-border">
      {posts.map((post) => (
        <article key={post.slug} className="group py-8">
          {linked ? (
            <Link href={`/blog/${post.slug}`} className="block">
              <BlogPostListBody post={post} />
            </Link>
          ) : (
            <div className="block">
              <BlogPostListBody post={post} />
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

function BlogPostListBody({ post }: { post: PostMeta }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        <time dateTime={post.date}>{formatDate(new Date(post.date))}</time>
        <span className="text-muted/40" aria-hidden="true">
          /
        </span>
        <span>{post.readingTime}</span>
        {post.caseStudy ? (
          <>
            <span className="text-muted/40" aria-hidden="true">
              /
            </span>
            <span>Case study</span>
          </>
        ) : null}
      </div>
      <h2 className="mt-3 text-2xl font-medium text-text transition-fast group-hover:text-accent">
        {post.title}
      </h2>
      <p className="mt-2 text-base leading-relaxed text-muted">{post.excerpt}</p>
      {post.tags.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <li key={tag}>
              <span className="rounded bg-text/5 px-2 py-0.5 font-mono text-[11px] text-muted/80 ring-1 ring-border">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
