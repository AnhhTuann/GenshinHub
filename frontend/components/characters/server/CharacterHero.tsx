import { Link } from '@/i18n/routing';
import { CakeSlice, ExternalLink } from 'lucide-react';
import AdminEditableSplash from '@/components/AdminEditableSplash';
import ShareButton from '@/components/ShareButton';
import SpotlightPanel, { type SpotlightCharacter } from '@/components/characters/SpotlightPanel';

type HeroCharacter = SpotlightCharacter & {
  id: string;
  baseHp?: number;
  baseAtk?: number;
  baseDef?: number;
  birthday?: string;
  fandomUrl?: string;
};

export default function CharacterHero({
  character, name, title, description, baseStatsLabel, statLabels, locale, backLabel,
}: {
  character: HeroCharacter;
  name: string;
  title: string;
  description?: string;
  baseStatsLabel: string;
  statLabels: { hp: string; atk: string; def: string };
  locale: string;
  backLabel: string;
}) {
  const vi = locale === 'vi';
  const stats = [
    { label: statLabels.hp, value: character.baseHp },
    { label: statLabels.atk, value: character.baseAtk },
    { label: statLabels.def, value: character.baseDef },
  ].filter(stat => stat.value);

  const meta = (
    <div className="character-spotlight-meta">
      <span className="character-spotlight-meta-item">
        <CakeSlice size={15} aria-hidden="true" />
        <span>{vi ? 'Sinh nhật' : 'Birthday'}</span>
        <strong>{character.birthday || '—'}</strong>
      </span>
      {character.fandomUrl && (
        <a href={character.fandomUrl} target="_blank" rel="noopener noreferrer"
          className="character-spotlight-meta-link home-text-link">
          Fandom Wiki <ExternalLink size={13} aria-hidden="true" />
        </a>
      )}
    </div>
  );

  return (
    <div className="character-detail-spotlight">
      <div className="character-detail-tools">
        <Link href="/characters" className="fantasy-action">‹ {backLabel}</Link>
        <ShareButton title={`${name} Build - GenshinHub`} />
      </div>
      <AdminEditableSplash characterId={character.id}>
        <SpotlightPanel character={character} name={name} title={title} locale={locale} headingId="character-spotlight-heading"
          meta={meta}
          actions={<a href="#character-build" className="fantasy-action fantasy-action-primary">{vi ? 'Xem bản build' : 'Explore build'}</a>}>
          {description && (
            <p className="character-spotlight-description">{description}</p>
          )}
          {stats.length > 0 && (
            <div className="character-spotlight-stats-wrap">
              <p className="character-spotlight-stats-caption">{baseStatsLabel}</p>
              <dl className="character-spotlight-stats">
                {stats.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value?.toLocaleString(locale)}</dd></div>)}
              </dl>
            </div>
          )}
        </SpotlightPanel>
      </AdminEditableSplash>
    </div>
  );
}
