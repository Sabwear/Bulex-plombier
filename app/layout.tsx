import type { Metadata } from "next";
import "./globals.css";
import HreflangLinks from "@/components/seo/HreflangLinks";

export const metadata: Metadata = {
  metadataBase: new URL("https://vaillant-loodgieter.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/flame.svg" />
      </head>
      <body>
        <HreflangLinks />
        {children}
      </body>
    </html>
  );
}
