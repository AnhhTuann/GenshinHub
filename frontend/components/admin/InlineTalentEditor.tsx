'use client';

import { useState, useEffect } from 'react';
import { fetchGraphQL } from '@/lib/graphql';
import toast from 'react-hot-toast';

interface Props {
  characterId: string;
  initialPriority: string[];
  onClose: () => void;
  onSaved: (newPriority: string[]) => void;
}

const ALL_TALENTS = ['Normal Attack', 'Skill', 'Burst'];

export default function InlineTalentEditor({ characterId, initialPriority, onClose, onSaved }: Props) {
  // Merge initial priority with any missing talents
  const [priority, setPriority] = useState<string[]>(() => {
    const list = [...(initialPriority || [])];
    ALL_TALENTS.forEach(t => {
      if (!list.includes(t)) list.push(t);
    });
    return list;
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newArr = [...priority];
    [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
    setPriority(newArr);
  };

  const moveDown = (index: number) => {
    if (index === priority.length - 1) return;
    const newArr = [...priority];
    [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
    setPriority(newArr);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetchGraphQL(`
        mutation UpdateCharacterTalents($id: String!, $talentPriority: [String!]!) {
          updateCharacterTalents(id: $id, talentPriority: $talentPriority) { id }
        }
      `, {
        id: characterId,
        talentPriority: priority
      });
      onSaved(priority);
      onClose();
    } catch (err: any) {
      toast.error("Error: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-[#0d0d14] border border-white/10 rounded-2xl w-full max-w-sm flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-black text-white">✏️ Edit Talent Priority</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">✕</button>
        </div>

        <div className="p-5 flex flex-col gap-3">
          {priority.map((talent, idx) => (
            <div key={talent} className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-3">
              <span className="w-6 h-6 rounded-full bg-black/30 flex items-center justify-center text-xs font-black text-white/50 shrink-0">
                {idx + 1}
              </span>
              <span className="flex-1 text-sm font-bold text-gray-200">{talent}</span>
              
              <div className="flex flex-col gap-1 shrink-0">
                <button
                  onClick={() => moveUp(idx)}
                  disabled={idx === 0}
                  className="w-6 h-6 flex items-center justify-center bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 rounded transition-colors text-white"
                >
                  ▲
                </button>
                <button
                  onClick={() => moveDown(idx)}
                  disabled={idx === priority.length - 1}
                  className="w-6 h-6 flex items-center justify-center bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 rounded transition-colors text-white"
                >
                  ▼
                </button>
              </div>
            </div>
          ))}
        </div>

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
            className="px-6 py-2.5 rounded-xl text-sm font-black bg-red-500 hover:bg-red-400 text-white transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
