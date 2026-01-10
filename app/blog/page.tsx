import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Daniel Astudillo | Software Engineer | Blog",
  description: "Blog by Daniel Astudillo, Software Engineer. Insights on React, Next.js, TypeScript, software engineering, and career advice.",
  keywords: [
    "Daniel Astudillo Blog",
    "Software Engineering Blog",
    "React Blog",
    "Next.js Blog",
    "TypeScript Blog",
    "Career Advice",
    "Web Development Blog",
    "Full Stack Blog"
  ],
  alternates: {
    canonical: "https://danielastudillo.io/blog",
  },
  openGraph: {
    title: "Daniel Astudillo | Software Engineer | Blog",
    description: "Blog by Daniel Astudillo, Software Engineer. Insights on React, Next.js, TypeScript, software engineering, and career advice.",
    url: "https://danielastudillo.io/blog",
  },
};

export default function BlogIndex() {
  // In a real setup, you would use import.meta.glob or fs to read all post folders and extract frontmatter.
  // For now, just link to the sample post.
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 pt-32">
      <Breadcrumbs />
      <h1 className="mb-8 text-2xl sm:text-3xl md:text-4xl font-thin">Blog</h1>
      <p className="mb-8 text-lg font-thin text-text/70 leading-relaxed">
        Welcome to my blog! Here you&apos;ll find articles about my projects, career journey, and thoughts on software engineering and technology. Stay tuned for upcoming posts.
      </p>
      <div className="space-y-12">
        <article className="border-b border-border/20 pb-8">
          <h2 className="text-2xl font-medium mb-2">
            <Link href="/blog/welcome-to-my-blog" className="hover:underline text-text">
              Welcome to My Blog
            </Link>
          </h2>
          <div className="text-sm text-text/50 mb-2">2025-07-22</div>
          <p className="text-lg font-thin text-text/70 mb-2">An introduction to my new blog, what to expect, and why I&apos;m starting to write about my journey as a software engineer.</p>
          <Link href="/blog/welcome-to-my-blog" className="text-text/70 hover:text-text underline text-base font-thin">Read more →</Link>
        </article>
      </div>
      <div className="mt-16 text-center">
        <Link
          href="/"
          className="inline-block text-lg font-thin px-6 py-2 rounded border border-border/50 text-text/70 hover:text-text transition-standard cursor-pointer hover-scale"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
} 