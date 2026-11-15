import {getBulexOrigin} from '@/config/bulex/request-origin';
import { bulexIndexable } from "@/config/bulex/brand";
import { getAdvice } from "@/config/bulex/advice";
import { getServices, getSolutions } from "@/config/bulex/content";
import { alternatePath, href, pageSegments, type PageKey } from "@/config/bulex/routes";
import { getAllSlugsNl } from "@/data/city-data";
import type { MetadataRoute } from "next";

export const dynamic='force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const bulexOrigin=await getBulexOrigin();
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

    const articles=getAdvice(locale);
    return paths.map((path) => ({
      url: bulexOrigin + path,
      alternates: {languages: {
        "nl-BE": bulexOrigin + alternatePath(path,"nl"),
        "en-BE": bulexOrigin + alternatePath(path,"en"),
        "x-default": bulexOrigin + alternatePath(path,"en"),
      }},
      ...(articles.find(a=>href(locale,'blog',a.slug)===path)?.blogPost?{lastModified:new Date(articles.find(a=>href(locale,'blog',a.slug)===path)!.blogPost!.publishAt)}:{}),
      changeFrequency: "monthly" as const,
    }));
  });
}
