import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { getBlogPostBySlug, getBlogPosts, type BlogPost } from '@/data/types';
import styles from '../blog.module.css';
import { buildLocaleAlternates } from '@/lib/seoAlternates';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const content = post.languages.fr;
  const baseUrl = 'https://vaillant-loodgieter.com';
  const pathname = `/fr/blog/${post.slug}`;

  return {
    title: `${content.title} | Blog vaillant Plombier`,
    description: content.excerpt,
    alternates: buildLocaleAlternates(pathname),
    openGraph: {
      title: content.title,
      description: content.excerpt,
      url: `${baseUrl}${pathname}`,
      type: 'article',
      publishedTime: content.date,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const content = post.languages.fr;
  const allPosts = getBlogPosts();
  const relatedPosts = allPosts.filter((p) => post.related_slugs.includes(p.slug));

  // Extract headings for TOC (simple regex for markdown H3)
  const headings = content.content
    .split('\n')
    .filter(line => line.startsWith('### '))
    .map(line => line.replace('### ', '').trim());

  return (
    <div className={styles.blogContainer}>
      <article>
        {/* Header */}
        <header className={styles.blogHeader}>
          <div className={styles.categoryBadge}>{post.categories[0]}</div>
          <h1 className={styles.blogTitle}>{content.title}</h1>
          <div className={styles.blogMeta}>
            <div className={styles.metaItem}>
              <span>📅</span> {new Date(content.date).toLocaleDateString('fr-BE', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <div className={styles.metaItem}>
              <span>👤</span> {post.author.name}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className={styles.featuredImageWrapper}>
          <Image
            src={post.image}
            alt={content.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* TOC */}
        {headings.length > 0 && (
          <div className={styles.toc}>
            <h4>Table des matières</h4>
            <ul>
              {headings.map((h, i) => (
                <li key={i}>
                  <a href={`#section-${i}`}>{h}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Content */}
        <div className={styles.articleContent}>
          <ReactMarkdown
            components={{
              h3: ({ children }) => {
                const text = String(children);
                const id = `section-${headings.indexOf(text)}`;
                return <h3 id={id}>{children}</h3>;
              }
            }}
          >
            {content.content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        <div className={styles.tags}>
          {post.tags.map(tag => (
            <span key={tag} className={styles.tag}>#{tag}</span>
          ))}
        </div>

        {/* Author Box */}
        <div className={styles.authorBox}>
          <div className={styles.authorAvatar}>
            <Image src={post.author.avatar} alt={post.author.name} width={80} height={80} />
          </div>
          <div className={styles.authorBio}>
            <h4>À propos de {post.author.name}</h4>
            <p>{post.author.bio}</p>
          </div>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className={styles.relatedPosts}>
            <h2 className="section-title">Articles similaires</h2>
            <div className={styles.relatedGrid}>
              {relatedPosts.map(rp => (
                <Link key={rp.slug} href={`/fr/blog/${rp.slug}`} className={styles.blogCard}>
                  <div className={styles.cardImage}>
                    <Image src={rp.image} alt={rp.languages.fr.title} fill className="object-cover" />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{rp.languages.fr.title}</h3>
                    <p className={styles.cardExcerpt}>{rp.languages.fr.excerpt}</p>
                    <span className={styles.cardLink}>Lire la suite →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        {/* Categories Widget */}
        <div className={styles.sidebarWidget}>
          <h4 className={styles.widgetTitle}>Catégories</h4>
          <ul className="list-unstyled">
            {Array.from(new Set(allPosts.flatMap(p => p.categories))).map(cat => (
              <li key={cat} style={{ marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--color-primary)', marginRight: '0.5rem' }}>•</span>
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Widget */}
        <div className={`${styles.sidebarWidget} ${styles.sidebarCta}`}>
          <h3>Besoin d&apos;une intervention ?</h3>
          <p>Nos experts certifiés Vaillant interviennent en moins de 60 minutes à Bruxelles.</p>
          <Link href="/fr/contact" className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>
            Contactez-nous
          </Link>
        </div>

        {/* Latest Posts Widget */}
        <div className={styles.sidebarWidget}>
          <h4 className={styles.widgetTitle}>Derniers articles</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {allPosts.slice(0, 3).map(lp => (
              <Link key={lp.slug} href={`/fr/blog/${lp.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{lp.languages.fr.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {new Date(lp.languages.fr.date).toLocaleDateString('fr-BE')}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
