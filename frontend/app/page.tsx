import CharacterGallery from '@/components/CharacterGallery';
import { fetchGraphQL, GET_CHARACTERS } from '@/lib/graphql';
import { CharacterData } from '@/types/character';

export default async function Home() {
  const data = await fetchGraphQL(GET_CHARACTERS);
  const characters: CharacterData[] = data.characters;
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
