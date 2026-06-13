"use client";
import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Tier, TIERS_ORDER, TIER_STYLES, Role } from '@/data/tierlist';

type TierCharacter = { id: string, nameEn: string, nameVi: string, avatarUrl: string, rarity: number, element: string, tier: string | null, role: string | null, recommendedC: string | null, tierNoteEn: string[], tierNoteVi: string[] };
type TierWeapon    = { id: string, nameEn: string, nameVi: string, iconUrl: string | null, rarity: number, type: string, tier: string | null };

const ELEMENT_COLORS: Record<string, string> = {
  Pyro: 'bg-[#ff6b4a]', Hydro: 'bg-[#4fc3f7]', Cryo: 'bg-[#80deea]', Electro: 'bg-[#ce93d8]', Anemo: 'bg-[#4db6ac]', Geo: 'bg-[#ffd54f]', Dendro: 'bg-[#aed581]'
};

function TierItemCard({ item, isChar, locale }: { item: any, isChar: boolean, locale: string }) {
  const name = locale === 'en' ? item.nameEn : item.nameVi;
  const is5Star = item.rarity === 5;
  
  return (
    <Link
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
        <button
          onClick={() => setTab('notes')}
          className={`px-8 py-3 rounded-2xl font-bold transition-all duration-300 ${tab === 'notes' ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 shadow-[0_0_20px_rgba(250,204,21,0.15)]' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-transparent'}`}
        >
          {t('notesTab')}
        </button>
      </div>

      {/* Tab Content */}
      {tab === 'notes' ? (
        <div className="flex flex-col gap-10 max-w-5xl mx-auto">
          {/* Notes Header */}
          <div className="mb-2">
            <h2 className="text-2xl md:text-3xl font-black font-display text-white mb-2 drop-shadow-md">{t('notesTitle')}</h2>
            <p className="text-white/60 text-sm md:text-base">{t('notesDesc')}</p>
          </div>
          
          {TIERS_ORDER.map(tier => {
            if (tier === 'Unranked') return null;
            
            const charsInTier = groupedCharacters[tier];
            const charsWithNotes = charsInTier.filter(c => (c.tierNoteEn && c.tierNoteEn.length > 0) || (c.tierNoteVi && c.tierNoteVi.length > 0));
            
            if (charsWithNotes.length === 0) return null;
            
            return (
              <div key={tier} className="flex flex-col gap-4">
                <h3 className="text-xl md:text-2xl font-bold text-white font-display">Tier {tier}</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {charsWithNotes.map((char) => {
                    const name = locale === 'en' ? char.nameEn : char.nameVi;
                    const notesList = locale === 'en' ? (char.tierNoteEn || []) : (char.tierNoteVi || []);
                    
                    return (
                      <div key={char.id} className="flex bg-[#0b0f19] border border-white/[0.08] hover:border-white/20 transition-colors rounded-xl p-4 gap-4 shadow-lg">
                        {/* Avatar */}
                        <div className="flex flex-col items-center w-[70px] shrink-0 pt-2">
                          <div className="relative w-14 h-14">
                            <Image src={char.avatarUrl || '/images/avatars/UI_AvatarIcon_PlayerGirl.png'} alt={name} fill className="object-contain" />
                            <div className="absolute -top-1 -right-2 w-4 h-4 drop-shadow-md">
                              <Image src={`/elements/${char.element.toLowerCase()}.png`} alt={char.element} fill className="object-contain" />
                            </div>
                            <div className="absolute -bottom-1 -left-2 bg-black/80 px-1 py-0.5 rounded text-[8px] font-bold text-white border border-white/20">
                              {char.recommendedC || 'C0'}
                            </div>
                          </div>
                          <span className="mt-3 text-[10px] font-bold text-white/90 text-center leading-tight truncate w-full px-1">{name}</span>
                        </div>
                        {/* Notes List */}
                        <div className="flex-1 flex flex-col justify-center border-l border-white/[0.06] pl-5">
                          <ul className="list-disc list-outside ml-3 flex flex-col gap-2 text-xs md:text-[13px] text-white/70 leading-relaxed">
                            {notesList.map((n: string, i: number) => (
                              <li key={i}>{n}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {TIERS_ORDER.map(tier => {
            const items = tab === 'character' ? groupedCharacters[tier] : groupedWeapons[tier];
            if (items.length === 0) return null;

            const styles = TIER_STYLES[tier];
            
            return (
              <div key={tier} className="flex flex-col md:flex-row bg-[#0b0b12] border border-white/[0.05] rounded-3xl overflow-hidden shadow-xl">
                {/* Badge */}
                <div className={`w-12 sm:w-16 shrink-0 flex flex-col justify-center items-center py-6 px-2 border-b md:border-b-0 md:border-r ${styles.bg} ${styles.border}`}>
                  <span className={`text-xl sm:text-2xl font-black font-display drop-shadow-md text-white/90`}>
                    {tier !== 'Unranked' ? tier : '?'}
                  </span>
                </div>
                
                {/* Grid */}
                {tab === 'character' ? (
                  <div className="flex-1 grid grid-cols-3 divide-x divide-white/[0.05] bg-[#0b0f19]">
                    {(['Main DPS', 'Sub DPS', 'Support'] as Role[]).map(role => {
                      const charsInRole = (items as TierCharacter[]).filter(c => c.role === role);
                      return (
                        <div key={role} className="flex flex-col bg-black/20">
                          <div className="py-2.5 px-2 text-center border-b border-white/[0.05] bg-white/[0.02]">
                            <span className="text-[10px] sm:text-[11px] font-black text-white/50 uppercase tracking-[0.15em]">{role}</span>
                          </div>
                          <div className="p-3 sm:p-4 flex flex-wrap gap-2.5 sm:gap-3 content-start justify-center">
                            {charsInRole.map((char: any) => (
                              <TierItemCard key={char.id} item={char} isChar={true} locale={locale} />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 md:p-6 flex-1 flex flex-wrap gap-3 content-start bg-[#0b0f19]">
                    {items.map((weapon: any) => (
                      <TierItemCard key={weapon.id} item={weapon} isChar={false} locale={locale} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
