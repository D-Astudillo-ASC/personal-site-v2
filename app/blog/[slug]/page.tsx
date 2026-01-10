import type { Metadata } from "next";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(`../content/${slug}/page.mdx`);

  return <Post />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const postModule = await import(`../content/${slug}/page.mdx`);
  const postMetadata = postModule.metadata || {};

  return {
    title: postMetadata.title
      ? `${postMetadata.title} | Daniel Astudillo`
      : "Blog Post | Daniel Astudillo",
    description: postMetadata.description || postMetadata.excerpt || "",
    alternates: {
      canonical: `https://danielastudillo.io/blog/${slug}`,
    },
    openGraph: {
      title: postMetadata.title || "Blog Post",
      description: postMetadata.description || postMetadata.excerpt || "",
      url: `https://danielastudillo.io/blog/${slug}`,
      type: "article",
      publishedTime: postMetadata.date,
    },
  };
}

export function generateStaticParams() {
  return [{ slug: "welcome-to-my-blog" }, { slug: "another-post" }];
}

export const dynamicParams = false;