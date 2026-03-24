import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
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
