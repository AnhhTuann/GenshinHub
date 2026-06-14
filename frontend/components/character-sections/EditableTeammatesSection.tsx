'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InlineTeammatesEditor from '@/components/admin/InlineTeammatesEditor';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

interface Props {
  characterId: string;
  bestTeams: string[];
  allCharacters: any[];
}

function SectionHeader({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className={`w-[3px] h-5 rounded-full ${accent}`} />
      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 font-display">{label}</span>
    </div>
  );
}

const EL_TEXT: Record<string, string> = {
  Pyro: 'text-red-400', Hydro: 'text-blue-400', Cryo: 'text-cyan-400',
  Electro: 'text-purple-400', Anemo: 'text-emerald-400', Geo: 'text-yellow-400', Dendro: 'text-green-400'
};

export default function EditableTeammatesSection({ characterId, bestTeams, allCharacters }: Props) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('admin_key'));
  }, []);

  return (
    <section className="bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl p-5 sm:p-6 relative group/section">
      <div className="flex items-center justify-between">
        <SectionHeader label="Recommended Teammates" accent="bg-blue-400" />
        {isAdmin && (
          <button 
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover/section:opacity-100 px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded hover:bg-blue-500/30 transition-all border border-blue-500/30"
          >
            ✏️ Edit Teammates
          </button>
        )}
      </div>

      {bestTeams && bestTeams.length > 0 ? (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
          {bestTeams.map(tid => {
            const char = allCharacters.find(c => c.id === tid);
            const tmText = char ? (EL_TEXT[char.element] ?? 'text-white/60') : 'text-white/60';
            
            return (
              <Link href={`/characters/${tid}`} key={tid} className="group/tm flex flex-col items-center gap-1">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/[0.06] group-hover/tm:border-white/15 transition-all duration-250 bg-[#0d0d14] p-0.5">
                  {char ? (
                    <Image src={char.avatarUrl} alt={char.nameEn} fill className="object-cover object-top rounded-lg" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[8px] text-white/25 font-bold uppercase break-all px-1">
                      {tid}
                    </div>
                  )}
                </div>
                <span className={`text-[10px] font-bold text-center truncate w-full ${tmText}`}>
                  {char ? char.nameEn : tid}
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-white/40 italic">No recommended teammates yet.</p>
      )}

      {isEditing && (
        <InlineTeammatesEditor 
          characterId={characterId}
          initialTeams={bestTeams}
          onClose={() => setIsEditing(false)}
          onSaved={() => router.refresh()}
        />
      )}
    </section>
  );
}
