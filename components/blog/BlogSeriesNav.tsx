import Link from "next/link";
import type { BlogSeries } from "@/constants/blog";
import type { PostMeta } from "@/lib/post-meta";

interface BlogSeriesNavProps {
  series: BlogSeries;
  posts: PostMeta[];
}

export default function BlogSeriesNav({ series, posts }: BlogSeriesNavProps) {
  return (
    <nav
      aria-labelledby={`series-nav-${series.id}`}
      className="mt-16 rounded-xl border border-border bg-surface/40"
    >
      <div className="border-b border-border px-6 py-5 sm:px-8">
        <p
          id={`series-nav-${series.id}`}
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent"
        >
          More in {series.title}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {series.description}
        </p>
      </div>
      <ul className="divide-y divide-border px-6 py-2 sm:px-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block py-4 transition-fast hover:text-accent"
            >
              <span className="font-display text-lg italic leading-snug text-text transition-fast group-hover:text-accent">
                {post.title}
              </span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                {post.readingTime}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="border-t border-border px-6 py-4 sm:px-8">
        <Link
          href="/blog"
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-fast hover:text-accent"
        >
          ← All writing by theme
        </Link>
      </div>
    </nav>
  );
}
