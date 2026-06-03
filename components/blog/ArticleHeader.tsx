import { formatDate } from "@/utils/date";
import type { PostMeta } from "@/lib/posts";

interface ArticleHeaderProps {
  post: PostMeta;
}

export default function ArticleHeader({ post }: ArticleHeaderProps) {
  const showUpdated = post.dateModified > post.date;

  return (
    <header className="mb-12 border-b border-border pb-10">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        <time dateTime={post.date}>{formatDate(new Date(post.date))}</time>
        {showUpdated ? (
          <>
            <span className="text-muted/40" aria-hidden="true">
              /
            </span>
            <time dateTime={post.dateModified}>
              Updated {formatDate(new Date(post.dateModified))}
            </time>
          </>
        ) : null}
        <span className="text-muted/40" aria-hidden="true">
          /
        </span>
        <span>{post.readingTime}</span>
        {post.featured ? (
          <>
            <span className="text-muted/40" aria-hidden="true">
              /
            </span>
            <span className="text-accent/90">Start here</span>
          </>
        ) : null}
      </div>
      <h1 className="mt-5 font-display text-[clamp(2.25rem,6vw,3.25rem)] italic leading-[1.05] tracking-tight text-text text-balance">
        {post.title}
      </h1>
      {post.excerpt ? (
        <p className="mt-5 text-lg leading-relaxed text-muted text-balance">
          {post.excerpt}
        </p>
      ) : null}
      {post.tags.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <li key={tag}>
              <span className="rounded bg-text/5 px-2 py-0.5 font-mono text-[11px] text-muted/80 ring-1 ring-border">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
