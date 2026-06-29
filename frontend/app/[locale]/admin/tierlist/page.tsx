"use client";
import { useState, useEffect } from "react";
import { fetchGraphQL, GET_CHARACTERS, GET_WEAPONS, UPDATE_CHARACTER_TIER_LIST, UPDATE_WEAPON_TIER_LIST, GET_TIER_RANKS } from "@/lib/graphql";
import Image from "next/image";
import toast from 'react-hot-toast';
import ManageTiersSection from "@/components/admin/ManageTiersSection";

export default function AdminTierListPage() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [weapons, setWeapons] = useState<any[]>([]);
  const [tierRanks, setTierRanks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
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
    }
    loadData();
  }, []);

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

  if (loading) return <div className="p-10 text-white">Loading...</div>;

  return (
    <div className="p-8 text-white max-w-7xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold border-b border-white/10 pb-4">Tier List Management</h1>

      <ManageTiersSection tierRanks={tierRanks} setTierRanks={setTierRanks} />

      <section>
        <h2 className="text-2xl font-semibold text-amber-400 mb-6">Characters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map(char => (
            <div key={char.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex gap-4">
              <div className="w-16 h-16 relative flex-shrink-0 bg-black/40 rounded overflow-hidden">
                <Image src={char.avatarUrl || '/placeholder.png'} alt={char.nameEn} fill className="object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-bold">{char.nameEn}</h3>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <label className="block text-xs text-white/50 mb-1">Tier</label>
                    <select 
                      className="bg-black/50 border border-white/20 rounded px-2 py-1 w-full"
                      value={char.tier || ""}
                      onChange={(e) => handleUpdateChar(char.id, { 
                        tier: e.target.value || null,
                        role: char.role, recommendedC: char.recommendedC, tierNoteEn: char.tierNoteEn, tierNoteVi: char.tierNoteVi
                      })}
                      disabled={savingId === char.id}
                    >
                      <option className="bg-[#0d0d14] text-white" value="">- None -</option>
                      {tierRanks.map(t => (
                        <option key={t.id} className="bg-[#0d0d14] text-white" value={t.name}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 mb-1">Role</label>
                    <select 
                      className="bg-black/50 border border-white/20 rounded px-2 py-1 w-full"
                      value={char.role || ""}
                      onChange={(e) => handleUpdateChar(char.id, { 
                        tier: char.tier, role: e.target.value || null, 
                        recommendedC: char.recommendedC, tierNoteEn: char.tierNoteEn, tierNoteVi: char.tierNoteVi
                      })}
                      disabled={savingId === char.id}
                    >
                      <option className="bg-[#0d0d14] text-white" value="">- None -</option>
                      <option className="bg-[#0d0d14] text-white" value="Main DPS">Main DPS</option>
                      <option className="bg-[#0d0d14] text-white" value="Sub DPS">Sub DPS</option>
                      <option className="bg-[#0d0d14] text-white" value="Support">Support</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div>
                    <label className="block text-xs text-white/50 mb-1">Recommended Constellation</label>
                    <input 
                      type="text"
                      className="bg-black/50 border border-white/20 rounded px-2 py-1 w-full text-sm"
                      placeholder="e.g. C0"
                      value={char.recommendedC || ""}
                      onBlur={(e) => handleUpdateChar(char.id, {
                        tier: char.tier, role: char.role, recommendedC: e.target.value || null,
                        tierNoteEn: char.tierNoteEn, tierNoteVi: char.tierNoteVi
                      })}
                      onChange={(e) => {
                        const newChars = [...characters];
                        const idx = newChars.findIndex(c => c.id === char.id);
                        newChars[idx].recommendedC = e.target.value;
                        setCharacters(newChars);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 mb-1">Notes (English) - JSON Array</label>
                    <textarea 
                      className="bg-black/50 border border-white/20 rounded px-2 py-1 w-full text-xs font-mono"
                      rows={2}
                      defaultValue={JSON.stringify(char.tierNoteEn || [])}
                      onBlur={(e) => {
                        try {
                          const arr = JSON.parse(e.target.value);
                          handleUpdateChar(char.id, {
                            tier: char.tier, role: char.role, recommendedC: char.recommendedC,
                            tierNoteEn: arr, tierNoteVi: char.tierNoteVi
                          });
                        } catch (err) {
                          toast.error("Invalid JSON for English Notes");
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 mb-1">Notes (Vietnamese) - JSON Array</label>
                    <textarea 
                      className="bg-black/50 border border-white/20 rounded px-2 py-1 w-full text-xs font-mono"
                      rows={2}
                      defaultValue={JSON.stringify(char.tierNoteVi || [])}
                      onBlur={(e) => {
                        try {
                          const arr = JSON.parse(e.target.value);
                          handleUpdateChar(char.id, {
                            tier: char.tier, role: char.role, recommendedC: char.recommendedC,
                            tierNoteEn: char.tierNoteEn, tierNoteVi: arr
                          });
                        } catch (err) {
                          toast.error("Invalid JSON for Vietnamese Notes");
                        }
                      }}
                    />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-purple-400 mb-6">Weapons</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {weapons.map(weapon => (
            <div key={weapon.id} className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 relative">
                <Image src={weapon.iconUrl || '/placeholder.png'} alt={weapon.nameEn} fill className="object-contain" />
              </div>
              <h3 className="font-bold text-xs truncate w-full">{weapon.nameEn}</h3>
              <select 
                className="bg-black/50 border border-white/20 rounded px-2 py-1 w-full text-sm"
                value={weapon.tier || ""}
                onChange={(e) => handleUpdateWeapon(weapon.id, { tier: e.target.value || null })}
                disabled={savingId === weapon.id}
              >
                <option className="bg-[#0d0d14] text-white" value="">- None -</option>
                {tierRanks.map(t => (
                  <option key={t.id} className="bg-[#0d0d14] text-white" value={t.name}>{t.name}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
