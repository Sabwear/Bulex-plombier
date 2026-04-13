import type { Metadata } from "next";
import SiteHeader from "@/components/header/SiteHeader";
import Footer from "@/components/Footer";
import { HtmlLang } from "@/components/HtmlLang";
import Script from "next/script";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import MobileCallBar from "@/components/MobileCallBar";
import { buildLocaleJsonLdGraph } from "@/lib/schema-org";

const ogImage = {
  url: "/images/slider-vaillant-1.png",
  width: 1920,
  height: 1080,
  alt: "Vaillant technieker aan het werk in België",
};

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
    url: "https://vaillant-loodgieter.com/nl",
    siteName: "Vaillant Loodgieter",
    title: "Vaillant loodgieter België | Vaillant Loodgieter",
    description:
      "Gecertificeerd Vaillant partner in België. Loodgieter spoeddienst, boiler vervangen, waterlek herstellen en professionele sanitair installatie.",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaillant loodgieter België | Vaillant Loodgieter",
    description:
      "Gecertificeerd Vaillant partner in België. Loodgieter spoeddienst, boiler vervangen, waterlek herstellen en professionele sanitair installatie.",
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = buildLocaleJsonLdGraph("nl");

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
