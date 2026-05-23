import type { Metadata } from "next";
import "./globals.css";
import { siteConfig, umamiConfig } from '@/lib/config';
import GlassNav from '@/components/ui/GlassNav';
import Script from 'next/script';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <GlassNav />
        <main className="pt-20 pb-12 px-4 max-w-5xl mx-auto w-full">
          {children}
        </main>
        {umamiConfig.websiteId && (
          <Script
            src={umamiConfig.scriptUrl}
            data-website-id={umamiConfig.websiteId}
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
