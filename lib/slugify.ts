/** Slugify heading text for URL fragments and TOC ids. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** GitHub-style deduplication when the same title appears twice. */
export function uniqueSlug(text: string, used: Map<string, number>): string {
  const base = slugify(text);
  const count = used.get(base) ?? 0;
  used.set(base, count + 1);
  return count === 0 ? base : `${base}-${count}`;
}
