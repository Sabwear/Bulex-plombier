export type FrService = {
  slug: string;
  icon: string;
  title: string;
  keyword: string;
  short: string;
  body: string[];
  highlights: string[];
  metaTitle: string;
  metaDescription: string;
};

export const frServices: FrService[] = [
  {
    slug: "reparation-vaillant-bruxelles",
    icon: "wrench.svg",
    title: "Réparation Vaillant",
    keyword: "Reparation Vaillant",
    short: "Une panne ? Nous reparons votre chaudiere Vaillant rapidement et correctement.",
    body: [
      "Une chaudiere Vaillant qui tombe en panne est plus qu'inconfortable. En hiver, cela peut devenir une urgence. En tant que partenaire certifie Vaillant, nous disposons des connaissances specialisees et des pieces d'origine pour reparer votre appareil rapidement et durablement.",
      "Nos techniciens sont formes par Vaillant et connaissent parfaitement les modeles ecoTEC, turboTEC et ecoCOMPACT. Nous diagnostiquons le probleme avec precision avant que vous n'engagiez des frais, pour que vous puissiez prendre une decision eclairee.",
      "Apres la reparation, vous recevez un rapport technique avec les actions effectuees et une recommandation pour un entretien preventif afin d'eviter une nouvelle panne.",
    ],
    highlights: [
      "Pieces Vaillant d'origine",
      "Technicien certifie",
      "Rapport technique apres intervention",
    ],
    metaTitle: "Réparation Vaillant Belgique | Vaillant Plombier",
    metaDescription:
      "Service de réparation Vaillant en Belgique par des techniciens certifiés. Diagnostic clair, pièces d'origine et intervention rapide.",
  },
  {
    slug: "remplacement-chaudiere-bruxelles",
    icon: "water-heater-1.svg",
    title: "Remplacement de chaudière",
    keyword: "Remplacement chaudiere",
    short: "Vieil appareil ? Nous installons votre nouvelle chaudiere Vaillant de maniere professionnelle.",
    body: [
      "Une chaudiere de plus de 15 ans peut consommer jusqu'a 30 % de gaz en plus qu'un appareil moderne. Le remplacement de chaudiere en Belgique est donc un investissement utile pour votre confort et votre facture energetique.",
      "Nous vous aidons a choisir le modele Vaillant adapte selon votre logement, le nombre de pieces et vos besoins en chauffage. Ensuite, nous assurons une installation complete conforme aux normes belges, avec mise en service.",
      "Nous proposons egalement des solutions de chauffage durable, de la chaudiere murale au gaz jusqu'aux systemes hybrides.",
    ],
    highlights: [
      "Conseils sur mesure",
      "Installation et mise en service completes",
      "Conforme aux normes belges",
    ],
    metaTitle: "Remplacement de chaudière Belgique | Vaillant Plombier",
    metaDescription:
      "Remplacez votre chaudière en Belgique avec un partenaire certifié Vaillant. Installation complète, conseils sur mesure et mise en service.",
  },
  {
    slug: "nouveau-chauffage-bruxelles",
    icon: "radiator.svg",
    title: "Nouveau chauffage",
    keyword: "Nouveau chauffage",
    short: "Nouvelle construction ou renovation ? Nous concevons et installons votre systeme de chauffage.",
    body: [
      "Que ce soit pour une nouvelle construction ou une renovation complete, un bon dimensionnement determine votre confort et votre consommation pour les annees a venir. Nous realisons une analyse thermique avant toute proposition.",
      "Nous installons des solutions Vaillant performantes : chauffage au sol, radiateurs et systemes de regulation thermostatique.",
      "Chaque projet est livre avec une documentation technique complete et les informations utiles pour votre dossier PEB si applicable.",
    ],
    highlights: [
      "Analyse thermique prealable",
      "Documentation complete et dossier PEB",
      "Installateur certifie Vaillant",
    ],
    metaTitle: "Nouveau chauffage Belgique | Vaillant Plombier",
    metaDescription:
      "Installation de nouveau chauffage en Belgique par un installateur certifié Vaillant. Analyse thermique, pose complète et dossier technique.",
  },
  {
    slug: "reparation-fuite-eau-bruxelles",
    icon: "pipes.svg",
    title: "Réparation de fuite d'eau",
    keyword: "Reparation fuite d'eau",
    short: "Une fuite d'eau cause rapidement des degats. Nous localisons et reparons rapidement.",
    body: [
      "Une fuite d'eau visible ou cachee peut endommager rapidement vos murs, sols et structure. Nos techniciens utilisent l'equipement adapte pour detecter les fuites invisibles sans demolition inutile.",
      "Apres la localisation, nous vous expliquons clairement le probleme et la meilleure option de reparation. L'objectif est de minimiser les degats des eaux dans votre logement.",
      "Des signes comme une facture d'eau en hausse ou des taches d'humidite peuvent indiquer une fuite cachee. Une intervention rapide evite des travaux plus lourds.",
    ],
    highlights: [
      "Detection de fuites sans demolition inutile",
      "Intervention rapide",
      "Devis clair avant de commencer",
    ],
    metaTitle: "Réparation de fuite d'eau Belgique | Vaillant Plombier",
    metaDescription:
      "Service de réparation de fuite d'eau en Belgique. Détection rapide, explications claires et intervention professionnelle.",
  },
  {
    slug: "installation-sanitaire-bruxelles",
    icon: "bathtub.svg",
    title: "Installation sanitaire",
    keyword: "Installation sanitaire",
    short: "Renovation de salle de bain ou nouveaux appareils : installation par des plombiers certifies.",
    body: [
      "Du simple robinet a la renovation complete de salle de bain, nous installons l'ensemble des equipements sanitaires : WC, douche, baignoire, lavabo, bidet et plus.",
      "Chaque installation est realisee dans le respect des exigences locales, avec verifications de securite, etancheite et controle de pression.",
      "Nous vous conseillons aussi sur des solutions sanitaires economes en eau pour reduire la consommation au quotidien.",
    ],
    highlights: [
      "Tous les equipements sanitaires",
      "Conforme a la reglementation locale",
      "Conseils pour economiser l'eau",
    ],
    metaTitle: "Installation sanitaire Belgique | Vaillant Plombier",
    metaDescription:
      "Installation sanitaire en Belgique par des plombiers certifiés. Rénovation salle de bain, pose d'équipements et conseils techniques.",
  },
  {
    slug: "contrat-entretien-vaillant",
    icon: "gauge.svg",
    title: "Contrat d'Entretien Vaillant",
    keyword: "Contrat d'entretien",
    short: "Entretien professionnel annuel pour maximiser la duree de vie de votre installation.",
    body: [
      "L'entretien preventif est la protection la plus rentable pour votre systeme de chauffage. Un contrat annuel Vaillant comprend inspection complete, nettoyage technique et rapport ecrit.",
      "Une chaudiere non entretenue perd progressivement en efficacite et risque davantage de tomber en panne au mauvais moment. Un suivi regulier limite ce risque.",
      "Nous appliquons les protocoles officiels Vaillant pour maintenir les performances de l'installation et preserver les conditions de garantie.",
    ],
    highlights: [
      "Inspection et nettoyage annuels",
      "Garantie preservee",
      "Rapport ecrit apres entretien",
    ],
    metaTitle: "Contrat d'entretien Vaillant Belgique | Vaillant Plombier",
    metaDescription:
      "Souscrivez un contrat d'entretien Vaillant en Belgique. Inspection annuelle, nettoyage professionnel et rapport technique detaille.",
  },
];

export const frServicesBySlug: Record<string, FrService> = Object.fromEntries(
  frServices.map((service) => [service.slug, service]),
);
