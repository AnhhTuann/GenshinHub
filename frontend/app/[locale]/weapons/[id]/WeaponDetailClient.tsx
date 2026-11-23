'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import { Package, Sparkles, Users, Layers3, ScrollText } from 'lucide-react';
import ElementIcon from '@/components/ui/ElementIcon';
import FallbackImage from '@/components/ui/FallbackImage';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/hooks/useAdmin';
import dynamic from 'next/dynamic';

const WeaponFormModal = dynamic(() => import('@/components/admin/WeaponFormModal'), { ssr: false });
import { fetchGraphQL } from '@/lib/graphql';
import toast from 'react-hot-toast';
import { confirmDialog } from '@/utils/confirm';

const RARITY_ACCENT: Record<number, string> = {
  5: '#d9a441',
  4: '#9b7aff',
  3: '#55b5c2',
  2: '#9aa4b5',
  1: '#8e97a6',
};

const SUBSTAT_VI_EN: Record<string, string> = {
  'Tỷ Lệ Bạo Kích': 'CRIT Rate',
  'Sát Thương Bạo Kích': 'CRIT DMG',
  'Tấn Công%': 'ATK%',
  'Phòng Ngự%': 'DEF%',
  'HP%': 'HP%',
  'Hiệu Quả Nạp': 'Energy Recharge',
  'Tinh Thông Nguyên Tố': 'Elemental Mastery',
  'Sát Thương Vật Lý%': 'Physical DMG Bonus',
};

interface Weapon {
  id: string;
  nameEn: string;
  nameVi: string;
  rarity: number;
  type: string;
  baseAtk: number;
  subStat: string | null;
  subStatValue: number | null;
  passiveNameEn: string | null;
  passiveNameVi: string | null;
  passiveDescEn: string | null;
  passiveDescVi: string | null;
  iconUrl: string | null;
  tier?: string | null;
}

interface GameLevel {
  level: number;
  ascension: number;
  label: string;
  phase: 'before' | 'after' | null;
  baseAtk: number;
  subStatValue: number;
  subStatDisplay: string;
}

interface GameMaterial {
  materialId: string;
  nameEn: string;
  count: number;
}

interface GameStage {
  key: string;
  label: string;
  mora: number;
  items: GameMaterial[];
}

interface GameRefinement {
  rank: number;
  description: string;
  values: string[];
}

interface GameData {
  id: string;
  sourceId: number;
  nameEn: string;
  weaponType: string;
  weaponText: string;
  rarity: number;
  description: string | null;
  passiveName: string | null;
  mainStatType: string | null;
  mainStatText: string | null;
  version: string | null;
  levels: GameLevel[];
  refinements: GameRefinement[];
  ascension: GameStage[];
}

interface RecommendedUser {
  id: string;
  nameEn: string;
  nameVi: string;
  element: string;
  rarity: number;
  avatarUrl: string;
  tier: string | null;
  role: string | null;
  rank: number;
  isF2P: boolean;
}

interface MaterialRecord {
  id: string;
  nameEn: string;
  nameVi: string;
  iconUrl?: string | null;
}

interface Props {
  weapon: Weapon;
  gameData: GameData | null;
  recommendedUsers: RecommendedUser[];
  materials: MaterialRecord[];
}

const MORA_ICON = '/assets/items/UI_ItemIcon_202.webp';

function plainText(value: string | null | undefined): string {
  if (!value) return '';
  return value
    .replace(/<color=[^>]*>/gi, '')
    .replace(/<\/color>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function isPercentStat(label: string | null | undefined): boolean {
  if (!label) return false;
  return /%|CRIT|DMG|Recharge|Bonus|Bạo Kích|Sát Thương|Nạp/i.test(label);
}

export default function WeaponDetailClient({
  weapon: initialWeapon,
  gameData,
  recommendedUsers,
  materials,
}: Props) {
  const locale = useLocale();
  const router = useRouter();
  const { isAdmin } = useAdmin();
  const [weapon, setWeapon] = useState(initialWeapon);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [levelIndex, setLevelIndex] = useState(0);
  const [refinementRank, setRefinementRank] = useState(1);

  const rarity = weapon.rarity ?? 5;
  const stars = '★'.repeat(rarity);
  const name = locale === 'en' ? weapon.nameEn : weapon.nameVi;
  const typeLabel = locale === 'en'
    ? gameData?.weaponText || weapon.type
    : weapon.type || gameData?.weaponText || '';
  const accent = RARITY_ACCENT[rarity] ?? RARITY_ACCENT[1];

  const levels = gameData?.levels ?? [];
  const selectedLevel = levels[Math.min(levelIndex, Math.max(levels.length - 1, 0))] ?? null;
  const fallbackStatLabel = locale === 'en'
    ? (weapon.subStat ? SUBSTAT_VI_EN[weapon.subStat] ?? weapon.subStat : gameData?.mainStatText ?? null)
    : weapon.subStat ?? gameData?.mainStatText ?? null;

  const fallbackStatDisplay = weapon.subStatValue == null
    ? null
    : `${weapon.subStatValue}${isPercentStat(fallbackStatLabel) ? '%' : ''}`;

  const statLabel = selectedLevel ? (locale === 'en' ? gameData?.mainStatText : fallbackStatLabel) ?? 'Sub stat' : fallbackStatLabel ?? 'Sub stat';
  const statValue = selectedLevel?.subStatDisplay ?? fallbackStatDisplay ?? '—';
  const attackValue = selectedLevel?.baseAtk ?? weapon.baseAtk;

  const localizedPassiveName = locale === 'en'
    ? weapon.passiveNameEn || gameData?.passiveName
    : weapon.passiveNameVi || weapon.passiveNameEn || gameData?.passiveName;

  const localizedPassiveDesc = plainText(locale === 'en' ? weapon.passiveDescEn : weapon.passiveDescVi)
    || plainText(weapon.passiveDescEn)
    || '';

  const refinement = gameData?.refinements.find(entry => entry.rank === refinementRank) ?? null;
  const refinementLabel = locale === 'vi' ? 'Tinh luyện' : 'Refinement';
  const beforeLabel = locale === 'vi' ? 'Trước' : 'Before';
  const afterLabel = locale === 'vi' ? 'Sau' : 'After';

  // R1 has an approved localized description. Higher ranks use the exact
  // genshin-db text rather than an invented translation.
  const passiveDisplayText = refinementRank > 1 && refinement
    ? plainText(refinement.description)
    : localizedPassiveDesc || plainText(refinement?.description ?? '');
  const passiveSourceNote = refinementRank > 1
    ? `${refinementLabel} R${refinementRank} · genshin-db`
    : (locale === 'vi' ? 'Mô tả đã duyệt · R1' : 'Approved description · R1');

  const materialMap = useMemo(
    () => new Map(materials.map(material => [material.id, material])),
    [materials],
  );

  const materialName = (id: string, fallback: string) => {
    const found = materialMap.get(id);
    if (locale === 'vi' && found?.nameVi) return found.nameVi;
    return found?.nameEn || fallback;
  };

  const materialIcon = (id: string, fallbackUrl: string | null | undefined) => {
    const local = fallbackUrl?.startsWith('/')
      ? fallbackUrl
      : `/assets/items/UI_ItemIcon_${id}.webp`;
    return {
      src: fallbackUrl?.startsWith('http') ? MORA_ICON : local,
      externalSrc: fallbackUrl?.startsWith('http') ? fallbackUrl : undefined,
    };
  };

  const ascensionStages = useMemo(() => gameData?.ascension ?? [], [gameData]);
  const totalMora = ascensionStages.reduce((sum, stage) => sum + stage.mora, 0);
  const materialTotals = useMemo(() => {
    const totals = new Map<string, number>();
    for (const stage of ascensionStages) {
      for (const item of stage.items) {
        totals.set(item.materialId, (totals.get(item.materialId) ?? 0) + item.count);
      }
    }
    return [...totals.entries()];
  }, [ascensionStages]);

  const totalRows = [
    { id: 'mora', name: locale === 'vi' ? 'Mora' : 'Mora', count: totalMora, icon: MORA_ICON, externalSrc: undefined as string | undefined },
    ...materialTotals.map(([id, count]) => {
      const found = materialMap.get(id);
      const icon = materialIcon(id, found?.iconUrl);
      return {
        id,
        name: materialName(id, ascensionStages.flatMap(stage => stage.items).find(item => item.materialId === id)?.nameEn ?? id),
        count,
        icon: icon.src,
        externalSrc: icon.externalSrc,
      };
    }),
  ];

  const handleDelete = async () => {
    if (!await confirmDialog('Are you sure you want to delete this weapon?')) return;
    setDeleting(true);
    try {
      await fetchGraphQL(`mutation { deleteWeapon(id: "${weapon.id}") }`);
      router.push(`/${locale}/weapons`);
    } catch (err: any) {
      toast.error('Error deleting: ' + err.message);
      setDeleting(false);
    }
  };

  const handleSaved = async () => {
    try {
      const data = await fetchGraphQL(`query { weapon(id: "${weapon.id}") { id nameEn nameVi rarity type baseAtk subStat subStatValue passiveNameEn passiveNameVi passiveDescEn passiveDescVi iconUrl tier } }`);
      if (data.weapon) setWeapon(data.weapon);
    } catch {}
  };

  return (
    <main
      className="weapon-detail-shell min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] pb-24"
      style={{ '--weapon-rarity': accent } as CSSProperties}
    >
      <div className="atlas-container pt-8 pb-4">
        <Link className="fantasy-action mb-6" href="/weapons">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {locale === 'vi' ? 'Tất cả vũ khí' : 'All Weapons'}
        </Link>

        {isAdmin && (
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <button
              type="button"
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all"
            >
              ✏️ {locale === 'vi' ? 'Sửa vũ khí' : 'Edit Weapon'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all disabled:opacity-50"
            >
              🗑️ {deleting ? 'Deleting...' : (locale === 'vi' ? 'Xóa' : 'Delete')}
            </button>
          </div>
        )}

        {/* 1. Weapon hero */}
        <section className="weapon-hero" aria-labelledby="weapon-title">
          <div className="weapon-hero-art">
            <div className="weapon-art-frame">
              <div className="weapon-art-glow" aria-hidden="true" />
              {weapon.iconUrl ? (
                <FallbackImage
                  src={weapon.iconUrl}
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 72vw, 260px"
                  className="object-contain p-4 weapon-art-image"
                />
              ) : (
                <span className="weapon-art-placeholder" aria-hidden="true">⚔️</span>
              )}
            </div>
          </div>

          <div className="weapon-hero-body">
            <p className="weapon-eyebrow">{typeLabel}</p>
            <h1 id="weapon-title" className="atlas-detail-title weapon-title">{name}</h1>
            <p className="weapon-stars" style={{ color: accent }} aria-label={`${rarity} stars`}>
              {stars}
              <span className="weapon-stars-label">{rarity}★</span>
            </p>

            <dl className="weapon-hero-stats" aria-live="polite">
              <div className="weapon-stat-tile">
                <dt>{locale === 'vi' ? 'Sát thương cơ bản' : 'Base ATK'}</dt>
                <dd>{attackValue.toLocaleString()}</dd>
                <span>
                  {selectedLevel
                    ? `${selectedLevel.label}${selectedLevel.phase ? ` · ${selectedLevel.phase === 'after' ? afterLabel : beforeLabel}` : ''}`
                    : (locale === 'vi' ? 'Dữ liệu DB' : 'DB value')}
                </span>
              </div>
              <div className="weapon-stat-tile">
                <dt>{statLabel}</dt>
                <dd>{statValue}</dd>
                <span>{selectedLevel ? selectedLevel.label : (locale === 'vi' ? 'Dữ liệu DB' : 'DB value')}</span>
              </div>
              {localizedPassiveName && (
                <div className="weapon-stat-tile weapon-stat-tile-wide">
                  <dt>{locale === 'vi' ? 'Nội tại' : 'Passive'}</dt>
                  <dd className="weapon-passive-inline">{localizedPassiveName}</dd>
                  <span>{locale === 'vi' ? 'Xem chi tiết bên dưới' : 'Details below'}</span>
                </div>
              )}
            </dl>
          </div>
        </section>

        {/* 2. Level stats & refinement */}
        <section className="weapon-section" aria-labelledby="weapon-level-title">
          <header className="weapon-section-head">
            <span className="weapon-section-icon" aria-hidden="true"><Layers3 size={18} /></span>
            <div>
              <h2 id="weapon-level-title">{locale === 'vi' ? 'Cấp độ & Tinh luyện' : 'Level & Refinement'}</h2>
              <p>{locale === 'vi' ? 'Chỉ số lấy trực tiếp từ genshin-db theo từng mốc đột phá.' : 'Stats come directly from genshin-db at each ascension step.'}</p>
            </div>
          </header>

          {levels.length > 0 ? (
            <>
              <div className="weapon-level-selector" role="group" aria-label={locale === 'vi' ? 'Chọn cấp độ vũ khí' : 'Select weapon level'}>
                {levels.map((level, index) => (
                  <button
                    key={`${level.level}-${level.ascension}`}
                    type="button"
                    className="weapon-level-chip"
                    aria-pressed={index === levelIndex}
                    onClick={() => setLevelIndex(index)}
                  >
                    <strong>{level.label}</strong>
                    <small>{level.phase === 'before' ? beforeLabel : level.phase === 'after' ? afterLabel : '—'}</small>
                  </button>
                ))}
              </div>

              <div className="weapon-level-readout" aria-live="polite">
                <div>
                  <span>{locale === 'vi' ? 'Sát thương cơ bản' : 'Base ATK'}</span>
                  <strong>{selectedLevel?.baseAtk.toLocaleString()}</strong>
                </div>
                <div>
                  <span>{locale === 'en' ? gameData?.mainStatText ?? 'Sub stat' : statLabel}</span>
                  <strong>{selectedLevel?.subStatDisplay}</strong>
                </div>
                <div>
                  <span>{locale === 'vi' ? 'Giai đoạn' : 'Phase'}</span>
                  <strong>
                    {selectedLevel?.phase === 'before'
                      ? beforeLabel
                      : selectedLevel?.phase === 'after'
                        ? afterLabel
                        : '—'}
                  </strong>
                </div>
              </div>
            </>
          ) : (
            <p className="weapon-empty-note">
              {locale === 'vi'
                ? 'genshin-db chưa cung cấp bảng chỉ số theo cấp cho vũ khí này.'
                : 'No level-by-level stat table is available from genshin-db for this weapon.'}
            </p>
          )}

          {gameData && gameData.refinements.length > 0 && (
            <div className="weapon-refinement">
              <p className="weapon-subhead">{refinementLabel}</p>
              <div className="weapon-refinement-selector" role="group" aria-label={refinementLabel}>
                {gameData.refinements.map(entry => (
                  <button
                    key={entry.rank}
                    type="button"
                    className="weapon-rank-chip"
                    aria-pressed={entry.rank === refinementRank}
                    onClick={() => setRefinementRank(entry.rank)}
                  >
                    R{entry.rank}
                  </button>
                ))}
              </div>
              {refinement && refinement.values.length > 0 && (
                <div className="weapon-refinement-body">
                  <p className="weapon-refinement-caption">
                    {locale === 'vi' ? `Giá trị R${refinement.rank}` : `R${refinement.rank} values`}
                  </p>
                  <ul aria-label={locale === 'vi' ? 'Giá trị theo tinh luyện' : 'Refinement values'}>
                    {refinement.values.map((value, index) => (
                      <li key={`${value}-${index}`}>{value}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>

        {/* 3. Passive description */}
        {localizedPassiveName && (
          <section className="weapon-section weapon-passive-section" aria-labelledby="weapon-passive-title">
            <header className="weapon-section-head">
              <span className="weapon-section-icon" aria-hidden="true"><Sparkles size={18} /></span>
              <div>
                <h2 id="weapon-passive-title">{localizedPassiveName}</h2>
                <p>{locale === 'vi' ? 'Mô tả nội tại đã duyệt trong database.' : 'Approved passive description from the database.'}</p>
              </div>
            </header>
            {passiveDisplayText ? (
              <>
                <p className="weapon-passive-source">{passiveSourceNote}</p>
                <p className="weapon-passive-copy">{passiveDisplayText}</p>
              </>
            ) : (
              <p className="weapon-empty-note">
                {locale === 'vi' ? 'Chưa có mô tả nội tại đã duyệt.' : 'No approved passive description is available.'}
              </p>
            )}
            {gameData?.description && (
              <p className="weapon-lore">{plainText(gameData.description)}</p>
            )}
          </section>
        )}

        {/* 4. Recommended users */}
        <section className="weapon-section" aria-labelledby="weapon-users-title">
          <header className="weapon-section-head">
            <span className="weapon-section-icon" aria-hidden="true"><Users size={18} /></span>
            <div>
              <h2 id="weapon-users-title">
                {locale === 'vi' ? 'Nhân vật phù hợp' : 'Recommended Users'}
                <span className="weapon-head-count">({recommendedUsers.length})</span>
              </h2>
              <p>
                {locale === 'vi'
                  ? 'Từ danh sách build nhân vật đã được duyệt trong database.'
                  : 'From approved character builds stored in the database.'}
              </p>
            </div>
          </header>

          {recommendedUsers.length > 0 ? (
            <div className="weapon-user-grid">
              {recommendedUsers.map(char => (
                <Link
                  key={char.id}
                  href={`/characters/${char.id}` as any}
                  className="weapon-user-card"
                  style={{ '--card-rarity': char.rarity === 5 ? '#d9a441' : '#9b7aff' } as CSSProperties}
                >
                  <div className="weapon-user-art">
                    {char.avatarUrl ? (
                      <FallbackImage
                        src={char.avatarUrl}
                        alt={locale === 'en' ? char.nameEn : char.nameVi}
                        fill
                        sizes="(max-width: 480px) 45vw, (max-width: 900px) 30vw, 190px"
                        className="object-cover object-top weapon-user-image"
                      />
                    ) : (
                      <span className="weapon-user-placeholder" aria-hidden="true">👤</span>
                    )}
                    <ElementIcon element={char.element} label={char.element} className="weapon-user-element" />
                    <span className="weapon-user-rarity">{'★'.repeat(char.rarity)}</span>
                  </div>
                  <div className="weapon-user-copy">
                    <strong>{locale === 'en' ? char.nameEn : char.nameVi}</strong>
                    <span>
                      {char.role ? `${char.role}` : (locale === 'vi' ? 'Build đã duyệt' : 'Approved build')}
                      {' · '}#{char.rank}
                    </span>
                    <span className="weapon-user-badges">
                      {char.tier && <em>{char.tier}</em>}
                      {char.isF2P && <em>{locale === 'vi' ? 'F2P' : 'F2P'}</em>}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="weapon-empty-panel">
              <Users size={22} aria-hidden="true" />
              <p>
                {locale === 'vi'
                  ? 'Chưa có nhân vật nào trong build đã duyệt sử dụng vũ khí này.'
                  : 'No approved character build currently lists this weapon.'}
              </p>
            </div>
          )}
        </section>

        {/* 5. Ascension materials */}
        <section className="weapon-section" aria-labelledby="weapon-mats-title">
          <header className="weapon-section-head">
            <span className="weapon-section-icon" aria-hidden="true"><Package size={18} /></span>
            <div>
              <h2 id="weapon-mats-title">
                {locale === 'vi' ? 'Nguyên Liệu Đột Phá Vũ Khí' : 'Weapon Ascension Materials'}
              </h2>
              <p>{locale === 'vi' ? 'Số lượng từng mốc lấy trực tiếp từ genshin-db.' : 'Exact per-stage counts from genshin-db.'}</p>
            </div>
          </header>

          {ascensionStages.length > 0 ? (
            <div className="weapon-stage-grid">
              {ascensionStages.map(stage => (
                <article key={stage.key} className="weapon-stage-card">
                  <header>
                    <h3>{locale === 'vi' ? `Đột phá ${stage.label}` : `Ascension ${stage.label}`}</h3>
                  </header>
                  <div className="weapon-stage-mora">
                    <span className="weapon-mat-icon"><FallbackImage src={MORA_ICON} alt="" width={34} height={34} /></span>
                    <span>{locale === 'vi' ? 'Mora' : 'Mora'}</span>
                    <strong>{stage.mora.toLocaleString()}</strong>
                  </div>
                  <ul className="weapon-stage-items">
                    {stage.items.map(item => {
                      const found = materialMap.get(item.materialId);
                      const icon = materialIcon(item.materialId, found?.iconUrl);
                      return (
                        <li key={item.materialId}>
                          <span className="weapon-mat-icon">
                            <FallbackImage
                              src={icon.src}
                              externalSrc={icon.externalSrc}
                              alt=""
                              width={34}
                              height={34}
                            />
                          </span>
                          <span className="weapon-mat-name">{materialName(item.materialId, item.nameEn)}</span>
                          <strong>×{item.count}</strong>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              ))}
            </div>
          ) : (
            <p className="weapon-empty-note">
              {locale === 'vi'
                ? 'genshin-db chưa cung cấp nguyên liệu đột phá cho vũ khí này.'
                : 'No ascension material data is available from genshin-db for this weapon.'}
            </p>
          )}
        </section>

        {/* 6. Total materials */}
        {totalRows.length > 0 && (
          <section className="weapon-section" aria-labelledby="weapon-total-title">
            <header className="weapon-section-head">
              <span className="weapon-section-icon" aria-hidden="true"><ScrollText size={18} /></span>
              <div>
                <h2 id="weapon-total-title">{locale === 'vi' ? 'Tổng nguyên liệu' : 'Total Materials'}</h2>
                <p>{locale === 'vi' ? 'Cộng dồn theo đúng các mốc đột phá ở trên.' : 'Summed across every ascension stage above.'}</p>
              </div>
            </header>
            <ul className="weapon-total-grid">
              {totalRows.map(row => (
                <li key={row.id}>
                  <span className="weapon-mat-icon weapon-mat-icon-lg">
                    <FallbackImage src={row.icon} externalSrc={row.externalSrc} alt="" width={40} height={40} />
                  </span>
                  <span className="weapon-total-name">{row.name}</span>
                  <strong>{row.count.toLocaleString()}</strong>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 7. Source information */}
        <footer className="weapon-source-note">
          <p>
            <strong>{locale === 'vi' ? 'Nguồn dữ liệu' : 'Data source'}:</strong>{' '}
            genshin-db@5.2.15 · {locale === 'vi' ? 'dữ liệu game v7.2' : 'game data v7.2'}
            {gameData?.version ? ` · ${locale === 'vi' ? 'vũ khí ra mắt' : 'weapon introduced'} v${gameData.version}` : ''}
          </p>
          <p>
            <strong>{locale === 'vi' ? 'Nhân vật phù hợp' : 'Recommended users'}:</strong>{' '}
            {locale === 'vi' ? 'CharacterWeapon records đã duyệt (nội bộ)' : 'approved internal CharacterWeapon records'}
          </p>
        </footer>
      </div>

      {showEditModal && (
        <WeaponFormModal
          weapon={{
            id: weapon.id,
            nameEn: weapon.nameEn,
            nameVi: weapon.nameVi,
            rarity: weapon.rarity,
            type: weapon.type,
            baseAtk: weapon.baseAtk,
            subStat: weapon.subStat || '',
            subStatValue: weapon.subStatValue,
            passiveNameEn: weapon.passiveNameEn || '',
            passiveNameVi: weapon.passiveNameVi || '',
            passiveDescEn: weapon.passiveDescEn || '',
            passiveDescVi: weapon.passiveDescVi || '',
            iconUrl: weapon.iconUrl || '',
            tier: weapon.tier || '',
          }}
          onClose={() => setShowEditModal(false)}
          onSaved={handleSaved}
        />
      )}
    </main>
  );
}
