import { fetchGraphQL, GET_WEAPONS } from '@/lib/graphql';
import { Metadata } from 'next';
import WeaponsClient from './WeaponsClient';

export const metadata: Metadata = {
  title: 'Vũ Khí - TeyvatDB',
  description: 'Khám phá toàn bộ vũ khí trong Genshin Impact - thống kê ATK, substat, nội tại và hơn thế nữa.',
};

export default async function WeaponsPage() {
  const data = await fetchGraphQL(GET_WEAPONS);
  const weapons = data.weapons || [];

  return <WeaponsClient weapons={weapons} />;
}
