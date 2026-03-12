import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Juridische vermelding | Villant Loodgieter',
  description:
    'Juridische vermelding – Uitgever van de site, contact, hosting en intellectuele eigendom. Villant Loodgieter, Vaillant loodgieter Brussel.',
};

export default function JuridischeVermeldingPage() {
  return (
    <main className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem', maxWidth: '48rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Juridische vermelding</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>1. Uitgever van de website</h2>
        <p>
          De website wordt uitgegeven door <strong>Villant Loodgieter</strong>. Maatschappelijke zetel en identificatienummers (KBO, btw) op aanvraag beschikbaar via contact@villant-loodgieter.be.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>2. Contact</h2>
        <p>
          Voor alle vragen over de website of de diensten (loodgieterij, verwarming, herstelling en onderhoud van Vaillant-ketels): e-mail <strong>contact@villant-loodgieter.be</strong>, telefoon en adres op de Contactpagina.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>3. Hosting</h2>
        <p>
          De hosting van de website wordt verzorgd door een technische dienstverlener. De contactgegevens van de host zijn op aanvraag beschikbaar via contact@villant-loodgieter.be.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>4. Intellectuele eigendom</h2>
        <p>
          De volledige inhoud van de website (teksten, afbeeldingen, logo&apos;s, merken, structuur) wordt beschermd door het auteursrecht en de intellectuele eigendom. Elke niet-geautoriseerde reproductie, voorstelling of exploitatie kan een inbreuk vormen.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>5. Hyperlinks</h2>
        <p>
          De website kan links bevatten naar websites van derden. Deze links worden uitsluitend ter informatie verstrekt. Villant Loodgieter heeft geen controle over de inhoud van die sites en kan niet aansprakelijk worden gesteld voor hun beschikbaarheid of inhoud.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>6. Aansprakelijkheid</h2>
        <p>
          De informatie op de website wordt uitsluitend ter indicatie verstrekt. Wij doen ons best om ze actueel te houden maar garanderen niet hun volledigheid of foutloosheid. Villant Loodgieter kan niet aansprakelijk worden gesteld voor rechtstreekse of onrechtstreekse schade voortvloeiend uit het gebruik van de website of de daarop vermelde informatie. De gebruiker blijft verantwoordelijk voor het gebruik dat hij ervan maakt.
        </p>
      </section>
    </main>
  );
}
