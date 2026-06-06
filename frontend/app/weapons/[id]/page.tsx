import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { fetchGraphQL, GET_WEAPON_BY_ID, GET_CHARACTERS_BY_WEAPON_TYPE, GET_WEAPONS } from '@/lib/graphql';

const ELEMENT_COLORS: Record<string, string> = {
  pyro: 'text-red-400', hydro: 'text-blue-400', cryo: 'text-cyan-300',
  electro: 'text-purple-400', anemo: 'text-emerald-400', geo: 'text-yellow-500',
  dendro: 'text-green-400', physical: 'text-gray-300',
};

const RARITY_BG: Record<number, string> = {
  5: 'from-[#FFE082] via-[#FFB300] to-[#E65100]',
  4: 'from-[#CE93D8] via-[#9C27B0] to-[#6A1B9A]',
  3: 'from-[#90CAF9] via-[#1976D2] to-[#0D47A1]',
  2: 'from-gray-400 via-gray-600 to-gray-800',
  1: 'from-gray-500 via-gray-700 to-gray-900',
};

const RARITY_BORDER: Record<number, string> = {
  5: 'border-amber-500/40',
  4: 'border-purple-500/40',
  3: 'border-blue-500/40',
  2: 'border-gray-500/40',
  1: 'border-gray-600/40',
};

const STAR_COLOR: Record<number, string> = {
  5: 'text-yellow-400',
  4: 'text-purple-400',
  3: 'text-blue-400',
  2: 'text-gray-400',
  1: 'text-gray-500',
};

interface Weapon {
  id: string; name: string; rarity: number; type: string;
  baseAtk: number; subStat: string | null; subStatValue: number | null;
  passiveName: string | null; passiveDesc: string | null; iconUrl: string | null;
}

interface CharBasic {
  id: string; name: string; element: string; rarity: number; avatarUrl: string; weapon: string;
}

export async function generateStaticParams() {
  const data = await fetchGraphQL(GET_WEAPONS);
  return (data.weapons || []).map((w: Weapon) => ({ id: w.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const data = await fetchGraphQL(GET_WEAPON_BY_ID, { id });
  const weapon = data.weapon as Weapon | null;
  if (!weapon) return { title: 'Weapon Not Found' };
  return {
    title: `${weapon.name} - TeyvatDB`,
    description: `${weapon.type} | ${weapon.rarity}★ | ATK cơ bản: ${weapon.baseAtk}`,
  };
}

export default async function WeaponDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [weaponData, usersData] = await Promise.all([
    fetchGraphQL(GET_WEAPON_BY_ID, { id }),
    // Fetch later after we know weapon type
    Promise.resolve(null),
  ]);

  const weapon = weaponData.weapon as Weapon | null;
  if (!weapon) notFound();

  const charsData = await fetchGraphQL(GET_CHARACTERS_BY_WEAPON_TYPE, { weaponType: weapon.type });
  const characters: CharBasic[] = charsData.charactersByWeaponType || [];

  const rarity = weapon.rarity ?? 5;
  const stars = '★'.repeat(rarity);

  return (
    <main className="min-h-screen bg-[#0b0b0e] text-gray-200 pb-24 font-sans selection:bg-yellow-500/30">
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-4">
        <Link className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium w-fit mb-6" href="/weapons">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Weapons
        </Link>

        {/* Hero Section */}
        <div className={`relative rounded-2xl border ${RARITY_BORDER[rarity]} overflow-hidden bg-[#15151a] shadow-2xl mb-8`}>
          {/* Background glow */}
          <div className={`absolute inset-0 bg-gradient-to-br ${RARITY_BG[rarity]} opacity-5`} />

          <div className="relative flex flex-col md:flex-row gap-8 p-8">
            {/* Weapon Image */}
            <div className={`w-40 h-40 flex-shrink-0 rounded-2xl bg-gradient-to-br ${RARITY_BG[rarity]} p-[2px] shadow-xl self-center`}>
              <div className="relative w-full h-full rounded-2xl bg-[#0b0b0e]/90 flex items-center justify-center overflow-hidden">
                {weapon.iconUrl ? (
                  <Image src={weapon.iconUrl} alt={weapon.name} fill className="object-contain p-3" />
                ) : (
                  <span className="text-5xl">⚔️</span>
                )}
              </div>
            </div>

            {/* Weapon Info */}
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{weapon.type}</p>
              <h1 className="text-4xl font-black text-white mb-2 leading-tight">{weapon.name}</h1>
              <p className={`text-xl font-bold mb-4 ${STAR_COLOR[rarity]}`}>{stars}</p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-4">
                <div className="bg-[#0b0b0e]/60 border border-gray-800/50 rounded-xl px-5 py-3">
                      <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Base ATK</p>
                  <p className="text-red-400 font-black text-2xl">{weapon.baseAtk}</p>
                </div>
                {weapon.subStat && (
                  <div className="bg-[#0b0b0e]/60 border border-gray-800/50 rounded-xl px-5 py-3">
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">{weapon.subStat}</p>
                    <p className="text-blue-400 font-black text-2xl">
                      {weapon.subStatValue ?? '—'}
                      {weapon.subStatValue && (
                        weapon.subStat.includes('%') || weapon.subStat.includes('Rate') ||
                        weapon.subStat.includes('DMG') || weapon.subStat.includes('Recharge') ||
                        weapon.subStat.includes('Mastery') || weapon.subStat.includes('Bonus') ? '%' : ''
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Passive */}
          {weapon.passiveName && (
            <div className="relative mx-8 mb-8 bg-[#0b0b0e]/60 border border-gray-800/50 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-yellow-400 text-lg">⚡</span>
                <p className="text-yellow-400 font-black text-base">{weapon.passiveName}</p>
              </div>
              {weapon.passiveDesc && (
                <p
                  className="text-gray-300 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: weapon.passiveDesc
                      .replace(/<color=#99FFFFFF>/g, '<span style="color:#80DEEA; font-weight:bold">')
                      .replace(/<\/color>/g, '</span>')
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* Characters that can use this weapon */}
        <section>
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-yellow-500 inline-block"></span>
            Characters Who Can Use This
            <span className="text-gray-500 text-sm font-normal">({characters.length} characters)</span>
          </h2>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {characters.map((char) => (
              <Link
                key={char.id}
                href={`/characters/${char.id}`}
                className="group flex flex-col items-center gap-1.5 hover:scale-105 transition-transform"
              >
                <div className={`relative w-full aspect-square rounded-xl overflow-hidden border ${char.rarity === 5 ? 'border-yellow-500/50' : 'border-purple-500/40'} bg-gradient-to-br ${char.rarity === 5 ? 'from-yellow-900/40 to-amber-950/60' : 'from-purple-900/40 to-violet-950/60'}`}>
                  {char.avatarUrl ? (
                    <Image
                      src={char.avatarUrl}
                      alt={char.name}
                      fill
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">👤</div>
                  )}
                  {/* Element icon */}
                  <div className="absolute bottom-0.5 right-0.5">
                    <Image
                      src={`/elements/${char.element.toLowerCase()}.png`}
                      alt={char.element}
                      width={14}
                      height={14}
                      className="drop-shadow-md"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 text-center leading-tight group-hover:text-white transition-colors line-clamp-2">
                  {char.name}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
