import {headers} from 'next/headers';
import {isBulex} from '@/config/bulex/brand';
import Header from '@/components/bulex/Header';
import {Footer} from '@/components/bulex/Shared';
import '@/components/bulex/bulex.css';
import Link from "next/link";
import styles from "./not-found.module.css";

export default async function NotFound() {
  if (isBulex) {
    const locale = (await headers()).get('x-bulex-locale')==='nl'?'nl':'en';
    return <div className="bulex-site"><Header locale={locale}/><main id="main-content" className="bx-not-found"><span className="bx-eyebrow">404</span><h1>{locale==='nl'?'Pagina niet gevonden':'Page not found'}</h1><p>{locale==='nl'?'Deze pagina bestaat niet of is verplaatst.':'This page does not exist or has moved.'}</p><Link href={`/${locale}`} className="bx-button">{locale==='nl'?'Terug naar home':'Back to home'}</Link></main><Footer locale={locale}/></div>;
  }
  return (
    <main className={styles.wrapper}>
      <section className={styles.card}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Page introuvable / Pagina niet gevonden</h1>
        <p className={styles.description}>
          Le lien est peut-etre incorrect ou la page a ete deplacee. Deze pagina bestaat
          niet meer of de URL is verkeerd.
        </p>

        <div className={styles.actions}>
          <Link href="/fr" className={`${styles.button} ${styles.primary}`}>
            Retour accueil (FR)
          </Link>
          <Link href="/nl" className={`${styles.button} ${styles.secondary}`}>
            Terug naar home (NL)
          </Link>
        </div>

        <p className={styles.hint}>
          Vous pouvez aussi consulter nos articles via /fr/blog ou /nl/blog.
        </p>
      </section>
    </main>
  );
}
