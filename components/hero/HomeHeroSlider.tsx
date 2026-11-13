'use client';

import type { PointerEvent as ReactPointerEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Users,
  CalendarClock,
} from 'lucide-react';
import type { Locale } from '@/config/locale-routes';
import { HOME_HERO_SLIDES } from '@/config/home-hero-slides';

type HomeHeroSliderProps = {
  lang: Locale;
};

const AUTOPLAY_DELAY_MS = 9000;
const SWIPE_THRESHOLD_PX = 45;

export default function HomeHeroSlider({ lang }: HomeHeroSliderProps) {
  const slides = HOME_HERO_SLIDES[lang];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const pointerStartX = useRef<number | null>(null);
  const pointerDeltaX = useRef(0);

  const telLinkProps = (href: string) =>
    href.startsWith('tel:')
      ? { target: '_blank', rel: 'noreferrer' }
      : {};

  const stopAutoplayAfterInteraction = () => {
    setIsAutoplayPaused(true);
  };

  const goToSlide = (targetIndex: number) => {
    setCurrentIndex((targetIndex + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isAutoplayPaused) return;

    const intervalId = window.setInterval(() => {
      goToNext();
    }, AUTOPLAY_DELAY_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isAutoplayPaused, slides.length]);

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    pointerStartX.current = event.clientX;
    pointerDeltaX.current = 0;
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (pointerStartX.current === null) return;
    pointerDeltaX.current = event.clientX - pointerStartX.current;
  };

  const onPointerUp = () => {
    if (pointerStartX.current === null) return;

    if (Math.abs(pointerDeltaX.current) >= SWIPE_THRESHOLD_PX && slides.length > 1) {
      stopAutoplayAfterInteraction();
      if (pointerDeltaX.current < 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    pointerStartX.current = null;
    pointerDeltaX.current = 0;
  };

  return (
    <section
      className="hero-section relative isolate overflow-hidden min-h-screen"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        className="flex transition-transform duration-1000 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, slideIndex) => (
          <article
            key={slide.id}
            className="relative w-full min-w-full min-h-screen"
            aria-hidden={slideIndex !== currentIndex}
          >
            <Image
              src={slide.image.src}
              alt={slide.image.alt}
              fill
              priority={slideIndex === 0}
              sizes="100vw"
              quality={95}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />

            <div className="container relative z-10 flex h-full items-center justify-center px-4 py-16 sm:py-20 md:py-24">
              <div className="mx-auto w-full max-w-4xl text-center">
                <span className="inline-flex items-center justify-center rounded-full bg-[#00adab]/25 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ffffff] ring-1 ring-white/40 sm:text-xs">
                  {slide.eyebrow}
                </span>

                {slideIndex === 0 ? (
                  <h1 className="mt-4 text-2xl font-bold leading-snug text-[#ffffff] sm:text-3xl md:text-4xl">
                    {slide.title}
                  </h1>
                ) : (
                  <h2 className="mt-4 text-2xl font-bold leading-snug text-[#ffffff] sm:text-3xl md:text-4xl">
                    {slide.title}
                  </h2>
                )}
                <p className="mt-3 flex w-full flex-wrap items-center justify-center text-center text-sm leading-relaxed text-white sm:text-base md:text-lg">
                  {slide.subtitle}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                  <Link
                    href={slide.primaryCta.href}
                    {...telLinkProps(slide.primaryCta.href)}
                    className="btn btn-primary rounded-full bg-[#00adab] px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-[#009190]"
                  >
                    {slide.primaryCta.label}
                  </Link>
                  <Link
                    href={slide.secondaryCta.href}
                    {...telLinkProps(slide.secondaryCta.href)}
                    className="btn rounded-full border border-white/50 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20"
                  >
                    {slide.secondaryCta.label}
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Animated trust banner: all 9 items in a smooth looping marquee */}
      <div className="group absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t border-white/10 bg-[#00adab] py-3">
        <div className="flex w-max animate-hero-trust-marquee items-center gap-6 sm:gap-10 text-[11px] font-medium uppercase tracking-[0.12em] text-white/95 sm:text-xs motion-reduce:animate-none group-hover:[animation-play-state:paused]">
          {[
            ...slides.flatMap((s) => s.trustLineItems),
            ...slides.flatMap((s) => s.trustLineItems),
          ].map((label, i) => {
            const icons = [Users, CalendarClock, ShieldCheck];
            const Icon = icons[i % 3];
            return (
              <span
                key={i}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap"
              >
                <Icon size={14} className="opacity-90" aria-hidden />
                {label}
                <span className="mx-3 text-white/40" aria-hidden>•</span>
              </span>
            );
          })}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => {
              stopAutoplayAfterInteraction();
              goToPrevious();
            }}
            aria-label={lang === 'fr' ? 'Slide précédente' : 'Vorige slide'}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-slate-900/70 p-2 text-slate-100 shadow-sm transition hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 md:left-5 md:p-3"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={() => {
              stopAutoplayAfterInteraction();
              goToNext();
            }}
            aria-label={lang === 'fr' ? 'Slide suivante' : 'Volgende slide'}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-slate-900/70 p-2 text-slate-100 shadow-sm transition hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 md:right-5 md:p-3"
          >
            <ChevronRight size={22} />
          </button>

          <div className="pointer-events-none absolute inset-x-0 bottom-14 z-20 flex justify-center">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-slate-600/60 bg-[rgba(255,255,255,0.12)] px-3 py-2 shadow-sm backdrop-blur-sm">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => {
                    stopAutoplayAfterInteraction();
                    goToSlide(index);
                  }}
                  aria-label={
                    lang === 'fr'
                      ? `Aller au slide ${index + 1}`
                      : `Ga naar slide ${index + 1}`
                  }
                  aria-current={index === currentIndex}
                  className={`h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-7 bg-emerald-500'
                      : 'w-2.5 bg-slate-500 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
