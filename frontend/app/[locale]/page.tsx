import { fetchGraphQL, GET_CHARACTERS } from '@/lib/graphql';
import { CharacterData } from '@/types/character';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import UpcomingBirthdays from '@/components/home/UpcomingBirthdays';
import DailyFarming from '@/components/home/DailyFarming';
import Notices from '@/components/home/Notices';
import ServerReset from '@/components/home/ServerReset';

export const revalidate = 300;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Common' });
  const data = await fetchGraphQL(GET_CHARACTERS);
  const characters: CharacterData[] = data.characters;

  return (
    <main className="relative min-h-screen bg-[var(--bg-base)] text-white font-sans overflow-x-hidden pt-20 pb-10">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Branding */}
            <div className="mb-2">
              <h1 className="text-4xl font-bold text-white tracking-tight">GenshinHub</h1>
              <p className="text-white font-bold text-[15px]">Your best Teyvat guide!</p>
            </div>

            {/* Welcome Box */}
            <div className="border border-[#7264a8] rounded-xl p-4 bg-transparent text-[13px] text-white/90 leading-relaxed shadow-sm">
              Welcome, traveler! Here you can find the latest game news and various useful information, including info about characters, weapons, materials, and various other things, including tools for making your journey the best!
            </div>

            {/* Server Reset */}
            <ServerReset />

            {/* Shortcuts */}
            <div className="flex flex-col gap-2 mt-2">
              <h2 className="text-white font-bold text-lg">Shortcuts</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] font-bold text-white">
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
                  <Link key={s.href} href={s.href} className="hover:text-blue-300 transition-colors flex items-center gap-1.5">
                    <span className="text-white/70">{s.icon}</span> <span>{s.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Coming Birthdays */}
            <div className="mt-2">
              <UpcomingBirthdays characters={characters} locale={locale} />
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Notices */}
            <Notices />

            {/* Daily Farming */}
            <div className="h-[650px]">
              <DailyFarming locale={locale} />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
