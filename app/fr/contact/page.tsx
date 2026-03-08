import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Contact – Plombier Vaillant Bruxelles | Villant Plombier',
  description:
    'Contactez Villant Plombier – votre plombier certifié Vaillant à Bruxelles. Envoyez un e-mail à contact@villant-loodgieter.be pour un devis ou un service d\'urgence.',
  keywords: [
    'contact plombier Vaillant Bruxelles',
    'plombier urgence Bruxelles',
    'demande réparation Vaillant Bruxelles',
  ],
  alternates: { canonical: 'https://villant-loodgieter.be/contact' },
  openGraph: {
    title: 'Contact – Villant Plombier',
    description: 'Contactez votre plombier certifié Vaillant à Bruxelles.',
    url: 'https://villant-loodgieter.be/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section style={{
        background: `linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.5) 100%), url('/assets/images/contact.jpg') center/cover no-repeat`,
        padding: '5rem 1.5rem 4rem',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="container">
          <span className="badge badge-green" style={{ marginBottom: '1rem' }}>Contact</span>
          <h1 style={{ marginBottom: '1rem' }}>
            Contactez votre plombier Vaillant à Bruxelles
          </h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '55ch', marginBottom: '2rem' }}>
            Vous avez un problème de plomberie, vous souhaitez demander un devis ou discuter d'un contrat d'entretien ? Villant Plombier est à votre disposition.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="mailto:contact@villant-loodgieter.be" className="btn btn-primary">📧 Envoyer un message</a>
            <Link href="/" className="btn btn-outline">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>

            {/* Contact details */}
            <div>
              <span className="badge badge-blue" style={{ marginBottom: '1rem' }}>Coordonnées</span>
              <h2 style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>Comment nous joindre</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ width: '24px', height: '24px', flexShrink: 0, marginTop: '0.2rem' }}>
                    <Image src="/icons/plumbing-elements/pipes-7.svg" alt="Email" width={24} height={24} />
                  </span>
                  <div>
                    <h4 style={{ marginBottom: '0.3rem' }}>E-mail</h4>
                    <a href="mailto:contact@villant-loodgieter.be" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                      contact@villant-loodgieter.be
                    </a>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.3rem' }}>
                      Envoyez un e-mail avec votre question, votre adresse et une description du problème. Nous vous répondrons dans les plus brefs délais.
                    </p>
                  </div>
                </div>

                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ width: '24px', height: '24px', flexShrink: 0, marginTop: '0.2rem' }}>
                    <Image src="/icons/plumbing-elements/wrench-1.svg" alt="Urgent" width={24} height={24} />
                  </span>
                  <div>
                    <h4 style={{ marginBottom: '0.3rem' }}>Urgence</h4>
                    <p style={{ fontSize: '0.9rem' }}>
                      Pour les interventions urgentes — problèmes de chaudière ou d'eau — ajoutez « URGENCE » à l'objet de votre e-mail. Nous traitons les demandes urgentes en priorité.
                    </p>
                  </div>
                </div>

                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ width: '24px', height: '24px', flexShrink: 0, marginTop: '0.2rem' }}>
                    <Image src="/icons/plumbing-elements/plumber-1.svg" alt="Zone" width={24} height={24} />
                  </span>
                  <div>
                    <h4 style={{ marginBottom: '0.3rem' }}>Zone d'intervention</h4>
                    <p style={{ fontSize: '0.9rem' }}>
                      Bruxelles, Belgique — les 19 communes de Bruxelles. Fiers de travailler à Bruxelles et ses environs.
                    </p>
                    <Link href="/brussel" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-primary)', marginTop: '0.5rem', display: 'inline-block' }}>
                      Voir notre zone d'intervention →
                    </Link>
                  </div>
                </div>

                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ width: '24px', height: '24px', flexShrink: 0, marginTop: '0.2rem' }}>
                    <Image src="/icons/plumbing-elements/flange.svg" alt="Web" width={24} height={24} />
                  </span>
                  <div>
                    <h4 style={{ marginBottom: '0.3rem' }}>Site web</h4>
                    <a href="https://villant-loodgieter.be" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                      villant-loodgieter.be
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* What to include in your message */}
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Votre message</span>
              <h2 style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>Ce qu'il est préférable de mentionner</h2>

              <div className="card" style={{ marginBottom: '1.5rem' }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { icon: 'plumber-1.svg', label: 'Votre adresse', sub: 'Rue, numéro de maison, commune à Bruxelles' },
                    { icon: 'wrench-2.svg', label: 'Type de problème', sub: 'Chaudière, fuite d\'eau, sanitaire, chauffage...' },
                    { icon: 'boiler-1.svg', label: 'Marque et modèle', sub: 'Ex. Vaillant ecoTEC VU 26/5-5 (le cas échéant)' },
                    { icon: 'wrench-1.svg', label: 'Urgence', sub: '"URGENCE" pour les cas d\'urgence' },
                    { icon: 'flange.svg', label: 'Photo (facultatif)', sub: 'Une photo du problème accélère le diagnostic' },
                  ].map((item) => (
                    <li key={item.label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <span style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '0.2rem' }}>
                        <Image src={`/icons/plumbing-elements/${item.icon}`} alt={item.label} width={20} height={20} />
                      </span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{item.label}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{item.sub}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust signals */}
              <div style={{
                background: 'var(--color-primary)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
              }}>
                <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1rem' }}>Pourquoi faire confiance à Villant Plombier ?</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {[
                    { icon: 'plumber-1.svg', text: 'Partenaire certifié Vaillant, travaillant en Belgique' },
                    { icon: 'wrench-2.svg', text: 'Techniciens qualifiés et expérimentés' },
                    { icon: 'pipes-7.svg', text: 'Devis transparent avant l\'intervention' },
                    { icon: 'flange.svg', text: 'Rapport écrit après l\'intervention' },
                    { icon: 'boiler-1.svg', text: 'Pièces d\'origine Vaillant' },
                  ].map((t) => (
                    <li key={t.text} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Image src={`/icons/plumbing-elements/${t.icon}`} alt="" width={16} height={16} style={{ filter: 'brightness(0) invert(1)' }} />
                      {t.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES - brief */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Nos Services</span>
            <h2 style={{ marginTop: '1rem' }}>Pourquoi pouvez-vous nous contacter ?</h2>
            <div className="divider" />
          </div>
          <div className="grid-3-strict">
            {[
              { icon: 'wrench.svg', title: 'Réparation Vaillant Bruxelles' },
              { icon: 'water-heater-1.svg', title: 'Remplacement de chaudière Bruxelles' },
              { icon: 'pipes.svg', title: 'Réparation de fuite d\'eau Bruxelles' },
              { icon: 'bathtub.svg', title: 'Installation sanitaire Bruxelles' },
              { icon: 'radiator.svg', title: 'Nouveau chauffage Bruxelles' },
              { icon: 'gauge.svg', title: 'Contrat d\'entretien Vaillant' },
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
            <Link href="/diensten" className="btn btn-primary">Voir tous les services →</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="container" style={{ maxWidth: '720px' }}>
          <div className="section-header">
            <span className="badge badge-gold">FAQ</span>
            <h2 style={{ marginTop: '1rem' }}>Questions concernant le contact</h2>
            <div className="divider" />
          </div>
          {[
            { q: 'Dans quel délai répondez-vous à un e-mail ?', a: 'Nous visons une réponse rapide. En cas d\'urgence, veuillez indiquer « URGENCE » dans l\'objet de votre e-mail — cela donnera la priorité à votre message dans notre planification.' },
            { q: 'Puis-je également vous contacter par téléphone ?', a: 'Notre principal moyen de contact est l\'e-mail via contact@villant-loodgieter.be. Les coordonnées téléphoniques seront ajoutées prochainement. Vous pouvez mentionner votre numéro de téléphone dans votre e-mail si vous souhaitez être rappelé.' },
            { q: 'Fournissez-vous un devis avant de commencer les travaux ?', a: 'Oui, toujours. Nous ne commençons jamais une intervention sans vous fournir au préalable un diagnostic clair et un devis. Pas de frais cachés.' },
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
          <h2>Prêt à nous contacter ?</h2>
          <p>Envoyez un e-mail à <strong style={{ color: 'rgba(255,255,255,0.95)' }}>contact@villant-loodgieter.be</strong> — votre plombier certifié Vaillant à Bruxelles vous répondra dans les plus brefs délais.</p>
          <div className="cta-actions">
            <a href="mailto:contact@villant-loodgieter.be" className="btn btn-ghost-dark">📧 contact@villant-loodgieter.be</a>
            <Link href="/over-ons" className="btn btn-ghost-dark">
              À propos de nous →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
