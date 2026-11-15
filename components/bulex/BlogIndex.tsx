'use client';
import {useMemo,useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowUpRight,Search,Clock,Phone} from 'lucide-react';
import {blogDate,blogReadTime,blogCategoryLabels} from '@/config/bulex/blog-format';
import {getPublicPhoneDisplay} from '@/config/public-phone';
import type {BlogPost} from '@/config/bulex/blog';
import {href,type BulexLocale} from '@/config/bulex/routes';
export default function BlogIndex({locale,posts,phone,nextDate}:{locale:BulexLocale;posts:BlogPost[];phone:string;nextDate?:string}){
 const nl=locale==='nl',[query,setQuery]=useState(''),[category,setCategory]=useState('all');
 const categories=[...new Set(posts.map(p=>p.category))];
 const labels=blogCategoryLabels[locale] as Record<string,string>;
 const filtered=useMemo(()=>posts.filter(p=>(category==='all'||category===p.category)&&(p.title[locale]+' '+p.answer[locale]).toLocaleLowerCase().includes(query.toLocaleLowerCase())),[posts,category,query,locale]);
 const featured=filtered[0];
 return <div className="bx-blog-hub">
 <div className="bx-blog-toolbar"><div className="bx-blog-filters" role="group" aria-label={nl?'Filter op onderwerp':'Filter by topic'}>{['all',...categories].map(c=><button key={c} type="button" aria-pressed={category===c} onClick={()=>setCategory(c)}>{c==='all'?(nl?'Alle artikelen':'All articles'):labels[c]}</button>)}</div><label className="bx-blog-search"><Search size={18}/><span className="bx-sr-only">{nl?'Zoek in de blog':'Search the blog'}</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder={nl?'Zoek model of probleem…':'Search a model or problem…'}/></label></div>
 <p className="bx-blog-results" role="status">{filtered.length} {filtered.length===1?(nl?'artikel':'article'):(nl?'artikelen':'articles')}</p>
 {featured?<><Link className="bx-blog-featured" href={href(locale,'blog',featured.slug[locale])}><div className="bx-blog-featured-image"><Image src={'/bulex/'+featured.image+'.webp'} alt="" fill sizes="(max-width:700px) 90vw, 50vw" priority/></div><div className="bx-blog-featured-copy"><span className="bx-blog-tag">{labels[featured.category]}</span><span className="bx-blog-kicker">{nl?'Uitgelicht advies':'Featured guide'}</span><h2>{featured.title[locale]}</h2><p>{featured.answer[locale]}</p><div className="bx-blog-card-meta"><time dateTime={featured.publishAt}>{blogDate(featured.publishAt,locale)}</time><span><Clock size={14}/>{blogReadTime(featured,locale)} min</span></div><strong>{nl?'Lees de gids':'Read the guide'}<ArrowUpRight size={20}/></strong></div></Link>
 <div className="bx-modern-blog-grid">{filtered.slice(1).map(p=><Link className="bx-modern-blog-card" key={p.id} href={href(locale,'blog',p.slug[locale])}><div className="bx-modern-blog-image"><Image src={'/bulex/'+p.image+'.webp'} alt="" fill sizes="(max-width:700px) 90vw, 30vw"/><span className="bx-blog-tag">{labels[p.category]}</span></div><div className="bx-modern-blog-copy"><div className="bx-blog-card-meta"><time dateTime={p.publishAt}>{blogDate(p.publishAt,locale)}</time><span>{blogReadTime(p,locale)} min</span></div><h2>{p.title[locale]}</h2><p>{p.answer[locale]}</p><strong>{nl?'Lees verder':'Read more'}<ArrowUpRight size={18}/></strong></div></Link>)}</div></>:<div className="bx-blog-empty"><h2>{nl?'Geen passende artikelen':'No matching articles'}</h2><p>{nl?'Probeer een toestelnaam of kies een ander onderwerp.':'Try an appliance name or choose another topic.'}</p><button type="button" onClick={()=>{setQuery('');setCategory('all')}}>{nl?'Toon alle artikelen':'Show all articles'}</button></div>}
 <div className="bx-blog-help"><div><h2>{nl?'Een vraag over uw eigen installatie?':'A question about your own installation?'}</h2><p>{nl?'Bel met uw model, postcode en een beschrijving van het probleem.':'Call with your model, postcode and a description of the problem.'}</p>{nextDate&&<small>{nl?'Volgende gids':'Next guide'} · {blogDate(nextDate,locale)}</small>}</div>{phone&&<a href={phone} className="bx-button"><Phone size={19}/>{getPublicPhoneDisplay()}</a>}</div>
 </div>;
}
