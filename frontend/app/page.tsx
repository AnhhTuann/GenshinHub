import CharacterGallery from '@/components/CharacterGallery';
import { fetchGraphQL, GET_CHARACTERS } from '@/lib/graphql';
import { CharacterData } from '@/types/character';

export default async function Home() {
  const data = await fetchGraphQL(GET_CHARACTERS);
  const characters: CharacterData[] = data.characters;

  return (
    <main className="relative min-h-screen bg-[#0b0b0e] text-gray-200 p-4 md:p-8 font-sans overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(202,138,4,0.1)_0,transparent_70%)] pointer-events-none -z-10"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        <div className="mb-8 border-b border-gray-800/60 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 mb-2 drop-shadow-sm">
              Teyvat Database
            </h1>
            <p className="text-gray-400 text-lg">Khám phá thông tin và cách build đồ chuẩn nhất.</p>
          </div>
          
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#1c1c22]/80 backdrop-blur-sm text-yellow-500 font-semibold rounded-lg border border-yellow-500/40 hover:bg-yellow-500/10 hover:border-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.25)] transition-all duration-300">
            <span>🔍</span> Tra cứu UID Showcase
          </button>
        </div>

        <CharacterGallery initialCharacters={characters}/>
      </div>
    </main>
  );
}
