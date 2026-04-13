import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildLocaleAlternates } from '@/lib/seoAlternates';
import ContactRequestForm from '@/components/forms/ContactRequestForm';

export const metadata: Metadata = {
  title: 'Contact – Vaillant Loodgieter België | Vaillant Loodgieter',
  description:
    'Contacteer Vaillant Loodgieter – uw gecertificeerde Vaillant loodgieter in België. Stuur een e-mail naar contact@vaillant-loodgieter.com voor een offerte of noodinterventie.',
  keywords: [
    'contact Vaillant loodgieter België',
    'loodgieter spoed België',
    'aanvraag Vaillant herstelling België',
  ],
  alternates: buildLocaleAlternates('/nl/contact'),
  openGraph: {
    title: 'Contact – Vaillant Loodgieter',
    description: 'Contacteer uw gecertificeerde Vaillant loodgieter in België.',
    url: 'https://vaillant-loodgieter.com/nl/contact',
  },
};

export default function ContactPage() {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'contact@vaillant-loodgieter.com';

  return (
    <>
      {/* HERO */}
      <section style={{
        background: `linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.5) 100%), url('/images/contact.jpg') center/cover no-repeat`,
        padding: '5rem 1.5rem 4rem',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="container">
          <span className="badge badge-green" style={{ marginBottom: '1rem' }}>Contact</span>
          <h1 style={{ marginBottom: '1rem' }}>
            Contacteer uw Vaillant loodgieter in België
          </h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '55ch', marginBottom: '2rem' }}>
            Heeft u een loodgietersprobleem, wilt u een offerte aanvragen of een onderhoudscontract bespreken? Vaillant Loodgieter staat voor u klaar.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/nl/demande-offerte" className="btn btn-primary">Offerte aanvragen</Link>
            <Link href="/nl" className="btn btn-outline">
              ← Terug naar home
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section>
        <div className="container">
          <div className="grid items-start gap-8 lg:grid-cols-2">

            {/* Contact details */}
            <div>
              <span className="badge badge-blue" style={{ marginBottom: '1rem' }}>Gegevens</span>
              <h2 style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>Hoe bereikt u ons</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ width: '24px', height: '24px', flexShrink: 0, marginTop: '0.2rem' }}>
                    <Image src="/icons/plumbing-elements/pipes-7.svg" alt="Email" width={24} height={24} />
                  </span>
                  <div>
                    <h4 style={{ marginBottom: '0.3rem' }}>E-mail</h4>
                    <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                      contact@vaillant-loodgieter.com
                    </span>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.3rem' }}>
                      Stuur een e-mail met uw vraag, adres en een beschrijving van het probleem. Wij antwoorden u zo snel mogelijk.
                    </p>
                  </div>
                </div>

                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ width: '24px', height: '24px', flexShrink: 0, marginTop: '0.2rem' }}>
                    <Image src="/icons/plumbing-elements/wrench-1.svg" alt="Spoed" width={24} height={24} />
                  </span>
                  <div>
                    <h4 style={{ marginBottom: '0.3rem' }}>Spoed</h4>
                    <p style={{ fontSize: '0.9rem' }}>
                      Voor dringende interventies — ketel- of waterproblemen — voeg "SPOED" toe aan het onderwerp van uw e-mail. Wij behandelen dringende aanvragen met prioriteit.
                    </p>
                  </div>
                </div>

                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ width: '24px', height: '24px', flexShrink: 0, marginTop: '0.2rem' }}>
                    <Image src="/icons/plumbing-elements/plumber-1.svg" alt="Zone" width={24} height={24} />
                  </span>
                  <div>
                    <h4 style={{ marginBottom: '0.3rem' }}>Interventiezone</h4>
                    <p style={{ fontSize: '0.9rem' }}>
                      België — interventies afhankelijk van de beschikbaarheid van onze teams en het type aanvraag.
                    </p>
                    <Link href="/nl/brussel" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-primary)', marginTop: '0.5rem', display: 'inline-block' }}>
                      Bekijk onze zone →
                    </Link>
                  </div>
                </div>

              </div>
            </div>

            {/* Formulaire — same structure as /fr/contact */}
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Formulier</span>
              <h2 style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>Stuur uw aanvraag</h2>
              <ContactRequestForm supportEmail={supportEmail} locale="nl" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES - brief */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Onze diensten</span>
            <h2 style={{ marginTop: '1rem' }}>Waarom kunt u ons contacteren?</h2>
            <div className="divider" />
          </div>
          <div className="grid-3-strict">
            {[
              { icon: 'wrench.svg', title: 'Vaillant herstelling' },
              { icon: 'water-heater-1.svg', title: 'Boiler vervangen' },
              { icon: 'pipes.svg', title: 'Waterlek herstellen' },
              { icon: 'bathtub.svg', title: 'Sanitair installatie' },
              { icon: 'radiator.svg', title: 'Nieuwe verwarming' },
              { icon: 'gauge.svg', title: 'Vaillant onderhoudscontract' },
            ].map((s) => (
              <div key={s.title} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                background: '#fff', borderRadius: 'var(--radius)', padding: '1rem 1.25rem',
                border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)',
              }}>
                <span style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center' }}>
                  <Image src={`/icons/plumbing-elements/${s.icon}`} alt={s.title} width={24} height={24} />
                </span>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{s.title}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/nl/diensten" className="btn btn-primary">Bekijk alle diensten →</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="container" style={{ maxWidth: '720px' }}>
          <div className="section-header">
            <span className="badge badge-gold">FAQ</span>
            <h2 style={{ marginTop: '1rem' }}>Vragen over contact opnemen</h2>
            <div className="divider" />
          </div>
          {[
            { q: 'Binnen welke termijn antwoorden jullie op een e-mail?', a: 'Wij streven naar een snelle reactie. Bij noodgevallen, vermeld a.u.b. "SPOED" in het onderwerp van uw e-mail — dit geeft prioriteit aan uw bericht in onze planning.' },
            { q: 'Kan ik u ook telefonisch bereiken?', a: 'Onze belangrijkste contactmethode is via e-mail op contact@vaillant-loodgieter.com. Telefoongegevens worden binnenkort toegevoegd. U kunt uw telefoonnummer vermelden in uw e-mail als u teruggebeld wilt worden.' },
            { q: 'Zorgen jullie voor een offerte voordat de werken beginnen?', a: 'Ja, altijd. Wij beginnen nooit een interventie zonder u vooraf een duidelijke diagnose en offerte te bezorgen. Geen verborgen kosten.' },
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
          <h2>Klaar om contact op te nemen?</h2>
          <p>Stuur een e-mail naar <strong style={{ color: 'rgba(255,255,255,0.95)' }}>contact@vaillant-loodgieter.com</strong> — uw gecertificeerde Vaillant loodgieter in België antwoordt zo snel mogelijk.</p>
          <div className="cta-actions">
            <Link href="/nl/demande-offerte" className="btn btn-ghost-dark">Offerte aanvragen</Link>
            <Link href="/nl/over-ons" className="btn btn-ghost-dark">
              Over ons →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
