import Image from "next/image";
import Link from "next/link";
import type { FrService } from "@/data/fr-services";

type ServicePageTemplateProps = {
  service: FrService;
  allServices: FrService[];
};

export default function ServicePageTemplate({
  service,
  allServices,
}: ServicePageTemplateProps) {
  const relatedServices = allServices.filter((item) => item.slug !== service.slug);

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
            Service Vaillant Bruxelles
          </span>
          <h1 style={{ marginBottom: "1rem" }}>{service.title}</h1>
          <p style={{ fontSize: "1.1rem", maxWidth: "60ch", marginBottom: "2rem" }}>
            {service.short}
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/demande-devis" className="btn btn-primary">
              Demander un devis
            </Link>
            <Link href="/services" className="btn btn-outline">
              Voir tous les services
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: "920px" }}>
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-sm)",
              padding: "2rem",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                background: "var(--color-primary-light)",
                borderRadius: "var(--radius)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
                border: "1px solid var(--color-primary-mid)",
              }}
            >
              <Image
                src={`/icons/plumbing-elements/${service.icon}`}
                alt={service.title}
                width={36}
                height={36}
              />
            </div>
            <span className="badge badge-blue" style={{ marginBottom: "0.75rem" }}>
              {service.keyword}
            </span>
            <h2 style={{ marginTop: "0.8rem", marginBottom: "1rem" }}>{service.title}</h2>
            {service.body.map((paragraph) => (
              <p key={paragraph} style={{ marginBottom: "1rem", lineHeight: 1.75 }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-secondary)" }}>
        <div className="container" style={{ maxWidth: "920px" }}>
          <div className="section-header">
            <span className="badge badge-gold">Points forts</span>
            <h2 style={{ marginTop: "1rem" }}>Ce que ce service inclut</h2>
            <div className="divider" />
          </div>
          <div className="grid-3-strict">
            {service.highlights.map((highlight) => (
              <div key={highlight} className="card">
                <div className="icon-box">✓</div>
                <h3 style={{ fontSize: "1rem", marginBottom: "0.4rem" }}>{highlight}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: "980px" }}>
          <div className="section-header">
            <span className="badge badge-blue">Autres services</span>
            <h2 style={{ marginTop: "1rem" }}>Explorer d'autres interventions</h2>
            <div className="divider" />
          </div>
          <div className="grid-3-strict">
            {relatedServices.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="card"
                style={{ textDecoration: "none" }}
              >
                <div className="icon-box">
                  <Image
                    src={`/icons/plumbing-elements/${item.icon}`}
                    alt={item.title}
                    width={28}
                    height={28}
                  />
                </div>
                <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>{item.title}</h3>
                <p style={{ fontSize: "0.9rem" }}>{item.short}</p>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <Link href="/demande-devis" className="btn btn-primary">
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
