import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Diensten – Vaillant herstelling België | Vaillant Loodgieter',
  description:
    'Alle loodgieters- en verwarmingsdiensten in België: Vaillant herstelling, boiler vervangen, nieuwe verwarming, waterlek herstellen, sanitair installatie en onderhoudscontract.',
  keywords: [
    'Vaillant herstelling België',
    'boiler vervangen België',
    'nieuwe verwarming België',
    'waterlek herstellen België',
    'sanitair installatie België',
    'Vaillant onderhoudscontract',
    'loodgieter spoed België',
  ],
  alternates: { canonical: 'https://vaillant-loodgieter.com/nl/diensten' },
  openGraph: {
    title: 'Diensten – Vaillant herstelling België | Vaillant Loodgieter',
    description: 'Professionele loodgieters- en verwarmingsdiensten door een gecertificeerd Vaillant partner in België.',
    url: 'https://vaillant-loodgieter.com/nl/diensten',
  },
};

const services = [
  {
    id: 'vaillant-herstelling',
    icon: 'wrench.svg',
    title: 'Vaillant herstelling',
    keyword: 'Vaillant Herstelling',
    short: 'Een defect? Wij herstellen uw Vaillant ketel snel en correct.',
    body: [
      'Een Vaillant ketel die uitvalt is meer dan ongemakkelijk — in de winter kan dit een noodgeval worden. Als gecertificeerd Vaillant partner beschikken wij over de gespecialiseerde kennis en originele onderdelen om uw toestel snel en duurzaam te repareren.',
      'Onze technici zijn opgeleid door Vaillant en kennen alle ecoTEC, turboTEC en ecoCOMPACT modellen door en door. We diagnosticeren het probleem nauwkeurig voordat u kosten maakt — zodat u een weloverwogen beslissing kunt nemen.',
      'Na de herstelling ontvangt u een technisch verslag met de uitgevoerde acties en een advies voor preventief onderhoud om herhaling te voorkomen.',
    ],
    highlights: ['Originele Vaillant onderdelen', 'Gecertificeerd technicus', 'Technisch verslag na interventie'],
  },
  {
    id: 'boiler-vervangen',
    icon: 'water-heater-1.svg',
    title: 'Boiler vervangen',
    keyword: 'Boiler vervangen',
    short: 'Oud toestel? Wij installeren uw nieuwe Vaillant ketel professioneel.',
    body: [
      'Een ketel ouder dan 15 jaar verbruikt tot 30% meer gas dan een modern toestel. Uw ketel vervangen in België is dus een investering met een meetbaar rendement — niet alleen in comfort, maar ook op uw energiefactuur.',
      'Wij begeleiden u bij de keuze van het juiste Vaillant model op basis van uw woningtype, het aantal kamers en uw verwarmingsbehoeften. Vervolgens zorgen we voor een volledige installatie volgens de Belgische normen, inclusief inbedrijfstelling.',
      'Duurzame verwarmingsoplossingen zijn onze specialiteit: van de traditionele gaswandketel tot hybride warmpompcombinaties.',
    ],
    highlights: ['Advies op maat', 'Volledige installatie en inbedrijfstelling', 'Conform Belgische normen'],
  },
  {
    id: 'verwarming',
    icon: 'radiator.svg',
    title: 'Nieuwe verwarming',
    keyword: 'Nieuwe verwarming',
    short: 'Nieuwbouw of renovatie? Wij ontwerpen en installeren uw verwarmingssysteem.',
    body: [
      'Of het nu gaat om het verwarmen van een nieuwbouw of het vervangen van een compleet systeem in een bestaande woning — de juiste dimensionering bepaalt jarenlang uw comfort en energieverbruik. Wij maken een thermische analyse voordat we een systeem voorstellen.',
      'Als gecertificeerd installateur werken we met Vaillant producten die hun prestaties onder het Belgische klimaat hebben bewezen. Wij installeren vloerverwarming, radiatoren en thermostatische regelsystemen.',
      'Elk project wordt opgeleverd met volledige documentatie en een technisch dossier voor uw EPB-aangifte indien van toepassing.',
    ],
    highlights: ['Voorgaande thermische analyse', 'Volledige documentatie en EPB-dossier', 'Gecertificeerd Vaillant installateur'],
  },
  {
    id: 'waterlek',
    icon: 'pipes.svg',
    title: 'Waterlek herstellen',
    keyword: 'Waterlek herstellen',
    short: 'Een waterlek veroorzaakt snel schade — wij lokaliseren en herstellen snel.',
    body: [
      'Een waterlek — zichtbaar of onzichtbaar — kan in korte tijd grote schade aanrichten aan uw structuur, vloeren en muren. Onze technici beschikken over de nodige apparatuur om onzichtbare lekken te detecteren zonder onnodig breekwerk.',
      'Na lokalisatie geven we u een duidelijke uitleg over het probleem en de hersteloptie. We werken snel en efficiënt om waterschade in uw eigendom te minimaliseren.',
      'Bezwaar: "Ik zie geen lek, dus er is niets?" — Verborgen lekken in leidingen achter muren of onder vloeren vallen op door een stijgende waterfactuur of vochtplekken. Wacht niet tot de schade zichtbaar is.',
    ],
    highlights: ['Lekdetectie zonder onnodig breekwerk', 'Snelle interventie', 'Duidelijke offerte vooraf'],
  },
  {
    id: 'sanitair',
    icon: 'bathtub.svg',
    title: 'Sanitair installatie',
    keyword: 'Sanitair installatie',
    short: 'Badkamerrenovatie of nieuwe toestellen — installatie door gecertificeerde loodgieters.',
    body: [
      'Van een simpele kraan tot een volledige badkamerrenovatie — onze gekwalificeerde loodgieters installeren alle sanitaire voorzieningen: WC, douche, bad, lavabo, bidet en meer.',
      'Bij elke installatie respecteren we de Belgische bouwvoorschriften. Elk project wordt afgewerkt met de nodige afdichtingen, veiligheidsventilatie en controle van de waterdruk.',
      'Twijfelt u over de keuze van uw toestellen? Onze technici adviseren u over waterbesparende configuraties die ook uw energieverbruik verlagen.',
    ],
    highlights: ['Alle sanitaire voorzieningen', 'Conform Belgische regelgeving', 'Advies voor waterbesparing'],
  },
  {
    id: 'onderhoud',
    icon: 'gauge.svg',
    title: 'Vaillant Onderhoudscontract',
    keyword: 'Onderhoudscontract',
    short: 'Jaarlijks professioneel onderhoud om de levensduur van uw installatie te maximaliseren.',
    body: [
      'Preventief onderhoud is de meest rendabele bescherming voor uw verwarmingssysteem. Een jaarlijks Vaillant onderhoudscontract omvat een volledige inspectie, reiniging van de brander en warmtewisselaar, en een schriftelijk rapport.',
      'Bezwaar: "Mijn ketel werkt goed, waarom onderhoud?" — Ketels die niet jaarlijks worden onderhouden, verliezen geleidelijk hun efficiëntie en vallen vaker uit — precies op het moment dat u ze het meest nodig heeft.',
      'Als gecertificeerd Vaillant partner voeren wij het onderhoud uit volgens de officiële Vaillant protocollen, waardoor uw garantie van kracht blijft.',
    ],
    highlights: ['Jaarlijkse inspectie en reiniging', 'Garantie blijft geldig', 'Schriftelijk rapport'],
  },
];

export default function DienstenPage() {
  return (
    <>
      {/* HERO */}
      <section style={{
        background: `linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.5) 100%), url('/images/service/6.jpg') center/cover no-repeat`,
        padding: '5rem 1.5rem 4rem',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="container">
          <span className="badge badge-green" style={{ marginBottom: '1rem' }}>Services Certifiés Vaillant</span>
          <h1 style={{ marginBottom: '1rem' }}>
            Vaillant herstelling België &amp; alle loodgietersdiensten
          </h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '60ch', marginBottom: '2rem' }}>
            Vaillant Loodgieter is uw gecertificeerde partner voor alle verwarmings- en loodgietersdiensten in België. Van spoedinterventies tot het jaarlijks Vaillant onderhoudscontract.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="mailto:contact@vaillant-loodgieter.com" className="btn btn-primary">Demander un devis</a>
            <Link href="/" className="btn btn-outline">← Retour à l'accueil</Link>
          </div>
        </div>
      </section>

      {/* VALUE PROP */}
      <section style={{ background: 'var(--bg-secondary)', padding: '3rem 1.5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {[
              { icon: 'plumber-1.svg', text: 'Gecertificeerd Vaillant partner' },
              { icon: 'wrench-2.svg', text: 'Gekwalificeerde technici' },
              { icon: 'pipes-7.svg', text: 'Transparante offertes' },
              { icon: 'flange.svg', text: 'Originele Vaillant onderdelen' },
            ].map((v) => (
              <div key={v.text} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                background: '#fff', borderRadius: 'var(--radius)', padding: '1rem 1.25rem',
                border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)',
              }}>
                <span style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center' }}>
                  <Image src={`/icons/plumbing-elements/${v.icon}`} alt={v.text} width={24} height={24} />
                </span>
                <span style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{v.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES (detailed) */}
      <section>
        <div className="container">
          <div className="section-header">
            <h2>Nos services</h2>
            <div className="divider" />
            <p>Chacun de nos services est effectué par des techniciens certifiés avec des pièces d'origine Vaillant.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {services.map((s, i) => (
              <div
                key={s.id}
                id={s.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: i % 2 === 0 ? '1fr 2fr' : '2fr 1fr',
                  gap: '2.5rem',
                  background: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2.5rem',
                  border: '1px solid var(--border)',
                  alignItems: 'center',
                }}
              >
                <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                  <div style={{
                    width: '80px', height: '80px',
                    background: 'var(--color-primary-light)',
                    borderRadius: 'var(--radius)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1rem',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--color-primary-mid)',
                  }}>
                    <Image src={`/icons/plumbing-elements/${s.icon}`} alt={s.title} width={40} height={40} />
                  </div>
                  <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>{s.keyword}</span>
                  <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', marginTop: '0.5rem' }}>{s.title}</h2>
                  <p style={{ fontWeight: 600, color: 'var(--brand-color)', marginBottom: '1rem' }}>{s.short}</p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {s.highlights.map((h) => (
                      <li key={h} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--brand-accent)', fontWeight: 700 }}>✓</span> {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                  {s.body.map((para, pi) => (
                    <p key={pi} style={{ marginBottom: pi < s.body.length - 1 ? '1rem' : 0, fontSize: '0.95rem', lineHeight: 1.75 }}>{para}</p>
                  ))}
                  <div style={{ marginTop: '1.5rem' }}>
                    <a href="mailto:contact@vaillant-loodgieter.com" className="btn btn-primary" style={{ fontSize: '0.9rem' }}>
                      Priez un devis
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-gold">Avantages</span>
            <h2 style={{ marginTop: '1rem' }}>Pourquoi choisir vaillant Plombier ?</h2>
            <div className="divider" />
          </div>
          <div className="grid-3-strict">
            {[
              { icon: 'plumber-1.svg', title: 'Vaillant Gecertificeerd', desc: 'De officiële certificering is het resultaat van directe fabrieksopleiding — wij zijn geen zelfverklaarde experts.' },
              { icon: 'flange.svg', title: 'Originele onderdelen', desc: 'Wij gebruiken uitsluitend originele Vaillant onderdelen zodat uw garantie behouden blijft.' },
              { icon: 'pipes-7.svg', title: 'Schriftelijke historie', desc: 'Na elke interventie ontvangt u een gedetailleerd technisch verslag — voor uw dossier en EPB-aangifte.' },
            ].map((b) => (
              <div key={b.title} className="card">
                <div className="icon-box">
                  <Image src={`/icons/plumbing-elements/${b.icon}`} alt={b.title} width={32} height={32} />
                </div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{b.title}</h3>
                <p style={{ fontSize: '0.9rem' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Témoignages</span>
            <h2 style={{ marginTop: '1rem' }}>Ce que disent nos clients</h2>
            <div className="divider" />
          </div>
          <div className="grid-3">
            {[
              { name: 'Marc D., Schaerbeek', text: 'La réparation Vaillant s\'est déroulée rapidement. Le technicien était professionnel, a expliqué chaque étape et a travaillé proprement. La chaudière fonctionne mieux que jamais.' },
              { name: 'Amina B., Molenbeek', text: 'Remplacement de la chaudière suite aux conseils de vaillant. Ils ont choisi le bon modèle pour mon appartement et l\'installation s\'est déroulée sans accroc. Je recommande !' },
              { name: 'Lieve T., Uccle', text: 'J\'ai souscrit un contrat d\'entretien pour mon ecoTEC Vaillant. Ils sont ponctuels chaque année, le rapport est clair et la chaudière fonctionne parfaitement.' },
            ].map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p style={{ fontStyle: 'italic', fontSize: '0.9rem', lineHeight: 1.7 }}>&quot;{t.text}&quot;</p>
                <div className="testimonial-author">— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge badge-gold">Région</span>
          <h2 style={{ marginTop: '1rem', marginBottom: '1rem' }}>Actief in België</h2>
          <div className="divider" />
          <p style={{ margin: '0 auto 2rem', maxWidth: '55ch' }}>
            Wij leveren bovenstaande diensten in meerdere steden en regio’s in België, afhankelijk van de beschikbaarheid van onze teams en het type interventie.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
            {['Brussel', 'Antwerpen', 'Gent', 'Leuven', 'Brugge', 'Mechelen', 'Hasselt'].map((a) => (
              <span key={a} className="area-chip">📍 {a}</span>
            ))}
          </div>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/nl/loodgieter" className="btn btn-outline">Bekijk onze bediende zones →</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Méthode de travail</span>
            <h2 style={{ marginTop: '1rem' }}>Comment demander un service ?</h2>
            <div className="divider" />
          </div>
          <div className="grid-4">
            {[
              { n: '1', title: 'Contactez-nous', desc: 'E-mail naar contact@vaillant-loodgieter.com met uw probleem en uw adres.' },
              { n: '2', title: 'Diagnostic', desc: 'Notre technicien inspecte et établit un devis transparent avant toute intervention.' },
              { n: '3', title: 'Intervention', desc: 'Des professionnels certifiés effectuent le service avec des pièces Vaillant d\'origine.' },
              { n: '4', title: 'Rapport', desc: 'Vous recevez un rapport technique écrit et des recommandations d\'entretien.' },
            ].map((step) => (
              <div key={step.n} style={{ textAlign: 'center' }}>
                <div className="step-number" style={{ margin: '0 auto 1rem' }}>{step.n}</div>
                <h4 style={{ marginBottom: '0.5rem' }}>{step.title}</h4>
                <p style={{ fontSize: '0.87rem' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '750px' }}>
          <div className="section-header">
            <span className="badge badge-gold">FAQ</span>
            <h2 style={{ marginTop: '1rem' }}>Questions fréquentes sur nos services</h2>
            <div className="divider" />
          </div>
          {[
            { q: 'Travaillez-vous exclusivement avec des appareils Vaillant ?', a: 'Notre spécialité et notre certification concernent les systèmes Vaillant. Nous sommes vos experts de référence pour la réparation, l\'entretien et l\'installation Vaillant en Belgique.' },
            { q: 'Que faire si j\'ai besoin d\'une réparation d\'urgence ?', a: 'Envoyez un e-mail avec "URGENCE" en objet à contact@vaillant-loodgieter.com. Nous traitons les demandes d\'intervention urgente en priorité.' },
            { q: 'Le remplacement de la chaudière modifie-t-il ma facture d\'énergie ?', a: 'Une chaudière Vaillant moderne et économe en énergie peut réduire considérablement votre consommation de gaz par rapport à un appareil obsolète. Nous vous conseillons sur les économies réalistes pour votre situation spécifique.' },
            { q: 'Combien de temps dure un entretien ?', a: 'Un entretien annuel standard dure en moyenne 1 à 2 heures, selon le modèle et l\'état de l\'installation.' },
          ].map((faq, i) => (
            <details key={i} className="faq-item">
              <summary>{faq.q}</summary>
              <div className="faq-answer">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2>Prêt à optimiser votre installation Vaillant ?</h2>
          <p>Contactez Vaillant Loodgieter — uw gecertificeerde Vaillant partner in België.</p>
          <div className="cta-actions">
            <a href="mailto:contact@vaillant-loodgieter.com" className="btn btn-ghost-dark">📧 Envoyer un message</a>
            <Link href="/over-ons" className="btn btn-ghost-dark">
              À propos de nous →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
