'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getAlternateLocalePath, getLocaleFromPathname, type Locale } from '@/config/locale-routes';

interface LanguageSwitcherProps {
  className?: string;
  theme?: 'dark' | 'light';
}

export default function LanguageSwitcher({ className = '', theme = 'dark' }: LanguageSwitcherProps) {
  const pathname = usePathname() || '/fr';
  const currentLocale: Locale = getLocaleFromPathname(pathname);
  const isDark = theme === 'dark';

  const frHref = currentLocale === 'fr' ? pathname : getAlternateLocalePath(pathname, 'fr');
  const nlHref = currentLocale === 'nl' ? pathname : getAlternateLocalePath(pathname, 'nl');

  return (
    <div className={`flex items-center gap-1.5 text-xs font-semibold ${className}`}>
      <Link
        href={frHref}
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
        <Image
          src="/images/flag/fr.svg"
          alt="Français"
          width={20}
          height={14}
          className={currentLocale === 'fr' ? 'opacity-100' : 'opacity-75'}
        />
      </Link>

      <Link
        href={nlHref}
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
        <Image
          src="/images/flag/nl.svg"
          alt="Nederlands"
          width={20}
          height={14}
          className={currentLocale === 'nl' ? 'opacity-100' : 'opacity-75'}
        />
      </Link>
    </div>
  );
}

