import CharacterGallery from '@/components/CharacterGallery';
import { fetchGraphQL, GET_CHARACTERS } from '@/lib/graphql';
import { CharacterData } from '@/types/character';

export default async function Home() {
  const data = await fetchGraphQL(GET_CHARACTERS);
  const characters: CharacterData[] = data.characters;
  return (
    <main className="p-4 md:p-8 font-sans">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8 border-b border-gray-800 pb-5 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-2">Teyvat Database</h1>
            <p className="text-gray-400 text-lg">Khám phá thông tin và cách build đồ chuẩn nhất.</p>
          </div>
          <a href="/showcase" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition shadow-lg shadow-blue-500/20">
            Tra cứu UID Showcase
          </a>
        </div>
        <CharacterGallery initialCharacters={characters}/>
      </div>
    </main>
  );
}
