import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookiebeleid | vaillant Loodgieter',
  description:
    'Cookiebeleid – vaillant Loodgieter. Soorten cookies, beheer van toestemming en browserinstellingen.',
};

export default function CookiesPage() {
  return (
    <main className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem', maxWidth: '48rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Cookiebeleid</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>1. Wat zijn cookies?</h2>
        <p>
          Een cookie is een klein tekstbestand dat op uw apparaat wordt opgeslagen wanneer u een website bezoekt. Het stelt de site in staat uw apparaat te herkennen, informatie te onthouden en uw navigatie te verbeteren.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>2. Soorten cookies die wij gebruiken</h2>
        <h3 style={{ fontSize: '1.1rem', marginTop: '1rem', marginBottom: '0.5rem' }}>Strikt noodzakelijke cookies</h3>
        <p>
          Onmisbaar voor de werking van de site (voorkeuren, formulier). Ze kunnen niet in onze systemen worden uitgeschakeld. Het blokkeren ervan kan sommige functies beïnvloeden.
        </p>
        <h3 style={{ fontSize: '1.1rem', marginTop: '1rem', marginBottom: '0.5rem' }}>Analytische cookies (met uw toestemming)</h3>
        <p>
          Ze laten toe het publiek te meten (bezoeken, bezochte pagina&apos;s) om de site te verbeteren. De gegevens worden geaggregeerd en geanonimiseerd. Wij gebruiken ze alleen als u cookies aanvaardt via de banner.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>3. Rechtsgrond</h2>
        <p>
          Noodzakelijke cookies: gerechtvaardigd belang (veiligheid en werking). Analytische cookies: toestemming (art. 6.1.a AVG en Belgische regelgeving over elektronische communicatie).
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>4. Beheer van uw toestemming</h2>
        <p>
          Bij uw eerste bezoek laat een banner u niet-essentiële cookies aanvaarden of weigeren. U kunt uw keuzes op elk moment wijzigen via de link op de site of de instellingen van uw browser.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>5. Cookies beheren in uw browser</h2>
        <p>U kunt cookies aanvaarden, weigeren of verwijderen via de browserinstellingen. Handige links:</p>
        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Chrome</a></li>
          <li><a href="https://support.mozilla.org/nl/kb/cookies-in-en-uitschakelen-websites-voorkeuren" target="_blank" rel="noopener noreferrer">Firefox</a></li>
          <li><a href="https://support.microsoft.com/nl-nl/microsoft-edge/cookies-verwijderen-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Edge</a></li>
          <li><a href="https://support.apple.com/nl-nl/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>
          Het blokkeren van bepaalde cookies kan uw browse-ervaring beïnvloeden.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>6. Wijzigingen</h2>
        <p>
          Wij kunnen dit beleid bijwerken. Wijzigingen worden op deze pagina gepubliceerd. Zie ook ons <Link href="/nl/privacy">Privacybeleid</Link>.
        </p>
      </section>
    </main>
  );
}
