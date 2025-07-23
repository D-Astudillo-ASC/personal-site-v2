import { MetadataRoute } from "next";

let baseUrl: string;
if (process.env.NODE_ENV !== "production" && process.env.VERCEL_URL) {
  baseUrl = process.env.VERCEL_URL;
} else {
  baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/amp.html`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
} 