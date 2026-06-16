import { routing } from '@/i18n/routing';
import { fetchGraphQL, GET_CHARACTERS, GET_ARTIFACTS, GET_WEAPONS } from '@/lib/graphql';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function Sitemap() {
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

  const routes = pages.flatMap((page) =>
    locales.map((locale) => {
      const path = page ? `/${locale}/${page}` : `/${locale}`;
      return `<url><loc>${baseUrl}${path}</loc><changefreq>weekly</changefreq><priority>0.80</priority></url>`;
    })
  );

  const characterUrls = characters.flatMap((character: any) =>
    locales.map((locale) =>
      `<url><loc>${baseUrl}/${locale}/characters/${character.id}</loc><changefreq>monthly</changefreq><priority>0.65</priority></url>`
    )
  );

  const artifactUrls = artifacts.flatMap((artifact: any) =>
    locales.map((locale) =>
      `<url><loc>${baseUrl}/${locale}/artifacts/${artifact.id}</loc><changefreq>monthly</changefreq><priority>0.65</priority></url>`
    )
  );

  const weaponUrls = weapons.flatMap((weapon: any) =>
    locales.map((locale) =>
      `<url><loc>${baseUrl}/${locale}/weapons/${weapon.id}</loc><changefreq>monthly</changefreq><priority>0.65</priority></url>`
    )
  );

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...routes, ...characterUrls, ...artifactUrls, ...weaponUrls].join('\n')}
</urlset>`, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
