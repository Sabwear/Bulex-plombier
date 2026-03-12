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

  // Redirects permanents (301) des anciennes URLs françaises (racine) vers /fr/...
  async redirects() {
    return [
      { source: "/",          destination: "/fr",          permanent: true },
      { source: "/contact",   destination: "/fr/contact",  permanent: true },
      { source: "/a-propos",  destination: "/fr/a-propos", permanent: true },
      { source: "/services",  destination: "/fr/services", permanent: true },
      { source: "/services/:slug", destination: "/fr/services/:slug", permanent: true },
      { source: "/demande-devis", destination: "/fr/demande-devis", permanent: true },
      { source: "/blog",      destination: "/fr/blog",     permanent: true },
      { source: "/blog/:slug", destination: "/fr/blog/:slug", permanent: true },
      { source: "/brussel",   destination: "/fr/brussel",  permanent: true },
      { source: "/plombier",  destination: "/fr/plombier", permanent: true },
      { source: "/plombier/:city", destination: "/fr/plombier/:city", permanent: true },
    ];
  },
};

export default nextConfig;
