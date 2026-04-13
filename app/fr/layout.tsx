import type { Metadata } from "next";
import SiteHeader from "@/components/header/SiteHeader";
import Footer from "@/components/Footer";
import { HtmlLang } from "@/components/HtmlLang";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import MobileCallBar from "@/components/MobileCallBar";
import { buildLocaleJsonLdGraph } from "@/lib/schema-org";

const ogImage = {
  url: "/images/slider-vaillant-1.png",
  width: 1920,
  height: 1080,
  alt: "Technicien Vaillant en intervention en Belgique",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vaillant-loodgieter.com"),
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
    url: "https://vaillant-loodgieter.com/fr",
    siteName: "Vaillant Plombier",
    title: "Plombier Vaillant Belgique | Vaillant Plombier",
    description:
      "Partenaire certifié Vaillant en Belgique. Dépannage plombier urgence, remplacement de chaudière, réparation de fuite d'eau et installation sanitaire professionnelle.",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plombier Vaillant Belgique | Vaillant Plombier",
    description:
      "Partenaire certifié Vaillant en Belgique. Dépannage plombier urgence, remplacement de chaudière, réparation de fuite d'eau et installation sanitaire professionnelle.",
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = buildLocaleJsonLdGraph("fr");

export default function FrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HtmlLang lang="fr" />
      <script
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
