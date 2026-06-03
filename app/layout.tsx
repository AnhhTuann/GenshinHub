import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Genshin Build Database',
  description: 'Genshin Impact character database and build guide website.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="bg-zinc-950 text-zinc-100 font-sans h-full flex flex-col overflow-hidden" suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
