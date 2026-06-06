import { fetchGraphQL, GET_CHARACTERS } from '@/lib/graphql';
import { Metadata } from 'next';
import TeamsClient from './TeamsClient';

export const metadata: Metadata = {
  title: 'Đội Hình Meta - TeyvatDB',
  description: 'Tra cứu đội hình tối ưu cho từng nhân vật trong Genshin Impact - đội hình SS/S/A tier, vũ khí, thánh di vật và substats.',
};

export default async function TeamsPage() {
  const data = await fetchGraphQL(GET_CHARACTERS);
  const characters = (data.characters || []).map((c: any) => ({
    id: c.id,
    name: c.name,
    element: c.element,
    rarity: c.rarity,
    avatarUrl: c.avatarUrl,
  }));
  return <TeamsClient characters={characters} />;
}
