'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { getAlternateLocalePath, getLocaleFromPathname, type Locale } from '@/config/locale-routes';

interface LanguageSwitcherProps {
  className?: string;
  theme?: 'dark' | 'light';
}

export default function LanguageSwitcher({ className = '', theme = 'dark' }: LanguageSwitcherProps) {
  const pathname = usePathname() || '/fr';
  const searchParams = useSearchParams();
  const currentLocale: Locale = getLocaleFromPathname(pathname);
  const isDark = theme === 'dark';

  const search = searchParams?.toString();
  const withSearch = (path: string) => (search ? `${path}?${search}` : path);

  const frPath = currentLocale === 'fr' ? pathname : getAlternateLocalePath(pathname, 'fr');
  const nlPath = currentLocale === 'nl' ? pathname : getAlternateLocalePath(pathname, 'nl');

  const frHref = withSearch(frPath);
  const nlHref = withSearch(nlPath);

  const setLocaleCookie = (locale: Locale) => {
    try {
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    } catch {
    }
  };

  return (
    <div className={`flex items-center gap-1.5 text-xs font-semibold ${className}`}>
      <Link
        href={frHref}
        onClick={() => setLocaleCookie('fr')}
        aria-label="Français"
        aria-current={currentLocale === 'fr' ? 'page' : undefined}
        className={`inline-flex items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          currentLocale === 'fr'
            ? isDark
              ? 'ring-1 ring-white/80'
              : 'ring-1 ring-primary/80'
            : 'opacity-80 hover:opacity-100'
        }`}
      >
        <span className="sr-only">Français</span>
        <Image
          src="/images/flag/fr.svg"
          alt=""
          width={20}
          height={14}
          className={currentLocale === 'fr' ? 'opacity-100' : 'opacity-75'}
        />
      </Link>

      <Link
        href={nlHref}
        onClick={() => setLocaleCookie('nl')}
        aria-label="Nederlands"
        aria-current={currentLocale === 'nl' ? 'page' : undefined}
        className={`inline-flex items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          currentLocale === 'nl'
            ? isDark
              ? 'ring-1 ring-white/80'
              : 'ring-1 ring-primary/80'
            : 'opacity-80 hover:opacity-100'
        }`}
      >
        <span className="sr-only">Nederlands</span>
        <Image
          src="/images/flag/nl.svg"
          alt=""
          width={20}
          height={14}
          className={currentLocale === 'nl' ? 'opacity-100' : 'opacity-75'}
        />
      </Link>
    </div>
  );
}

