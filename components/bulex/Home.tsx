import Testimonials from './Testimonials';
import HeroCarousel from './HeroCarousel';
import Image from 'next/image';
import Link from 'next/link';
import {Check,MapPin,ChevronRight,Star} from 'lucide-react';
import {copy} from '@/config/bulex/content';
import {href,type BulexLocale} from '@/config/bulex/routes';
import {Actions,Services,Solutions,Partner,Checklist} from './Shared';
export default function Home({locale}:{locale:BulexLocale}){const t=copy[locale];const configuredUrl=process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL;const reviewUrl=configuredUrl&&/^https:\/\//.test(configuredUrl)?configuredUrl:undefined;return <>
<HeroCarousel locale={locale}/>
<section className="bx-section bx-services-section"><div className="bx-container"><div className="bx-section-heading"><h2>{t.help}</h2><p>{t.helpText}</p></div><Services locale={locale}/></div></section>
<section className="bx-section bx-partner-section"><div className="bx-container"><Partner locale={locale}/></div></section>
<section className="bx-section bx-solutions-section"><div className="bx-container"><div className="bx-section-heading"><h2>{t.solutionsTitle}</h2><p>{t.solutionsText}</p></div><Solutions locale={locale}/></div></section>
<section className="bx-section bx-why-section"><div className="bx-container bx-why-grid"><div><h2>{t.why}</h2><Checklist items={t.advantages}/></div><div className="bx-lifestyle"><Image src="/bulex/hero-comfort.webp" alt={locale==='nl'?'Ontspannen in een comfortabel verwarmde woning':'Relaxing in a comfortably heated home'} fill sizes="(max-width: 700px) 90vw, 420px"/><span>{t.heroTitle}</span></div><div className="bx-area-summary"><div className="bx-belgium-map"><Image src="/bulex/service-map.webp" alt="" fill sizes="180px"/></div><h2>{t.areasTitle}</h2><p>{t.areasText}</p><Link href={href(locale,'areas')} className="bx-button bx-button-outline"><MapPin size={17}/>{t.areasButton}</Link><div className="bx-city-links">{['Brussel','Antwerpen','Gent'].map((city,i)=><Link key={city} href={href(locale,'areas',['brussel','antwerpen','gent'][i])}>{city}<ChevronRight size={12}/></Link>)}</div></div></div></section>
<Testimonials locale={locale} googleReviewUrl={reviewUrl}/>
</>}
