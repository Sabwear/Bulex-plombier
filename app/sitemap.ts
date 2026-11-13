import { bulexOrigin, bulexIndexable } from "@/config/bulex/brand";
import { getAdvice } from "@/config/bulex/advice";
import { getServices, getSolutions } from "@/config/bulex/content";
import { href, pageSegments, type PageKey } from "@/config/bulex/routes";
import { getAllSlugsNl } from "@/data/city-data";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!bulexIndexable) return [];

  return (["nl", "en"] as const).flatMap((locale) => {
    const paths = (Object.keys(pageSegments) as PageKey[]).map((key) =>
      href(locale, key),
    );
    paths.push(
      ...getServices(locale).map((service) =>
        href(locale, "services", service.slug),
      ),
      ...getSolutions(locale).map((solution) =>
        href(locale, "solutions", solution.slug),
      ),
      ...getAllSlugsNl().map((slug) => href(locale, "areas", slug)),
      ...getAdvice(locale).map((article) =>
        href(locale, "blog", article.slug),
      ),
    );

    return paths.map((path) => ({
      url: bulexOrigin + path,
      changeFrequency: "monthly" as const,
    }));
  });
}
