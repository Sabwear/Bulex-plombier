import type { Metadata } from "next";
import SiteHeader from "@/components/header/SiteHeader";
import Footer from "@/components/Footer";
import { HtmlLang } from "@/components/HtmlLang";
import Script from "next/script";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import MobileCallBar from "@/components/MobileCallBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://vaillant-loodgieter.com"),
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
    url: "https://vaillant-loodgieter.com",
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vaillant Loodgieter",
  url: "https://vaillant-loodgieter.com",
  email: "contact@vaillant-loodgieter.com",
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

export default function NlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HtmlLang lang="nl" />
      <Script
        id="json-ld-organization-nl"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader lang="nl" />
      <main className="pb-24 md:pb-0">{children}</main>
      <Footer />
      <WhatsAppWidget />
      <MobileCallBar lang="nl" />
    </>
  );
}
