import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CertificationLogosMarquee from '@/components/CertificationLogosMarquee';

export const metadata: Metadata = {
  title: 'Certifications & Marques – Vaillant Plombier Belgique',
  description:
    'Découvrez les certifications et marques partenaires de Vaillant Plombier : partenaire Vaillant certifié, reconnu pour son expertise en chauffage et sanitaire en Belgique.',
  alternates: { canonical: 'https://vaillant-loodgieter.com/fr/certifications' },
  openGraph: {
    title: 'Nos certifications et marques partenaires',
    description:
      'Vaillant Plombier – partenaire Vaillant certifié en Belgique, avec des labels reconnus et une expertise sur les grandes marques de chauffage.',
    url: 'https://vaillant-loodgieter.com/fr/certifications',
  },
};

export default function CertificationsPage() {
  return (
    <>
      {/* HERO */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '2rem' }}>
            <div>
              <span className="badge badge-green" style={{ marginBottom: '1rem' }}>
                Certifications & marques
              </span>
              <h1 style={{ marginBottom: '1rem' }}>
                Partenaire Vaillant certifié en Belgique
              </h1>
              <p style={{ fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Vaillant Plombier est une entreprise indépendante et un{' '}
                <strong>partenaire Vaillant certifié</strong> pour le chauffage et le sanitaire
                résidentiels. Nos techniciens suivent des formations directes chez le fabricant et
                notre expertise est reconnue par plusieurs labels et organismes du secteur.
              </p>
              <p style={{ fontSize: '0.98rem', lineHeight: 1.7 }}>
                Nous intervenons chaque jour en <strong>Belgique</strong>, avec une forte présence
                en <strong>Flandre</strong>, pour l’entretien, la réparation et le remplacement de
                chaudières gaz, boilers et installations sanitaires.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <Link href="/fr/demande-devis" className="btn btn-primary">
                  Demander une intervention
                </Link>
                <Link href="/fr/services" className="btn btn-outline">
                  Voir nos services →
                </Link>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  maxWidth: '420px',
                  width: '100%',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 50px rgba(15,23,42,0.28)',
                }}
              >
                <Image
                  src="/certifications-marques.avif"
                  alt="Certifications et marques partenaires en chauffage"
                  width={640}
                  height={400}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />

                <div
                  style={{
                    position: 'absolute',
                    left: '12px',
                    bottom: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.4rem 0.7rem',
                    borderRadius: '999px',
                    background: 'rgba(15,23,42,0.88)',
                    color: '#fff',
                    fontSize: '0.78rem',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
                  }}
                >
                  <Image
                    src="/Flag_of_Flanders.svg"
                    alt="Drapeau de la Flandre"
                    width={22}
                    height={16}
                    style={{ borderRadius: '3px' }}
                  />
                  <span>Présents en Flandre & en Belgique</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUES PARTENAIRES */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Marques & expertise</span>
            <h2 style={{ marginTop: '1rem' }}>Vaillant Plombier, partenaire des grandes marques</h2>
            <div className="divider" />
          </div>

          <div className="grid-2" style={{ gap: '2rem', alignItems: 'flex-start' }}>
            <div>
              <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
                Depuis plus de <strong>30 ans</strong>, les systèmes Vaillant sont installés,
                entretenus et dépannés par des techniciens spécialisés. Chez Vaillant Plombier, nous
                nous concentrons sur le <strong>chauffage gaz, les chaudières à condensation</strong>,
                la production d’<strong>eau chaude sanitaire</strong> et les installations
                sanitaires, avec une connaissance approfondie des technologies des principaux
                fabricants.
              </p>
              <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
                Notre cœur de métier reste <strong>Vaillant</strong>, mais nos techniciens
                interviennent également sur d’autres grandes marques présentes sur le marché
                belge. Cela nous permet de vous conseiller de manière objective sur la{' '}
                <strong>performance</strong>, l’<strong>efficacité énergétique</strong> et le{' '}
                <strong>budget</strong> qui correspondent le mieux à votre habitation.
              </p>
              <p style={{ lineHeight: 1.8 }}>
                Nos devis sont <strong>clairs et détaillés</strong>, afin que vous compreniez
                précisément quels équipements sont proposés et quels sont les coûts associés.
              </p>
            </div>

            <div>
              <div
                style={{
                  marginBottom: '1.25rem',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  boxShadow: '0 18px 40px rgba(15,23,42,0.25)',
                }}
              >
                <Image
                  src="/images/plumber-attaches-trying-fix-problem-with-residential-heating-equipment-repair-gas-boiler (1).jpg"
                  alt="Technicien effectuant l’entretien d’une chaudière gaz"
                  width={680}
                  height={420}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.05rem' }}>
              Exemples de marques sur lesquelles nous intervenons
            </h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>
              En plus de Vaillant, nous rencontrons régulièrement des chaudières et équipements des
              marques suivantes :
            </p>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.8, maxWidth: 'none' }}>
              Atlantic, Saunier Duval, Frisquet, Chaffoteaux, De Dietrich, Viessmann, Ariston,
              Buderus, Elm Leblanc, Riello, Geminox, et d’autres références du marché.
            </p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.75rem', color: 'var(--text-muted)', maxWidth: 'none' }}>
              Remarque : nous restons une entreprise indépendante. La majorité de nos interventions
              concerne des installations Vaillant, mais nos techniciens connaissent suffisamment les
              autres marques pour vous conseiller correctement.
            </p>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS / LABELS */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-gold">Nos certifications</span>
            <h2 style={{ marginTop: '1rem' }}>Labels et reconnaissances de nos techniciens</h2>
            <div className="divider" />
          </div>

          <div className="grid-2" style={{ gap: '1.75rem' }}>
            <div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.02rem' }}>Partenaire Vaillant certifié</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
                En tant que <strong>partenaire Vaillant certifié</strong>, nous nous engageons à
                respecter les prescriptions du fabricant pour l’installation, l’entretien et le
                dépannage. Votre installation est donc traitée conformément aux recommandations
                officielles et vos <strong>conditions de garantie</strong> sont préservées.
              </p>

              <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.02rem' }}>
                Sécurité et conformité des installations gaz
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
                Nos techniciens sont formés pour travailler selon les{' '}
                <strong>normes belges en vigueur pour les installations gaz</strong>. Sécurité,
                conformité et réglage précis de votre chaudière sont au centre de chaque
                intervention.
              </p>

              <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.02rem' }}>
                Efficacité énergétique
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
                Pour chaque nouvelle installation ou rénovation, nous réfléchissons avec vous à votre{' '}
                <strong>consommation énergétique</strong>. Chaudières à condensation, régulations
                modulantes et émetteurs performants font partie des solutions que nous proposons,
                toujours en tenant compte de votre budget.
              </p>
            </div>

            <div>
              <div className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.05rem' }}>
                  Pourquoi les certifications comptent
                </h3>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                    fontSize: '0.9rem',
                  }}
                >
                  <li>• Elles garantissent que votre technicien est correctement formé.</li>
                  <li>• Elles réduisent le risque d’erreurs et de situations dangereuses.</li>
                  <li>• Elles sont souvent nécessaires pour bénéficier de garanties ou de primes.</li>
                  <li>• Elles nous obligent à des méthodes de travail transparentes et traçables.</li>
                </ul>
                <p style={{ fontSize: '0.86rem', marginTop: '0.85rem', color: 'var(--text-muted)' }}>
                  Vous avez une question sur un label ou vous souhaitez vérifier la conformité de
                  votre installation ? Contactez-nous, nous vous répondons clairement.
                </p>
                <div style={{ marginTop: '1rem' }}>
                  <Link href="/fr/contact" className="btn btn-outline">
                    Poser une question →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGO SLIDER */}
      <section style={{ background: 'var(--bg-secondary)', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '1.25rem' }}>
            <span className="badge badge-blue">Partenaires & labels</span>
            <h2 style={{ marginTop: '1rem' }}>Nos logos de certifications et de partenaires</h2>
            <div className="divider" />
          </div>
        </div>
        <CertificationLogosMarquee />
      </section>
    </>
  );
}

