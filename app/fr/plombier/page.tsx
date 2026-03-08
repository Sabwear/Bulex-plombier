import { Metadata } from "next";
import Link from "next/link";
import { getCommunes } from "@/data/types";
import styles from "./page.module.css";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Plombier Vaillant à Bruxelles — Toutes les communes | Vaillant-Loodgieter",
  description:
    "Trouvez votre plombier certifié Vaillant dans les 19 communes de Bruxelles. Dépannage, entretien et installation de chauffage et plomberie.",
  alternates: {
    canonical: "https://villant-loodgieter.be/plombier",
  },
  openGraph: {
    type: "website",
    locale: "fr_BE",
    url: "https://villant-loodgieter.be/plombier",
    siteName: "Vaillant-Loodgieter",
    title: "Plombier Vaillant à Bruxelles — Toutes les communes",
    description:
      "Trouvez votre plombier certifié Vaillant dans les 19 communes de Bruxelles.",
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
            Plombier Vaillant à Bruxelles
          </h1>
          <p className={styles.heroSub}>
            Nous intervenons dans toutes les communes de la Région de
            Bruxelles-Capitale. Trouvez votre commune ci-dessous pour
            découvrir nos services locaux.
          </p>
        </div>
      </section>

      {/* ── Communes Grid ────────────────────────────────── */}
      <section className={styles.section}>
        <div className="container">
          <div className="section-header">
            <h2>Nos zones d&apos;intervention</h2>
            <div className="divider" />
          </div>
          <div className={styles.grid}>
            {communes.map((c) => (
              <Link
                key={c.slug}
                href={`/plombier/${c.slug}`}
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
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="cta-band">
        <div className="container">
          <h2>Votre commune n&apos;est pas listée ?</h2>
          <p>
            Contactez-nous directement, nous couvrons l&apos;ensemble de la
            Région de Bruxelles-Capitale.
          </p>
          <div className="cta-actions">
            <a href="tel:+32XXXXXXXXXX" className="btn btn-primary">
              📞 Appeler
            </a>
            <Link href="/contact" className="btn btn-ghost-dark">
              📋 Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
