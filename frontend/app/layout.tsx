import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "TeyvatDB - Genshin Impact Builds & Guides",
  description: "Genshin Impact Database - Look up characters, builds, artifacts, weapons, and best team comps.",
  keywords: "Genshin Impact, TeyvatDB, Builds, Artifacts, Weapons, Characters",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} ${inter.className} bg-[#07070a] text-white antialiased`} suppressHydrationWarning>
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <footer className="border-t border-gray-900 py-8 text-center text-gray-500 text-sm bg-[#050508]">
          <p>© 2026 TeyvatDB. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
