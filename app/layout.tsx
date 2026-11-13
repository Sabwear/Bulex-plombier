import { headers } from 'next/headers';
import {isBulex,bulexOrigin} from '@/config/bulex/brand';
import type { Metadata } from "next";
import "./globals.css";
import { getPublicPhoneDisplay } from "@/config/public-phone";

const siteVerificationGoogle =
  (isBulex ? process.env.BULEX_GOOGLE_SITE_VERIFICATION : process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION)?.trim() || undefined;

export const metadata: Metadata = {
  metadataBase: new URL(isBulex ? bulexOrigin : "https://vaillant-loodgieter.com"),
  ...(siteVerificationGoogle
    ? { verification: { google: siteVerificationGoogle } }
    : {}),
};

const measurementId =
  process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GTM_ID;
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
const phoneConversionLabel =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION_LABEL?.trim();
// Falls back to the single source of truth (NEXT_PUBLIC_PHONE_NUMBER) so the
// call-conversion number stays in sync with the rest of the site.
const phoneConversionNumber =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION_NUMBER?.trim() ||
  getPublicPhoneDisplay();
const gtagScriptId = measurementId || googleAdsId;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = isBulex ? (await headers()).get("x-bulex-locale") || "en" : "nl";
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {!isBulex && gtagScriptId ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gtagScriptId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${measurementId ? `gtag('config', '${measurementId}');` : ""}
${googleAdsId ? `gtag('config', '${googleAdsId}');` : ""}
${phoneConversionLabel ? `gtag('config', '${phoneConversionLabel}', {${phoneConversionNumber ? `'phone_conversion_number': '${phoneConversionNumber}'` : ""}});` : ""}`,
              }}
            />
          </>
        ) : null}
        <link rel="icon" href={isBulex ? "/bulex/logo.png" : "/flame.svg"} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
