import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const regions = [
  "Bruxelles-Capitale",
  "Brabant flamand",
  "Brabant wallon",
  "Autre",
];

const brusselsCities = [
  "Anderlecht",
  "Auderghem",
  "Berchem-Sainte-Agathe",
  "Bruxelles-Ville",
  "Etterbeek",
  "Evere",
  "Forest",
  "Ganshoren",
  "Ixelles",
  "Jette",
  "Koekelberg",
  "Molenbeek-Saint-Jean",
  "Saint-Gilles",
  "Saint-Josse-ten-Noode",
  "Schaerbeek",
  "Uccle",
  "Watermael-Boitsfort",
  "Woluwe-Saint-Lambert",
  "Woluwe-Saint-Pierre",
];

const fieldStyle = {
  width: "100%",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius)",
  padding: "0.75rem 0.85rem",
  background: "#fff",
  color: "var(--text-primary)",
  fontSize: "0.95rem",
};

export const metadata: Metadata = {
  title: "Demande de devis | Villant Plombier",
  description:
    "Demandez un devis pour votre intervention plomberie ou chauffage a Bruxelles. Villant Plombier, partenaire certifie Vaillant.",
  alternates: { canonical: "https://villant-loodgieter.be/demande-devis" },
  openGraph: {
    title: "Demande de devis | Villant Plombier",
    description:
      "Recevez un devis transparent pour vos travaux de plomberie et chauffage a Bruxelles.",
    url: "https://villant-loodgieter.be/demande-devis",
  },
};

export default function DemandeDevisPage() {
  return (
    <>
      <section
        style={{
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.55) 100%), url('/images/contact.jpg') center/cover no-repeat",
          padding: "5rem 1.5rem 4rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container">
          <span className="badge badge-green" style={{ marginBottom: "1rem" }}>
            Demande de devis
          </span>
          <h1 style={{ marginBottom: "1rem" }}>
            Obtenez un devis clair pour votre intervention a Bruxelles
          </h1>
          <p style={{ fontSize: "1.1rem", maxWidth: "60ch", marginBottom: "1.5rem" }}>
            Remplissez ce formulaire pour recevoir une estimation rapide. Nous
            revenons vers vous avec un diagnostic initial et une proposition
            adaptee.
          </p>

          <div style={{ marginBottom: "1.75rem", maxWidth: "70ch" }}>
            <h2 style={{ fontSize: "1.25rem", marginBottom: "0.6rem" }}>
              Une equipe Vaillant ancree a Bruxelles
            </h2>
            <p style={{ fontSize: "0.98rem", color: "var(--text-body)" }}>
              Depuis plusieurs annees, Villant accompagne les habitants de
              Bruxelles dans l&apos;entretien, la reparation et le remplacement
              de chaudiere Vaillant. Notre objectif est simple :{" "}
              <strong>vous proposer des interventions justes</strong>, basees sur
              un diagnostic honnete et une explication transparente.
            </p>
            <p
              style={{
                marginTop: "0.55rem",
                fontSize: "0.95rem",
                color: "var(--text-body)",
              }}
            >
              Nos missions quotidiennes : securiser vos installations, optimiser
              vos consommations et vous laisser une installation propre, conforme
              et facilement compréhensible.
            </p>
          </div>

          <div className="grid-2" style={{ alignItems: "stretch" }}>
            <div
              className="card"
              style={{
                padding: "1.75rem",
                background: "rgba(255,255,255,0.94)",
                boxShadow:
                  "0 18px 45px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)",
              }}
            >
              <h2 style={{ marginBottom: "0.75rem" }}>
                Un devis transparent, sans surprise
              </h2>
              <p style={{ marginBottom: "1.5rem" }}>
                Que ce soit pour une panne urgente, un remplacement de chaudiere
                ou un nouveau projet sanitaire, nous vous expliquons toujours{" "}
                <strong>ce qui est vraiment necessaire</strong> et ce qui peut
                attendre.
              </p>
              <ul
                style={{
                  display: "grid",
                  gap: "0.6rem",
                  fontSize: "0.95rem",
                  color: "var(--text-body)",
                }}
              >
                <li>
                  <strong>Montant estime clair</strong> avant de deplacer un
                  technicien
                </li>
                <li>
                  <strong>Priorite aux urgences</strong> chauffage et eau chaude
                </li>
                <li>
                  <strong>Pieces et main d&apos;oeuvre detaillees</strong> sur
                  le devis
                </li>
                <li>
                  <strong>Conseils de mise en conformite</strong> si necessaire
                </li>
              </ul>
            </div>

            <div className="card card-image" style={{ height: "auto" }}>
              <Image
                src="/images/hero-vaillant-brussels.jpg"
                alt="Technicien Vaillant expliquant un devis a un client a Bruxelles"
                width={600}
                height={380}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid-3-strict">
            <div className="card">
              <h3>Apres votre demande</h3>
              <p>
                Nous analysons votre formulaire et, si necessaire, nous vous
                rappelons pour clarifier certains points techniques. Vous
                recevez ensuite un devis <strong>structure et lisible</strong>,
                avec les etapes prevues.
              </p>
            </div>
            <div className="card">
              <h3>Intervention sur place</h3>
              <p>
                Le jour de l&apos;intervention, le technicien confirme le
                diagnostic sur place. Si un element non prevu apparait, nous
                vous expliquons <strong>avant</strong> toute depense
                supplementaire.
              </p>
            </div>
            <div className="card">
              <h3>Garantie & suivi</h3>
              <p>
                Toutes nos interventions Vaillant sont couvertes par{" "}
                <strong>les garanties fabricant</strong> ainsi que notre suivi
                client. En cas de question apres les travaux, vous pouvez nous
                recontacter facilement.
              </p>
            </div>
          </div>

          <div
            className="cta-band"
            style={{
              marginTop: "3rem",
              backgroundImage:
                "linear-gradient(rgba(0, 173, 171, 0.94), rgba(0, 173, 171, 0.94)), url('/images/slider-vaillant-1.png')",
            }}
          >
            <h2>Besoin d&apos;un avis avant de demander un devis ?</h2>
            <p>
              Expliquez-nous votre situation par telephone : nous vous indiquons
              si une simple intervention suffit ou s&apos;il vaut mieux prevoir
              un projet plus large.
            </p>
            <div className="cta-actions">
              <Link href="/fr/contact" className="btn btn-ghost-dark btn-sm">
                Ecrire via le formulaire de contact
              </Link>
              <Link href="tel:+3223456789" className="btn btn-primary btn-sm">
                Appeler maintenant
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: "960px" }}>
          <div className="card" style={{ padding: "2rem" }}>
            <form
              action="mailto:contact@villant-loodgieter.be"
              method="post"
              encType="text/plain"
              style={{ display: "grid", gap: "1rem" }}
            >
              <div style={{ display: "grid", gap: "0.4rem" }}>
                <label htmlFor="fullname">Nom complet</label>
                <input id="fullname" name="Nom" required style={fieldStyle} />
              </div>
              <div style={{ display: "grid", gap: "0.4rem" }}>
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  name="Email"
                  type="email"
                  required
                  style={fieldStyle}
                />
              </div>
              <div style={{ display: "grid", gap: "0.4rem" }}>
                <label htmlFor="address">Adresse a Bruxelles</label>
                <input id="address" name="Adresse" required style={fieldStyle} />
              </div>
              <div style={{ display: "grid", gap: "0.4rem" }}>
                <label htmlFor="region">Region</label>
                <select id="region" name="Region" style={fieldStyle} required>
                  <option value="">Selectionnez une region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "grid", gap: "0.4rem" }}>
                <label htmlFor="city">Ville / Commune</label>
                <select id="city" name="Ville ou commune" style={fieldStyle} required>
                  <option value="">Selectionnez une ville ou commune</option>
                  {brusselsCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "grid", gap: "0.4rem" }}>
                <label htmlFor="service">Service demande</label>
                <select id="service" name="Service" style={fieldStyle} required>
                  <option value="">Selectionnez un service</option>
                  <option>Reparation Vaillant Bruxelles</option>
                  <option>Remplacement Chaudiere Bruxelles</option>
                  <option>Nouveau Chauffage Bruxelles</option>
                  <option>Reparation Fuite d'Eau Bruxelles</option>
                  <option>Installation Sanitaire Bruxelles</option>
                  <option>Contrat d'Entretien Vaillant</option>
                </select>
              </div>
              <div style={{ display: "grid", gap: "0.4rem" }}>
                <label htmlFor="details">Description du besoin</label>
                <textarea
                  id="details"
                  name="Description"
                  rows={6}
                  required
                  style={fieldStyle}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Envoyer la demande
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
