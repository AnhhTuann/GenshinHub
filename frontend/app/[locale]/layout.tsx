import type { Metadata } from "next";
import { Inter, Outfit, Cinzel, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/shared/Navbar";
import AdminModeToggle from "@/components/AdminModeToggle";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import { Toaster } from 'react-hot-toast';
import CommandPalette from '@/components/shared/CommandPalette';
import { fetchGraphQL } from '@/lib/graphql';
import { UserProvider } from '@/context/UserContext';
import { UISoundProvider } from '@/context/UISoundContext';
import CustomCursor from '@/components/shared/CustomCursor';
import PageTransition from '@/components/shared/PageTransition';

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

import { routing } from '@/i18n/routing';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'GenshinHub',
      url: siteUrl,
      logo: `${siteUrl}/icon.webp`,
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      url: siteUrl,
      name: 'GenshinHub',
      description: 'Genshin Impact Database for characters, weapons, artifacts, team comps, banners, and more.',
      publisher: {
        '@type': 'Organization',
        name: 'GenshinHub',
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "GenshinHub - Genshin Impact Builds & Guides",
  description: "Genshin Impact Database - Look up characters, builds, artifacts, weapons, and best team comps.",
  keywords: "Genshin Impact, GenshinHub, Builds, Artifacts, Weapons, Characters",
  openGraph: {
    type: 'website',
    title: 'GenshinHub - Genshin Impact Builds & Guides',
    description: 'Genshin Impact Database - Look up characters, builds, artifacts, weapons, and best team comps.',
    images: [
      {
        url: '/icon.webp',
        width: 512,
        height: 512,
        alt: 'GenshinHub logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GenshinHub - Genshin Impact Builds & Guides',
    description: 'Genshin Impact Database - Look up characters, builds, artifacts, weapons, and best team comps.',
    images: ['/icon.webp'],
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      vi: '/vi',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  // Fetch search index for Command Palette
  let searchItems: any[] = [];
  try {
    const data = await fetchGraphQL(`query {
      characters { id nameEn avatarUrl rarity }
      weapons { id nameEn iconUrl rarity }
      artifacts { id nameEn iconUrl rarityList }
    }`);
    if (data.characters) searchItems.push(...data.characters.map((c: any) => ({ ...c, name: c.nameEn, type: 'character', iconUrl: c.avatarUrl })));
    if (data.weapons) searchItems.push(...data.weapons.map((w: any) => ({ ...w, name: w.nameEn, type: 'weapon' })));
    if (data.artifacts) searchItems.push(...data.artifacts.map((a: any) => ({ ...a, name: a.nameEn, type: 'artifact' })));
    console.log(`[Command Palette] Loaded ${searchItems.length} items for search index.`);
  } catch (err) {
    // Suppress search index failure from crashing Next.js dev server with error overlay
    console.warn("Failed to load search index (Command Palette offline)");
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} ${cinzel.variable} ${jetbrainsMono.variable} ${inter.className} bg-[#07070a] text-white antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <UISoundProvider>
            <UserProvider>
              <CustomCursor />
              <Toaster 
              position="bottom-center"
              toastOptions={{
                className: 'bg-[#0a0a0f]/80 backdrop-blur-md border border-white/10 text-white shadow-xl',
                style: {
                  background: 'rgba(10, 10, 15, 0.8)',
                  backdropFilter: 'blur(12px)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: 600,
                },
                success: {
                  iconTheme: { primary: '#10b981', secondary: '#fff' },
                  style: { borderColor: 'rgba(16, 185, 129, 0.3)' }
                },
                error: {
                  iconTheme: { primary: '#ef4444', secondary: '#fff' },
                  style: { borderColor: 'rgba(239, 68, 68, 0.3)' }
                }
              }}
            />
            <div className="noise-overlay" />
            <CommandPalette items={searchItems} />
            <Navbar />
            <div className="min-h-screen overflow-x-hidden">
              <PageTransition>{children}</PageTransition>
            </div>
            <footer className="border-t border-white/[0.04] py-8 bg-[#050508]">
              <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 opacity-40" viewBox="0 0 100 100" fill="none">
                    <defs>
                      <linearGradient id="footer-logo-g" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%"   stopColor="#50e4ff" />
                        <stop offset="50%"  stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#ffb300" />
                      </linearGradient>
                    </defs>
                    <path d="M50 0 C50 35,65 50,100 50 C65 50,50 65,50 100 C50 65,35 50,0 50 C35 50,50 35,50 0 Z" fill="url(#footer-logo-g)" />
                  </svg>
                  <span className="text-white/20 font-black text-xs tracking-widest uppercase">GenshinHub</span>
                </div>
                <p className="text-white/15 text-[11px] font-semibold">© 2026 GenshinHub. All rights reserved.</p>
              </div>
            </footer>
            <AdminModeToggle />
            </UserProvider>
          </UISoundProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
