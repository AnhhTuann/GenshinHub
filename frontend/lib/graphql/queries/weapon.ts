// Weapon-related GraphQL queries & mutations

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

export const GET_WEAPON_GAME_DATA = `
  query GetWeaponGameData($id: String!) {
    weaponGameData(id: $id) {
      id sourceId nameEn weaponType weaponText rarity description passiveName
      mainStatType mainStatText version
      levels { level ascension label phase baseAtk subStatValue subStatDisplay }
      refinements { rank description values }
      ascension { key label mora items { materialId nameEn count } }
    }
  }
`;

export const GET_WEAPON_RECOMMENDED_USERS = `
  query GetWeaponRecommendedUsers($id: String!) {
    weaponRecommendedUsers(id: $id) {
      id nameEn nameVi element rarity avatarUrl tier role rank isF2P
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

export const UPDATE_WEAPON_TIER_LIST = `
  mutation UpdateWeaponTierList($id: String!, $tier: String, $role: String) {
    updateWeaponTierList(id: $id, tier: $tier, role: $role) { id tier role }
  }
`;
