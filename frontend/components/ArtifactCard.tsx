import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { ArtifactBuild } from '@/types/character';

export default function ArtifactCard({ artifact }: { artifact: ArtifactBuild }) {
  const locale = useLocale();
  const t = useTranslations('Artifact');
  const rarity = artifact.rarity || 5;
  const setName = locale === 'en' ? artifact.setNameEn : artifact.setNameVi;

  let cardBg = "bg-[#111115]/50 border-purple-750/30 shadow-[0_0_15px_rgba(168,85,247,0.03)]";
  let imgBg = "bg-gradient-to-br from-[#a256e8] to-[#6f38a6]";
  let badgeColor = "bg-purple-500/10 text-purple-400 border-purple-500/20";
  let starColor = "text-purple-400";
  let stars = "★★★★";

  if (rarity === 5) {
    cardBg = "bg-[#1c1812]/50 border-amber-600/30 shadow-[0_0_15px_rgba(245,158,11,0.05)]";
    imgBg = "bg-gradient-to-br from-[#FFE082] via-[#FFB300] to-[#E65100]";
    badgeColor = "bg-amber-500/10 text-amber-400 border-amber-500/20";
    starColor = "text-amber-400";
    stars = "★★★★★";
  }

  const headerContent = (
    <div className="flex items-center gap-4 border-b border-gray-900 pb-4 mb-4">
      {/* Artifact Image - always show real image or placeholder */}
      <div className={`relative w-14 h-14 shrink-0 rounded-xl overflow-hidden ${imgBg} p-[1px]`}>
        <div className="relative w-full h-full rounded-xl bg-[#07070a]/90 overflow-hidden flex items-center justify-center p-1">
          {artifact.iconUrl ? (
            <Image
              src={artifact.iconUrl}
              alt={setName || 'Artifact'}
              width={56}
              height={56}
              className="object-contain"
            />
          ) : (
            <span className="text-2xl">💎</span>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h4 className="font-extrabold text-white text-base leading-tight font-display">
            {setName && !setName.includes('Thánh Di Vật') && !setName.includes('mix')
              ? setName
              : 'Recommended Artifacts'}
          </h4>
          <span className={`${starColor} text-[10px] font-bold font-mono tracking-wider align-middle select-none`}>
            {stars}
          </span>
        </div>
        <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-wider ${badgeColor}`}>
          {artifact.pieces === 2 ? t('2piece') : t('4piece')}
        </span>
      </div>

      {/* Link arrow indicator */}
      {artifact.artifactSetId && (
        <div
          className="ml-auto shrink-0 w-8 h-8 rounded-lg bg-[#07070a] border border-gray-850 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:border-gray-600 transition-all"
          title="View artifact details"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );

  const isMix = artifact.mixSets && artifact.mixSets.length > 0;

  return (
    <div className={`border rounded-2xl p-5 mb-4 transition-all duration-300 hover:border-white/10 hover:bg-[#151520]/50 hover:shadow-lg ${cardBg} group`}>
      {/* Header */}
      {isMix ? (
        <div className="flex gap-4 border-b border-gray-900 pb-4 mb-4">
          {/* Left Part: Choose 2 badge */}
          <div className="flex items-center justify-center px-3 py-2 bg-[#050508]/80 border border-gray-850 rounded-xl select-none shrink-0 self-stretch min-w-[70px]">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest text-center leading-normal">
              {locale === 'en' ? 'Choose 2' : 'Lựa chọn 2'}
            </span>
          </div>

          {/* Right Part: List of sets */}
          <div className="flex-1 flex flex-col gap-2">
            {artifact.mixSets!.map((set, idx) => {
              const sName = locale === 'en' ? set.nameEn : set.nameVi;
              const itemContent = (
                <div className="flex items-center gap-3 bg-[#050508]/40 border border-gray-905 rounded-xl px-3 py-1.5 hover:border-gray-700 hover:bg-[#050508]/80 transition-all duration-200">
                  {/* Set Icon */}
                  <div className={`relative w-8 h-8 shrink-0 rounded-lg overflow-hidden ${imgBg} p-[1px]`}>
                    <div className="relative w-full h-full rounded-lg bg-[#07070a]/90 flex items-center justify-center p-0.5">
                      {set.iconUrl ? (
                        <Image
                          src={set.iconUrl}
                          alt={sName}
                          width={28}
                          height={28}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-sm">💎</span>
                      )}
                    </div>
                  </div>

                  {/* Set Name */}
                  <span className="text-xs font-bold text-gray-200 truncate flex-1">
                    {sName}
                  </span>

                  {/* 2-Piece Badge */}
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/25 shrink-0">
                    2
                  </span>
                </div>
              );

              if (set.artifactSetId) {
                return (
                  <Link key={idx} href={`/artifacts/${set.artifactSetId}`} className="block">
                    {itemContent}
                  </Link>
                );
              }
              return <div key={idx}>{itemContent}</div>;
            })}
          </div>
        </div>
      ) : artifact.artifactSetId ? (
        <Link href={`/artifacts/${artifact.artifactSetId}`} className="block">
          {headerContent}
        </Link>
      ) : (
        headerContent
      )}

      {/* Sands / Goblet / Circlet */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center mb-4">
        <div className="bg-[#050508]/60 p-3 rounded-xl border border-gray-900 flex flex-col justify-center">
          <span className="block text-gray-500 text-[9px] font-black uppercase tracking-wider mb-1">Sands</span>
          <span className="text-gray-200 font-semibold text-xs leading-relaxed">{artifact.sands.join(' / ')}</span>
        </div>
        <div className="bg-[#050508]/60 p-3 rounded-xl border border-gray-900 flex flex-col justify-center">
          <span className="block text-gray-500 text-[9px] font-black uppercase tracking-wider mb-1">Goblet</span>
          <span className="text-gray-200 font-semibold text-xs leading-relaxed">{artifact.goblet.join(' / ')}</span>
        </div>
        <div className="bg-[#050508]/60 p-3 rounded-xl border border-gray-900 flex flex-col justify-center">
          <span className="block text-gray-500 text-[9px] font-black uppercase tracking-wider mb-1">Circlet</span>
          <span className="text-gray-200 font-semibold text-xs leading-relaxed">{artifact.circlet.join(' / ')}</span>
        </div>
      </div>

      {/* Sub-stats Priority */}
      <div className="border-t border-gray-900 pt-4">
        <span className="text-gray-500 text-[9px] font-black uppercase tracking-wider mb-2 block">{t('substats')}</span>
        <div className="flex flex-wrap items-center gap-1.5">
          {artifact.subStatsPriority.map((stat, sIdx) => (
            <div key={sIdx} className="flex items-center gap-1.5">
              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${sIdx === 0 ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' : 'bg-[#050508] border-gray-900 text-gray-400'}`}>
                {stat}
              </span>
              {sIdx < artifact.subStatsPriority.length - 1 && <span className="text-gray-700 text-xs">›</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
