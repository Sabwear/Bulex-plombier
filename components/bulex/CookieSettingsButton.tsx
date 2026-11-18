'use client';
import type {BulexLocale} from '@/config/bulex/routes';
export default function CookieSettingsButton({locale}:{locale:BulexLocale}){
 return <button type="button" className="bx-cookie-policy-settings" onClick={()=>window.dispatchEvent(new Event('bulex-open-cookie-settings'))}>{locale==='nl'?'Cookie-instellingen':'Cookie settings'}</button>;
}
