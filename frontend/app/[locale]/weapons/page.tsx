import { fetchGraphQL, GET_WEAPONS } from '@/lib/graphql';
import { Metadata } from 'next';
import WeaponsClient from './WeaponsClient';

export const metadata: Metadata = {
  title: 'Weapons - GenshinHub',
  description: 'Explore all weapons in Genshin Impact - ATK, substats, passives, and more.',
};

export default async function WeaponsPage() {
  const data = await fetchGraphQL(GET_WEAPONS);
  const weapons = data.weapons || [];

  return <WeaponsClient weapons={weapons} />;
}
