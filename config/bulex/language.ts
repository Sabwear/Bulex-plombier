import type {BulexLocale} from './routes';
export const localeCookie = 'BULEX_LOCALE';

// An explicit choice wins; unsupported browser languages fall back to English.
export function preferredLocale(acceptLanguage:string|null, saved?:string):BulexLocale {
 if(saved==='en'||saved==='nl')return saved;
 const preferences=(acceptLanguage||'').split(',').map((entry,index)=>{
  const [tag,...params]=entry.trim().toLowerCase().split(';');
  const quality=params.find(p=>p.trim().startsWith('q='));
  const q=quality?Number(quality.trim().slice(2)):1;
  return {language:tag.split('-')[0],q,index};
 }).filter(p=>Number.isFinite(p.q)&&p.q>0&&p.q<=1).sort((a,b)=>b.q-a.q||a.index-b.index);
 return preferences.find(p=>p.language==='nl'||p.language==='en')?.language as BulexLocale||'en';
}
