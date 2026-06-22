import type { Metadata } from 'next';
import { fetchGraphQL, GET_CHARACTERS } from '@/lib/graphql';
import { CharacterData } from '@/types/character';
import { Link } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import UpcomingBirthdays from '@/components/home/UpcomingBirthdays';
import DailyFarming from '@/components/home/DailyFarming';
import ServerReset from '@/components/home/ServerReset';

export const metadata: Metadata = {
  title: 'GenshinHub - Genshin Impact Database & Builds',
  description: 'Explore characters, weapons, artifacts, banners, team builds, and utility tools for Genshin Impact.',
  openGraph: {
    title: 'GenshinHub - Genshin Impact Database',
    description: 'Explore characters, weapons, artifacts, banners, team builds, and utility tools for Genshin Impact.',
    images: ['/icon.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GenshinHub - Genshin Impact Database',
    description: 'Explore characters, weapons, artifacts, banners, team builds, and utility tools for Genshin Impact.',
    images: ['/icon.png'],
  },
};

export const revalidate = 300;

const FEATURE_CARDS = (t: any) => [
  {
    href: '/characters',
    label: t('characters'),
    desc: 'Build guides, teams & stats',
    gradient: 'from-red-500/20 to-orange-500/5',
    border: 'hover:border-red-500/30',
    glow: 'rgba(239,68,68,0.15)',
    icon: '⚔️',
    accent: '#ef4444',
  },
  {
    href: '/weapons',
    label: t('weapons'),
    desc: 'Find the perfect weapon',
    gradient: 'from-amber-500/20 to-yellow-500/5',
    border: 'hover:border-amber-500/30',
    glow: 'rgba(245,158,11,0.15)',
    icon: '🗡️',
    accent: '#f59e0b',
  },
  {
    href: '/artifacts',
    label: t('artifacts'),
    desc: 'Best artifact sets by role',
    gradient: 'from-purple-500/20 to-violet-500/5',
    border: 'hover:border-purple-500/30',
    glow: 'rgba(168,85,247,0.15)',
    icon: '💎',
    accent: '#a855f7',
  },
  {
    href: '/tierlist',
    label: t('tierlist'),
    desc: 'Current meta rankings',
    gradient: 'from-yellow-500/20 to-amber-500/5',
    border: 'hover:border-yellow-500/30',
    glow: 'rgba(234,179,8,0.15)',
    icon: '🏆',
    accent: '#eab308',
  },
  {
    href: '/teams',
    label: 'Teams',
    desc: 'Best team compositions',
    gradient: 'from-cyan-500/20 to-blue-500/5',
    border: 'hover:border-cyan-500/30',
    glow: 'rgba(6,182,212,0.15)',
    icon: '👥',
    accent: '#06b6d4',
  },
  {
    href: '/banners',
    label: 'Banners',
    desc: 'Current & upcoming banners',
    gradient: 'from-pink-500/20 to-rose-500/5',
    border: 'hover:border-pink-500/30',
    glow: 'rgba(236,72,153,0.15)',
    icon: '📜',
    accent: '#ec4899',
  },
  {
    href: '/materials',
    label: 'Materials',
    desc: 'Ascension & talent mats',
    gradient: 'from-emerald-500/20 to-green-500/5',
    border: 'hover:border-emerald-500/30',
    glow: 'rgba(16,185,129,0.15)',
    icon: '📦',
    accent: '#10b981',
  },
  {
    href: '/showcase',
    label: t('showcase'),
    desc: 'View your built characters',
    gradient: 'from-blue-500/20 to-indigo-500/5',
    border: 'hover:border-blue-500/30',
    glow: 'rgba(59,130,246,0.15)',
    icon: '🔍',
    accent: '#3b82f6',
  },
  {
    href: '/tcg',
    label: t('tcg'),
    desc: 'Card game decks & cards',
    gradient: 'from-teal-500/20 to-cyan-500/5',
    border: 'hover:border-teal-500/30',
    glow: 'rgba(20,184,166,0.15)',
    icon: '🃏',
    accent: '#14b8a6',
  },
];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Common' });
  const data = await fetchGraphQL(GET_CHARACTERS);
  const characters: CharacterData[] = data.characters || [];

  const stats = [
    { value: characters.length, label: locale === 'en' ? 'Characters' : 'Nhân Vật', icon: '⚔️' },
    { value: characters.filter(c => c.rarity === 5).length, label: '5★ Characters', icon: '⭐' },
    { value: 9, label: locale === 'en' ? 'Sections' : 'Mục', icon: '📚' },
    { value: 2, label: locale === 'en' ? 'Languages' : 'Ngôn Ngữ', icon: '🌐' },
  ];

  const featureCards = FEATURE_CARDS(t);

  return (
    <main className="relative min-h-screen bg-[#06060a] text-white font-sans overflow-x-hidden">

      {/* ── AMBIENT GLOWS ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-[-5%] w-[800px] h-[800px] bg-yellow-500/[0.025] rounded-full blur-[160px]" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/[0.025] rounded-full blur-[140px]" />
        <div className="absolute bottom-[0%] left-[30%] w-[500px] h-[500px] bg-blue-500/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-10 pb-24">

        {/* ══════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════ */}
        <section className="relative mb-14 text-center">
          {/* Decorative radial glow behind title */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[300px] bg-yellow-400/[0.04] rounded-full blur-[80px]" />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-yellow-400/80">
              {locale === 'en' ? 'Your Ultimate Teyvat Guide' : 'Cẩm Nang Teyvat Của Bạn'}
            </span>
          </div>

          {/* Main title */}
          <h1 className="relative text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-none mb-4 font-display">
            <span className="text-gradient-gold">Genshin</span>
            <span className="text-white/90">Hub</span>
          </h1>

          {/* Tagline */}
          <p className="text-white/40 text-base sm:text-lg font-medium max-w-xl mx-auto mb-8 leading-relaxed">
            {locale === 'en'
              ? 'Characters, builds, weapons, artifacts, teams & more. Everything you need to conquer Teyvat.'
              : 'Nhân vật, build, vũ khí, thánh di vật, đội hình & nhiều hơn nữa. Tất cả những gì bạn cần để chinh phục Teyvat.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/characters"
              className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-black text-sm px-7 py-3 rounded-xl shadow-[0_4px_24px_rgba(255,179,0,0.3)] hover:shadow-[0_4px_32px_rgba(255,179,0,0.45)] transition-all duration-200 uppercase tracking-wider"
            >
              <span>⚔️</span>
              {locale === 'en' ? 'Browse Characters' : 'Xem Nhân Vật'}
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/tierlist"
              className="inline-flex items-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.08] hover:border-white/[0.15] text-white font-bold text-sm px-7 py-3 rounded-xl transition-all duration-200 uppercase tracking-wider"
            >
              <span>🏆</span>
              {locale === 'en' ? 'Tier List' : 'Xếp Hạng'}
            </Link>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            STATS BAR
        ══════════════════════════════════════════ */}
        <section className="mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl p-4 flex items-center gap-3 hover:border-white/[0.10] transition-colors group"
              >
                <span className="text-2xl">{stat.icon}</span>
                <div>
                  <div className="text-2xl font-black text-white font-display leading-none">{stat.value}</div>
                  <div className="text-[10px] font-bold text-white/30 uppercase tracking-wider mt-0.5">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FEATURE CARDS GRID
        ══════════════════════════════════════════ */}
        <section className="mb-14">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="w-[3px] h-5 rounded-full bg-yellow-400" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">
              {locale === 'en' ? 'Explore' : 'Khám Phá'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {featureCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className={`group relative bg-gradient-to-br ${card.gradient} bg-[#0d0d14]/60 border border-white/[0.06] ${card.border} rounded-2xl p-4 flex flex-col gap-2 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden`}
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${card.glow} 0%, transparent 70%)` }}
                />

                <span className="text-3xl leading-none">{card.icon}</span>

                <div className="relative">
                  <div className="font-black text-sm text-white/90 uppercase tracking-wide group-hover:text-white transition-colors">
                    {card.label}
                  </div>
                  <div className="text-[10px] text-white/35 font-medium mt-0.5 group-hover:text-white/55 transition-colors leading-snug">
                    {card.desc}
                  </div>
                </div>

                {/* Arrow */}
                <svg
                  className="absolute bottom-3 right-3 w-3.5 h-3.5 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-200"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            UTILITY ROW: Server Reset + Birthdays
        ══════════════════════════════════════════ */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ServerReset />
            <UpcomingBirthdays characters={characters} locale={locale} />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            DAILY FARMING
        ══════════════════════════════════════════ */}
        <section>
          <div className="bg-[#0d0d14]/50 border border-white/[0.05] rounded-2xl p-5 sm:p-6">
            <DailyFarming locale={locale} />
          </div>
        </section>

      </div>
    </main>
  );
}
