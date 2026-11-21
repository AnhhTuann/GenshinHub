"use client";

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import MotionRevealGroup from '@/components/shared/MotionRevealGroup';
import CharacterTierBoard from '@/components/tierlist/CharacterTierBoard';
import TierWeaponCard from '@/components/tierlist/TierWeaponCard';
import styles from '@/components/tierlist/TierList.module.css';
import { hasRole, resolveTierRows, UNRANKED_TIER_NAME, type AdminTierRank } from '@/data/tierRanks';
import type {
  TierCharacter,
  TierWeapon,
  ApprovedCharacterRanking,
  ApprovedWeaponRanking,
} from '@/components/tierlist/types';

const COPY = {
  vi: {
    source: 'Nguồn: xếp hạng đã được Admin phê duyệt (APPROVED + INDEPENDENT)',
    version: 'Phiên bản game: {version}',
    methodTitle: 'Phương pháp xếp hạng',
    method: [
      'Hiệu quả trong đúng vai trò được đánh giá (Main DPS / Sub DPS / Support).',
      'Sức mạnh trong đội hình hợp lệ, kể cả điều kiện năng lượng và rotation.',
      'Khả năng duy trì sát thương hoặc hỗ trợ trong thời gian dài.',
      'Tính linh hoạt giữa nhiều đội hình, nguyên tố và nội dung endgame.',
      'Điều kiện đầu tư: giả định C0 trừ khi thẻ ghi rõ C1/C6; không xếp theo độ hiếm, Base ATK hay độ phổ biến.',
      'Môi trường tham chiếu: Spiral Abyss / endgame hiện tại. Số phiên bản chỉ hiển thị khi bản ghi đã duyệt có metadata; khi chưa có thì hiển thị unknown và không tự gán.',
      'Bậc D là dữ liệu Admin cũ vẫn được giữ nguyên, không tự động đổi sang C.',
      'Dữ liệu Admin hiện lưu một tier tổng quát cho mỗi nhân vật; bản ghi nhiều vai trò dùng cùng tier ở mỗi cột. Chưa có tier riêng theo từng vai trò.',
    ],
    scopeChar: 'Chỉ hiển thị bản ghi đã được Admin phê duyệt; một nhân vật có thể có nhiều dòng (theo vai trò và C0/C6). Mỗi dòng có giải thích riêng.',
    scopeWeapon: 'Chỉ hiển thị bản ghi đã được Admin phê duyệt, theo loại vũ khí và ngữ cảnh tinh luyện (R1–R5). Một vũ khí 4★ có thể phù hợp hơn 5★ trong đúng build.',
    role: 'Vai trò',
    element: 'Nguyên tố',
    rarity: 'Độ hiếm',
    weaponType: 'Loại vũ khí',
    tier: 'Bậc',
    constellation: 'Cấp nguyên tố',
    refinement: 'Tinh luyện',
    searchChar: 'Tìm nhân vật...',
    searchWeapon: 'Tìm vũ khí...',
    clear: 'Xóa bộ lọc',
    all: 'Tất cả',
    ranked: 'đã xếp hạng',
    unrankedCount: 'chưa xếp hạng',
    showing: 'đang hiển thị',
    empty: 'Không có kết quả khớp bộ lọc hiện tại. Xóa bộ lọc để xem lại toàn bộ dữ liệu.',
    pendingTitle: 'CHƯA CÓ XẾP HẠNG ĐƯỢC DUYỆT — DATA PENDING',
    pendingText: 'Có {count} thực thể trong catalog nhưng chưa có bậc nào được Admin phê duyệt. Trang không tự tạo tier hay dùng dữ liệu cũ; hãy duyệt tại Character Review hoặc Weapon Review bên dưới.',
    pendingLinkChar: 'Character Review',
    pendingLinkWeapon: 'Weapon Review',
    footerChar: 'Bảng xếp hạng là tham khảo theo môi trường endgame, không phải đánh giá chính thức.',
    footerWeapon: 'Bậc chỉ có ý nghĩa trong ngữ cảnh nhân vật/build tương ứng; hãy xem chi tiết từng vũ khí trước khi quyết định.',
  },
  en: {
    source: 'Source: Admin-approved rankings (APPROVED + INDEPENDENT)',
    version: 'Game version: {version}',
    methodTitle: 'Ranking methodology',
    method: [
      'Effectiveness in the role being evaluated (Main DPS / Sub DPS / Support).',
      'Strength in valid team compositions, including energy and rotation requirements.',
      'Sustained damage or support uptime over a full rotation.',
      'Flexibility across teams, elements and current endgame content.',
      'Investment assumptions: C0 unless the card states C1/C6; rarity, base ATK and popularity are not ranking criteria.',
      'Reference environment: current Spiral Abyss / endgame. A version number is shown only when an approved ranking carries version metadata; otherwise it reads unknown rather than being invented.',
      'The legacy D tier is preserved from existing Admin data and is not silently remapped to C.',
      'Admin data currently stores one general tier per character; multi-role records reuse that tier in each column. Per-role tiers are not available yet.',
    ],
    scopeChar: 'Only Admin-approved rows are shown; one character may have multiple rows (per role and C0/C6). Each row carries its own explanation.',
    scopeWeapon: 'Only Admin-approved rows are shown, per weapon type and refinement context (R1–R5). A 4★ weapon can outperform a 5★ in the right build.',
    role: 'Role',
    element: 'Element',
    rarity: 'Rarity',
    weaponType: 'Weapon type',
    tier: 'Tier',
    constellation: 'Constellation',
    refinement: 'Refinement',
    searchChar: 'Search characters...',
    searchWeapon: 'Search weapons...',
    clear: 'Clear filters',
    all: 'All',
    ranked: 'ranked',
    unrankedCount: 'unranked',
    showing: 'shown',
    empty: 'No items match the current filters. Clear the filters to see all data.',
    pendingTitle: 'NO APPROVED RANKINGS YET — DATA PENDING',
    pendingText: 'There are {count} catalog entities but no Admin-approved tier yet. This page never fabricates tiers or falls back to legacy data. Approve drafts in the review pages below.',
    pendingLinkChar: 'Character Review',
    pendingLinkWeapon: 'Weapon Review',
    footerChar: 'Tier lists are endgame references, not official verdicts.',
    footerWeapon: 'Tiers only make sense together with the matching character/build; check each weapon detail before deciding.',
  },
} as const;

const ELEMENTS = ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];
const ROLES = ['Main DPS', 'Sub DPS', 'Support'];
const WEAPON_TYPES = [
  { value: 'Kiếm Đơn', label: 'Sword' },
  { value: 'Trọng Kiếm', label: 'Claymore' },
  { value: 'Vũ Khí Cán Dài', label: 'Polearm' },
  { value: 'Cung', label: 'Bow' },
  { value: 'Pháp Khí', label: 'Catalyst' },
];

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export default function TierListClient({
  locale,
  characters,
  weapons,
  tierRanks,
  characterRankings,
  weaponRankings,
}: {
  locale: string;
  characters: TierCharacter[];
  weapons: TierWeapon[];
  tierRanks: AdminTierRank[];
  characterRankings: ApprovedCharacterRanking[];
  weaponRankings: ApprovedWeaponRanking[];
}) {
  const t = useTranslations('TierList');
  const reduceMotion = useReducedMotion();
  const copy = COPY[locale as 'vi' | 'en'] ?? COPY.en;

  const [tab, setTab] = useState<'character' | 'weapon'>('character');
  const [role, setRole] = useState('All');
  const [constellation, setConstellation] = useState('All');
  const [element, setElement] = useState('All');
  const [rarity, setRarity] = useState('All');
  const [weaponRole, setWeaponRole] = useState('All');
  const [weaponType, setWeaponType] = useState('All');
  const [refinement, setRefinement] = useState('All');
  const [tierFilter, setTierFilter] = useState('All');
  const [query, setQuery] = useState('');

  // Only approved ranking rows feed the boards. `characters`/`weapons` are kept
  // solely for the honest empty-state counts and entity metadata lookups.
  const filteredCharacters = useMemo(() => {
    const needle = normalize(query.trim());
    return characterRankings.filter((character) => {
      if (role !== 'All' && !hasRole(character.roleEnum, role)) return false;
      if (constellation !== 'All' && character.constellation !== constellation) return false;
      if (element !== 'All' && character.element !== element) return false;
      if (rarity !== 'All' && character.rarity !== Number(rarity)) return false;
      if (!needle) return true;
      return normalize(`${character.characterId} ${character.nameEn} ${character.nameVi}`).includes(needle);
    });
  }, [characterRankings, role, constellation, element, rarity, query]);

  const filteredWeapons = useMemo(() => {
    const needle = normalize(query.trim());
    return weaponRankings.filter((weapon) => {
      if (weaponRole !== 'All' && !hasRole(weapon.roleEnum, weaponRole)) return false;
      if (refinement !== 'All' && weapon.refinementContext !== refinement) return false;
      if (weaponType !== 'All' && weapon.type !== weaponType) return false;
      if (tierFilter !== 'All' && (weapon.tier || UNRANKED_TIER_NAME) !== tierFilter) return false;
      if (rarity !== 'All' && weapon.rarity !== Number(rarity)) return false;
      if (!needle) return true;
      return normalize(`${weapon.weaponId} ${weapon.nameEn} ${weapon.nameVi}`).includes(needle);
    });
  }, [weaponRankings, weaponRole, refinement, weaponType, tierFilter, rarity, query]);

  const rankingRows: Array<ApprovedCharacterRanking | ApprovedWeaponRanking> =
    tab === 'character' ? filteredCharacters : filteredWeapons;
  const totalItems = tab === 'character' ? characterRankings.length : weaponRankings.length;
  const rankedTotal = totalItems;
  const hasActiveFilters = Boolean(
    role !== 'All' || constellation !== 'All' || element !== 'All' || rarity !== 'All' ||
    weaponRole !== 'All' || weaponType !== 'All' || refinement !== 'All' || tierFilter !== 'All' || query.trim(),
  );
  const gameVersion = (tab === 'character' ? characterRankings[0]?.gameVersion : weaponRankings[0]?.gameVersion) || 'unknown';
  const entityCount = tab === 'character' ? characters.length : weapons.length;
  const noApprovedRankings = totalItems === 0;

  const tierRows = useMemo(
    () => resolveTierRows(tierRanks, rankingRows.map((item) => item.tier)),
    [tierRanks, rankingRows],
  );

  const grouped = useMemo(() => {
    const groups = new Map<string, Array<TierCharacter | TierWeapon>>();
    rankingRows.forEach((item) => {
      const key = item.tier || UNRANKED_TIER_NAME;
      const bucket = groups.get(key) ?? [];
      bucket.push(item);
      groups.set(key, bucket);
    });
    return groups;
  }, [rankingRows]);

  const weaponTierOptions = useMemo(
    () => tierRows.filter((row) => row.name !== UNRANKED_TIER_NAME).map((row) => row.name),
    [tierRows],
  );

  const clearFilters = () => {
    setRole('All');
    setConstellation('All');
    setElement('All');
    setRarity('All');
    setWeaponRole('All');
    setWeaponType('All');
    setRefinement('All');
    setTierFilter('All');
    setQuery('');
  };

  const switchTab = (next: 'character' | 'weapon') => {
    setTab(next);
    clearFilters();
  };

  const visibleTierRows = tierRows.filter((row) => (grouped.get(row.name)?.length ?? 0) > 0);

  return (
    <main className={styles.page}>
      <div className={`${styles.container} ${tab === 'character' ? styles.wideContainer : ''}`}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>{t('title')}</h1>
            <p className={styles.description}>{t('description')}</p>
            <p className={styles.meta}>
              <span>{copy.source}</span>
              <span>{copy.version.replace('{version}', gameVersion)}</span>
              {tierRanks.length === 0 && <span>TierRank config: empty · using default order</span>}
            </p>
          </div>
          <details className={styles.methodology}>
            <summary className={styles.methodologySummary}>{copy.methodTitle}</summary>
            <ul className={styles.methodologyList}>
              {copy.method.map((line) => <li key={line}>{line}</li>)}
              <li>{tab === 'character' ? copy.scopeChar : copy.scopeWeapon}</li>
            </ul>
          </details>
        </header>

        <div className={styles.tabs} role="tablist" aria-label="Tier list type">
          {([
            { id: 'character', label: t('characterTab') },
            { id: 'weapon', label: t('weaponTab') },
          ] as const).map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              className={styles.tab}
              onClick={() => switchTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {noApprovedRankings && (
          <div className={styles.notice} data-tone="pending" role="status">
            <span className={styles.noticeIcon} aria-hidden="true">!</span>
            <div>
              <span className={styles.noticeTitle}>{copy.pendingTitle}</span>
              <span className={styles.noticeText}>
                {copy.pendingText.replace('{count}', String(entityCount))}{' '}
                <a className="underline" href={`/${locale}/admin/character-tier-review`}>{copy.pendingLinkChar}</a>
                {' · '}
                <a className="underline" href={`/${locale}/admin/weapon-tier-review`}>{copy.pendingLinkWeapon}</a>
              </span>
            </div>
          </div>
        )}

        <section className={styles.filters} aria-label={copy.methodTitle === 'Phương pháp xếp hạng' ? 'Bộ lọc xếp hạng' : 'Tier list filters'}>
          {tab === 'character' ? (
            <>
              <div className={styles.filterRow}>
                <div className={`${styles.filterGroup} ${styles.roleFilterGroup}`}>
                  <span className={styles.filterLabel}>{copy.role}</span>
                  <div className={styles.chips}>
                    {['All', ...ROLES].map((value) => (
                      <button key={value} type="button" className={styles.chip} aria-pressed={role === value} onClick={() => setRole(value)}>
                        {value === 'All' ? copy.all : value}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.filterGroup}>
                  <span className={styles.filterLabel}>{copy.element}</span>
                  <select className={styles.select} value={element} onChange={(event) => setElement(event.target.value)} aria-label={copy.element}>
                    {['All', ...ELEMENTS].map((value) => (
                      <option key={value} value={value}>{value === 'All' ? copy.all : value}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.filterRow}>
                <div className={styles.filterGroup}>
                  <span className={styles.filterLabel}>{copy.constellation}</span>
                  <div className={styles.chips}>
                    {['All', 'C0', 'C6'].map((value) => (
                      <button key={value} type="button" className={styles.chip} aria-pressed={constellation === value} onClick={() => setConstellation(value)}>
                        {value === 'All' ? copy.all : value}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.filterGroup}>
                  <span className={styles.filterLabel}>{copy.rarity}</span>
                  <div className={styles.chips}>
                    {['All', '5', '4'].map((value) => (
                      <button key={value} type="button" className={styles.chip} aria-pressed={rarity === value} onClick={() => setRarity(value)}>
                        {value === 'All' ? copy.all : `${value}★`}
                      </button>
                    ))}
                  </div>
                </div>
                <input className={styles.search} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.searchChar} aria-label={copy.searchChar} />
                <button type="button" className={styles.clear} onClick={clearFilters} disabled={!hasActiveFilters}>{copy.clear}</button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.filterRow}>
                <div className={styles.filterGroup}>
                  <span className={styles.filterLabel}>{copy.role}</span>
                  <div className={styles.chips}>
                    {['All', ...ROLES].map((value) => (
                      <button key={value} type="button" className={styles.chip} aria-pressed={weaponRole === value} onClick={() => setWeaponRole(value)}>
                        {value === 'All' ? copy.all : value}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.filterGroup}>
                  <span className={styles.filterLabel}>{copy.refinement}</span>
                  <select className={styles.select} value={refinement} onChange={(event) => setRefinement(event.target.value)} aria-label={copy.refinement}>
                    {['All', 'R1', 'R2', 'R3', 'R4', 'R5'].map((value) => (
                      <option key={value} value={value}>{value === 'All' ? copy.all : value}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.filterRow}>
                <div className={styles.filterGroup}>
                  <span className={styles.filterLabel}>{copy.weaponType}</span>
                  <div className={styles.chips}>
                    {[{ value: 'All', label: copy.all }, ...WEAPON_TYPES].map((value) => (
                      <button key={value.value} type="button" className={styles.chip} aria-pressed={weaponType === value.value} onClick={() => setWeaponType(value.value)} title={value.value === 'All' ? undefined : value.value}>
                        {value.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.filterGroup}>
                  <span className={styles.filterLabel}>{copy.tier}</span>
                  <select className={styles.select} value={tierFilter} onChange={(event) => setTierFilter(event.target.value)} aria-label={copy.tier}>
                    <option value="All">{copy.all}</option>
                    {weaponTierOptions.map((value) => <option key={value} value={value}>{value}</option>)}
                    <option value={UNRANKED_TIER_NAME}>{t('unranked')}</option>
                  </select>
                </div>
              </div>
              <div className={styles.filterRow}>
                <div className={styles.filterGroup}>
                  <span className={styles.filterLabel}>{copy.rarity}</span>
                  <div className={styles.chips}>
                    {['All', '5', '4', '3'].map((value) => (
                      <button key={value} type="button" className={styles.chip} aria-pressed={rarity === value} onClick={() => setRarity(value)}>
                        {value === 'All' ? copy.all : `${value}★`}
                      </button>
                    ))}
                  </div>
                </div>
                <input className={styles.search} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.searchWeapon} aria-label={copy.searchWeapon} />
                <button type="button" className={styles.clear} onClick={clearFilters} disabled={!hasActiveFilters}>{copy.clear}</button>
              </div>
            </>
          )}
        </section>

        <p className={styles.summary} aria-live="polite">
          <span><strong>{rankingRows.length}</strong> / {totalItems} {tab === 'character' ? 'characters' : 'weapons'} {copy.showing}</span>
          <span><strong>{rankedTotal}</strong> {copy.ranked}</span>
          <span><strong>{totalItems - rankedTotal}</strong> {copy.unrankedCount}</span>
        </p>

        <motion.div
          key={tab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.18 }}
        >
          {tab === 'character' ? (
            <CharacterTierBoard
              characters={filteredCharacters}
              tierRows={tierRows}
              role={role}
              onRoleChange={setRole}
              locale={locale}
            />
          ) : visibleTierRows.length === 0 ? (
            <div className={styles.emptyState} role="status">{copy.empty}</div>
          ) : (
            <MotionRevealGroup key={`weapon-${weaponType}-${rarity}-${tierFilter}-${query}`} className={styles.tierList}>
              {visibleTierRows.map((tier) => {
                const items = (grouped.get(tier.name) ?? []) as TierWeapon[];
                return (
                  <section key={tier.id} className={styles.tierRow} data-motion-row data-tier={tier.name} aria-label={`${tier.name}: ${items.length}`}>
                    <div className={styles.tierLabel}>
                      <span className={styles.tierName}>{tier.name === UNRANKED_TIER_NAME ? '?' : tier.name}</span>
                      <span className={styles.tierCount}>{items.length} wpn</span>
                    </div>
                    <div className={styles.tierItems}>
                      {items.map((item) => (
                        <TierWeaponCard
                          key={(item as ApprovedWeaponRanking).rankingId ?? item.id}
                          item={item}
                          locale={locale}
                          tierLabel={tier.name}
                          typeLabel={WEAPON_TYPES.find((type) => type.value === item.type)?.label ?? item.type}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </MotionRevealGroup>
          )}
        </motion.div>

        <p className={styles.footerNote}>{tab === 'character' ? copy.footerChar : copy.footerWeapon}</p>
      </div>
    </main>
  );
}
