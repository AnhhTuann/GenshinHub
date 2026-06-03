import CharacterGallery from '@/components/CharacterGallery';
import charactersData from '@/data/characters.json';
import { CharacterData } from '@/types/character';

export default function Home() {
  const characters: CharacterData[] = charactersData as CharacterData[];
  return (
    <main className="p-4 md:p-8 font-sans">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8 border-b border-gray-800 pb-5">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-2">Teyvat Database</h1>
          <p className="text-gray-400 text-lg">Khám phá thông tin và cách build đồ chuẩn nhất.</p>
        </div>
        <CharacterGallery initialCharacters={characters}/>
      </div>
    </main>
  );
}
