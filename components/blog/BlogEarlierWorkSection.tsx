"use client";

import { useState } from "react";
import BlogPostList from "@/components/blog/BlogPostList";
import type { PostMeta } from "@/lib/post-meta";

interface BlogEarlierWorkSectionProps {
  posts: PostMeta[];
}

export default function BlogEarlierWorkSection({
  posts,
}: BlogEarlierWorkSectionProps) {
  const [open, setOpen] = useState(false);

  if (posts.length === 0) return null;

  return (
    <section className="mt-14 border-t border-border pt-10">
      <details
        open={open}
        onToggle={(event) => setOpen(event.currentTarget.open)}
        className="group/details"
      >
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Archive
              </p>
              <h2 className="mt-1 font-serif text-xl font-medium text-text">
                Earlier work
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                MERN coursework, capstones, portfolio generations, and first production
                deploys — still searchable via tags above.
              </p>
            </div>
            <p className="font-mono text-[11px] text-muted/80">
              <span className="text-accent group-open/details:hidden">
                Show {posts.length} posts
              </span>
              <span className="hidden text-muted group-open/details:inline">
                Hide
              </span>
            </p>
          </div>
        </summary>
        <div className="mt-8">
          <BlogPostList posts={posts} />
        </div>
      </details>
    </section>
  );
}
