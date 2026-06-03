import type { PostMeta } from "@/lib/post-meta";
import { formatDate } from "@/utils/date";

/** Static list shown while tag filter hydrates (search params). */
export default function BlogIndexClientFallback({
  posts,
}: {
  posts: PostMeta[];
}) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {posts.map((post) => (
        <article key={post.slug} className="group py-8">
          <div className="block">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              <time dateTime={post.date}>
                {formatDate(new Date(post.date))}
              </time>
              <span className="text-muted/40" aria-hidden="true">
                /
              </span>
              <span>{post.readingTime}</span>
            </div>
            <h2 className="mt-3 text-2xl font-medium text-text">{post.title}</h2>
            <p className="mt-2 text-base leading-relaxed text-muted">
              {post.excerpt}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
