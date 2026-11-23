import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { fetchGraphQL, GET_CHARACTERS, GET_ARTIFACTS, GET_WEAPONS } from '@/lib/graphql';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Sitemap queries require the live GraphQL API. Building without a backend
// must not hang or fail prerendering on Vercel.
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Gracefully include the static navigation URLs when the API is offline.
  const [charactersResult, artifactsResult, weaponsResult] = await Promise.allSettled([
    fetchGraphQL(GET_CHARACTERS),
    fetchGraphQL(GET_ARTIFACTS),
    fetchGraphQL(GET_WEAPONS),
  ]);

  const characters = charactersResult.status === 'fulfilled' ? (charactersResult.value.characters || []) : [];
  const artifacts = artifactsResult.status === 'fulfilled' ? (artifactsResult.value.artifacts || []) : [];
  const weapons = weaponsResult.status === 'fulfilled' ? (weaponsResult.value.weapons || []) : [];
  const locales = routing.locales;

  const pages = [
    '',
    'weapons',
    'artifacts',
    'characters',
    'teams',
    'banners',
    'tcg',
    'showcase',
    'tierlist',
  ];

  const routes: MetadataRoute.Sitemap = pages.flatMap((page) =>
    locales.map((locale) => {
      const path = page ? `/${locale}/${page}` : `/${locale}`;
      return {
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      };
    })
  );

  const characterUrls: MetadataRoute.Sitemap = characters.flatMap((character: any) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/characters/${character.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.65,
    }))
  );

  const artifactUrls: MetadataRoute.Sitemap = artifacts.flatMap((artifact: any) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/artifacts/${artifact.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.65,
    }))
  );

  const weaponUrls: MetadataRoute.Sitemap = weapons.flatMap((weapon: any) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/weapons/${weapon.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.65,
    }))
  );

  return [...routes, ...characterUrls, ...artifactUrls, ...weaponUrls];
}
