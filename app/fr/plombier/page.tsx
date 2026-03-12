import { Metadata } from "next";
import Link from "next/link";
import { getCommunes } from "@/data/types";
import styles from "./page.module.css";

export const revalidate = 86400;

export const metadata: Metadata = {
  title:
    "Plombier Vaillant en Belgique — Bruxelles et grandes villes | Vaillant-Loodgieter",
  description:
    "Trouvez votre plombier certifié Vaillant en Belgique : toutes les communes de Bruxelles et les grandes villes belges. Dépannage, entretien et installation de chauffage et plomberie.",
  alternates: {
    canonical: "https://villant-loodgieter.be/fr/plombier",
  },
  openGraph: {
    type: "website",
    locale: "fr_BE",
    url: "https://villant-loodgieter.be/fr/plombier",
    siteName: "Vaillant-Loodgieter",
    title: "Plombier Vaillant en Belgique — Bruxelles et grandes villes",
    description:
      "Plombier certifié Vaillant en Belgique : Bruxelles et principales villes belges.",
  },
};

export default function PlombierHubPage() {
  const communes = getCommunes();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className="badge badge-green">✓ Certifié Vaillant</span>
          <h1 className={styles.heroTitle}>
            Plombier Vaillant en Belgique
          </h1>
          <p className={styles.heroSub}>
            Nous intervenons en Belgique, avec une présence forte à Bruxelles et
            dans les principales villes du pays. Retrouvez ci-dessous les 19
            communes bruxelloises et nos pages dédiées aux grandes villes
            belges.
          </p>
        </div>
      </section>

      {/* ── Communes Grid ────────────────────────────────── */}
      <section className={styles.section}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Belgique</span>
            <h2>Nos zones d&apos;intervention</h2>
            <div className="divider" />
            <p>
              Retrouvez ici les 19 communes de la Région de Bruxelles-Capitale dans lesquelles
              nos plombiers Vaillant interviennent, ainsi qu&apos;un aperçu des grandes villes
              belges que nous desservons.
            </p>
          </div>
          <div className={styles.grid}>
            {communes.map((c) => (
              <Link
                key={c.slug}
                href={`/fr/plombier/${c.slug}`}
                className={styles.communeCard}
              >
                <div className={styles.communeHeader}>
                  <h3 className={styles.communeName}>{c.name}</h3>
                  {c.postal_code && (
                    <span className={styles.postalCode}>{c.postal_code}</span>
                  )}
                </div>
                <p className={styles.communeSnippet}>
                  {c.response_time_minutes
                    ? `Intervention en ~${c.response_time_minutes} min`
                    : "Temps d'intervention à confirmer"}
                  {c.services.length > 0 &&
                    ` · ${c.services.length} services disponibles`}
                </p>
                <span className={styles.communeArrow}>
                  Voir les détails →
                </span>
              </Link>
            ))}
          </div>

          {/* Aperçu des grandes villes belges */}
          <div style={{ marginTop: "3rem" }}>
            <h3 style={{ marginBottom: "0.75rem" }}>
              Grandes villes desservies en Belgique
            </h3>
            <p style={{ marginBottom: "1rem", maxWidth: "60ch" }}>
              En plus de Bruxelles, nos plombiers Vaillant interviennent également dans plusieurs
              grandes villes belges. Sélectionnez une ville pour accéder à la page dédiée :
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {[
                { label: "Bruxelles", href: "/fr/plombier-bruxelles" },
                { label: "Anvers", href: "/fr/plombier-anvers" },
                { label: "Gand", href: "/fr/plombier-gand" },
                { label: "Charleroi", href: "/fr/plombier-charleroi" },
                { label: "Liège", href: "/fr/plombier-liege" },
                { label: "Bruges", href: "/fr/plombier-bruges" },
                { label: "Namur", href: "/fr/plombier-namur" },
                { label: "Louvain", href: "/fr/plombier-louvain" },
                { label: "Hasselt", href: "/fr/plombier-hasselt" },
                { label: "Mons", href: "/fr/plombier-mons" },
              ].map((city) => (
                <Link key={city.href} href={city.href} className="area-chip">
                  {city.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="cta-band">
        <div className="container">
          <h2>Votre commune ou ville n&apos;est pas listée ?</h2>
          <p>
            Contactez-nous directement : nous intervenons dans Bruxelles et dans de
            nombreuses villes et régions de Belgique, même si elles ne figurent pas
            encore sur cette page.
          </p>
          <div className="cta-actions">
            <a href="tel:+32XXXXXXXXXX" className="btn btn-primary">
              📞 Appeler
            </a>
            <Link href="/fr/contact" className="btn btn-ghost-dark">
              📋 Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
