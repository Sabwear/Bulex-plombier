import Image from 'next/image';
import Link from 'next/link';
import {Phone,Clock,ArrowRight} from 'lucide-react';
import {blogDate,blogReadTime,blogCategoryLabels,getPublishedBlogPosts,type BlogPost} from '@/config/bulex/blog';
import {getServices} from '@/config/bulex/content';
import {href,type BulexLocale} from '@/config/bulex/routes';
import {getPublicPhoneTelHref} from '@/config/public-phone';
import {getCityBySlug} from '@/data/city-data';
export default function BlogArticle({locale,post}:{locale:BulexLocale;post:BlogPost}){
 const nl=locale==='nl',service=getServices(locale)[post.service],city=getCityBySlug('nl',post.area)!;
 const labels=blogCategoryLabels[locale] as Record<string,string>;
 const related=getPublishedBlogPosts().filter(p=>p.id!==post.id).slice(0,3);
 return <div className="bx-reading-layout"><article className="bx-reading-article"><div className="bx-reading-meta"><span className="bx-blog-tag">{labels[post.category]}</span><time dateTime={post.publishAt}>{blogDate(post.publishAt,locale)}</time><span><Clock size={15}/>{blogReadTime(post,locale)} min</span></div><p className="bx-reading-answer">{post.answer[locale]}</p><div className="bx-reading-image"><Image src={'/bulex/'+post.image+'.webp'} alt={post.title[locale]} fill sizes="(max-width:800px) 90vw, 760px" priority/></div><div className="bx-reading-summary"><h2>{nl?'Kort voorbereiden':'Before you contact a technician'}</h2><ul>{post.takeaways[locale].map(t=><li key={t}>{t}</li>)}</ul></div>
 {post.sections.map((s,i)=><section className="bx-reading-section" key={s.heading.en} id={'guide-section-'+i}><h2>{s.heading[locale]}</h2><p>{s.body[locale]}</p></section>)}
 <section className="bx-reading-section"><h2>{nl?'Van advies naar hulp voor uw woning':'From guidance to help for your home'}</h2><p>{nl?'Bespreek uw installatie via onze dienst':'Discuss your installation through our'} <Link href={href(locale,'services',service.slug)}>{service.title.toLowerCase()}</Link>{nl?'. Bekijk ook onze lokale woninginformatie voor ':'. See our local property information for '}<Link href={href(locale,'areas',city.slug)}>{city.name}</Link>{nl?' en de beschikbare ':' and explore '}<Link href={href(locale,'solutions')}>{nl?'Bulex-oplossingen':'Bulex equipment options'}</Link>.</p></section>
 <section className="bx-reading-sources"><h2>{nl?'Fabrikantdocumentatie':'Manufacturer references'}</h2><p>{nl?'Gebruik voor uw toestel altijd de volledige referentie en de bijbehorende handleiding.':'Always use the complete appliance reference and the matching manual.'}</p><ul>{post.sources.map((source,i)=><li key={source}><a href={source} target="_blank" rel="noopener noreferrer">{i===0?(nl?'Bulex: referentie bij dit onderwerp':'Bulex: topic reference'):(nl?'Bulex: toesteldocumentatie':'Bulex: appliance documentation')} ↗</a></li>)}</ul></section>
 <div className="bx-reading-related"><h2>{nl?'Verder lezen':'Keep reading'}</h2>{related.map(p=><Link key={p.id} href={href(locale,'blog',p.slug[locale])}>{p.title[locale]}<ArrowRight size={17}/></Link>)}</div>
 </article><aside className="bx-reading-sidebar"><nav aria-label={nl?'In dit artikel':'In this guide'}><h2>{nl?'In deze gids':'In this guide'}</h2>{post.sections.map((s,i)=><a key={s.heading.en} href={'#guide-section-'+i}><span>{String(i+1).padStart(2,'0')}</span>{s.heading[locale]}</a>)}</nav><div className="bx-reading-call"><h2>{nl?'Hulp nodig?':'Need help?'}</h2><p>{nl?'Vermeld model, foutcode en postcode wanneer u belt.':'Have your model, fault code and postcode ready when calling.'}</p>{getPublicPhoneTelHref()&&<a className="bx-button" href={getPublicPhoneTelHref()}><Phone size={19}/>{nl?'Bel de loodgieter':'Call the plumber'}</a>}</div></aside></div>;
}
