import Link from 'next/link';
import content from '@/config/bulex/editorial.json';
import {href,type BulexLocale} from '@/config/bulex/routes';
export default function Editorial({locale,topic,compact=false}:{locale:BulexLocale;topic:string;compact?:boolean}){
 const blocks=(content as Record<string,Record<BulexLocale,{title:string;text:string}[]>>)[topic]?.[locale];
 if(!blocks)return null;
 return <div className={compact?'bx-editorial bx-prose':'bx-editorial'}><div className={compact?'':'bx-editorial-grid'}>{blocks.map((block,i)=><section key={block.title} className="bx-editorial-block"><span className="bx-editorial-number">{String(i+1).padStart(2,'0')}</span><h2>{block.title}</h2><p>{block.text}</p></section>)}</div><nav className="bx-editorial-links" aria-label={locale==='en'?'Explore related information':'Gerelateerde informatie'}><Link href={href(locale,'services')}>{locale==='en'?'Compare heating and plumbing services':'Vergelijk verwarming en sanitair'}</Link><Link href={href(locale,'solutions')}>{locale==='en'?'Explore Bulex equipment':'Ontdek Bulex-toestellen'}</Link><Link href={href(locale,'booking')}>{locale==='en'?'Discuss your installation':'Bespreek uw installatie'}</Link></nav></div>
}
