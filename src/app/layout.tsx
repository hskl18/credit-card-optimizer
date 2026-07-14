import type { Metadata } from "next";
import Link from "next/link";
import type React from "react";
import { Compass, Wrench } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Card Compass is paused",
  description: "Card Compass is temporarily offline while card data and image quality are cleaned up."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/">
            <span className="brand-mark">
              <Compass size={20} strokeWidth={2.4} />
            </span>
            <span>Card Compass</span>
          </Link>
          <nav className="site-nav" aria-label="Primary navigation">
            <Link href="/">Status</Link>
          </nav>
          <div className="header-actions">
            <span className="trust-chip">
              <Wrench size={16} />
              Data QA in progress
            </span>
            <span className="trust-chip hide-small">Public MVP hidden</span>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
