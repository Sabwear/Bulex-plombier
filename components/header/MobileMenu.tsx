'use client';

import { Suspense, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Twitter, Send } from 'lucide-react';
import { X } from 'lucide-react';
import type { Locale } from '@/config/locale-routes';
import type { NavItem } from '@/config/site-navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { SOCIAL_LINKS } from '@/config/social-links';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Locale;
  navItems: NavItem[];
  cta: {
    label: string;
    href: string;
  };
}

export default function MobileMenu({ isOpen, onClose, navItems, cta, lang }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [isOpen, onClose]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 h-dvh w-[86vw] max-w-[360px] bg-white z-[70] border-l border-gray-200 shadow-sm lg:hidden transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="h-14 px-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="sr-only">Menu</span>
              <Image
                src="/logo-vaillant-loodgieter.png"
                alt="Vaillant Loodgieter"
                width={170}
                height={40}
                className="h-8 w-auto object-contain"
                priority={false}
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-4 py-4 border-b border-gray-100">
            <p className="mt-2 text-xs leading-relaxed text-gray-600">
              {lang === 'nl'
                ? 'Gecertificeerd Vaillant partner in België. Gekwalificeerde technici voor al uw loodgieterij en verwarming.'
                : 'Partenaire certifié Vaillant en Belgique. Techniciens qualifiés pour tous vos besoins en plomberie et chauffage.'}
            </p>

            <div className="mt-3 flex items-center gap-2">
              {SOCIAL_LINKS.twitter && (
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  <Twitter size={16} />
                </a>
              )}
              {SOCIAL_LINKS.facebook && (
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  <Facebook size={16} />
                </a>
              )}
              {SOCIAL_LINKS.instagram && (
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  <Instagram size={16} />
                </a>
              )}
              {SOCIAL_LINKS.linkedin && (
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  <Linkedin size={16} />
                </a>
              )}
              {SOCIAL_LINKS.telegram && (
                <a
                  href={SOCIAL_LINKS.telegram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Telegram"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  <Send size={16} />
                </a>
              )}
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.children?.length ? (
                    <details className="group">
                      <summary className="list-none cursor-pointer px-3 py-2.5 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        {item.label}
                      </summary>
                      <div className="mt-2 ml-3 pl-3 border-l border-gray-200 space-y-1.5">
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="block px-4 py-2.5 rounded-md text-sm text-primary hover:bg-gray-50 transition-colors"
                        >
                          {item.label}
                        </Link>
                        {item.children.map((child) => (
                          <Link
                            key={child.href + child.label}
                            href={child.href}
                            onClick={onClose}
                            className="block px-4 py-2.5 rounded-md text-sm text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block px-3 py-2.5 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-4 py-4 border-t border-gray-100 space-y-3">
            <Link
              href={cta.href}
              onClick={onClose}
              className="w-full inline-flex items-center justify-center rounded-md bg-primary hover:bg-primary-hover !text-white hover:!text-white text-sm font-semibold px-4 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              {cta.label}
            </Link>
            <div className="pt-1">
              <Suspense fallback={null}>
                <LanguageSwitcher theme="light" />
              </Suspense>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

