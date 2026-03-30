import type { Metadata } from 'next';
import Link from 'next/link';
import InterventionSmtpForm from '@/components/forms/InterventionSmtpForm';

export const metadata: Metadata = {
  title: 'Demande de devis – Vaillant Plombier Belgique',
  description:
    "Demandez un devis à Vaillant Plombier (partenaire certifié Vaillant en Belgique). Envoyez-nous votre demande, nous répondons rapidement avec une réponse claire.",
  alternates: { canonical: 'https://vaillant-loodgieter.com/fr/demande-devis' },
  openGraph: {
    title: 'Demande de devis – Vaillant Plombier',
    description: 'Demandez un devis en Belgique — réponse rapide et transparente.',
    url: 'https://vaillant-loodgieter.com/fr/demande-devis',
  },
};

export default function QuoteRequestPage() {
  return (
    <section
      className="py-16 md:py-20"
      style={{
        background:
          "radial-gradient(1200px 600px at 20% -10%, rgba(0,173,171,0.22), transparent 60%), radial-gradient(900px 520px at 85% 10%, rgba(34,197,94,0.14), transparent 55%), linear-gradient(180deg, #062433 0%, #041A25 100%)",
      }}
    >
      <div className="container">
        <div className="section-header" style={{ color: '#EAF6F7' }}>
          <span className="badge badge-gold">Devis</span>
          <h1 style={{ marginTop: '1rem', color: '#fff' }}>Demande de devis</h1>
          <div className="divider" />
          <p style={{ color: 'rgba(234,246,247,0.80)' }}>
            Envoyez votre demande. Nous répondons rapidement avec une réponse claire.
          </p>
        </div>

        {/* Details (above form) */}
        <div
          className="card"
          style={{
            maxWidth: '760px',
            margin: '0 auto 18px',
            borderRadius: '22px',
            padding: '18px',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.06) 100%)',
            border: '1px solid rgba(148,163,184,0.22)',
            boxShadow: '0 22px 60px rgba(0,0,0,0.22)',
            color: '#EAF6F7',
          }}
        >
          <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>
            Comment ça marche ?
          </span>
          <h2 style={{ marginBottom: '0.75rem', color: '#fff' }}>
            Informations utiles pour une réponse rapide
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(234,246,247,0.80)', marginBottom: '1rem', maxWidth: 'none' }}>
            Plus votre demande est précise, plus nous pouvons vous répondre vite avec une estimation cohérente et une proposition adaptée.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Type d’intervention", desc: "Réparation, remplacement, fuite d’eau, sanitaire, chauffage ou entretien." },
              { title: "Adresse", desc: "Rue + commune/ville (Belgique) pour situer l’intervention." },
              { title: "Appareil (si applicable)", desc: "Marque/modèle (ex. Vaillant ecoTEC) + code erreur ou symptôme." },
              { title: "Urgence", desc: "Indiquez « URGENCE » si vous n’avez plus de chauffage ou d’eau chaude." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[var(--radius)] border border-[rgba(148,163,184,0.22)] bg-white/5 p-4"
              >
                <div className="text-sm font-semibold text-white">{item.title}</div>
                <div className="mt-1 text-sm text-[rgba(234,246,247,0.80)]">{item.desc}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.9rem', marginTop: '1rem', color: 'rgba(234,246,247,0.70)', maxWidth: 'none' }}>
            Prix final = diagnostic + pièces nécessaires. Nous privilégions la transparence (pas de mauvaise surprise).
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
            formType="quote_fr"
            source="demande-devis"
            submitLabel="Envoyer"
            privacyLabel={
              <>
                En envoyant un message, vous acceptez notre{' '}
                <Link
                  href="/fr/confidentialite"
                  style={{
                    color: 'rgba(234,246,247,0.92)',
                    fontWeight: 700,
                    textDecoration: 'underline',
                  }}
                >
                  politique de confidentialité
                </Link>
                .
              </>
            }
          />

          {/* Details (below form) */}
          <div
            className="card"
            style={{
              marginTop: '18px',
              padding: '18px',
              borderRadius: '18px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(148,163,184,0.22)',
              color: '#EAF6F7',
            }}
          >
            <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
              Et ensuite ?
            </span>
            <h2 style={{ marginBottom: '0.75rem', color: '#fff' }}>
              De la demande à l’intervention
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { n: '1', title: 'Lecture & tri', desc: 'Nous analysons votre message et posons une question si nécessaire.' },
                { n: '2', title: 'Estimation', desc: 'Vous recevez une estimation claire et/ou une proposition de planning.' },
                { n: '3', title: 'Intervention', desc: 'Un technicien qualifié intervient avec un diagnostic transparent.' },
              ].map((step) => (
                <div
                  key={step.n}
                  className="rounded-[var(--radius)] border border-[rgba(148,163,184,0.22)] bg-white/5 p-4"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[rgba(234,246,247,0.70)]">
                    Étape {step.n}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">{step.title}</div>
                  <div className="mt-1 text-sm text-[rgba(234,246,247,0.80)]">{step.desc}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.9rem', marginTop: '1rem', color: 'rgba(234,246,247,0.70)', maxWidth: 'none' }}>
              Urgence ? Ajoutez « URGENCE » dans votre message et précisez si votre chauffage/eau chaude est totalement en panne.
            </p>
          </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '12px',
                marginTop: '12px',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/fr/contact" className="btn btn-outline">
                Besoin d’aide ? Contact →
              </Link>
            </div>
        </div>
      </div>
    </section>
  );
}

