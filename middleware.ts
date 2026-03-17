import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SUPPORTED_LOCALES, getLocaleFromPathname, type Locale } from '@/config/locale-routes';

const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

function getPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value as Locale | undefined;
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get('accept-language') || '';
  const accepted = acceptLanguage
    .split(',')
    .map((part) => part.split(';')[0]?.trim().toLowerCase())
    .filter(Boolean);

  for (const lang of accepted) {
    if (lang.startsWith('nl')) return 'nl';
    if (lang.startsWith('fr')) return 'fr';
  }

  return 'fr';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/icons') ||
    pathname.startsWith('/images') ||
    pathname.match(/\.[a-zA-Z0-9]+$/)
  ) {
    return NextResponse.next();
  }

  if (pathname === '/' || (!pathname.startsWith('/fr') && !pathname.startsWith('/nl'))) {
    const locale = getPreferredLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = locale === 'fr' ? `/fr${pathname === '/' ? '' : pathname}` : `/nl${pathname === '/' ? '' : pathname}`;

    const response = NextResponse.redirect(url);
    response.cookies.set(LOCALE_COOKIE_NAME, locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    return response;
  }

  const explicitLocale = getLocaleFromPathname(pathname);
  const response = NextResponse.next();
  response.cookies.set(LOCALE_COOKIE_NAME, explicitLocale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

