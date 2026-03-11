'use client';

import type { PointerEvent as ReactPointerEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Timer,
  Wrench,
  Users,
  CalendarClock,
} from 'lucide-react';
import type { Locale } from '@/config/locale-routes';
import { HOME_HERO_SLIDES } from '@/config/home-hero-slides';

type HomeHeroSliderProps = {
  lang: Locale;
};

const AUTOPLAY_DELAY_MS = 5600;
const SWIPE_THRESHOLD_PX = 45;

export default function HomeHeroSlider({ lang }: HomeHeroSliderProps) {
  const slides = HOME_HERO_SLIDES[lang];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const pointerStartX = useRef<number | null>(null);
  const pointerDeltaX = useRef(0);

  const trustIcons = useMemo(
    () => [ShieldCheck, Timer, Wrench] as const,
    [],
  );

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

    if (Math.abs(pointerDeltaX.current) >= SWIPE_THRESHOLD_PX) {
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
      className="hero-section relative isolate overflow-hidden"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="absolute inset-0 bg-white/10" aria-hidden="true" />

      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, slideIndex) => (
          <article
            key={slide.id}
            className="relative min-h-[560px] w-full min-w-full md:min-h-[620px] lg:min-h-[680px]"
            aria-hidden={slideIndex !== currentIndex}
          >
            <Image
              src={slide.image.src}
              alt={slide.image.alt}
              fill
              priority={slideIndex === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/82 to-white/62" />

            <div className="container relative z-10 flex h-full items-center py-20 md:py-24">
              <div className="grid w-full gap-8 md:gap-10 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-7">
                  <span className="badge badge-green shadow-sm">
                    {slide.eyebrow}
                  </span>

                  <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
                    {slide.title}
                  </h1>

                  <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-700 md:text-lg">
                    {slide.subtitle}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
                    <Link
                      href={slide.primaryCta.href}
                      className="btn btn-primary shadow-md shadow-emerald-900/10"
                    >
                      {slide.primaryCta.label}
                    </Link>
                    <Link
                      href={slide.secondaryCta.href}
                      className="btn btn-outline border-slate-300 bg-white/80 backdrop-blur-sm"
                    >
                      {slide.secondaryCta.label}
                    </Link>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-700 sm:text-sm">
                    <span className="inline-flex items-center gap-1.5">
                      <Users size={14} />
                      {slide.trustLineItems[0]}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarClock size={14} />
                      {slide.trustLineItems[1]}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="grid gap-3 sm:gap-4">
                    {slide.trustCards.map((card, pointIndex) => {
                      const Icon = trustIcons[pointIndex];
                      return (
                        <div
                          key={card.title}
                          className="group rounded-2xl border border-white/70 bg-gradient-to-br from-white/95 to-emerald-50/55 p-4 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200 transition-colors group-hover:bg-emerald-600 group-hover:text-white group-hover:ring-emerald-600">
                              <Icon size={20} />
                            </div>
                            <div>
                              <p className="max-w-none text-sm font-semibold text-slate-900 sm:text-base">
                                {card.title}
                              </p>
                              <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                                {card.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          stopAutoplayAfterInteraction();
          goToPrevious();
        }}
        aria-label={lang === 'fr' ? 'Slide précédente' : 'Vorige slide'}
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-gray-200 bg-white/90 p-2 text-slate-700 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/40 md:left-5 md:p-3"
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
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-gray-200 bg-white/90 p-2 text-slate-700 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/40 md:right-5 md:p-3"
      >
        <ChevronRight size={22} />
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm">
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
                  ? 'w-7 bg-emerald-600'
                  : 'w-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
