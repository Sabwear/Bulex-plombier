import { headers } from 'next/headers';
import { bulexOrigin } from '@/config/bulex/brand';
import type { Metadata } from "next";
import "./globals.css";

const siteVerificationGoogle =
  process.env.BULEX_GOOGLE_SITE_VERIFICATION?.trim() || undefined;

export const metadata: Metadata = {
  metadataBase: new URL(bulexOrigin),
  ...(siteVerificationGoogle
    ? { verification: { google: siteVerificationGoogle } }
    : {}),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = (await headers()).get("x-bulex-locale") || "en";
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
