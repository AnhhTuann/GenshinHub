import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { fetchGraphQL, GET_ARTIFACT_SET, GET_ARTIFACTS } from '@/lib/graphql';
import ArtifactDetailClient from './ArtifactDetailClient';

export async function generateStaticParams() {
  const data = await fetchGraphQL(GET_ARTIFACTS);
  return (data.artifacts || []).map((art: any) => ({ id: art.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
  const { id, locale } = await params;
  const data = await fetchGraphQL(GET_ARTIFACT_SET, { id });
  const set = data.artifactSet;
  if (!set) return { title: 'Artifact Set Not Found' };
  const name = locale === 'en' ? set.nameEn : set.nameVi;
  return {
    title: `${name} - GenshinHub`,
    description: `Artifact Set: ${name}. 2-Piece: ${locale === 'en' ? set.piece2DescEn : set.piece2DescVi || 'None'}. 4-Piece: ${locale === 'en' ? set.piece4DescEn : set.piece4DescVi || 'None'}`,
  };
}

export default async function ArtifactDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;
  setRequestLocale(locale);

  const data = await fetchGraphQL(GET_ARTIFACT_SET, { id });
  const artifactSet = data.artifactSet;
  if (!artifactSet) notFound();

  // Fetch all characters with their artifacts to find who uses this set
  const charsData = await fetchGraphQL(`
    query GetCharactersWithArtifacts {
      characters {
        id
        nameEn
        nameVi
        element
        rarity
        avatarUrl
        bestArtifacts {
          setNameEn
          setNameVi
          artifactSetId
        }
      }
    }
  `);

  const allCharacters = charsData.characters || [];
  
  // Filter characters using this artifact set
  const characters = allCharacters.filter((char: any) =>
    char.bestArtifacts?.some(
      (art: any) => art.artifactSetId === id || 
        art.setNameEn?.toLowerCase() === artifactSet.nameEn?.toLowerCase() ||
        art.setNameVi?.toLowerCase() === artifactSet.nameVi?.toLowerCase()
    )
  ).map((char: any) => ({
    id: char.id,
    nameEn: char.nameEn,
    nameVi: char.nameVi,
    element: char.element,
    rarity: char.rarity,
    avatarUrl: char.avatarUrl,
  }));

  return <ArtifactDetailClient artifactSet={artifactSet} characters={characters} />;
}
