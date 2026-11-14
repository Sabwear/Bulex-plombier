'use client';
import Image from 'next/image';
import {getWhatsAppE164Digits} from '@/config/public-phone';
import {trackWhatsAppClickConversion} from '@/lib/gtagConversions';
import type {BulexLocale} from '@/config/bulex/routes';
import styles from './WhatsAppWidget.module.css';

export default function WhatsAppWidget({locale='en'}:{locale?:BulexLocale}){
 const digits=getWhatsAppE164Digits();
 if(!digits)return null;
 const help=locale==='nl'?'Kunnen we u helpen?':'Do you need help?';
 return <aside className={styles.widget} aria-label={locale==='nl'?'Contact via WhatsApp':'Contact via WhatsApp'}>
 <a className={styles.button} href={'https://wa.me/'+digits} target="_blank" rel="noopener noreferrer" aria-label={locale==='nl'?'Hulp nodig? Contacteer Bulex Plombier via WhatsApp':'Need help? Contact Bulex Plombier on WhatsApp'} onClick={trackWhatsAppClickConversion}>
 <span className={styles.label}><strong>{help}</strong><span>{locale==='nl'?'Stuur ons een bericht':'Send us a message'}</span></span>
 <span className={styles.icon}><Image src="/icons/plumbing-elements/whatsapp.svg" alt="" width={29} height={29}/></span>
 </a>
 </aside>;
}
