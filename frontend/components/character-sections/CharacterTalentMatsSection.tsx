'use client';

import { useAdmin } from '@/hooks/useAdmin';
import { useState } from 'react';
import CharacterMaterialGuide from './CharacterMaterialGuide';
import { useRouter } from 'next/navigation';
import AscensionMatsFormModal from '../admin/AscensionMatsFormModal';

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
  allMaterials: { id: string; nameEn: string; iconUrl?: string | null }[];
  characterId: string;
  pending?: boolean;
  noMaterials?: boolean;
}

export default function CharacterTalentMatsSection({ talentMats, allMaterials, characterId, pending = false, noMaterials = false }: CharacterTalentMatsSectionProps) {
  const router = useRouter();
  const { isAdmin } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);

  const displayMats: AscensionLevelCost[] = talentMats ?? [];

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
      finalUrl += '.webp';
    }
    return finalUrl;
  };

  return (
    <div className="min-w-0">
      {isAdmin && (
        <button
          onClick={() => setIsEditing(true)}
          className="atlas-add-action mb-3"
        >
          ✏️ Edit Materials
        </button>
      )}

      <CharacterMaterialGuide
        kind="talent"
        rows={displayMats}
        totals={totalsMap}
        totalMora={totalMora}
        getMaterial={getMatInfo}
        resolveIcon={getValidIconUrl}
        pending={pending && displayMats.length === 0}
        noMaterials={noMaterials && displayMats.length === 0}
      />

      {isEditing && (
        <AscensionMatsFormModal
          characterId={characterId}
          initialMats={displayMats}
          allMaterials={allMaterials}
          kind="talent"
          onClose={() => setIsEditing(false)}
          onSaved={() => router.refresh()}
        />
      )}
    </div>
  );
}
