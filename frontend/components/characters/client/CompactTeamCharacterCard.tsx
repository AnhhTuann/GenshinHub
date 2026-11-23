import type { CSSProperties } from 'react';
import { UserRound } from 'lucide-react';
import { Link } from '@/i18n/routing';
import ElementIcon from '@/components/ui/ElementIcon';
import FallbackImage from '@/components/ui/FallbackImage';

const elements = ['pyro', 'hydro', 'anemo', 'electro', 'cryo', 'dendro', 'geo'];

interface Props {
  characterId: string;
  name: string;
  avatar?: string;
  element?: string;
  role?: string;
}

export default function CompactTeamCharacterCard({ characterId, name, avatar, element, role }: Props) {
  const tone = element?.toLowerCase();
  const accent = tone && elements.includes(tone) ? `var(--${tone})` : 'var(--accent-primary)';

  return (
    <Link href={`/characters/${characterId}`} className="team-member-card" style={{ '--team-element': accent } as CSSProperties}>
      <div className="team-member-art">
        {avatar ? (
          <FallbackImage src={avatar} alt="" fill sizes="(max-width: 639px) 45vw, 22vw" className="team-member-portrait" />
        ) : (
          <UserRound className="team-member-placeholder" aria-hidden="true" />
        )}
        {element && <ElementIcon element={element} label={element} className="team-member-element" />}
      </div>
      <div className="team-member-copy">
        <span className="team-member-name">{name}</span>
        {role && <span className="team-member-role">{role}</span>}
      </div>
    </Link>
  );
}
