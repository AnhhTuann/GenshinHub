import { getTranslations } from 'next-intl/server';
import { fetchGraphQL, GET_CHARACTERS } from '@/lib/graphql';
import TierListClient from './TierListClient';

// Revalidate periodically (5 minutes instead of 1 hour to prevent stale data)
export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations({ locale: (await params).locale, namespace: 'TierList' });
  return {
    title: `${t('title')} - GenshinHub`,
    description: t('description')
  };
}

// We need a query to get weapons. Since the frontend might not have GET_WEAPONS in graphql.ts,
// I will just define it here or we can fetch them via GraphQL.
const GET_WEAPONS = `
  query GetWeapons {
    weapons {
      id
      nameEn
      nameVi
      iconUrl
      rarity
      type
    }
  }
`;

export default async function TierListPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // Fetch from the backend via GraphQL instead of Prisma directly
  const [charData, weaponData] = await Promise.all([
    fetchGraphQL(GET_CHARACTERS),
    fetchGraphQL(GET_WEAPONS)
  ]);

  const characters = charData.characters || [];
  const weapons = weaponData.weapons || [];

  return (
    <main className="min-h-screen bg-[#07070a] pt-12 pb-24">
      <TierListClient locale={locale} characters={characters} weapons={weapons} />
    </main>
  );
}
