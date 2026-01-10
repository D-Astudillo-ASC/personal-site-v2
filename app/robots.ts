import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://danielastudillo.io";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/private/",
          "/_next/static/", // Disallow Next.js static files (fonts, chunks, etc.)
          "/api/", // Disallow API routes
          "/favicon-dark.ico", // Disallow favicon files
          "/favicon-light.ico",
        ],
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/amp/sitemap.xml`],
  };
}
