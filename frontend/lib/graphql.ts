const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql';

export async function fetchGraphQL(query: string, variables = {}) {
  const res = await fetch(GRAPHQL_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query, variables }), next: { revalidate: 60 } });
  const json = await res.json();
  if (json.errors) throw new Error('Lỗi fetch GraphQL');
  return json.data;
}

export const GET_CHARACTERS = `query GetCharacters { characters { id name element rarity avatarUrl weapon } }`;
export const GET_CHARACTER_BY_ID = `query GetCharacterById($id: String!) { character(id: $id) { id name title rarity element weapon region avatarUrl splashArtUrl talentPriority bestTeams bestWeapons { id name rank isF2P } bestArtifacts { setName pieces sands goblet circlet subStatsPriority } } }`;
