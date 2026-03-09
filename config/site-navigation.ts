import type { Locale } from './locale-routes';

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

type LocaleNavigation = {
  topBar: {
    urgencyText: string;
    interventionLabel: string;
    interventionHref: string;
  };
  navItems: NavItem[];
  cta: {
    label: string;
    href: string;
  };
};

export const SITE_PHONE = {
  display: '02 345 67 89',
  href: 'tel:+3223456789',
};

export const SITE_NAVIGATION: Record<Locale, LocaleNavigation> = {
  fr: {
    topBar: {
      urgencyText: 'Urgence plomberie & chauffage à Bruxelles',
      interventionLabel: 'Planifier une intervention',
      interventionHref: '/fr/contact',
    },
    navItems: [
      { label: 'Accueil', href: '/fr' },
      { label: 'Services', href: '/fr/services' },
      {
        label: 'Bruxelles',
        href: '/fr/plombier',
        children: [
          { label: 'Toutes les communes', href: '/fr/plombier' },
          { label: 'Région Bruxelles', href: '/fr/brussel' },
          { label: 'Nos services', href: '/fr/services' },
          { label: 'Contact urgence', href: '/fr/contact' },
        ],
      },
      { label: 'Blogs', href: '/fr/blog' },
      { label: 'À propos', href: '/fr/a-propos' },
      { label: 'Contact', href: '/fr/contact' },
    ],
    cta: {
      label: 'Contactez-nous',
      href: '/fr/contact',
    },
  },
  nl: {
    topBar: {
      urgencyText: 'Spoed loodgieterij & verwarming in Brussel',
      interventionLabel: 'Plan een interventie',
      interventionHref: '/nl/contact',
    },
    navItems: [
      { label: 'Home', href: '/nl' },
      { label: 'Diensten', href: '/nl/diensten' },
      {
        label: 'Brussel',
        href: '/nl/brussel',
        children: [
          { label: 'Alle zones', href: '/nl/brussel' },
          { label: 'Regio Brussel', href: '/nl/brussel' },
          { label: 'Onze diensten', href: '/nl/diensten' },
          { label: 'Spoed contact', href: '/nl/contact' },
        ],
      },
      { label: 'Blogs', href: '/nl/blog' },
      { label: 'Over ons', href: '/nl/over-ons' },
      { label: 'Contact', href: '/nl/contact' },
    ],
    cta: {
      label: 'Neem contact op',
      href: '/nl/contact',
    },
  },
};

