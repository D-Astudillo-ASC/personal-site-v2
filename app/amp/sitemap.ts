import { MetadataRoute } from "next";

// Always use non-www domain for AMP sitemap to match the AMP page location
// This prevents Google from seeing www vs non-www mismatches
const getBaseUrl = (): string => {
  if (process.env.NODE_ENV === "production") {
    return "https://danielastudillo.io";
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
};

// Ensure non-www even if env var has www
const baseUrl = getBaseUrl().replace(/^https:\/\/www\./, "https://");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
} 