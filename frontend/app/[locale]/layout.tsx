import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/shared/Navbar";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

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
          <Navbar />
          <div className="min-h-screen">{children}</div>
          <footer className="border-t border-gray-900 py-8 text-center text-gray-500 text-sm bg-[#050508]">
            <p>© 2026 GenshinHub. All rights reserved.</p>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
