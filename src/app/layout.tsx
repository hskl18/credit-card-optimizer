import type { Metadata } from "next";
import type React from "react";
import { TabBar } from "@/components/tab-bar";
import { getCatalogMetadata } from "@/lib/cards/catalog";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const title = "Card Compass — the best credit card for every purchase";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s — ${siteName}`
  },
  description: siteDescription,
  applicationName: siteName,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    siteName,
    title,
    description: siteDescription,
    url: "/"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteDescription
  }
};

export const viewport = {
  themeColor: "#ebe6da",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { lastVerified } = getCatalogMetadata();

  return (
    <html lang="en">
      <body>
        <div className="app">
          <main className="view">{children}</main>
          <footer className="ftr">
            <p>
              An independent project. Not affiliated with, authorised by, or endorsed by any card
              issuer. Card names, logos, and artwork are trademarks of their respective owners.
            </p>
            <p>
              Reward data verified {lastVerified}. Not financial advice — confirm the terms with the
              issuer before you apply.
            </p>
          </footer>
          <TabBar />
        </div>
      </body>
    </html>
  );
}
