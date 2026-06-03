const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql';

export async function fetchGraphQL(query: string, variables = {}) {
  const res = await fetch(GRAPHQL_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query, variables }), next: { revalidate: 60 } });
  const json = await res.json();
  if (json.errors) {
    console.error('GraphQL Errors:', JSON.stringify(json.errors, null, 2));
    throw new Error('Lỗi fetch GraphQL: ' + json.errors[0].message);
  }
  return json.data;
}

export const GET_CHARACTERS = `query GetCharacters { characters { id name element rarity avatarUrl weapon } }`;
export const GET_CHARACTER_BY_ID = `query GetCharacterById($id: String!) { character(id: $id) { id name title rarity element weapon region avatarUrl splashArtUrl description baseHp baseAtk baseDef fandomUrl talentPriority bestTeams bestWeapons { id name rank isF2P iconUrl subStat passiveDesc refinement } bestArtifacts { setName pieces sands goblet circlet subStatsPriority } } }`;
export const GET_SHOWCASE = `query GetShowcase($uid: String!) { showcase(uid: $uid) { uid nickname level avatarUrl characters } }`;
