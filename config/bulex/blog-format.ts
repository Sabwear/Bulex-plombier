import type {BulexLocale} from './routes';
import type {BlogPost} from './blog';
export const blogCategoryLabels={
 en:{faults:'Faults & repairs',maintenance:'Maintenance',equipment:'Models & equipment','hot-water':'Hot water',heating:'Heating',plumbing:'Plumbing'},
 nl:{faults:'Storingen & herstelling',maintenance:'Onderhoud',equipment:'Modellen & toestellen','hot-water':'Warm water',heating:'Verwarming',plumbing:'Sanitair'}
};
export function blogDate(value:string,locale:BulexLocale){return new Intl.DateTimeFormat(locale==='nl'?'nl-BE':'en-GB',{timeZone:'Europe/Brussels',day:'numeric',month:'long',year:'numeric'}).format(new Date(value))}
export function blogReadTime(post:BlogPost,locale:BulexLocale){return Math.max(2,Math.ceil((post.answer[locale]+' '+post.sections.map(s=>s.body[locale]).join(' ')).split(/\s+/).length/180))}
