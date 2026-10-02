import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { nlServices } from "@/data/nl-services";
import { buildLocaleAlternates } from "@/lib/seoAlternates";

export const metadata: Metadata = {
  title: "Diensten - Vaillant herstelling België | Vaillant Loodgieter",
  description:
    "Alle loodgieters- en verwarmingsdiensten in België: Vaillant herstelling, boiler vervangen, nieuwe verwarming, waterlek herstellen, sanitair installatie en onderhoudscontract.",
  keywords: [
    "Vaillant herstelling België",
    "boiler vervangen België",
    "nieuwe verwarming België",
    "waterlek herstellen België",
    "sanitair installatie België",
    "Vaillant onderhoudscontract",
  ],
  alternates: buildLocaleAlternates("/nl/diensten"),
  openGraph: {
    title: "Diensten - Vaillant herstelling België | Vaillant Loodgieter",
    description:
      "Professionele loodgieters- en verwarmingsdiensten door een gecertificeerd Vaillant partner in België.",
    url: "https://vaillant-loodgieter.com/nl/diensten",
  },
};

export default function DienstenPage() {
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
            Vaillant gecertificeerde diensten
          </span>
          <h1 style={{ marginBottom: "1rem" }}>
            Alle loodgieters- en verwarmingsdiensten in België
          </h1>
          <p style={{ fontSize: "1.1rem", maxWidth: "60ch", marginBottom: "2rem" }}>
            Voor elke interventie is er een aparte dienstpagina. U vindt er de details van de dienst, de sterke punten en een directe toegang tot de offerteaanvraag.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/nl/demande-offerte" className="btn btn-primary">
              Offerte aanvragen
            </Link>
            <Link href="/nl/contact" className="btn btn-outline">
              Contacteer een technicus
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Onze diensten</span>
            <h2 style={{ marginTop: "1rem" }}>Kies uw interventie</h2>
            <div className="divider" />
          </div>

          <div className="grid-3-strict">
            {nlServices.map((service) => (
              <Link
                key={service.slug}
                href={`/nl/diensten/${service.slug}`}
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
