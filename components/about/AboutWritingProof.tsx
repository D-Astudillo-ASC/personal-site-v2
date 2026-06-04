import Link from "next/link";
import type { PostMeta } from "@/lib/post-meta";
import { START_HERE_SLUGS } from "@/constants/blog";

interface AboutWritingProofProps {
  postsBySlug: Map<string, PostMeta>;
}

export default function AboutWritingProof({
  postsBySlug,
}: AboutWritingProofProps) {
  const pillars = START_HERE_SLUGS.map((slug) => postsBySlug.get(slug)).filter(
    (post): post is PostMeta => post !== undefined,
  );

  if (pillars.length === 0) return null;

  return (
    <section className="mb-20">
      <ul className="divide-y divide-border border-y border-border">
        {pillars.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-2 py-6 transition-fast md:flex-row md:items-baseline md:justify-between md:gap-8"
            >
              <div className="max-w-2xl">
                <h3 className="font-display text-2xl italic leading-snug text-text transition-fast group-hover:text-accent">
                  {post.title}
                </h3>
                {post.description ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
                    {post.description}
                  </p>
                ) : null}
              </div>
              <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-muted/60 transition-fast group-hover:text-accent">
                Start here
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted">
        Twenty technical essays across enterprise platform work, mobile
        archives, and side projects — with decision tables and measured outcomes.{" "}
        <Link
          href="/blog"
          className="text-text transition-fast hover:text-accent"
        >
          Browse all writing →
        </Link>
      </p>
    </section>
  );
}
