'use client';

import React, { useState } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import Image from 'next/image';

interface MatItem {
  materialId: string;
  count: number;
}

interface AscensionLevelCost {
  level: string; // e.g., "Lv.40"
  mora: number;
  items: MatItem[];
}

interface CharacterTalentMatsSectionProps {
  talentMats?: AscensionLevelCost[] | null;
  allMaterials: any[];
  characterId: string;
}

import { useRouter } from 'next/navigation';
import AscensionMatsFormModal from '../admin/AscensionMatsFormModal'; // Could create a new modal, but skip for now

export default function CharacterTalentMatsSection({ talentMats, allMaterials, characterId }: CharacterTalentMatsSectionProps) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  React.useEffect(() => {
    setIsAdmin(!!localStorage.getItem('admin_key'));
  }, []);

  // Mock data if none provided
  const displayMats: AscensionLevelCost[] = talentMats && talentMats.length > 0 
    ? talentMats 
    : [
        { level: "Lv.40", mora: 20000, items: [{ materialId: "prithiva_topaz_sliver", count: 1 }, { materialId: "silk_flower", count: 3 }, { materialId: "whopperflower_nectar", count: 3 }] },
        { level: "Lv.50", mora: 40000, items: [{ materialId: "prithiva_topaz_fragment", count: 3 }, { materialId: "juvenile_jade", count: 2 }, { materialId: "silk_flower", count: 10 }, { materialId: "whopperflower_nectar", count: 15 }] },
        { level: "Lv.60", mora: 60000, items: [{ materialId: "prithiva_topaz_fragment", count: 6 }, { materialId: "juvenile_jade", count: 4 }, { materialId: "silk_flower", count: 20 }, { materialId: "shimmering_nectar", count: 12 }] },
        { level: "Lv.70", mora: 80000, items: [{ materialId: "prithiva_topaz_chunk", count: 3 }, { materialId: "juvenile_jade", count: 8 }, { materialId: "silk_flower", count: 30 }, { materialId: "shimmering_nectar", count: 18 }] },
        { level: "Lv.80", mora: 100000, items: [{ materialId: "prithiva_topaz_chunk", count: 6 }, { materialId: "juvenile_jade", count: 12 }, { materialId: "silk_flower", count: 45 }, { materialId: "energy_nectar", count: 12 }] },
        { level: "Lv.90", mora: 120000, items: [{ materialId: "prithiva_topaz_gemstone", count: 6 }, { materialId: "juvenile_jade", count: 20 }, { materialId: "silk_flower", count: 60 }, { materialId: "energy_nectar", count: 24 }] },
      ];

  // Calculate totals
  let totalMora = 0;
  const totalsMap: Record<string, number> = {};

  displayMats.forEach(lv => {
    totalMora += lv.mora;
    lv.items.forEach(item => {
      totalsMap[item.materialId] = (totalsMap[item.materialId] || 0) + item.count;
    });
  });

  const getMatInfo = (id: string) => {
    const normalizedId = id.toLowerCase().replace(/ /g, '_');
    const found = allMaterials.find(m => {
      const cleanName = m.nameEn.replace(/["']/g, '');
      return m.id === id || 
             cleanName === id || 
             cleanName.toLowerCase().replace(/ /g, '_') === normalizedId;
    });
    if (found) return found;
    return { nameEn: id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), iconUrl: null };
  };

  const getValidIconUrl = (url: string | undefined): string => {
    if (!url) return '';
    let finalUrl = url;
    if (!finalUrl.startsWith('http') && !finalUrl.startsWith('/')) {
      finalUrl = `https://gi.yatta.moe/assets/UI/${finalUrl}`;
    }
    if (finalUrl.includes('enka.network/ui/')) {
      finalUrl = finalUrl.replace('https://enka.network/ui/', 'https://gi.yatta.moe/assets/UI/');
    }
    if (!finalUrl.match(/\.(png|jpg|jpeg|webp|svg)$/)) {
      finalUrl += '.png';
    }
    return finalUrl;
  };

  return (
    <div className="bg-transparent border border-white/5 rounded-2xl p-5 mb-8 relative group/section">
      {isAdmin && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-5 right-5 z-10 opacity-0 group-hover/section:opacity-100 px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded hover:bg-amber-500/30 transition-all border border-amber-500/30"
        >
          ✏️ Edit Materials
        </button>
      )}

      {/* Top Total Grid */}
      <div className="flex flex-wrap gap-2.5 mb-6">
        {/* Mora Card */}
        <div className="flex items-center gap-3 bg-transparent border border-white/5 rounded-xl p-2 pr-4 w-fit hover:bg-white/5 transition-colors">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-white/10 to-transparent p-1">
            <FallbackImage src="/assets/items/UI_ItemIcon_202.webp" alt="Mora" fill className="object-contain drop-shadow-md" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-xs">Mora</span>
            <span className="text-white/50 font-medium text-[10px]">{totalMora.toLocaleString()}</span>
          </div>
        </div>

        {/* Other Material Cards */}
        {Object.entries(totalsMap).map(([matId, count]) => {
          const mat = getMatInfo(matId);
          return (
            <div key={matId} className="flex items-center gap-3 bg-transparent border border-white/5 rounded-xl p-2 pr-4 w-fit hover:bg-white/5 transition-colors">
              <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-transparent p-1 flex items-center justify-center">
                {mat.iconUrl ? <FallbackImage src={mat.iconUrl} alt={mat.nameEn} fill className="object-contain drop-shadow-md" /> : <div className="text-white/20 text-[8px] text-center px-1">NO ICON</div>}
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-xs truncate max-w-[120px]" title={mat.nameEn}>{mat.nameEn}</span>
                <span className="text-white/50 font-medium text-[10px]">{count.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="w-full overflow-hidden rounded-xl border border-white/5">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-[#2a2a35]/40 text-white/40 text-[11px] font-bold uppercase tracking-widest border-b border-white/5">
              <th className="p-4 w-1/4">Level</th>
              <th className="p-4 w-1/4">Mora</th>
              <th className="p-4 w-2/4">Materials</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-transparent">
            {displayMats.map((lvData, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                <td className="p-4 font-bold text-white/80">{lvData.level}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6"><FallbackImage src="/assets/items/UI_ItemIcon_202.webp" alt="Mora" fill className="object-contain drop-shadow-sm" /></div>
                    <span className="font-semibold text-white/90 text-[13px]">{lvData.mora.toLocaleString()}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2.5">
                    {lvData.items.map((item, i) => {
                      const mat = getMatInfo(item.materialId);
                      return (
                        <div key={i} className="relative group/mat flex flex-col items-center">
                          <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-white/[0.08] to-transparent border border-white/[0.06] p-1 mb-1">
                            {mat.iconUrl ? <FallbackImage src={getValidIconUrl(mat.iconUrl)} alt={mat.nameEn} fill className="object-contain drop-shadow" unoptimized /> : <div className="text-white/20 text-[8px] text-center w-full h-full flex items-center justify-center">NO ICON</div>}
                            <span className="absolute -bottom-1.5 -right-1.5 bg-[#1a1a24] border border-white/10 rounded px-1.5 py-0.5 min-w-[18px] text-center text-[9px] font-black text-white z-10 shadow-lg">
                              {item.count}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <AscensionMatsFormModal
          characterId={characterId}
          initialMats={displayMats}
          allMaterials={allMaterials}
          onClose={() => setIsEditing(false)}
          onSaved={() => router.refresh()}
        />
      )}
    </div>
  );
}
