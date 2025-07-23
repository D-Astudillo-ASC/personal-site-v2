import { ReactNode } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function BlogPostLayout({ children }: { children: ReactNode }) {
  return (
    <div className="post flex justify-center bg-background min-h-screen">
      <article className="prose prose-xl dark:prose-invert max-w-5xl w-full px-12 py-12 rounded-2xl shadow-xl order border-border/30">
        <Breadcrumbs />
        <Link
          href="/blog"
          className="inline-block mb-8 text-base font-thin px-6 py-2 rounded border border-border/50 hover:text-text transition-standard cursor-pointer hover-scale"
          aria-label="Back to Posts"
        >
          ← Back to Posts
        </Link>
        {children}
      </article>
    </div>
  );
} 