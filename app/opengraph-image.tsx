import { ImageResponse } from "next/og";
import { OG_SIZE, OG_CONTENT_TYPE, renderOgCard } from "@/lib/og-card";

export const alt = "Daniel Astudillo — Software Engineer in New York";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    renderOgCard({
      title: "Engineering software that holds up in production.",
      eyebrow: "danielastudillo.io",
    }),
    size,
  );
}
