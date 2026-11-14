import type {BulexLocale,PageKey} from './routes';
export function mainMeta(locale:BulexLocale,key:PageKey){
 const nl=locale==='nl';
 const entries:Partial<Record<PageKey,[string,string]>>=nl?{
 home:['Bulex verwarming en loodgieterij in België','Bulex-ketelherstelling, onderhoud, installatie en sanitair. Bekijk oplossingen en lokale dienstinformatie of bespreek uw woning met ons team.'],
 services:['Verwarming en sanitair: herstelling en installatie','Vergelijk ketelherstelling, onderhoud, nieuwe verwarming, warm water en sanitaire werken. Bereid uw aanvraag voor met toestel- en adresgegevens.'],
 solutions:['Bulex-ketels, warmtepompen en boilers','Vergelijk Bulex-condensatieketels, GeniaAir-warmtepompen en boilers. Lees welke aansluitingen, regeling en woninggegevens de keuze bepalen.'],
 areas:['Werkgebied voor Bulex-service in België','Zoek uw gemeente voor lokale woninginformatie en Bulex-service. Deel postcode en toegangsgegevens om beschikbaarheid voor uw adres te bespreken.'],
 about:['Over Bulex Plombier: verwarming en sanitair','Leer hoe Bulex Plombier aanvragen voor verwarming en sanitair behandelt, bestaande toestellen beoordeelt en de omvang van werken bespreekt.'],
 contact:['Contact voor Bulex-verwarming en sanitair','Een vraag over uw Bulex-toestel, waterlek of installatie? Bezorg model, postcode en probleemomschrijving om de juiste volgende stap te bespreken.'],
 booking:['Vraag een Bulex-technieker aan','Vraag herstelling, onderhoud of installatie aan. Deel toestelmodel, foutcode en adres. Het team bespreekt beschikbaarheid, omvang en offerte.'],
 blog:['Bulex-advies over verwarming en warm water','Praktische gidsen over keteldruk, foutcodes, radiatoren, warm water en toestelkeuze. Lees wat u kunt melden en wanneer beoordeling nodig is.'],
 faq:['Vragen over Bulex-service en afspraken','Antwoorden over aanvragen, offertes, bereikbaarheid, Bulex-modelgegevens en voorbereiding op een onderhouds- of herstellingsbezoek.'],
 credentials:['Bulex-partnerschap en toesteldocumentatie','Informatie over partnerdiensten, toestelidentificatie en het controleren van modeldocumentatie en voorwaarden voor uw Bulex-installatie.'],
 privacy:['Privacybeleid','Lees welke aanvraaggegevens Bulex Plombier verwerkt, waarom ze nodig zijn, wie ze ontvangt en hoe u uw privacyrechten kunt uitoefenen.'],
 cookies:['Cookiebeleid en voorkeuren','Lees welke noodzakelijke opslag deze website gebruikt, hoe lang uw cookiekeuze blijft bewaard en hoe u voorkeuren wijzigt of intrekt.'],
 terms:['Websitevoorwaarden','Voorwaarden voor websitegebruik, aanvragen, productinformatie en externe links. Een formulier is geen betaalde bestelling of bevestigde afspraak.'],
 legal:['Juridische informatie en bedrijfsidentiteit','Informatie over de exploitant van Bulex Plombier, bedrijfsidentificatie, contact en de verhouding tussen fabrikant en partnerdienst.'],
 consumer:['Consumenteninformatie en klachten','Informatie over offertes, herroeping bij toepasselijke overeenkomsten, dringende herstellingen en de behandeling van consumentenklachten.'],
 accessibility:['Toegankelijkheid en hulp','Lees hoe u de website met toetsenbord en hulpmiddelen gebruikt en hoe u een toegangsprobleem meldt of een andere contactwijze vraagt.']
 }:{
 home:['Bulex heating and plumbing services in Belgium','Bulex boiler repair, maintenance, installation and plumbing. Explore equipment and local service information, or discuss your home with our team.'],
 services:['Heating and plumbing: repairs and installation','Compare boiler repair, maintenance, heating, hot water and plumbing installation. Prepare an enquiry with your appliance and address details.'],
 solutions:['Bulex boilers, heat pumps and water heaters','Compare Bulex condensing boilers, GeniaAir heat pumps and hot-water equipment. Learn which connections, controls and property details matter.'],
 areas:['Bulex service areas in Belgium','Find your town for local property information and Bulex service enquiries. Share your postcode and access details to discuss availability.'],
 about:['About Bulex Plombier: heating and plumbing','Learn how Bulex Plombier handles heating and plumbing requests, considers existing equipment and discusses the scope of proposed work.'],
 contact:['Contact for Bulex heating and plumbing','Ask about a Bulex appliance, water leak or installation. Send your model, postcode and problem description so we can discuss the next step.'],
 booking:['Request a Bulex technician','Request a repair, maintenance visit or installation. Share the appliance model, fault code and address to discuss availability, scope and quotation.'],
 blog:['Bulex heating and hot-water advice','Practical guides to boiler pressure, fault codes, radiators, hot water and equipment choices. Find useful observations to share with your technician.'],
 faq:['Bulex service and appointment questions','Answers about enquiries, quotations, coverage, appliance identification and preparing for a boiler maintenance or repair visit.'],
 credentials:['Bulex partnership and appliance documentation','Read about partner services, appliance identification and checking the right model documentation and conditions for your Bulex installation.'],
 privacy:['Privacy policy','Learn which enquiry data Bulex Plombier processes, why it is needed, who receives it and how to exercise your data-protection rights.'],
 cookies:['Cookie policy and preferences','See which necessary storage this website uses, how long your cookie choice is retained and how to change preferences or withdraw consent.'],
 terms:['Website terms of use','Terms for website use, service requests, product guidance and external links. A form submission is not a paid order or confirmed appointment.'],
 legal:['Legal information and business identity','Information about the Bulex Plombier website operator, business identification, contact details and the distinction between manufacturer and service.'],
 consumer:['Consumer information and complaints','Read about quotations, withdrawal where applicable, urgent-repair exceptions and how to raise a complaint about heating or plumbing services.'],
 accessibility:['Accessibility and assistance','Find information about keyboard access, reporting a website barrier and requesting another way to contact our heating and plumbing team.']
 };
 return entries[key]!;
}
