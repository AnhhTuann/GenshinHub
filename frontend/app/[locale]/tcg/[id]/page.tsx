import { getTcgCardDetail } from '@/lib/yattaTcg';
import { notFound } from 'next/navigation';
import TcgDetailClient from './TcgDetailClient';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale, id } }: { params: { locale: string, id: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const card = await getTcgCardDetail(id, locale);
  
  if (!card) return { title: 'Not Found' };
  
  return {
    title: `${card.name} | GenshinHub TCG`,
    description: card.storyDetail || t('tcgDesc'),
  };
}

export default async function TcgCardPage({ params: { locale, id } }: { params: { locale: string, id: string } }) {
  const cardData = await getTcgCardDetail(id, locale);

  if (!cardData) {
    notFound();
  }

  return <TcgDetailClient locale={locale} card={cardData} />;
}
