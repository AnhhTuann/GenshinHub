"use client";
import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Tier, TIERS_ORDER, TIER_STYLES, Role } from '@/data/tierlist';
import { motion, AnimatePresence, Variants } from 'framer-motion';

type TierCharacter = { id: string, nameEn: string, nameVi: string, avatarUrl: string, rarity: number, element: string, tier: string | null, role: string | null, recommendedC: string | null, tierNoteEn: string[], tierNoteVi: string[] };
type TierWeapon    = { id: string, nameEn: string, nameVi: string, iconUrl: string | null, rarity: number, type: string, tier: string | null };

const ELEMENT_COLORS: Record<string, string> = {
  Pyro: 'bg-[#ff6b4a]', Hydro: 'bg-[#4fc3f7]', Cryo: 'bg-[#80deea]', Electro: 'bg-[#ce93d8]', Anemo: 'bg-[#4db6ac]', Geo: 'bg-[#ffd54f]', Dendro: 'bg-[#aed581]'
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

function TierItemCard({ item, isChar, locale }: { item: any, isChar: boolean, locale: string }) {
  const name = locale === 'en' ? item.nameEn : item.nameVi;
  const is5Star = item.rarity === 5;
  
  return (
    <Link href={isChar ? `/characters/${item.id}` : `/weapons`}>
      <motion.div
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="group relative w-[70px] sm:w-[84px] h-[86px] sm:h-[102px] flex flex-col rounded-xl overflow-hidden border border-white/10 hover:border-white/50 transition-colors shadow-xl z-0 hover:z-20 cursor-pointer"
      >
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${is5Star ? 'bg-amber-500/40' : 'bg-purple-500/40'}`} />
        
        {/* Rarity Background */}
        <div className={`absolute inset-0 bg-gradient-to-b ${is5Star ? 'from-amber-500/30 via-amber-700/20 to-amber-900/50' : 'from-purple-500/30 via-purple-700/20 to-purple-900/50'} z-0`} />
        
        {/* Image */}
        <div className="relative z-10 flex-1 w-full flex justify-center items-end bg-black/30">
          {isChar ? (
            <Image src={item.avatarUrl || '/images/avatars/UI_AvatarIcon_PlayerGirl.png'} alt={name} fill className="object-cover object-top scale-110 drop-shadow-2xl" sizes="84px" />
          ) : (
            <Image src={item.iconUrl || '/placeholder.png'} alt={name} width={64} height={64} className="object-contain mb-2 drop-shadow-lg" />
          )}
          {/* Element overlay for characters */}
          {isChar && (
            <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center p-[3px] border border-white/20 shadow-md">
              <Image src={`/elements/${item.element.toLowerCase()}.png`} alt={item.element} width={14} height={14} className="object-contain" />
            </div>
          )}
        </div>
        
        {/* Name Bar */}
        <div className="relative z-20 w-full bg-black/90 py-1.5 px-0.5 border-t border-white/10 flex items-center justify-center backdrop-blur-md">
          <span className="text-[9px] sm:text-[10px] font-bold text-white/80 group-hover:text-white text-center truncate w-full px-1 drop-shadow-md transition-colors">
            {name}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

export default function TierListClient({ locale, characters, weapons }: { locale: string, characters: TierCharacter[], weapons: TierWeapon[] }) {
  const t = useTranslations('TierList');
  const [tab, setTab] = useState<'character' | 'weapon' | 'notes'>('character');

  const groupedCharacters = useMemo(() => {
    const group: Record<Tier, TierCharacter[]> = { SS: [], S: [], A: [], B: [], C: [], Unranked: [] };
    characters.forEach(c => {
      const tier = (c.tier as Tier) || 'Unranked';
      if (group[tier]) group[tier].push(c);
    });
    return group;
  }, [characters]);

  const groupedWeapons = useMemo(() => {
    const group: Record<Tier, TierWeapon[]> = { SS: [], S: [], A: [], B: [], C: [], Unranked: [] };
    weapons.forEach(w => {
      const tier = (w.tier as Tier) || 'Unranked';
      if (group[tier]) group[tier].push(w);
    });
    return group;
  }, [weapons]);

  const tabs = [
    { id: 'character', label: t('characterTab') },
    { id: 'weapon', label: t('weaponTab') },
    { id: 'notes', label: t('notesTab') }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-black font-display tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-500 mb-6 drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]">
          {t('title')}
        </h1>
        <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          {t('description')}
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-12 bg-white/[0.02] p-1.5 rounded-full border border-white/5 w-fit mx-auto backdrop-blur-md shadow-2xl">
        {tabs.map((tItem) => (
          <button
            key={tItem.id}
            onClick={() => setTab(tItem.id as any)}
            className={`relative px-8 py-3 rounded-full font-bold text-sm transition-colors duration-300 ${tab === tItem.id ? 'text-black' : 'text-white/50 hover:text-white'}`}
          >
            {tab === tItem.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.4)]"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 tracking-wide uppercase">{tItem.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          {tab === 'notes' ? (
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-8 max-w-5xl mx-auto">
              <div className="mb-4 text-center">
                <h2 className="text-3xl font-black font-display text-white mb-3 drop-shadow-lg tracking-wide">{t('notesTitle')}</h2>
                <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">{t('notesDesc')}</p>
              </div>
              
              {TIERS_ORDER.map(tier => {
                if (tier === 'Unranked') return null;
                
                const charsInTier = groupedCharacters[tier];
                const charsWithNotes = charsInTier.filter(c => (c.tierNoteEn && c.tierNoteEn.length > 0) || (c.tierNoteVi && c.tierNoteVi.length > 0));
                
                if (charsWithNotes.length === 0) return null;
                
                return (
                  <motion.div variants={itemVariants} key={tier} className="flex flex-col gap-5 relative">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 flex items-center justify-center rounded-xl font-black text-2xl font-display ${TIER_STYLES[tier].bg} ${TIER_STYLES[tier].text} shadow-lg border ${TIER_STYLES[tier].border}`}>
                        {tier}
                      </div>
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pl-4 sm:pl-16">
                      {charsWithNotes.map((char) => {
                        const name = locale === 'en' ? char.nameEn : char.nameVi;
                        const notesList = locale === 'en' ? (char.tierNoteEn || []) : (char.tierNoteVi || []);
                        
                        return (
                          <div key={char.id} className="flex bg-white/[0.02] border border-white/[0.05] hover:border-white/20 hover:bg-white/[0.04] transition-all rounded-2xl p-4 gap-5 shadow-lg backdrop-blur-sm group">
                            {/* Avatar */}
                            <div className="flex flex-col items-center w-[76px] shrink-0 pt-1">
                              <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors shadow-md bg-black/40">
                                <Image src={char.avatarUrl || '/images/avatars/UI_AvatarIcon_PlayerGirl.png'} alt={name} fill className="object-cover scale-110" />
                                <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-black/60 p-[2px] backdrop-blur-md">
                                  <Image src={`/elements/${char.element.toLowerCase()}.png`} alt={char.element} fill className="object-contain" />
                                </div>
                                <div className="absolute bottom-0 inset-x-0 bg-black/80 py-0.5 text-[9px] font-black text-amber-400 text-center uppercase tracking-widest border-t border-white/10">
                                  {char.recommendedC || 'C0'}
                                </div>
                              </div>
                              <span className="mt-3 text-[11px] font-bold text-white/80 group-hover:text-white transition-colors text-center leading-tight truncate w-full px-1">{name}</span>
                            </div>
                            
                            {/* Notes List */}
                            <div className="flex-1 flex flex-col justify-center border-l border-white/[0.05] pl-5">
                              <ul className="flex flex-col gap-3">
                                {notesList.map((n: string, i: number) => (
                                  <li key={i} className="flex gap-3 text-[13px] text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                                    <span className="text-amber-500/50 mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-amber-500" />
                                    <span>{n}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-8">
              {TIERS_ORDER.map(tier => {
                const items = tab === 'character' ? groupedCharacters[tier] : groupedWeapons[tier];
                if (items.length === 0) return null;

                const styles = TIER_STYLES[tier];
                
                return (
                  <motion.div variants={itemVariants} key={tier} className="relative flex flex-col md:flex-row bg-white/[0.01] border border-white/[0.04] rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-xl group hover:border-white/10 transition-colors">
                    {/* Subtle glow behind the row */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${styles.bg}`} />

                    {/* Badge */}
                    <div className={`w-16 sm:w-24 shrink-0 flex flex-col justify-center items-center py-6 px-2 border-b md:border-b-0 md:border-r relative overflow-hidden ${styles.bg} ${styles.border}`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                      <span className={`text-3xl sm:text-4xl font-black font-display drop-shadow-[0_0_15px_currentColor] ${styles.text} relative z-10`}>
                        {tier !== 'Unranked' ? tier : '?'}
                      </span>
                    </div>
                    
                    {/* Grid */}
                    {tab === 'character' ? (
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.04] bg-transparent relative z-10">
                        {(['Main DPS', 'Sub DPS', 'Support'] as Role[]).map(role => {
                          const charsInRole = (items as TierCharacter[]).filter(c => c.role === role);
                          return (
                            <div key={role} className="flex flex-col hover:bg-white/[0.01] transition-colors">
                              <div className="py-3 px-4 flex items-center gap-3 border-b border-white/[0.04] bg-white/[0.01]">
                                <div className={`w-1.5 h-1.5 rounded-full ${role === 'Main DPS' ? 'bg-red-500' : role === 'Sub DPS' ? 'bg-purple-500' : 'bg-blue-500'} shadow-[0_0_10px_currentColor]`} />
                                <span className="text-[10px] sm:text-[11px] font-black text-white/60 uppercase tracking-[0.2em]">{role}</span>
                                <span className="ml-auto text-[10px] font-bold text-white/30 bg-white/5 px-2 py-0.5 rounded-full">{charsInRole.length}</span>
                              </div>
                              <div className="p-4 sm:p-5 flex flex-wrap gap-3 sm:gap-4 content-start">
                                {charsInRole.map((char: any) => (
                                  <TierItemCard key={char.id} item={char} isChar={true} locale={locale} />
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-5 md:p-8 flex-1 flex flex-wrap gap-4 content-start bg-transparent relative z-10">
                        {items.map((weapon: any) => (
                          <TierItemCard key={weapon.id} item={weapon} isChar={false} locale={locale} />
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
