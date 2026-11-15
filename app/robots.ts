import {getBulexOrigin} from '@/config/bulex/request-origin';
import { bulexIndexable } from "@/config/bulex/brand";
import type { MetadataRoute } from "next";

export const dynamic='force-dynamic';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const bulexOrigin=await getBulexOrigin();
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
