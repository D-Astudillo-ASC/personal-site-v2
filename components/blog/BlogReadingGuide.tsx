import Link from "next/link";
import { BLOG_SERIES } from "@/constants/blog";

function seriesLinkClassName(): string {
  return [
    "inline-flex items-center rounded-full px-3 py-1 font-mono text-[11px] tracking-wide transition-fast",
    "bg-text/5 text-text/80 ring-1 ring-border",
    "hover:bg-accent/10 hover:text-accent hover:ring-accent/40",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  ].join(" ");
}

export default function BlogReadingGuide() {
  return (
    <aside
      aria-labelledby="blog-reading-guide"
      className="mb-12 rounded-xl border border-border bg-surface/60"
    >
      <div className="border-b border-border px-6 py-5 sm:px-8">
        <p
          id="blog-reading-guide"
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent"
        >
          How to read this
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Grouped by theme, not date. Start with the pillar row above, then pick
          a spine below or filter by tag. Visa production work lives under{" "}
          <span className="text-text/90">Enterprise & platform</span>.
        </p>
      </div>

      <ol className="divide-y divide-border">
        {BLOG_SERIES.map((series) => (
          <li
            key={series.id}
            className="px-6 py-5 sm:flex sm:items-start sm:gap-8 sm:px-8"
          >
            <div className="sm:w-52 sm:shrink-0">
              <h2 className="font-display text-lg italic text-text">
                {series.title}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {series.description}
              </p>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2 sm:mt-0 sm:min-w-0 sm:flex-1">
              {series.links.map((link) => (
                <li key={link.slug}>
                  <Link href={`/blog/${link.slug}`} className={seriesLinkClassName()}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </aside>
  );
}
