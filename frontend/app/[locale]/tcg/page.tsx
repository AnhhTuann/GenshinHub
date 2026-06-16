import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import TCGClient from './TCGClient';

export const metadata: Metadata = {
  title: 'TCG - GenshinHub',
  description: 'Discover Genshin Impact TCG cards, decks, and strategy recommendations in GenshinHub.',
  openGraph: {
    title: 'TCG - GenshinHub',
    description: 'Discover Genshin Impact TCG cards, decks, and strategy recommendations in GenshinHub.',
    images: ['/icon.png'],
    type: 'website',
  },
};

export default async function TCGPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TCGClient locale={locale} />;
}
