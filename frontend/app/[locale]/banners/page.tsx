import { getTranslations } from 'next-intl/server';

import BannersClient from './BannersClient';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations({ locale: (await params).locale, namespace: 'Banners' });
  return {
    title: `${t('title')} - GenshinHub`,
    description: t('description')
  };
}

export default async function BannersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-[#07070a] pt-12 pb-24">
      <BannersClient locale={locale} />
    </main>
  );
}
