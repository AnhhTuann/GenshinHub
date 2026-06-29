const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql';

// Default ISR revalidation time (5 minutes) for server-side fetches
const DEFAULT_REVALIDATE = 300;

/**
 * Server-side GraphQL fetch with ISR revalidation.
 * Use this in Server Components for data that can be cached.
 */
export async function fetchGraphQL(query: string, variables = {}, revalidate: number = DEFAULT_REVALIDATE) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  // Attach admin key if running in the browser (client component context)
  if (typeof window !== 'undefined') {
    const adminKey = localStorage.getItem('admin_key');
    if (adminKey) {
      headers['x-admin-key'] = adminKey;
    }
  }

  const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  };

  // Apply ISR revalidation for server-side fetches
  if (typeof window === 'undefined') {
    fetchOptions.next = { revalidate };
  }

  const res = await fetch(GRAPHQL_ENDPOINT, fetchOptions);
  const json = await res.json();

  if (json.errors) {
    console.error('GraphQL Errors:', JSON.stringify(json.errors, null, 2));
    const errorMessage = json.errors[0].message;
    if (errorMessage.includes('Unauthorized')) {
      throw new Error('Bạn chưa đăng nhập Admin! Hãy click nút "⚙️ Admin" ở góc phải bên dưới và nhập mật khẩu.');
    }
    throw new Error('GraphQL Error: ' + errorMessage);
  }
  if (!json.data) {
    console.error('GraphQL Missing Data Response:', JSON.stringify(json, null, 2));
    return {};
  }
  return json.data;
}

/**
 * Client-side GraphQL fetch with no caching.
 * Use this in Client Components for mutations and fresh data.
 */
export async function fetchGraphQLClient(query: string, variables = {}) {
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
    cache: 'no-store',
  });
  const json = await res.json();

  if (json.errors) {
    console.error('GraphQL Errors:', JSON.stringify(json.errors, null, 2));
    const errorMessage = json.errors[0].message;
    if (errorMessage.includes('Unauthorized')) {
      throw new Error('Bạn chưa đăng nhập Admin! Hãy click nút "⚙️ Admin" ở góc phải bên dưới và nhập mật khẩu.');
    }
    throw new Error('GraphQL Error: ' + errorMessage);
  }
  if (!json.data) {
    console.error('GraphQL Missing Data Response:', JSON.stringify(json, null, 2));
    return {};
  }
  return json.data;
}

// ── Queries ──────────────────────────────────────────────

export const GET_CHARACTERS = `
  query GetCharacters {
    characters {
      id nameEn nameVi element rarity avatarUrl splashArtUrl
      weapon region birthday tier role recommendedC
      tierNoteEn tierNoteVi
      teams {
        id name rank description order
        members {
          characterId role roleDesc weapons artifacts substats
        }
      }
    }
  }
`;

export const GET_CHARACTER_BY_ID = `
  query GetCharacterById($id: String!) {
    character(id: $id) {
      id nameEn nameVi titleEn titleVi rarity element weapon region
      birthday avatarUrl splashArtUrl descriptionEn descriptionVi
      baseHp baseAtk baseDef fandomUrl talentPriority
      signatureWeapons { id nameEn nameVi iconUrl }
      teams {
        id name rank description
        members { id characterId role roleDesc weapons artifacts substats }
      }
      tier role recommendedC tierNoteEn tierNoteVi
      bestWeapons {
        id nameEn nameVi rank isF2P iconUrl subStat
        passiveDescEn passiveDescVi refinement rarity
      }
      bestArtifacts {
        id setNameEn setNameVi pieces sands goblet circlet
        subStatsPriority rarity iconUrl artifactSetId
        mixSets { nameEn nameVi iconUrl artifactSetId }
      }
      stats ascensionMats talentMats
    }
  }
`;

export const GET_TIER_RANKS = `
  query GetTierRanks {
    tierRanks {
      id name order colorBase
    }
  }
`;

export const GET_SHOWCASE = `
  query GetShowcase($uid: String!) {
    showcase(uid: $uid) {
      uid
      nickname
      level
      avatarUrl
      characters
      detailedCharacters
    }
  }
`;

export const GET_WEAPONS = `
  query GetWeapons {
    weapons {
      id nameEn nameVi rarity type baseAtk subStat subStatValue
      passiveNameEn passiveNameVi passiveDescEn passiveDescVi iconUrl tier role
    }
  }
`;

export const GET_WEAPON_BY_ID = `
  query GetWeapon($id: String!) {
    weapon(id: $id) {
      id nameEn nameVi rarity type baseAtk subStat subStatValue
      passiveNameEn passiveNameVi passiveDescEn passiveDescVi iconUrl
    }
  }
`;

export const GET_CHARACTERS_BY_WEAPON_TYPE = `
  query GetCharactersByWeaponType($weaponType: String!) {
    charactersByWeaponType(weaponType: $weaponType) {
      id nameEn nameVi element rarity avatarUrl weapon
    }
  }
`;

export const GET_ARTIFACTS = `
  query GetArtifacts {
    artifacts {
      id nameEn nameVi rarityList
      piece2DescEn piece2DescVi piece4DescEn piece4DescVi iconUrl
    }
  }
`;

export const GET_ARTIFACT_SET = `
  query GetArtifactSet($id: String!) {
    artifactSet(id: $id) {
      id nameEn nameVi rarityList
      piece2DescEn piece2DescVi piece4DescEn piece4DescVi iconUrl
    }
  }
`;

export const GET_MATERIALS = `
  query GetMaterials {
    materials {
      id nameEn nameVi type rarity iconUrl
    }
  }
`;

// ── Mutations ──────────────────────────────────────────────

export const UPDATE_CHARACTER_TIER_LIST = `
  mutation UpdateCharacterTierList(
    $id: String!, $tier: String, $role: String,
    $recommendedC: String, $tierNoteEn: [String!], $tierNoteVi: [String!]
  ) {
    updateCharacterTierList(
      id: $id, tier: $tier, role: $role,
      recommendedC: $recommendedC, tierNoteEn: $tierNoteEn, tierNoteVi: $tierNoteVi
    ) { id tier role recommendedC tierNoteEn tierNoteVi }
  }
`;

export const UPDATE_WEAPON_TIER_LIST = `
  mutation UpdateWeaponTierList($id: String!, $tier: String, $role: String) {
    updateWeaponTierList(id: $id, tier: $tier, role: $role) { id tier role }
  }
`;

export const ADD_TIER_RANK = `
  mutation AddTierRank($name: String!, $colorBase: String!) {
    addTierRank(name: $name, colorBase: $colorBase) { id name order colorBase }
  }
`;

export const UPDATE_TIER_RANK = `
  mutation UpdateTierRank($id: String!, $name: String, $colorBase: String) {
    updateTierRank(id: $id, name: $name, colorBase: $colorBase) { id name order colorBase }
  }
`;

export const DELETE_TIER_RANK = `
  mutation DeleteTierRank($id: String!) {
    deleteTierRank(id: $id)
  }
`;

export const REORDER_TIER_RANKS = `
  mutation ReorderTierRanks($tierIds: [String!]!) {
    reorderTierRanks(tierIds: $tierIds)
  }
`;

export const REORDER_TEAMS = `
  mutation ReorderTeams($teamIds: [String!]!) {
    reorderCharacterTeams(teamIds: $teamIds)
  }
`;

export const REORDER_WEAPONS = `
  mutation ReorderWeapons($weaponIds: [String!]!) {
    reorderCharacterWeapons(weaponIds: $weaponIds)
  }
`;

export const REORDER_ARTIFACTS = `
  mutation ReorderArtifacts($artifactIds: [String!]!) {
    reorderCharacterArtifacts(artifactIds: $artifactIds)
  }
`;

export const GENERATE_CHARACTER_AI = `
  mutation GenerateCharacterAI($nameEn: String!) {
    generateCharacterAI(nameEn: $nameEn) {
      id nameEn
    }
  }
`;
