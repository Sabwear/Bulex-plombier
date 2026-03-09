'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/config/locale-routes';
import { SITE_NAVIGATION, SITE_PHONE } from '@/config/site-navigation';
import MobileMenu from './MobileMenu';

interface MainHeaderProps {
  lang: Locale;
}

export default function MainHeader({ lang }: MainHeaderProps) {
  const pathname = usePathname() || (lang === 'fr' ? '/fr' : '/nl');
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useMemo(() => SITE_NAVIGATION[lang], [lang]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container">
        <div className="h-16 flex items-center justify-between gap-4 md:grid md:grid-cols-[auto_1fr_auto]">
          <Link
            href={lang === 'fr' ? '/fr' : '/nl'}
            className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Image src="/logo.png" alt="Vaillant Loodgieter" width={170} height={42} className="w-auto h-8 sm:h-9 object-contain" priority />
          </Link>

          <nav className="hidden md:flex flex-1 items-center justify-center gap-2 lg:gap-3 min-w-0">
            {data.navItems.map((item) => {
              const isHomeItem = item.href === '/fr' || item.href === '/nl';
              const isActive = isHomeItem
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

              if (item.children?.length) {
                return (
                  <div key={item.href} className="relative group">
                    <Link
                      href={item.href}
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isActive ? 'text-primary bg-primary/5' : 'text-gray-800 hover:text-primary hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                      <ChevronDown size={14} className="text-gray-500 group-hover:text-primary transition-colors" />
                    </Link>

                    <div className="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block z-50">
                      <div className="min-w-[240px] rounded-md border border-gray-200 bg-white shadow-sm p-2 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href + child.label}
                            href={child.href}
                            className="block px-4 py-2.5 rounded-md text-sm text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive ? 'text-primary bg-primary/5' : 'text-gray-800 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0 md:justify-self-end">
            <a
              href={SITE_PHONE.href}
              aria-label="Call us"
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-200 text-gray-700 hover:text-primary hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Phone size={18} />
            </a>

            <Link
              href={data.cta.href}
              className="hidden md:inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-hover !text-white hover:!text-white text-sm font-semibold px-[15px] py-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary whitespace-nowrap"
            >
              <Phone size={16} />
              <span>{data.cta.label}</span>
              <span className="hidden lg:inline">· {SITE_PHONE.display}</span>
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-200 text-gray-700 hover:text-primary hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        lang={lang}
        navItems={data.navItems}
        cta={data.cta}
      />
    </header>
  );
}

