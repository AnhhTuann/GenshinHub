import CharacterGallery from '@/components/CharacterGallery';
import charactersData from '@/data/characters.json';
import { CharacterItem } from '@/types/character';

export default function Home() {
  const characters: CharacterItem[] = charactersData as CharacterItem[];

  return (
    <main className="flex-1 overflow-y-auto bg-[#111115] text-gray-200 p-4 md:p-8 font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header của trang */}
        <div className="mb-8 border-b border-gray-800 pb-5">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-2">
            Teyvat Database
          </h1>
          <p className="text-gray-400 text-lg">Khám phá thông tin và cách build đồ chuẩn nhất.</p>
        </div>

        {/* Gọi component xử lý Lọc/Tìm kiếm/Hiển thị lưới */}
        <CharacterGallery initialCharacters={characters} />

      </div>
    </main>
  );
}
