import { getTranslations, setRequestLocale } from 'next-intl/server';
import { fetchGraphQL, GET_CHARACTERS, GET_WEAPONS, GET_TIER_RANKS } from '@/lib/graphql';
import TierListClient from './TierListClient';

// Revalidate periodically (5 minutes instead of 1 hour to prevent stale data)
export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'TierList' });
  return {
    title: `${t('title')} - GenshinHub`,
    description: t('description')
  };
}

export default async function TierListPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  // Fetch from the backend via GraphQL instead of Prisma directly
  const [charData, weaponData, tierData] = await Promise.all([
    fetchGraphQL(GET_CHARACTERS),
    fetchGraphQL(GET_WEAPONS),
    fetchGraphQL(GET_TIER_RANKS)
  ]);

  const characters = charData.characters || [];
  const weapons = weaponData.weapons || [];
  const tierRanks = tierData.tierRanks || [];

  return (
    <main className="min-h-screen bg-[#07070a] pt-12 pb-24">
      <TierListClient locale={locale} characters={characters} weapons={weapons} tierRanks={tierRanks} />
    </main>
  );
}
