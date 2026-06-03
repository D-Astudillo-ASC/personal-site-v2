"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { START_HERE_SLUG_SET } from "@/constants/blog";
import {
  filterPostsByTags,
  getActiveTagsFromSearchParams,
  getUniqueTags,
  type PostMeta,
} from "@/lib/post-meta";
import { formatDate } from "@/utils/date";

interface BlogIndexClientProps {
  posts: PostMeta[];
}

function tagButtonClass(isActive: boolean): string {
  return [
    "rounded-full px-3 py-1 font-mono text-[11px] tracking-wide transition-fast",
    "ring-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    isActive
      ? "bg-accent/15 text-accent ring-accent/50"
      : "bg-text/5 text-muted/90 ring-border hover:text-text hover:ring-border",
  ].join(" ");
}

function formatActiveTags(tags: string[]): string {
  if (tags.length === 1) return tags[0];
  if (tags.length === 2) return `${tags[0]} or ${tags[1]}`;
  return `${tags.slice(0, -1).join(", ")}, or ${tags.at(-1)}`;
}

export default function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTags = useMemo(
    () => getActiveTagsFromSearchParams(searchParams),
    [searchParams],
  );

  const allTags = useMemo(() => getUniqueTags(posts), [posts]);

  const hasFilters = activeTags.length > 0;

  const catalogPosts = useMemo(
    () =>
      hasFilters
        ? posts
        : posts.filter((post) => !START_HERE_SLUG_SET.has(post.slug)),
    [posts, hasFilters],
  );

  const filteredPosts = useMemo(
    () => filterPostsByTags(catalogPosts, activeTags),
    [catalogPosts, activeTags],
  );

  const replaceTags = useCallback(
    (tags: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("tag");
      for (const tag of tags) {
        params.append("tag", tag);
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const clearTags = useCallback(() => replaceTags([]), [replaceTags]);

  const toggleTag = useCallback(
    (tag: string) => {
      if (activeTags.includes(tag)) {
        replaceTags(activeTags.filter((t) => t !== tag));
      } else {
        replaceTags([...activeTags, tag]);
      }
    },
    [activeTags, replaceTags],
  );

  if (posts.length === 0) {
    return (
      <p className="font-mono text-sm text-muted">First post landing soon.</p>
    );
  }

  return (
    <>
      <div className="mb-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Filter by topic
            </p>
            <p className="mt-1 font-mono text-[10px] text-muted/70">
              Select one or more — posts match any chosen tag
            </p>
          </div>
          <p className="font-mono text-[11px] text-muted/80" aria-live="polite">
            {!hasFilters
              ? `${catalogPosts.length} posts`
              : `${filteredPosts.length} of ${catalogPosts.length} posts`}
          </p>
        </div>
        <div
          role="group"
          aria-label="Filter posts by tag"
          className="mt-3 flex flex-wrap gap-2"
        >
          <button
            type="button"
            aria-pressed={!hasFilters}
            className={tagButtonClass(!hasFilters)}
            onClick={clearTags}
          >
            All
          </button>
          {allTags.map((tag) => {
            const isActive = activeTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                aria-pressed={isActive}
                className={tagButtonClass(isActive)}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            );
          })}
        </div>
        {hasFilters ? (
          <button
            type="button"
            className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted underline decoration-border underline-offset-4 transition-fast hover:text-accent"
            onClick={clearTags}
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="rounded-lg border border-border bg-surface/40 px-6 py-10 text-center">
          <p className="text-sm text-muted">
            No posts tagged{" "}
            <span className="font-mono text-text/90">
              {formatActiveTags(activeTags)}
            </span>
            .
          </p>
          <button
            type="button"
            className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-accent underline decoration-accent/40 underline-offset-4 transition-fast hover:text-text"
            onClick={clearTags}
          >
            Show all posts
          </button>
        </div>
      ) : (
        <div className="divide-y divide-border border-y border-border">
          {filteredPosts.map((post) => (
            <article key={post.slug} className="group py-8">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  <time dateTime={post.date}>
                    {formatDate(new Date(post.date))}
                  </time>
                  <span className="text-muted/40" aria-hidden="true">
                    /
                  </span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="mt-3 text-2xl font-medium text-text transition-fast group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  {post.excerpt}
                </p>
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
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
