import type { NextConfig } from "next";
import { getAllSlugsNl } from "./data/city-data";

const nextConfig: NextConfig = {
  distDir: ".next-bulex",
  outputFileTracingRoot: process.cwd(),
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  eslint: {
    // Next.js 15 + ESLint can throw "circular structure" during build in some setups.
    // We keep linting available via `npm run lint`, but avoid blocking production builds.
    ignoreDuringBuilds: true,
  },
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
    const nlCityRedirects = getAllSlugsNl().map((slug) => ({
      source: `/nl/loodgieter-${slug}`,
      destination: `/nl/loodgieter/${slug}`,
      permanent: true,
    }));
    return [
      { source: "/fr/plombier-bruxelles", destination: "/fr/plombier/bruxelles-ville", permanent: true },
      ...frCityRedirects,
      ...nlCityRedirects,
    ];
  },
};

export default nextConfig;
