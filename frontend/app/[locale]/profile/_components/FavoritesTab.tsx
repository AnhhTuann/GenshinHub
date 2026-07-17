"use client";

import { useEffect, useState } from 'react';
import { User } from '@/context/UserContext';
import { fetchGraphQLClient } from '@/lib/graphql/client';
import CharacterCard from '@/components/characters/client/CharacterCard';
import WeaponCard from '@/components/WeaponCard';
import ArtifactCard from '@/components/ArtifactCard';
import { CharacterData } from '@/types/character';
import { Loader2 } from 'lucide-react';

export default function FavoritesTab({ user }: { user: User }) {
  const [activeSubTab, setActiveSubTab] = useState<'character' | 'weapon' | 'artifact'>('character');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavs = async () => {
      if (!user.favoriteIds || user.favoriteIds.length === 0) {
        setItems([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // We fetch full data for all types and filter locally based on favoriteIds
        const data = await fetchGraphQLClient(`
          query AllItems {
            characters { id nameEn nameVi element rarity avatarUrl splashArtUrl }
            weapons { id nameEn nameVi rarity type baseAtk subStat subStatValue passiveDescEn passiveDescVi iconUrl }
            artifacts { id nameEn nameVi rarityList piece2DescEn piece2DescVi piece4DescEn piece4DescVi iconUrl }
          }
        `);
        
        let allItems = [];
        if (activeSubTab === 'character' && data.characters) allItems = data.characters;
        else if (activeSubTab === 'weapon' && data.weapons) allItems = data.weapons;
        else if (activeSubTab === 'artifact' && data.artifacts) allItems = data.artifacts;

        const favs = allItems.filter((i: any) => user.favoriteIds?.includes(i.id));
        setItems(favs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavs();
  }, [user.favoriteIds, activeSubTab]);

  return (
    <div className="space-y-6">
      {/* Sub-tabs */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'character', label: 'Characters' },
          { id: 'weapon', label: 'Weapons' },
          { id: 'artifact', label: 'Artifacts' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${
              activeSubTab === tab.id
                ? 'bg-[#c8a84b]/10 text-[#f0d080] border border-[#c8a84b]/30'
                : 'text-white/40 hover:bg-white/5 hover:text-white/80 border border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center p-10"><Loader2 className="animate-spin text-[#c8a84b]" /></div>
      ) : items.length === 0 ? (
        <div className="text-center p-10 border border-white/5 bg-white/[0.01] rounded-2xl">
          <p className="text-white/40 text-sm font-medium">You haven&apos;t favorited any {activeSubTab}s yet.</p>
        </div>
      ) : (
        activeSubTab === 'character' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {items.map((char) => <CharacterCard key={char.id} character={char} />)}
          </div>
        ) : activeSubTab === 'weapon' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {items.map((wpn, i) => <WeaponCard key={wpn.id} weapon={wpn} index={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {items.map((art) => (
              <ArtifactCard 
                key={art.id} 
                artifact={{
                  artifactSetId: art.id,
                  setNameEn: art.nameEn,
                  setNameVi: art.nameVi,
                  pieces: 4,
                  rarity: art.maxRarity || art.rarity || 5,
                  iconUrl: art.iconUrl,
                  sands: [], goblet: [], circlet: [], subStatsPriority: []
                } as any} 
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}
