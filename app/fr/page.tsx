import type { Metadata } from 'next';
import Link from 'next/link';
import NextImage from 'next/image';
import StatsRow from '@/components/home/StatsRow';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import blogStyles from '@/app/fr/blog/blog.module.css';
import { getBlogPosts } from '@/data/types';
import HomeHeroSlider from '@/components/hero/HomeHeroSlider';
import { HOME_HERO_TRUST_STRIP } from '@/config/home-hero-slides';
import CertificationLogosMarquee from '@/components/CertificationLogosMarquee';
import InterventionSmtpForm from '@/components/forms/InterventionSmtpForm';
import {
  Mail, Award, Zap, Globe, UserCheck,
  Wrench, Settings, Construction,
  Thermometer, Grid, Bath, Gauge, CheckCircle2, MapPin
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Plombier Vaillant Belgique | Vaillant Plombier',
  description:
    "Vaillant Plombier – votre plombier certifié Vaillant en Belgique. Dépannage urgence, remplacement de chaudière, réparation de fuite d'eau et installation sanitaire.",
  keywords: [
    'plombier Vaillant Belgique',
    'plombier urgence Belgique',
    'remplacement chaudière Belgique',
    'réparation fuite d\'eau Belgique',
    'partenaire certifié Vaillant Belgique',
  ],
  alternates: { canonical: 'https://vaillant-loodgieter.com' },
  openGraph: {
    title: 'Plombier Vaillant Belgique | Vaillant Plombier',
    description: 'Partenaire certifié Vaillant en Belgique. Professionnel, rapide et fiable.',
    url: 'https://vaillant-loodgieter.com',
  },
};


export default function HomePage() {
  const posts = getBlogPosts();
  const trustStrip = HOME_HERO_TRUST_STRIP.fr;
  return (
    <>
      <HomeHeroSlider lang="fr" />

      <section className="bg-slate-50 py-10 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            {trustStrip.slice(0, 3).map((item, index) => {
              const iconSrc =
                index === 0
                  ? '/icons/plumbing-elements/water-heater-1.svg' // certification Vaillant
                  : index === 1
                    ? '/icons/plumbing-elements/wrench-3.svg' // service d'urgence / intervention
                    : '/icons/plumbing-elements/plumber-1.svg'; // techniciens qualifies

              return (
                <div key={item.title} className="card">
                  <div className="icon-box">
                    <NextImage
                      src={iconSrc}
                      alt=""
                      width={22}
                      height={22}
                      className="h-5 w-5"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ─────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <NextImage
                  src="/images/vaillant-2.png"
                  alt="Technicien Vaillant certifié en Belgique"
                  width={1080}
                  height={1080}
                  className="w-full h-auto object-cover"
                />
              </div>

              <StatsRow />
            </div>
            <div>
              <span className="badge badge-green">À propos de nous</span>
              <h2 style={{ marginTop: '1rem', marginBottom: '0.75rem' }}>
                Vaillant Plombier en quelques mots
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                Basé en <strong>Belgique</strong>, <strong>Vaillant Plombier</strong> est un <strong>partenaire certifié Vaillant</strong> spécialisé
                dans le <strong>chauffage</strong> et la <strong>plomberie résidentiels</strong>. Notre équipe intervient chaque jour dans toute
                <strong> Vlaanderen</strong> pour <strong>l&apos;entretien</strong>, la <strong>réparation</strong> et le
                <strong> remplacement de chaudières</strong>, ainsi que pour les <strong>fuites d&apos;eau</strong> et les
                <strong> installations sanitaires</strong>.
              </p>
              <p style={{ marginBottom: '1.25rem' }}>
                Nous privilégions un <strong>diagnostic clair</strong> avant toute intervention, une <strong>communication honnête</strong> et
                l&apos;utilisation de <strong>pièces d&apos;origine Vaillant</strong> afin de garantir la <strong>fiabilité</strong> de votre
                installation sur le long terme.
              </p>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ marginBottom: '0.9rem', fontSize: '0.95rem', color: 'rgb(71,85,105)' }}>
                  En choisissant <strong>Vaillant Plombier</strong>, vous bénéficiez d&apos;un partenaire reconnu pour la <strong>qualité</strong>
                  de son travail et la <strong>fiabilité</strong> de son accompagnement :
                </p>
                <div style={{ display: 'grid', rowGap: '0.65rem' }}>
                  {[
                    {
                      icon: '/icons/plumbing-elements/plumber-1.svg',
                      label: (
                        <>
                          Partenaire officiellement <strong>certifié Vaillant</strong> en <strong>Belgique</strong>
                        </>
                      ),
                    },
                    {
                      icon: '/icons/plumbing-elements/wrench-2.svg',
                      label: (
                        <>
                          Techniciens <strong>expérimentés</strong>, formés directement par le <strong>fabricant</strong>
                        </>
                      ),
                    },
                    {
                      icon: '/icons/plumbing-elements/pipes-7.svg',
                      label: (
                        <>
                          <strong>Interventions rapides</strong> dans toute <strong>Vlaanderen</strong>
                        </>
                      ),
                    },
                  ].map((item) => (
                    <div
                      key={typeof item.label === 'string' ? item.label : item.icon}
                      style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}
                    >
                      <NextImage
                        src={item.icon}
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5"
                        style={{ marginTop: '2px' }}
                      />
                      <span style={{ fontSize: '0.95rem' }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/fr/a-propos" className="btn btn-primary">
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ───────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Pourquoi choisir vaillant Plombier</span>
            <h2>Vos avantages en tant que client</h2>
            <div className="divider" />
            <p>En tant que partenaire certifié Vaillant, nous offrons une qualité mesurable — pas seulement des promesses. Nos techniciens combinent une formation du fabricant avec des années d'expérience pratique en Belgique.</p>
          </div>

          <div className="grid-3-strict">
            {[
              { icon: <UserCheck size={32} />, title: 'Partenaire Officiel Certifié Vaillant', desc: "Nous sommes officiellement certifiés par Vaillant. Nos techniciens ont suivi une formation directe du fabricant et sont reconnus pour l'installation, l'entretien et la réparation des systèmes Vaillant." },
              { icon: <Wrench size={32} />, title: 'Techniciens qualifiés et expérimentés', desc: "Chaque membre de notre équipe est qualifié et possède une solide expérience en systèmes de chauffage et sanitaires. Vous ne travaillerez jamais avec des novices — un travail d'artisan certifié." },
              { icon: <Construction size={32} />, title: 'Approche transparente sans surprise', desc: "Nous vous fournissons un diagnostic clair avant de commencer. Pas de coûts cachés, pas de surprises sur la facture. Chaque intervention est documentée et détaillée." },
              { icon: <Settings size={32} />, title: 'Pièces Vaillant originales', desc: "Lors de chaque réparation, nous utilisons exclusivement des pièces d'origine Vaillant — afin que votre garantie reste valide et que le système continue de fonctionner de manière optimale." },
              { icon: <MapPin size={32} />, title: 'Connaissance locale en Belgique', desc: "Nous connaissons les défis spécifiques des logements : canalisations vieillissantes, qualité de l'eau et normes de construction. Cela nous rend rapides et précis." },
              { icon: <Thermometer size={32} />, title: 'Contrat d\'entretien disponible', desc: "Protégez votre investissement avec un contrat d'entretien Vaillant. L'entretien annuel prolonge la durée de vie de votre chaudière et maintient ses performances énergétiques." },
            ].map((b) => (
              <div key={b.title} className="card">
                <div className="icon-box">
                  {b.icon}
                </div>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '10px' }}>{b.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────── */}
      <section
        style={{ background: 'var(--color-gray-50)' }}
        className="py-16 md:py-20"
      >
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Nos Services</span>
            <h2>Ce que nous faisons en Belgique</h2>
            <div className="divider" />
            <p>Des services d'urgence aux installations complètes — nous couvrons toutes les facettes de la plomberie et du chauffage en Belgique.</p>
          </div>

          <div className="grid-3-strict">
            {[
              { image: '/images/service/1.jpg', icon: <Wrench size={32} />, title: 'Réparation Vaillant', desc: "Problème avec votre chaudière Vaillant ? Nos techniciens certifiés diagnostiquent et réparent tous les modèles Vaillant avec rapidité et précision.", link: '/fr/services#vaillant-herstelling' },
              { image: '/images/service/2.jpg', icon: <Thermometer size={32} />, title: 'Remplacement de chaudière', desc: "Votre ancienne chaudière est en fin de vie ? Nous installons une nouvelle chaudière Vaillant économe en énergie avec mise en service complète.", link: '/fr/services#boiler-vervangen' },
              { image: '/images/service/3.jpg', icon: <Grid size={32} />, title: 'Installation d\'un nouveau chauffage', desc: "Des projets de nouveau chauffage ? Nous concevons et installons un système adapté à votre domicile ou vos locaux professionnels.", link: '/fr/services#verwarming' },
              { image: '/images/service/4.jpg', icon: <Construction size={32} />, title: 'Réparation de fuite d\'eau', desc: "Une fuite d'eau cause rapidement des dégâts. Notre équipe localise et répare les fuites immédiatement pour éviter de graves dommages à votre propriété.", link: '/fr/services#waterlek' },
              { image: '/images/service/5.jpg', icon: <Bath size={32} />, title: 'Installation sanitaire', desc: "Rénovation de salle de bain ou appareils sanitaires ? Nous installons tout de manière experte : toilettes, douche, baignoire, lavabo et plus.", link: '/fr/services#sanitair' },
              { image: '/images/service/6.jpg', icon: <Gauge size={32} />, title: 'Contrat d\'Entretien Vaillant', desc: "Entretien annuel de votre installation Vaillant. Comprend l'inspection, le nettoyage et un rapport pour des performances et une durabilité garanties.", link: '/fr/services#onderhoud' },
            ].map((s) => (
              <div key={s.title} className="card">
                <div className="card-image">
                  <img src={s.image} alt={s.title} />
                </div>
                <div className="icon-box" style={{ marginTop: '-42px', position: 'relative', border: '2px solid #fff' }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)', marginBottom: '16px' }}>{s.desc}</p>
                <Link href={s.link} style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-primary)' }}>
                  Plus d'infos →
                </Link>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/fr/services" className="btn btn-primary">Voir tous les services</Link>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATION ──────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-gray-50)' }}>
        <div className="container">
          <div
            className="grid-2"
            style={{
              alignItems: 'center',
              gap: '2rem',
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.25rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div>
              <span className="badge badge-green">Certification</span>
              <h2 style={{ marginTop: '1rem', marginBottom: '0.75rem' }}>
                Partenaire <strong>certifié Vaillant</strong>
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                En tant que <strong>partenaire officiellement certifié</strong>, nos techniciens suivent des formations directes du
                fabricant et appliquent des procédures conformes aux standards Vaillant.
              </p>
              <p style={{ marginBottom: '1.25rem' }}>
                Résultat : un <strong>diagnostic clair</strong>, des <strong>pièces d&apos;origine</strong> quand nécessaire et une
                installation <strong>fiable</strong> sur le long terme.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href="mailto:contact@vaillant-loodgieter.com" className="btn btn-primary">
                  Demander une intervention
                </a>
                <Link href="/fr/certifications" className="btn btn-outline">
                  Voir notre certification →
                </Link>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <NextImage
                src="/RFID.png"
                alt="Carte partenaire certifié Vaillant"
                width={900}
                height={520}
                style={{ width: 'min(520px, 100%)', height: 'auto', objectFit: 'contain' }}
                priority={false}
              />
            </div>
          </div>

          <div style={{ marginTop: '18px' }}>
            <CertificationLogosMarquee />
          </div>
        </div>
      </section>

      {/* ── PROOF ──────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Preuve &amp; Confiance</span>
            <h2>Pourquoi les clients nous font confiance</h2>
            <div className="divider" />
            <p>Deux points concrets et vérifiables distinguent Vaillant Plombier des plombiers génériques en Belgique.</p>
          </div>

          {/* Proof cards */}
          <div className="grid-2" style={{ marginBottom: '40px' }}>
            {[
              {
                icon: (
                  <NextImage
                    src="/vaillant-partner.png"
                    alt="Partenaire certifié Vaillant"
                    width={180}
                    height={60}
                    style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
                  />
                ),
                title: 'Partenaire certifié Vaillant',
                body: "vaillant Plombier est officiellement certifié partenaire par Vaillant, l'un des principaux fabricants européens de systèmes de chauffage. Notre certification est accordée directement par le constructeur et reflète une réelle expertise de la marque.",
              },
              {
                icon: <UserCheck size={48} color="var(--color-primary)" />,
                title: 'Techniciens qualifiés et expérimentés',
                body: "Notre équipe est exclusivement composée de techniciens qualifiés ayant une expérience prouvée. Nous ne laissons pas la place à des ouvriers non spécialisés. Chaque intervention est effectuée par un artisan à la pointe des normes d'aujourd'hui.",
              },
            ].map((p) => (
              <div key={p.title} className="proof-card">
                <div style={{ marginBottom: '16px' }}>{p.icon}</div>
                <h3 style={{ marginBottom: '12px' }}>{p.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>{p.body}</p>
              </div>
            ))}
          </div>

          <TestimonialsCarousel />

          <div style={{ marginTop: '28px', display: 'grid', gap: '14px', justifyItems: 'center' }}>
            <NextImage
              src="/google-avis.png"
              alt="Avis Google"
              width={520}
              height={160}
              style={{ height: '164px', maxWidth: '520px', width: '100%', objectFit: 'contain' }}
              priority={false}
            />
            <a
              href={process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ?? 'https://www.google.com/search?q=Vaillant+Plombier+avis'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Laisser un avis Google
            </a>
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS ──────────────────────────────────── */}
      <section
        style={{ background: 'var(--color-gray-50)' }}
        className="py-16 md:py-20"
      >
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Belgique</span>
            <h2>Plombier dans plusieurs villes de Belgique</h2>
            <div className="divider" />
            <p>
              Nous intervenons dans plusieurs villes et régions en Belgique selon la disponibilité
              de nos équipes et la nature de l’intervention.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
              marginBottom: '32px',
            }}
          >
            {[
              // Tier 1 — grandes villes
              { label: 'Bruxelles', slug: 'bruxelles' },
              { label: 'Anvers', slug: 'anvers' },
              { label: 'Gand', slug: 'gand' },
              { label: 'Charleroi', slug: 'charleroi' },
              { label: 'Liège', slug: 'liege' },
              { label: 'Bruges', slug: 'bruges' },
              { label: 'Namur', slug: 'namur' },
              { label: 'Louvain', slug: 'louvain' },
              // Tier 2 — villes moyennes fortes
              { label: 'Malines', slug: 'malines' },
              { label: 'Hasselt', slug: 'hasselt' },
              { label: 'Courtrai', slug: 'courtrai' },
              { label: 'Ostende', slug: 'ostende' },
              { label: 'Alost', slug: 'alost' },
              { label: 'Saint-Nicolas', slug: 'saint-nicolas' },
              { label: 'Genk', slug: 'genk' },
              { label: 'Roulers', slug: 'roulers' },
              { label: 'Mons', slug: 'mons' },
              // Tier 3 — plus petites mais intéressantes SEO
              { label: 'Turnhout', slug: 'turnhout' },
              { label: 'Tournai', slug: 'tournai' },
              { label: 'La Louvière', slug: 'la-louviere' },
              { label: 'Verviers', slug: 'verviers' },
              { label: 'Seraing', slug: 'seraing' },
              { label: 'Mouscron', slug: 'mouscron' },
              { label: 'Termonde', slug: 'termonde' },
              { label: 'Lokeren', slug: 'lokeren' },
              { label: 'Waregem', slug: 'waregem' },
              { label: 'Ypres', slug: 'ypres' },
            ].map((city) => (
              <Link
                key={city.slug}
                href={`/fr/plombier-${city.slug}`}
                className="area-chip"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <MapPin size={14} /> {city.label}
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/fr/plombier" className="btn btn-outline">
              Voir toutes les zones desservies
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Méthode de travail</span>
            <h2>Comment ça marche ?</h2>
            <div className="divider" />
            <p>Quatre étapes simples — de votre premier contact jusqu'à une installation fonctionnelle.</p>
          </div>

          <div className="steps-grid">
            {[
              {
                n: '1',
                title: 'Demande de devis',
                desc: "Remplissez la page de demande de devis ou envoyez un e-mail à contact@vaillant-loodgieter.com. Décrivez votre problème ou votre projet le plus précisément possible.",
              },
              {
                n: '2',
                title: 'Diagnostic et Devis',
                desc: "Notre technicien se rend sur place et pose un diagnostic transparent. Vous recevez un devis clair et précis avant de commencer les travaux.",
              },
              {
                n: '3',
                title: 'Intervention experte',
                desc: "Des techniciens certifiés effectuent la réparation ou l'installation en appliquant les normes rigoureuses et des pièces d'origine Vaillant.",
              },
              {
                n: '4',
                title: 'Suivi et Entretien',
                desc: "Après l'intervention, un bilan de fonctionnement. Nous vous conseillons sur l'entretien annuel recommandé pour votre installation Vaillant.",
              },
            ].map((step) => (
              <div key={step.n} className="step-item">
                <div className="step-number" style={{ margin: '0 auto' }}>{step.n}</div>
                <h4>{step.title}</h4>
                <p style={{ fontSize: 'var(--text-sm)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section
        style={{ background: 'var(--color-gray-50)' }}
        className="py-16 md:py-20"
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <span className="badge badge-green">FAQ</span>
            <h2>Foire Aux Questions</h2>
            <div className="divider" />
          </div>
          {[
            { q: 'Êtes-vous un partenaire officiel certifié Vaillant ?', a: "Oui. vaillant Plombier est officiellement certifié par la marque Vaillant. Nos techniciens participent aux formations directes du fabricant et sont reconnus pour l'installation, l'entretien et la réparation des systèmes Vaillant en Belgique." },
            { q: 'Combien coûte une réparation de chaudière Vaillant en Belgique ?', a: "Le coût final dépend du défaut spécifique et des pièces Vaillant nécessaires. Nous faisons toujours un diagnostic sur place et nous fournissons un devis clair. Pas de frais supplémentaires surprises. Écrivez à contact@vaillant-loodgieter.com pour une estimation." },
            { q: 'À quelle vitesse pouvez-vous intervenir en cas d\'urgence ?', a: "Nous visons l'intervention la plus rapide possible pour les pannes totales de chauffage et de l'eau. Mentionnez « URGENCE » dans l'en-tête de votre e-mail pour que votre demande soit priorisée." },
            { q: 'Quels appareils Vaillant réparez-vous ?', a: "Nous réparons et entretenons tous les modèles Vaillant, en incluant les chaudières murales à gaz (série ecoTEC, turboTEC), ainsi que les différentes solutions thermodynamiques et les pompes à chaleur de la marque." },
            { q: 'Proposez-vous un contrat d\'entretien pour les installations Vaillant ?', a: "Oui, un contrat d'entretien de chauffage Vaillant complet incluant la révision annuelle, le nettoyage et la vérification des réglages. L'entretien obligatoire augmente la durabilité et optimise le fonctionnement de votre appareil." },
            { q: 'Quelles zones sont couvertes par Vaillant Plombier ?', a: "Nous intervenons dans plusieurs villes et régions en Belgique selon la disponibilité de nos équipes et la nature de l’intervention." },
          ].map((faq, i) => (
            <details key={i} className="faq-item">
              <summary>{faq.q}</summary>
              <div className="faq-answer">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* ── BLOG CAROUSEL ──────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Blog & Conseils</span>
            <h2>Dernières actualités de vaillant Plombier</h2>
            <div className="divider" />
            <p>Découvrez nos conseils d&apos;experts pour l&apos;entretien et l&apos;optimisation de votre chaudière Vaillant.</p>
          </div>

          <div className="grid-3-strict">
            {posts.slice(0, 3).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={blogStyles.blogCard}>
                <div className={blogStyles.cardImage}>
                  <NextImage src={post.image} alt={post.languages.fr.title} fill className="object-cover" />
                </div>
                <div className={blogStyles.cardContent}>
                  <div className={blogStyles.cardDate}>
                    {new Date(post.languages.fr.date).toLocaleDateString('fr-BE', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h3 className={blogStyles.cardTitle}>{post.languages.fr.title}</h3>
                  <p className={blogStyles.cardExcerpt}>{post.languages.fr.excerpt}</p>
                  <span className={blogStyles.cardLink}>Lire la suite →</span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/blog" className="btn btn-outline" style={{ display: 'none' }}>Voir tous les articles</Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT (HOMEPAGE) ─────────────────────────────── */}
      <section
        className="py-16 md:py-20"
        style={{
          background:
            "radial-gradient(1200px 600px at 20% -10%, rgba(0,173,171,0.22), transparent 60%), radial-gradient(900px 520px at 85% 10%, rgba(34,197,94,0.14), transparent 55%), linear-gradient(180deg, #062433 0%, #041A25 100%)",
        }}
      >
        <div className="container">
          <div className="section-header" style={{ color: '#EAF6F7' }}>
            <span className="badge badge-gold">Contact</span>
            <h2 style={{ marginTop: '1rem', color: '#fff' }}>Demander une intervention</h2>
            <div className="divider" />
            <p style={{ color: 'rgba(234,246,247,0.80)' }}>
              Envoyez votre demande. Nous revenons vers vous rapidement avec une réponse claire.
            </p>
          </div>

          <div
            style={{
              maxWidth: '760px',
              margin: '0 auto',
              borderRadius: '22px',
              padding: '18px',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.06) 100%)',
              border: '1px solid rgba(148,163,184,0.22)',
              boxShadow: '0 22px 60px rgba(0,0,0,0.22)',
            }}
          >
            <InterventionSmtpForm
              formType="intervention"
              source="accueil-fr"
              submitLabel="Envoyer"
              privacyLabel={
                <>
                  En envoyant un message, vous acceptez notre{' '}
                  <Link href="/fr/confidentialite" style={{ color: 'rgba(234,246,247,0.92)', fontWeight: 700, textDecoration: 'underline' }}>
                    politique de confidentialité
                  </Link>
                  .
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* ── CTA BAND ───────────────────────────────────────── */}
      <section className="cta-band py-16 md:py-20">
        <div className="container">
          <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', marginBottom: '20px' }}>
            Fiers de travailler en Belgique
          </span>
          <h2>Prêt à réparer ou optimiser votre installation Vaillant ?</h2>
          <p>Contactez dès aujourd'hui votre partenaire certifié Vaillant en Belgique. Nous analysons votre demande rapidement.</p>
          <div className="cta-actions">
            <a href="mailto:contact@vaillant-loodgieter.com" className="btn btn-ghost-dark" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={18} /> contact@vaillant-loodgieter.com
            </a>
            <Link href="/fr/services" className="btn btn-ghost-dark">
              Voir nos services
            </Link>
          </div>
          <p style={{ marginTop: '24px', fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.55)', maxWidth: 'none' }}>
            Partenaire certifié Vaillant · Techniciens qualifiés · Belgique
          </p>
        </div>
      </section>
    </>
  );
}
