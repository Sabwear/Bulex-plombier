import { bulexOrigin, bulexIndexable } from "@/config/bulex/brand";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(bulexIndexable
        ? { allow: "/", disallow: ["/bulex/", "/api/"] }
        : { disallow: "/" }),
    },
    ...(bulexIndexable
      ? { host: bulexOrigin, sitemap: `${bulexOrigin}/sitemap.xml` }
      : {}),
  };
}
