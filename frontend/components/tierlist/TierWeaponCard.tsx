import { Link } from '@/i18n/routing';
import FallbackImage from '@/components/ui/FallbackImage';
import styles from './TierList.module.css';
import type { TierWeapon } from './types';

export default function TierWeaponCard({
  item,
  locale,
  tierLabel,
  typeLabel,
}: {
  item: TierWeapon;
  locale: string;
  tierLabel: string;
  typeLabel: string;
}) {
  const name = locale === 'vi' ? item.nameVi || item.nameEn : item.nameEn;
  const tier = item.tier || tierLabel;

  return (
    <Link
      href={`/weapons/${item.id}`}
      className={styles.card}
      data-rarity={item.rarity}
      title={`${name} · ${typeLabel}${item.role ? ` · ${item.role}` : ''}`}
      aria-label={`${name} — ${tier}, ${typeLabel}`}
    >
      <span className={styles.portrait}>
        <FallbackImage
          src={item.iconUrl || '/logo.webp'}
          alt={name}
          fill
          sizes="(max-width: 640px) 84px, 96px"
          className={styles.weaponArt}
        />
        <span className={styles.tierBadge} data-tier={tier}>
          {tier === 'Unranked' ? '?' : tier}
        </span>
      </span>
      <span className={styles.cardBody}>
        <span className={styles.cardName}>{name}</span>
        <span className={styles.cardMeta}>
          <span className={styles.stars} data-rarity={item.rarity} aria-label={`${item.rarity} star`}>
            {'★'.repeat(Math.max(0, Math.min(item.rarity, 5)))}
          </span>
          <span className={styles.roleHint}>{typeLabel}</span>
        </span>
      </span>
    </Link>
  );
}
