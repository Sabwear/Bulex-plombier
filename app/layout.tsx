import { headers } from 'next/headers';
import {getBulexOrigin} from '@/config/bulex/request-origin';
import type { Metadata } from "next";
import "./globals.css";

const siteVerificationGoogle =
  process.env.BULEX_GOOGLE_SITE_VERIFICATION?.trim() || undefined;

export async function generateMetadata():Promise<Metadata>{return {
  metadataBase: new URL(await getBulexOrigin()),
  ...(siteVerificationGoogle
    ? { verification: { google: siteVerificationGoogle } }
    : {}),
};}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = (await headers()).get("x-bulex-locale") || "nl";
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/bulex/logo.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
