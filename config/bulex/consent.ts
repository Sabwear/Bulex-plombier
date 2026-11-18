export const CONSENT_KEY='bulex-cookie-choice';
export const CONSENT_VERSION=2;
export const CONSENT_MAX_AGE=183*24*60*60*1000;
export type CookieChoice={version:number;necessary:true;analytics:boolean;marketing:boolean;updatedAt:number};
export function parseConsent(value:string|null,now=Date.now()):CookieChoice|null{
 try{const c=JSON.parse(value||'null');return c&&c.version===CONSENT_VERSION&&c.necessary===true&&typeof c.analytics==='boolean'&&typeof c.marketing==='boolean'&&typeof c.updatedAt==='number'&&now>=c.updatedAt&&now-c.updatedAt<CONSENT_MAX_AGE?c:null}catch{return null}
}
let runtimeMarketingDenied=false;
let temporaryChoice:CookieChoice|null=null;
export function denyMarketingForSession(denied:boolean){runtimeMarketingDenied=denied;}
function cookieChoice(){
 if(typeof document==='undefined')return null;
 try{const value=(document.cookie||'').split(';').map(part=>part.trim()).find(part=>part.startsWith(CONSENT_KEY+'='))?.slice(CONSENT_KEY.length+1);return value?parseConsent(decodeURIComponent(value)):null}catch{return null}
}
export function readConsentChoice():CookieChoice|null{
 let stored:CookieChoice|null=null;
 try{stored=parseConsent(localStorage.getItem(CONSENT_KEY))}catch{}
 const cookie=cookieChoice();
 const temporary=temporaryChoice?parseConsent(JSON.stringify(temporaryChoice)):null;
 if(temporary&&temporary.updatedAt>=Math.max(stored?.updatedAt||0,cookie?.updatedAt||0))return temporary;
 if(stored||cookie)return stored&&(!cookie||stored.updatedAt>=cookie.updatedAt)?stored:cookie;
 return temporary;
}
export function persistConsentChoice(marketing:boolean){
 const choice:CookieChoice={version:CONSENT_VERSION,necessary:true,analytics:false,marketing,updatedAt:Date.now()};
 let persisted=false;
 try{localStorage.setItem(CONSENT_KEY,JSON.stringify(choice));persisted=localStorage.getItem(CONSENT_KEY)===JSON.stringify(choice)}catch{}
 try{document.cookie=`${CONSENT_KEY}=${encodeURIComponent(JSON.stringify(choice))}; Path=/; Max-Age=${Math.floor(CONSENT_MAX_AGE/1000)}; SameSite=Lax${location.protocol==='https:'?'; Secure':''}`;const saved=cookieChoice();persisted=Boolean(saved&&saved.updatedAt===choice.updatedAt&&saved.marketing===choice.marketing&&saved.analytics===false)||persisted}catch{}
 temporaryChoice=persisted?null:{...choice,marketing:false};
 return {choice:persisted?choice:temporaryChoice!,persisted};
}
export function hasMarketingConsent(){return !runtimeMarketingDenied&&typeof window!=='undefined'&&readConsentChoice()?.marketing===true}
