import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://vaillant-loodgieter.com",
    sitemap: "https://vaillant-loodgieter.com/sitemap.xml",
  };
}
