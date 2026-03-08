import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Phone, Calendar, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/config/navigation';
import { HeroTrustCards } from './HeroTrustCards';

interface HeroSectionProps {
  lang: 'fr' | 'nl';
}

const content = {
  fr: {
    badge: 'Partenaire certifié Vaillant Belgique',
    h1: 'Plombier Vaillant à Bruxelles — Intervention rapide et qualifiée',
    sub: 'Votre spécialiste certifié Vaillant à Bruxelles. Réparations, installations et dépannages réalisés par des techniciens qualifiés dans toute la région.',
    cta1: 'Demander un devis',
    cta2: 'Appeler maintenant',
    cta1Href: '/contact',
    cta2Href: SITE_CONFIG.phone.href,
    sigil: '20+ techniciens certifiés · Disponible 6j/7',
  },
  nl: {
    badge: 'Gecertificeerde Vaillant partner België',
    h1: 'Vaillant loodgieter in Brussel — Snelle en gekwalificeerde interventie',
    sub: 'Uw gecertificeerd Vaillant specialist in Brussel. Herstellingen, installaties en spoedinterventies door gekwalificeerde technici in de hele regio.',
    cta1: 'Offerte aanvragen',
    cta2: 'Bel ons nu',
    cta1Href: '/nl/contact',
    cta2Href: SITE_CONFIG.phone.href,
    sigil: '20+ gecertificeerde technici · Beschikbaar 6d/7',
  },
};

export function HeroSection({ lang }: HeroSectionProps) {
  const c = content[lang];

  return (
    <section
      className="relative w-full overflow-hidden bg-gray-950"
      aria-label="Hero"
    >
      {/* ── Background Image ── */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/images/slider-vaillant-1.png')",
          backgroundPosition: 'center 30%',
        }}
        aria-hidden="true"
      />

      {/* ── Unified Overlay ── */}
      <div
        className="absolute inset-0 bg-gray-900/75"
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 xl:px-12 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* LEFT — main content */}
          <div className="w-full max-w-[620px]">

            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/30 mb-6">
              <CheckCircle2 size={13} className="text-primary shrink-0" style={{ color: '#4dd9c8' }} />
              <span className="text-[12px] font-bold uppercase tracking-widest text-white/90" style={{ color: '#a8f0e8' }}>
                {c.badge}
              </span>
            </div>

            {/* H1 */}
            <h1
              className="text-white font-bold leading-tight mb-5"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                letterSpacing: '-0.02em',
                lineHeight: '1.18',
                maxWidth: '18ch',
                textShadow: '0 2px 12px rgba(0,0,0,0.35)',
              }}
            >
              {c.h1}
            </h1>

            {/* Supporting paragraph */}
            <p
              className="mb-8 text-gray-200 leading-relaxed"
              style={{
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                maxWidth: '52ch',
                lineHeight: '1.7',
              }}
            >
              {c.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Link
                href={c.cta1Href}
                className="
                  inline-flex items-center gap-2
                  bg-primary hover:bg-primary-hover
                  text-white font-semibold
                  px-7 py-3.5 rounded-full
                  transition-all duration-200
                  shadow-lg hover:shadow-xl hover:-translate-y-0.5
                  text-[15px]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary
                "
              >
                <Calendar size={16} className="shrink-0" />
                {c.cta1}
              </Link>
              <a
                href={c.cta2Href}
                className="
                  inline-flex items-center gap-2
                  bg-white/12 hover:bg-white/20
                  border border-white/25 hover:border-white/45
                  text-white font-semibold
                  px-7 py-3.5 rounded-full
                  transition-all duration-200
                  text-[15px] backdrop-blur-sm
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/60
                "
              >
                <Phone size={15} className="shrink-0" />
                {c.cta2}
              </a>
            </div>

            {/* Trust sigil */}
            <p className="flex items-center gap-2 text-[12.5px] text-white/55">
              <CheckCircle2 size={13} className="shrink-0" style={{ color: '#4dd9c8', opacity: 0.8 }} />
              {c.sigil}
            </p>
          </div>

          {/* RIGHT — trust cards */}
          <div className="hidden lg:flex justify-end w-full lg:w-auto">
            <HeroTrustCards lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}
