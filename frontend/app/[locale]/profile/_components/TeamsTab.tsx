"use client";

import { useState } from 'react';
import { User } from '@/context/UserContext';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Users, Save, Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

function SortableItem({ id, element }: { id: string, element: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-24 h-24 rounded-2xl bg-black/50 border border-white/20 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden relative group"
    >
      {/* Temporary fallback, in full version fetch char data */}
      <img src={`/assets/characters/${id}/avatar.webp`} alt={id} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" onError={(e) => e.currentTarget.style.display = 'none'} />
      <div className="absolute inset-x-0 bottom-0 bg-black/80 text-[10px] text-center p-1 uppercase truncate font-bold text-white/80">
        {id}
      </div>
      <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-black/50 border border-white/20 flex items-center justify-center p-0.5">
         <img src={`/assets/elements/${element.toLowerCase()}.webp`} alt={element} className="w-full h-full object-contain" />
      </div>
    </div>
  );
}

export default function TeamsTab({ user }: { user: User }) {
  // Temporary hardcoded list of available characters for the demo.
  // In a real app, this would be a searchable character selector.
  const [availableChars] = useState([
    { id: 'zhongli', element: 'Geo' },
    { id: 'raiden', element: 'Electro' },
    { id: 'nahida', element: 'Dendro' },
    { id: 'furina', element: 'Hydro' },
    { id: 'bennett', element: 'Pyro' },
    { id: 'kazuha', element: 'Anemo' },
  ]);

  const [team, setTeam] = useState<{id: string, element: string}[]>([
    { id: 'zhongli', element: 'Geo' },
    { id: 'raiden', element: 'Electro' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTeam((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addToTeam = (char: {id: string, element: string}) => {
    if (team.length >= 4) {
      toast.error('Team is full (Max 4)');
      return;
    }
    if (team.find(c => c.id === char.id)) {
      toast.error('Character already in team');
      return;
    }
    setTeam([...team, char]);
  };

  const removeFromTeam = (id: string) => {
    setTeam(team.filter(c => c.id !== id));
  };

  // Compute Resonance
  const elements = team.map(c => c.element);
  const elementCounts = elements.reduce((acc, el) => { acc[el] = (acc[el] || 0) + 1; return acc; }, {} as Record<string, number>);
  const resonances = Object.entries(elementCounts).filter(([_, count]) => count >= 2).map(([el]) => el);
  const isDiverse = new Set(elements).size === 4;

  return (
    <div className="space-y-8">
      {/* Team Builder */}
      <div className="bg-[#1a1a24] border border-[#c8a84b]/30 rounded-2xl p-6">
        <h3 className="text-lg font-black uppercase tracking-widest text-[#f0d080] mb-6 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Team Builder
        </h3>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Current Team (Drag and Drop) */}
          <div className="flex-1">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Current Team ({team.length}/4)</p>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={team.map(c => c.id)} strategy={horizontalListSortingStrategy}>
                <div className="flex gap-4 min-h-[96px]">
                  {team.map((char) => (
                    <div key={char.id} className="relative group">
                       <SortableItem id={char.id} element={char.element} />
                       <button onClick={() => removeFromTeam(char.id)} className="absolute -top-2 -right-2 bg-red-500/80 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
                         <Trash2 className="w-3 h-3" />
                       </button>
                    </div>
                  ))}
                  {Array.from({ length: 4 - team.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="w-24 h-24 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center text-white/20">
                      <Plus className="w-6 h-6" />
                    </div>
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {/* Resonance Info */}
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Elemental Resonance</p>
              {resonances.length > 0 ? (
                <div className="flex gap-2">
                  {resonances.map(r => (
                    <span key={r} className="px-2 py-1 bg-[#c8a84b]/20 text-[#f0d080] rounded text-xs font-bold border border-[#c8a84b]/30 flex items-center gap-1">
                       <img src={`/assets/elements/${r.toLowerCase()}.webp`} alt={r} className="w-3 h-3" />
                       {r} Resonance
                    </span>
                  ))}
                </div>
              ) : isDiverse && team.length === 4 ? (
                <span className="px-2 py-1 bg-white/10 text-white/80 rounded text-xs font-bold border border-white/20">
                   Protective Canopy (All Elements)
                </span>
              ) : (
                <p className="text-sm text-white/30 italic">No resonance active</p>
              )}
            </div>
            
            <button className="mt-4 px-6 py-2 rounded-xl bg-[#c8a84b] hover:bg-[#f0d080] text-black font-bold uppercase tracking-widest text-xs transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Team
            </button>
          </div>

          {/* Character Selector (Simple) */}
          <div className="w-full md:w-64">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Select Characters</p>
            <div className="grid grid-cols-4 gap-2">
              {availableChars.map(char => (
                <button
                  key={char.id}
                  onClick={() => addToTeam(char)}
                  className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-1 flex flex-col items-center justify-center relative overflow-hidden group"
                >
                  <img src={`/assets/characters/${char.id}/avatar.webp`} alt={char.id} className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Saved Teams */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-4">Saved Teams</h3>
        {(!user.teams || user.teams.length === 0) ? (
          <div className="text-center p-10 bg-white/5 rounded-2xl border border-dashed border-white/20">
            <p className="text-white/40">You haven&apos;t saved any teams yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {user.teams.map(t => (
               <div key={t.id} className="bg-white/5 p-4 rounded-2xl border border-white/10">
                 <h4 className="font-bold text-white capitalize mb-3">{t.name}</h4>
                 <div className="flex gap-2">
                   {t.characters.map((cid: string) => (
                     <div key={cid} className="w-10 h-10 rounded-full border border-white/20 overflow-hidden bg-black/50">
                       <img src={`/assets/characters/${cid}/avatar.webp`} alt={cid} className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
                     </div>
                   ))}
                 </div>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}
