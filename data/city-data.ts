/**
 * Central city data for programmatic SEO.
 * Single source of truth: Brussels communes from JSON + other Belgian cities.
 * Locale-aware: slugFr/slugNl, nameFr/nameNl for FR and NL routes.
 */
import fs from "fs";
import path from "path";
import type { Commune, CommuneFaq } from "./types";

// ── Internal entry: one per city, locale-specific slugs/names ──
export interface CityEntry {
  slugFr: string;
  slugNl: string;
  nameFr: string;
  nameNl: string;
  regionFr: string;
  regionNl: string;
  postal_code: string | null;
  distance_minutes: number | null;
  response_time_minutes: number | null;
  building_profile: string | null;
  building_profile_nl: string | null;
  nearby_landmarks: string[];
  nearby_landmarks_nl: string[] | null;
  common_issues: string[];
  common_issues_nl: string[] | null;
  services: string[];
  services_nl: string[] | null;
  nearby_communes_fr: string[];
  nearby_communes_nl: string[];
  faq: CommuneFaq[];
  faq_nl: CommuneFaq[] | null;
  last_updated: string;
}

const COMMUNES_DIR = path.join(process.cwd(), "data", "communes");

const COMMUNES_NL_FILE = path.join(process.cwd(), "data", "communes-nl.json");

/** Dutch translations of the (French) Brussels commune JSON files, keyed by slug. */
type CommuneNl = {
  building_profile?: string;
  common_issues?: string[];
  faq?: CommuneFaq[];
};

const SERVICE_LABELS_NL: Record<string, string> = {
  "Débouchage canalisations": "Ontstoppen van afvoeren",
  "Dépannage plomberie urgence": "Spoedherstelling loodgieterij",
  "Détartrage chauffe-eau": "Ontkalken van boilers",
  "Entretien chaudière annuel": "Jaarlijks ketelonderhoud",
  "Installation chauffage central": "Installatie centrale verwarming",
  "Installation sanitaire complète": "Volledige sanitaire installatie",
  "Installation thermostat intelligent": "Installatie slimme thermostaat",
  "Remplacement chaudière Vaillant": "Vervanging Vaillant-ketel",
  "Remplacement tuyauterie vétuste": "Vervanging verouderde leidingen",
  "Réparation et remplacement radiateurs": "Herstelling en vervanging van radiatoren",
  "Réparation fuite d'eau": "Waterlek herstellen",
};

function loadCommunesNl(): Record<string, CommuneNl> {
  if (!fs.existsSync(COMMUNES_NL_FILE)) return {};
  return JSON.parse(fs.readFileSync(COMMUNES_NL_FILE, "utf-8")) as Record<string, CommuneNl>;
}

function loadBrusselsCommunes(): CityEntry[] {
  if (!fs.existsSync(COMMUNES_DIR)) return [];
  const nlData = loadCommunesNl();
  const files = fs.readdirSync(COMMUNES_DIR).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(COMMUNES_DIR, file), "utf-8");
    const c = JSON.parse(raw) as {
      name: string;
      slug: string;
      region: string;
      postal_code?: string | null;
      distance_minutes?: number | null;
      response_time_minutes?: number | null;
      building_profile?: string | null;
      nearby_landmarks?: string[];
      common_issues?: string[];
      services?: string[];
      nearby_communes?: string[];
      faq?: CommuneFaq[];
      last_updated?: string;
    };
    const isBruxellesVille = c.slug === "bruxelles-ville";
    const nl = nlData[c.slug];
    const servicesNl = (c.services ?? []).map((x) => SERVICE_LABELS_NL[x] ?? x);
    return {
      slugFr: c.slug,
      slugNl: isBruxellesVille ? "brussel" : c.slug,
      nameFr: c.name,
      nameNl: isBruxellesVille ? "Brussel" : c.name,
      regionFr: c.region ?? "Bruxelles",
      regionNl: "Brussel",
      postal_code: c.postal_code ?? null,
      distance_minutes: c.distance_minutes ?? null,
      response_time_minutes: c.response_time_minutes ?? null,
      building_profile: c.building_profile ?? null,
      building_profile_nl: nl?.building_profile ?? null,
      nearby_landmarks: c.nearby_landmarks ?? [],
      nearby_landmarks_nl: null,
      common_issues: c.common_issues ?? [],
      common_issues_nl: nl?.common_issues ?? null,
      services: c.services ?? [],
      services_nl: servicesNl.length ? servicesNl : null,
      nearby_communes_fr: c.nearby_communes ?? [],
      nearby_communes_nl: c.nearby_communes ?? [],
      faq: c.faq ?? [],
      faq_nl: nl?.faq ?? null,
      last_updated: c.last_updated ?? new Date().toISOString(),
    };
  });
}

// Other Belgian cities (outside Brussels) — minimal data, same template
const OTHER_CITIES: CityEntry[] = [
  {
    slugFr: "anvers",
    slugNl: "antwerpen",
    nameFr: "Anvers",
    nameNl: "Antwerpen",
    regionFr: "Flandre",
    regionNl: "Vlaanderen",
    postal_code: null,
    distance_minutes: null,
    response_time_minutes: null,
    building_profile: null,
    building_profile_nl: null,
    nearby_landmarks: [],
    nearby_landmarks_nl: null,
    common_issues: [
      "Pannes chaudière Vaillant",
      "Fuites et entretien chauffage central",
      "Remplacement de chaudière",
    ],
    common_issues_nl: [
      "Vaillant ketelstoringen",
      "Lekkages en onderhoud centrale verwarming",
      "Ketelvervanging",
    ],
    services: [
      "Réparation chaudière Vaillant",
      "Entretien chaudière annuel",
      "Installation chauffage central",
    ],
    services_nl: [
      "Vaillant ketelreparatie",
      "Jaarlijks ketelonderhoud",
      "Installatie centrale verwarming",
    ],
    nearby_communes_fr: ["gand", "malines", "turnhout"],
    nearby_communes_nl: ["gent", "mechelen", "turnhout"],
    faq: [
      { q: "Intervenez-vous à Anvers ?", a: "Oui, nous planifions des interventions à Anvers selon la disponibilité de nos techniciens." },
      { q: "Proposez-vous l'entretien Vaillant à Anvers ?", a: "Oui, entretien annuel et dépannage pour chaudières Vaillant." },
    ],
    faq_nl: [
      { q: "Grijpen jullie in Antwerpen in?", a: "Ja, we plannen interventies in Antwerpen volgens de beschikbaarheid van onze technici." },
      { q: "Bieden jullie Vaillant-onderhoud in Antwerpen?", a: "Ja, jaarlijks onderhoud en herstelling voor Vaillant-ketels." },
    ],
    last_updated: new Date().toISOString(),
  },
  {
    slugFr: "gand",
    slugNl: "gent",
    nameFr: "Gand",
    nameNl: "Gent",
    regionFr: "Flandre",
    regionNl: "Vlaanderen",
    postal_code: null,
    distance_minutes: null,
    response_time_minutes: null,
    building_profile: null,
    building_profile_nl: null,
    nearby_landmarks: [],
    nearby_landmarks_nl: null,
    common_issues: [
      "Pannes chaudière Vaillant",
      "Entretien et remplacement chaudière",
      "Problèmes de chauffage central",
    ],
    common_issues_nl: [
      "Vaillant ketelstoringen",
      "Onderhoud en vervanging ketel",
      "Problemen centrale verwarming",
    ],
    services: [
      "Réparation chaudière Vaillant",
      "Entretien annuel",
      "Installation chauffage central",
    ],
    services_nl: [
      "Vaillant ketelreparatie",
      "Jaarlijks onderhoud",
      "Installatie centrale verwarming",
    ],
    nearby_communes_fr: ["anvers", "bruges", "courtrai"],
    nearby_communes_nl: ["antwerpen", "brugge", "kortrijk"],
    faq: [
      { q: "Plombier Vaillant à Gand ?", a: "Oui, nous intervenons à Gand pour réparation, entretien et installation Vaillant." },
      { q: "Délai d'intervention à Gand ?", a: "Interventions planifiées selon disponibilité. Contactez-nous pour un devis." },
    ],
    faq_nl: [
      { q: "Vaillant loodgieter in Gent?", a: "Ja, we grijpen in Gent in voor reparatie, onderhoud en installatie Vaillant." },
      { q: "Interventietijd in Gent?", a: "Interventies gepland volgens beschikbaarheid. Neem contact op voor een offerte." },
    ],
    last_updated: new Date().toISOString(),
  },
  {
    slugFr: "liege",
    slugNl: "luik",
    nameFr: "Liège",
    nameNl: "Luik",
    regionFr: "Wallonie",
    regionNl: "Wallonië",
    postal_code: null,
    distance_minutes: null,
    response_time_minutes: null,
    building_profile: null,
    building_profile_nl: null,
    nearby_landmarks: [],
    nearby_landmarks_nl: null,
    common_issues: [
      "Réparation chaudière Vaillant",
      "Entretien et dépannage chauffage",
      "Remplacement chaudière",
    ],
    common_issues_nl: [
      "Vaillant ketelreparatie",
      "Onderhoud en herstelling verwarming",
      "Ketelvervanging",
    ],
    services: [
      "Réparation chaudière Vaillant",
      "Entretien chaudière",
      "Installation chauffage",
    ],
    services_nl: [
      "Vaillant ketelreparatie",
      "Ketelonderhoud",
      "Verwarmingsinstallatie",
    ],
    nearby_communes_fr: ["verviers", "seraing", "namur"],
    nearby_communes_nl: ["verviers", "seraing", "namen"],
    faq: [
      { q: "Plombier Vaillant à Liège ?", a: "Oui, nous desservons Liège pour plomberie et chauffage Vaillant." },
      { q: "Entretien chaudière à Liège ?", a: "Oui, entretien annuel et dépannage sur Liège et environs." },
    ],
    faq_nl: [
      { q: "Vaillant loodgieter in Luik?", a: "Ja, we bedienen Luik voor loodgieterij en Vaillant-verwarming." },
      { q: "Ketelonderhoud in Luik?", a: "Ja, jaarlijks onderhoud en herstelling in Luik en omgeving." },
    ],
    last_updated: new Date().toISOString(),
  },
  {
    slugFr: "louvain",
    slugNl: "leuven",
    nameFr: "Louvain",
    nameNl: "Leuven",
    regionFr: "Flandre",
    regionNl: "Vlaanderen",
    postal_code: null,
    distance_minutes: null,
    response_time_minutes: null,
    building_profile: null,
    building_profile_nl: null,
    nearby_landmarks: [],
    nearby_landmarks_nl: null,
    common_issues: [
      "Pannes chaudière Vaillant",
      "Entretien chauffage central",
      "Remplacement chaudière",
    ],
    common_issues_nl: [
      "Vaillant ketelstoringen",
      "Onderhoud centrale verwarming",
      "Ketelvervanging",
    ],
    services: [
      "Réparation chaudière Vaillant",
      "Entretien annuel",
      "Installation chauffage",
    ],
    services_nl: [
      "Vaillant ketelreparatie",
      "Jaarlijks onderhoud",
      "Verwarmingsinstallatie",
    ],
    nearby_communes_fr: ["bruxelles-ville", "malines", "hasselt"],
    nearby_communes_nl: ["brussel", "mechelen", "hasselt"],
    faq: [
      { q: "Plombier Vaillant à Louvain ?", a: "Oui, nous intervenons à Louvain pour chauffage et plomberie Vaillant." },
      { q: "Dépannage chauffage Louvain ?", a: "Oui, dépannage et entretien sur Louvain selon disponibilité." },
    ],
    faq_nl: [
      { q: "Vaillant loodgieter in Leuven?", a: "Ja, we grijpen in Leuven in voor verwarming en loodgieterij Vaillant." },
      { q: "Verwarmingsherstel Leuven?", a: "Ja, herstelling en onderhoud in Leuven volgens beschikbaarheid." },
    ],
    last_updated: new Date().toISOString(),
  },
];

// Additional cities (FR-only slugs for now; NL slug = same or common Dutch name)
const MORE_CITIES: Array<{
  slugFr: string;
  slugNl: string;
  nameFr: string;
  nameNl: string;
  regionFr: string;
  regionNl: string;
}> = [
  { slugFr: "charleroi", slugNl: "charleroi", nameFr: "Charleroi", nameNl: "Charleroi", regionFr: "Wallonie", regionNl: "Wallonië" },
  { slugFr: "bruges", slugNl: "brugge", nameFr: "Bruges", nameNl: "Brugge", regionFr: "Flandre", regionNl: "Vlaanderen" },
  { slugFr: "namur", slugNl: "namen", nameFr: "Namur", nameNl: "Namen", regionFr: "Wallonie", regionNl: "Wallonië" },
  { slugFr: "hasselt", slugNl: "hasselt", nameFr: "Hasselt", nameNl: "Hasselt", regionFr: "Flandre", regionNl: "Vlaanderen" },
  { slugFr: "mons", slugNl: "bergen", nameFr: "Mons", nameNl: "Bergen", regionFr: "Wallonie", regionNl: "Wallonië" },
  { slugFr: "malines", slugNl: "mechelen", nameFr: "Malines", nameNl: "Mechelen", regionFr: "Flandre", regionNl: "Vlaanderen" },
  { slugFr: "courtrai", slugNl: "kortrijk", nameFr: "Courtrai", nameNl: "Kortrijk", regionFr: "Flandre", regionNl: "Vlaanderen" },
  { slugFr: "ostende", slugNl: "oostende", nameFr: "Ostende", nameNl: "Oostende", regionFr: "Flandre", regionNl: "Vlaanderen" },
  { slugFr: "tournai", slugNl: "doornik", nameFr: "Tournai", nameNl: "Doornik", regionFr: "Wallonie", regionNl: "Wallonië" },
  { slugFr: "genk", slugNl: "genk", nameFr: "Genk", nameNl: "Genk", regionFr: "Flandre", regionNl: "Vlaanderen" },
  { slugFr: "seraing", slugNl: "seraing", nameFr: "Seraing", nameNl: "Seraing", regionFr: "Wallonie", regionNl: "Wallonië" },
  { slugFr: "verviers", slugNl: "verviers", nameFr: "Verviers", nameNl: "Verviers", regionFr: "Wallonie", regionNl: "Wallonië" },
  { slugFr: "mouscron", slugNl: "moeskroen", nameFr: "Mouscron", nameNl: "Moeskroen", regionFr: "Wallonie", regionNl: "Wallonië" },
  { slugFr: "turnhout", slugNl: "turnhout", nameFr: "Turnhout", nameNl: "Turnhout", regionFr: "Flandre", regionNl: "Vlaanderen" },
  { slugFr: "la-louviere", slugNl: "la-louviere", nameFr: "La Louvière", nameNl: "La Louvière", regionFr: "Wallonie", regionNl: "Wallonië" },
  { slugFr: "roulers", slugNl: "roeselare", nameFr: "Roulers", nameNl: "Roeselare", regionFr: "Flandre", regionNl: "Vlaanderen" },
  { slugFr: "waregem", slugNl: "waregem", nameFr: "Waregem", nameNl: "Waregem", regionFr: "Flandre", regionNl: "Vlaanderen" },
  { slugFr: "alost", slugNl: "aalst", nameFr: "Alost", nameNl: "Aalst", regionFr: "Flandre", regionNl: "Vlaanderen" },
  { slugFr: "lokeren", slugNl: "lokeren", nameFr: "Lokeren", nameNl: "Lokeren", regionFr: "Flandre", regionNl: "Vlaanderen" },
  { slugFr: "termonde", slugNl: "dendermonde", nameFr: "Termonde", nameNl: "Dendermonde", regionFr: "Flandre", regionNl: "Vlaanderen" },
  { slugFr: "saint-nicolas", slugNl: "sint-niklaas", nameFr: "Saint-Nicolas", nameNl: "Sint-Niklaas", regionFr: "Flandre", regionNl: "Vlaanderen" },
  { slugFr: "ypres", slugNl: "ieper", nameFr: "Ypres", nameNl: "Ieper", regionFr: "Flandre", regionNl: "Vlaanderen" },
];

const DEFAULT_ENTRY: Omit<CityEntry, "slugFr" | "slugNl" | "nameFr" | "nameNl" | "regionFr" | "regionNl" | "nearby_communes_fr" | "nearby_communes_nl"> = {
  postal_code: null,
  distance_minutes: null,
  response_time_minutes: null,
  building_profile: null,
  building_profile_nl: null,
  nearby_landmarks: [],
  nearby_landmarks_nl: null,
  common_issues: [
    "Pannes chaudière Vaillant",
    "Entretien et remplacement chaudière",
    "Problèmes de chauffage central",
  ],
  common_issues_nl: [
    "Vaillant ketelstoringen",
    "Onderhoud en ketelvervanging",
    "Problemen centrale verwarming",
  ],
  services: [
    "Réparation chaudière Vaillant",
    "Entretien chaudière annuel",
    "Installation chauffage central",
  ],
  services_nl: [
    "Vaillant ketelreparatie",
    "Jaarlijks ketelonderhoud",
    "Installatie centrale verwarming",
  ],
  faq: [
    { q: "Intervention dans cette ville ?", a: "Oui, nous planifions des interventions selon la disponibilité de nos techniciens." },
    { q: "Entretien Vaillant ?", a: "Oui, entretien annuel et dépannage pour chaudières Vaillant." },
  ],
  faq_nl: [
    { q: "Interventie in deze stad?", a: "Ja, we plannen interventies volgens de beschikbaarheid van onze technici." },
    { q: "Vaillant-onderhoud?", a: "Ja, jaarlijks onderhoud en herstelling voor Vaillant-ketels." },
  ],
  last_updated: new Date().toISOString(),
};

function buildMoreCityEntries(): CityEntry[] {
  return MORE_CITIES.map((c) => ({
    ...DEFAULT_ENTRY,
    slugFr: c.slugFr,
    slugNl: c.slugNl,
    nameFr: c.nameFr,
    nameNl: c.nameNl,
    regionFr: c.regionFr,
    regionNl: c.regionNl,
    nearby_communes_fr: [],
    nearby_communes_nl: [],
  }));
}

let allEntries: CityEntry[] | null = null;

function getAllEntries(): CityEntry[] {
  if (!allEntries) {
    const brussels = loadBrusselsCommunes();
    const others = [...OTHER_CITIES, ...buildMoreCityEntries()];
    const brusselsSlugs = new Set(brussels.map((b) => b.slugFr));
    const nonBrusselsOthers = others.filter((o) => !brusselsSlugs.has(o.slugFr));
    allEntries = [...brussels, ...nonBrusselsOthers];
  }
  return allEntries;
}

function entryToCommune(e: CityEntry, locale: "fr" | "nl"): Commune {
  const slug = locale === "fr" ? e.slugFr : e.slugNl;
  const name = locale === "fr" ? e.nameFr : e.nameNl;
  const region = locale === "fr" ? e.regionFr : e.regionNl;
  return {
    name,
    slug,
    region,
    postal_code: e.postal_code,
    distance_minutes: e.distance_minutes,
    response_time_minutes: e.response_time_minutes,
    building_profile: locale === "fr" ? e.building_profile : (e.building_profile_nl ?? e.building_profile),
    nearby_landmarks: locale === "nl" && e.nearby_landmarks_nl?.length ? e.nearby_landmarks_nl : e.nearby_landmarks,
    common_issues: locale === "nl" && e.common_issues_nl?.length ? e.common_issues_nl : e.common_issues,
    services: locale === "nl" && e.services_nl?.length ? e.services_nl : e.services,
    nearby_communes: locale === "fr" ? e.nearby_communes_fr : e.nearby_communes_nl,
    faq: locale === "nl" && e.faq_nl?.length ? e.faq_nl : e.faq,
    last_updated: e.last_updated,
  };
}

/** All cities for a locale (Commune shape, locale-resolved) */
export function getCities(locale: "fr" | "nl"): Commune[] {
  return getAllEntries().map((e) => entryToCommune(e, locale));
}

/** Single city by slug for locale, or undefined */
export function getCityBySlug(locale: "fr" | "nl", slug: string): Commune | undefined {
  const entries = getAllEntries();
  const entry = entries.find(
    (e) => (locale === "fr" && e.slugFr === slug) || (locale === "nl" && e.slugNl === slug)
  );
  return entry ? entryToCommune(entry, locale) : undefined;
}

/** All FR slugs for generateStaticParams */
export function getAllSlugsFr(): string[] {
  return getAllEntries().map((e) => e.slugFr);
}

/** All NL slugs for generateStaticParams */
export function getAllSlugsNl(): string[] {
  return getAllEntries().map((e) => e.slugNl);
}
