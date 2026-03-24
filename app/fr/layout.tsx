import type { Metadata } from "next";
import SiteHeader from "@/components/header/SiteHeader";
import Footer from "@/components/Footer";
import { HtmlLang } from "@/components/HtmlLang";
import Script from "next/script";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import MobileCallBar from "@/components/MobileCallBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://vaillantloodgieter.com"),
  title: {
    default: "Plombier Vaillant Belgique | Vaillant Plombier",
    template: "%s | Vaillant Plombier",
  },
  description:
    "Vaillant Plombier – partenaire certifié Vaillant en Belgique. Dépannage plombier urgence, remplacement de chaudière, réparation de fuite d'eau et installation sanitaire. Contactez-nous dès aujourd'hui.",
  keywords: [
    "plombier Vaillant Belgique",
    "réparation Vaillant Belgique",
    "remplacement chaudière Belgique",
    "installation nouveau chauffage Belgique",
    "plombier urgence Belgique",
    "partenaire certifi\u00e9 Vaillant Belgique",
    "contrat d'entretien Vaillant",
    "réparation fuite d'eau Belgique",
    "installation sanitaire Belgique",
    "solutions de chauffage durables",
    "chauffagiste Belgique",
  ],
  openGraph: {
    type: "website",
    locale: "fr_BE",
    url: "https://vaillantloodgieter.com/fr",
    siteName: "Vaillant Plombier",
    title: "Plombier Vaillant Belgique | Vaillant Plombier",
    description:
      "Partenaire certifié Vaillant en Belgique. Dépannage plombier urgence, remplacement de chaudière, réparation de fuite d'eau et installation sanitaire professionnelle.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://vaillantloodgieter.com/fr",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vaillant Plombier",
  url: "https://vaillant-loodgieter.com",
  email: "contact@vaillant-loodgieter.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Belgique",
    addressCountry: "BE",
  },
  areaServed: {
    "@type": "Country",
    name: "Belgium",
  },
  description:
    "Partenaire certifié Vaillant en Belgique. Plombier professionnel, réparation de chaudière et installation sanitaire.",
  knowsAbout: [
    "plombier Vaillant Belgique",
    "remplacement chaudière Belgique",
    "installation sanitaire Belgique",
  ],
};

export default function FrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HtmlLang lang="fr" />
      <Script
        id="json-ld-organization-fr"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader lang="fr" />
      <main className="pb-24 md:pb-0">{children}</main>
      <Footer />
      <WhatsAppWidget />
      <MobileCallBar lang="fr" />
    </>
  );
}
