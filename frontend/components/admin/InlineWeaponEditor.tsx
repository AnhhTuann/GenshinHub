'use client';

import { useState, useEffect, useMemo } from 'react';
import { fetchGraphQL, GET_WEAPONS } from '@/lib/graphql';
import Image from 'next/image';

const WEAPON_TYPE_MAP: Record<string, string> = {
  'sword': 'Kiếm Đơn',
  'claymore': 'Trọng Kiếm',
  'polearm': 'Vũ Khí Cán Dài',
  'catalyst': 'Pháp Khí',
  'bow': 'Cung'
};

interface WeaponData {
  id: string;
  nameEn: string;
  iconUrl: string;
}

interface Props {
  characterId: string;
  weaponType: string;
  onClose: () => void;
  onSaved: () => void;
}

export default function InlineWeaponEditor({ characterId, weaponType, onClose, onSaved }: Props) {
  const [weapons, setWeapons] = useState<WeaponData[]>([]);
  const [search, setSearch] = useState('');
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponData | null>(null);
  
  const [rank, setRank] = useState(1);
  const [isF2P, setIsF2P] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGraphQL(GET_WEAPONS).then(data => {
      const allWeapons = data.weapons || [];
      const mappedWeaponType = WEAPON_TYPE_MAP[weaponType?.toLowerCase() || ''] || weaponType;
      const filteredByType = allWeapons.filter((w: any) => 
        w.type?.toLowerCase() === mappedWeaponType?.toLowerCase()
      );
      setWeapons(filteredByType);
    });
    
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [weaponType]);

  const filteredWeapons = useMemo(() => {
    if (!search.trim()) return weapons;
    return weapons.filter(w => w.nameEn.toLowerCase().includes(search.toLowerCase()));
  }, [weapons, search]);

  const handleSave = async () => {
    if (!selectedWeapon) return;
    setLoading(true);
    try {
      await fetchGraphQL(`
        mutation AddCharacterWeapon($characterId: String!, $weaponId: String!, $rank: Int!, $isF2P: Boolean!) {
          addCharacterWeapon(characterId: $characterId, weaponId: $weaponId, rank: $rank, isF2P: $isF2P)
        }
      `, {
        characterId,
        weaponId: selectedWeapon.id,
        rank,
        isF2P
      });
      onSaved();
      onClose();
    } catch (err: any) {
      alert("Error: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-[#0d0d14] border border-white/10 rounded-2xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-black text-white">➕ Add Best Weapon</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">✕</button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 custom-scrollbar">
          {!selectedWeapon ? (
            <>
              <input
                type="text"
                placeholder="Search weapons..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50 mb-4"
                autoFocus
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredWeapons.map(w => (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWeapon(w)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/20 transition-all text-center"
                  >
                    <div className="relative w-12 h-12">
                      <Image src={w.iconUrl} alt={w.nameEn} fill className="object-contain" unoptimized />
                    </div>
                    <span className="text-[10px] font-bold text-gray-300">{w.nameEn}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/5">
                <div className="relative w-16 h-16 shrink-0">
                  <Image src={selectedWeapon.iconUrl} alt={selectedWeapon.nameEn} fill className="object-contain" unoptimized />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-amber-400">{selectedWeapon.nameEn}</h3>
                  <button onClick={() => setSelectedWeapon(null)} className="text-xs text-gray-500 hover:text-white mt-1 underline">Change Weapon</button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Rank Priority</label>
                <input
                  type="number"
                  min="1"
                  value={rank}
                  onChange={e => setRank(parseInt(e.target.value) || 1)}
                  className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <label className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                <input
                  type="checkbox"
                  checked={isF2P}
                  onChange={e => setIsF2P(e.target.checked)}
                  className="w-5 h-5 rounded accent-amber-500"
                />
                <span className="text-sm font-bold text-gray-300">Is F2P / Alternative Choice?</span>
              </label>
            </div>
          )}
        </div>

        {selectedWeapon && (
          <div className="p-5 border-t border-white/10 flex items-center justify-end gap-3 shrink-0 bg-black/20">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2.5 rounded-xl text-sm font-black bg-amber-500 hover:bg-amber-400 text-black transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Add Weapon'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
