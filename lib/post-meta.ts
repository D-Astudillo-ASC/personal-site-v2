export interface TocHeading {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date string (YYYY-MM-DD)
  /** When the essay was last materially updated (defaults to date). */
  dateModified: string;
  excerpt: string;
  cover?: string;
  tags: string[];
  readingTime: string; // e.g. "6 min read"
  featured: boolean;
}

/** Parse `?tag=a&tag=b` from the blog index URL. */
export function getActiveTagsFromSearchParams(
  searchParams: URLSearchParams,
): string[] {
  return [...new Set(searchParams.getAll("tag").filter(Boolean))].sort((a, b) =>
    a.localeCompare(b),
  );
}

/** Posts that include at least one of the selected tags (OR). */
export function filterPostsByTags(
  posts: PostMeta[],
  activeTags: string[],
): PostMeta[] {
  if (activeTags.length === 0) return posts;
  return posts.filter((post) =>
    activeTags.some((tag) => post.tags.includes(tag)),
  );
}

/** Sorted unique tags across a post list (for index filters). */
export function getUniqueTags(posts: PostMeta[]): string[] {
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return [...tags].sort((a, b) => a.localeCompare(b));
}
