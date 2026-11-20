import { getTranslations, setRequestLocale } from 'next-intl/server';
import { fetchGraphQL, GET_CHARACTERS, GET_WEAPONS, GET_TIER_RANKS } from '@/lib/graphql';
import TierListClient from './TierListClient';
import type { Metadata } from 'next';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'TierList' });
  return {
    title: `${t('title')} — GenshinHub`,
    description: t('description'),
  };
}

export default async function TierListPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [charData, weaponData, tierData] = await Promise.all([
    fetchGraphQL(GET_CHARACTERS),
    fetchGraphQL(GET_WEAPONS),
    fetchGraphQL(GET_TIER_RANKS),
  ]);

  const characters = charData.characters    || [];
  const weapons    = weaponData.weapons     || [];
  const tierRanks  = tierData.tierRanks     || [];

  return <TierListClient locale={locale} characters={characters} weapons={weapons} tierRanks={tierRanks} />;
}
