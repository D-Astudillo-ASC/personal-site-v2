import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/lib/post-meta";
import { formatDate } from "@/utils/date";

interface BlogStartHereProps {
  posts: PostMeta[];
}

export default function BlogStartHere({ posts }: BlogStartHereProps) {
  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="blog-start-here"
      className="mb-14 rounded-xl border border-accent/25 bg-accent/5"
    >
      <div className="border-b border-accent/20 px-6 py-5 sm:px-8">
        <p
          id="blog-start-here"
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent"
        >
          Start here
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Three pillar essays — production judgment, distributed systems, and
          platform work. Read in order or jump to the one that matches your
          loop.
        </p>
      </div>

      <ol className="divide-y divide-accent/15">
        {posts.map((post, index) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex gap-5 px-6 py-6 transition-fast hover:bg-accent/5 sm:px-8"
            >
              <span
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 font-mono text-xs text-accent"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              {post.cover ? (
                <span className="relative hidden h-20 w-32 shrink-0 overflow-hidden rounded-lg ring-1 ring-accent/25 sm:block">
                  <Image
                    src={post.cover}
                    alt=""
                    fill
                    sizes="128px"
                    className="object-cover transition-slower group-hover:scale-[1.03]"
                  />
                </span>
              ) : null}
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  <time dateTime={post.date}>
                    {formatDate(new Date(post.date))}
                  </time>
                  <span className="text-muted/40" aria-hidden="true">
                    /
                  </span>
                  <span>{post.readingTime}</span>
                </span>
                <span className="mt-2 block font-display text-xl italic leading-snug text-text transition-fast group-hover:text-accent sm:text-2xl">
                  {post.title}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
