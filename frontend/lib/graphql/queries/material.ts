// Material-related GraphQL queries

export const GET_MATERIALS = `
  query GetMaterials {
    materials {
      id nameEn nameVi type rarity iconUrl
    }
  }
`;
