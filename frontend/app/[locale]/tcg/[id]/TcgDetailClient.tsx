'use client';

import React, { useMemo } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import { TcgCardData, TcgTalent, TcgDictionaryEntry } from '@/lib/yattaTcg';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import TcgTextParser from '@/components/tcg/TcgTextParser';
import { useTranslations } from 'next-intl';

export default function TcgDetailClient({ locale, card }: { locale: string; card: TcgCardData }) {
  const t = useTranslations('TierList'); 

  // Extract tags
  const tags = Object.values(card.tags || {});
  
  // Try to find the element tag for glow color
  const elementTags = ['Cryo', 'Pyro', 'Hydro', 'Electro', 'Anemo', 'Geo', 'Dendro'];
  const cardElement = tags.find(tag => elementTags.includes(tag)) || 'Neutral';

  const themeColors: Record<string, { bg: string, border: string }> = {
    Cryo: { bg: 'from-cyan-400 to-blue-500', border: 'border-cyan-400' },
    Pyro: { bg: 'from-orange-500 to-red-600', border: 'border-orange-500' },
    Hydro: { bg: 'from-blue-400 to-indigo-600', border: 'border-blue-400' },
    Electro: { bg: 'from-purple-500 to-fuchsia-600', border: 'border-purple-500' },
    Anemo: { bg: 'from-emerald-400 to-teal-500', border: 'border-emerald-400' },
    Geo: { bg: 'from-amber-400 to-yellow-600', border: 'border-amber-400' },
    Dendro: { bg: 'from-green-400 to-lime-500', border: 'border-green-400' },
    Neutral: { bg: 'from-gray-500 to-slate-600', border: 'border-gray-400' },
  };
  
  const theme = themeColors[cardElement] || themeColors.Neutral;

  // Subskills and Keywords extraction
  const { subSkills, dictionaryEntries } = useMemo(() => {
    const sub = [];
    const dict = [];
    if (card.dictionary) {
      for (const [key, value] of Object.entries(card.dictionary)) {
        if (key.startsWith('C') || value.effect || value.tags) {
          sub.push({ key, ...value });
        } else {
          dict.push({ key, ...value });
        }
      }
    }
    return { subSkills: sub, dictionaryEntries: dict };
  }, [card.dictionary]);

  return (
    <main className="min-h-screen pt-20 pb-32 relative z-10 px-4 sm:px-6 bg-[#0d1117] overflow-hidden">
      {/* Background ambient glow based on element */}
      <div className={`fixed top-0 left-0 w-full h-[800px] bg-gradient-to-br ${theme.bg} opacity-[0.04] blur-[150px] rounded-full pointer-events-none -z-10`} />

      <div className="max-w-[1300px] mx-auto relative z-10">
        
        {/* Breadcrumb Back Button */}
        <Link href="/tcg" className="text-[13px] font-bold text-gray-500 hover:text-gray-300 flex items-center gap-2 transition-colors uppercase tracking-widest w-fit mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to TCG
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* ======================= */}
          {/* LEFT COLUMN (STICKY)    */}
          {/* ======================= */}
          <div className="w-full lg:w-[300px] xl:w-[340px] shrink-0">
            <div className="lg:sticky lg:top-[90px] flex flex-col gap-5">
              
              {/* Card Image Block */}
            <div className="relative group w-full max-w-[280px] mx-auto lg:max-w-none">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full aspect-[256/440] transition-transform duration-500 group-hover:-translate-y-2 drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
              >
                <FallbackImage 
                  src={`https://gi.yatta.moe/assets/UI/gcg/${card.icon}.png`}
                  alt={card.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </motion.div>
            </div>

            {/* Floating HP / Energy Badges Below Card */}
            <div className="flex gap-3 justify-center lg:justify-start w-full max-w-[280px] mx-auto lg:max-w-none mt-1">
              {card.props?.GCG_PROP_HP !== undefined && (
                <div className="flex-1 flex items-center justify-center gap-1.5 bg-[#161b22] border border-white/5 rounded-xl py-2 shadow-md hover:border-red-500/30 transition-colors">
                  <svg className="w-4 h-4 text-red-500 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span className="text-lg font-display font-black text-white">{card.props.GCG_PROP_HP}</span>
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-0.5">HP</span>
                </div>
              )}
              {card.props?.GCG_PROP_ENERGY !== undefined && (
                <div className="flex-1 flex items-center justify-center gap-1.5 bg-[#161b22] border border-white/5 rounded-xl py-2 shadow-md hover:border-yellow-500/30 transition-colors">
                  <svg className="w-4 h-4 text-yellow-400 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L22 12L12 22L2 12L12 2Z"/>
                  </svg>
                  <span className="text-lg font-display font-black text-white">{card.props.GCG_PROP_ENERGY}</span>
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-0.5">Energy</span>
                </div>
              )}
            </div>

            {/* Name & Tags */}
            <div className="flex flex-col gap-2.5 mt-2 text-center lg:text-left w-full max-w-[280px] mx-auto lg:max-w-none">
              <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight leading-none">
                {card.name}
              </h1>
              <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 mt-1">
                {tags.map((tag, idx) => (
                  <div key={idx} className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-wider backdrop-blur-md">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Lore Box */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 bg-[#161b22] rounded-xl p-4 border border-white/5 flex flex-col gap-2.5 shadow-xl hover:border-white/10 transition-colors w-full max-w-[280px] mx-auto lg:max-w-none"
            >
              {card.storyTitle && (
                <h3 className="text-[14px] font-bold text-gray-300">
                  {card.storyTitle}
                </h3>
              )}
              {card.storyDetail && (
                <p className="text-[13px] text-gray-400 leading-relaxed italic border-l-[3px] border-gray-600 pl-3">
                  "{card.storyDetail}"
                </p>
              )}
              {card.source && (
                <div className="pt-2.5 border-t border-white/5 mt-1">
                  <h4 className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                    Source
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                    {card.source}
                  </p>
                </div>
              )}
            </motion.div>

          </div>
        </div>

        {/* ======================= */}
        {/* RIGHT COLUMN (SCROLL)   */}
        {/* ======================= */}
        <div className="flex-1 flex flex-col gap-8 lg:pt-0">
          
          {/* Talent Section */}
          {card.talent && Object.keys(card.talent).length > 0 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-[20px] font-black font-display uppercase text-white tracking-widest flex items-center gap-3 ml-1">
                <span className="w-1 h-5 bg-blue-500 rounded-sm" />
                Talents
              </h2>
              
              <div className="flex flex-col gap-4">
                {Object.entries(card.talent).map(([skillId, skill]) => {
                  const subSkillObj = skill.subSkills ? Object.keys(skill.subSkills)[0] : null;
                  const relatedSubskill = subSkillObj ? subSkills.find(s => s.key === subSkillObj) : null;
                  const skillTypeTag = skill.tags ? Object.values(skill.tags)[0] : 'Skill';

                  return (
                    <div key={skillId} className="bg-[#161b22] rounded-xl border border-white/5 flex flex-col overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300">
                      
                      {/* Skill Header (Flex 2 Columns) */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-white/5">
                        
                        {/* Left: Icon & Title */}
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 relative shrink-0 rounded-[10px] overflow-hidden bg-[#0d1117] border border-white/5 flex items-center justify-center p-1">
                            <FallbackImage 
                              src={`https://gi.yatta.moe/assets/UI/${skill.icon}.png`} 
                              alt={skill.name} 
                              fill 
                              className="object-contain scale-125 drop-shadow-md" 
                              unoptimized
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <h4 className="text-[17px] font-black text-white font-display tracking-wide leading-tight">{skill.name}</h4>
                            <span className="text-[9px] font-black text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-[2px] rounded uppercase tracking-widest w-fit leading-none mt-0.5">
                              {skillTypeTag}
                            </span>
                          </div>
                        </div>
                        
                        {/* Right: Costs */}
                        <div className="flex items-center gap-2 sm:justify-end">
                          {skill.cost && Object.entries(skill.cost).map(([costType, costValue]) => {
                            let elementKey = costType.replace('GCG_COST_DICE_', '').toLowerCase();
                            let iconSrc = `/assets/elements/${elementKey}.webp`;
                            
                            return (
                              <div key={costType} className="flex flex-col items-center gap-1">
                                <div className="w-[26px] h-[26px] relative flex items-center justify-center bg-[#0d1117] rounded-full border border-white/5 shadow-sm">
                                  {costType === 'GCG_COST_DICE_VOID' || costType === 'GCG_COST_DICE_SAME' ? (
                                    <svg className="w-[14px] h-[14px] text-white opacity-80" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                                    </svg>
                                  ) : costType === 'GCG_COST_ENERGY' ? (
                                    <svg className="w-[14px] h-[14px] text-yellow-400 opacity-90" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M12 2L22 12L12 22L2 12L12 2Z"/>
                                    </svg>
                                  ) : (
                                    <FallbackImage src={iconSrc} alt={elementKey} fill className="object-contain scale-[0.65] opacity-90" />
                                  )}
                                </div>
                                <span className="text-[11px] font-black text-white font-display leading-none">{costValue}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Skill Body */}
                      <div className="p-4 flex flex-col gap-4">
                        <div className="text-[14px] text-gray-300 leading-relaxed font-medium">
                          <TcgTextParser text={skill.description} params={skill.params} dictionary={card.dictionary} />
                        </div>
                        
                        {/* Subskill Box (Inset) */}
                        {relatedSubskill && (
                          <div className={`mt-1 bg-[#0b0e14] border-l-[3px] ${theme.border} rounded-r-xl p-4 shadow-inner relative`}>
                            <h5 className="text-[14px] font-black text-white mb-1.5">
                              {relatedSubskill.name}
                            </h5>
                            {relatedSubskill.tags && (
                              <span className="text-[9px] font-bold text-gray-500 mb-2 block uppercase tracking-widest">
                                {Object.values(relatedSubskill.tags).join(', ')}
                              </span>
                            )}
                            <div className="text-[13px] text-gray-400 leading-relaxed font-medium">
                              <TcgTextParser text={relatedSubskill.description} params={relatedSubskill.params} dictionary={card.dictionary} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Dictionary Section */}
          {dictionaryEntries && dictionaryEntries.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-[20px] font-black font-display uppercase text-white tracking-widest flex items-center gap-3 ml-1">
                <span className="w-1 h-5 bg-gray-500 rounded-sm" />
                Dictionary
              </h2>
              <div className="bg-[#161b22] rounded-xl border border-white/5 p-5 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6 hover:border-white/10 transition-colors">
                {dictionaryEntries.map(entry => (
                  <div key={entry.key} className="flex flex-col gap-1.5">
                    <h4 className="text-[13px] font-black text-white flex items-center gap-2 uppercase tracking-wide">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span> 
                      <TcgTextParser text={entry.name} dictionary={card.dictionary} />
                    </h4>
                    <div className="text-[13px] text-gray-400 leading-relaxed pl-3.5 border-l-[2px] border-white/5 ml-[3px] font-medium">
                      <TcgTextParser text={entry.description} dictionary={card.dictionary} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Related Entries Section */}
          {card.relatedEntries && card.relatedEntries.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-[20px] font-black font-display uppercase text-white tracking-widest flex items-center gap-3 ml-1">
                <span className="w-1 h-5 bg-purple-500 rounded-sm" />
                Related Entries
              </h2>
              <div className="flex flex-wrap gap-4">
                {card.relatedEntries.map(rel => (
                  <Link href={`/tcg/${rel.id}`} key={rel.id} className="group relative w-[110px] aspect-[256/440] rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
                    <FallbackImage 
                      src={`https://gi.yatta.moe/assets/UI/gcg/${rel.icon}.png`}
                      alt={rel.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    {/* Name Bar at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-6 pb-2 px-2">
                      <span className="block text-[11px] font-black text-white text-center leading-tight drop-shadow-md font-display">
                        {rel.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </div>
      </div>
    </main>
  );
}
