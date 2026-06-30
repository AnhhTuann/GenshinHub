"use client";
import { useState, useEffect } from "react";
import { fetchGraphQL, GET_CHARACTERS, GET_WEAPONS, UPDATE_CHARACTER_TIER_LIST, UPDATE_WEAPON_TIER_LIST, GET_TIER_RANKS } from "@/lib/graphql";
import Image from "next/image";
import toast from 'react-hot-toast';
import ManageTiersSection from "@/components/admin/ManageTiersSection";
import dynamic from 'next/dynamic';

const AICharacterGenerator = dynamic(() => import('@/components/admin/AICharacterGenerator'), { ssr: false });

export default function AdminTierListPage() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [weapons, setWeapons] = useState<any[]>([]);
  const [tierRanks, setTierRanks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const [charData, weaponData, tierData] = await Promise.all([
        fetchGraphQL(GET_CHARACTERS),
        fetchGraphQL(GET_WEAPONS),
        fetchGraphQL(GET_TIER_RANKS)
      ]);
      setCharacters(charData.characters);
      setWeapons(weaponData.weapons);
      setTierRanks(tierData.tierRanks || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleUpdateChar = async (id: string, updates: any) => {
    setSavingId(id);
    try {
      await fetchGraphQL(UPDATE_CHARACTER_TIER_LIST, { id, ...updates });
      setCharacters(chars => chars.map(c => c.id === id ? { ...c, ...updates } : c));
    } catch (e) {
      toast.error("Error updating: " + e);
    } finally {
      setSavingId(null);
    }
  };

  const handleUpdateWeapon = async (id: string, updates: any) => {
    setSavingId(id);
    try {
      await fetchGraphQL(UPDATE_WEAPON_TIER_LIST, { id, ...updates });
      setWeapons(weaps => weaps.map(w => w.id === id ? { ...w, ...updates } : w));
    } catch (e) {
      toast.error("Error updating: " + e);
    } finally {
      setSavingId(null);
    }
  };

  const inputStyle = {
    background: 'rgba(4,4,10,0.8)',
    border: '1px solid rgba(255,255,255,0.07)',
    color: 'rgba(255,255,255,0.85)',
  };

  if (loading) return <div className="p-10 text-white/40 text-sm">Loading tier list data...</div>;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black uppercase tracking-wide" style={{ fontFamily:'var(--font-cinzel,Cinzel,serif)', background:'linear-gradient(135deg,#f0d080,#c8a84b)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
          Tier List Management
        </h1>
        <p className="text-white/30 text-xs mt-0.5">Manage global tier ranks and bulk assign characters and weapons.</p>
      </div>

      <ManageTiersSection tierRanks={tierRanks} setTierRanks={setTierRanks} />

      {/* AI Gen */}
      <AICharacterGenerator onGenerated={loadData} />

      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-[3px] h-5 rounded-full" style={{ background: 'linear-gradient(to bottom, #f0d080, #c8a84b)' }} />
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/35">Characters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {characters.map(char => (
            <div key={char.id} className="p-4 rounded-2xl flex gap-4 transition-colors" style={{ background:'rgba(8,8,18,0.7)', border:'1px solid rgba(255,255,255,0.05)' }}>
              <div className="w-14 h-14 relative shrink-0 rounded-xl overflow-hidden" style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}>
                {char.avatarUrl && <Image src={char.avatarUrl} alt={char.nameEn} fill className="object-cover" sizes="56px" />}
              </div>
              <div className="flex-1 min-w-0 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white/90 truncate pr-2">{char.nameEn}</h3>
                  <div className="text-[10px] font-black" style={{ color: char.rarity===5 ? '#ffd54f' : '#ce93d8' }}>{'★'.repeat(char.rarity)}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-white/30">Tier</label>
                    <select 
                      className="w-full px-2 py-1.5 rounded-lg text-xs font-bold outline-none" style={inputStyle}
                      value={char.tier || ""}
                      onChange={(e) => handleUpdateChar(char.id, { 
                        tier: e.target.value || null, role: char.role, recommendedC: char.recommendedC, tierNoteEn: char.tierNoteEn, tierNoteVi: char.tierNoteVi
                      })}
                      disabled={savingId === char.id}
                    >
                      <option value="">- None -</option>
                      {tierRanks.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-white/30">Role</label>
                    <select 
                      className="w-full px-2 py-1.5 rounded-lg text-xs font-bold outline-none" style={inputStyle}
                      value={char.role || ""}
                      onChange={(e) => handleUpdateChar(char.id, { 
                        tier: char.tier, role: e.target.value || null, recommendedC: char.recommendedC, tierNoteEn: char.tierNoteEn, tierNoteVi: char.tierNoteVi
                      })}
                      disabled={savingId === char.id}
                    >
                      <option value="">- None -</option>
                      {['Main DPS','Sub DPS','Support','Healer','Buffer','Shielder'].map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/30">Constellation</label>
                  <input 
                    type="text" className="w-full px-2 py-1.5 rounded-lg text-xs outline-none" style={inputStyle} placeholder="e.g. C0"
                    value={char.recommendedC || ""}
                    onBlur={(e) => handleUpdateChar(char.id, {
                      tier: char.tier, role: char.role, recommendedC: e.target.value || null, tierNoteEn: char.tierNoteEn, tierNoteVi: char.tierNoteVi
                    })}
                    onChange={(e) => {
                      const newChars = [...characters];
                      const idx = newChars.findIndex(c => c.id === char.id);
                      newChars[idx].recommendedC = e.target.value;
                      setCharacters(newChars);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-[3px] h-5 rounded-full" style={{ background: 'linear-gradient(to bottom, #4fc3f7, #0284c7)' }} />
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/35">Weapons</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {weapons.map(weapon => (
            <div key={weapon.id} className="p-3 rounded-2xl flex flex-col items-center gap-2 text-center" style={{ background:'rgba(8,8,18,0.7)', border:'1px solid rgba(255,255,255,0.05)' }}>
              <div className="w-12 h-12 relative">
                {weapon.iconUrl && <Image src={weapon.iconUrl} alt={weapon.nameEn} fill className="object-contain" sizes="48px" unoptimized />}
              </div>
              <h3 className="font-bold text-[10px] text-white/80 truncate w-full">{weapon.nameEn}</h3>
              <select 
                className="w-full px-2 py-1.5 rounded-lg text-[10px] font-bold outline-none" style={inputStyle}
                value={weapon.tier || ""}
                onChange={(e) => handleUpdateWeapon(weapon.id, { tier: e.target.value || null })}
                disabled={savingId === weapon.id}
              >
                <option value="">- None -</option>
                {tierRanks.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
              </select>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
