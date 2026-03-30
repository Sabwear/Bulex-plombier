import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { frServices } from "@/data/fr-services";
import { buildLocaleAlternates } from "@/lib/seoAlternates";

export const metadata: Metadata = {
  title: "Services - Réparation Vaillant Belgique | Vaillant Plombier",
  description:
    "Tous les services de plomberie et de chauffage en Belgique : réparation Vaillant, remplacement de chaudière, fuite d'eau, sanitaire et entretien.",
  keywords: [
    "réparation Vaillant Belgique",
    "remplacement chaudière Belgique",
    "installation chauffage Belgique",
    "réparation fuite d'eau Belgique",
    "installation sanitaire Belgique",
    "contrat d'entretien Vaillant",
  ],
  alternates: buildLocaleAlternates("/fr/services"),
  openGraph: {
    title: "Services - Réparation Vaillant Belgique | Vaillant Plombier",
    description:
      "Découvrez l'ensemble de nos services de plomberie et chauffage en Belgique.",
    url: "https://vaillant-loodgieter.com/fr/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <section
        style={{
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.55) 100%), url('/images/service/6.jpg') center/cover no-repeat",
          padding: "5rem 1.5rem 4rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container">
          <span className="badge badge-green" style={{ marginBottom: "1rem" }}>
            Services certifies Vaillant
          </span>
          <h1 style={{ marginBottom: "1rem" }}>
            Tous nos services plomberie et chauffage en Belgique
          </h1>
          <p style={{ fontSize: "1.1rem", maxWidth: "60ch", marginBottom: "2rem" }}>
            Une page de service dediee est disponible pour chaque intervention.
            Vous obtenez le detail du service, ses points forts et un acces direct
            a la demande de devis.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/demande-devis" className="btn btn-primary">
              Demander un devis
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Contacter un technicien
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Nos services</span>
            <h2 style={{ marginTop: "1rem" }}>Choisissez votre intervention</h2>
            <div className="divider" />
          </div>

          <div className="grid-3-strict">
            {frServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card"
                style={{ textDecoration: "none" }}
              >
                <div className="icon-box">
                  <Image
                    src={`/icons/plumbing-elements/${service.icon}`}
                    alt={service.title}
                    width={30}
                    height={30}
                  />
                </div>
                <span className="badge badge-gold" style={{ marginBottom: "0.5rem" }}>
                  {service.keyword}
                </span>
                <h3 style={{ marginBottom: "0.6rem", fontSize: "1.05rem" }}>
                  {service.title}
                </h3>
                <p style={{ fontSize: "0.9rem" }}>{service.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
