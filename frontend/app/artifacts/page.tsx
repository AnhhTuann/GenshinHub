import { fetchGraphQL, GET_ARTIFACTS } from '@/lib/graphql';
import { Metadata } from 'next';
import ArtifactsClient from './ArtifactsClient';

export const metadata: Metadata = {
  title: 'Thánh Di Vật - TeyvatDB',
  description: 'Tra cứu toàn bộ bộ Thánh Di Vật trong Genshin Impact - hiệu ứng 2 mảnh, 4 mảnh và độ hiếm.',
};

export default async function ArtifactsPage() {
  const data = await fetchGraphQL(GET_ARTIFACTS);
  const artifacts = data.artifacts || [];
  return <ArtifactsClient artifacts={artifacts} />;
}
