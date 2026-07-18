"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchGraphQLAdmin } from '@/lib/graphql/client';
import { useAdmin } from '@/hooks/useAdmin';
import toast from 'react-hot-toast';

export default function AdminEditableBuild({ character }: { character: any }) {
  const { isAdmin } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [jsonStr, setJsonStr] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const openEditor = () => {
    const buildData = {
      bestTeams: character.bestTeams || [],
      bestWeapons: character.bestWeapons || [],
      bestArtifacts: character.bestArtifacts || []
    };
    
    // Strip __typename from the nested objects
    const stripTypename = (obj: any): any => {
      if (Array.isArray(obj)) return obj.map(stripTypename);
      if (obj !== null && typeof obj === 'object') {
        const { __typename, id, artifactSetId, mixSets, ...rest } = obj;
        const newObj: any = {};
        for (const key in rest) newObj[key] = stripTypename(rest[key]);
        return newObj;
      }
      return obj;
    };

    setJsonStr(JSON.stringify(stripTypename(buildData), null, 2));
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const parsed = JSON.parse(jsonStr);
      
      // Need to fetch full character to upsert it since the input expects all fields
      const data = await fetchGraphQLAdmin(`query { character(id: "${character.id}") { id nameEn nameVi titleEn titleVi rarity element weapon region avatarUrl splashArtUrl descriptionEn descriptionVi baseHp baseAtk baseDef talentPriority } }`);
      
      const stripTypename = (obj: any): any => {
        if (Array.isArray(obj)) return obj.map(stripTypename);
        if (obj !== null && typeof obj === 'object') {
          const { __typename, ...rest } = obj;
          const newObj: any = {};
          for (const key in rest) newObj[key] = stripTypename(rest[key]);
          return newObj;
        }
        return obj;
      };

      const fullInput = stripTypename(data.character);
      fullInput.bestTeams = parsed.bestTeams;
      fullInput.bestWeapons = parsed.bestWeapons;
      fullInput.bestArtifacts = parsed.bestArtifacts;

      await fetchGraphQLAdmin(`
        mutation Upsert($input: CharacterInput!) {
          upsertCharacter(input: $input) { id }
        }
      `, { input: fullInput });
      
      setIsEditing(false);
      router.refresh();
    } catch (err: any) {
      toast.error("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) return null;

  return (
    <>
      <button 
        onClick={openEditor}
        className="w-full mt-4 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 font-bold py-3 rounded-xl border border-blue-500/30 transition-colors flex items-center justify-center gap-2 text-sm"
      >
        <span>⚙️ Edit Weapons, Artifacts & Teams</span>
      </button>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0d0d14] border border-white/10 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] flex flex-col gap-4 shadow-2xl">
            <h3 className="text-xl font-bold text-white">Edit Builds (JSON)</h3>
            <p className="text-xs text-white/50">
              Chỉnh sửa thông tin Vũ Khí, Thánh Di Vật và Đội Hình trực tiếp dưới dạng JSON.
            </p>
            
            <textarea 
              value={jsonStr}
              onChange={(e) => setJsonStr(e.target.value)}
              className="w-full flex-1 min-h-[50vh] bg-[#06060a] text-green-400 font-mono text-sm p-4 rounded outline-none border border-white/10"
              spellCheck={false}
            />

            <div className="flex items-center gap-3 mt-2 pt-4 border-t border-white/10 shrink-0">
              <button 
                onClick={() => setIsEditing(false)}
                className="flex-1 py-3 rounded bg-white/5 hover:bg-white/10 text-white/70 font-bold text-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={loading}
                className="flex-1 py-3 rounded bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
