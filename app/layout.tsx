import type { Metadata } from "next";
import "./globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        {measurementId ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}');`,
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
