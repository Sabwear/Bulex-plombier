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

