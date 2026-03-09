'use client';

import Link from 'next/link';
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
    <div className={`flex items-center gap-1 text-xs font-semibold ${className}`}>
      <Link
        href={frHref}
        aria-label="Français"
        aria-current={currentLocale === 'fr' ? 'page' : undefined}
        className={`rounded px-1.5 py-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          currentLocale === 'fr'
            ? isDark ? 'text-white' : 'text-gray-900'
            : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        FR
      </Link>
      <span className={isDark ? 'text-gray-500' : 'text-gray-400'} aria-hidden="true">|</span>
      <Link
        href={nlHref}
        aria-label="Nederlands"
        aria-current={currentLocale === 'nl' ? 'page' : undefined}
        className={`rounded px-1.5 py-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          currentLocale === 'nl'
            ? isDark ? 'text-white' : 'text-gray-900'
            : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        NL
      </Link>
    </div>
  );
}

