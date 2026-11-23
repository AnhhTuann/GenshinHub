'use client';

import { useAdmin } from '@/hooks/useAdmin';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import InlineStatsEditor from '@/components/admin/InlineStatsEditor';
import InlineTalentEditor from '@/components/admin/InlineTalentEditor';

const STAT_VI: Record<string, string> = {
  'Energy Recharge': 'Hiệu Quả Nạp Nguyên Tố',
  'Elemental Mastery': 'Tinh Thông Nguyên Tố',
  'CRIT Rate': 'Tỷ Lệ Bạo Kích',
  'CRIT DMG': 'Sát Thương Bạo Kích',
  'Healing Bonus': 'Tăng Trị Liệu',
  'Physical DMG Bonus': 'Sát Thương Vật Lý',
  'Pyro DMG Bonus': 'Sát Thương Nguyên Tố Hỏa',
  'Hydro DMG Bonus': 'Sát Thương Nguyên Tố Thủy',
  'Cryo DMG Bonus': 'Sát Thương Nguyên Tố Băng',
  'Electro DMG Bonus': 'Sát Thương Nguyên Tố Lôi',
  'Anemo DMG Bonus': 'Sát Thương Nguyên Tố Phong',
  'Geo DMG Bonus': 'Sát Thương Nguyên Tố Nham',
  'Dendro DMG Bonus': 'Sát Thương Nguyên Tố Thảo',
  'ATK%': 'Tấn Công%',
  'HP%': 'HP%',
  'DEF%': 'Phòng Ngự%',
};

const translateStat = (stat: string, locale: string) => {
  let enStat = stat;
  // If it's a known legacy Vietnamese string, map it back to English first
  const viToEn = Object.entries(STAT_VI).find(([en, vi]) => vi === stat);
  if (viToEn) enStat = viToEn[0];

  if (locale === 'vi') {
    return STAT_VI[enStat] || enStat;
  }
  return enStat;
};

const cleanAndTranslate = (arr: string[], locale: string) => {
  if (!arr) return [];
  const translated = arr.map(s => translateStat(s, locale));
  return Array.from(new Set(translated));
};

interface Props {
  readOnly?: boolean;
  characterId: string;
  sands: string[];
  goblet: string[];
  circlet: string[];
  subStatsPriority: string[];
  talentPriority: string[];
}

function SectionHeader({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="char-guide-section-head">
      <span className={`char-guide-section-accent ${accent}`} />
      <span className="char-guide-section-title">{label}</span>
    </div>
  );
}

function TalentRow({ talent, index, topLabel }: { talent: string; index: number; topLabel: string }) {
  const lower = talent.toLowerCase();
  let abbr = 'AA';
  let tone = '';
  if (lower.includes('skill') || lower === 'e') {
    abbr = 'E';
    tone = 'is-skill';
  } else if (lower.includes('burst') || lower === 'q') {
    abbr = 'Q';
    tone = 'is-burst';
  }
  return (
    <div className={`char-guide-priority-row ${index === 0 ? 'is-top' : ''}`}>
      <span className="char-guide-order">{index + 1}</span>
      <span className={`char-guide-talent-abbr ${tone}`}>{abbr}</span>
      <span className="char-guide-row-label">{talent.replace('Elemental ', '')}</span>
      {index === 0 && <span className="char-guide-top-tag">{topLabel}</span>}
    </div>
  );
}

export default function EditableStatsSection({ characterId, sands, goblet, circlet, subStatsPriority, talentPriority, readOnly = false }: Props) {
  const locale = useLocale();
  const t = useTranslations('Character');
  const { isAdmin: admin } = useAdmin();
  const isAdmin = admin && !readOnly;
  const [isEditingStats, setIsEditingStats] = useState(false);
  const [isEditingTalents, setIsEditingTalents] = useState(false);

  // Local state for optimistic updates
  const [localSands, setLocalSands] = useState<string[]>(sands || []);
  const [localGoblet, setLocalGoblet] = useState<string[]>(goblet || []);
  const [localCirclet, setLocalCirclet] = useState<string[]>(circlet || []);
  const [localSubStats, setLocalSubStats] = useState<string[]>(subStatsPriority || []);
  const [localTalents, setLocalTalents] = useState<string[]>(talentPriority || []);

  useEffect(() => {
    setLocalSands(sands || []);
    setLocalGoblet(goblet || []);
    setLocalCirclet(circlet || []);
    setLocalSubStats(subStatsPriority || []);
  }, [sands, goblet, circlet, subStatsPriority]);

  useEffect(() => {
    setLocalTalents(talentPriority || []);
  }, [talentPriority]);

  

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 items-stretch">
      {/* Main Stats */}
        <section className="atlas-surface p-5 sm:p-6 relative group/section h-full">
          <div className="flex items-center justify-between">
            <SectionHeader label={t('mainStats')} accent="bg-[var(--accent-second)]" />
            {isAdmin && (
              <button 
                onClick={() => setIsEditingStats(true)}
                className="atlas-add-action"
              >
                ✏️ Edit Stats
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {[
              { slot: locale === 'en' ? 'Sands' : 'Đồng Hồ', emoji: '⏳', values: localSands },
              { slot: locale === 'en' ? 'Goblet' : 'Ly', emoji: '🏆', values: localGoblet },
              { slot: locale === 'en' ? 'Circlet' : 'Nón', emoji: '👑', values: localCirclet },
            ].map(({ slot, emoji, values }) => (
              <div key={slot} className="char-guide-mainstat-row">
                <span className="char-guide-mainstat-icon" aria-hidden="true">{emoji}</span>
                <span className="char-guide-slot">{slot}</span>
                <span className="char-guide-value">
                  {values.length > 0 ? cleanAndTranslate(values, locale).join(' / ') : '—'}
                </span>
              </div>
            ))}
          </div>

          {isEditingStats && (
            <InlineStatsEditor 
              characterId={characterId}
              initialSands={localSands}
              initialGoblet={localGoblet}
              initialCirclet={localCirclet}
              initialSubStats={localSubStats}
              onClose={() => setIsEditingStats(false)}
              onSaved={(newStats) => {
                setLocalSands(newStats.sands);
                setLocalGoblet(newStats.goblet);
                setLocalCirclet(newStats.circlet);
                setLocalSubStats(newStats.subStatsPriority);
                toast.success('Stats updated');
              }}
            />
          )}
        </section>

      {/* Sub-stat priority */}
        <section className="atlas-surface p-5 sm:p-6 relative group/section h-full">
          <div className="flex items-center justify-between">
            <SectionHeader label={t('subStatsPriority')} accent="bg-[var(--fantasy-gold)]" />
            {isAdmin && (
              <button 
                onClick={() => setIsEditingStats(true)}
                className="atlas-add-action"
              >
                ✏️ Edit Sub-Stats
              </button>
            )}
          </div>
          <div className="char-guide-priority-list">
            {localSubStats.length > 0 ? (
              cleanAndTranslate(localSubStats, locale).map((stat: string, idx: number) => (
                <div key={idx} className={`char-guide-priority-row ${idx === 0 ? 'is-top' : ''}`}>
                  <span className="char-guide-order">{idx + 1}</span>
                  <span className="char-guide-row-label">{stat}</span>
                  {idx === 0 && (
                    <span className="char-guide-top-tag">{locale === 'vi' ? 'Cao nhất' : 'Top'}</span>
                  )}
                </div>
              ))
            ) : (
              <span className="text-[var(--text-secondary)] text-sm italic">No sub-stats configured.</span>
            )}
          </div>
        </section>

      {/* Talent priority */}
      <section className="atlas-surface p-5 sm:p-6 relative group/section h-full">
        <div className="flex items-center justify-between">
          <SectionHeader label={t('talentPriority')} accent="bg-[var(--pyro)]" />
          {isAdmin && (
            <button 
              onClick={() => setIsEditingTalents(true)}
              className="atlas-add-action"
            >
              ✏️ Edit Talents
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {localTalents.length > 0 ? (
            localTalents.map((talent, idx) => (
              <TalentRow key={idx} talent={talent} index={idx} topLabel={locale === 'vi' ? 'Cao nhất' : 'Top'} />
            ))
          ) : (
            <span className="text-[var(--text-secondary)] text-sm italic">No talent priority configured.</span>
          )}
        </div>

        {isEditingTalents && (
          <InlineTalentEditor 
            characterId={characterId}
            initialPriority={localTalents}
            onClose={() => setIsEditingTalents(false)}
            onSaved={(newPriority) => {
              setLocalTalents(newPriority);
              toast.success('Talents updated');
            }}
          />
        )}
      </section>
    </div>
  );
}
