import { MetadataRoute } from "next";

export default function sitemap(
    request: Request
  ): MetadataRoute.Sitemap {
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;

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