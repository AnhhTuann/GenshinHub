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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-[#1c1c22] p-4 rounded-xl border border-gray-800 shadow-lg">
        <input type="text" placeholder="Tìm kiếm nhân vật..." className="w-full lg:w-72 bg-[#111115] text-white px-4 py-2.5 rounded-lg border border-gray-700 focus:border-yellow-500 outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <div className="flex gap-2 flex-wrap justify-center w-full lg:w-auto">
          <button onClick={() => setSelectedElement(null)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${selectedElement === null ? 'bg-gray-200 text-black' : 'bg-[#111115] text-gray-400 border border-gray-700'}`}>Tất Cả</button>
          {ELEMENTS.map((el) => (
            <button key={el} onClick={() => setSelectedElement(el === selectedElement ? null : el)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${selectedElement === el ? 'bg-yellow-600 text-white' : 'bg-[#111115] text-gray-400 border border-gray-700'}`}>{el}</button>
          ))}
        </div>
      </div>

      {filteredCharacters.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
          {filteredCharacters.map((char) => <CharacterCard character={char} key={char.id}/>)}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-[#1c1c22] rounded-xl border border-gray-800">Không tìm thấy nhân vật!</div>
      )}
    </div>
  );
}
