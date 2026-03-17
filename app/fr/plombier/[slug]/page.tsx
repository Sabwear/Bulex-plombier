import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import {
  Phone,
  FileText,
  Wrench,
  AlertTriangle,
  Landmark,
  MapPin,
  CheckCircle2,
  Flame,
  Zap,
  Thermometer,
  Droplets,
} from "lucide-react";
import { getCityBySlug, getAllSlugsFr } from "@/data/city-data";
import {
  getInterventionExamples,
  getWhyChooseBullets,
  getTestimonials,
  getLocalGuide,
} from "@/data/content-helpers";
import type { Commune } from "@/data/types";
import styles from "./page.module.css";

export const revalidate = 86400;

const introVariants: ((c: Commune) => string)[] = [
  (c) =>
    `Vous recherchez un plombier certifié Vaillant à ${c.name} ? Notre équipe intervient rapidement dans votre commune${c.nearby_landmarks.length ? `, à proximité de ${c.nearby_landmarks[0]}` : ""}, pour tous vos travaux de plomberie et de chauffage.`,
  (c) =>
    `À ${c.name}, nos techniciens certifiés Vaillant assurent le dépannage, l'entretien et l'installation de vos équipements de plomberie et de chauffage.${c.building_profile ? ` Nous connaissons les spécificités des ${c.building_profile.toLowerCase()}.` : ""}`,
  (c) =>
    `Besoin d'un plombier à ${c.name} ? Vaillant-Loodgieter est votre partenaire local pour la réparation, l'entretien et le remplacement de chaudières Vaillant${c.response_time_minutes ? `, avec un temps d'intervention estimé à ${c.response_time_minutes} minutes` : ""}.`,
  (c) =>
    `Notre entreprise de plomberie intervient à ${c.name} pour tous types de travaux : dépannage urgent, entretien de chaudière et installation sanitaire.${c.common_issues.length ? ` Nous traitons notamment les ${c.common_issues[0].toLowerCase()}.` : ""}`,
  (c) =>
    `Plombier agréé Vaillant à ${c.name}, nous mettons notre expertise au service des habitants de votre commune.${c.nearby_landmarks.length >= 2 ? ` Que vous soyez proche de ${c.nearby_landmarks[0]} ou de ${c.nearby_landmarks[1]}, nous arrivons rapidement.` : ""}`,
  (c) =>
    `Vaillant-Loodgieter dessert ${c.name} avec des techniciens qualifiés pour le chauffage et la plomberie.${c.building_profile ? ` Les ${c.building_profile.toLowerCase()} de la commune requièrent une expertise spécifique que nous maîtrisons.` : ""}`,
  (c) =>
    `Faites confiance à notre équipe de plombiers certifiés Vaillant pour vos interventions à ${c.name}.${c.distance_minutes ? ` Situé à environ ${c.distance_minutes} minutes de votre commune, nous assurons un service rapide et professionnel.` : ""}`,
  (c) =>
    `À ${c.name}, Vaillant-Loodgieter est votre référence en plomberie et chauffage. Nos techniciens interviennent pour le dépannage, la maintenance et les nouvelles installations.`,
];

function getIntro(commune: Commune): string {
  let hash = 0;
  for (let i = 0; i < commune.slug.length; i++) {
    hash = (hash * 31 + commune.slug.charCodeAt(i)) | 0;
  }
  return introVariants[Math.abs(hash) % introVariants.length](commune);
}

function buildJsonLd(commune: Commune, basePath: string) {
  const baseUrl = "https://vaillant-loodgieter.be";
  const url = `${baseUrl}${basePath}/${commune.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "Plumber"],
      name: "Vaillant-Loodgieter",
      url,
      telephone: "+32-XXX-XX-XX-XX",
      description: `Plombier Vaillant certifié à ${commune.name}. Dépannage, entretien et installation de chauffage et plomberie.`,
      areaServed: { "@type": "City", name: commune.name },
      serviceArea: { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", addressCountry: "BE" } },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Plombier à ${commune.name}`,
      provider: { "@type": "LocalBusiness", name: "Vaillant-Loodgieter" },
      areaServed: { "@type": "City", name: commune.name },
      serviceType: "Plumbing",
    },
  ];
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugsFr().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const commune = getCityBySlug("fr", slug);
  if (!commune) return {};
  const baseUrl = "https://vaillant-loodgieter.be";
  let desc = `Plombier Vaillant certifié à ${commune.name}.`;
  if (commune.nearby_landmarks.length > 0) desc += ` Intervention rapide près de ${commune.nearby_landmarks[0]}.`;
  if (commune.common_issues.length > 0) desc += ` ${commune.common_issues[0]}.`;
  return {
    title: `Plombier Vaillant certifié à ${commune.name} | vaillant Loodgieter`,
    description: desc,
    alternates: { canonical: `${baseUrl}/fr/plombier/${commune.slug}` },
    openGraph: {
      type: "website",
      locale: "fr_BE",
      url: `${baseUrl}/fr/plombier/${commune.slug}`,
      siteName: "vaillant Loodgieter",
      title: `Plombier Vaillant certifié à ${commune.name}`,
      description: desc,
    },
  };
}

export default async function PlombierSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const commune = getCityBySlug("fr", slug);
  if (!commune) notFound();

  const allSlugs = getAllSlugsFr();
  const validNearbySlugs = commune.nearby_communes.filter((s) => allSlugs.includes(s));
  const jsonLdItems = buildJsonLd(commune, "/fr/plombier");
  const interventionExamples = getInterventionExamples(commune, "fr");
  const whyChooseBullets = getWhyChooseBullets(commune, "fr");
  const testimonials = getTestimonials(commune, "fr");
  const localGuide = getLocalGuide(commune, "fr");

  return (
    <>
      {jsonLdItems.map((item, i) => (
        <Script key={i} id={`json-ld-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className="badge badge-green">✓ Certifié Vaillant</span>
          <h1 className={styles.heroTitle}>Plombier Vaillant certifié à {commune.name}</h1>
          <p className={styles.heroIntro}>{getIntro(commune)}</p>
          <div className={styles.heroActions}>
            <a href="tel:+32XXXXXXXXXX" className="btn btn-primary">
              <Phone className="w-4 h-4 mr-2" />
              <span>Appeler</span>
            </a>
            <Link href="/fr/contact" className="btn btn-outline">
              <FileText className="w-4 h-4 mr-2" />
              <span>Demander un devis</span>
            </Link>
          </div>
          <div className={styles.quickStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{commune.response_time_minutes ? `~${commune.response_time_minutes} min` : "À confirmer"}</span>
              <span className={styles.statLabel}>Temps d&apos;intervention</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{commune.distance_minutes ? `~${commune.distance_minutes} min` : "À confirmer"}</span>
              <span className={styles.statLabel}>Distance</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>7j/7</span>
              <span className={styles.statLabel}>Disponibilité</span>
            </div>
          </div>
        </div>
      </section>

      {commune.services.length > 0 && (
        <section className={styles.section}>
          <div className="container">
            <div className="section-header">
              <h2>Services à {commune.name}</h2>
              <div className="divider" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {commune.services.map((service) => (
                <div key={service} className={styles.serviceCard}>
                  <span className={styles.serviceIcon}>
                    <Wrench className="w-4 h-4" />
                  </span>
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {commune.common_issues.length > 0 && (
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <div className="section-header">
              <h2>Problèmes fréquents à {commune.name}</h2>
              <div className="divider" />
            </div>
            <div className={styles.issuesList}>
              {commune.common_issues.map((issue) => (
                <div key={issue} className={styles.issueItem}>
                  <span className={styles.issueIcon}>
                    <AlertTriangle className="w-4 h-4" />
                  </span>
                  <div>
                    <p className={styles.issueText}>{issue}</p>
                    <p className={styles.issueCta}>Nos techniciens certifiés interviennent rapidement pour résoudre ce type de problème.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.section}>
        <div className="container">
          <div className={`grid grid-cols-1 ${commune.building_profile ? "lg:grid-cols-2" : "max-w-[700px] mx-auto"} gap-8 items-stretch`}>
            {commune.building_profile && (
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm flex flex-col h-full border-t-4 border-t-primary">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Profil des bâtiments</h2>
                  <div className="w-12 h-1 bg-primary rounded-full" />
                </div>
                <div className="flex gap-6 items-start flex-1">
                  <span className="text-4xl shrink-0 text-primary">
                    <Landmark className="w-10 h-10" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Types de bâtiments à {commune.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{commune.building_profile}</p>
                  </div>
                </div>
              </div>
            )}
            <div className={`bg-white border border-gray-200 rounded-xl p-8 shadow-sm flex flex-col h-full border-t-4 border-t-primary ${!commune.building_profile ? "text-center items-center" : ""}`}>
              <div className={`mb-6 ${!commune.building_profile ? "flex flex-col items-center" : ""}`}>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Temps d&apos;intervention estimé</h2>
                <div className="w-12 h-1 bg-primary rounded-full" />
              </div>
              <div className="flex flex-col justify-center flex-1">
                <div className={`text-4xl font-bold text-primary mb-4 ${!commune.building_profile ? "text-5xl" : ""}`}>
                  {commune.response_time_minutes ? `~${commune.response_time_minutes} min` : "À confirmer"}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {commune.response_time_minutes
                    ? `Nos techniciens arrivent en moyenne en ${commune.response_time_minutes} minutes à ${commune.name}. Ce délai peut varier selon la disponibilité et les conditions de circulation.`
                    : `Le temps d'intervention exact pour ${commune.name} est en cours d'évaluation. Contactez-nous pour une estimation personnalisée.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {commune.nearby_landmarks.length > 0 && (
        <section className={styles.section}>
          <div className="container">
            <div className="section-header">
              <h2>Points de repère</h2>
              <div className="divider" />
            </div>
            <p className={styles.landmarksIntro}>
              Nous intervenons dans tout {commune.name}, notamment à proximité de :
            </p>
            <div className={styles.landmarksGrid}>
              {commune.nearby_landmarks.map((landmark) => (
                <div key={landmark} className={styles.landmarkChip}>
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{landmark}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {commune.faq.length > 0 && (
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <div className="section-header">
              <h2>Questions fréquentes — {commune.name}</h2>
              <div className="divider" />
            </div>
            <div className={styles.faqList}>
              {commune.faq.map((item, i) => (
                <details key={i} className="faq-item">
                  <summary>{item.q}</summary>
                  <div className="faq-answer"><p>{item.a}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {validNearbySlugs.length > 0 && (
        <section className={styles.section}>
          <div className="container">
            <div className="section-header">
              <h2>Zones proches</h2>
              <div className="divider" />
            </div>
            <p className={styles.nearbyIntro}>Nous desservons également les communes voisines de {commune.name} :</p>
            <div className={styles.nearbyGrid}>
              {validNearbySlugs.map((s) => {
                const nearby = getCityBySlug("fr", s);
                if (!nearby) return null;
                return (
                  <Link key={s} href={`/fr/plombier/${s}`} className={styles.nearbyCard}>
                    <span className={styles.nearbyName}>{nearby.name}</span>
                    <span className={styles.nearbyArrow}>→</span>
                  </Link>
                );
              })}
            </div>
            <p className={styles.hubLink}>
              <Link href="/fr/plombier">← Voir toutes les communes desservies</Link>
            </p>
          </div>
        </section>
      )}

      {validNearbySlugs.length > 0 && (
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <div className="section-header">
              <h2>Plombier dans les villes voisines</h2>
              <div className="divider" />
            </div>
            <div className={styles.quartiersChips}>
              {validNearbySlugs.map((s) => {
                const nearby = getCityBySlug("fr", s);
                if (!nearby) return null;
                return (
                  <Link key={s} href={`/fr/plombier/${s}`} className={styles.quartiersChip}>
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>Plombier à {nearby.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className="section-header">
            <h2>Interventions récentes à {commune.name}</h2>
            <div className="divider" />
          </div>
          <div className={styles.interventionGrid}>
            {interventionExamples.map((ex, i) => (
              <div key={i} className={styles.interventionCard}>
                <div className={styles.interventionRow}>
                  <span className={styles.interventionLabel}>Problème</span>
                  <span className={styles.interventionValue}>{ex.problem}</span>
                </div>
                <div className={styles.interventionRow}>
                  <span className={styles.interventionLabel}>Solution</span>
                  <span className={styles.interventionValue}>{ex.solution}</span>
                </div>
                <div className={styles.interventionRow}>
                  <span className={styles.interventionLabel}>Zone</span>
                  <span className={styles.interventionValue}>{ex.zone}</span>
                </div>
                <p className={styles.interventionDesc}>{ex.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className="section-header">
            <h2>Pourquoi choisir notre plombier Vaillant à {commune.name}</h2>
            <div className="divider" />
          </div>
          <ul className={styles.whyChooseList}>
            {whyChooseBullets.map((bullet, i) => (
              <li key={i} className={styles.whyChooseItem}>
                <span className={styles.whyChooseIcon}>
                  <CheckCircle2 className="w-4 h-4" />
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className="section-header">
            <h2>Spécialiste chaudières Vaillant à {commune.name}</h2>
            <div className="divider" />
          </div>
          <div className={styles.expertiseBlock}>
            <div className={styles.expertiseContent}>
              <p>
                En tant que partenaire certifié Vaillant à {commune.name}, nous maîtrisons l&apos;ensemble de la gamme : chaudières murales ecoTEC, turboTEC, systèmes à condensation et pompes à chaleur.
              </p>
              <ul className={styles.expertiseList}>
                <li><strong>Installation</strong> — Mise en place et mise en service de chaudières Vaillant neuves</li>
                <li><strong>Réparation</strong> — Diagnostic et résolution de pannes sur tous modèles Vaillant</li>
                <li><strong>Entretien</strong> — Contrôle annuel obligatoire, nettoyage et optimisation des performances</li>
                <li><strong>Codes erreur</strong> — Interprétation et résolution des codes F.XX spécifiques aux chaudières Vaillant</li>
              </ul>
            </div>
            <div className={styles.expertiseImage}>
              <Image src="https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=800" alt={`Installation chaudière Vaillant à ${commune.name}`} fill sizes="(max-width: 768px) 100vw, 400px" className={styles.image} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className="section-header">
            <h2>Plomberie et chauffage à {commune.name}</h2>
            <div className="divider" />
          </div>
          <div className={styles.guideBlock}>
            <div className={styles.guideContent}><p>{localGuide}</p></div>
            <div className={styles.guideImage}>
              <Image src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=800" alt={`Service de plomberie et chauffage à ${commune.name}`} fill sizes="(max-width: 768px) 100vw, 400px" className={styles.image} />
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className="section-header">
            <h2>Avis clients à {commune.name}</h2>
            <div className="divider" />
          </div>
          <div className="grid-3">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p style={{ fontStyle: "italic", fontSize: "var(--text-sm)", lineHeight: "var(--leading-relaxed)" }}>&quot;{t.text}&quot;</p>
                <div className="testimonial-author">— Client à {commune.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className="section-header">
            <h2>Quand appeler un plombier à {commune.name} ?</h2>
            <div className="divider" />
          </div>
          <p className={styles.whenCallIntro}>Certaines situations nécessitent l&apos;intervention immédiate d&apos;un professionnel. Contactez-nous si vous constatez :</p>
          <ul className={styles.whenCallList}>
            <li className={styles.whenCallItem}>
              <span className={styles.whenCallIcon}><Image src="/icons/plumbing-elements/water-heater.svg" alt="Panne chaudière" width={24} height={24} /></span>
              <span>Votre chaudière ne démarre plus ou s&apos;arrête de façon répétée</span>
            </li>
            <li className={styles.whenCallItem}>
              <span className={styles.whenCallIcon}><Image src="/icons/plumbing-elements/water-1.svg" alt="Fuite d'eau" width={24} height={24} /></span>
              <span>Une fuite d&apos;eau visible ou des traces d&apos;humidité anormales</span>
            </li>
            <li className={styles.whenCallItem}>
              <span className={styles.whenCallIcon}><Image src="/icons/plumbing-elements/gauge.svg" alt="Pression basse" width={24} height={24} /></span>
              <span>La pression de votre chaudière chute en dessous de 1 bar</span>
            </li>
            <li className={styles.whenCallItem}>
              <span className={styles.whenCallIcon}><Image src="/icons/plumbing-elements/radiator.svg" alt="Radiateur froid" width={24} height={24} /></span>
              <span>Des radiateurs restent froids malgré le chauffage en marche</span>
            </li>
            <li className={styles.whenCallItem}>
              <span className={styles.whenCallIcon}><Image src="/icons/plumbing-elements/shower.svg" alt="Pas d'eau chaude" width={24} height={24} /></span>
              <span>Plus d&apos;eau chaude ou une eau chaude intermittente</span>
            </li>
            <li className={styles.whenCallItem}>
              <span className={styles.whenCallIcon}><Image src="/icons/plumbing-elements/plunger.svg" alt="Débouchage" width={24} height={24} /></span>
              <span>Des canalisations bouchées ou un écoulement très lent</span>
            </li>
          </ul>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className="section-header">
            <h2>Quartiers desservis à {commune.name}</h2>
            <div className="divider" />
          </div>
          <div className={styles.quartiersBlock}>
            <p>
              Nos techniciens couvrent l&apos;intégralité de la commune de {commune.name}, sans exception.
              {commune.nearby_landmarks.length > 0 && ` Que vous habitiez à proximité de ${commune.nearby_landmarks.slice(0, 3).join(", ")} ou dans un autre quartier, nous intervenons rapidement.`}
            </p>
            {commune.nearby_landmarks.length > 0 && (
              <div className={styles.quartiersChips}>
                {commune.nearby_landmarks.map((lm) => (
                  <span key={lm} className={styles.quartiersChip}>📍 {lm}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className="section-header">
            <h2>Notre zone d&apos;intervention à {commune.name}</h2>
            <div className="divider" />
          </div>
          <div className={styles.mapZoneBlock}>
            <p>
              Vaillant-Loodgieter couvre l&apos;ensemble de {commune.name}{commune.postal_code ? ` (${commune.postal_code})` : ""} et ses environs.
              {commune.distance_minutes ? ` Notre base se situe à environ ${commune.distance_minutes} minutes de la commune.` : " Contactez-nous pour connaître le délai d'intervention dans votre quartier."}
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className="section-header">
            <h2>Services liés</h2>
            <div className="divider" />
          </div>
          <ul className={styles.relatedList}>
            <li className={styles.relatedItem}>
              <Link href="/fr/services">
                <span className="inline-flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  <span>Entretien chaudière Bruxelles</span>
                </span>
                <span className={styles.relatedDesc}> — Contrôle annuel et optimisation de votre installation Vaillant</span>
              </Link>
            </li>
            <li className={styles.relatedItem}>
              <Link href="/fr/services">
                <span className="inline-flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Dépannage chauffage Bruxelles</span>
                </span>
                <span className={styles.relatedDesc}> — Intervention rapide pour toute panne de chauffage</span>
              </Link>
            </li>
            <li className={styles.relatedItem}>
              <Link href="/fr/services">
                <span className="inline-flex items-center gap-2">
                  <Thermometer className="w-4 h-4" />
                  <span>Installation thermostat intelligent</span>
                </span>
                <span className={styles.relatedDesc}> — Thermostat connecté compatible Vaillant</span>
              </Link>
            </li>
            <li className={styles.relatedItem}>
              <Link href="/fr/services">
                <span className="inline-flex items-center gap-2">
                  <Droplets className="w-4 h-4" />
                  <span>Réparation fuite d&apos;eau</span>
                </span>
                <span className={styles.relatedDesc}> — Localisation et réparation de fuites dans tout Bruxelles</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Besoin d&apos;un plombier à {commune.name} ?</h2>
          <p>Contactez-nous dès maintenant pour un dépannage rapide ou un devis gratuit.</p>
          <div className="cta-actions">
            <a href="tel:+32XXXXXXXXXX" className="btn btn-primary">
              <Phone className="w-4 h-4 mr-2" />
              <span>Appeler maintenant</span>
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
