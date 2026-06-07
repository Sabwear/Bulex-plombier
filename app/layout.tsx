import type { Metadata } from "next";
import "./globals.css";
import { getPublicPhoneDisplay } from "@/config/public-phone";

const siteVerificationGoogle =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || undefined;

export const metadata: Metadata = {
  metadataBase: new URL("https://vaillant-loodgieter.com"),
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        {gtagScriptId ? (
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
        <link rel="icon" href="/flame.svg" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
