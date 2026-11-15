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
export function formatPublicPhone(raw:string|undefined){const digits=normalizePhoneDigits(raw);if(/^324\d{8}$/.test(digits)){return ('0'+digits.slice(2)).match(/.{2}/g)!.join(' ')}return digits?'+'+digits:''}
export function getPublicPhoneDisplay(){return formatPublicPhone(process.env.NEXT_PUBLIC_PHONE_NUMBER)}
export function getPublicPhoneTelHref(){const digits=getPublicPhoneE164Digits();return digits?'tel:+'+digits:''}
export function getWhatsAppE164Digits(){return normalizePhoneDigits(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)}
