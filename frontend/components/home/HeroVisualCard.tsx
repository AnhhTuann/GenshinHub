"use client";

import MotionDepth from '@/components/shared/MotionDepth';
import { Link } from '@/i18n/routing';
import { ArrowUpRight, Compass } from 'lucide-react';
import FallbackImage from '@/components/ui/FallbackImage';
import ElementIcon from '@/components/ui/ElementIcon';

const ELEMENTS = ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];

export default function HeroVisualCard({ locale }: { locale: string }) {
  const en = locale === 'en';
  return (
    <MotionDepth className="home-visual-motion atlas-teyvat">
      <div className="atlas-teyvat-header">
        <Compass size={20} aria-hidden="true" />
        <span>{en ? 'Teyvat Archive' : 'Thư viện Teyvat'}</span>
      </div>
      <div className="atlas-teyvat-compass home-visual-orbit">
        <div className="atlas-teyvat-portrait">
          <FallbackImage src="/logo.webp" alt="Paimon" fill priority sizes="160px" className="object-cover" />
        </div>
      </div>
      <div className="atlas-teyvat-title">
        <h2>Teyvat</h2>
        <p>{en ? 'Seven nations · Living encyclopedia' : 'Bảy quốc gia · Cẩm nang toàn thư'}</p>
      </div>
      <ul className="atlas-teyvat-elements">
        {ELEMENTS.map(element => (
          <li key={element} title={element}><ElementIcon element={element} label={element} /></li>
        ))}
      </ul>
      <Link href="/characters" className="home-text-link atlas-teyvat-link">
        {en ? 'Explore' : 'Khám phá'} <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
    </MotionDepth>
  );
}
