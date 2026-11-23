import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { fetchGraphQL, GET_MATERIALS, GET_WEAPON_BY_ID, GET_WEAPON_GAME_DATA, GET_WEAPON_RECOMMENDED_USERS, GET_WEAPONS } from '@/lib/graphql';
import WeaponDetailClient from './WeaponDetailClient';

// For staging, dynamic routes are resolved at request time, not from GraphQL at build time.
export const dynamic = 'force-dynamic';
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
  const { id, locale } = await params;
  setRequestLocale(locale);
  const data = await fetchGraphQL(GET_WEAPON_BY_ID, { id });
  const weapon = data.weapon;
  if (!weapon) return { title: 'Weapon Not Found' };
  const name = locale === 'en' ? weapon.nameEn : weapon.nameVi;
  return {
    title: `${name} - GenshinHub`,
    description: `${weapon.type} | ${weapon.rarity}★ | Base ATK: ${weapon.baseAtk}`,
  };
}

export default async function WeaponDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;
  setRequestLocale(locale);

  const weaponData = await fetchGraphQL(GET_WEAPON_BY_ID, { id });
  const weapon = weaponData.weapon;
  if (!weapon) notFound();

  const [gameDataResult, recommendedResult, materialsResult] = await Promise.all([
    fetchGraphQL(GET_WEAPON_GAME_DATA, { id }),
    fetchGraphQL(GET_WEAPON_RECOMMENDED_USERS, { id }),
    fetchGraphQL(GET_MATERIALS),
  ]);

  return (
    <WeaponDetailClient
      weapon={weapon}
      gameData={gameDataResult.weaponGameData ?? null}
      recommendedUsers={recommendedResult.weaponRecommendedUsers ?? []}
      materials={materialsResult.materials ?? []}
    />
  );
}
