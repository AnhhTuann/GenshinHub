import { routing } from '@/i18n/routing';
import { fetchGraphQL, GET_CHARACTERS } from '@/lib/graphql';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function Sitemap() {
  const data = await fetchGraphQL(GET_CHARACTERS);
  const characters = data.characters || [];
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

  const characterUrls = characters.map((character: any) =>
    locales.map((locale) =>
      `<url><loc>${baseUrl}/${locale}/characters/${character.id}</loc><changefreq>monthly</changefreq><priority>0.65</priority></url>`
    )
  ).flat();

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...routes, ...characterUrls].join('\n')}
</urlset>`, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
