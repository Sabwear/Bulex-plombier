import type { Metadata } from 'next';
import Link from 'next/link';
import QuoteRequestSmtpForm from '@/components/forms/QuoteRequestSmtpForm';
import {
  quoteCitiesFr,
  quoteRegionsFr,
  quoteServicesFr,
} from '@/config/quote-form-options';
import { buildLocaleAlternates } from '@/lib/seoAlternates';

export const metadata: Metadata = {
  title: 'Demande de devis – Vaillant Plombier Belgique',
  description:
    "Demandez un devis à Vaillant Plombier (partenaire certifié Vaillant en Belgique). Envoyez-nous votre demande, nous répondons rapidement avec une réponse claire.",
  alternates: buildLocaleAlternates('/fr/demande-devis'),
  openGraph: {
    title: 'Demande de devis – Vaillant Plombier',
    description: 'Demandez un devis en Belgique — réponse rapide et transparente.',
    url: 'https://vaillant-loodgieter.com/fr/demande-devis',
  },
};

const tips = [
  {
    title: "Type d’intervention",
    desc: "Réparation, remplacement, fuite d’eau, sanitaire, chauffage ou entretien.",
  },
  {
    title: "Adresse",
    desc: "Rue + commune/ville (Belgique) pour situer l’intervention.",
  },
  {
    title: "Appareil (si applicable)",
    desc: "Marque/modèle (ex. Vaillant ecoTEC) + code erreur ou symptôme.",
  },
  {
    title: "Urgence",
    desc: "Indiquez « URGENCE » si vous n’avez plus de chauffage ou d’eau chaude.",
  },
];

const steps = [
  { n: '1', title: 'Lecture & tri', desc: 'Nous analysons votre message et posons une question si nécessaire.' },
  { n: '2', title: 'Estimation', desc: 'Vous recevez une estimation claire et/ou une proposition de planning.' },
  { n: '3', title: 'Intervention', desc: 'Un technicien qualifié intervient avec un diagnostic transparent.' },
];

export default function QuoteRequestPage() {
  return (
    <>
      <section
        style={{
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.55) 100%), url('/images/contact.jpg') center/cover no-repeat",
          padding: '5rem 1.5rem 3rem',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container">
          <span className="badge badge-green" style={{ marginBottom: '1rem' }}>
            Devis
          </span>
          <h1 style={{ marginBottom: '1rem' }}>Demande de devis</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '60ch', marginBottom: 0 }}>
            Envoyez votre demande. Nous répondons rapidement avec une réponse claire.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-16" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left: informational blocks (no nested card boxes) */}
            <div className="flex flex-col gap-10">
              <div
                className="rounded-xl border p-6 shadow-sm"
                style={{
                  borderColor: 'var(--border)',
                  background: '#fff',
                }}
              >
                <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>
                  Comment ça marche ?
                </span>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
                  Informations utiles pour une réponse rapide
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', marginBottom: '1.25rem', maxWidth: 'none' }}>
                  Plus votre demande est précise, plus nous pouvons vous répondre vite avec une estimation cohérente et une proposition adaptée.
                </p>
                <div className="divide-y divide-[var(--border)]">
                  {tips.map((item) => (
                    <div key={item.title} className="py-3 first:pt-0">
                      <div className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>
                        {item.title}
                      </div>
                      <div className="mt-1 text-sm" style={{ color: 'var(--text-body)' }}>
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.9rem', marginTop: '1rem', color: 'var(--text-muted)', maxWidth: 'none' }}>
                  Prix final = diagnostic + pièces nécessaires. Nous privilégions la transparence (pas de mauvaise surprise).
                </p>
              </div>

              <div
                className="rounded-xl border p-6 shadow-sm"
                style={{
                  borderColor: 'var(--border)',
                  background: '#fff',
                }}
              >
                <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
                  Et ensuite ?
                </span>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-heading)', marginBottom: '1rem' }}>
                  De la demande à l’intervention
                </h2>
                <div className="divide-y divide-[var(--border)]">
                  {steps.map((step) => (
                    <div key={step.n} className="py-3 first:pt-0">
                      <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                        Étape {step.n}
                      </div>
                      <div className="mt-1 text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>
                        {step.title}
                      </div>
                      <div className="mt-1 text-sm" style={{ color: 'var(--text-body)' }}>
                        {step.desc}
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.9rem', marginTop: '1rem', color: 'var(--text-muted)', maxWidth: 'none' }}>
                  Urgence ? Ajoutez « URGENCE » dans votre message et précisez si votre chauffage/eau chaude est totalement en panne.
                </p>
              </div>

              <div>
                <Link href="/fr/contact" className="btn btn-outline">
                  Besoin d’aide ? Contact →
                </Link>
              </div>
            </div>

            {/* Right: single form panel */}
            <div
              className="lg:sticky lg:top-24 rounded-xl border p-6 shadow-sm"
              style={{
                borderColor: 'var(--border)',
                background: '#fff',
              }}
            >
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text-heading)', marginBottom: '1rem' }}>
                Votre demande
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem', marginTop: '-0.25rem' }}>
                En envoyant ce formulaire, vous acceptez notre{' '}
                <Link href="/fr/confidentialite" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'underline' }}>
                  politique de confidentialité
                </Link>
                .
              </p>
              <QuoteRequestSmtpForm
                locale="fr"
                regions={quoteRegionsFr}
                cities={quoteCitiesFr}
                services={quoteServicesFr}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
