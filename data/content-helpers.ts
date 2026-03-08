/**
 * content-helpers.ts
 * Deterministic content generators for city landing page sections.
 * Each function uses a slug-based hash so output is stable across builds
 * but unique per commune.
 */
import type { Commune } from "./types";

// ── Hash utility ────────────────────────────────────────────────
function slugHash(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

// ── Section 1: Local Intervention Examples ──────────────────────
export interface InterventionExample {
  problem: string;
  solution: string;
  zone: string;
  description: string;
}

const interventionTemplates: Omit<InterventionExample, "zone">[] = [
  {
    problem: "Chaudière Vaillant ecoTEC en panne complète",
    solution: "Remplacement du circulateur et remise en service",
    description:
      "Intervention réalisée dans un appartement. Chauffage rétabli en fin de matinée.",
  },
  {
    problem: "Fuite d'eau visible sous l'évier de cuisine",
    solution: "Remplacement du siphon et des joints d'étanchéité",
    description:
      "Réparation effectuée en moins d'une heure, sans dégât supplémentaire.",
  },
  {
    problem: "Radiateurs froids malgré la chaudière en marche",
    solution: "Désembouage du circuit et purge complète des radiateurs",
    description:
      "Le système de chauffage a retrouvé son efficacité optimale après l'intervention.",
  },
  {
    problem: "Code erreur F.28 sur chaudière Vaillant",
    solution: "Remplacement de l'électrode d'allumage défectueuse",
    description:
      "Diagnostic et réparation réalisés le jour même de l'appel.",
  },
  {
    problem: "Pression d'eau insuffisante dans tout le logement",
    solution: "Remplacement du réducteur de pression et vérification du circuit",
    description:
      "Pression rétablie à un niveau optimal dans toutes les pièces.",
  },
  {
    problem: "Chauffe-eau Vaillant sans production d'eau chaude",
    solution: "Remplacement de la sonde de température et recalibrage",
    description:
      "Eau chaude rétablie dans la matinée. Le locataire a pu reprendre sa routine.",
  },
  {
    problem: "Canalisations bouchées avec refoulement",
    solution: "Débouchage mécanique et nettoyage haute pression",
    description:
      "Écoulement rétabli sans dommage aux canalisations existantes.",
  },
  {
    problem: "Fuite sur vanne de radiateur dans le salon",
    solution: "Remplacement de la vanne thermostatique défectueuse",
    description:
      "Intervention propre, aucun dégât sur le parquet. Chauffage fonctionnel.",
  },
  {
    problem: "Chaudière Vaillant turboTEC avec bruit anormal",
    solution: "Remplacement du ventilateur et nettoyage du brûleur",
    description:
      "Fonctionnement silencieux retrouvé. Contrôle complet effectué.",
  },
  {
    problem: "Fuite au niveau du vase d'expansion de la chaudière",
    solution: "Remplacement du vase d'expansion et remise sous pression",
    description:
      "Intervention préventive ayant évité un dégât des eaux important.",
  },
  {
    problem: "Thermostat défectueux ne commandant plus la chaudière",
    solution: "Installation d'un nouveau thermostat compatible Vaillant",
    description:
      "Régulation du chauffage rétablie avec programmation horaire fonctionnelle.",
  },
];

export function getInterventionExamples(
  commune: Commune
): InterventionExample[] {
  const hash = slugHash(commune.slug);
  const examples: InterventionExample[] = [];

  for (let i = 0; i < 3; i++) {
    const tplIdx = (hash + i * 3 + i) % interventionTemplates.length;
    const lmkIdx =
      commune.nearby_landmarks.length > 0
        ? (hash + i * 2) % commune.nearby_landmarks.length
        : 0;

    const tpl = interventionTemplates[tplIdx];
    examples.push({
      ...tpl,
      zone:
        commune.nearby_landmarks.length > 0
          ? `Près de ${commune.nearby_landmarks[lmkIdx]}`
          : `Centre de ${commune.name}`,
    });
  }

  return examples;
}

// ── Section 2: Pourquoi choisir (variant sets) ──────────────────
const whyChooseSets: string[][] = [
  [
    "Technicien certifié Vaillant avec formation constructeur",
    "Intervention rapide — généralement dans l'heure",
    "Pièces de rechange Vaillant d'origine uniquement",
    "Diagnostic précis avant tout devis",
    "Optimisation du rendement de votre système de chauffage",
  ],
  [
    "Certification officielle Vaillant — expertise garantie",
    "Disponibilité 7j/7, y compris jours fériés",
    "Utilisation exclusive de pièces Vaillant originales",
    "Transparence totale : devis détaillé avant intervention",
    "Conseils personnalisés pour réduire votre consommation énergétique",
  ],
  [
    "Plombier agréé Vaillant — qualité professionnelle",
    "Temps de réponse rapide sur toute la commune",
    "Stock de pièces Vaillant pour réparation immédiate",
    "Expertise multisystème : chauffage, sanitaire, eau chaude",
    "Suivi après intervention et garantie sur les travaux",
  ],
];

export function getWhyChooseBullets(commune: Commune): string[] {
  const hash = slugHash(commune.slug);
  return whyChooseSets[hash % whyChooseSets.length];
}

// ── Section 5: Testimonials ─────────────────────────────────────
export interface Testimonial {
  text: string;
}

const testimonialPool: string[] = [
  "Service rapide et professionnel. Le technicien a diagnostiqué le problème de ma chaudière Vaillant en quelques minutes.",
  "Très satisfait de l'intervention. Le plombier est arrivé dans les délais et a résolu la fuite efficacement.",
  "Excellente expérience. Remplacement de ma vieille chaudière par un modèle Vaillant ecoTEC en une journée.",
  "Technicien compétent et ponctuel. L'entretien annuel a été réalisé avec soin et professionnalisme.",
  "Intervention d'urgence un dimanche matin. Fuite résolue rapidement. Je recommande vivement.",
  "Devis clair et sans surprise. Le remplacement du chauffe-eau s'est très bien passé.",
  "Notre chauffage ne marchait plus en plein hiver. Le technicien a tout remis en marche le jour même.",
  "Très bonne communication et travail soigné. Les radiateurs chauffent correctement depuis l'intervention.",
  "Professionnel sérieux qui utilise des pièces Vaillant d'origine. Ma chaudière fonctionne parfaitement.",
  "Équipe réactive. Le débouchage des canalisations a été fait proprement et en moins d'une heure.",
  "Installation d'un thermostat intelligent impeccable. Le confort thermique s'est nettement amélioré.",
  "Diagnostic rapide d'un code erreur sur ma chaudière Vaillant. Réparation effectuée dans la foulée.",
];

export function getTestimonials(commune: Commune): Testimonial[] {
  const hash = slugHash(commune.slug);
  const result: Testimonial[] = [];

  for (let i = 0; i < 3; i++) {
    const idx = (hash + i * 4 + i) % testimonialPool.length;
    result.push({ text: testimonialPool[idx] });
  }

  return result;
}

// ── Section 4: Local Guide Paragraph ────────────────────────────
const guideOpeners: ((c: Commune) => string)[] = [
  (c) =>
    `${c.name} est une commune de la Région de Bruxelles-Capitale avec un parc immobilier varié qui présente des défis spécifiques en plomberie et chauffage.`,
  (c) =>
    `La commune de ${c.name} se distingue par des caractéristiques immobilières propres, qui influencent directement les besoins en entretien de plomberie et de chauffage.`,
  (c) =>
    `À ${c.name}, les habitations présentent des profils variés nécessitant une expertise technique adaptée en plomberie et systèmes de chauffage.`,
  (c) =>
    `Le patrimoine immobilier de ${c.name} combine différents types de constructions, chacun avec ses particularités en matière de plomberie et de chauffage.`,
];

export function getLocalGuide(commune: Commune): string {
  const hash = slugHash(commune.slug);
  let text = guideOpeners[hash % guideOpeners.length](commune);

  if (commune.building_profile) {
    text += ` On y trouve principalement des ${commune.building_profile.toLowerCase()}.`;
  }

  if (commune.common_issues.length > 0) {
    const issues = commune.common_issues
      .slice(0, 2)
      .map((i) => i.toLowerCase());
    text += ` Parmi les problèmes les plus courants : ${issues.join(" et ")}.`;
  }

  text += ` Pour les propriétaires et locataires de ${commune.name}, nous recommandons un entretien annuel de la chaudière et une vérification régulière des raccordements sanitaires afin de prévenir les pannes coûteuses et les fuites.`;

  return text;
}
