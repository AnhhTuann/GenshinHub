import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { fetchGraphQL, GET_CHARACTERS, GET_ARTIFACTS, GET_WEAPONS } from '@/lib/graphql';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [charactersData, artifactsData, weaponsData] = await Promise.all([
    fetchGraphQL(GET_CHARACTERS),
    fetchGraphQL(GET_ARTIFACTS),
    fetchGraphQL(GET_WEAPONS),
  ]);

  const characters = charactersData.characters || [];
  const artifacts = artifactsData.artifacts || [];
  const weapons = weaponsData.weapons || [];
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
