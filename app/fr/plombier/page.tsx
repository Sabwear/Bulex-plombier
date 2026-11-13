import { Metadata } from "next";
import Link from "next/link";
import { Phone, FileText } from "lucide-react";
import { getCities } from "@/data/city-data";
import styles from "./page.module.css";
import { buildLocaleAlternates } from "@/lib/seoAlternates";
import { getPublicPhoneTelHref } from "@/config/public-phone";

export const revalidate = 86400;

export const metadata: Metadata = {
  title:
    "Plombier Vaillant en Belgique — Bruxelles et grandes villes | vaillant Loodgieter",
  description:
    "Trouvez votre plombier certifié Vaillant en Belgique : toutes les communes de Bruxelles et les grandes villes belges. Dépannage, entretien et installation de chauffage et plomberie.",
  alternates: buildLocaleAlternates("/fr/plombier"),
  openGraph: {
    type: "website",
    locale: "fr_BE",
    url: "https://vaillant-loodgieter.com/fr/plombier",
    siteName: "vaillant Loodgieter",
    title: "Plombier Vaillant en Belgique — Bruxelles et grandes villes",
    description:
      "Plombier certifié Vaillant en Belgique : Bruxelles et principales villes belges.",
  },
};

export default function PlombierHubPage() {
  const cities = getCities("fr");

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className="badge badge-green">✓ Certifié Vaillant</span>
          <h1 className={styles.heroTitle}>
            Plombier Vaillant en Belgique
          </h1>
          <p className={styles.heroSub}>
            Nous intervenons en Belgique, avec une présence forte à Bruxelles et
            dans les principales villes du pays. Retrouvez ci-dessous toutes nos
            zones d&apos;intervention.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Belgique</span>
            <h2>Nos zones d&apos;intervention</h2>
            <div className="divider" />
            <p>
              Retrouvez ici les communes de Bruxelles-Capitale et les grandes villes
              belges que nous desservons. Cliquez sur une ville pour accéder à la page dédiée.
            </p>
          </div>
          <div className={styles.grid}>
            {cities.map((c) => (
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
            <a href={getPublicPhoneTelHref()} className="btn btn-primary" target="_blank" rel="noreferrer">
              <Phone className="w-4 h-4 mr-2" />
              <span>Appeler</span>
            </a>
            <Link href="/fr/contact" className="btn btn-ghost-dark">
              <FileText className="w-4 h-4 mr-2" />
              <span>Demander un devis</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
