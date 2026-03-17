import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Demande de devis – Vaillant Plombier Belgique',
  description:
    "Demandez un devis à Vaillant Plombier (partenaire certifié Vaillant en Belgique). Envoyez-nous votre demande, nous répondons rapidement avec une réponse claire.",
  alternates: { canonical: 'https://vaillant-loodgieter.be/fr/demande-devis' },
  openGraph: {
    title: 'Demande de devis – Vaillant Plombier',
    description: 'Demandez un devis en Belgique — réponse rapide et transparente.',
    url: 'https://vaillant-loodgieter.be/fr/demande-devis',
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
          <form
            action="mailto:contact@vaillant-loodgieter.be"
            method="post"
            encType="text/plain"
            style={{ display: 'grid', gap: '12px' }}
          >
            <input
              name="Nom"
              required
              placeholder="Nom *"
              style={{
                width: '100%',
                borderRadius: '999px',
                padding: '14px 16px',
                border: '1px solid rgba(148,163,184,0.40)',
                outline: 'none',
                background: 'rgba(255,255,255,0.96)',
              }}
            />
            <input
              name="Téléphone"
              required
              inputMode="tel"
              placeholder="Téléphone *"
              style={{
                width: '100%',
                borderRadius: '999px',
                padding: '14px 16px',
                border: '1px solid rgba(148,163,184,0.40)',
                outline: 'none',
                background: 'rgba(255,255,255,0.96)',
              }}
            />
            <input
              name="Type d'intervention"
              placeholder="Type d'intervention"
              style={{
                width: '100%',
                borderRadius: '999px',
                padding: '14px 16px',
                border: '1px solid rgba(148,163,184,0.40)',
                outline: 'none',
                background: 'rgba(255,255,255,0.96)',
              }}
            />
            <input
              name="Adresse"
              placeholder="Adresse"
              style={{
                width: '100%',
                borderRadius: '999px',
                padding: '14px 16px',
                border: '1px solid rgba(148,163,184,0.40)',
                outline: 'none',
                background: 'rgba(255,255,255,0.96)',
              }}
            />
            <textarea
              name="Message"
              rows={7}
              placeholder="Message"
              style={{
                width: '100%',
                borderRadius: '18px',
                padding: '14px 16px',
                border: '1px solid rgba(148,163,184,0.40)',
                outline: 'none',
                background: 'rgba(255,255,255,0.96)',
                resize: 'vertical',
              }}
            />

            <div style={{ fontSize: '0.9rem', color: 'rgba(234,246,247,0.84)' }}>
              En envoyant un message, vous acceptez notre{' '}
              <Link
                href="/fr/privacy"
                style={{
                  color: 'rgba(234,246,247,0.92)',
                  fontWeight: 700,
                  textDecoration: 'underline',
                }}
              >
                politique de confidentialité
              </Link>
              .
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
                marginTop: '6px',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/fr/contact" className="btn btn-outline">
                Besoin d’aide ? Contact →
              </Link>
              <button type="submit" className="btn btn-primary" style={{ minWidth: '160px' }}>
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

