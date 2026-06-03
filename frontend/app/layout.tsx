import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "TeyvatDB - Genshin Impact Builds & Guides",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#111115] text-white antialiased`} suppressHydrationWarning>
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm bg-[#0b0b0e]">
          <p>© 2026 TeyvatDB.</p>
        </footer>
      </body>
    </html>
  );
}
