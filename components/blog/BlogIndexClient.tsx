"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import BlogEarlierWorkSection from "@/components/blog/BlogEarlierWorkSection";
import BlogPostList from "@/components/blog/BlogPostList";
import BlogSearchInput from "@/components/blog/BlogSearchInput";
import {
  EARLIER_WORK_SLUGS,
  EARLIER_WORK_SLUG_SET,
  START_HERE_SLUG_SET,
} from "@/constants/blog";
import {
  filterPostsBySearch,
  filterPostsByTags,
  getActiveTagsFromSearchParams,
  getSearchQueryFromSearchParams,
  getUniqueTags,
  type PostMeta,
} from "@/lib/post-meta";

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

function buildBlogIndexQuery(tags: string[], query: string): string {
  const params = new URLSearchParams();
  const trimmed = query.trim();
  if (trimmed) params.set("q", trimmed);
  for (const tag of tags) {
    params.append("tag", tag);
  }
  return params.toString();
}

function orderEarlierWorkPosts(posts: PostMeta[]): PostMeta[] {
  const bySlug = new Map(posts.map((p) => [p.slug, p] as const));
  const ordered: PostMeta[] = [];
  for (const slug of EARLIER_WORK_SLUGS) {
    const post = bySlug.get(slug);
    if (post) ordered.push(post);
  }
  return ordered;
}

export default function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTags = useMemo(
    () => getActiveTagsFromSearchParams(searchParams),
    [searchParams],
  );

  const searchQuery = useMemo(
    () => getSearchQueryFromSearchParams(searchParams),
    [searchParams],
  );

  const allTags = useMemo(() => getUniqueTags(posts), [posts]);

  const hasFilters = activeTags.length > 0;
  const hasSearch = searchQuery.length > 0;
  const hasTopicFilters = hasFilters || hasSearch;

  const listSource = useMemo(() => {
    if (hasTopicFilters) return posts;
    return posts.filter(
      (post) =>
        !START_HERE_SLUG_SET.has(post.slug) &&
        !EARLIER_WORK_SLUG_SET.has(post.slug),
    );
  }, [posts, hasTopicFilters]);

  const earlierSource = useMemo(() => {
    if (hasTopicFilters) return [];
    return orderEarlierWorkPosts(
      posts.filter((post) => EARLIER_WORK_SLUG_SET.has(post.slug)),
    );
  }, [posts, hasTopicFilters]);

  const filteredPosts = useMemo(
    () =>
      filterPostsByTags(filterPostsBySearch(listSource, searchQuery), activeTags),
    [listSource, searchQuery, activeTags],
  );

  const filteredEarlierPosts = useMemo(
    () =>
      filterPostsByTags(
        filterPostsBySearch(earlierSource, searchQuery),
        activeTags,
      ),
    [earlierSource, searchQuery, activeTags],
  );

  const replaceQuery = useCallback(
    (tags: string[], query: string) => {
      const next = buildBlogIndexQuery(tags, query);
      router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  const clearTopicFilters = useCallback(
    () => replaceQuery([], ""),
    [replaceQuery],
  );

  const toggleTag = useCallback(
    (tag: string) => {
      if (activeTags.includes(tag)) {
        replaceQuery(
          activeTags.filter((t) => t !== tag),
          searchQuery,
        );
      } else {
        replaceQuery([...activeTags, tag], searchQuery);
      }
    },
    [activeTags, replaceQuery, searchQuery],
  );

  if (posts.length === 0) {
    return (
      <p className="font-mono text-sm text-muted">First post landing soon.</p>
    );
  }

  const resultCount = hasTopicFilters
    ? filteredPosts.length
    : filteredPosts.length + filteredEarlierPosts.length;
  const catalogSize = hasTopicFilters
    ? listSource.length
    : listSource.length + earlierSource.length;

  return (
    <>
      <BlogSearchInput
        key={searchQuery}
        initialQuery={searchQuery}
        onApply={(query) => replaceQuery(activeTags, query)}
        onClear={() => replaceQuery(activeTags, "")}
      />

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
            {hasTopicFilters
              ? `${resultCount} of ${catalogSize} posts`
              : `${filteredPosts.length} posts`}
            {!hasTopicFilters && filteredEarlierPosts.length > 0
              ? ` · ${filteredEarlierPosts.length} in archive`
              : null}
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
            onClick={() => replaceQuery([], searchQuery)}
          >
            All tags
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
        {hasTopicFilters ? (
          <button
            type="button"
            className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted underline decoration-border underline-offset-4 transition-fast hover:text-accent"
            onClick={clearTopicFilters}
          >
            Clear search and tags
          </button>
        ) : null}
      </div>

      {resultCount === 0 ? (
        <div className="rounded-lg border border-border bg-surface/40 px-6 py-10 text-center">
          <p className="text-sm text-muted">
            {hasSearch ? (
              <>
                No posts match &ldquo;{searchQuery}&rdquo;
                {hasFilters ? (
                  <>
                    {" "}
                    with tag{" "}
                    <span className="font-mono text-text/90">
                      {formatActiveTags(activeTags)}
                    </span>
                  </>
                ) : null}
                .
              </>
            ) : (
              <>
                No posts tagged{" "}
                <span className="font-mono text-text/90">
                  {formatActiveTags(activeTags)}
                </span>
                .
              </>
            )}
          </p>
          <button
            type="button"
            className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-accent underline decoration-accent/40 underline-offset-4 transition-fast hover:text-text"
            onClick={clearTopicFilters}
          >
            Show all posts
          </button>
        </div>
      ) : (
        <>
          {filteredPosts.length > 0 ? (
            <BlogPostList posts={filteredPosts} />
          ) : null}
          {!hasTopicFilters && filteredEarlierPosts.length > 0 ? (
            <BlogEarlierWorkSection posts={filteredEarlierPosts} />
          ) : null}
        </>
      )}
    </>
  );
}
