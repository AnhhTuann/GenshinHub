// Character-related GraphQL queries

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
        id setNameEn setNameVi pieces
        rarity iconUrl artifactSetId
        mixSets { nameEn nameVi iconUrl artifactSetId }
      }
      stats ascensionMats talentMats
      sands goblet circlet subStatsPriority
    }
  }
`;

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
