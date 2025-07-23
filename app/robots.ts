import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://danielastudillo.io";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/amp/sitemap.xml`],
  };
}
