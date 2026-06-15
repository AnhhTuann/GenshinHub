import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/shared/Navbar";
import AdminModeToggle from "@/components/AdminModeToggle";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "GenshinHub - Genshin Impact Builds & Guides",
  description: "Genshin Impact Database - Look up characters, builds, artifacts, weapons, and best team comps.",
  keywords: "Genshin Impact, GenshinHub, Builds, Artifacts, Weapons, Characters",
};

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} ${inter.className} bg-[#07070a] text-white antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
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
          <Navbar />
          <div className="min-h-screen overflow-x-hidden">{children}</div>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
