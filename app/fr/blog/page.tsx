import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts } from '@/data/types';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'Conseils & Expertise Plomberie Vaillant | Blog vaillant Plombier',
  description: 'Retrouvez tous nos conseils d\'experts, guides d\'entretien et solutions de dépannage pour votre installation Vaillant à Bruxelles.',
  alternates: {
    canonical: 'https://vaillant-loodgieter.be/conseils',
  },
};

export default function BlogArchivePage() {
  const posts = getBlogPosts();

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <header className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span className="badge badge-green">Blog & Conseils</span>
        <h1>Conseils & Expertises Vaillant</h1>
        <div className="divider" style={{ margin: '1.5rem auto' }} />
        <p style={{ maxWidth: '700px', margin: '0 auto' }}>
          Explorez nos articles pour mieux comprendre, entretenir et optimiser votre système de chauffage et de plomberie.
        </p>
      </header>

      <div className="grid-3-strict">
        {posts.map((post) => (
          <Link key={post.slug} href={`/conseils/${post.slug}`} className={styles.blogCard}>
            <div className={styles.cardImage}>
              <Image
                src={post.image}
                alt={post.languages.fr.title}
                fill
                className="object-cover"
              />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardDate}>
                {new Date(post.languages.fr.date).toLocaleDateString('fr-BE', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <h3 className={styles.cardTitle}>{post.languages.fr.title}</h3>
              <p className={styles.cardExcerpt}>{post.languages.fr.excerpt}</p>
              <span className={styles.cardLink}>Lire la suite →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
