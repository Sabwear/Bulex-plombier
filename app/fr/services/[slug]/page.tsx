import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { frServices, frServicesBySlug } from "@/data/fr-services";

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
      title: "Service introuvable | Villant Plombier",
      description: "La page service demandee est introuvable.",
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `https://villant-loodgieter.be/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://villant-loodgieter.be/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = frServicesBySlug[slug];

  if (!service) {
    notFound();
  }

  return <ServicePageTemplate service={service} allServices={frServices} />;
}
