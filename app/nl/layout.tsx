import type { Metadata } from "next";
import "../globals.css";
import SiteHeader from "@/components/header/SiteHeader";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://villant-loodgieter.be"),
  title: {
    default: "Vaillant loodgieter Brussel | Villant Loodgieter",
    template: "%s | Villant Loodgieter",
  },
  description:
    "Villant Loodgieter – gecertificeerd Vaillant partner in Brussel. Loodgieter spoeddienst Brussel, boiler vervangen, waterlek herstellen en sanitair installatie.",
  keywords: [
    "Vaillant loodgieter Brussel",
    "Vaillant herstelling Brussel",
    "boiler vervangen Brussel",
    "nieuwe verwarming plaatsen Brussel",
    "loodgieter spoeddienst Brussel",
    "gecertificeerd Vaillant partner België",
    "onderhoudscontract Vaillant",
    "waterlek herstellen Brussel",
    "sanitair installatie Brussel",
    "duurzame verwarming oplossingen",
    "verwarmingsmonteur Brussel",
  ],
  openGraph: {
    type: "website",
    locale: "nl_BE",
    url: "https://villant-loodgieter.be",
    siteName: "Villant Loodgieter",
    title: "Vaillant loodgieter Brussel | Villant Loodgieter",
    description:
      "Gecertificeerd Vaillant partner in Brussel. Loodgieter spoeddienst, boiler vervangen, waterlek herstellen en professionele sanitair installatie.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://villant-loodgieter.be",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Villant Loodgieter",
  url: "https://villant-loodgieter.be",
  email: "contact@villant-loodgieter.be",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Brussel",
    addressCountry: "BE",
  },
  areaServed: {
    "@type": "City",
    name: "Brussels",
  },
  description:
    "Gecertificeerd Vaillant partner in Brussel. Professionele loodgieter, ketelreparatie en sanitair installatie.",
  knowsAbout: [
    "Vaillant loodgieter Brussel",
    "boiler vervangen Brussel",
    "sanitair installatie Brussel",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <head>
        <link rel="icon" href="/flame.svg" />
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SiteHeader lang="nl" />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
