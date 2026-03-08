"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, Calendar, ChevronDown, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/config/navigation';

interface MobileMenuProps {
  lang: 'fr' | 'nl';
  navItems: any[];
}

export function MobileMenu({ lang, navItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isFr = lang === 'fr';

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* Escape key */
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    if (isOpen) window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={isOpen}
        className="
          lg:hidden p-2.5 -mr-1 rounded-xl
          text-gray-700 hover:text-primary hover:bg-gray-100
          transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
        "
      >
        <Menu size={22} />
      </button>

      {/* ── Backdrop ── */}
      <div
        aria-hidden="true"
        onClick={close}
        className={`
          fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-200
          transition-opacity duration-300 lg:hidden
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}
      />

      {/* ── Drawer ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={`
          fixed top-0 right-0 h-dvh w-[88vw] max-w-[400px]
          bg-white z-201 flex flex-col
          shadow-[−4px_0_40px_rgba(0,0,0,0.2)]
          transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          lg:hidden overflow-hidden
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* ── Drawer header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0 bg-gray-50">
          <Image
            src="/logo.png"
            alt="Villant Loodgieter"
            width={130}
            height={34}
            className="h-7 w-auto object-contain"
          />
          <button
            onClick={close}
            aria-label="Fermer le menu"
            className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Nav links ── */}
        <nav className="flex-1 overflow-y-auto px-5 pt-5 pb-52">
          <ul className="space-y-0.5">
            {navItems.map((item, idx) => (
              <li key={idx}>
                {item.children?.length > 0 ? (
                  /* Accordion */
                  <details className="group">
                    <summary className="
                      flex items-center justify-between w-full
                      px-3.5 py-3.5 rounded-xl
                      text-[15.5px] font-semibold text-gray-900
                      cursor-pointer select-none list-none
                      [&::-webkit-details-marker]:hidden
                      hover:bg-gray-50 transition-colors
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                    ">
                      <span>{item.label}</span>
                      <span className="
                        text-gray-400 group-open:rotate-180
                        transition-transform duration-300
                        bg-gray-100 rounded-full p-1
                        group-hover:bg-primary/10 group-hover:text-primary
                      ">
                        <ChevronDown size={16} />
                      </span>
                    </summary>

                    <div className="mt-1.5 ml-3.5 pl-4 border-l-2 border-primary/20 space-y-0.5 pb-3">
                      {/* "See all" */}
                      <Link
                        href={item.children[0].href}
                        onClick={close}
                        className="
                          flex items-center gap-2 px-3 py-2.5 mb-1.5
                          text-[13.5px] font-bold text-primary
                          bg-primary/5 border border-primary/10 rounded-lg
                          hover:bg-primary/10 transition-colors
                        "
                      >
                        {item.children[0].label}
                        <ArrowRight size={12} className="shrink-0" />
                      </Link>

                      {/* Communes */}
                      {item.children.slice(1).map((child: any) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={close}
                          className="
                            block px-3 py-2 rounded-lg
                            text-[13.5px] text-gray-600 font-medium
                            hover:text-primary hover:bg-gray-50
                            transition-colors
                          "
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    href={item.href}
                    onClick={close}
                    className="
                      block px-3.5 py-3.5 rounded-xl
                      text-[15.5px] font-semibold text-gray-900
                      hover:text-primary hover:bg-gray-50
                      transition-colors
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                    "
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Pinned CTA footer ── */}
        <div className="
          absolute bottom-0 left-0 right-0
          px-5 pb-8 pt-5
          bg-white border-t border-gray-100
          shadow-[0_-12px_40px_-8px_rgba(0,0,0,0.10)]
          space-y-3
        ">
          <a
            href={SITE_CONFIG.phone.href}
            className="
              flex items-center justify-center gap-2.5 w-full
              py-3.5 rounded-xl font-bold text-[14.5px] text-gray-900
              bg-gray-50 border-2 border-gray-200
              hover:border-primary hover:text-primary
              transition-all
            "
          >
            <Phone size={17} className="text-primary shrink-0" />
            {isFr ? 'Appeler' : 'Bellen'} — {SITE_CONFIG.phone.display}
          </a>

          <Link
            href={isFr ? '/fr/contact' : '/nl/contact'}
            onClick={close}
            className="
              flex items-center justify-center gap-2.5 w-full
              py-3.5 rounded-xl font-bold text-[14.5px] text-white
              bg-primary hover:bg-primary-hover
              transition-all shadow-md
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary
            "
          >
            <Calendar size={17} className="shrink-0" />
            {isFr ? 'Demander un devis' : 'Offerte aanvragen'}
          </Link>
        </div>
      </div>
    </>
  );
}
