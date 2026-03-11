import type { Metadata } from 'next';
import Link from 'next/link';
import NextImage from 'next/image';
import blogStyles from '@/app/fr/blog/blog.module.css';
import { getBlogPosts } from '@/data/types';
import HomeHeroSlider from '@/components/hero/HomeHeroSlider';
import { HOME_HERO_TRUST_STRIP } from '@/config/home-hero-slides';
import {
  Mail, Award, Zap, UserCheck,
  Wrench, Settings, Construction,
  Thermometer, Grid, Bath, Gauge, CheckCircle2, MapPin
} from 'lucide-react';


export const metadata: Metadata = {
  title: 'Vaillant loodgieter Brussel | Villant Loodgieter',
  description:
    "Villant Loodgieter – gecertificeerd Vaillant partner in Brussel. Loodgieter spoeddienst, boiler vervangen, waterlek herstellen en sanitair installatie in Brussel.",
  keywords: [
    'Vaillant loodgieter Brussel',
    'loodgieter spoeddienst Brussel',
    'boiler vervangen Brussel',
    'waterlek herstellen Brussel',
    'gecertificeerd Vaillant partner België',
  ],
  alternates: { canonical: 'https://villant-loodgieter.be/nl' },
  openGraph: {
    title: 'Vaillant loodgieter Brussel | Villant Loodgieter',
    description: 'Gecertificeerd Vaillant partner in Brussel. Professioneel, snel en betrouwbaar.',
    url: 'https://villant-loodgieter.be/nl',
  },
};


export default function HomePage() {
  const posts = getBlogPosts();
  const trustStrip = HOME_HERO_TRUST_STRIP.nl;
  return (
    <>
      <HomeHeroSlider lang="nl" />

      <section style={{ paddingTop: '1.25rem' }}>
        <div className="container">
          <div className="grid-4">
            {trustStrip.map((item, index) => {
              const icons = [Award, Zap, UserCheck, MapPin];
              const Icon = icons[index] ?? CheckCircle2;
              return (
                <div
                  key={item.title}
                  style={{
                    textAlign: 'left',
                    padding: '0',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'var(--color-primary-light)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.6rem',
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <h3 style={{ fontSize: 'var(--text-base)', marginBottom: '0.25rem' }}>{item.title}</h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{item.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ───────────────────────────────────────── */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Waarom Villant Loodgieter kiezen</span>
            <h2>Uw voordelen als klant</h2>
            <div className="divider" />
            <p>Als gecertificeerd Vaillant partner bieden wij meetbare kwaliteit — niet alleen beloftes. Onze technici combineren een fabrieksopleiding met jarenlange praktijkervaring in Brussel.</p>
          </div>

          <div className="grid-3-strict">
            {[
              { icon: <UserCheck size={32} />, title: 'Officieel Gecertificeerd Vaillant Partner', desc: "Wij zijn officieel gecertificeerd door Vaillant. Onze technici hebben een directe fabrieksopleiding gevolgd en zijn erkend voor de installatie, het onderhoud en de reparatie van Vaillant systemen." },
              { icon: <Wrench size={32} />, title: 'Gekwalificeerde en ervaren technici', desc: "Elk lid van ons team is gekwalificeerd en heeft een solide ervaring in verwarming en sanitaire systemen. U werkt nooit met beginners — gecertificeerd vakwerk." },
              { icon: <Construction size={32} />, title: 'Transparante aanpak zonder verrassingen', desc: "We geven u een duidelijke diagnose voordat we beginnen. Geen verborgen kosten, geen verrassingen op de factuur. Elke interventie wordt gedocumenteerd en gedetailleerd." },
              { icon: <Settings size={32} />, title: 'Originele Vaillant onderdelen', desc: "Tijdens elke reparatie gebruiken we uitsluitend originele Vaillant onderdelen — zodat uw garantie geldig blijft en het systeem optimaal blijft werken." },
              { icon: <MapPin size={32} />, title: 'Lokale kennis van Brussel', desc: "Wij kennen de specifieke uitdagingen van Brusselse woningen: oude leidingen, stedelijke waterkwaliteit en bouwnormen. Dit maakt ons snel en accuraat." },
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
      <section style={{ background: 'var(--color-gray-50)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Onze Diensten</span>
            <h2>Wat wij doen in Brussel</h2>
            <div className="divider" />
            <p>Van nooddiensten tot complete installaties — wij dekken alle facetten van loodgieterij en verwarming in Brussel.</p>
          </div>

          <div className="grid-3-strict">
            {[
              { image: '/images/service/1.jpg', icon: <Wrench size={32} />, title: 'Vaillant Herstelling Brussel', desc: "Probleem met uw Vaillant ketel? Onze gecertificeerde technici diagnosticeren en repareren alle Vaillant modellen snel en accuraat.", link: '/nl/diensten#vaillant-herstelling' },
              { image: '/images/service/2.jpg', icon: <Thermometer size={32} />, title: 'Boiler Vervangen Brussel', desc: "Is uw oude boiler aan het einde van zijn levensduur? Wij installeren een nieuwe, energiezuinige Vaillant ketel met volledige inbedrijfstelling.", link: '/nl/diensten#boiler-vervangen' },
              { image: '/images/projects/img-1.jpg', icon: <Grid size={32} />, title: 'Nieuwe Verwarming Plaatsen', desc: "Plannen voor nieuwe verwarming in Brussel? Wij ontwerpen en installeren een systeem op maat voor uw woning of bedrijfspand.", link: '/nl/diensten#verwarming' },
              { image: '/images/service/3.jpg', icon: <Construction size={32} />, title: 'Waterlek Herstellen Brussel', desc: "Een waterlek veroorzaakt snel schade. Ons team lokaliseert en repereert lekken onmiddellijk om ernstige schade aan uw eigendom te voorkomen.", link: '/nl/diensten#waterlek' },
              { image: '/images/service/5.jpg', icon: <Bath size={32} />, title: 'Sanitair Installatie Brussel', desc: "Badkamer renovatie of sanitaire toestellen? Wij installeren alles vakkundig: toiletten, douche, bad, wastafel en meer.", link: '/nl/diensten#sanitair' },
              { image: '/images/projects/img-3.jpg', icon: <Gauge size={32} />, title: 'Vaillant Onderhoudscontract', desc: "Jaarlijks onderhoud van uw Vaillant installatie. Inclusief inspectie, reiniging en een rapport voor gegarandeerde prestaties en duurzaamheid.", link: '/nl/diensten#onderhoud' },
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

      {/* ── PROOF ──────────────────────────────────────────── */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Bewijs &amp; Vertrouwen</span>
            <h2>Waarom klanten ons vertrouwen</h2>
            <div className="divider" />
            <p>Twee concrete en verifieerbare punten onderscheiden Villant Loodgieter van generieke loodgieters in Brussel.</p>
          </div>

          <div className="grid-2" style={{ marginBottom: '40px' }}>
            {[
              {
                icon: <Award size={48} color="var(--color-primary)" />,
                title: 'Gecertificeerd Vaillant partner',
                body: "Villant Loodgieter is officieel gecertificeerd als partner door Vaillant, een van de toonaangevende Europese fabrikanten van verwarmingssystemen. Onze certificering wordt rechtstreeks door de fabrikant verleend en weerspiegelt een echte merkexpertise.",
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

          <div className="grid-3">
            {[
              { name: 'Thomas V., Elsene', text: "Mijn Vaillant ketel begaf het op een koude winterochtend. Villant stuurde dezelfde dag nog iemand, de technicus stelde snel de diagnose en bracht het systeem weer aan de praat. Een indrukwekkende service." },
              { name: 'Sophie M., Sint-Gillis', text: "Ze hebben onze oude ketel vervangen door een nieuwe Vaillant. Aan het eind netjes werk, zeer duidelijke communicatie en geen verborgen kosten. Een absolute aanrader in Brussel." },
              { name: 'Karim L., Anderlecht', text: "Het waterlek in de badkamer was snel gelokaliseerd en gerepareerd. Ze legden elke stap uit en lieten de locatie erg schoon achter. Een team van professionals, dat merk je." },
            ].map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p style={{ fontStyle: 'italic', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>&quot;{t.text}&quot;</p>
                <div className="testimonial-author">— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS ──────────────────────────────────── */}
      <section style={{ background: 'var(--color-gray-50)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Regio</span>
            <h2>Loodgieter in heel Brussel</h2>
            <div className="divider" />
            <p>Als gecertificeerde Vaillant loodgieter in Brussel bedienen wij alle 19 gemeenten en de directe omgeving.</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '32px' }}>
            {[
              { name: 'Anderlecht', slug: 'anderlecht' },
              { name: 'Brussel-Stad', slug: 'brussel-stad' },
              { name: 'Elsene', slug: 'elsene' },
              { name: 'Etterbeek', slug: 'etterbeek' },
              { name: 'Evere', slug: 'evere' },
              { name: 'Ganshoren', slug: 'ganshoren' },
              { name: 'Jette', slug: 'jette' },
              { name: 'Koekelberg', slug: 'koekelberg' },
              { name: 'Sint-Jans-Molenbeek', slug: 'sint-jans-molenbeek' },
              { name: 'Oudergem', slug: 'oudergem' },
              { name: 'Schaarbeek', slug: 'schaarbeek' },
              { name: 'Sint-Joost-ten-Node', slug: 'sint-joost-ten-node' },
              { name: 'Sint-Agatha-Berchem', slug: 'sint-agatha-berchem' },
              { name: 'Sint-Gillis', slug: 'sint-gillis' },
              { name: 'Sint-Lambrechts-Woluwe', slug: 'sint-lambrechts-woluwe' },
              { name: 'Sint-Pieters-Woluwe', slug: 'sint-pieters-woluwe' },
              { name: 'Ukkel', slug: 'ukkel' },
              { name: 'Vorst', slug: 'vorst' },
              { name: 'Watermaal-Bosvoorde', slug: 'watermaal-bosvoorde' },
            ].map((area) => (
              <Link
                key={area.slug}
                href={`/nl/brussel#${area.slug}`}
                className="area-chip"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <MapPin size={14} /> {area.name}
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/nl/brussel" className="btn btn-outline">Meer info over onze regio</Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────── */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Werkwijze</span>
            <h2>Hoe werkt het?</h2>
            <div className="divider" />
            <p>Vier eenvoudige stappen — van uw eerste contact tot een werkende installatie.</p>
          </div>

          <div className="steps-grid">
            {[
              { n: '1', title: 'Neem contact op', desc: "Stuur een e-mail naar contact@villant-loodgieter.be. Beschrijf uw probleem of verzoek zo nauwkeurig mogelijk." },
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
      <section style={{ background: 'var(--color-gray-50)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <span className="badge badge-green">FAQ</span>
            <h2>Veelgestelde Vragen</h2>
            <div className="divider" />
          </div>
          {[
            { q: 'Bent u een officieel gecertificeerd Vaillant partner?', a: "Ja. Villant Loodgieter is officieel gecertificeerd door het merk Vaillant. Onze technici nemen deel aan directe fabrieksopleidingen en zijn erkend voor de installatie, het onderhoud en de reparatie van Vaillant systemen in België." },
            { q: 'Wat kost een Vaillant ketel reparatie in Brussel?', a: "De uiteindelijke kosten hangen af van het specifieke defect en de benodigde Vaillant onderdelen. We stellen altijd een diagnose ter plaatse en geven een duidelijke offerte. Geen verrassende extra kosten. Mail naar contact@villant-loodgieter.be voor een schatting." },
            { q: 'Hoe snel kunt u ingrijpen bij een noodgeval?', a: "We streven naar een zo snel mogelijke interventie bij volledige uitval van verwarming of water. Vermeld « SPOEDGEVAL » in de onderwerpregel van uw e-mail zodat wij uw verzoek prioriteit kunnen geven." },
            { q: 'Welke Vaillant toestellen repareert u?', a: "Wij repareren en onderhouden alle Vaillant modellen, waaronder wandgasketels (ecoTEC, turboTEC series), warmtepompen en andere thermodynamische oplossingen van het merk." },
            { q: 'Biedt u een onderhoudscontract aan voor Vaillant installaties?', a: "Ja, een compleet Vaillant onderhoudscontract voor verwarming inclusief de jaarlijkse revisie, reiniging en controle van de instellingen. Het verplichte onderhoud verlengt de levensduur en optimaliseert de werking van uw toestel." },
            { q: 'Welke gemeenten in Brussel dekt Villant Loodgieter?', a: "Het volledige Brussels Hoofdstedelijk Gewest. Van Anderlecht, Elsene, Schaarbeek tot Ukkel via Woluwe of Sint-Gillis." },
          ].map((faq, i) => (
            <details key={i} className="faq-item">
              <summary>{faq.q}</summary>
              <div className="faq-answer">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* ── BLOG CAROUSEL ──────────────────────────────────── */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Blog & Advies</span>
            <h2>Laatste nieuws van Villant Loodgieter</h2>
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

      {/* ── CTA BAND ───────────────────────────────────────── */}
      <section className="cta-band">
        <div className="container">
          <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', marginBottom: '20px' }}>
            Trots werkzaam in Brussel en omstreken
          </span>
          <h2>Klaar om uw Vaillant installatie te repareren of te optimaliseren?</h2>
          <p>Neem vandaag nog contact op met uw gecertificeerde Vaillant partner in Brussel. Wij analyseren uw verzoek snel.</p>
          <div className="cta-actions">
            <a href="mailto:contact@villant-loodgieter.be" className="btn btn-ghost-dark" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={18} /> contact@villant-loodgieter.be
            </a>
            <Link href="/nl/diensten" className="btn btn-ghost-dark">
              Bekijk onze diensten
            </Link>
          </div>
          <p style={{ marginTop: '24px', fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.55)', maxWidth: 'none' }}>
            Gecertificeerd Vaillant partner · Gekwalificeerde technici · Heel Brussel
          </p>
        </div>
      </section>
    </>
  );
}
