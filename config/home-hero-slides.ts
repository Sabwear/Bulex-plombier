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
  trustLineItems: [string, string];
  trustCards: [HeroTrustCard, HeroTrustCard, HeroTrustCard];
  image: {
    src: string;
    alt: string;
  };
};

export const HOME_HERO_SLIDES: Record<Locale, HomeHeroSlide[]> = {
  fr: [
    {
      id: 'fr-slide-1',
      eyebrow: 'PARTENAIRE CERTIFIE VAILLANT BELGIQUE',
      title: 'Plombier Vaillant a Bruxelles - Intervention rapide et qualifiee',
      subtitle:
        'Votre specialiste certifie Vaillant a Bruxelles. Reparations, installations et depannages realises par des techniciens qualifies dans toute la region.',
      primaryCta: {
        label: 'Contactez-nous',
        href: '/fr/contact',
      },
      secondaryCta: {
        label: 'Appeler maintenant',
        href: 'tel:+3223456789',
      },
      trustLineItems: ['20+ techniciens certifies', 'Disponible 6j/7'],
      trustCards: [
        {
          title: 'Partenaire certifie Vaillant',
          description: 'Officiellement reconnu par Vaillant en Belgique',
        },
        {
          title: 'Intervention rapide a Bruxelles',
          description: 'Depannage express dans toute la region',
        },
        {
          title: 'Techniciens qualifies',
          description: 'Expertise certifiee sur tous les systemes Vaillant',
        },
      ],
      image: {
        src: '/images/slider-1.jpg',
        alt: 'Technicien Vaillant en intervention a Bruxelles',
      },
    },
    {
      id: 'fr-slide-2',
      eyebrow: 'DEPANNAGE CHAUFFAGE ET PLOMBERIE',
      title: 'Service rapide dans les 19 communes de Bruxelles',
      subtitle:
        "Intervention sur chaudiere, chauffage et installations sanitaires avec un diagnostic clair et une execution professionnelle.",
      primaryCta: {
        label: 'Contactez-nous',
        href: '/fr/contact',
      },
      secondaryCta: {
        label: 'Demander un devis',
        href: '/fr/demande-devis',
      },
      trustLineItems: ['Intervention rapide', 'Devis transparent avant travaux'],
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
          description: 'Conseils et recommandations apres intervention',
        },
      ],
      image: {
        src: '/images/img-7.jpg',
        alt: 'Equipe Villant en intervention rapide a Bruxelles',
      },
    },
    {
      id: 'fr-slide-3',
      eyebrow: 'ENTRETIEN ET PERFORMANCE',
      title: 'Installez, entretenez et optimisez votre systeme Vaillant',
      subtitle:
        "De l'entretien annuel au remplacement de chaudiere, beneficiez d'un accompagnement technique fiable pour la duree.",
      primaryCta: {
        label: 'Voir nos services',
        href: '/fr/services',
      },
      secondaryCta: {
        label: 'Appeler maintenant',
        href: 'tel:+3223456789',
      },
      trustLineItems: ['Pieces d origine Vaillant', 'Interventions certifiees'],
      trustCards: [
        {
          title: 'Entretien certifie',
          description: 'Protocoles fabricant pour une fiabilite durable',
        },
        {
          title: 'Pieces d origine',
          description: 'Compatibilite et performance optimales garanties',
        },
        {
          title: 'Techniciens experts Vaillant',
          description: 'Formation continue sur tous les systemes recents',
        },
      ],
      image: {
        src: '/images/service/6.jpg',
        alt: 'Entretien professionnel Vaillant a Bruxelles',
      },
    },
  ],
  nl: [
    {
      id: 'nl-slide-1',
      eyebrow: 'GECERTIFICEERDE VAILLANT PARTNER BELGIE',
      title: 'Vaillant loodgieter in Brussel - Snelle en vakkundige interventie',
      subtitle:
        'Uw gecertificeerde Vaillant specialist in Brussel. Herstellingen, installaties en depannages uitgevoerd door gekwalificeerde technici in de hele regio.',
      primaryCta: {
        label: 'Neem contact op',
        href: '/nl/contact',
      },
      secondaryCta: {
        label: 'Bel nu',
        href: 'tel:+3223456789',
      },
      trustLineItems: ['20+ gecertificeerde technici', 'Beschikbaar 6d/7'],
      trustCards: [
        {
          title: 'Gecertificeerde Vaillant partner',
          description: 'Officieel erkend door Vaillant in Belgie',
        },
        {
          title: 'Snelle interventie in Brussel',
          description: 'Express depannage in de hele regio',
        },
        {
          title: 'Gekwalificeerde technici',
          description: 'Gecertificeerde expertise op alle Vaillant systemen',
        },
      ],
      image: {
        src: '/images/slider-1.jpg',
        alt: 'Gecertificeerde Vaillant technieker in Brussel',
      },
    },
    {
      id: 'nl-slide-2',
      eyebrow: 'DEPANNAGE VERWARMING EN LOODGIETERIJ',
      title: 'Snelle service in alle 19 Brusselse gemeenten',
      subtitle:
        'Interventies voor ketel, verwarming en sanitair met een duidelijke diagnose en professionele uitvoering.',
      primaryCta: {
        label: 'Neem contact op',
        href: '/nl/contact',
      },
      secondaryCta: {
        label: 'Vraag een offerte aan',
        href: '/nl/contact',
      },
      trustLineItems: ['Snelle interventie', 'Transparante offerte vooraf'],
      trustCards: [
        {
          title: 'Spoeddienst Brussel',
          description: 'Prioritaire aanpak voor dringende aanvragen',
        },
        {
          title: 'Professionele diagnose',
          description: 'Heldere technische analyse voor de werken starten',
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
    },
    {
      id: 'nl-slide-3',
      eyebrow: 'ONDERHOUD EN PRESTATIES',
      title: 'Installeer, onderhoud en optimaliseer uw Vaillant systeem',
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
      trustLineItems: ['Originele Vaillant onderdelen', 'Gecertificeerde interventies'],
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
    },
  ],
};

export const HOME_HERO_TRUST_STRIP: Record<Locale, HeroTrustStripItem[]> = {
  fr: [
    { title: 'Partenaire certifie Vaillant', subtitle: 'Belgique' },
    { title: "Service d'urgence Bruxelles", subtitle: 'Intervention rapide' },
    { title: 'Techniciens qualifies', subtitle: 'Formation fabricant' },
    { title: '19 communes desservies', subtitle: 'Toute la region' },
  ],
  nl: [
    { title: 'Gecertificeerde Vaillant partner', subtitle: 'Belgie' },
    { title: 'Spoeddienst Brussel', subtitle: 'Snelle interventie' },
    { title: 'Gekwalificeerde technici', subtitle: 'Fabrieksopleiding' },
    { title: '19 gemeenten bediend', subtitle: 'Hele regio' },
  ],
};
