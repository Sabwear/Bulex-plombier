import {bulexIndexable} from '@/config/bulex/brand';
import type {Metadata} from 'next';
import sitemap from '@/config/bulex/sitemap';
import {getBulexOrigin} from '@/config/bulex/request-origin';
import './sitemap.css';
export const dynamic='force-dynamic';
export async function generateMetadata():Promise<Metadata>{
 return {title:'Sitemap | Bulex Plombier',description:'Browse the published Dutch and English pages on Bulex Plombier.',alternates:{canonical:(await getBulexOrigin())+'/sitemap'},robots:{index:bulexIndexable,follow:true}};
}
export default async function SitemapPage(){
 const entries=await sitemap();
 const groups=[['Pages','pages'],['Services','services'],['Heating solutions','solutions'],['Service areas','areas'],['Blog and advice','advice']] as const;
 function category(url:string){const path=new URL(url).pathname;return /^\/(en\/)?(diensten|services)\//.test(path)?'services':/^\/(en\/)?(oplossingen|solutions)\//.test(path)?'solutions':/^\/(en\/)?(loodgieter|service-areas)\//.test(path)?'areas':/^\/(en\/)?(blog|advice)\//.test(path)?'advice':'pages';}
 return <main className="sitemap-view"><header><a className="sitemap-brand" href="/">Bulex Plombier</a><h1>Website sitemap</h1><p>{entries.length} published pages in Dutch and English. Browse by topic or open the <a href="/sitemap.xml">XML sitemap for search engines</a>.</p><p lang="nl">Alle gepubliceerde pagina’s in het Nederlands en Engels, gegroepeerd per onderwerp.</p><nav aria-label="Sitemap sections">{groups.map(([label,id])=><a href={'#'+id} key={id}>{label}</a>)}</nav></header>{groups.map(([label,id])=>{const rows=entries.filter(e=>category(e.url)===id);return <section id={id} key={id}><h2>{label}<span>{rows.length} pages</span></h2><ul>{rows.map(entry=>{const url=new URL(entry.url);const english=url.pathname==='/en'||url.pathname.startsWith('/en/');return <li key={entry.url}><span className="sitemap-language">{english?'EN':'NL'}</span><a href={entry.url}>{url.pathname==='/'?'Home (Nederlands)':url.pathname==='/en'?'Home (English)':url.pathname}</a>{entry.lastModified&&<time dateTime={new Date(entry.lastModified).toISOString()}>{new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Brussels',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(entry.lastModified))}</time>}</li>})}</ul></section>})}<footer>Publication dates are shown only where available. Scheduled articles appear after publication. <a href="/contact">Contact / Contacteer ons</a></footer></main>;
}
