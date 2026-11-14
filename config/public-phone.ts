/** Public contact numbers are configured once in .env; no business numbers are hardcoded. */
export function normalizePhoneDigits(raw:string|undefined):string{
 const value=raw?.trim()||'';
 let digits=value.replace(/\D/g,'');
 if(!digits)return '';
 if(value.startsWith('00'))digits=digits.slice(2);
 else if(!value.startsWith('+')&&digits.startsWith('0'))digits='32'+digits.slice(1);
 return /^\d{8,15}$/.test(digits)?digits:'';
}
export function getPublicPhoneE164Digits(){return normalizePhoneDigits(process.env.NEXT_PUBLIC_PHONE_NUMBER)}
export function getPublicPhoneDisplay(){const digits=getPublicPhoneE164Digits();return digits?'+'+digits:''}
export function getPublicPhoneTelHref(){const digits=getPublicPhoneE164Digits();return digits?'tel:+'+digits:''}
export function getWhatsAppE164Digits(){return normalizePhoneDigits(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)}
