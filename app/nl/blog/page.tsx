import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts } from '@/data/types';
import styles from '@/app/fr/blog/blog.module.css';
import { buildLocaleAlternates } from '@/lib/seoAlternates';

export const metadata: Metadata = {
  title: 'Advies & Expertise Loodgieterij Vaillant | Blog vaillant Loodgieter',
  description: 'Vind al ons deskundig advies, onderhoudsgidsen en reparatieoplossingen voor uw Vaillant-installatie in Brussel.',
  alternates: buildLocaleAlternates('/nl/blog'),
};

export default function BlogArchivePage() {
  const posts = getBlogPosts();

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <header className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span className="badge badge-green">Blog & Advies</span>
        <h1>Vaillant Advies & Expertise</h1>
        <div className="divider" style={{ margin: '1.5rem auto' }} />
        <p style={{ maxWidth: '700px', margin: '0 auto' }}>
          Ontdek onze artikelen om uw verwarmings- en loodgietersysteem beter te begrijpen, te onderhouden en te optimaliseren.
        </p>
      </header>

      <div className="grid-3-strict">
        {posts.map((post) => (
          <Link key={post.slug} href={`/nl/blog/${post.slug}`} className={styles.blogCard}>
            <div className={styles.cardImage}>
              <Image
                src={post.image}
                alt={post.languages.nl.title}
                fill
                className="object-cover"
              />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardDate}>
                {new Date(post.languages.nl.date).toLocaleDateString('nl-BE', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <h3 className={styles.cardTitle}>{post.languages.nl.title}</h3>
              <p className={styles.cardExcerpt}>{post.languages.nl.excerpt}</p>
              <span className={styles.cardLink}>Lees meer →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
