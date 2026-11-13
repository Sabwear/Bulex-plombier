'use client';
import {useState} from 'react';
import Link from 'next/link';
import {MapPin} from 'lucide-react';
import {href,type BulexLocale} from '@/config/bulex/routes';
export default function AreaList({locale,cities}:{locale:BulexLocale;cities:{slug:string;name:string;postal_code:string|null}[]}){const[q,setQ]=useState('');const filtered=cities.filter(c=>`${c.name} ${c.postal_code||''}`.toLowerCase().includes(q.toLowerCase()));return <><label className="bx-field" htmlFor="city-search">{locale==='nl'?'Zoek uw gemeente of postcode':'Find your town or postcode'}<input id="city-search" className="bx-area-search" type="search" value={q} onChange={e=>setQ(e.target.value)}/></label><div className="bx-city-grid">{filtered.map(c=><Link key={c.slug} href={href(locale,'areas',c.slug)}><MapPin size={17}/>{c.name}</Link>)}</div>{filtered.length===0&&<p role="status">{locale==='nl'?'Geen gemeente gevonden. Neem contact op om uw adres te bespreken.':'No town found. Contact us to discuss your address.'}</p>}</>}
