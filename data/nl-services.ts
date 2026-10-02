import type { FrService } from './fr-services';

/** Dutch service content (same shape as the French one). Slugs map via config/locale-routes.ts. */
export const nlServices: FrService[] = [
  {
    slug: 'vaillant-herstelling-belgie',
    icon: 'wrench.svg',
    title: 'Vaillant herstelling',
    keyword: 'Vaillant Herstelling',
    short: 'Een defect? Wij herstellen uw Vaillant ketel snel en correct.',
    body: [
      'Een Vaillant ketel die uitvalt is meer dan ongemakkelijk — in de winter kan dit een noodgeval worden. Als gecertificeerd Vaillant partner beschikken wij over de gespecialiseerde kennis en originele onderdelen om uw toestel snel en duurzaam te repareren.',
      'Onze technici zijn opgeleid door Vaillant en kennen alle ecoTEC, turboTEC en ecoCOMPACT modellen door en door. We diagnosticeren het probleem nauwkeurig voordat u kosten maakt — zodat u een weloverwogen beslissing kunt nemen.',
      'Na de herstelling ontvangt u een technisch verslag met de uitgevoerde acties en een advies voor preventief onderhoud om herhaling te voorkomen.',
    ],
    highlights: ['Originele Vaillant onderdelen', 'Gecertificeerd technicus', 'Technisch verslag na interventie'],
    metaTitle: 'Vaillant herstelling België | Vaillant Loodgieter',
    metaDescription:
      'Vaillant herstelling in België door gecertificeerde technici. Duidelijke diagnose, originele onderdelen en snelle interventie.',
  },
  {
    slug: 'boiler-vervangen-belgie',
    icon: 'water-heater-1.svg',
    title: 'Boiler vervangen',
    keyword: 'Boiler vervangen',
    short: 'Oud toestel? Wij installeren uw nieuwe Vaillant ketel professioneel.',
    body: [
      'Een ketel ouder dan 15 jaar verbruikt tot 30% meer gas dan een modern toestel. Uw ketel vervangen in België is dus een investering met een meetbaar rendement — niet alleen in comfort, maar ook op uw energiefactuur.',
      'Wij begeleiden u bij de keuze van het juiste Vaillant model op basis van uw woningtype, het aantal kamers en uw verwarmingsbehoeften. Vervolgens zorgen we voor een volledige installatie volgens de Belgische normen, inclusief inbedrijfstelling.',
      'Duurzame verwarmingsoplossingen zijn onze specialiteit: van de traditionele gaswandketel tot hybride warmpompcombinaties.',
    ],
    highlights: ['Advies op maat', 'Volledige installatie en inbedrijfstelling', 'Conform Belgische normen'],
    metaTitle: 'Boiler vervangen België | Vaillant Loodgieter',
    metaDescription:
      'Uw ketel laten vervangen in België? Advies op maat, volledige installatie en inbedrijfstelling door een gecertificeerd Vaillant partner.',
  },
  {
    slug: 'nieuwe-verwarming-belgie',
    icon: 'radiator.svg',
    title: 'Nieuwe verwarming',
    keyword: 'Nieuwe verwarming',
    short: 'Nieuwbouw of renovatie? Wij ontwerpen en installeren uw verwarmingssysteem.',
    body: [
      'Of het nu gaat om het verwarmen van een nieuwbouw of het vervangen van een compleet systeem in een bestaande woning — de juiste dimensionering bepaalt jarenlang uw comfort en energieverbruik. Wij maken een thermische analyse voordat we een systeem voorstellen.',
      'Als gecertificeerd installateur werken we met Vaillant producten die hun prestaties onder het Belgische klimaat hebben bewezen. Wij installeren vloerverwarming, radiatoren en thermostatische regelsystemen.',
      'Elk project wordt opgeleverd met volledige documentatie en een technisch dossier voor uw EPB-aangifte indien van toepassing.',
    ],
    highlights: ['Voorgaande thermische analyse', 'Volledige documentatie en EPB-dossier', 'Gecertificeerd Vaillant installateur'],
    metaTitle: 'Nieuwe verwarming België | Vaillant Loodgieter',
    metaDescription:
      'Nieuwbouw of renovatie: ontwerp en installatie van uw verwarmingssysteem met Vaillant producten, inclusief EPB-dossier.',
  },
  {
    slug: 'waterlek-herstellen-belgie',
    icon: 'pipes.svg',
    title: 'Waterlek herstellen',
    keyword: 'Waterlek herstellen',
    short: 'Een waterlek veroorzaakt snel schade — wij lokaliseren en herstellen snel.',
    body: [
      'Een waterlek — zichtbaar of onzichtbaar — kan in korte tijd grote schade aanrichten aan uw structuur, vloeren en muren. Onze technici beschikken over de nodige apparatuur om onzichtbare lekken te detecteren zonder onnodig breekwerk.',
      'Na lokalisatie geven we u een duidelijke uitleg over het probleem en de hersteloptie. We werken snel en efficiënt om waterschade in uw eigendom te minimaliseren.',
      'Bezwaar: "Ik zie geen lek, dus er is niets?" — Verborgen lekken in leidingen achter muren of onder vloeren vallen op door een stijgende waterfactuur of vochtplekken. Wacht niet tot de schade zichtbaar is.',
    ],
    highlights: ['Lekdetectie zonder onnodig breekwerk', 'Snelle interventie', 'Duidelijke offerte vooraf'],
    metaTitle: 'Waterlek herstellen België | Vaillant Loodgieter',
    metaDescription:
      'Waterlek? Wij lokaliseren en herstellen lekken snel, zonder onnodig breekwerk en met duidelijke offerte vooraf.',
  },
  {
    slug: 'sanitair-installatie-belgie',
    icon: 'bathtub.svg',
    title: 'Sanitair installatie',
    keyword: 'Sanitair installatie',
    short: 'Badkamerrenovatie of nieuwe toestellen — installatie door gecertificeerde loodgieters.',
    body: [
      'Van een simpele kraan tot een volledige badkamerrenovatie — onze gekwalificeerde loodgieters installeren alle sanitaire voorzieningen: WC, douche, bad, lavabo, bidet en meer.',
      'Bij elke installatie respecteren we de Belgische bouwvoorschriften. Elk project wordt afgewerkt met de nodige afdichtingen, veiligheidsventilatie en controle van de waterdruk.',
      'Twijfelt u over de keuze van uw toestellen? Onze technici adviseren u over waterbesparende configuraties die ook uw energieverbruik verlagen.',
    ],
    highlights: ['Alle sanitaire voorzieningen', 'Conform Belgische regelgeving', 'Advies voor waterbesparing'],
    metaTitle: 'Sanitair installatie België | Vaillant Loodgieter',
    metaDescription:
      'Installatie van sanitair en badkamerrenovatie door gekwalificeerde loodgieters, conform de Belgische regelgeving.',
  },
  {
    slug: 'vaillant-onderhoudscontract',
    icon: 'gauge.svg',
    title: 'Vaillant Onderhoudscontract',
    keyword: 'Onderhoudscontract',
    short: 'Jaarlijks professioneel onderhoud om de levensduur van uw installatie te maximaliseren.',
    body: [
      'Preventief onderhoud is de meest rendabele bescherming voor uw verwarmingssysteem. Een jaarlijks Vaillant onderhoudscontract omvat een volledige inspectie, reiniging van de brander en warmtewisselaar, en een schriftelijk rapport.',
      'Bezwaar: "Mijn ketel werkt goed, waarom onderhoud?" — Ketels die niet jaarlijks worden onderhouden, verliezen geleidelijk hun efficiëntie en vallen vaker uit — precies op het moment dat u ze het meest nodig heeft.',
      'Als gecertificeerd Vaillant partner voeren wij het onderhoud uit volgens de officiële Vaillant protocollen, waardoor uw garantie van kracht blijft.',
    ],
    highlights: ['Jaarlijkse inspectie en reiniging', 'Garantie blijft geldig', 'Schriftelijk rapport'],
    metaTitle: 'Vaillant onderhoudscontract België | Vaillant Loodgieter',
    metaDescription:
      'Sluit een Vaillant onderhoudscontract af in België. Jaarlijkse inspectie, professionele reiniging en een gedetailleerd technisch verslag.',
  },
];

export const nlServicesBySlug: Record<string, FrService> = Object.fromEntries(
  nlServices.map((service) => [service.slug, service]),
);
