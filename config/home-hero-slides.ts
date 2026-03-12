import type { Locale } from './locale-routes';

export type HeroSlideCta = {
  label: string;
  href: string;
};

export type HeroTrustCard = {
  title: string;
  description: string;
};

export type HeroTrustStripItem = {
  title: string;
  subtitle: string;
};

export type HomeHeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: HeroSlideCta;
  secondaryCta: HeroSlideCta;
  /**
   * Short bullet points for the compact trust block in the hero.
   * Typically three items like "Partenaire certifié", "Intervention rapide", etc.
   */
  trustCards: [HeroTrustCard, HeroTrustCard, HeroTrustCard];
  /**
   * Segments used to build the trust line displayed under the trust block.
   * Rendered as `a • b • c` in the UI.
   */
  trustLineItems: [string, string, string];
  image: {
    src: string;
    alt: string;
  };
};

export const HOME_HERO_SLIDES: Record<Locale, HomeHeroSlide[]> = {
  fr: [
    {
      id: 'fr-hero-main',
      eyebrow: 'Partenaire certifié Vaillant',
      title: 'Installez, entretenez et optimisez votre système Vaillant',
      subtitle:
        'Réparation, entretien, dépannage et installation de systèmes Vaillant à Bruxelles par des techniciens qualifiés.',
      primaryCta: {
        label: 'Demander une intervention',
        href: '/fr/contact',
      },
      secondaryCta: {
        label: 'Appeler maintenant',
        href: 'tel:+3223456789',
      },
      trustCards: [
        {
          title: 'Partenaire certifié',
          description: 'Reconnu officiellement par Vaillant pour Bruxelles',
        },
        {
          title: 'Intervention rapide',
          description: 'Priorité aux pannes de chauffage et d’eau chaude',
        },
        {
          title: 'Techniciens qualifiés',
          description: 'Equipe formée sur les derniers systèmes Vaillant',
        },
      ],
      image: {
        src: '/images/hero-vaillant-brussels.jpg',
        alt: 'Technicien Vaillant intervenant sur une chaudière à Bruxelles',
      },
      trustLineItems: [
        'Intervention rapide',
        'Techniciens qualifiés',
        'Service à Bruxelles',
      ],
    },
    {
      id: 'fr-slide-2',
      eyebrow: 'DÉPANNAGE CHAUFFAGE & PLOMBERIE',
      title: 'Service rapide dans les 19 communes de Bruxelles',
      subtitle:
        'Intervention sur chaudière, chauffage et installations sanitaires avec un diagnostic clair et une exécution professionnelle.',
      primaryCta: {
        label: 'Demander une intervention',
        href: '/fr/contact',
      },
      secondaryCta: {
        label: 'Demander un devis',
        href: '/fr/demande-devis',
      },
      trustCards: [
        {
          title: "Service d'urgence Bruxelles",
          description: 'Prise en charge prioritaire des demandes urgentes',
        },
        {
          title: 'Diagnostic professionnel',
          description: 'Analyse technique claire avant intervention',
        },
        {
          title: 'Suivi complet',
          description: 'Conseils et recommandations après intervention',
        },
      ],
      image: {
        src: '/images/img-7.jpg',
        alt: 'Équipe Villant en intervention rapide à Bruxelles',
      },
      trustLineItems: [
        'Intervention rapide',
        'Devis transparent',
        'Service à Bruxelles',
      ],
    },
    {
      id: 'fr-slide-3',
      eyebrow: 'ENTRETIEN & PERFORMANCE',
      title: 'Prolongez la durée de vie de votre chaudière Vaillant',
      subtitle:
        "De l'entretien annuel au remplacement de chaudière, bénéficiez d'un accompagnement technique fiable pour la durée.",
      primaryCta: {
        label: 'Voir nos services',
        href: '/fr/services',
      },
      secondaryCta: {
        label: 'Appeler maintenant',
        href: 'tel:+3223456789',
      },
      trustCards: [
        {
          title: 'Entretien certifié',
          description: 'Protocoles fabricant pour une fiabilité durable',
        },
        {
          title: "Pièces d’origine Vaillant",
          description: 'Compatibilité et performance optimales garanties',
        },
        {
          title: 'Techniciens experts Vaillant',
          description: 'Formation continue sur les systèmes les plus récents',
        },
      ],
      image: {
        src: '/images/service/6.jpg',
        alt: 'Entretien professionnel Vaillant à Bruxelles',
      },
      trustLineItems: [
        "Pièces d’origine Vaillant",
        'Interventions certifiées',
        'Suivi à long terme',
      ],
    },
  ],
  nl: [
    {
      id: 'nl-hero-main',
      eyebrow: 'Gecertificeerde Vaillant partner',
      title: 'Installeer, onderhoud en optimaliseer uw Vaillant-systeem',
      subtitle:
        'Herstelling, onderhoud, interventie en installatie van Vaillant-systemen in Brussel door gekwalificeerde techniekers.',
      primaryCta: {
        label: 'Vraag een interventie aan',
        href: '/nl/contact',
      },
      secondaryCta: {
        label: 'Bel nu',
        href: 'tel:+3223456789',
      },
      trustCards: [
        {
          title: 'Gecertificeerde partner',
          description: 'Officieel erkend Vaillant-partner voor Brussel',
        },
        {
          title: 'Snelle interventie',
          description: 'Prioriteit voor storingen in verwarming en warm water',
        },
        {
          title: 'Gekwalificeerde techniekers',
          description: 'Team met actuele Vaillant-training en ervaring',
        },
      ],
      image: {
        src: '/images/hero-vaillant-brussels.jpg',
        alt: 'Vaillant technieker aan het werk in Brussel',
      },
      trustLineItems: [
        'Snelle interventie',
        'Gekwalificeerde techniekers',
        'Service in Brussel',
      ],
    },
    {
      id: 'nl-slide-2',
      eyebrow: 'DEPANNAGE VERWARMING & LOODGIETERIJ',
      title: 'Snelle service in alle 19 Brusselse gemeenten',
      subtitle:
        'Interventies voor ketel, verwarming en sanitair met een duidelijke diagnose en professionele uitvoering.',
      primaryCta: {
        label: 'Vraag een interventie aan',
        href: '/nl/contact',
      },
      secondaryCta: {
        label: 'Vraag een offerte aan',
        href: '/nl/demande-offerte',
      },
      trustCards: [
        {
          title: 'Spoeddienst Brussel',
          description: 'Prioritaire aanpak voor dringende aanvragen',
        },
        {
          title: 'Professionele diagnose',
          description: 'Heldere technische analyse vóór de werken',
        },
        {
          title: 'Volledige opvolging',
          description: 'Advies en aanbevelingen na de interventie',
        },
      ],
      image: {
        src: '/images/img-7.jpg',
        alt: 'Snelle Villant interventie in Brussel',
      },
      trustLineItems: [
        'Snelle interventie',
        'Transparante offerte',
        'Regio Brussel',
      ],
    },
    {
      id: 'nl-slide-3',
      eyebrow: 'ONDERHOUD & PRESTATIES',
      title: 'Verleng de levensduur van uw Vaillant-ketel',
      subtitle:
        'Van jaarlijks onderhoud tot ketelvervanging: betrouwbare technische begeleiding voor duurzame prestaties.',
      primaryCta: {
        label: 'Bekijk onze diensten',
        href: '/nl/diensten',
      },
      secondaryCta: {
        label: 'Bel nu',
        href: 'tel:+3223456789',
      },
      trustCards: [
        {
          title: 'Gecertificeerd onderhoud',
          description: 'Fabrieksprotocollen voor langdurige betrouwbaarheid',
        },
        {
          title: 'Originele onderdelen',
          description: 'Optimale compatibiliteit en prestaties gegarandeerd',
        },
        {
          title: 'Vaillant experts',
          description: 'Doorlopende opleiding op alle moderne systemen',
        },
      ],
      image: {
        src: '/images/service/6.jpg',
        alt: 'Professioneel Vaillant onderhoud in Brussel',
      },
      trustLineItems: [
        'Originele Vaillant onderdelen',
        'Gecertificeerde interventies',
        'Opvolging op lange termijn',
      ],
    },
  ],
};

export const HOME_HERO_TRUST_STRIP: Record<Locale, HeroTrustStripItem[]> = {
  fr: [
    {
      title: 'Partenaire certifie Vaillant',
      subtitle: 'Plombier chauffage Vaillant a Bruxelles et en Belgique',
    },
    {
      title: "Service d'urgence chaudiere Bruxelles",
      subtitle: 'Depannage rapide de chaudiere et chauffage Vaillant',
    },
    {
      title: 'Techniciens qualifies Vaillant',
      subtitle: 'Formation fabricant et experience terrain a Bruxelles',
    },
    {
      title: '19 communes de Bruxelles',
      subtitle: 'Interventions plomberie et chauffage dans toute la region',
    },
  ],
  nl: [
    {
      title: 'Gecertificeerde Vaillant partner',
      subtitle: 'Vaillant loodgieter voor verwarming in Brussel en Belgie',
    },
    {
      title: 'Vaillant spoeddienst Brussel',
      subtitle: 'Snelle interventie voor ketel en verwarming',
    },
    {
      title: 'Gekwalificeerde Vaillant technici',
      subtitle: 'Rechtstreekse fabrieksopleiding en jarenlange ervaring',
    },
    {
      title: '19 Brusselse gemeenten',
      subtitle: 'Loodgieter en verwarming in heel de regio',
    },
  ],
};
