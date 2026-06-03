"use client";
import { useState, useMemo } from 'react';
import CharacterCard from './CharacterCard';
import { CharacterData, Element } from '@/types/character';

const ELEMENTS: Element[] = ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];

export default function CharacterGallery({ initialCharacters }: { initialCharacters: CharacterData[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const filteredCharacters = useMemo(() => {
    return initialCharacters.filter((char) => {
      const matchName = char.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchElement = selectedElement ? char.element === selectedElement : true;
      return matchName && matchElement;
    });
  }, [initialCharacters, searchQuery, selectedElement]);

  return (
    <div className="flex flex-col gap-8">
      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-[#15151a]/80 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-gray-800/60 shadow-lg">
        <input 
          type="text" 
          placeholder="Tìm kiếm nhân vật..." 
          className="w-full lg:w-80 bg-[#0b0b0e] text-white px-5 py-3 rounded-xl border border-gray-800 focus:border-yellow-500/70 focus:ring-1 focus:ring-yellow-500/50 outline-none transition-all placeholder:text-gray-600" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        
        <div className="flex gap-2 flex-wrap justify-center items-center w-full lg:w-auto bg-[#0b0b0e] p-1.5 rounded-xl border border-gray-800">
          <button 
            onClick={() => setSelectedElement(null)} 
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${selectedElement === null ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
          >
            Tất Cả
          </button>
          
          <div className="w-[1px] h-6 bg-gray-800 mx-1"></div> {/* Divider */}

          {ELEMENTS.map((el) => {
            const isSelected = selectedElement === el;
            return (
              <button 
                key={el} 
                onClick={() => setSelectedElement(isSelected ? null : el)} 
                className={`p-2 rounded-lg transition-all duration-300 group ${isSelected ? 'bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'hover:bg-white/5'}`}
                title={el}
              >
                <img 
                  src={`/elements/${el.toLowerCase()}.png`} 
                  alt={el} 
                  className={`w-6 h-6 object-contain transition-transform duration-300 ${isSelected ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]' : 'opacity-60 group-hover:opacity-100 group-hover:scale-110'}`}
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/24x24/333/FFF?text='+el[0]; }}
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid Nhân vật */}
      {filteredCharacters.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-5">
          {filteredCharacters.map((char) => (
            // FIX LỖI Ở ĐÂY: Dùng ngoặc nhọn thuần túy, tuyệt đối không có ngoặc kép
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500 bg-[#15151a]/50 rounded-2xl border border-gray-800/50">
          <span className="text-5xl mb-4 opacity-50">👻</span>
          <p className="text-lg">Không tìm thấy nhân vật nào phù hợp!</p>
        </div>
      )}
    </div>
  );
}
