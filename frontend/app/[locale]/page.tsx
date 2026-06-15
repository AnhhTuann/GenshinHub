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
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Branding */}
            <div>
              <h1 className="text-4xl font-black font-display text-white">GenshinHub</h1>
              <p className="text-white/60 font-bold">Your best Teyvat guide!</p>
            </div>

            {/* Welcome Box */}
            <div className="border border-purple-500/30 rounded-xl p-4 bg-purple-500/5 text-sm text-blue-100">
              Welcome, traveler! Here you can find the latest game news and various useful information, including info about characters, weapons, materials, and various other things, including tools for making your journey the best!
            </div>

            {/* Server Reset */}
            <ServerReset />

            {/* Shortcuts */}
            <div className="flex flex-col gap-2">
              <h2 className="text-white font-bold text-lg">Shortcuts</h2>
              <div className="flex flex-wrap gap-2 text-sm font-bold text-white/70">
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
                  <Link key={s.href} href={s.href} className="hover:text-white transition-colors flex items-center gap-1">
                    <span>{s.icon}</span> <span>{s.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Coming Birthdays */}
            <UpcomingBirthdays characters={characters} locale={locale} />
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Notices */}
            <Notices />

            {/* Daily Farming */}
            <div className="h-[600px]">
              <DailyFarming locale={locale} />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
