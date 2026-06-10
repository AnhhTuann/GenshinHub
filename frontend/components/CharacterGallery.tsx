"use client";
import { useState, useMemo, useEffect } from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import CharacterCard from './CharacterCard';
import { CharacterData, Element } from '@/types/character';

const ELEMENTS: Element[] = ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];

const ELEMENT_DETAILS: Record<Element, { color: string; border: string; glow: string; hoverBorder: string }> = {
  Pyro: { color: 'text-red-500', border: 'border-red-500/40', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.25)] bg-red-950/30 text-red-400', hoverBorder: 'hover:border-red-500/50' },
  Hydro: { color: 'text-blue-500', border: 'border-blue-500/40', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.25)] bg-blue-950/30 text-blue-400', hoverBorder: 'hover:border-blue-500/50' },
  Cryo: { color: 'text-cyan-400', border: 'border-cyan-500/40', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.25)] bg-cyan-950/30 text-cyan-300', hoverBorder: 'hover:border-cyan-500/50' },
  Electro: { color: 'text-purple-500', border: 'border-purple-500/40', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.25)] bg-purple-950/30 text-purple-400', hoverBorder: 'hover:border-purple-500/50' },
  Anemo: { color: 'text-emerald-500', border: 'border-emerald-500/40', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.25)] bg-emerald-950/30 text-emerald-400', hoverBorder: 'hover:border-emerald-500/50' },
  Geo: { color: 'text-yellow-500', border: 'border-yellow-500/40', glow: 'shadow-[0_0_15px_rgba(234,179,8,0.25)] bg-yellow-950/30 text-yellow-400', hoverBorder: 'hover:border-yellow-500/50' },
  Dendro: { color: 'text-green-500', border: 'border-green-500/40', glow: 'shadow-[0_0_15px_rgba(34,197,94,0.25)] bg-green-950/30 text-green-400', hoverBorder: 'hover:border-green-500/50' },
  None: { color: 'text-zinc-500', border: 'border-zinc-500/40', glow: 'shadow-[0_0_15px_rgba(113,113,122,0.25)] bg-zinc-950/30 text-zinc-400', hoverBorder: 'hover:border-zinc-500/50' },
};

export default function CharacterGallery({ initialCharacters }: { initialCharacters: CharacterData[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const locale = useLocale();

  useEffect(() => {
    const handleReset = () => {
      setSearchQuery('');
      setSelectedElement(null);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('reset-search', handleReset);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('reset-search', handleReset);
      }
    };
  }, []);

  const filteredCharacters = useMemo(() => {
    return initialCharacters.filter((char) => {
      const name = locale === 'en' ? char.nameEn : char.nameVi;
      const matchName = name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchElement = selectedElement ? char.element === selectedElement : true;
      return matchName && matchElement;
    });
  }, [initialCharacters, searchQuery, selectedElement, locale]);

  return (
    <div className="flex flex-col gap-8">
      {/* Gallery Controls Bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-[#0d0d12]/70 backdrop-blur-md p-4 rounded-2xl border border-gray-900 shadow-xl">
        {/* Search Input */}
        <div className="relative w-full lg:w-80">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search characters..." 
            className="w-full bg-[#050508] text-white pl-10 pr-4 py-3 rounded-xl border border-gray-950 focus:border-yellow-500/40 focus:ring-1 focus:ring-yellow-500/20 outline-none transition-all placeholder:text-gray-650 text-sm font-medium" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
        
        {/* Element Filter Pills */}
        <div className="flex gap-2 flex-wrap justify-center items-center w-full lg:w-auto bg-[#050508] p-1.5 rounded-xl border border-gray-950">
          <button 
            onClick={() => setSelectedElement(null)} 
            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all border ${
              selectedElement === null 
                ? 'bg-white/10 text-white border-white/10 shadow-sm' 
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border-transparent'
            }`}
          >
            All
          </button>
          
          <div className="w-[1px] h-6 bg-gray-900 mx-1"></div>
          
          {ELEMENTS.map((el) => {
            const isSelected = selectedElement === el;
            const details = ELEMENT_DETAILS[el];
            return (
              <button 
                key={el} 
                onClick={() => setSelectedElement(isSelected ? null : el)} 
                className={`p-2 rounded-lg transition-all duration-300 border ${details.hoverBorder} ${
                  isSelected 
                    ? `${details.glow} ${details.border}` 
                    : 'bg-transparent border-transparent hover:bg-white/5'
                }`}
                title={el}
              >
                <div className="relative w-6 h-6">
                  <Image 
                    src={`/elements/${el.toLowerCase()}.png`} 
                    alt={el} 
                    fill
                    className={`object-contain transition-all duration-300 ${
                      isSelected 
                        ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] opacity-100' 
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid List */}
      {filteredCharacters.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-5">
          {filteredCharacters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500 bg-[#0d0d12]/30 rounded-2xl border border-gray-900/60">
          <span className="text-5xl mb-4 opacity-40">👻</span>
          <p className="text-sm font-semibold tracking-wide">No characters match your search criteria.</p>
        </div>
      )}
    </div>
  );
}
