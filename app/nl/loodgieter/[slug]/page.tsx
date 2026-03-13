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
import { getCityBySlug, getAllSlugsNl } from "@/data/city-data";
import {
  getInterventionExamples,
  getWhyChooseBullets,
  getTestimonials,
  getLocalGuide,
} from "@/data/content-helpers";
import type { Commune } from "@/data/types";
import styles from "@/app/fr/plombier/[slug]/page.module.css";

export const revalidate = 86400;

const introVariantsNl: ((c: Commune) => string)[] = [
  (c) =>
    `Zoekt u een gecertificeerde Vaillant loodgieter in ${c.name}? Ons team grijpt snel in${c.nearby_landmarks.length ? `, in de buurt van ${c.nearby_landmarks[0]}` : ""}, voor al uw loodgieterij- en verwarmingswerken.`,
  (c) =>
    `In ${c.name} verzorgen onze gecertificeerde Vaillant monteurs herstelling, onderhoud en installatie van uw sanitair en verwarming.${c.building_profile ? ` We kennen de specifieke kenmerken van ${c.building_profile.toLowerCase()}.` : ""}`,
  (c) =>
    `Heeft u een loodgieter nodig in ${c.name}? Vaillant-Loodgieter is uw lokale partner voor reparatie, onderhoud en vervanging van Vaillant-ketels${c.response_time_minutes ? `, met een geschatte interventietijd van ${c.response_time_minutes} minuten` : ""}.`,
  (c) =>
    `Ons loodgietersbedrijf grijpt in ${c.name} in voor alle soorten werken: spoedherstel, ketelonderhoud en sanitair.${c.common_issues.length ? ` We behandelen onder meer ${c.common_issues[0].toLowerCase()}.` : ""}`,
  (c) =>
    `Erkend Vaillant loodgieter in ${c.name}: we zetten onze expertise in voor de inwoners.${c.nearby_landmarks.length >= 2 ? ` Of u nu bij ${c.nearby_landmarks[0]} of ${c.nearby_landmarks[1]} woont, we zijn er snel.` : ""}`,
  (c) =>
    `Vaillant-Loodgieter bedient ${c.name} met gekwalificeerde monteurs voor verwarming en loodgieterij.${c.building_profile ? ` De ${c.building_profile.toLowerCase()} in de gemeente vereisen specifieke expertise die wij beheersen.` : ""}`,
  (c) =>
    `Vertrouw op ons team gecertificeerde Vaillant loodgieters voor uw interventies in ${c.name}.${c.distance_minutes ? ` Ongeveer ${c.distance_minutes} minuten van uw gemeente zorgen we voor een snelle, professionele service.` : ""}`,
  (c) =>
    `In ${c.name} is Vaillant-Loodgieter uw referentie voor loodgieterij en verwarming. Onze monteurs zorgen voor herstel, onderhoud en nieuwe installaties.`,
];

function getIntroNl(commune: Commune): string {
  let hash = 0;
  for (let i = 0; i < commune.slug.length; i++) {
    hash = (hash * 31 + commune.slug.charCodeAt(i)) | 0;
  }
  return introVariantsNl[Math.abs(hash) % introVariantsNl.length](commune);
}

function buildJsonLd(commune: Commune, basePath: string) {
  const baseUrl = "https://villant-loodgieter.be";
  const url = `${baseUrl}${basePath}/${commune.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "Plumber"],
      name: "Vaillant-Loodgieter",
      url,
      telephone: "+32-XXX-XX-XX-XX",
      description: `Vaillant loodgieter in ${commune.name}. Herstelling, onderhoud en installatie van verwarming en loodgieterij.`,
      areaServed: { "@type": "City", name: commune.name },
      serviceArea: { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", addressCountry: "BE" } },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Loodgieter in ${commune.name}`,
      provider: { "@type": "LocalBusiness", name: "Vaillant-Loodgieter" },
      areaServed: { "@type": "City", name: commune.name },
      serviceType: "Plumbing",
    },
  ];
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugsNl().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const commune = getCityBySlug("nl", slug);
  if (!commune) return {};
  const baseUrl = "https://villant-loodgieter.be";
  let desc = `Vaillant loodgieter in ${commune.name}.`;
  if (commune.nearby_landmarks.length > 0) desc += ` Snelle interventie nabij ${commune.nearby_landmarks[0]}.`;
  if (commune.common_issues.length > 0) desc += ` ${commune.common_issues[0]}.`;
  return {
    title: `Vaillant loodgieter in ${commune.name} | Villant Loodgieter`,
    description: desc,
    alternates: { canonical: `${baseUrl}/nl/loodgieter/${commune.slug}` },
    openGraph: {
      type: "website",
      locale: "nl_BE",
      url: `${baseUrl}/nl/loodgieter/${commune.slug}`,
      siteName: "Villant Loodgieter",
      title: `Vaillant loodgieter in ${commune.name}`,
      description: desc,
    },
  };
}

export default async function LoodgieterSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const commune = getCityBySlug("nl", slug);
  if (!commune) notFound();

  const allSlugs = getAllSlugsNl();
  const validNearbySlugs = commune.nearby_communes.filter((s) => allSlugs.includes(s));
  const jsonLdItems = buildJsonLd(commune, "/nl/loodgieter");
  const interventionExamples = getInterventionExamples(commune, "nl");
  const whyChooseBullets = getWhyChooseBullets(commune, "nl");
  const testimonials = getTestimonials(commune, "nl");
  const localGuide = getLocalGuide(commune, "nl");

  return (
    <>
      {jsonLdItems.map((item, i) => (
        <Script key={i} id={`json-ld-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className="badge badge-green">✓ Gecertificeerd Vaillant</span>
          <h1 className={styles.heroTitle}>Vaillant loodgieter in {commune.name}</h1>
          <p className={styles.heroIntro}>{getIntroNl(commune)}</p>
          <div className={styles.heroActions}>
            <a href="tel:+32XXXXXXXXXX" className="btn btn-primary">
              <Phone className="w-4 h-4 mr-2" />
              <span>Bellen</span>
            </a>
            <Link href="/nl/contact" className="btn btn-outline">
              <FileText className="w-4 h-4 mr-2" />
              <span>Offerte aanvragen</span>
            </Link>
          </div>
          <div className={styles.quickStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{commune.response_time_minutes ? `~${commune.response_time_minutes} min` : "Te bevestigen"}</span>
              <span className={styles.statLabel}>Interventietijd</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{commune.distance_minutes ? `~${commune.distance_minutes} min` : "Te bevestigen"}</span>
              <span className={styles.statLabel}>Afstand</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>7/7</span>
              <span className={styles.statLabel}>Beschikbaarheid</span>
            </div>
          </div>
        </div>
      </section>

      {commune.services.length > 0 && (
        <section className={styles.section}>
          <div className="container">
            <div className="section-header">
              <h2>Diensten in {commune.name}</h2>
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
              <h2>Veelvoorkomende problemen in {commune.name}</h2>
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
                    <p className={styles.issueCta}>Onze gecertificeerde monteurs grijpen snel in om dit type probleem op te lossen.</p>
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
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Gebouwenprofiel</h2>
                  <div className="w-12 h-1 bg-primary rounded-full" />
                </div>
                <div className="flex gap-6 items-start flex-1">
                  <span className="text-4xl shrink-0 text-primary">
                    <Landmark className="w-10 h-10" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Soorten gebouwen in {commune.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{commune.building_profile}</p>
                  </div>
                </div>
              </div>
            )}
            <div className={`bg-white border border-gray-200 rounded-xl p-8 shadow-sm flex flex-col h-full border-t-4 border-t-primary ${!commune.building_profile ? "text-center items-center" : ""}`}>
              <div className={`mb-6 ${!commune.building_profile ? "flex flex-col items-center" : ""}`}>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Geschatte interventietijd</h2>
                <div className="w-12 h-1 bg-primary rounded-full" />
              </div>
              <div className="flex flex-col justify-center flex-1">
                <div className={`text-4xl font-bold text-primary mb-4 ${!commune.building_profile ? "text-5xl" : ""}`}>
                  {commune.response_time_minutes ? `~${commune.response_time_minutes} min` : "Te bevestigen"}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {commune.response_time_minutes
                    ? `Onze monteurs zijn gemiddeld binnen ${commune.response_time_minutes} minuten in ${commune.name}. Deze termijn kan variëren volgens beschikbaarheid en verkeer.`
                    : `De exacte interventietijd voor ${commune.name} wordt nog geëvalueerd. Neem contact op voor een persoonlijke schatting.`}
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
              <h2>Oriëntatiepunten</h2>
              <div className="divider" />
            </div>
            <p className={styles.landmarksIntro}>
              We grijpen in in heel {commune.name}, onder meer in de buurt van:
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
              <h2>Veelgestelde vragen — {commune.name}</h2>
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
              <h2>Nabijgelegen zones</h2>
              <div className="divider" />
            </div>
            <p className={styles.nearbyIntro}>We bedienen ook de buurgemeenten van {commune.name}:</p>
            <div className={styles.nearbyGrid}>
              {validNearbySlugs.map((s) => {
                const nearby = getCityBySlug("nl", s);
                if (!nearby) return null;
                return (
                  <Link key={s} href={`/nl/loodgieter/${s}`} className={styles.nearbyCard}>
                    <span className={styles.nearbyName}>{nearby.name}</span>
                    <span className={styles.nearbyArrow}>→</span>
                  </Link>
                );
              })}
            </div>
            <p className={styles.hubLink}>
              <Link href="/nl/loodgieter">← Alle bediende gemeenten bekijken</Link>
            </p>
          </div>
        </section>
      )}

      {validNearbySlugs.length > 0 && (
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <div className="section-header">
              <h2>Loodgieter in naburige steden</h2>
              <div className="divider" />
            </div>
            <div className={styles.quartiersChips}>
              {validNearbySlugs.map((s) => {
                const nearby = getCityBySlug("nl", s);
                if (!nearby) return null;
                return (
                  <Link key={s} href={`/nl/loodgieter/${s}`} className={styles.quartiersChip}>
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>Loodgieter in {nearby.name}</span>
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
            <h2>Recente interventies in {commune.name}</h2>
            <div className="divider" />
          </div>
          <div className={styles.interventionGrid}>
            {interventionExamples.map((ex, i) => (
              <div key={i} className={styles.interventionCard}>
                <div className={styles.interventionRow}>
                  <span className={styles.interventionLabel}>Probleem</span>
                  <span className={styles.interventionValue}>{ex.problem}</span>
                </div>
                <div className={styles.interventionRow}>
                  <span className={styles.interventionLabel}>Oplossing</span>
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
            <h2>Waarom onze Vaillant loodgieter in {commune.name} kiezen</h2>
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
            <h2>Vaillant ketelspecialist in {commune.name}</h2>
            <div className="divider" />
          </div>
          <div className={styles.expertiseBlock}>
            <div className={styles.expertiseContent}>
              <p>
                Als gecertificeerd Vaillant partner in {commune.name} beheersen we het volledige gamma: muurketels ecoTEC, turboTEC, condensatiesystemen en warmtepompen.
              </p>
              <ul className={styles.expertiseList}>
                <li><strong>Installatie</strong> — Plaatsing en ingebruikname van nieuwe Vaillant-ketels</li>
                <li><strong>Reparatie</strong> — Diagnose en oplossing van storingen op alle Vaillant-modellen</li>
                <li><strong>Onderhoud</strong> — Verplichte jaarlijkse controle, reiniging en optimalisatie</li>
                <li><strong>Foutcodes</strong> — Interpretatie en oplossing van F.XX-codes voor Vaillant-ketels</li>
              </ul>
            </div>
            <div className={styles.expertiseImage}>
              <Image src="https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=800" alt={`Vaillant ketelinstallatie in ${commune.name}`} fill sizes="(max-width: 768px) 100vw, 400px" className={styles.image} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className="section-header">
            <h2>Loodgieterij en verwarming in {commune.name}</h2>
            <div className="divider" />
          </div>
          <div className={styles.guideBlock}>
            <div className={styles.guideContent}><p>{localGuide}</p></div>
            <div className={styles.guideImage}>
              <Image src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=800" alt={`Loodgieterij- en verwarmingsservice in ${commune.name}`} fill sizes="(max-width: 768px) 100vw, 400px" className={styles.image} />
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className="section-header">
            <h2>Klantbeoordelingen in {commune.name}</h2>
            <div className="divider" />
          </div>
          <div className="grid-3">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p style={{ fontStyle: "italic", fontSize: "var(--text-sm)", lineHeight: "var(--leading-relaxed)" }}>&quot;{t.text}&quot;</p>
                <div className="testimonial-author">— Klant in {commune.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className="section-header">
            <h2>Wanneer een loodgieter bellen in {commune.name}?</h2>
            <div className="divider" />
          </div>
          <p className={styles.whenCallIntro}>Sommige situaties vereisen onmiddellijke tussenkomst van een professional. Neem contact op als u het volgende vaststelt:</p>
          <ul className={styles.whenCallList}>
            <li className={styles.whenCallItem}>
              <span className={styles.whenCallIcon}><Image src="/icons/plumbing-elements/water-heater.svg" alt="Ketelstoring" width={24} height={24} /></span>
              <span>Uw ketel start niet meer of stopt herhaaldelijk</span>
            </li>
            <li className={styles.whenCallItem}>
              <span className={styles.whenCallIcon}><Image src="/icons/plumbing-elements/water-1.svg" alt="Waterlek" width={24} height={24} /></span>
              <span>Zichtbaar waterlek of abnormale vochtsporen</span>
            </li>
            <li className={styles.whenCallItem}>
              <span className={styles.whenCallIcon}><Image src="/icons/plumbing-elements/gauge.svg" alt="Lage druk" width={24} height={24} /></span>
              <span>De druk van uw ketel daalt onder 1 bar</span>
            </li>
            <li className={styles.whenCallItem}>
              <span className={styles.whenCallIcon}><Image src="/icons/plumbing-elements/radiator.svg" alt="Koude radiator" width={24} height={24} /></span>
              <span>Radiators blijven koud ondanks werkende verwarming</span>
            </li>
            <li className={styles.whenCallItem}>
              <span className={styles.whenCallIcon}><Image src="/icons/plumbing-elements/shower.svg" alt="Geen warm water" width={24} height={24} /></span>
              <span>Geen warm water of onregelmatig warm water</span>
            </li>
            <li className={styles.whenCallItem}>
              <span className={styles.whenCallIcon}><Image src="/icons/plumbing-elements/plunger.svg" alt="Ontstoppen" width={24} height={24} /></span>
              <span>Verstopte leidingen of zeer trage doorstroming</span>
            </li>
          </ul>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className="section-header">
            <h2>Bediende wijken in {commune.name}</h2>
            <div className="divider" />
          </div>
          <div className={styles.quartiersBlock}>
            <p>
              Onze monteurs bedienen de volledige gemeente {commune.name}, zonder uitzondering.
              {commune.nearby_landmarks.length > 0 && ` Of u nu in de buurt van ${commune.nearby_landmarks.slice(0, 3).join(", ")} woont of in een andere wijk, we grijpen snel in.`}
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
            <h2>Onze interventiezone in {commune.name}</h2>
            <div className="divider" />
          </div>
          <div className={styles.mapZoneBlock}>
            <p>
              Vaillant-Loodgieter bedient heel {commune.name}{commune.postal_code ? ` (${commune.postal_code})` : ""} en omgeving.
              {commune.distance_minutes ? ` Onze basis ligt op ongeveer ${commune.distance_minutes} minuten van de gemeente.` : " Neem contact op voor de interventietijd in uw wijk."}
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className="section-header">
            <h2>Gerelateerde diensten</h2>
            <div className="divider" />
          </div>
          <ul className={styles.relatedList}>
            <li className={styles.relatedItem}>
              <Link href="/nl/diensten">
                <span className="inline-flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  <span>Ketelonderhoud Brussel</span>
                </span>
                <span className={styles.relatedDesc}> — Jaarlijkse controle en optimalisatie van uw Vaillant-installatie</span>
              </Link>
            </li>
            <li className={styles.relatedItem}>
              <Link href="/nl/diensten">
                <span className="inline-flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Verwarmingsherstel Brussel</span>
                </span>
                <span className={styles.relatedDesc}> — Snelle interventie bij verwarmingsstoring</span>
              </Link>
            </li>
            <li className={styles.relatedItem}>
              <Link href="/nl/diensten">
                <span className="inline-flex items-center gap-2">
                  <Thermometer className="w-4 h-4" />
                  <span>Slimme thermostaat</span>
                </span>
                <span className={styles.relatedDesc}> — Vaillant-compatibele thermostaat</span>
              </Link>
            </li>
            <li className={styles.relatedItem}>
              <Link href="/nl/diensten">
                <span className="inline-flex items-center gap-2">
                  <Droplets className="w-4 h-4" />
                  <span>Lekkage herstellen</span>
                </span>
                <span className={styles.relatedDesc}> — Lokalisatie en reparatie van lekken in heel Brussel</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Een loodgieter nodig in {commune.name}?</h2>
          <p>Neem nu contact op voor een snelle herstelling of een gratis offerte.</p>
          <div className="cta-actions">
            <a href="tel:+32XXXXXXXXXX" className="btn btn-primary">
              <Phone className="w-4 h-4 mr-2" />
              <span>Nu bellen</span>
            </a>
            <Link href="/nl/contact" className="btn btn-ghost-dark">
              <FileText className="w-4 h-4 mr-2" />
              <span>Offerte aanvragen</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
