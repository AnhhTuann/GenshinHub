// Artifact-related GraphQL queries

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
