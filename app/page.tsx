'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import charactersData from '@/data/characters.json';
import { CharacterItem, Element, WeaponType, Rarity } from '@/types/character';
import { Search, Flame, Droplets, Wind, Zap, Leaf, Snowflake, Mountain, Sword, Target, Crosshair, Book, MoreHorizontal } from 'lucide-react';

const characters: CharacterItem[] = charactersData as CharacterItem[];

const elements: Element[] = ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];
const weapons: WeaponType[] = ['Sword', 'Claymore', 'Polearm', 'Bow', 'Catalyst'];
const rarities: Rarity[] = [5, 4];

function ElementIcon({ element, className = "w-4 h-4" }: { element: Element, className?: string }) {
  switch (element) {
    case 'Pyro': return <Flame className={`${className} text-red-500`} />;
    case 'Hydro': return <Droplets className={`${className} text-blue-500`} />;
    case 'Anemo': return <Wind className={`${className} text-teal-400`} />;
    case 'Electro': return <Zap className={`${className} text-purple-500`} />;
    case 'Dendro': return <Leaf className={`${className} text-green-500`} />;
    case 'Cryo': return <Snowflake className={`${className} text-cyan-300`} />;
    case 'Geo': return <Mountain className={`${className} text-yellow-600`} />;
    default: return <div className={`${className} bg-zinc-500 rounded-full`} />;
  }
}

function WeaponIcon({ weapon, className = "w-4 h-4" }: { weapon: WeaponType, className?: string }) {
  switch (weapon) {
    case 'Sword': return <Sword className={className} />;
    case 'Claymore': return <MoreHorizontal className={className} />; // Placeholder
    case 'Polearm': return <Target className={className} />; // Placeholder
    case 'Bow': return <Crosshair className={className} />;
    case 'Catalyst': return <Book className={className} />;
    default: return <div className={`${className} bg-zinc-500 rounded-sm`} />;
  }
}

export default function CharactersPage() {
  const [search, setSearch] = useState('');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponType | null>(null);
  const [selectedRarity, setSelectedRarity] = useState<Rarity | null>(null);

  const filteredCharacters = useMemo(() => {
    return characters.filter(char => {
      const matchSearch = char.name.toLowerCase().includes(search.toLowerCase());
      const matchElement = selectedElement ? char.element === selectedElement : true;
      const matchWeapon = selectedWeapon ? char.weapon === selectedWeapon : true;
      const matchRarity = selectedRarity ? char.rarity === selectedRarity : true;
      return matchSearch && matchElement && matchWeapon && matchRarity;
    });
  }, [search, selectedElement, selectedWeapon, selectedRarity]);

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Sidebar Filters */}
      <aside className="w-64 lg:w-80 border-r border-zinc-800 p-6 flex flex-col gap-8 bg-zinc-950 overflow-y-auto hidden md:flex shrink-0">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-zinc-500">Search</h3>
          <div className="bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-xl flex items-center gap-3">
            <Search className="w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Character name..." 
              className="bg-transparent border-none outline-none text-sm w-full text-zinc-100 placeholder:text-zinc-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-zinc-500">Element</h3>
          <div className="flex flex-wrap gap-2">
            {elements.map(el => (
              <button 
                key={el}
                onClick={() => setSelectedElement(selectedElement === el ? null : el)}
                className={`p-2 rounded-xl border flex items-center justify-center transition-colors ${
                  selectedElement === el ? 'bg-zinc-800 border-zinc-600' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
                title={el}
              >
                <ElementIcon element={el} className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-zinc-500">Weapon</h3>
          <div className="flex flex-wrap gap-2">
            {weapons.map(wp => (
              <button 
                key={wp}
                onClick={() => setSelectedWeapon(selectedWeapon === wp ? null : wp)}
                className={`p-2 rounded-xl border flex items-center justify-center transition-colors ${
                  selectedWeapon === wp ? 'bg-zinc-800 border-zinc-600' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
                title={wp}
              >
                <WeaponIcon weapon={wp} className="w-5 h-5 text-zinc-400" />
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-zinc-500">Rarity</h3>
          <div className="flex gap-2">
            {rarities.map(rarity => (
              <button 
                key={rarity}
                onClick={() => setSelectedRarity(selectedRarity === rarity ? null : rarity)}
                className={`px-4 py-2 text-sm font-bold rounded-xl border transition-colors flex-1 ${
                  selectedRarity === rarity ? 'bg-zinc-800 border-zinc-600 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                }`}
              >
                {rarity} Star
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Grid */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:hidden">
            <div className="bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-xl flex items-center gap-3">
              <Search className="w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search character..." 
                className="bg-transparent border-none outline-none text-sm w-full text-zinc-100 placeholder:text-zinc-600"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* Implement mobile filter drawer later if needed */}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredCharacters.map(char => (
              <Link href={`/characters/${char.id}`} key={char.id} className="group flex flex-col">
                <div className={`relative aspect-square rounded-2xl border overflow-hidden transition-all duration-300 group-hover:scale-[1.02] ${
                  char.rarity === 5 ? 'bg-gradient-to-b from-amber-500/10 to-amber-900/20 border-amber-500/30 group-hover:border-amber-500/60' : 'bg-gradient-to-b from-purple-500/10 to-purple-900/20 border-purple-500/30 group-hover:border-purple-500/60'
                }`}>
                  <Image 
                    src={char.avatarUrl || 'https://genshin.jmp.blue/characters/lumine/icon-big'} 
                    alt={char.name} 
                    fill 
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 flex gap-1">
                    <div className="bg-zinc-950/80 backdrop-blur-sm p-1 rounded-md border border-zinc-800/50">
                      <ElementIcon element={char.element} className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <div className="bg-zinc-950/80 backdrop-blur-sm p-1 rounded-md border border-zinc-800/50">
                      <WeaponIcon weapon={char.weapon} className="w-4 h-4 text-zinc-300" />
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-1 text-center">
                  <h2 className="text-sm font-bold truncate text-zinc-100 group-hover:text-white transition-colors">{char.name}</h2>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    {[...Array(char.rarity)].map((_, i) => (
                      <svg key={i} className={`w-3 h-3 ${char.rarity === 5 ? 'text-amber-500' : 'text-purple-400'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
            {filteredCharacters.length === 0 && (
              <div className="col-span-full py-20 text-center text-zinc-500">
                No characters found matching your filters.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
