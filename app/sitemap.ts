import type { MetadataRoute } from "next";
import { getAllSlugsFr, getAllSlugsNl } from "@/data/city-data";
import { getBlogPosts } from "@/data/types";
import { frServices } from "@/data/fr-services";
import { nlServices } from "@/data/nl-services";

const base = "https://vaillant-loodgieter.com";

const staticPaths = [
  "/nl",
  "/fr",
  "/nl/over-ons",
  "/nl/contact",
  "/nl/brussel",
  "/nl/diensten",
  "/nl/demande-offerte",
  "/nl/certificeringen",
  "/nl/cookies",
  "/nl/privacy",
  "/nl/gebruiksvoorwaarden",
  "/nl/juridische-vermelding",
  "/nl/loodgieter",
  "/nl/blog",
  "/fr/a-propos",
  "/fr/contact",
  "/fr/brussel",
  "/fr/services",
  "/fr/demande-devis",
  "/fr/certifications",
  "/fr/cookies",
  "/fr/confidentialite",
  "/fr/conditions-utilisation",
  "/fr/mentions-legales",
  "/fr/plombier",
  "/fr/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/nl" || path === "/fr" ? 1 : 0.8,
  }));

  for (const slug of getAllSlugsNl()) {
    entries.push({
      url: `${base}/nl/loodgieter/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const slug of getAllSlugsFr()) {
    entries.push({
      url: `${base}/fr/plombier/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const s of frServices) {
    entries.push({
      url: `${base}/fr/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  for (const s of nlServices) {
    entries.push({
      url: `${base}/nl/diensten/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  for (const post of getBlogPosts()) {
    entries.push(
      {
        url: `${base}/nl/blog/${post.slug}`,
        lastModified: new Date(post.languages.nl.date),
        changeFrequency: "monthly",
        priority: 0.65,
      },
      {
        url: `${base}/fr/blog/${post.slug}`,
        lastModified: new Date(post.languages.fr.date),
        changeFrequency: "monthly",
        priority: 0.65,
      },
    );
  }

  return entries;
}
