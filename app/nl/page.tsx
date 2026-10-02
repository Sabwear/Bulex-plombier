import type { Metadata } from 'next';
import Link from 'next/link';
import NextImage from 'next/image';
import blogStyles from '@/app/fr/blog/blog.module.css';
import { getBlogPosts } from '@/data/types';
import HomeHeroSlider from '@/components/hero/HomeHeroSlider';
import { HOME_HERO_TRUST_STRIP } from '@/config/home-hero-slides';
import CertificationLogosMarquee from '@/components/CertificationLogosMarquee';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import StatsRow from '@/components/home/StatsRow';
import { buildLocaleAlternates } from '@/lib/seoAlternates';
import InterventionSmtpForm from '@/components/forms/InterventionSmtpForm';
import {
  Mail, Award, Zap, UserCheck,
  Wrench, Settings, Construction,
  Thermometer, Grid, Bath, Gauge, CheckCircle2, MapPin
} from 'lucide-react';


const homeTitle =
  "Vaillant Loodgieter België | Herstelling & installatie";

export const metadata: Metadata = {
  title: homeTitle,
  description:
    "Gecertificeerde Vaillant loodgieter in België. Snelle interventie, ketelherstelling, installatie en onderhoud. Gratis offerte.",
  keywords: [
    'Vaillant loodgieter België',
    'loodgieter spoeddienst België',
    'boiler vervangen België',
    'waterlek herstellen België',
    'gecertificeerd Vaillant partner België',
  ],
  alternates: buildLocaleAlternates('/nl'),
  openGraph: {
    type: 'website',
    siteName: 'Vaillant Loodgieter',
    title: homeTitle,
    description:
      "Gecertificeerde Vaillant loodgieter in België. Snelle interventie, ketelherstelling, installatie en onderhoud. Gratis offerte.",
    url: 'https://vaillant-loodgieter.com/nl',
    images: [
      {
        url: '/images/slider-vaillant-1.png',
        width: 1920,
        height: 1080,
        alt: 'Vaillant technieker aan het werk in België',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: homeTitle,
    description:
      "Gecertificeerde Vaillant loodgieter in België. Snelle interventie, ketelherstelling, installatie en onderhoud. Gratis offerte.",
    images: ['/images/slider-vaillant-1.png'],
  },
};


export default function HomePage() {
  const posts = getBlogPosts();
  const trustStrip = HOME_HERO_TRUST_STRIP.nl;
  return (
    <>
      <HomeHeroSlider lang="nl" />

      <section className="bg-slate-50 py-10 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            {trustStrip.slice(0, 3).map((item, index) => {
              const iconSrc =
                index === 0
                  ? '/icons/plumbing-elements/water-heater-1.svg' // Vaillant partner / ketel
                  : index === 1
                    ? '/icons/plumbing-elements/wrench-3.svg' // spoeddienst / interventie
                    : '/icons/plumbing-elements/plumber-1.svg'; // technici

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
                  alt="Gecertificeerde Vaillant technicus in België"
                  width={1080}
                  height={1080}
                  className="w-full h-auto object-cover"
                />
              </div>
              <StatsRow locale="nl" />
            </div>
            <div>
              <span className="badge badge-green">Over ons</span>
              <h2 style={{ marginTop: '1rem', marginBottom: '0.75rem' }}>
                Vaillant Loodgieter in één oogopslag
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Vaillant Loodgieter</strong> is gevestigd in <strong>België</strong> en is een <strong>gecertificeerde Vaillant-partner</strong>{' '}
                gespecialiseerd in <strong>verwarming</strong> en <strong>residentiële sanitair</strong>. Ons team komt dagelijks tussen in heel{' '}
                <strong>Vlaanderen</strong> voor het <strong>onderhoud</strong>, de <strong>herstelling</strong> en de{' '}
                <strong>vervanging</strong> van verwarmingsketels, evenals voor <strong>waterlekken</strong> en <strong>sanitaire installaties</strong>.
              </p>
              <p style={{ marginBottom: '1.25rem' }}>
                Wij geven altijd voorrang aan een <strong>duidelijke diagnose</strong> vóór elke interventie, <strong>eerlijke communicatie</strong>{' '}
                en het gebruik van <strong>originele Vaillant-onderdelen</strong>, zodat uw installatie op lange termijn <strong>betrouwbaar</strong>{' '}
                blijft.
              </p>
              <div style={{ marginBottom: '1.5rem' }}>
                <p
                  style={{
                    marginBottom: '0.9rem',
                    fontSize: '0.95rem',
                    color: 'rgb(71,85,105)',
                  }}
                >
                  Door te kiezen voor <strong>Vaillant Loodgieter</strong> kiest u voor een partner die bekend staat om de <strong>kwaliteit</strong>
                  van zijn werk en de <strong>betrouwbaarheid</strong> van zijn service:
                </p>
                <div style={{ display: 'grid', rowGap: '0.65rem' }}>
                  {[
                    {
                      icon: '/icons/plumbing-elements/plumber-1.svg',
                      label: (
                        <>
                          Officieel <strong>gecertificeerde Vaillant-partner</strong> in <strong>België</strong>
                        </>
                      ),
                    },
                    {
                      icon: '/icons/plumbing-elements/wrench-2.svg',
                      label: (
                        <>
                          Techniciens <strong>ervaren</strong>, rechtstreeks opgeleid door de <strong>fabrikant</strong>
                        </>
                      ),
                    },
                    {
                      icon: '/icons/plumbing-elements/pipes-7.svg',
                      label: (
                        <>
                          <strong>Snelle interventies</strong> in heel <strong>Vlaanderen</strong>
                        </>
                      ),
                    },
                  ].map((item) => (
                    <div
                      key={item.icon}
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
              <Link href="/nl/over-ons" className="btn btn-primary">
                Meer over Vaillant Loodgieter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ───────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Waarom vaillant Loodgieter kiezen</span>
            <h2>Uw voordelen als klant</h2>
            <div className="divider" />
          <p>Als gecertificeerd Vaillant partner bieden wij meetbare kwaliteit — niet alleen beloftes. Onze technici combineren een fabrieksopleiding met jarenlange praktijkervaring in België.</p>
          </div>

          <div className="grid-3-strict">
            {[
              { icon: <UserCheck size={32} />, title: 'Officieel Gecertificeerd Vaillant Partner', desc: "Wij zijn officieel gecertificeerd door Vaillant. Onze technici hebben een directe fabrieksopleiding gevolgd en zijn erkend voor de installatie, het onderhoud en de reparatie van Vaillant systemen." },
              { icon: <Wrench size={32} />, title: 'Gekwalificeerde en ervaren technici', desc: "Elk lid van ons team is gekwalificeerd en heeft een solide ervaring in verwarming en sanitaire systemen. U werkt nooit met beginners — gecertificeerd vakwerk." },
              { icon: <Construction size={32} />, title: 'Transparante aanpak zonder verrassingen', desc: "We geven u een duidelijke diagnose voordat we beginnen. Geen verborgen kosten, geen verrassingen op de factuur. Elke interventie wordt gedocumenteerd en gedetailleerd." },
              { icon: <Settings size={32} />, title: 'Originele Vaillant onderdelen', desc: "Tijdens elke reparatie gebruiken we uitsluitend originele Vaillant onderdelen — zodat uw garantie geldig blijft en het systeem optimaal blijft werken." },
              { icon: <MapPin size={32} />, title: 'Lokale kennis in België', desc: "Wij kennen de specifieke uitdagingen van woningen: oude leidingen, waterkwaliteit en bouwnormen. Dit maakt ons snel en accuraat." },
              { icon: <Thermometer size={32} />, title: 'Onderhoudscontract beschikbaar', desc: "Bescherm uw investering met een Vaillant onderhoudscontract. Het jaarlijks onderhoud verlengt de levensduur van uw ketel en behoudt zijn energieprestaties." },
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
            <span className="badge badge-green">Onze Diensten</span>
            <h2>Wat wij doen in België</h2>
            <div className="divider" />
            <p>Van nooddiensten tot complete installaties — wij dekken alle facetten van loodgieterij en verwarming in België.</p>
          </div>

          <div className="grid-3-strict">
            {[
              { image: '/images/service/1.jpg', icon: <Wrench size={32} />, title: 'Vaillant herstelling', desc: "Probleem met uw Vaillant ketel? Onze gecertificeerde technici diagnosticeren en repareren alle Vaillant modellen snel en accuraat.", link: '/nl/diensten/vaillant-herstelling-belgie' },
              { image: '/images/service/2.jpg', icon: <Thermometer size={32} />, title: 'Boiler vervangen', desc: "Is uw oude boiler aan het einde van zijn levensduur? Wij installeren een nieuwe, energiezuinige Vaillant ketel met volledige inbedrijfstelling.", link: '/nl/diensten/boiler-vervangen-belgie' },
              { image: '/images/service/3.jpg', icon: <Grid size={32} />, title: 'Nieuwe verwarming plaatsen', desc: "Plannen voor nieuwe verwarming? Wij ontwerpen en installeren een systeem op maat voor uw woning of bedrijfspand.", link: '/nl/diensten/nieuwe-verwarming-belgie' },
              { image: '/images/service/4.jpg', icon: <Construction size={32} />, title: 'Waterlek herstellen', desc: "Een waterlek veroorzaakt snel schade. Ons team lokaliseert en repereert lekken onmiddellijk om ernstige schade aan uw eigendom te voorkomen.", link: '/nl/diensten/waterlek-herstellen-belgie' },
              { image: '/images/service/5.jpg', icon: <Bath size={32} />, title: 'Sanitair installatie', desc: "Badkamer renovatie of sanitaire toestellen? Wij installeren alles vakkundig: toiletten, douche, bad, wastafel en meer.", link: '/nl/diensten/sanitair-installatie-belgie' },
              { image: '/images/service/6.jpg', icon: <Gauge size={32} />, title: 'Vaillant Onderhoudscontract', desc: "Jaarlijks onderhoud van uw Vaillant installatie. Inclusief inspectie, reiniging en een rapport voor gegarandeerde prestaties en duurzaamheid.", link: '/nl/diensten/vaillant-onderhoudscontract' },
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
                  Meer info →
                </Link>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/nl/diensten" className="btn btn-primary">Bekijk alle diensten</Link>
          </div>
        </div>
      </section>

      {/* ── CERTIFICERING ───────────────────────────────────── */}
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
              <span className="badge badge-green">Certificering</span>
              <h2 style={{ marginTop: '1rem', marginBottom: '0.75rem' }}>
                <strong>Gecertificeerde</strong> Vaillant-partner
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                Als <strong>officieel gecertificeerde</strong> partner volgen onze technici rechtstreekse fabrieksopleidingen en
                werken we volgens Vaillant-procedures.
              </p>
              <p style={{ marginBottom: '1.25rem' }}>
                Dat betekent: een <strong>duidelijke diagnose</strong>, <strong>originele onderdelen</strong> wanneer nodig en een
                installatie die <strong>betrouwbaar</strong> blijft op lange termijn.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link href="/nl/demande-offerte" className="btn btn-primary">
                  Vraag een interventie aan
                </Link>
                <Link href="/nl/certificeringen" className="btn btn-outline">
                  Bekijk onze certificering →
                </Link>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <NextImage
                src="/RFID.png"
                alt="Vaillant partnerkaart"
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
            <span className="badge badge-green">Bewijs &amp; Vertrouwen</span>
            <h2>Waarom klanten ons vertrouwen</h2>
            <div className="divider" />
            <p>Twee concrete en verifieerbare punten onderscheiden Vaillant Loodgieter van generieke loodgieters in België.</p>
          </div>

          <div className="grid-2" style={{ marginBottom: '40px' }}>
            {[
              {
                icon: (
                  <NextImage
                    src="/vaillant-partner.png"
                    alt="Gecertificeerd Vaillant partner"
                    width={180}
                    height={60}
                    style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
                  />
                ),
                title: 'Gecertificeerd Vaillant partner',
                body: "vaillant Loodgieter is officieel gecertificeerd als partner door Vaillant, een van de toonaangevende Europese fabrikanten van verwarmingssystemen. Onze certificering wordt rechtstreeks door de fabrikant verleend en weerspiegelt een echte merkexpertise.",
              },
              {
                icon: <UserCheck size={48} color="var(--color-primary)" />,
                title: 'Gekwalificeerde en ervaren technici',
                body: "Ons team bestaat uitsluitend uit gekwalificeerde technici met bewezen ervaring. Wij laten geen ruimte voor ongeschoolde arbeiders. Elke interventie wordt uitgevoerd door een vakman die op de hoogte is van de huidige normen.",
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
              alt="Google reviews"
              width={520}
              height={160}
              style={{ height: '164px', maxWidth: '520px', width: '100%', objectFit: 'contain' }}
              priority={false}
            />
            <a
              href={process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ?? 'https://www.google.com/search?q=Vaillant+Loodgieter+reviews'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Schrijf een Google review
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
            <span className="badge badge-green">België</span>
            <h2>Loodgieter in meerdere steden in België</h2>
            <div className="divider" />
            <p>
              Wij werken in meerdere steden en regio’s in België, afhankelijk van de beschikbaarheid
              van onze teams en het type interventie.
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
              // Tier 1 — grootste steden
              { label: 'Brussel', slug: 'brussel' },
              { label: 'Antwerpen', slug: 'antwerpen' },
              { label: 'Gent', slug: 'gent' },
              { label: 'Charleroi', slug: 'charleroi' },
              { label: 'Luik', slug: 'luik' },
              { label: 'Brugge', slug: 'brugge' },
              { label: 'Namen', slug: 'namen' },
              { label: 'Leuven', slug: 'leuven' },
              // Tier 2 — sterke middelgrote steden
              { label: 'Mechelen', slug: 'mechelen' },
              { label: 'Hasselt', slug: 'hasselt' },
              { label: 'Kortrijk', slug: 'kortrijk' },
              { label: 'Oostende', slug: 'oostende' },
              { label: 'Aalst', slug: 'aalst' },
              { label: 'Sint-Niklaas', slug: 'sint-niklaas' },
              { label: 'Genk', slug: 'genk' },
              { label: 'Roeselare', slug: 'roeselare' },
              { label: 'Bergen', slug: 'bergen' },
              // Tier 3 — kleinere maar goede SEO-steden
              { label: 'Turnhout', slug: 'turnhout' },
              { label: 'Doornik', slug: 'doornik' },
              { label: 'La Louvière', slug: 'la-louviere' },
              { label: 'Verviers', slug: 'verviers' },
              { label: 'Seraing', slug: 'seraing' },
              { label: 'Moeskroen', slug: 'moeskroen' },
              { label: 'Dendermonde', slug: 'dendermonde' },
              { label: 'Lokeren', slug: 'lokeren' },
              { label: 'Waregem', slug: 'waregem' },
              { label: 'Ieper', slug: 'ieper' },
            ].map((city) => (
              <Link
                key={city.slug}
                href={`/nl/loodgieter/${city.slug}`}
                className="area-chip"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <MapPin size={14} /> {city.label}
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/nl/brussel" className="btn btn-outline">
              Bekijk alle bediende zones
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Werkwijze</span>
            <h2>Hoe werkt het?</h2>
            <div className="divider" />
            <p>Vier eenvoudige stappen — van uw eerste contact tot een werkende installatie.</p>
          </div>

          <div className="steps-grid">
            {[
              { n: '1', title: 'Neem contact op', desc: "Stuur een e-mail naar contact@vaillant-loodgieter.com. Beschrijf uw probleem of verzoek zo nauwkeurig mogelijk." },
              { n: '2', title: 'Diagnose en Offerte', desc: "Onze technicus komt ter plaatse en stelt een transparante diagnose. U ontvangt een duidelijke en nauwkeurige offerte voordat we aan de werkzaamheden beginnen." },
              { n: '3', title: 'Deskundige Interventie', desc: "Gecertificeerde technici voeren de reparatie of installatie uit volgens strikte normen en met originele Vaillant onderdelen." },
              { n: '4', title: 'Opvolging en Onderhoud', desc: "Na de interventie volgt een functioneringstest. Wij adviseren u over het aanbevolen jaarlijkse onderhoud voor uw Vaillant installatie." },
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
            <h2>Veelgestelde Vragen</h2>
            <div className="divider" />
          </div>
          {[
            { q: 'Bent u een officieel gecertificeerd Vaillant partner?', a: "Ja. vaillant Loodgieter is officieel gecertificeerd door het merk Vaillant. Onze technici nemen deel aan directe fabrieksopleidingen en zijn erkend voor de installatie, het onderhoud en de reparatie van Vaillant systemen in België." },
            { q: 'Wat kost een Vaillant ketel reparatie in België?', a: "De uiteindelijke kosten hangen af van het specifieke defect en de benodigde Vaillant onderdelen. We stellen altijd een diagnose ter plaatse en geven een duidelijke offerte. Geen verrassende extra kosten. Mail naar contact@vaillant-loodgieter.com voor een schatting." },
            { q: 'Hoe snel kunt u ingrijpen bij een noodgeval?', a: "We streven naar een zo snel mogelijke interventie bij volledige uitval van verwarming of water. Vermeld « SPOEDGEVAL » in de onderwerpregel van uw e-mail zodat wij uw verzoek prioriteit kunnen geven." },
            { q: 'Welke Vaillant toestellen repareert u?', a: "Wij repareren en onderhouden alle Vaillant modellen, waaronder wandgasketels (ecoTEC, turboTEC series), warmtepompen en andere thermodynamische oplossingen van het merk." },
            { q: 'Biedt u een onderhoudscontract aan voor Vaillant installaties?', a: "Ja, een compleet Vaillant onderhoudscontract voor verwarming inclusief de jaarlijkse revisie, reiniging en controle van de instellingen. Het verplichte onderhoud verlengt de levensduur en optimaliseert de werking van uw toestel." },
            { q: 'Welke zones dekt Vaillant Loodgieter?', a: "Wij werken in meerdere steden en regio’s in België, afhankelijk van de beschikbaarheid van onze teams en het type interventie." },
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
            <span className="badge badge-green">Blog & Advies</span>
            <h2>Laatste nieuws van vaillant Loodgieter</h2>
            <div className="divider" />
            <p>Ontdek ons deskundig advies voor het onderhoud en de optimalisatie van uw Vaillant-ketel.</p>
          </div>

          <div className="grid-3-strict">
            {posts.slice(0, 3).map((post) => (
              <Link key={post.slug} href={`/nl/blog/${post.slug}`} className={blogStyles.blogCard}>
                <div className={blogStyles.cardImage}>
                  <NextImage src={post.image} alt={post.languages.nl.title} fill className="object-cover" />
                </div>
                <div className={blogStyles.cardContent}>
                  <div className={blogStyles.cardDate}>
                    {new Date(post.languages.nl.date).toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h3 className={blogStyles.cardTitle}>{post.languages.nl.title}</h3>
                  <p className={blogStyles.cardExcerpt}>{post.languages.nl.excerpt}</p>
                  <span className={blogStyles.cardLink}>Lees meer →</span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/nl/blog" className="btn btn-outline" style={{ display: 'none' }}>Bekijk alle artikelen</Link>
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
            <h2 style={{ marginTop: '1rem', color: '#fff' }}>Vraag een interventie aan</h2>
            <div className="divider" />
            <p style={{ color: 'rgba(234,246,247,0.80)' }}>
              Stuur uw aanvraag door. Wij antwoorden snel met een duidelijke reactie.
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
              source="accueil-nl"
              locale="nl"
              surface="dark"
              submitLabel="Verzenden"
              privacyLabel={
                <>
                  Door een bericht te versturen, gaat u akkoord met ons{' '}
                  <Link href="/nl/privacy" style={{ color: 'rgba(234,246,247,0.92)', fontWeight: 700, textDecoration: 'underline' }}>
                    privacybeleid
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
            Trots werkzaam in België
          </span>
          <h2>Klaar om uw Vaillant installatie te repareren of te optimaliseren?</h2>
          <p>Neem vandaag nog contact op met uw gecertificeerde Vaillant partner in België. Wij analyseren uw verzoek snel.</p>
          <div className="cta-actions">
            <Link href="/nl/contact" className="btn btn-ghost-dark" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={18} /> contact@vaillant-loodgieter.com
            </Link>
            <Link href="/nl/diensten" className="btn btn-ghost-dark">
              Bekijk onze diensten
            </Link>
          </div>
          <p style={{ marginTop: '24px', fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.55)', maxWidth: 'none' }}>
            Gecertificeerd Vaillant partner · Gekwalificeerde technici · België
          </p>
        </div>
      </section>
    </>
  );
}
