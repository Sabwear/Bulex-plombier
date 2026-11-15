'use client';
import {useEffect,useState} from 'react';
import {Phone} from 'lucide-react';
import {getPublicPhoneTelHref,getPublicPhoneDisplay} from '@/config/public-phone';
import type {BulexLocale} from '@/config/bulex/routes';
export default function MobileCallBar({locale}:{locale:BulexLocale}){
 const [shown,setShown]=useState(false);
 useEffect(()=>{let frame=0;const update=()=>{frame=0;const active=window.scrollY>240;setShown(active);document.documentElement.classList.toggle('bx-mobile-call-visible',active)};const scroll=()=>{if(!frame)frame=requestAnimationFrame(update)};update();window.addEventListener('scroll',scroll,{passive:true});return()=>{window.removeEventListener('scroll',scroll);cancelAnimationFrame(frame);document.documentElement.classList.remove('bx-mobile-call-visible')}},[]);
 const phone=getPublicPhoneTelHref();if(!phone)return null;
 return <div className={`bx-mobile-call-bar ${shown?'is-visible':''}`} aria-hidden={!shown}><a href={phone} tabIndex={shown?0:-1}><span className="bx-mobile-call-icon" aria-hidden="true"><Phone size={23}/></span><span className="bx-mobile-call-copy"><strong>{getPublicPhoneDisplay()}</strong></span></a></div>;
}
