import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { frServices, frServicesBySlug } from "@/data/fr-services";
import { buildLocaleAlternates } from "@/lib/seoAlternates";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return frServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = frServicesBySlug[slug];

  if (!service) {
    return {
      title: "Service introuvable | vaillant Plombier",
      description: "La page service demandee est introuvable.",
    };
  }

  const pathname = `/fr/services/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: buildLocaleAlternates(pathname),
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://vaillant-loodgieter.com${pathname}`,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = frServicesBySlug[slug];

  if (!service) {
    notFound();
  }

  const baseUrl = "https://vaillant-loodgieter.com";
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.keyword,
    description: service.metaDescription || service.short,
    url: `${baseUrl}/fr/services/${service.slug}`,
    inLanguage: "fr-BE",
    provider: {
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/#localbusiness`,
      name: "Vaillant Plombier",
    },
    areaServed: { "@type": "Country", name: "Belgium" },
  };

  return (
    <>
      <Script
        id="service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ServicePageTemplate service={service} allServices={frServices} locale="fr" />
    </>
  );
}
