import { Link } from '@/i18n/routing';
import ElementIcon from '@/components/ui/ElementIcon';
import FallbackImage from '@/components/ui/FallbackImage';
import styles from './TierList.module.css';
import type { TierCharacter } from './types';

export default function TierCharacterCard({
  item,
  locale,
  tierLabel,
}: {
  item: TierCharacter;
  locale: string;
  tierLabel: string;
}) {
  const name = locale === 'vi' ? item.nameVi || item.nameEn : item.nameEn;
  const note = locale === 'vi' ? item.tierNoteVi?.[0] : item.tierNoteEn?.[0];
  const detail = [note, item.recommendedC ? `C${item.recommendedC.replace(/^C/, '')}` : '', item.role || '']
    .filter(Boolean)
    .join(' · ');
  const tier = item.tier || tierLabel;

  return (
    <Link
      href={`/characters/${item.id}`}
      className={styles.card}
      data-rarity={item.rarity}
      title={detail || name}
      aria-label={`${name} — ${tier}${detail ? `, ${detail}` : ''}`}
    >
      <span className={styles.portrait}>
        <FallbackImage
          src={item.avatarUrl || '/logo.webp'}
          alt={name}
          fill
          sizes="(max-width: 640px) 84px, 96px"
          className={styles.characterArt}
        />
        {item.element && (
          <span className={styles.elementBadge} title={item.element}>
            <ElementIcon element={item.element} label={item.element} />
          </span>
        )}
      </span>
      <span className={styles.cardBody}>
        <span className={styles.cardName}>{name}</span>
        <span className={styles.cardMeta}>
          <span className={styles.stars} data-rarity={item.rarity} aria-label={`${item.rarity} star`}>
            {'★'.repeat(Math.max(0, Math.min(item.rarity, 5)))}
          </span>
        </span>
      </span>
    </Link>
  );
}
