import { getPublicPhoneDisplay, getPublicPhoneTelHref } from "./public-phone";

export const SITE_CONFIG = {
  phone: {
    display: getPublicPhoneDisplay(),
    href: getPublicPhoneTelHref(),
  },
  email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "contact@vaillant-loodgieter.com",
};

export const NAVIGATION = {
  fr: [
    { label: "Accueil", href: "/fr" },
    { label: "Services", href: "/fr/services" },
    {
      label: "Vaillant Plombier Belgique",
      href: "/fr/plombier",
      type: "dropdown",
      children: [
        { label: "Voir toutes les zones desservies", href: "/fr/plombier" },
        { label: "Ixelles", href: "/fr/plombier/ixelles" },
        { label: "Jette", href: "/fr/plombier/jette" },
        { label: "Schaerbeek", href: "/fr/plombier/schaerbeek" },
        { label: "Anderlecht", href: "/fr/plombier/anderlecht" },
        { label: "Uccle", href: "/fr/plombier/uccle" },
        { label: "Etterbeek", href: "/fr/plombier/etterbeek" },
        { label: "Forest", href: "/fr/plombier/forest" },
        { label: "Molenbeek", href: "/fr/plombier/molenbeek" },
      ],
    },
    { label: "Conseils", href: "/fr/blog" },
    { label: "À propos", href: "/fr/a-propos" },
    { label: "Contact", href: "/fr/contact" },
  ],
  nl: [
    { label: "Home", href: "/nl" },
    { label: "Diensten", href: "/nl/diensten" },
    {
      label: "Vaillant Loodgieter België",
      href: "/nl/loodgieter",
      type: "dropdown",
      children: [
        { label: "Alle gemeenten bekijken", href: "/nl/loodgieter" },
        { label: "Elsene", href: "/nl/loodgieter/elsene" },
        { label: "Jette", href: "/nl/loodgieter/jette" },
        { label: "Schaarbeek", href: "/nl/loodgieter/schaarbeek" },
        { label: "Anderlecht", href: "/nl/loodgieter/anderlecht" },
        { label: "Ukkel", href: "/nl/loodgieter/ukkel" },
        { label: "Etterbeek", href: "/nl/loodgieter/etterbeek" },
        { label: "Vorst", href: "/nl/loodgieter/vorst" },
        { label: "Molenbeek", href: "/nl/loodgieter/molenbeek" },
      ],
    },
    { label: "Advies", href: "/nl/advies" },
    { label: "Over ons", href: "/nl/over-ons" },
    { label: "Contact", href: "/nl/contact" },
  ],
};
