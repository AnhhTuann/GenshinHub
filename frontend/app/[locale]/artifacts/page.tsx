import { fetchGraphQL, GET_ARTIFACTS } from '@/lib/graphql';
import { Metadata } from 'next';
import ArtifactsClient from './ArtifactsClient';

export const metadata: Metadata = {
  title: 'Artifacts - GenshinHub',
  description: 'Browse all artifact sets in Genshin Impact - 2-piece and 4-piece effects, and rarities.',
};

export default async function ArtifactsPage() {
  const data = await fetchGraphQL(GET_ARTIFACTS);
  const artifacts = data.artifacts || [];
  return <ArtifactsClient artifacts={artifacts} />;
}
