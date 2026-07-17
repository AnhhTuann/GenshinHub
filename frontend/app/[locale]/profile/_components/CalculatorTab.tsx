"use client";

import { useState, useEffect } from 'react';
import { User } from '@/context/UserContext';
import { Calculator as CalcIcon, ChevronRight, Plus, Trash2, Save, X, Search, Check } from 'lucide-react';
import FallbackImage from '@/components/ui/FallbackImage';
import { fetchGraphQL } from '@/lib/graphql/client';
import { GET_CHARACTERS } from '@/lib/graphql/queries/character';

// Mock material calculation based on level and talents
const calculateItemMaterials = (item: any) => {
  let mora = 0;
  let wits = 0;
  let bossMats = 0;
  let localSpecialties = 0;
  let talentBooks = 0;
  let enemyDrops = 0;

  // Level Math
  if (item.targetLevel > item.startLevel) {
    wits += (item.targetLevel - item.startLevel) * 4;
    mora += wits * 4000;
    bossMats += item.targetLevel > 40 ? Math.floor((item.targetLevel - 40) / 10) * 2 : 0;
    localSpecialties += item.targetLevel > 40 ? Math.floor((item.targetLevel - 40) / 10) * 5 : 0;
    enemyDrops += (item.targetLevel - item.startLevel) * 2;
  }

  // Talent Math
  const calculateTalent = (start: number, target: number) => {
    if (target > start) {
      talentBooks += (target - start) * 5;
      mora += (target - start) * 25000;
      enemyDrops += (target - start) * 3;
    }
  };

  calculateTalent(item.talents.auto.start, item.talents.auto.target);
  calculateTalent(item.talents.skill.start, item.talents.skill.target);
  calculateTalent(item.talents.burst.start, item.talents.burst.target);

  return { mora, wits, bossMats, localSpecialties, talentBooks, enemyDrops };
};

export default function CalculatorTab({ user }: { user: User }) {
  const [todoList, setTodoList] = useState<any[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  
  // Selector State
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [availableChars, setAvailableChars] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Inventory Toggle
  const [showInventory, setShowInventory] = useState(false);
  const [inventory, setInventory] = useState<Record<string, number>>({
    mora: 1000000,
    wits: 50,
    bossMats: 10,
    localSpecialties: 20,
    talentBooks: 5,
    enemyDrops: 100
  });

  useEffect(() => {
    async function loadChars() {
      try {
        const res = await fetchGraphQL(GET_CHARACTERS);
        setAvailableChars(res.characters);
      } catch (err) {
        console.error('Failed to load characters:', err);
      }
    }
    loadChars();
  }, []);

  const handleAddItem = (char: any) => {
    const newItem = {
      id: `${char.id}-${Date.now()}`,
      charId: char.id,
      name: char.nameEn,
      avatarUrl: char.avatarUrl,
      startLevel: 1,
      targetLevel: 90,
      talents: {
        auto: { start: 1, target: 8 },
        skill: { start: 1, target: 8 },
        burst: { start: 1, target: 8 }
      }
    };
    setTodoList([...todoList, newItem]);
    setActiveItemId(newItem.id);
    setIsSelectorOpen(false);
  };

  const updateActiveItem = (updates: any) => {
    setTodoList(list => list.map(item => item.id === activeItemId ? { ...item, ...updates } : item));
  };

  const updateTalent = (type: 'auto'|'skill'|'burst', field: 'start'|'target', value: number) => {
    setTodoList(list => list.map(item => {
      if (item.id === activeItemId) {
        const newTalent = { ...item.talents[type], [field]: value };
        if (field === 'start' && value > item.talents[type].target) newTalent.target = value;
        if (field === 'target' && value < item.talents[type].start) newTalent.start = value;
        return { ...item, talents: { ...item.talents, [type]: newTalent } };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setTodoList(list => list.filter(item => item.id !== id));
    if (activeItemId === id) setActiveItemId(null);
  };

  // Aggregate totals
  const totals = todoList.reduce((acc, item) => {
    const mats = calculateItemMaterials(item);
    return {
      mora: acc.mora + mats.mora,
      wits: acc.wits + mats.wits,
      bossMats: acc.bossMats + mats.bossMats,
      localSpecialties: acc.localSpecialties + mats.localSpecialties,
      talentBooks: acc.talentBooks + mats.talentBooks,
      enemyDrops: acc.enemyDrops + mats.enemyDrops
    };
  }, { mora: 0, wits: 0, bossMats: 0, localSpecialties: 0, talentBooks: 0, enemyDrops: 0 });

  const activeItem = todoList.find(i => i.id === activeItemId);

  const filteredChars = availableChars.filter(c => c.nameEn.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full min-h-[600px]">
      
      {/* Sidebar: To-Do List */}
      <div className="w-full md:w-64 flex flex-col gap-4 bg-[#1a1a24] border border-white/10 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-black uppercase tracking-widest text-white/50">To-do List</h3>
          <span className="text-xs font-bold bg-[#c8a84b]/20 text-[#f0d080] px-2 py-0.5 rounded-full">{todoList.length}</span>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-2 hide-scrollbar">
          {todoList.map(item => (
            <div 
              key={item.id} 
              onClick={() => setActiveItemId(item.id)}
              className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-colors group ${activeItemId === item.id ? 'bg-[#c8a84b]/20 border border-[#c8a84b]/50' : 'bg-black/40 border border-transparent hover:bg-white/5'}`}
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-black shrink-0">
                <FallbackImage src={item.avatarUrl || `/assets/characters/${item.charId}/avatar.webp`} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold truncate capitalize ${activeItemId === item.id ? 'text-[#f0d080]' : 'text-white'}`}>{item.name}</p>
                <p className="text-[10px] text-white/40">Lv. {item.targetLevel}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); removeItem(item.id); }} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-500/20 text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
          
          <button 
            onClick={() => setIsSelectorOpen(true)}
            className="w-full py-3 rounded-xl border border-dashed border-white/20 text-white/40 hover:text-white hover:border-white/40 transition-colors flex flex-col items-center justify-center gap-1"
          >
            <Plus className="w-5 h-5" />
            <span className="text-[10px] uppercase font-bold tracking-widest">Add Item</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6">
        
        {/* Editor Panel */}
        <div className="flex-1 bg-[#1a1a24] border border-[#c8a84b]/30 rounded-2xl p-6">
          {!activeItem ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <CalcIcon className="w-16 h-16 mb-4 text-[#c8a84b]" />
              <h2 className="text-xl font-black uppercase text-white mb-2">No Item Selected</h2>
              <p className="text-sm">Add a character from the to-do list to start calculating.</p>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-black border-2 border-[#c8a84b]">
                  <FallbackImage src={activeItem.avatarUrl || `/assets/characters/${activeItem.charId}/avatar.webp`} alt={activeItem.name} fill className="object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-wider text-white capitalize">{activeItem.name}</h2>
                  <p className="text-xs font-bold text-[#c8a84b] tracking-widest uppercase">Character Calculation</p>
                </div>
              </div>

              {/* Level Sliders */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-white/50">Level Ascension</h4>
                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 flex justify-between">
                      <span>Current</span> <span className="text-white">Lv. {activeItem.startLevel}</span>
                    </label>
                    <input type="range" min="1" max="90" value={activeItem.startLevel} onChange={(e) => updateActiveItem({ startLevel: Math.min(parseInt(e.target.value), activeItem.targetLevel) })} className="w-full accent-[#c8a84b]" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/20 mt-4" />
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 flex justify-between">
                      <span>Target</span> <span className="text-[#f0d080]">Lv. {activeItem.targetLevel}</span>
                    </label>
                    <input type="range" min="1" max="90" value={activeItem.targetLevel} onChange={(e) => updateActiveItem({ targetLevel: Math.max(parseInt(e.target.value), activeItem.startLevel) })} className="w-full accent-[#c8a84b]" />
                  </div>
                </div>
              </div>

              {/* Talent Sliders */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-white/50">Talents</h4>
                {['auto', 'skill', 'burst'].map(type => (
                  <div key={type} className="flex items-center gap-6 bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="w-16 shrink-0 text-right">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">{type === 'auto' ? 'Normal' : type}</span>
                    </div>
                    <div className="flex-1">
                      <input type="range" min="1" max="10" value={activeItem.talents[type as 'auto'].start} onChange={(e) => updateTalent(type as any, 'start', parseInt(e.target.value))} className="w-full accent-white/40" />
                    </div>
                    <div className="w-10 text-center font-bold text-xs">{activeItem.talents[type as 'auto'].start}</div>
                    <ChevronRight className="w-4 h-4 text-white/20" />
                    <div className="flex-1">
                      <input type="range" min="1" max="10" value={activeItem.talents[type as 'auto'].target} onChange={(e) => updateTalent(type as any, 'target', parseInt(e.target.value))} className="w-full accent-[#c8a84b]" />
                    </div>
                    <div className="w-10 text-center font-bold text-xs text-[#f0d080]">{activeItem.talents[type as 'auto'].target}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Requirements Panel */}
        <div className="w-full lg:w-80 bg-[#1a1a24] border border-white/10 rounded-2xl p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-white">Total Required</h3>
            <button 
              onClick={() => setShowInventory(!showInventory)}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${showInventory ? 'bg-[#c8a84b] text-black' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
            >
              Inventory
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto hide-scrollbar pr-2">
            {[
              { key: 'mora', label: 'Mora', icon: 'M', color: 'text-[#f0d080]', bg: 'bg-[#c8a84b]/20' },
              { key: 'wits', label: 'Hero\'s Wit', icon: 'W', color: 'text-purple-400', bg: 'bg-purple-500/20' },
              { key: 'bossMats', label: 'Boss Drops', icon: 'B', color: 'text-red-400', bg: 'bg-red-500/20' },
              { key: 'localSpecialties', label: 'Specialties', icon: 'L', color: 'text-blue-400', bg: 'bg-blue-500/20' },
              { key: 'talentBooks', label: 'Talent Books', icon: 'T', color: 'text-green-400', bg: 'bg-green-500/20' },
              { key: 'enemyDrops', label: 'Enemy Drops', icon: 'E', color: 'text-gray-400', bg: 'bg-gray-500/20' },
            ].map(mat => {
              const req = totals[mat.key as keyof typeof totals];
              const inv = inventory[mat.key as keyof typeof inventory];
              const remaining = Math.max(0, req - (showInventory ? inv : 0));
              
              if (req === 0 && !showInventory) return null;

              return (
                <div key={mat.key} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${mat.bg} flex items-center justify-center ${mat.color} font-bold text-xs shrink-0`}>{mat.icon}</div>
                    <span className="font-bold text-white text-sm">{mat.label}</span>
                  </div>
                  <div className="text-right">
                    <span className={`font-black ${showInventory && req <= inv ? 'text-green-400' : 'text-white'}`}>{remaining.toLocaleString()}</span>
                    {showInventory && <p className="text-[10px] text-white/40">Have: {inv.toLocaleString()}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selector Modal */}
      {isSelectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#1a1a24] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-lg font-black uppercase tracking-widest text-white">Select Character</h2>
              <button onClick={() => setIsSelectorOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search characters..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#c8a84b] outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 overflow-y-auto max-h-[50vh] hide-scrollbar p-1">
                {filteredChars.map(char => {
                  const isAdded = todoList.some(i => i.charId === char.id);
                  return (
                    <button
                      key={char.id}
                      onClick={() => !isAdded && handleAddItem(char)}
                      disabled={isAdded}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${isAdded ? 'border-[#4db6ac] opacity-50 cursor-not-allowed' : 'border-transparent hover:border-white/50 cursor-pointer'}`}
                    >
                      <FallbackImage src={`/assets/characters/${char.id}/avatar.webp`} alt={char.nameEn} fill className="object-cover" />
                      {isAdded && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Check className="w-6 h-6 text-[#4db6ac]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
