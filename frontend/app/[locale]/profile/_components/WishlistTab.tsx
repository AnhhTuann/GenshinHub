"use client";

import { useEffect, useState } from 'react';
import { User } from '@/context/UserContext';
import { Star, Info, Loader2 } from 'lucide-react';
import { fetchGraphQLClient } from '@/lib/graphql/client';
import FallbackImage from '@/components/ui/FallbackImage';

export default function WishlistTab({ user }: { user: User }) {
  const [currentPulls, setCurrentPulls] = useState<number>(0);
  const targetPulls = 180; // Hard pity guarantee

  const progress = Math.min((currentPulls / targetPulls) * 100, 100);

  const [activeSubTab, setActiveSubTab] = useState<'CHARACTER' | 'WEAPON' | 'ARTIFACT'>('CHARACTER');
  const [itemDict, setItemDict] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      if (!user.wishlist || user.wishlist.length === 0) {
        setLoading(false);
        return;
      }
      try {
        const data = await fetchGraphQLClient(`
          query AllItems {
            characters { id nameEn nameVi rarity avatarUrl }
            weapons { id nameEn nameVi rarity type iconUrl }
            artifacts { id nameEn nameVi rarityList iconUrl }
          }
        `);
        
        const dict: Record<string, any> = {};
        if (data.characters) data.characters.forEach((c: any) => dict[c.id] = c);
        if (data.weapons) data.weapons.forEach((w: any) => dict[w.id] = w);
        if (data.artifacts) data.artifacts.forEach((a: any) => dict[a.id] = a);
        
        setItemDict(dict);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [user.wishlist]);

  const filteredWishlist = (user.wishlist || []).filter(w => w.itemType === activeSubTab);

  return (
    <div className="space-y-8">
      {/* Pity Calculator */}
      <div className="bg-[#1a1a24] border border-[#c8a84b]/30 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Star className="w-32 h-32 text-[#c8a84b]" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <h3 className="text-lg font-black uppercase tracking-widest text-[#f0d080] mb-2 flex items-center gap-2">
              <Star className="w-5 h-5" />
              Wish Progress Tracker
            </h3>
            <p className="text-white/60 text-sm mb-4">
              Enter your current intertwined fates / equivalent primogems. (180 pulls for guaranteed featured 5★).
            </p>
            
            <div className="flex items-center gap-4 mb-4">
              <input
                type="number"
                min={0}
                value={currentPulls}
                onChange={(e) => setCurrentPulls(parseInt(e.target.value) || 0)}
                className="bg-black/50 border border-white/20 rounded-xl px-4 py-2 text-white w-32 focus:border-[#c8a84b] outline-none transition-colors"
                placeholder="0"
              />
              <span className="text-white/40 font-bold uppercase tracking-wider text-xs">Pulls saved</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden relative border border-white/5">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#8a6820] to-[#f0d080] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs font-bold uppercase tracking-wider text-white/40">
              <span>0</span>
              <span className="text-[#c8a84b]">{currentPulls} / {targetPulls}</span>
              <span>180</span>
            </div>
          </div>

          <div className="w-full md:w-auto bg-black/40 rounded-xl p-4 border border-white/5 text-center min-w-[200px]">
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Status</p>
            {currentPulls >= targetPulls ? (
              <p className="text-emerald-400 font-black text-lg">Guaranteed!</p>
            ) : currentPulls >= 90 ? (
              <p className="text-[#f0d080] font-black text-lg">50/50 Chance</p>
            ) : (
              <p className="text-red-400 font-black text-lg">Need {targetPulls - currentPulls} more</p>
            )}
          </div>
        </div>
      </div>

      {/* Wishlist Items */}
      <div>
        <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-4 overflow-x-auto no-scrollbar">
          {[
            { id: 'CHARACTER', label: 'Characters' },
            { id: 'WEAPON', label: 'Weapons' },
            { id: 'ARTIFACT', label: 'Artifacts' },
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
        ) : filteredWishlist.length === 0 ? (
          <div className="text-center p-10 bg-white/5 rounded-2xl border border-dashed border-white/20">
            <p className="text-white/40">Your wishlist is empty for this category.</p>
          </div>
        ) : (
          <div className="grid gap-4">
             {filteredWishlist.map(item => {
               const details = itemDict[item.itemId];
               const name = details ? (details.nameEn || details.nameVi) : item.itemId.replace(/-/g, ' ');
               const imgUrl = details ? (details.avatarUrl || details.iconUrl) : '';
               const rarity = details ? (details.maxRarity || details.rarity || 5) : 5;
               const stars = '★'.repeat(rarity);

               return (
                 <div key={item.id} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                   <div className="w-14 h-14 rounded-full bg-black/50 border-2 border-[#c8a84b]/50 overflow-hidden shrink-0 flex items-center justify-center p-1">
                      {imgUrl ? (
                        <FallbackImage src={imgUrl} width={56} height={56} className="w-full h-full object-contain" alt={name} />
                      ) : (
                        <span className="text-xl">✨</span>
                      )}
                   </div>
                   <div className="flex-1">
                     <h4 className="font-black text-white capitalize text-sm sm:text-base flex items-center gap-2">
                       {name}
                       <span className="text-[#f0d080] text-[10px] tracking-widest">{stars}</span>
                     </h4>
                     <p className="text-xs text-white/50 italic mt-1 bg-black/40 inline-block px-2 py-1 rounded-md border border-white/5">
                       Note: {item.note || 'None'}
                     </p>
                   </div>
                   <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 border border-white/10 text-white/50 font-black text-xs">
                     P{item.priority}
                   </div>
                 </div>
               );
             })}
          </div>
        )}
      </div>
    </div>
  );
}
