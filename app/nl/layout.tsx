import type { Metadata } from "next";
import "../globals.css";
import SiteHeader from "@/components/header/SiteHeader";
import Footer from "@/components/Footer";
import Script from "next/script";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import MobileCallBar from "@/components/MobileCallBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://vaillant-loodgieter.be"),
  title: {
    default: "Vaillant loodgieter België | Vaillant Loodgieter",
    template: "%s | Vaillant Loodgieter",
  },
  description:
    "Vaillant Loodgieter – gecertificeerd Vaillant partner in België. Loodgieter spoeddienst, boiler vervangen, waterlek herstellen en sanitair installatie.",
  keywords: [
    "Vaillant loodgieter België",
    "Vaillant herstelling België",
    "boiler vervangen België",
    "nieuwe verwarming plaatsen België",
    "loodgieter spoeddienst België",
    "gecertificeerd Vaillant partner België",
    "onderhoudscontract Vaillant",
    "waterlek herstellen België",
    "sanitair installatie België",
    "duurzame verwarming oplossingen",
    "verwarmingsmonteur België",
  ],
  openGraph: {
    type: "website",
    locale: "nl_BE",
    url: "https://vaillant-loodgieter.be",
    siteName: "Vaillant Loodgieter",
    title: "Vaillant loodgieter België | Vaillant Loodgieter",
    description:
      "Gecertificeerd Vaillant partner in België. Loodgieter spoeddienst, boiler vervangen, waterlek herstellen en professionele sanitair installatie.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://vaillant-loodgieter.be",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vaillant Loodgieter",
  url: "https://vaillant-loodgieter.be",
  email: "contact@vaillant-loodgieter.be",
  address: {
    "@type": "PostalAddress",
    addressLocality: "België",
    addressCountry: "BE",
  },
  areaServed: {
    "@type": "Country",
    name: "Belgium",
  },
  description:
    "Gecertificeerd Vaillant partner in België. Professionele loodgieter, ketelreparatie en sanitair installatie.",
  knowsAbout: [
    "Vaillant loodgieter België",
    "boiler vervangen België",
    "sanitair installatie België",
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
        <main className="pb-24 md:pb-0">{children}</main>
        <Footer />
        <WhatsAppWidget />
        <MobileCallBar lang="nl" telHref="tel:023456789" />
      </body>
    </html>
  );
}
