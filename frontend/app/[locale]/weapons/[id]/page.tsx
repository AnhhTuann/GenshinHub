import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { fetchGraphQL, GET_WEAPON_BY_ID, GET_CHARACTERS_BY_WEAPON_TYPE, GET_WEAPONS } from '@/lib/graphql';
import WeaponDetailClient from './WeaponDetailClient';

export async function generateStaticParams() {
  const data = await fetchGraphQL(GET_WEAPONS);
  return (data.weapons || []).map((w: any) => ({ id: w.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
  const { id, locale } = await params;
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
  unstable_setRequestLocale(locale);

  const weaponData = await fetchGraphQL(GET_WEAPON_BY_ID, { id });
  const weapon = weaponData.weapon;
  if (!weapon) notFound();

  const charsData = await fetchGraphQL(GET_CHARACTERS_BY_WEAPON_TYPE, { weaponType: weapon.type });
  const characters = charsData.charactersByWeaponType || [];

  return <WeaponDetailClient weapon={weapon} characters={characters} />;
}
