import { fetchGraphQL, GET_CHARACTERS } from '@/lib/graphql';
import { CharacterData } from '@/types/character';
import { Link } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import UpcomingBirthdays from '@/components/home/UpcomingBirthdays';
import DailyFarming from '@/components/home/DailyFarming';
import Notices from '@/components/home/Notices';
import ServerReset from '@/components/home/ServerReset';

export const revalidate = 300;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Common' });
  const data = await fetchGraphQL(GET_CHARACTERS);
  const characters: CharacterData[] = data.characters;

  return (
    <main className="relative min-h-screen bg-[var(--bg-base)] text-white font-sans overflow-x-hidden pt-20 pb-20">
      
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-yellow-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-500/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* ── TOP SECTION: 2 COLUMNS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left Column (7/12) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            
            {/* Branding */}
            <div className="mb-2">
              <h1 className="text-5xl font-black text-white mb-2 font-display uppercase tracking-tight text-gradient-gold">
                GenshinHub
              </h1>
              <p className="text-white/60 font-medium text-[15px]">Your best Teyvat guide!</p>
            </div>

            {/* Welcome Box */}
            <div className="glass-strong rounded-xl p-5 text-[14px] text-white/80 leading-relaxed">
              Welcome, traveler! Here you can find the latest game news and various useful information, including info about characters, weapons, materials, and various other things, including tools for making your journey the best!
            </div>

            <ServerReset />

            {/* Shortcuts */}
            <div className="flex flex-col gap-2 mt-2">
              <h2 className="text-white font-bold text-lg text-gradient-gold">Shortcuts</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-3 text-[14px] font-bold text-white">
                {[
                  { href: '/characters', label: t('characters'), icon: '⚔️' },
                  { href: '/weapons', label: t('weapons'), icon: '🗡️' },
                  { href: '/artifacts', label: t('artifacts'), icon: '💎' },
                  { href: '/tcg', label: t('tcg'), icon: '🃏' },
                  { href: '/tierlist', label: t('tierlist'), icon: '🏆' },
                  { href: '/teams', label: 'Teams', icon: '👥' },
                  { href: '/showcase', label: t('showcase'), icon: '🔍' },
                  { href: '/banners', label: 'Banners', icon: '📜' },
                ].map(s => (
                  <Link key={s.href} href={s.href} className="hover:text-yellow-400 transition-colors flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded border border-white/5 shadow-sm">
                    <span>{s.icon}</span> <span>{s.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (5/12) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Notices />
            <div className="mt-2">
              <UpcomingBirthdays characters={characters} locale={locale} />
            </div>
          </div>

        </div>

        {/* ── BOTTOM SECTION: FULL WIDTH ── */}
        <div className="w-full">
          <DailyFarming locale={locale} />
        </div>

      </div>
    </main>
  );
}
