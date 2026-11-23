"use client";

import { useCallback, useMemo, useSyncExternalStore } from 'react';
import MotionRevealGroup from '@/components/shared/MotionRevealGroup';
import TierCharacterCard from './TierCharacterCard';
import styles from './TierList.module.css';
import {
  getVerifiedRoles,
  hasRole,
  VERIFIED_ROLES,
  UNRANKED_TIER_NAME,
  type Role,
  type TierDefinition,
} from '@/data/tierRanks';
import type { TierCharacter } from './types';

const COPY = {
  vi: {
    note: 'Dữ liệu Admin lưu một tier tổng quát cho mỗi nhân vật. Nhân vật nhiều vai trò xuất hiện lại ở từng cột với cùng tier đó; hiện chưa có tier riêng theo từng vai trò.',
    emptyCell: 'Trống',
    emptyAll: 'Không có nhân vật khớp bộ lọc hiện tại. Hãy đổi Element, Rarity hoặc Search.',
    pendingTitle: 'Pending Review — chưa có vai trò hợp lệ',
    pendingDesc: 'Các bản ghi này không có role được xác minh. Không tự suy luận từ nguyên tố, vũ khí hay độ hiếm; cần Admin phân loại.',
    pendingEmpty: 'Không có bản ghi chờ phân loại.',
  },
  en: {
    note: 'Admin data stores one general tier per character. Multi-role characters reappear in each matching column with that same tier; per-role tiers are not available yet.',
    emptyCell: 'Empty',
    emptyAll: 'No characters match the current filters. Try changing Element, Rarity or Search.',
    pendingTitle: 'Pending Review — no verified role',
    pendingDesc: 'These records have no verified role. Roles are not inferred from element, weapon or rarity; Admin classification is required.',
    pendingEmpty: 'No records awaiting classification.',
  },
} as const;

function subscribeToWideLayout(onChange: () => void) {
  const query = window.matchMedia('(min-width: 1200px)');
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

const getWideSnapshot = () => window.matchMedia('(min-width: 1200px)').matches;
const getWideServerSnapshot = () => false;

export default function CharacterTierBoard({
  characters,
  tierRows,
  role,
  onRoleChange,
  locale,
}: {
  characters: TierCharacter[];
  tierRows: TierDefinition[];
  role: string;
  onRoleChange: (role: string) => void;
  locale: string;
}) {
  const isWide = useSyncExternalStore(subscribeToWideLayout, getWideSnapshot, getWideServerSnapshot);
  const copy = COPY[locale as 'vi' | 'en'] ?? COPY.en;

  // Desktop: "All" means three parallel columns. Narrow screens always use the
  // role tabs and show one role at a time (Main DPS by default).
  const effectiveRole: Role = role === 'All' ? 'Main DPS' : role as Role;
  const viewRoles: Role[] = isWide
    ? (role === 'All' ? [...VERIFIED_ROLES] : [effectiveRole])
    : [effectiveRole];

  const { assigned, pending } = useMemo(() => {
    const withRole: TierCharacter[] = [];
    const needsReview: TierCharacter[] = [];
    characters.forEach((character) => {
      if (getVerifiedRoles(character.role).length > 0) withRole.push(character);
      else needsReview.push(character);
    });
    return { assigned: withRole, pending: needsReview };
  }, [characters]);

  const tierKey = (character: TierCharacter) => character.tier || UNRANKED_TIER_NAME;

  const cardsFor = (tierName: string, roleName: Role) =>
    assigned.filter((character) => tierKey(character) === tierName && hasRole(character.role, roleName));

  const visibleRows = useMemo(
    () => tierRows.filter((row) => assigned.some((character) => tierKey(character) === row.name)),
    [tierRows, assigned],
  );

  const boardView = isWide && role === 'All' ? 'all' : 'single';

  return (
    <div className={styles.characterBoard} data-view={boardView}>
      {!isWide && (
        <div className={styles.roleTabs} role="tablist" aria-label={locale === 'vi' ? 'Vai trò nhân vật' : 'Character role'}>
          {VERIFIED_ROLES.map((roleName) => (
            <button
              key={roleName}
              type="button"
              role="tab"
              aria-selected={effectiveRole === roleName}
              className={styles.roleTab}
              onClick={() => onRoleChange(roleName)}
            >
              {roleName}
            </button>
          ))}
        </div>
      )}

      <p className={styles.roleDataNote}>{copy.note}</p>

      {isWide && (
        <div className={styles.roleHeader} aria-hidden="true">
          <span />
          {viewRoles.map((roleName) => (
            <span key={roleName} className={styles.roleHeaderCell}>{roleName}</span>
          ))}
        </div>
      )}

      {visibleRows.length === 0 ? (
        <div className={styles.emptyState} role="status">{copy.emptyAll}</div>
      ) : (
        <MotionRevealGroup
          key={`character-${role}-${locale}-${visibleRows.map((row) => row.name).join('-')}`}
          className={styles.characterTierList}
        >
          {visibleRows.map((tier) => {
            const uniqueCount = assigned.filter((character) => tierKey(character) === tier.name).length;
            return (
              <section
                key={tier.id}
                className={styles.characterTierRow}
                data-motion-row
                data-tier={tier.name}
                aria-label={`${tier.name}: ${uniqueCount}`}
              >
                <div className={styles.tierLabel}>
                  <span className={styles.tierName}>{tier.name === UNRANKED_TIER_NAME ? '?' : tier.name}</span>
                  <span className={styles.tierCount}>{uniqueCount} chars</span>
                </div>
                {viewRoles.map((roleName) => {
                  const items = cardsFor(tier.name, roleName);
                  return (
                    <div key={roleName} className={styles.roleCell} data-role={roleName}>
                      {items.length > 0 ? (
                        <div className={styles.roleCardGrid}>
                          {items.map((character) => (
                            <TierCharacterCard
                              key={(character as any).rankingId ?? character.id}
                              item={character}
                              locale={locale}
                              tierLabel={tier.name}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className={styles.roleEmpty}>{copy.emptyCell}</div>
                      )}
                    </div>
                  );
                })}
              </section>
            );
          })}
        </MotionRevealGroup>
      )}

      {pending.length > 0 && (
        <section className={styles.pendingSection} aria-label={copy.pendingTitle}>
          <div className={styles.pendingHeading}>
            <h2>{copy.pendingTitle}</h2>
            <span>{pending.length}</span>
          </div>
          <p className={styles.pendingDesc}>{copy.pendingDesc}</p>
          <div className={styles.pendingGrid}>
            {pending.map((character) => (
              <TierCharacterCard
                key={(character as any).rankingId ?? character.id}
                item={character}
                locale={locale}
                tierLabel={UNRANKED_TIER_NAME}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
