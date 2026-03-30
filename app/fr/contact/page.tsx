import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ContactRequestForm from '@/components/forms/ContactRequestForm';
import { buildLocaleAlternates } from '@/lib/seoAlternates';

export const metadata: Metadata = {
  title: 'Contact – Plombier Vaillant Belgique | Vaillant Plombier',
  description:
    'Contactez Vaillant Plombier – votre plombier certifié Vaillant en Belgique. Envoyez un e-mail à contact@vaillant-loodgieter.com pour un devis ou un service d\'urgence.',
  keywords: [
    'contact plombier Vaillant Belgique',
    'plombier urgence Belgique',
    'demande réparation Vaillant Belgique',
  ],
  alternates: buildLocaleAlternates('/fr/contact'),
  openGraph: {
    title: 'Contact – Vaillant Plombier',
    description: 'Contactez votre plombier certifié Vaillant en Belgique.',
    url: 'https://vaillant-loodgieter.com/fr/contact',
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
            Contactez votre plombier Vaillant en Belgique
          </h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '55ch', marginBottom: '2rem' }}>
            Vous avez un problème de plomberie, vous souhaitez demander un devis ou discuter d'un contrat d'entretien ? vaillant Plombier est à votre disposition.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/fr/demande-devis" className="btn btn-primary">Demander un devis</Link>
            <Link href="/fr" className="btn btn-outline">
              ← Retour à l'accueil
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
              <span className="badge badge-blue" style={{ marginBottom: '1rem' }}>Coordonnées</span>
              <h2 style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>Comment nous joindre</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ width: '24px', height: '24px', flexShrink: 0, marginTop: '0.2rem' }}>
                    <Image src="/icons/plumbing-elements/pipes-7.svg" alt="Email" width={24} height={24} />
                  </span>
                  <div>
                    <h4 style={{ marginBottom: '0.3rem' }}>E-mail</h4>
                    <a href="mailto:contact@vaillant-loodgieter.com" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                      contact@vaillant-loodgieter.com
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
                      Belgique — interventions selon la disponibilité de nos équipes et la nature de l’intervention.
                    </p>
                    <Link href="/fr/brussel" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-primary)', marginTop: '0.5rem', display: 'inline-block' }}>
                      Voir notre zone d'intervention →
                    </Link>
                  </div>
                </div>

              </div>
            </div>

            {/* What to include in your message */}
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Formulaire</span>
              <h2 style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>Envoyez votre demande</h2>
              <ContactRequestForm supportEmail={supportEmail} />

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
              { icon: 'wrench.svg', title: 'Réparation Vaillant' },
              { icon: 'water-heater-1.svg', title: 'Remplacement de chaudière' },
              { icon: 'pipes.svg', title: 'Réparation de fuite d\'eau' },
              { icon: 'bathtub.svg', title: 'Installation sanitaire' },
              { icon: 'radiator.svg', title: 'Nouveau chauffage' },
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
            <Link href="/fr/services" className="btn btn-primary">Voir tous les services →</Link>
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
            { q: 'Puis-je également vous contacter par téléphone ?', a: 'Notre principal moyen de contact est l\'e-mail via contact@vaillant-loodgieter.com. Les coordonnées téléphoniques seront ajoutées prochainement. Vous pouvez mentionner votre numéro de téléphone dans votre e-mail si vous souhaitez être rappelé.' },
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
          <p>Envoyez un e-mail à <strong style={{ color: 'rgba(255,255,255,0.95)' }}>contact@vaillant-loodgieter.com</strong> — votre plombier certifié Vaillant en Belgique vous répondra dans les plus brefs délais.</p>
          <div className="cta-actions">
            <Link href="/fr/demande-devis" className="btn btn-ghost-dark">Demander un devis</Link>
            <Link href="/fr/a-propos" className="btn btn-ghost-dark">
              À propos de nous →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}