import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://danielastudillo.io";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Only block routes with no SEO value. Never block /_next/static —
        // crawlers need the CSS/JS to render and score the page.
        disallow: ["/api/", "/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
