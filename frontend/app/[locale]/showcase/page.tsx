import type { Metadata } from 'next';
import ShowcaseClient from './ShowcaseClient';

export const metadata: Metadata = {
  title: 'Showcase - GenshinHub',
  description: 'Search player showcases and explore character builds from the Enka.Network API in GenshinHub.',
  openGraph: {
    title: 'Showcase - GenshinHub',
    description: 'Search player showcases and explore character builds from the Enka.Network API in GenshinHub.',
    images: ['/icon.webp'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Showcase - GenshinHub',
    description: 'Search player showcases and explore character builds from the Enka.Network API in GenshinHub.',
    images: ['/icon.webp'],
  },
};

export default function ShowcasePage() {
  return <ShowcaseClient />;
}
