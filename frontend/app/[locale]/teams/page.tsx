import { fetchGraphQL, GET_CHARACTERS } from '@/lib/graphql';
import { Metadata } from 'next';
import TeamsClient from './TeamsClient';

export const metadata: Metadata = {
  title: 'Meta Teams - GenshinHub',
  description: 'Explore optimal team compositions for characters in Genshin Impact - SS/S/A tier teams, weapons, artifacts, and substats.',
};

export default async function TeamsPage() {
  const data = await fetchGraphQL(GET_CHARACTERS);
  const characters = (data.characters || []).map((c: any) => ({
    id: c.id,
    nameEn: c.nameEn,
    nameVi: c.nameVi,
    element: c.element,
    rarity: c.rarity,
    avatarUrl: c.avatarUrl,
  }));
  return <TeamsClient characters={characters} />;
}
