"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { ArtifactBuild } from '@/types/character';

export default function ArtifactCard({ artifact }: { artifact: ArtifactBuild }) {
  const locale  = useLocale();
  const t       = useTranslations('Artifact');
  const rarity  = artifact.rarity || 5;
  const setName = locale === 'en' ? artifact.setNameEn : artifact.setNameVi;
  const isMix   = artifact.mixSets && artifact.mixSets.length > 0;

  const is5 = rarity === 5;
  const imgBg     = is5 ? 'bg-gradient-to-br from-[#ffe082] via-[#ffb300] to-[#e65100]' : 'bg-gradient-to-br from-[#a256e8] to-[#6f38a6]';
  const starColor = is5 ? 'text-amber-400' : 'text-purple-400';
  const stars     = is5 ? '★★★★★' : '★★★★';
  const border    = is5
    ? 'border-amber-500/15 hover:border-amber-500/30'
    : 'border-purple-500/15 hover:border-purple-500/30';
  const badgeBg   = is5
    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    : 'bg-purple-500/10 text-purple-400 border-purple-500/20';

  // Header shared layout
  const headerContent = (
    <div className="flex items-center gap-3 border-b border-white/[0.05] pb-3.5 mb-3.5">
      {/* Icon */}
      <div className={`relative w-12 h-12 shrink-0 rounded-xl overflow-hidden ${imgBg} p-[1.5px]`}>
        <div className="relative w-full h-full rounded-xl bg-[#06060a]/90 overflow-hidden flex items-center justify-center p-1">
          {artifact.iconUrl ? (
            <Image src={artifact.iconUrl} alt={setName || 'Artifact'} width={46} height={46} className="object-contain" />
          ) : (
            <span className="text-xl">💎</span>
          )}
        </div>
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 mb-1">
          <h4 className="font-extrabold text-white/90 text-sm leading-tight font-display truncate">
            {setName && !setName.includes('Thánh Di Vật') && !setName.toLowerCase().includes('mix')
              ? setName
              : locale === 'en' ? 'Recommended Artifacts' : 'Đề Xuất'}
          </h4>
          <span className={`${starColor} text-[9px] font-bold tracking-widest select-none`}>{stars}</span>
        </div>
        <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border uppercase tracking-wider ${badgeBg}`}>
          {artifact.pieces === 2 ? t('2piece') : t('4piece')}
        </span>
      </div>
      {/* Link arrow */}
      {!isMix && artifact.artifactSetId && (
        <div className="ml-auto shrink-0 w-7 h-7 rounded-lg bg-[#06060a] border border-white/[0.05] flex items-center justify-center text-white/20 group-hover:text-white/60 group-hover:border-white/10 transition-all">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );

  // Mix sets header
  const mixHeader = isMix && (
    <div className="border-b border-white/[0.05] pb-3.5 mb-3.5">
      {/* Mix label row */}
      <div className="flex items-center gap-2 mb-2.5">
        <div className={`relative w-8 h-8 shrink-0 rounded-lg overflow-hidden ${imgBg} p-[1px]`}>
          <div className="w-full h-full rounded-lg bg-[#06060a]/90 flex items-center justify-center p-0.5">
            {artifact.iconUrl
              ? <Image src={artifact.iconUrl} alt="Mix" width={28} height={28} className="object-contain" />
              : <span className="text-sm">💎</span>}
          </div>
        </div>
        <div>
          <span className="text-white/60 text-xs font-bold">{locale === 'en' ? 'Mix 2-piece sets' : 'Mix bộ 2 món'}</span>
          <div className="flex gap-1 mt-0.5">
            <span className={`${starColor} text-[9px] font-bold tracking-widest select-none`}>{stars}</span>
            <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md border uppercase tracking-wider ${badgeBg}`}>2pc each</span>
          </div>
        </div>
      </div>
      {/* Set list */}
      <div className="flex flex-col gap-1.5">
        {artifact.mixSets!.map((set, idx) => {
          const sName = locale === 'en' ? set.nameEn : set.nameVi;
          const row = (
            <div className="flex items-center gap-2.5 bg-[#06060a]/60 border border-white/[0.04] hover:border-white/10 rounded-xl px-3 py-1.5 transition-all duration-150">
              <div className={`relative w-6 h-6 shrink-0 rounded-md overflow-hidden ${imgBg} p-[1px]`}>
                <div className="w-full h-full rounded-md bg-[#06060a]/90 flex items-center justify-center p-0.5">
                  {set.iconUrl
                    ? <Image src={set.iconUrl} alt={sName} width={20} height={20} className="object-contain" />
                    : <span className="text-xs">💎</span>}
                </div>
              </div>
              <span className="text-xs font-semibold text-white/70 flex-1 truncate">{sName}</span>
              <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">2pc</span>
            </div>
          );
          return set.artifactSetId
            ? <Link key={idx} href={`/artifacts/${set.artifactSetId}`} className="block">{row}</Link>
            : <div key={idx}>{row}</div>;
        })}
      </div>
    </div>
  );

  // Slots grid
  const slotsGrid = (
    <div className="grid grid-cols-3 gap-2 mb-3.5">
      {[
        { label: 'Sands', emoji: '⏳', values: artifact.sands },
        { label: 'Goblet', emoji: '🏆', values: artifact.goblet },
        { label: 'Circlet', emoji: '👑', values: artifact.circlet },
      ].map(({ label, emoji, values }) => (
        <div key={label} className="bg-[#06060a]/60 border border-white/[0.04] rounded-xl p-2.5 flex flex-col items-center gap-1">
          <span className="text-base select-none">{emoji}</span>
          <span className="text-white/25 text-[8px] font-black uppercase tracking-wider">{label}</span>
          <span className="text-white/75 text-[10px] font-semibold text-center leading-snug">{values.join(' / ')}</span>
        </div>
      ))}
    </div>
  );

  // Sub-stats
  const substats = (
    <div className="border-t border-white/[0.04] pt-3">
      <span className="text-white/25 text-[8px] font-black uppercase tracking-widest mb-2 block">{t('substats')}</span>
      <div className="flex flex-wrap items-center gap-1">
        {artifact.subStatsPriority.map((stat, idx) => (
          <div key={idx} className="flex items-center gap-1">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${
              idx === 0
                ? 'bg-yellow-400/10 border-yellow-400/20 text-yellow-300'
                : 'bg-[#06060a] border-white/[0.05] text-white/40'
            }`}>
              {stat}
            </span>
            {idx < artifact.subStatsPriority.length - 1 && (
              <span className="text-white/20 text-xs">›</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const cardWrapper = (children: React.ReactNode) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`border rounded-2xl p-4 transition-all duration-250 bg-[#0d0d14]/50 ${border} hover:bg-[#13131e]/60 group`}
    >
      {children}
    </motion.div>
  );

  return cardWrapper(
    <>
      {isMix ? mixHeader : (
        artifact.artifactSetId
          ? <Link href={`/artifacts/${artifact.artifactSetId}`} className="block">{headerContent}</Link>
          : headerContent
      )}
      {slotsGrid}
      {substats}
    </>
  );
}
