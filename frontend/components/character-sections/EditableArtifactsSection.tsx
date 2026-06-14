'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import InlineArtifactEditor from '@/components/admin/InlineArtifactEditor';
import { fetchGraphQL } from '@/lib/graphql';

interface Props {
  characterId: string;
  bestArtifacts: any[];
  tArtifacts: string;
}

function SectionHeader({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className={`w-[3px] h-5 rounded-full ${accent}`} />
      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 font-display">{label}</span>
    </div>
  );
}

export default function EditableArtifactsSection({ characterId, bestArtifacts, tArtifacts }: Props) {
  const router = useRouter();
  const locale = useLocale();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('admin_key'));
  }, []);

  const handleRemove = async (id: string) => {
    if (!confirm('Are you sure you want to remove this artifact set?')) return;
    try {
      await fetchGraphQL(`mutation { removeCharacterArtifact(id: "${id}") }`);
      router.refresh();
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <section className="bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl p-5 sm:p-6 relative group/section">
      <div className="flex items-center justify-between">
        <SectionHeader label={tArtifacts} accent="bg-purple-400" />
        {isAdmin && (
          <button 
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover/section:opacity-100 px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded hover:bg-purple-500/30 transition-all border border-purple-500/30"
          >
            ➕ Add Artifact
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {bestArtifacts.map((artifact: any, idx: number) => (
          <div key={artifact.id} className="relative group/acard bg-[#06060a]/50 border border-white/[0.04] hover:border-purple-500/15 rounded-xl p-3 sm:p-4 flex flex-col gap-3 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider shrink-0 ${
                idx === 0 
                  ? 'bg-purple-400/10 text-purple-400 border border-purple-400/20'
                  : 'bg-white/5 text-white/40 border border-white/10'
              }`}>
                {idx === 0 ? 'Best-in-Slot' : 'Alternative'}
              </span>
              <div className="h-[1px] flex-1 bg-white/[0.03]" />
              {isAdmin && (
                <button
                  onClick={() => handleRemove(artifact.id)}
                  className="w-6 h-6 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shrink-0 opacity-0 group-hover/acard:opacity-100"
                  title="Remove Artifact"
                >
                  ✕
                </button>
              )}
            </div>

            {artifact.mixSets && artifact.mixSets.length > 0 ? (
              <div className="flex flex-col rounded-lg overflow-hidden bg-white/[0.01] border border-white/[0.05]">
                {artifact.mixSets.map((mix: any, mIdx: number) => (
                  <div key={mIdx} className={`flex items-center gap-3 p-2 ${mIdx !== 0 ? 'border-t border-white/[0.05]' : ''}`}>
                    <div className="relative w-12 h-12 shrink-0 bg-gradient-to-b from-[#b18361] to-[#8c6b55] rounded flex items-center justify-center overflow-hidden">
                      {mix.iconUrl && <img src={mix.iconUrl} alt={mix.nameEn} className="w-10 h-10 object-contain drop-shadow-md" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white/90 text-sm leading-tight">{locale === 'en' ? mix.nameEn : (mix.nameVi || mix.nameEn)}</h4>
                      <p className="text-[10px] sm:text-xs text-purple-300 mt-1 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
                        {locale === 'en' ? '2-Piece Set' : 'Bộ 2 món'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className={`relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-lg border border-white/[0.05] flex items-center justify-center p-1 overflow-hidden ${
                  artifact.rarity === 5 ? 'bg-gradient-to-b from-[#b18361] to-[#8c6b55]' :
                  artifact.rarity === 4 ? 'bg-gradient-to-b from-[#7e6b9c] to-[#5b4d75]' :
                  artifact.rarity === 3 ? 'bg-gradient-to-b from-[#4d86b6] to-[#3a6388]' :
                  'bg-white/[0.02]'
                }`}>
                  {artifact.iconUrl && (
                    <img src={artifact.iconUrl} alt={artifact.setNameEn} className="w-full h-full object-contain drop-shadow-md" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white/90 text-sm">{locale === 'en' ? artifact.setNameEn : (artifact.setNameVi || artifact.setNameEn)}</h4>
                  <p className="text-[10px] sm:text-xs text-purple-300 mt-1 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
                    {artifact.pieces}{locale === 'en' ? '-Piece Set' : ' Món'}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
        {bestArtifacts.length === 0 && (
          <p className="text-sm text-white/40 italic">No recommended artifacts yet.</p>
        )}
      </div>

      {isEditing && (
        <InlineArtifactEditor 
          characterId={characterId} 
          onClose={() => setIsEditing(false)} 
          onSaved={() => router.refresh()} 
        />
      )}
    </section>
  );
}
