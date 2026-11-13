import { bulexMiddleware } from '@/config/bulex/middleware';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return bulexMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
