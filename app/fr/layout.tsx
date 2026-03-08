import type { Metadata } from "next";
import "../globals.css";
import SiteHeader from "@/components/header/SiteHeader";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://villantloodgieter.com"),
  title: {
    default: "Plombier Vaillant Bruxelles | Villant Plombier",
    template: "%s | Villant Plombier",
  },
  description:
    "Villant Plombier \u2013 partenaire certifi\u00e9 Vaillant \u00e0 Bruxelles. D\u00e9pannage plombier urgence Bruxelles, remplacement de chaudi\u00e8re, r\u00e9paration de fuite d'eau et installation sanitaire. Appelez-nous d\u00e8s aujourd'hui.",
  keywords: [
    "plombier Vaillant Bruxelles",
    "r\u00e9paration Vaillant Bruxelles",
    "remplacement chaudi\u00e8re Bruxelles",
    "installation nouveau chauffage Bruxelles",
    "plombier urgence Bruxelles",
    "partenaire certifi\u00e9 Vaillant Belgique",
    "contrat d'entretien Vaillant",
    "r\u00e9paration fuite d'eau Bruxelles",
    "installation sanitaire Bruxelles",
    "solutions de chauffage durables",
    "chauffagiste Bruxelles",
  ],
  openGraph: {
    type: "website",
    locale: "fr_BE",
    url: "https://villantloodgieter.com/fr",
    siteName: "Villant Plombier",
    title: "Plombier Vaillant Bruxelles | Villant Plombier",
    description:
      "Partenaire certifi\u00e9 Vaillant \u00e0 Bruxelles. D\u00e9pannage plombier urgence, remplacement de chaudi\u00e8re, r\u00e9paration de fuite d'eau et installation sanitaire professionnelle.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://villantloodgieter.com/fr",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Villant Plombier",
  url: "https://villant-loodgieter.be",
  email: "contact@villant-loodgieter.be",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bruxelles",
    addressCountry: "BE",
  },
  areaServed: {
    "@type": "City",
    name: "Brussels",
  },
  description:
    "Partenaire certifié Vaillant à Bruxelles. Plombier professionnel, réparation de chaudière et installation sanitaire.",
  knowsAbout: [
    "plombier Vaillant Bruxelles",
    "remplacement chaudière Bruxelles",
    "installation sanitaire Bruxelles",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/flame.svg" />
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SiteHeader lang="fr" />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
