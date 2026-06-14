'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
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
  characterId: string;
  firstArtifact: any;
  talentPriority: string[];
}

function SectionHeader({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className={`w-[3px] h-5 rounded-full ${accent}`} />
      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 font-display">{label}</span>
    </div>
  );
}

function TalentRow({ talent, index }: { talent: string; index: number }) {
  const lower = talent.toLowerCase();
  let abbr = 'AA';
  let style = 'bg-white/[0.05] text-white/40 border-white/[0.06]';
  if (lower.includes('skill') || lower === 'e') {
    abbr = 'E'; style = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
  } else if (lower.includes('burst') || lower === 'q') {
    abbr = 'Q'; style = 'bg-purple-500/10 text-purple-400 border-purple-500/20';
  }
  return (
    <div className="flex items-center gap-3 bg-[#06060a]/50 border border-white/[0.04] hover:border-white/[0.09] rounded-xl p-3 transition-colors duration-200">
      <span className="w-5 h-5 rounded-full bg-[#0d0d14] border border-white/[0.07] flex items-center justify-center text-white/30 text-[10px] font-extrabold shrink-0">
        {index + 1}
      </span>
      <span className={`text-[9px] font-black w-7 h-6 flex items-center justify-center rounded-md border ${style}`}>
        {abbr}
      </span>
      <span className="text-white/70 text-sm font-semibold">{talent.replace('Elemental ', '')}</span>
      {index === 0 && (
        <span className="ml-auto text-[8px] text-yellow-400/70 font-black uppercase tracking-widest bg-yellow-400/5 px-2 py-0.5 rounded border border-yellow-400/10">
          Priority
        </span>
      )}
    </div>
  );
}

export default function EditableStatsSection({ characterId, firstArtifact, talentPriority }: Props) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Character');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditingStats, setIsEditingStats] = useState(false);
  const [isEditingTalents, setIsEditingTalents] = useState(false);

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('admin_key'));
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {/* Main Stats */}
      {firstArtifact && (
        <section className="bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl p-5 sm:p-6 relative group/section">
          <div className="flex items-center justify-between">
            <SectionHeader label={t('mainStats')} accent="bg-cyan-400" />
            {isAdmin && (
              <button 
                onClick={() => setIsEditingStats(true)}
                className="opacity-0 group-hover/section:opacity-100 px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-bold rounded hover:bg-cyan-500/30 transition-all border border-cyan-500/30"
              >
                ✏️ Edit Stats
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {[
              { slot: locale === 'en' ? 'Sands' : 'Đồng Hồ', emoji: '⏳', values: firstArtifact.sands || [] },
              { slot: locale === 'en' ? 'Goblet' : 'Ly', emoji: '🏆', values: firstArtifact.goblet || [] },
              { slot: locale === 'en' ? 'Circlet' : 'Nón', emoji: '👑', values: firstArtifact.circlet || [] },
            ].map(({ slot, emoji, values }) => (
              <div key={slot} className="flex items-center gap-3 bg-[#06060a]/60 border border-white/[0.04] rounded-xl px-4 py-2.5">
                <span className="text-base shrink-0">{emoji}</span>
                <span className="text-white/50 text-[9px] font-black uppercase tracking-wider w-14 shrink-0">{slot}</span>
                <span className="text-white/90 text-sm font-semibold">
                  {values.length > 0 ? cleanAndTranslate(values, locale).join(' / ') : '—'}
                </span>
              </div>
            ))}
          </div>

          {isEditingStats && (
            <InlineStatsEditor 
              artifactId={firstArtifact.id}
              initialSands={firstArtifact.sands}
              initialGoblet={firstArtifact.goblet}
              initialCirclet={firstArtifact.circlet}
              initialSubStats={firstArtifact.subStatsPriority}
              onClose={() => setIsEditingStats(false)}
              onSaved={() => router.refresh()}
            />
          )}
        </section>
      )}

      {/* Sub-stat priority */}
      {firstArtifact && (
        <section className="bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl p-5 sm:p-6 relative group/section">
          <div className="flex items-center justify-between">
            <SectionHeader label={t('subStatsPriority')} accent="bg-orange-400" />
            {isAdmin && (
              <button 
                onClick={() => setIsEditingStats(true)}
                className="opacity-0 group-hover/section:opacity-100 px-3 py-1 bg-orange-500/20 text-orange-300 text-xs font-bold rounded hover:bg-orange-500/30 transition-all border border-orange-500/30"
              >
                ✏️ Edit Sub-Stats
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {firstArtifact.subStatsPriority?.length > 0 ? (
              cleanAndTranslate(firstArtifact.subStatsPriority, locale).map((stat: string, idx: number, arr: string[]) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border ${
                    idx === 0
                      ? 'bg-yellow-400/10 border-yellow-400/20 text-yellow-300'
                      : 'bg-white/5 border-white/10 text-white/75'
                  }`}>{stat}</span>
                  {idx < arr.length - 1 && (
                    <span className="text-white/40 text-xs">›</span>
                  )}
                </div>
              ))
            ) : (
              <span className="text-white/40 text-sm italic">No sub-stats configured.</span>
            )}
          </div>
        </section>
      )}

      {/* Talent priority */}
      <section className="bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl p-5 sm:p-6 relative group/section">
        <div className="flex items-center justify-between">
          <SectionHeader label={t('talentPriority')} accent="bg-red-400" />
          {isAdmin && (
            <button 
              onClick={() => setIsEditingTalents(true)}
              className="opacity-0 group-hover/section:opacity-100 px-3 py-1 bg-red-500/20 text-red-300 text-xs font-bold rounded hover:bg-red-500/30 transition-all border border-red-500/30"
            >
              ✏️ Edit Talents
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {talentPriority && talentPriority.length > 0 ? (
            talentPriority.map((talent, idx) => (
              <TalentRow key={idx} talent={talent} index={idx} />
            ))
          ) : (
            <span className="text-white/40 text-sm italic">No talent priority configured.</span>
          )}
        </div>

        {isEditingTalents && (
          <InlineTalentEditor 
            characterId={characterId}
            initialPriority={talentPriority}
            onClose={() => setIsEditingTalents(false)}
            onSaved={() => router.refresh()}
          />
        )}
      </section>
    </div>
  );
}
