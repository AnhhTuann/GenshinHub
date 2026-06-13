const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql';

export async function fetchGraphQL(query: string, variables = {}) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  
  if (typeof window !== 'undefined') {
    const adminKey = localStorage.getItem('admin_key');
    if (adminKey) {
      headers['x-admin-key'] = adminKey;
    }
  }

  const res = await fetch(GRAPHQL_ENDPOINT, { 
    method: 'POST', 
    headers, 
    body: JSON.stringify({ query, variables }), 
    next: { revalidate: 0 } // No cache in development
  });
  const json = await res.json();
  if (json.errors) {
    console.error('GraphQL Errors:', JSON.stringify(json.errors, null, 2));
    throw new Error('Lỗi fetch GraphQL: ' + json.errors[0].message);
  }
  return json.data;
}

export const GET_CHARACTERS = `query GetCharacters { characters { id nameEn nameVi element rarity avatarUrl weapon } }`;
export const GET_CHARACTER_BY_ID = `query GetCharacterById($id: String!) { character(id: $id) { id nameEn nameVi titleEn titleVi rarity element weapon region birthday avatarUrl splashArtUrl descriptionEn descriptionVi baseHp baseAtk baseDef fandomUrl talentPriority bestTeams bestWeapons { id nameEn nameVi rank isF2P iconUrl subStat passiveDescEn passiveDescVi refinement rarity } bestArtifacts { setNameEn setNameVi pieces sands goblet circlet subStatsPriority rarity iconUrl artifactSetId mixSets { nameEn nameVi iconUrl artifactSetId } } } }`;
export const GET_SHOWCASE = `query GetShowcase($uid: String!) { showcase(uid: $uid) { uid nickname level avatarUrl characters } }`;
export const GET_WEAPONS = `query GetWeapons { weapons { id nameEn nameVi rarity type baseAtk subStat subStatValue passiveNameEn passiveNameVi passiveDescEn passiveDescVi iconUrl } }`;
export const GET_WEAPON_BY_ID = `query GetWeapon($id: String!) { weapon(id: $id) { id nameEn nameVi rarity type baseAtk subStat subStatValue passiveNameEn passiveNameVi passiveDescEn passiveDescVi iconUrl } }`;
export const GET_CHARACTERS_BY_WEAPON_TYPE = `query GetCharactersByWeaponType($weaponType: String!) { charactersByWeaponType(weaponType: $weaponType) { id nameEn nameVi element rarity avatarUrl weapon } }`;
export const GET_ARTIFACTS = `query GetArtifacts { artifacts { id nameEn nameVi rarityList piece2DescEn piece2DescVi piece4DescEn piece4DescVi iconUrl } }`;
export const GET_ARTIFACT_SET = `query GetArtifactSet($id: String!) { artifactSet(id: $id) { id nameEn nameVi rarityList piece2DescEn piece2DescVi piece4DescEn piece4DescVi iconUrl } }`;

