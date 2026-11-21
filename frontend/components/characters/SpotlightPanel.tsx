import type { CSSProperties, ReactNode } from 'react';
import { Compass, Shield, Star, Swords } from 'lucide-react';
import SpotlightArtwork from './SpotlightArtwork';
import MotionDepth from '@/components/shared/MotionDepth';
import ElementIcon from '@/components/ui/ElementIcon';

const accents: Record<string, [string, string]> = {
  Pyro: ['#df6d55', '#fbb36c'],
  Hydro: ['#407dcb', '#72d4eb'],
  Anemo: ['#329d87', '#90e1ca'],
  Electro: ['#8656c8', '#c5a7f5'],
  Cryo: ['#589dcc', '#beadf1'],
  Dendro: ['#679c49', '#b0d97e'],
  Geo: ['#c28c3e', '#efd18d'],
};

export interface SpotlightCharacter {
  element: string;
  weapon?: string;
  region?: string;
  rarity: number;
  splashArtUrl?: string;
  avatarUrl?: string;
}

export default function SpotlightPanel({
  character, name, title, locale, headingId, compact = false, actions, meta, children,
}: {
  character: SpotlightCharacter;
  name: string;
  title?: string;
  locale: string;
  headingId?: string;
  compact?: boolean;
  actions?: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
}) {
  const [accent, light] = accents[character.element] || ['#86749e', '#c8bbd8'];
  const art = character.splashArtUrl || character.avatarUrl;
  const vi = locale === 'vi';
  const Heading = compact ? 'h2' : 'h1';
  const facts = [
    { element: true, label: vi ? 'Nguyên tố' : 'Element', value: character.element === 'None' ? '' : character.element, icon: Shield },
    { label: vi ? 'Vũ khí' : 'Weapon', value: character.weapon, icon: Swords },
    { label: vi ? 'Khu vực' : 'Region', value: character.region, icon: Compass },
    { label: vi ? 'Độ hiếm' : 'Rarity', value: character.rarity > 0 ? `${character.rarity} ${vi ? 'sao' : 'stars'}` : '', icon: Star },
  ].filter(fact => fact.value);

  return (
    <section className={`character-spotlight-panel${compact ? ' character-spotlight-compact' : ''}`}
      aria-labelledby={headingId}
      style={{ '--spotlight-accent': accent, '--spotlight-light': light } as CSSProperties}>
      <MotionDepth className="character-spotlight-stage">
        <div key={name} className="character-spotlight-copy">
          {character.rarity > 0 && (
            <div className="character-spotlight-stars" aria-hidden="true">
              {Array.from({ length: character.rarity }, (_, index) => (
                <Star key={index} size={17} fill="currentColor" style={{ '--motion-delay': `${index * 50}ms` } as CSSProperties} />
              ))}
            </div>
          )}
          <Heading id={headingId} className="character-spotlight-name">{name}</Heading>
          {title && <p className="character-spotlight-title">{title}</p>}
          {children}
          {actions && <div className="character-spotlight-actions">{actions}</div>}
        </div>
        <div className="character-spotlight-art">
          <div key={`orbit-${character.element}-${name}`} className="character-spotlight-orbit" aria-hidden="true" />
          <SpotlightArtwork src={art || ''} fallback={character.avatarUrl} name={name} />
        </div>
      </MotionDepth>
      {facts.length > 0 && (
        <dl key={name} className="character-spotlight-facts">
          {facts.map(({ element, label, value, icon: Icon }) => (
            <div key={label}>
              {element && accents[character.element] ? (
                <ElementIcon element={character.element} />
              ) : <Icon size={21} aria-hidden="true" />}
              <div><dt>{label}</dt><dd>{value}</dd></div>
            </div>
          ))}
        </dl>
      )}
      {!compact && meta && <div className="character-spotlight-meta-bar">{meta}</div>}
    </section>
  );
}
