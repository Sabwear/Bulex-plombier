import Link from 'next/link';
import type {Commune} from '@/data/types';
import translations from '@/config/bulex/geo-en.json';
import {products,faultCodes,faultSource} from '@/config/bulex/products';
import {getServices} from '@/config/bulex/content';
import {href,type BulexLocale} from '@/config/bulex/routes';

export function LocalDetails({city,locale}:{city:Commune;locale:BulexLocale}){
 const key=city.slug==='brussel'?'bruxelles-ville':city.slug;
 const en=(translations as Record<string,{profile:string;issues:string[]}>)[key];
 const profile=locale==='nl'?city.building_profile:en?.profile;
 // Preserve property-specific issues, but do not relabel an old appliance as a Bulex model.
 const issues=locale==='nl'?city.common_issues.map(x=>x.replace(/Vaillant[- ]?/gi,'')):en?.issues||[];
 return <div className="bx-local-details">
 {profile&&<><h2>{locale==='nl'?'Uw woning en de lokale situatie':'Your property and the local setting'}</h2><p>{profile}.</p></>}
 {city.nearby_landmarks.length>0&&<><h3>{locale==='nl'?'Buurten en herkenningspunten':'Neighbourhoods and landmarks'}</h3><p>{city.nearby_landmarks.join(' · ')}</p></>}
 {issues.length>0&&<><h3>{locale==='nl'?'Aandachtspunten bij de beoordeling':'Issues to discuss during assessment'}</h3><ul>{issues.map(i=><li key={i}>{i}</li>)}</ul></>}
 <h3>{locale==='nl'?'Verwarming, sanitair, installatie en herstelling':'Heating, plumbing, installation and repairs'}</h3>
 <p>{locale==='nl'?'Bij oudere leidingen, gedeelde installaties of renovatie bespreken we ook de toegang, bestaande aansluitingen en afstemming met de eigenaar of syndicus. Vermeld uw postcode, verdieping en toestelmodel bij de aanvraag.':'For older pipework, shared systems or renovations, we also discuss access, existing connections and coordination with the owner or building manager. Include your postcode, floor and appliance model in your enquiry.'}</p>
 <div className="bx-local-links">{getServices(locale).filter(s=>[0,1,2,3,6,7].includes(s.index)).map(s=><Link key={s.slug} href={href(locale,'services',s.slug)}>{s.title} →</Link>)}</div>
 </div>;
}
export function ProductDetails({locale,category}:{locale:BulexLocale;category?:number}){
 return <section className="bx-product-details"><h2>{locale==='nl'?'Bulex-reeksen en modellen':'Bulex ranges and models'}</h2><p>{locale==='nl'?'Een selectie uit de fabrikantdocumentatie. Beschikbaarheid, uitvoering en geschiktheid bevestigen we voor uw installatie.':'A selection from manufacturer documentation. We confirm availability, exact variant and suitability for your installation.'}</p><div className="bx-product-list">{products.filter(p=>category===undefined||p.category===category).map(p=><article key={p.name}><h3>{p.name}</h3><p>{p[locale]}</p>{p.models.length>0&&<><h4>{locale==='nl'?'Modelreferenties':'Model references'}</h4><ul>{p.models.map(m=><li key={m}>{m}</li>)}</ul></>}<a href={p.source} target="_blank" rel="noopener noreferrer">{locale==='nl'?'Fabrikantdocumentatie':'Manufacturer documentation'} ↗</a>{p.reference&&<a href={p.reference} target="_blank" rel="noopener noreferrer">{locale==='nl'?'Artikelreferenties (PDF)':'Article references (PDF)'} ↗</a>}</article>)}</div></section>;
}
export function FaultDetails({locale}:{locale:BulexLocale}){
 return <section className="bx-product-details"><h2>{locale==='nl'?'Bulex-foutcodes begrijpen':'Understanding Bulex fault codes'}</h2><p>{locale==='nl'?'Dit overzicht is een diagnosehulp, geen herstelinstructie. De betekenis hangt af van model en generatie: controleer altijd de bijbehorende handleiding. Noteer de volledige code en maak een foto van het typeplaatje zonder het toestel te openen.':'This overview is a diagnostic aid, not a repair procedure. Meanings depend on model and generation: always check the matching manual. Record the complete code and photograph the rating plate without opening the appliance.'}</p><dl className="bx-fault-list">{faultCodes.map(f=><div key={f.code}><dt>{f.code}</dt><dd>{f[locale]}</dd></div>)}</dl><p>{locale==='nl'?'Laat interne controles en werken aan gas, verbranding en elektriciteit aan een bevoegde technieker over.':'Leave internal checks and gas, combustion and electrical work to a qualified technician.'}</p><a href={faultSource} target="_blank" rel="noopener noreferrer">{locale==='nl'?'Officieel Bulex-codeoverzicht (FR)':'Official Bulex code reference (FR)'} ↗</a></section>;
}
