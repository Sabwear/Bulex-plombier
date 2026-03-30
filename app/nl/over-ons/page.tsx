import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import StatsRow from '@/components/home/StatsRow';
import { buildLocaleAlternates } from '@/lib/seoAlternates';

export const metadata: Metadata = {
  title: 'Over Ons – Gecertificeerd Vaillant Partner België | Vaillant Loodgieter',
  description:
    'Vaillant Loodgieter is een gecertificeerd Vaillant partner in België met gekwalificeerde en ervaren technici. Ontdek onze expertise en onze missie.',
  keywords: [
    'gecertificeerd Vaillant partner België',
    'Vaillant loodgieter België',
    'gekwalificeerde loodgieters België',
    'verwarmingsinstallateur België',
  ],
  alternates: buildLocaleAlternates('/nl/over-ons'),
  openGraph: {
    title: 'Over Ons – Gecertificeerd Vaillant Partner België | Vaillant Loodgieter',
    description: 'Vaillant Loodgieter: gecertificeerd Vaillant partner met gekwalificeerde technici actief in België.',
    url: 'https://vaillant-loodgieter.com/nl/over-ons',
  },
};

export default function OverOnsPage() {
  return (
    <>
      {/* HERO */}
      <section style={{
        background: `linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.5) 100%), url('/images/team/1.jpg') center/cover no-repeat`,
        padding: '5rem 1.5rem 4rem',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="container">
          <span className="badge badge-green" style={{ marginBottom: '1rem' }}>Gecertificeerd Vaillant Partner België</span>
          <h1 style={{ marginBottom: '1rem' }}>
            Vaillant Loodgieter — uw gecertificeerde Vaillant partner in België
          </h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '60ch', marginBottom: '2rem' }}>
            Wij zijn een gecertificeerd Vaillant partner in België. Onze gekwalificeerde technici combineren officiële fabrieksopleiding met bewezen praktijkervaring voor uw verwarmings- en sanitaire behoeften.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="mailto:contact@vaillant-loodgieter.com" className="btn btn-primary">Contacteer ons</a>
            <Link href="/nl/diensten" className="btn btn-outline">
              Onze diensten →
            </Link>
          </div>
        </div>
      </section>

      {/* IMAGE + VALUE PROP */}
      <section style={{ background: 'var(--bg-secondary)', padding: '3rem 1.5rem' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '1.75rem' }}>
            <div>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <Image
                  src="/images/slider-vaillant-2.png"
                  alt="Vaillant-technici bij een interventie in België"
                  width={720}
                  height={640}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
            </div>
            <div>
              <p style={{ marginBottom: '1rem', fontSize: '0.95rem', color: 'rgb(71,85,105)' }}>
                Enkele kernpunten die onze manier van werken in België samenvatten:
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { icon: 'plumber-1.svg', label: 'Officieel Vaillant Gecertificeerd' },
                  { icon: 'wrench-2.svg', label: 'Gekwalificeerde Technici' },
                  { icon: 'pipes-7.svg', label: 'Actief in België' },
                  { icon: 'flange.svg', label: 'Technische Verslagen' },
                ].map((v) => (
                  <div key={v.label} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    background: '#fff', borderRadius: 'var(--radius)', padding: '1rem 1.25rem',
                    border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)',
                  }}>
                    <span style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center' }}>
                      <Image src={`/icons/plumbing-elements/${v.icon}`} alt={v.label} width={24} height={24} />
                    </span>
                    <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>{v.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 max-w-3xl mx-auto">
            <StatsRow locale="nl" />
          </div>
        </div>
      </section>

      {/* PROOF — FIRST (Proof-first order for About page) */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Nos Preuves</span>
            <h2 style={{ marginTop: '1rem' }}>Deux preuves concrètes de notre expertise</h2>
            <div className="divider" />
            <p>Nous ne faisons pas de fausses promesses. Voici les deux preuves concrètes et vérifiables sur lesquelles vous pouvez nous juger.</p>
          </div>

          <div className="grid-2" style={{ marginBottom: '3rem' }}>
            <div className="proof-card">
              <div style={{ marginBottom: '1rem' }}>
                <Image src="/icons/plumbing-elements/plumber-1.svg" alt="Vaillant Gecertificeerd" width={64} height={64} />
              </div>
              <h3 style={{ marginBottom: '0.75rem', fontSize: '1.3rem' }}>
                Bewijs 1: Gecertificeerd Vaillant partner, actief in België
              </h3>
              <p style={{ lineHeight: 1.75 }}>
                vaillant Loodgieter is officieel gecertificeerd door Vaillant — een van de toonaangevende Europese fabrikanten van verwarmingssystemen. Onze certificering vereist directe fabrieksopleiding, technische examens en aantoonbare praktijkervaring. Het is niet zelfverklaard; het is een externe erkenning door Vaillant zelf.
              </p>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--color-primary-hover)', fontWeight: 600 }}>
                Wat dit voor u betekent: wanneer wij uw Vaillant systeem installeren of onderhouden, blijft uw fabrieksgarantie volledig geldig.
              </p>
            </div>

            <div className="proof-card">
              <div style={{ marginBottom: '1rem' }}>
                <Image src="/icons/plumbing-elements/wrench-2.svg" alt="Gekwalificeerde Technici" width={64} height={64} />
              </div>
              <h3 style={{ marginBottom: '0.75rem', fontSize: '1.3rem' }}>
                Bewijs 2: Gekwalificeerde en ervaren technici
              </h3>
              <p style={{ lineHeight: 1.75 }}>
                Elk lid van ons technisch team beschikt over aantoonbare kwalificaties en een bewezen staat van dienst in loodgieterij en verwarmingssystemen. Wij werken niet met ongetrainde krachten of stagiairs voor uw installatie. Elke technicus kan zijn certificaten voorleggen bij aankomst.
              </p>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--color-primary-hover)', fontWeight: 600 }}>
                Wat dit voor u betekent: u geniet van een consistente en professionele service — niet het roulatiesysteem van interimmers waaraan u zich bij andere bedrijven blootstelt.
              </p>
            </div>
          </div>

          {/* Objection handling */}
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)', padding: '2.5rem',
            border: '1px solid var(--border)',
          }}>
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Objections fréquentes des clients — et nos réponses honnêtes</h3>
            <div className="grid-2">
              {[
                {
                  q: '&quot;Êtes-vous vraiment certifiés ou dites-vous simplement cela ?&quot;',
                  a: 'Réponse honnête : notre certification Vaillant est délivrée de manière externe par Vaillant Belgium. Elle n\'est pas autoproclamée. Vous pouvez confirmer auprès de Vaillant que nous sommes un partenaire certifié.',
                },
                {
                  q: '&quot;Êtes-vous plus chers que les plombiers ordinaires ?&quot;',
                  a: 'Réponse honnête : les partenaires certifiés travaillent avec des pièces d\'origine et des procédures documentées. Cela a un coût. Mais cela évite des visites répétées et préserve votre garantie — ce qui s\'avère moins cher à long terme.',
                },
              ].map((obj, i) => (
                <div key={i} style={{ padding: '1.5rem', background: '#fff', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', fontSize: '0.95rem' }}
                    dangerouslySetInnerHTML={{ __html: obj.q }} />
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>{obj.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-gold">Ce que vous obtenez</span>
            <h2 style={{ marginTop: '1rem' }}>Avantages de travailler avec vaillant Plombier</h2>
            <div className="divider" />
          </div>
          <div className="grid-3-strict">
            {[
              { icon: 'flange.svg', title: 'Originele Vaillant onderdelen', desc: 'Wij gebruiken nooit generieke onderdelen. Elke herstelling wordt uitgevoerd met originele Vaillant onderdelen voor maximale betrouwbaarheid.' },
              { icon: 'pipes-7.svg', title: 'Technische verslagen', desc: 'Na elke interventie ontvangt u een schriftelijk verslag — nuttig voor uw woningdossier en eventuele EPB-verplichtingen.' },
              { icon: 'plumber-1.svg', title: 'Lokale expertise in België', desc: 'Wij kennen de lokale context: oude leidingen, waterkwaliteit en Belgische bouwvoorschriften — dit maakt ons nauwkeuriger en efficiënter.' },
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

      {/* SERVICES overview */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Nos Services</span>
            <h2 style={{ marginTop: '1rem' }}>Ce que nous offrons à Bruxelles</h2>
            <div className="divider" />
          </div>
          <div className="grid-3-strict">
            {[
              { icon: 'wrench.svg', title: 'Vaillant Herstelling', href: '/nl/diensten#vaillant-herstelling' },
              { icon: 'water-heater-1.svg', title: 'Boiler Vervangen', href: '/nl/diensten#boiler-vervangen' },
              { icon: 'radiator.svg', title: 'Nieuwe Verwarming', href: '/nl/diensten#verwarming' },
              { icon: 'pipes.svg', title: 'Waterlek Herstellen', href: '/nl/diensten#waterlek' },
              { icon: 'bathtub.svg', title: 'Sanitair Installatie', href: '/nl/diensten#sanitair' },
              { icon: 'gauge.svg', title: 'Onderhoudscontract', href: '/nl/diensten#onderhoud' },
            ].map((s) => (
              <Link key={s.title} href={s.href} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                  <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>
                    <Image src={`/icons/plumbing-elements/${s.icon}`} alt={s.title} width={48} height={48} />
                  </div>
                  <h4 style={{ color: 'var(--brand-color)' }}>{s.title}</h4>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/diensten" className="btn btn-primary">Voir tous les services →</Link>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge badge-gold">Zone d'Intervention</span>
          <h2 style={{ marginTop: '1rem', marginBottom: '0.75rem' }}>Fiers d'intervenir à Bruxelles et ses environs</h2>
          <div className="divider" />
          <p style={{ margin: '0 auto 2rem', maxWidth: '55ch' }}>
            D'Anderlecht à Watermael-Boitsfort — vaillant Plombier dessert l'ensemble des communes bruxelloises en tant que votre plombier Vaillant local à Bruxelles.
          </p>
          <Link href="/brussel" className="btn btn-outline">Voir notre zone d'intervention →</Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Méthode de Travail</span>
            <h2 style={{ marginTop: '1rem' }}>Comment nous travaillons</h2>
            <div className="divider" />
          </div>
          <div className="grid-4">
            {[
              { n: '1', title: 'Contact', desc: 'Envoyez un e-mail à contact@vaillant-loodgieter.com pour toute demande.' },
              { n: '2', title: 'Diagnostic', desc: 'Diagnostic transparent et devis avant intervention.' },
              { n: '3', title: 'Intervention', desc: 'Technicien certifié travaillant avec des pièces d\'origine.' },
              { n: '4', title: 'Rapport', desc: 'Rapport technique écrit et complet après l\'intervention.' },
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
            <h2 style={{ marginTop: '1rem' }}>Vragen over vaillant Loodgieter</h2>
            <div className="divider" />
          </div>
          {[
            { q: 'Hoe kan ik bevestigen dat jullie echt gecertificeerd zijn door Vaillant?', a: 'U kunt onze status als gecertificeerd partner rechtstreeks bevestigen bij Vaillant Belgium. Wij zijn transparant over onze kwalificaties en onze technici tonen hun certificaten bij elke interventie.' },
            { q: 'In welke talen communiceren jullie?', a: 'Wij communiceren in het Frans en Nederlands. Voor alle vragen kunt u contact opnemen met contact@vaillant-loodgieter.com en wij zullen u zo goed mogelijk begeleiden.' },
            { q: 'Behandelen jullie ook commerciële projecten?', a: 'Onze diensten zijn momenteel voornamelijk gericht op woningen en residentieel vastgoed in België. Neem contact met ons op voor commerciële aanvragen — we bespreken dit per geval.' },
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
          <h2>Prenez contact avec votre partenaire Vaillant certifié</h2>
          <p>Partenaire certifié Vaillant · Techniciens qualifiés · Tout Bruxelles</p>
          <div className="cta-actions">
            <a href="mailto:contact@vaillant-loodgieter.com" className="btn btn-ghost-dark">📧 Envoyer un message</a>
            <Link href="/diensten" className="btn btn-ghost-dark">
              Nos services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
