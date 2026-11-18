import {hasMarketingConsent} from '@/config/bulex/consent';
export const GOOGLE_ADS_TAG_ID='AW-11417443258';
export const GOOGLE_ADS_PHONE_CONVERSION='AW-11417443258/sMZZCOKQqpscELq3ocQq';
export const GOOGLE_ADS_PHONE_NUMBER='+32467802090';
const SCRIPT_ID='bulex-google-tag';
export function syncGoogleTag(){
 if(typeof window==='undefined')return;
 const allowed=hasMarketingConsent();
 if(!allowed&&!window.gtag)return;
 if(!window.gtag){
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer!.push(arguments);};
  window.gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});
 }
 window.gtag('consent','update',{ad_storage:allowed?'granted':'denied',ad_user_data:allowed?'granted':'denied',ad_personalization:allowed?'granted':'denied',analytics_storage:'denied'});
 if(!allowed||document.getElementById(SCRIPT_ID))return;
 window.gtag('js',new Date());
 const script=document.createElement('script');script.id=SCRIPT_ID;script.async=true;
 script.src=`https://www.googletagmanager.com/gtm.js?id=${GOOGLE_ADS_TAG_ID}`;
 document.head.appendChild(script);
 window.gtag('config',GOOGLE_ADS_PHONE_CONVERSION,{phone_conversion_number:GOOGLE_ADS_PHONE_NUMBER});
}
