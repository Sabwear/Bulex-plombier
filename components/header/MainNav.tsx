"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Phone, MapPin, ArrowRight, Calendar } from 'lucide-react';
import { SITE_CONFIG, NAVIGATION } from '@/config/navigation';
import { MobileMenu } from './MobileMenu';

interface MainNavProps {
  lang: 'fr' | 'nl';
}

/* ─── Desktop Dropdown ──────────────────────────────────────── */
const DesktopDropdown = ({
  item,
  currentPath,
  lang,
}: {
  item: any;
  currentPath: string;
  lang: 'fr' | 'nl';
}) => {
  const isFr = lang === 'fr';
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const open = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };
  const close = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 160);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const isActive = currentPath.startsWith(item.href);
  const allItem = item.children[0];
  const communes = item.children.slice(1);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={open}
      onMouseLeave={close}
    >
      {/* Trigger */}
      <Link
        href={item.href}
        aria-expanded={isOpen}
        className={`
          flex items-center gap-1 px-4 py-2.5 rounded-lg text-[14.5px] font-semibold
          transition-colors duration-200 outline-none
          focus-visible:ring-2 focus-visible:ring-primary
          ${isActive ? 'text-primary' : 'text-gray-800 hover:text-primary hover:bg-gray-50'}
        `}
      >
        {item.label}
        <ChevronDown
          size={13}
          className={`transition-transform duration-300 shrink-0 ${
            isOpen ? 'rotate-180 text-primary' : 'text-gray-400'
          }`}
        />
      </Link>

      {/* Floating Panel */}
      <div
        className={`
          absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2
          transition-all duration-200 ease-out origin-top z-50
          ${isOpen
            ? 'opacity-100 visible translate-y-0 scale-100'
            : 'opacity-0 invisible -translate-y-2 scale-[0.98] pointer-events-none'}
        `}
      >
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.14)] p-5 w-[500px]">

          {/* See-all CTA */}
          <Link
            href={allItem.href}
            onClick={() => setIsOpen(false)}
            className="
              flex items-center gap-4 p-4 mb-4 rounded-xl
              bg-linear-to-r from-primary/5 to-primary/8
              border border-primary/10
              hover:from-primary/8 hover:to-primary/12
              transition-all group
            "
          >
            <div className="h-11 w-11 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform border border-primary/10">
              <MapPin size={19} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13.5px] font-bold text-gray-900 group-hover:text-primary transition-colors">
                {allItem.label}
              </div>
              <div className="text-[12px] text-gray-500 mt-0.5">
                {isFr ? 'Intervention rapide dans toutes les zones' : 'Snelle interventie in alle zones'}
              </div>
            </div>
            <div className="h-7 w-7 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:translate-x-0.5 transition-transform shrink-0">
              <ArrowRight size={13} className="text-gray-400 group-hover:text-primary transition-colors" />
            </div>
          </Link>

          {/* Divider label */}
          <p className="px-1.5 mb-2.5 text-[10.5px] font-bold uppercase tracking-widest text-gray-400">
            {isFr ? 'Communes desservies' : 'Bediende gemeenten'}
          </p>

          {/* Communes grid */}
          <div className="grid grid-cols-2 gap-0.5">
            {communes.map((sub: any) => (
              <Link
                key={sub.label}
                href={sub.href}
                onClick={() => setIsOpen(false)}
                className="
                  flex items-center gap-2 px-3 py-2 rounded-lg
                  text-[13.5px] font-medium text-gray-600
                  hover:text-primary hover:bg-primary/5
                  transition-colors group/row
                "
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover/row:bg-primary/60 transition-colors shrink-0" />
                {sub.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Nav ──────────────────────────────────────────────── */
export default function MainNav({ lang }: MainNavProps) {
  const pathname = usePathname();
  const navItems = lang === 'fr' ? NAVIGATION.fr : NAVIGATION.nl;
  const isFr = lang === 'fr';

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`
        sticky top-0 z-50 w-full transition-all duration-300 ease-in-out
        ${scrolled
          ? 'bg-white/97 backdrop-blur-md shadow-[0_2px_20px_-4px_rgba(0,0,0,0.12)] border-b border-gray-100 py-2'
          : 'bg-white border-b border-gray-100 py-3.5'}
      `}
    >
      <div className="max-w-[1400px] mx-auto px-6 xl:px-12 flex items-center gap-6 xl:gap-8">

        {/* ── Logo ── */}
        <Link
          href={isFr ? '/fr' : '/nl'}
          className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
        >
          <Image
            src="/logo.png"
            alt="Villant Loodgieter"
            width={180}
            height={48}
            className={`w-auto object-contain transition-all duration-300 ${
              scrolled ? 'h-8' : 'h-9 lg:h-10'
            }`}
            priority
          />
        </Link>

        {/* ── Desktop nav — centred ── */}
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-0.5 xl:gap-1">
          {navItems.map((item) => {
            if (item.children) {
              return (
                <DesktopDropdown
                  key={item.label}
                  item={item}
                  currentPath={pathname || ''}
                  lang={lang}
                />
              );
            }
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  px-4 py-2.5 rounded-lg text-[14.5px] font-semibold
                  transition-colors duration-200 outline-none whitespace-nowrap
                  focus-visible:ring-2 focus-visible:ring-primary
                  ${active ? 'text-primary' : 'text-gray-800 hover:text-primary hover:bg-gray-50'}
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-3 shrink-0 ml-auto lg:ml-0">

          {/* Phone block — xl only */}
          <div className="hidden xl:flex flex-col items-end leading-tight">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {isFr ? 'Appelez-nous' : 'Bel ons'}
            </span>
            <a
              href={SITE_CONFIG.phone.href}
              className="text-[14px] font-bold text-gray-900 hover:text-primary transition-colors"
            >
              {SITE_CONFIG.phone.display}
            </a>
          </div>

          {/* Vertical divider — xl only */}
          <div className="hidden xl:block w-px h-8 bg-gray-200" aria-hidden="true" />

          {/* ── Mobile: phone icon ── */}
          <a
            href={SITE_CONFIG.phone.href}
            aria-label="Call us"
            className="lg:hidden p-2.5 rounded-full text-primary bg-primary/8 hover:bg-primary/15 transition-colors"
          >
            <Phone size={20} />
          </a>

          {/* ── CTA button ── */}
          <Link
            href={isFr ? '/fr/contact' : '/nl/contact'}
            className="
              hidden sm:flex items-center gap-2
              bg-primary text-white font-semibold text-[14px]
              px-5 py-2.5 rounded-full
              hover:bg-primary-hover transition-all duration-200
              shadow-sm hover:shadow-md hover:-translate-y-px
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary
              whitespace-nowrap
            "
          >
            <Calendar size={14} className="shrink-0" />
            {isFr ? 'Demander un devis' : 'Offerte aanvragen'}
          </Link>

          {/* ── Hamburger ── */}
          <MobileMenu lang={lang} navItems={navItems} />
        </div>
      </div>
    </div>
  );
}
