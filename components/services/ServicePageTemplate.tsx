import Image from "next/image";
import Link from "next/link";
import type { FrService } from "@/data/fr-services";

type Locale = "fr" | "nl";

type ServicePageTemplateProps = {
  service: FrService;
  allServices: FrService[];
  locale?: Locale;
};

const COPY = {
  fr: {
    badge: "Service Vaillant Belgique",
    quote: "Demander un devis",
    allServices: "Voir tous les services",
    highlightsBadge: "Points forts",
    highlightsTitle: "Ce que ce service inclut",
    othersBadge: "Autres services",
    othersTitle: "Explorer d'autres interventions",
    quotePath: "/fr/demande-devis",
    servicesPath: "/fr/services",
  },
  nl: {
    badge: "Vaillant dienst België",
    quote: "Offerte aanvragen",
    allServices: "Alle diensten bekijken",
    highlightsBadge: "Sterke punten",
    highlightsTitle: "Wat deze dienst omvat",
    othersBadge: "Andere diensten",
    othersTitle: "Ontdek onze andere interventies",
    quotePath: "/nl/demande-offerte",
    servicesPath: "/nl/diensten",
  },
} as const;

export default function ServicePageTemplate({
  service,
  allServices,
  locale = "fr",
}: ServicePageTemplateProps) {
  const t = COPY[locale];
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
            {t.badge}
          </span>
          <h1 style={{ marginBottom: "1rem" }}>{service.title}</h1>
          <p style={{ fontSize: "1.1rem", maxWidth: "60ch", marginBottom: "2rem" }}>
            {service.short}
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href={t.quotePath} className="btn btn-primary">
              {t.quote}
            </Link>
            <Link href={t.servicesPath} className="btn btn-outline">
              {t.allServices}
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
            <span className="badge badge-gold">{t.highlightsBadge}</span>
            <h2 style={{ marginTop: "1rem" }}>{t.highlightsTitle}</h2>
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
            <span className="badge badge-blue">{t.othersBadge}</span>
            <h2 style={{ marginTop: "1rem" }}>{t.othersTitle}</h2>
            <div className="divider" />
          </div>
          <div className="grid-3-strict">
            {relatedServices.map((item) => (
              <Link
                key={item.slug}
                href={`${t.servicesPath}/${item.slug}`}
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
            <Link href={t.quotePath} className="btn btn-primary">
              {t.quote}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
