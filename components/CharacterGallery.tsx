"use client";

import { useState, useMemo } from 'react';
import CharacterCard from './CharacterCard';
import { CharacterItem, Element } from '@/types/character';

// Danh sách các nguyên tố
const ELEMENTS: Element[] = ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];

interface Props {
  initialCharacters: CharacterItem[];
}

export default function CharacterGallery({ initialCharacters }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  // Logic lọc nhân vật (Tự động chạy lại mỗi khi search hoặc đổi filter)
  const filteredCharacters = useMemo(() => {
    return initialCharacters.filter((char) => {
      // 1. Kiểm tra Search
      const matchName = char.name.toLowerCase().includes(searchQuery.toLowerCase());
      // 2. Kiểm tra Filter Nguyên Tố (Nếu không chọn gì thì bỏ qua)
      const matchElement = selectedElement ? char.element === selectedElement : true;
      
      return matchName && matchElement;
    });
  }, [initialCharacters, searchQuery, selectedElement]);

  return (
    <div className="flex flex-col gap-6">
      
      {/* --- THANH TÌM KIẾM & BỘ LỌC --- */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-[#1c1c22] p-4 rounded-xl border border-gray-800 shadow-lg">
        
        {/* Ô Search */}
        <div className="w-full lg:w-72">
          <input
            type="text"
            placeholder="Tìm kiếm nhân vật..."
            className="w-full bg-[#111115] text-white px-4 py-2.5 rounded-lg border border-gray-700 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Nút lọc Nguyên Tố */}
        <div className="flex gap-2 flex-wrap justify-center w-full lg:w-auto">
          {/* Nút "Tất cả" */}
          <button
            onClick={() => setSelectedElement(null)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              selectedElement === null 
                ? 'bg-gray-200 text-black shadow-[0_0_10px_rgba(255,255,255,0.2)]' 
                : 'bg-[#111115] text-gray-400 hover:text-white border border-gray-700'
            }`}
          >
            Tất Cả
          </button>
          
          {/* Các nút nguyên tố */}
          {ELEMENTS.map((el) => (
            <button
              key={el}
              onClick={() => setSelectedElement(el === selectedElement ? null : el)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                selectedElement === el 
                  ? 'bg-yellow-600 text-white border border-yellow-500 shadow-[0_0_10px_rgba(202,138,4,0.4)]' 
                  : 'bg-[#111115] text-gray-400 hover:text-white border border-gray-700'
              }`}
            >
              {el}
            </button>
          ))}
        </div>
      </div>

      {/* --- LƯỚI HIỂN THỊ NHÂN VẬT --- */}
      {filteredCharacters.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
          {filteredCharacters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      ) : (
        // Hiển thị khi không tìm thấy ai
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-[#1c1c22] rounded-xl border border-gray-800">
          <span className="text-4xl mb-3">👻</span>
          <p className="text-lg">Không tìm thấy nhân vật nào phù hợp!</p>
        </div>
      )}
      
    </div>
  );
}
