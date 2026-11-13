import type { BulexLocale } from './routes';
// Manufacturer references checked 2026-11-13. Product families are not stock promises.
const catalogue='https://www.bulex.be/particulier/producten/alle-producten/';
export const products = [
 {name:'ThemaFast Condens',category:0,models:['20/26-CS/1 (N-BE) · 0010043888','25/31-CS/1 (N-BE) · 0010043889','30/35-CS/1 (N-BE) · 0010043890'],en:'A combi condensing boiler for central heating and domestic hot water. AquaFast supports hot-water comfort.',nl:'Een condensatiecombiketel voor centrale verwarming en sanitair warm water. AquaFast ondersteunt het warmwatercomfort.',source:'https://www.bulex.be/particuliers/produits/themafast-condens-85568.html',reference:'https://www.bulex.com/downloads/telechargements/documents-1/peb-fr-2025-00-3091416.pdf'},
 {name:'Thema Condens AS',category:0,models:['AS 12 A','AS 25 A'],en:'A heating-only condensing boiler that can be paired with a separate hot-water cylinder.',nl:'Een condensatieketel voor verwarming, combineerbaar met een afzonderlijke warmwaterboiler.',source:'https://www.bulex.be/particuliers/produits/thema-condens-as-85570.html'},
 {name:'GeniaAir Max',category:1,models:[],en:'An air-to-water heat-pump range for heating and hot-water systems. Selection starts with the building’s heat demand.',nl:'Een lucht-waterwarmtepompreeks voor verwarming en warmwatersystemen. De keuze begint bij de warmtebehoefte van de woning.',source:catalogue},
 {name:'GeniaAir Classic',category:1,models:[],en:'An air-to-water heat pump with flexible installation configurations. Assess the emitters, outdoor-unit position and cylinder space together.',nl:'Een lucht-waterwarmtepomp met flexibele installatieopstellingen. Beoordeel afgiftesysteem, buitenunit en boilerruimte samen.',source:'https://www.bulex.be/particulier/producten/geniaair-classic-136128.html'},
 {name:'GeniaAir Split R32',category:1,models:[],en:'A split air-to-water system suited to low-temperature emitters such as underfloor heating.',nl:'Een split lucht-watersysteem geschikt voor lagetemperatuurafgifte, zoals vloerverwarming.',source:catalogue},
 {name:'Opalia',category:2,models:['C11','C14','C11G','C14G','F14E','F17E'],en:'Gas water heaters. The exact variant determines ventilation, flue and connection requirements; models are not interchangeable.',nl:'Gasbadverwarmers. De exacte variant bepaalt ventilatie, rookgasafvoer en aansluitingen; modellen zijn niet onderling uitwisselbaar.',source:'https://www.bulex.be/particuliers/produits/opalia-1797.html'},
 {name:'AvantiaAqua / SafiraAqua',category:2,models:[],en:'Electric storage-water-heater families for domestic hot water. Capacity and mounting depend on the selected model.',nl:'Elektrische voorraadboilers voor sanitair warm water. Inhoud en montage hangen af van het gekozen model.',source:catalogue},
 {name:'MiPro Sense / MiGo Select',category:3,models:[],en:'Heating controls with different system requirements. Check appliance compatibility and the required MiGo Link connection before choosing.',nl:'Verwarmingsregelingen met verschillende systeemvereisten. Controleer toestelcompatibiliteit en de benodigde MiGo Link-verbinding vooraf.',source:catalogue}
];
export const faultCodes=[
 {code:'F 28',en:'Ignition failure',nl:'Ontsteking mislukt'},
 {code:'F 29',en:'Operation interrupted and re-ignition failed',nl:'Werking onderbroken en herontsteking mislukt'},
 {code:'F 23',en:'Safety shutdown: excessive temperature difference',nl:'Veiligheidsuitschakeling: te groot temperatuurverschil'},
 {code:'F 24',en:'Safety shutdown: temperature rising too quickly',nl:'Veiligheidsuitschakeling: temperatuur stijgt te snel'},
 {code:'F 75',en:'Insufficient pressure change when the heating pump starts',nl:'Onvoldoende drukverandering bij het starten van de verwarmingspomp'}
];
export const faultSource='https://www.bulex.be/particuliers/services/codes-d-erreur/';
export function productText(p:typeof products[number],locale:BulexLocale){return p[locale]}
