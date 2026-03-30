import type { Metadata } from 'next';
import Link from 'next/link';
import { buildLocaleAlternates } from '@/lib/seoAlternates';

export const metadata: Metadata = {
  title: 'Gebruiksvoorwaarden | vaillant Loodgieter',
  description:
    'Gebruiksvoorwaarden van de website – vaillant Loodgieter. Gebruik van de site, intellectuele eigendom en beperking van aansprakelijkheid.',
  alternates: buildLocaleAlternates('/nl/gebruiksvoorwaarden'),
};

export default function GebruiksvoorwaardenPage() {
  return (
    <main className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem', maxWidth: '48rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Gebruiksvoorwaarden van de website</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>1. Doel</h2>
        <p>
          Deze voorwaarden bepalen de voorwaarden voor toegang tot en gebruik van de website. De website heeft tot doel de diensten loodgieterij en verwarming (herstelling en onderhoud van Vaillant-ketels) voor te stellen en contact mogelijk te maken.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>2. Aanvaarding</h2>
        <p>
          Door toegang te krijgen tot de website en deze te gebruiken, aanvaardt u deze voorwaarden. Als u ze niet aanvaardt, dient u elk gebruik van de website te staken.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>3. Aanvaardbaar gebruik</h2>
        <p>U verbindt zich ertoe de website niet te gebruiken voor onwettige doeleinden of in strijd met de rechten van derden, de werking of veiligheid ervan niet te schaden, en geen gegevens van de site buitensporig of misbruikmakend te verzamelen of te gebruiken (ongevraagde prospectie, excessieve robots, enz.).</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>4. Informatie en intellectuele eigendom</h2>
        <p>
          De informatie op de website is louter indicatief en vormt geen contractaanbod of persoonlijk advies. De elementen van de website (teksten, afbeeldingen, logo&apos;s, structuur) worden beschermd door de intellectuele eigendom; elke niet-geautoriseerde reproductie of exploitatie is verboden.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>5. Beperking van aansprakelijkheid</h2>
        <p>
          vaillant Loodgieter kan niet aansprakelijk worden gesteld voor rechtstreekse of onrechtstreekse schade voortvloeiend uit de toegang tot of het gebruik van de website, de onbeschikbaarheid van de website, het gebruik van de daarop vermelde informatie of het gebruik van websites van derden die via een link bereikbaar zijn. Niets in deze voorwaarden sluit aansprakelijkheden uit die door de wet niet kunnen worden uitgesloten.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>6. Persoonsgegevens</h2>
        <p>
          Zie ons <Link href="/nl/privacy">Privacybeleid</Link> voor de gegevensverwerkingen en uw rechten.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>7. Toepasselijk recht</h2>
        <p>
          Deze voorwaarden worden beheerst door het Belgisch recht. In geval van geschil zijn uitsluitend de bevoegde Belgische rechtbanken bevoegd, onverminderd de bepalingen inzake consumentenbescherming.
        </p>
      </section>
    </main>
  );
}
