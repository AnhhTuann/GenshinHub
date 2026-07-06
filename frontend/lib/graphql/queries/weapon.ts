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
