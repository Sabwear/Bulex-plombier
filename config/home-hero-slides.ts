import type { Locale } from './locale-routes';

export type HeroSlideCta = {
  label: string;
  href: string;
};

export type HomeHeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: HeroSlideCta;
  secondaryCta: HeroSlideCta;
  trustPoints: [string, string, string];
  image: {
    src: string;
    alt: string;
  };
};

export const HOME_HERO_SLIDES: Record<Locale, [HomeHeroSlide, HomeHeroSlide]> = {
  fr: [
    {
      id: 'fr-slide-1',
      eyebrow: 'Partenaire certifié Vaillant',
      title: 'Plombier Vaillant à Bruxelles',
      subtitle:
        'Intervention rapide pour chauffage, chaudière et plomberie dans toute la région.',
      primaryCta: {
        label: 'Contactez-nous',
        href: '/fr/contact',
      },
      secondaryCta: {
        label: 'Voir nos services',
        href: '/fr/services',
      },
      trustPoints: [
        'Partenaire certifié',
        'Intervention rapide',
        'Techniciens qualifiés',
      ],
      image: {
        src: '/images/slider-1.jpg',
        alt: 'Technicien Vaillant en intervention à Bruxelles',
      },
    },
    {
      id: 'fr-slide-2',
      eyebrow: 'Dépannage & entretien',
      title: 'Service rapide dans les 19 communes',
      subtitle:
        'Réparation, entretien et installation réalisés par des techniciens qualifiés.',
      primaryCta: {
        label: 'Demander un devis',
        href: '/fr/contact',
      },
      secondaryCta: {
        label: "Zone d'intervention",
        href: '/fr/plombier',
      },
      trustPoints: [
        'Partenaire certifié',
        'Intervention rapide',
        'Techniciens qualifiés',
      ],
      image: {
        src: '/images/img-7.jpg',
        alt: 'Équipe plomberie chauffage couvrant les communes de Bruxelles',
      },
    },
  ],
  nl: [
    {
      id: 'nl-slide-1',
      eyebrow: 'Gecertificeerde Vaillant partner',
      title: 'Vaillant loodgieter in Brussel',
      subtitle:
        'Snelle interventie voor verwarming, ketels en loodgieterij in heel de regio.',
      primaryCta: {
        label: 'Neem contact op',
        href: '/nl/contact',
      },
      secondaryCta: {
        label: 'Bekijk onze diensten',
        href: '/nl/diensten',
      },
      trustPoints: [
        'Gecertificeerde partner',
        'Snelle interventie',
        'Gekwalificeerde techniekers',
      ],
      image: {
        src: '/images/slider-1.jpg',
        alt: 'Gecertificeerde Vaillant technieker in Brussel',
      },
    },
    {
      id: 'nl-slide-2',
      eyebrow: 'Herstelling & onderhoud',
      title: 'Snelle service in de 19 gemeenten',
      subtitle:
        'Reparatie, onderhoud en installatie door gekwalificeerde techniekers.',
      primaryCta: {
        label: 'Vraag een offerte aan',
        href: '/nl/contact',
      },
      secondaryCta: {
        label: 'Interventiezone',
        href: '/nl/brussel',
      },
      trustPoints: [
        'Gecertificeerde partner',
        'Snelle interventie',
        'Gekwalificeerde techniekers',
      ],
      image: {
        src: '/images/img-7.jpg',
        alt: 'Snelle service voor loodgieterij en verwarming in Brussel',
      },
    },
  ],
};
