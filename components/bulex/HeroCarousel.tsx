'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { copy } from '@/config/bulex/content';
import type { BulexLocale } from '@/config/bulex/routes';
import { Actions } from './Shared';

export default function HeroCarousel({ locale }: { locale: BulexLocale }) {
  const t = copy[locale];
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [visible, setVisible] = useState(true);
  const slides = [
    { title: t.heroTitle, subtitle: t.heroSub, text: t.heroText, image: '/bulex/hero-consultation.webp', alt: locale === 'en' ? 'A technician discussing home heating with a homeowner' : 'Een technieker bespreekt de verwarming met een bewoner' },
    { title: locale === 'en' ? 'Comfort, cared for.' : 'Zorg voor uw comfort.', subtitle: locale === 'en' ? 'Expert care for your Bulex heating' : 'Deskundige zorg voor uw Bulex-verwarming', text: locale === 'en' ? 'From a boiler repair to regular maintenance, we help you take care of the heating your home relies on.' : 'Van een ketelherstelling tot regelmatig onderhoud: wij helpen u zorgen voor de verwarming waarop uw woning vertrouwt.', image: '/bulex/hero-service.webp', alt: locale === 'en' ? 'Professional advice beside a Bulex boiler' : 'Professioneel advies bij een Bulex-ketel' },
    { title: locale === 'en' ? 'Make yourself at home.' : 'Voel u helemaal thuis.', subtitle: locale === 'en' ? 'The right warmth. For your way of life.' : 'De juiste warmte voor uw dagelijks leven.', text: locale === 'en' ? 'Discover boilers, heat pumps and hot-water solutions selected around your home and the people in it.' : 'Ontdek ketels, warmtepompen en warmwateroplossingen afgestemd op uw woning en uw gezin.', image: '/bulex/hero-comfort.webp', alt: locale === 'en' ? 'Relaxing in a comfortably heated home' : 'Ontspannen in een comfortabel verwarmde woning' },
  ];
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    const visibility = () => setVisible(!document.hidden);
    update(); visibility();
    media.addEventListener('change', update);
    document.addEventListener('visibilitychange', visibility);
    return () => { media.removeEventListener('change', update); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  useEffect(() => {
    if (hovered || focused || reducedMotion || !visible) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % 3), 6500);
    return () => window.clearInterval(timer);
  }, [hovered, focused, reducedMotion, visible]);
  function select(index: number) { setActive((index + 3) % 3); }
  return <section className="bx-hero bx-carousel" aria-roledescription="carousel" aria-label={locale === 'en' ? 'Heating and plumbing services' : 'Verwarming en loodgieterij'} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="bx-hero-photo" aria-hidden="true">{slides.map((slide, index) => <div key={slide.image} className={`bx-slide-image ${index === active ? 'is-active' : ''}`}><Image src={slide.image} alt="" fill priority={index === 0} fetchPriority={index === 0 ? 'high' : undefined} loading={index ? 'eager' : undefined} sizes="(max-width: 700px) 100vw, 60vw" /></div>)}</div>
    <div className="bx-container bx-hero-container"><div className="bx-hero-copy">
      <span className="bx-eyebrow">{t.partner} · {t.belgium}</span>
      <h1 className="bx-sr-only">{t.heroTitle} {t.heroSub}</h1>
      <div className="bx-slide-copy-stack" aria-live={focused ? 'polite' : 'off'}>{slides.map((slide, index) => <div key={slide.title} className={`bx-slide-copy ${index === active ? 'is-active' : ''}`} aria-hidden={index !== active} role="group" aria-roledescription="slide" aria-label={`${index + 1} / 3`}>
        <p className="bx-slide-title">{slide.title}</p><h2>{slide.subtitle}</h2><p>{slide.text}</p>
      </div>)}</div>
      <Actions locale={locale} light />
      <div className="bx-trust">{t.trust.map(label => <span key={label}><Check size={15}/>{label}</span>)}</div>
      <div className="bx-carousel-controls"><button type="button" onClick={() => select(active - 1)} aria-label={locale === 'en' ? 'Previous slide' : 'Vorige dia'}><ChevronLeft size={17}/></button>
        {slides.map((slide, index) => <button key={slide.title} type="button" className="bx-slide-dot" aria-label={`${locale === 'en' ? 'Show slide' : 'Toon dia'} ${index + 1}: ${slide.title}`} aria-current={index === active ? 'true' : undefined} onClick={() => select(index)}><span/></button>)}
        <button type="button" onClick={() => select(active + 1)} aria-label={locale === 'en' ? 'Next slide' : 'Volgende dia'}><ChevronRight size={17}/></button>
      </div>
    </div></div>
  </section>;
}
