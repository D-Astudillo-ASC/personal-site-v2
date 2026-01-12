import type { Metadata } from "next";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(`../content/${slug}/page.mdx`);
  const postModule = await import(`../content/${slug}/page.mdx`);
  const postMetadata = postModule.metadata || {};

  // Generate Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: postMetadata.title || "Blog Post",
    description: postMetadata.description || postMetadata.excerpt || "",
    image: postMetadata.cover
      ? `https://danielastudillo.io${postMetadata.cover}`
      : "https://danielastudillo.io/images/og-image.png",
    datePublished: postMetadata.date || new Date().toISOString(),
    dateModified: postMetadata.date || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: "Daniel Astudillo",
      url: "https://danielastudillo.io",
      jobTitle: "Software Engineer",
    },
    publisher: {
      "@type": "Person",
      name: "Daniel Astudillo",
      url: "https://danielastudillo.io",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://danielastudillo.io/blog/${slug}`,
    },
    url: `https://danielastudillo.io/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Post />
    </>
  );
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
      ? `${postMetadata.title} | Daniel Astudillo - Software Engineer`
      : "Blog Post | Daniel Astudillo - Software Engineer",
    description: postMetadata.description
      ? `${postMetadata.description} | By Daniel Astudillo, Software Engineer`
      : postMetadata.excerpt
        ? `${postMetadata.excerpt} | By Daniel Astudillo, Software Engineer`
        : "Article by Daniel Astudillo, Software Engineer",
    alternates: {
      canonical: `https://danielastudillo.io/blog/${slug}`,
    },
    openGraph: {
      title: postMetadata.title
        ? `${postMetadata.title} | Daniel Astudillo - Software Engineer`
        : "Blog Post | Daniel Astudillo - Software Engineer",
      description: postMetadata.description || postMetadata.excerpt || "Article by Daniel Astudillo, Software Engineer",
      url: `https://danielastudillo.io/blog/${slug}`,
      type: "article",
      publishedTime: postMetadata.date,
      authors: ["Daniel Astudillo"],
      siteName: "Daniel Astudillo Portfolio",
      images: postMetadata.cover
        ? [`https://danielastudillo.io${postMetadata.cover}`]
        : ["https://danielastudillo.io/images/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: postMetadata.title
        ? `${postMetadata.title} | Daniel Astudillo`
        : "Blog Post | Daniel Astudillo",
      description: postMetadata.description || postMetadata.excerpt || "Article by Daniel Astudillo, Software Engineer",
      creator: "@danielastudillo",
    },
  };
}

export function generateStaticParams() {
  return [{ slug: "welcome-to-my-blog" }, { slug: "another-post" }];
}

export const dynamicParams = false;