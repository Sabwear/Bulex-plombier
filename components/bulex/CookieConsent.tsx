'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {href,type BulexLocale} from '@/config/bulex/routes';
import {CONSENT_KEY,readConsentChoice,persistConsentChoice,denyMarketingForSession} from '@/config/bulex/consent';

export default function CookieConsent({locale}:{locale:BulexLocale}) {
 const nl=locale==='nl',dialog=useRef<HTMLDialogElement>(null);
 const [marketing,setMarketing]=useState(false);
 const [banner,setBanner]=useState(false),[details,setDetails]=useState(false),[storageError,setStorageError]=useState(false);
 useEffect(()=>{
  const sync=()=>{const choice=readConsentChoice();setBanner(!choice);setMarketing(choice?.marketing===true)};
  const reopen=()=>{setMarketing(readConsentChoice()?.marketing===true);setDetails(true);dialog.current?.showModal()};
  const storage=(event:StorageEvent)=>{if(event.key===CONSENT_KEY||event.key===null)sync()};
  sync();window.addEventListener('bulex-open-cookie-settings',reopen);window.addEventListener('storage',storage);
  return()=>{window.removeEventListener('bulex-open-cookie-settings',reopen);window.removeEventListener('storage',storage)};
 },[]);
 function save(allowMarketing:boolean) {
  const result=persistConsentChoice(allowMarketing);
  denyMarketingForSession(!result.persisted);setMarketing(result.choice.marketing);setStorageError(!result.persisted);
  setBanner(false);dialog.current?.close();window.dispatchEvent(new Event('bulex-consent-changed'));
 }
 function open(){setDetails(true);dialog.current?.showModal()}
 return <>
  {banner&&<aside className="bx-cookie-banner" aria-labelledby="bx-cookie-heading">
   <button type="button" className="bx-cookie-dismiss" aria-label={nl?'Cookiemelding sluiten en optionele cookies weigeren':'Close cookie banner and reject optional cookies'} onClick={()=>save(false)}>×</button>
   <div><h2 id="bx-cookie-heading">{nl?'Uw privacyvoorkeuren':'Your privacy choices'}</h2>
    <p>{nl?'We bewaren uw cookiekeuze. Met uw toestemming gebruiken we Google Ads om aanvragen en advertentieresultaten te meten. U kunt advertenties weigeren en het formulier blijven gebruiken.':'We remember your cookie choice. With your permission, we use Google Ads to measure enquiries and advertising results. You can reject advertising and still use the enquiry form.'} <Link href={href(locale,'cookies')}>{nl?'Cookiebeleid':'Cookie policy'}</Link> · <Link href={href(locale,'privacy')}>{nl?'Privacybeleid':'Privacy policy'}</Link></p>
   </div>
   <div className="bx-cookie-actions">
    <button type="button" onClick={()=>save(false)}>{nl?'Optionele cookies weigeren':'Reject optional cookies'}</button>
    <button type="button" onClick={()=>save(true)}>{nl?'Alles accepteren':'Accept all cookies'}</button>
    <button type="button" onClick={open}>{nl?'Voorkeuren beheren':'Manage preferences'}</button>
   </div>
  </aside>}
  <dialog ref={dialog} className="bx-cookie-dialog" aria-labelledby="bx-cookie-dialog-title" onClose={()=>setDetails(false)}>
   <h2 id="bx-cookie-dialog-title">{nl?'Cookievoorkeuren':'Cookie preferences'}</h2>
   {details&&<>
    <p>{nl?'U kunt uw keuze op elk moment hier aanpassen. De website en formulieren blijven beschikbaar wanneer u optionele cookies weigert.':'You can revisit your choice here at any time. The website and enquiry forms remain available when you reject optional cookies.'}</p>
    <label><input type="checkbox" checked disabled/>{nl?'Noodzakelijke opslag — altijd actief':'Necessary storage — always active'}</label>
    <p>{nl?'Bewaartermijn cookiekeuze: maximaal zes maanden.':'Cookie-choice retention: up to six months.'}</p>
    <label><input type="checkbox" checked={false} disabled/>{nl?'Analytics — niet geïnstalleerd':'Analytics — not installed'}</label>
    <label><input type="checkbox" checked={marketing} onChange={event=>setMarketing(event.target.checked)}/>{nl?'Google Ads — aanvragen en advertentieresultaten meten':'Google Ads — measure enquiries and advertising results'}</label>
    <p>{nl?'Google Ads wordt alleen geladen na uw toestemming. Google kan apparaat-, browser- en advertentiegegevens verwerken.':'Google Ads loads only after your consent. Google may process device, browser and advertising-interaction data.'}</p>
    {storageError&&<p className="bx-cookie-storage" role="status">{nl?'Uw browser bewaart de keuze niet. Optionele tracking blijft uit.':'Your browser could not save your choice. Optional tracking remains off.'}</p>}
    <div className="bx-cookie-actions">
     <button type="button" onClick={()=>save(false)}>{nl?'Optionele toestemming intrekken':'Withdraw optional consent'}</button>
     <button type="button" onClick={()=>save(marketing)}>{nl?'Voorkeuren opslaan':'Save preferences'}</button>
     <button type="button" onClick={()=>dialog.current?.close()}>{nl?'Sluiten':'Close'}</button>
    </div>
   </>}
  </dialog>
 </>;
}
