import CharacterGallery from '@/components/CharacterGallery';
import { fetchGraphQL, GET_CHARACTERS } from '@/lib/graphql';
import { CharacterData } from '@/types/character';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export const revalidate = 300;

export default async function Home() {
  const t = await getTranslations('Common');
  const data = await fetchGraphQL(GET_CHARACTERS);
  const characters: CharacterData[] = data.characters;

  const total5Star = characters.filter(c => c.rarity === 5).length;
  const total4Star = characters.filter(c => c.rarity === 4).length;

  return (
    <main className="relative min-h-screen bg-[#06060a] text-white font-sans overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-yellow-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute top-[30%] right-[-5%]  w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[350px] h-[350px] bg-blue-500/[0.03] rounded-full blur-[90px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* ── Hero Header ── */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="w-5 h-[2px] bg-yellow-400 rounded-full" />
              <span className="text-yellow-400/70 text-[10px] font-black uppercase tracking-[0.25em]">Database</span>
            </div>
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tighter leading-none">
              <span className="text-gradient-gold">GENSHIN</span>
              <span className="text-white/90 ml-2">HUB</span>
            </h1>
            <p className="text-white/40 text-sm md:text-base max-w-lg leading-relaxed">
              Your ultimate Genshin Impact companion — character builds, weapons, artifacts, and team comps.
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-4 mt-1">
              {[
                { label: 'Characters', val: characters.length },
                { label: '5-Star',     val: total5Star, color: 'text-amber-400' },
                { label: '4-Star',     val: total4Star, color: 'text-purple-400' },
              ].map(({ label, val, color }) => (
                <div key={label} className="flex items-baseline gap-1.5">
                  <span className={`text-lg font-black font-display ${color ?? 'text-white/80'}`}>{val}</span>
                  <span className="text-[10px] text-white/30 uppercase tracking-wider font-bold">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick nav cards */}
          <div className="flex gap-2 flex-wrap md:flex-nowrap shrink-0">
            {[
              { href: '/weapons',   icon: '🗡️',  label: 'Weapons',   bg: 'from-amber-500/10 to-amber-900/5  border-amber-500/15' },
              { href: '/artifacts', icon: '💎',  label: 'Artifacts', bg: 'from-purple-500/10 to-purple-900/5 border-purple-500/15' },
              { href: '/showcase',  icon: '🔍',  label: t('showcase'), bg: 'from-blue-500/10 to-blue-900/5   border-blue-500/15' },
            ].map(({ href, icon, label, bg }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br ${bg} border rounded-xl text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-lg`}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-8" />

        {/* ── Character Gallery ── */}
        <CharacterGallery initialCharacters={characters} />
      </div>
    </main>
  );
}
