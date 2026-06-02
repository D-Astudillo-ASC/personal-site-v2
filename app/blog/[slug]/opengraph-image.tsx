import { ImageResponse } from "next/og";
import { OG_SIZE, OG_CONTENT_TYPE, renderOgCard } from "@/lib/og-card";
import { getPostMeta, getPostSlugs } from "@/lib/posts";

export const alt = "Essay by Daniel Astudillo";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = await getPostMeta(slug);

  return new ImageResponse(
    renderOgCard({
      title: meta?.title ?? "Writing",
      eyebrow: "danielastudillo.io · writing",
    }),
    size,
  );
}
