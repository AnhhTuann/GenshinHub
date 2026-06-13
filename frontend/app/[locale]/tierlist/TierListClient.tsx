"use client";
import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Tier, TIERS_ORDER, TIER_STYLES, getCharacterTier, getWeaponTier } from '@/data/tierlist';

type TierCharacter = { id: string, nameEn: string, nameVi: string, avatarUrl: string, rarity: number, element: string };
type TierWeapon    = { id: string, nameEn: string, nameVi: string, iconUrl: string | null, rarity: number, type: string };

const ELEMENT_COLORS: Record<string, string> = {
  Pyro: 'bg-[#ff6b4a]', Hydro: 'bg-[#4fc3f7]', Cryo: 'bg-[#80deea]', Electro: 'bg-[#ce93d8]', Anemo: 'bg-[#4db6ac]', Geo: 'bg-[#ffd54f]', Dendro: 'bg-[#aed581]'
};

export default function TierListClient({ locale, characters, weapons }: { locale: string, characters: TierCharacter[], weapons: TierWeapon[] }) {
  const t = useTranslations('TierList');
  const [tab, setTab] = useState<'character' | 'weapon'>('character');

  const groupedCharacters = useMemo(() => {
    const group: Record<Tier, TierCharacter[]> = { SS: [], S: [], A: [], B: [], C: [], Unranked: [] };
    characters.forEach(c => group[getCharacterTier(c.nameEn)].push(c));
    return group;
  }, [characters]);

  const groupedWeapons = useMemo(() => {
    const group: Record<Tier, TierWeapon[]> = { SS: [], S: [], A: [], B: [], C: [], Unranked: [] };
    weapons.forEach(w => group[getWeaponTier(w.nameEn)].push(w));
    return group;
  }, [weapons]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black font-display tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 mb-4 drop-shadow-[0_0_20px_rgba(250,204,21,0.2)]">
          {t('title')}
        </h1>
        <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setTab('character')}
          className={`px-8 py-3 rounded-2xl font-bold transition-all duration-300 ${tab === 'character' ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 shadow-[0_0_20px_rgba(250,204,21,0.15)]' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-transparent'}`}
        >
          {t('characterTab')}
        </button>
        <button
          onClick={() => setTab('weapon')}
          className={`px-8 py-3 rounded-2xl font-bold transition-all duration-300 ${tab === 'weapon' ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 shadow-[0_0_20px_rgba(250,204,21,0.15)]' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-transparent'}`}
        >
          {t('weaponTab')}
        </button>
      </div>

      {/* Tier Rows */}
      <div className="flex flex-col gap-6">
        {TIERS_ORDER.map(tier => {
          const items = tab === 'character' ? groupedCharacters[tier] : groupedWeapons[tier];
          if (items.length === 0) return null;

          const styles = TIER_STYLES[tier];
          
          return (
            <div key={tier} className="flex flex-col md:flex-row bg-[#0b0b12] border border-white/[0.05] rounded-3xl overflow-hidden shadow-xl">
              {/* Badge */}
              <div className={`md:w-36 shrink-0 flex flex-col justify-center items-center py-6 px-4 border-b md:border-b-0 md:border-r ${styles.bg} ${styles.border}`}>
                <span className={`text-4xl md:text-5xl font-black font-display drop-shadow-md ${styles.text}`}>
                  {tier !== 'Unranked' ? tier : '?'}
                </span>
                <span className={`text-[10px] uppercase tracking-widest font-bold mt-2 opacity-80 ${styles.text} text-center`}>
                  {tier === 'Unranked' ? t('unranked') : t(`tier${tier}`)}
                </span>
              </div>
              
              {/* Grid */}
              <div className="p-4 md:p-6 flex-1 flex flex-wrap gap-3">
                {items.map((item: any) => {
                  const isChar = tab === 'character';
                  const name = locale === 'en' ? item.nameEn : item.nameVi;
                  const is5Star = item.rarity === 5;
                  const glowColor = isChar ? (ELEMENT_COLORS[item.element] || 'bg-white') : 'bg-white';
                  
                  return (
                    <Link
                      key={item.id}
                      href={isChar ? `/characters/${item.id}` : `/weapons`}
                      className="group relative w-[70px] sm:w-[84px] h-[86px] sm:h-[102px] flex flex-col rounded-xl overflow-hidden border border-white/[0.08] hover:border-white/30 transition-all duration-300 hover:scale-105 hover:z-10 shadow-lg"
                    >
                      {/* Rarity Background */}
                      <div className={`absolute inset-0 bg-gradient-to-b ${is5Star ? 'from-amber-600/30 to-amber-900/40' : 'from-purple-600/30 to-purple-900/40'}`} />
                      
                      {/* Image */}
                      <div className="relative flex-1 w-full flex justify-center items-end bg-[#111]">
                        {isChar ? (
                          <Image src={item.avatarUrl || '/images/avatars/UI_AvatarIcon_PlayerGirl.png'} alt={name} fill className="object-cover object-top scale-110" sizes="84px" />
                        ) : (
                          <Image src={item.iconUrl || '/placeholder.png'} alt={name} width={64} height={64} className="object-contain mb-2" />
                        )}
                        {/* Element overlay for characters */}
                        {isChar && (
                          <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-black/50 backdrop-blur flex items-center justify-center p-[2px]">
                            <Image src={`/elements/${item.element.toLowerCase()}.png`} alt={item.element} width={12} height={12} />
                          </div>
                        )}
                      </div>
                      
                      {/* Name Bar */}
                      <div className="relative z-10 w-full bg-black/80 py-1 px-0.5 border-t border-white/10 flex items-center justify-center">
                        <span className="text-[9px] sm:text-[10px] font-bold text-white text-center truncate w-full px-1">
                          {name}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
