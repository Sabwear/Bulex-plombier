import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    // Ensure all quality values used in <Image> are declared here
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Redirects: legacy roots + old static city URLs -> new dynamic routes
  async redirects() {
    const frCityRedirects = [
      "alost", "anvers", "bruges", "charleroi", "courtrai", "gand", "genk",
      "hasselt", "la-louviere", "liege", "lokeren", "louvain", "malines",
      "mons", "mouscron", "namur", "ostende", "roulers", "saint-nicolas",
      "seraing", "tournai", "termonde", "turnhout", "verviers", "waregem", "ypres",
    ].map((slug) => ({
      source: `/fr/plombier-${slug}`,
      destination: `/fr/plombier/${slug}`,
      permanent: true,
    }));
    const nlCityRedirects = [
      { source: "/nl/loodgieter-brussel", destination: "/nl/loodgieter/brussel", permanent: true },
      { source: "/nl/loodgieter-antwerpen", destination: "/nl/loodgieter/antwerpen", permanent: true },
      { source: "/nl/loodgieter-gent", destination: "/nl/loodgieter/gent", permanent: true },
      { source: "/nl/loodgieter-leuven", destination: "/nl/loodgieter/leuven", permanent: true },
    ];
    return [
      { source: "/", destination: "/fr", permanent: true },
      { source: "/contact", destination: "/fr/contact", permanent: true },
      { source: "/a-propos", destination: "/fr/a-propos", permanent: true },
      { source: "/services", destination: "/fr/services", permanent: true },
      { source: "/services/:slug", destination: "/fr/services/:slug", permanent: true },
      { source: "/demande-devis", destination: "/fr/demande-devis", permanent: true },
      { source: "/blog", destination: "/fr/blog", permanent: true },
      { source: "/blog/:slug", destination: "/fr/blog/:slug", permanent: true },
      { source: "/brussel", destination: "/fr/brussel", permanent: true },
      { source: "/plombier", destination: "/fr/plombier", permanent: true },
      { source: "/fr/plombier-bruxelles", destination: "/fr/plombier/bruxelles-ville", permanent: true },
      ...frCityRedirects,
      ...nlCityRedirects,
    ];
  },
};

export default nextConfig;
