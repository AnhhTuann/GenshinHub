import type { Metadata } from 'next';
import { fetchGraphQL, GET_CHARACTERS } from '@/lib/graphql';
import { CharacterData } from '@/types/character';
import { Link } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import UpcomingBirthdays from '@/components/home/UpcomingBirthdays';
import DailyFarming from '@/components/home/DailyFarming';
import ServerReset from '@/components/home/ServerReset';
import FeatureGrid from '@/components/home/FeatureGrid';
import CharacterSpotlight from '@/components/home/CharacterSpotlight';

export const metadata: Metadata = {
  title: 'GenshinHub — Genshin Impact Database & Builds',
  description: 'Explore characters, weapons, artifacts, banners, team builds, and utility tools for Genshin Impact.',
  openGraph: {
    title: 'GenshinHub — Genshin Impact Database',
    description: 'Everything you need to conquer Teyvat — builds, teams, weapons, artifacts and more.',
    images: ['/icon.png'],
    type: 'website',
  },
};

export const revalidate = 300;

const FEATURES = (t: any, locale: string) => [
  { href: '/characters', label: t('characters'), desc: locale === 'en' ? 'Builds, teams & stats'      : 'Build, đội hình & chỉ số',        color: '#ff6b4a', bg: 'rgba(255,107,74,0.07)',   icon: '⚔️' },
  { href: '/weapons',    label: t('weapons'),    desc: locale === 'en' ? 'Find the perfect weapon'    : 'Tìm vũ khí tốt nhất',             color: '#ffd54f', bg: 'rgba(255,213,79,0.07)',   icon: '🗡️' },
  { href: '/artifacts',  label: t('artifacts'),  desc: locale === 'en' ? 'Best artifact sets'         : 'Bộ thánh di vật tốt nhất',        color: '#ce93d8', bg: 'rgba(206,147,216,0.07)', icon: '💎' },
  { href: '/tierlist',   label: t('tierlist'),   desc: locale === 'en' ? 'Current meta rankings'      : 'Xếp hạng meta hiện tại',          color: '#c8a84b', bg: 'rgba(200,168,75,0.07)',   icon: '🏆' },
  { href: '/teams',      label: 'Teams',          desc: locale === 'en' ? 'Best team compositions'     : 'Đội hình meta tốt nhất',          color: '#4fc3f7', bg: 'rgba(79,195,247,0.07)',   icon: '👥' },
  { href: '/banners',    label: t('banners'),    desc: locale === 'en' ? 'Current & upcoming banners' : 'Banner hiện tại & sắp tới',       color: '#ec4899', bg: 'rgba(236,72,153,0.07)',   icon: '📜' },
  { href: '/materials',  label: 'Materials',      desc: locale === 'en' ? 'Ascension & talent mats'   : 'Nguyên liệu thăng cấp',           color: '#aed581', bg: 'rgba(174,213,129,0.07)', icon: '📦' },
  { href: '/showcase',   label: t('showcase'),   desc: locale === 'en' ? 'View your builds'           : 'Xem build của bạn',               color: '#4fc3f7', bg: 'rgba(79,195,247,0.07)',   icon: '🔍' },
  { href: '/tcg',        label: t('tcg'),        desc: locale === 'en' ? 'Card game decks'            : 'Bộ bài TCG',                      color: '#4db6ac', bg: 'rgba(77,182,172,0.07)',   icon: '🃏' },
];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Common' });
  const data = await fetchGraphQL(GET_CHARACTERS);
  const characters: CharacterData[] = data.characters || [];

  const total5Star = characters.filter(c => c.rarity === 5).length;
  const features   = FEATURES(t, locale);
  const spotlight  = [...characters].sort((a, b) => b.rarity - a.rarity).slice(0, 10);

  const STATS = [
    { value: characters.length, label: locale === 'en' ? 'Total Characters' : 'Tổng Nhân Vật', icon: '⚔️', color: '#c8a84b' },
    { value: total5Star,        label: '5★ Legends',                                            icon: '⭐', color: '#ffd54f' },
    { value: 9,                 label: locale === 'en' ? 'Sections'  : 'Mục',                  icon: '📚', color: '#ce93d8' },
    { value: 2,                 label: locale === 'en' ? 'Languages' : 'Ngôn Ngữ',             icon: '🌐', color: '#4fc3f7' },
  ];

  return (
    <main
      className="relative min-h-screen text-white overflow-x-hidden"
      style={{ background: 'var(--bg-void, #04040a)' }}
    >
      {/* ── Aurora ambient glows (pure CSS, no JS needed) ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-[20%] -left-[10%] w-[800px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(200,168,75,0.07) 0%, transparent 65%)', filter: 'blur(120px)' }}
        />
        <div
          className="absolute top-[30%] -right-[15%] w-[700px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(127,90,240,0.05) 0%, transparent 65%)', filter: 'blur(120px)' }}
        />
        <div
          className="absolute -bottom-[10%] left-[25%] w-[600px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(79,195,247,0.04) 0%, transparent 65%)', filter: 'blur(100px)' }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-10 pb-28">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="relative mb-16 text-center">
          <div
            className="absolute inset-x-0 top-0 h-[400px] -z-10 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(200,168,75,0.08) 0%, transparent 70%)' }}
          />

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
            style={{ background: 'rgba(200,168,75,0.10)', border: '1px solid rgba(200,168,75,0.22)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#c8a84b' }} />
            <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: '#c8a84b' }}>
              {locale === 'en' ? 'Your Ultimate Teyvat Guide' : 'Cẩm Nang Teyvat Của Bạn'}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-6xl sm:text-7xl md:text-[90px] font-black uppercase tracking-tight leading-none mb-5"
            style={{ fontFamily: 'var(--font-cinzel, Cinzel, serif)' }}
          >
            <span style={{
              background: 'linear-gradient(135deg, #fff8e1 0%, #f0d080 30%, #c8a84b 60%, #f0d080 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Genshin
            </span>
            <span className="text-white/90">Hub</span>
          </h1>

          {/* Decorative rule */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-24 sm:w-40" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,168,75,0.4))' }} />
            <svg className="w-3.5 h-3.5 shrink-0" style={{ color: '#c8a84b' }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2 L12 8 L18 8 L13.5 11.5 L15.5 18 L10 14 L4.5 18 L6.5 11.5 L2 8 L8 8 Z" />
            </svg>
            <div className="h-px w-24 sm:w-40" style={{ background: 'linear-gradient(90deg, rgba(200,168,75,0.4), transparent)' }} />
          </div>

          {/* Tagline */}
          <p className="text-white/40 text-base sm:text-lg font-medium max-w-xl mx-auto mb-10 leading-relaxed">
            {locale === 'en'
              ? 'Characters, builds, weapons, artifacts, teams & more. Everything you need to conquer Teyvat.'
              : 'Nhân vật, build, vũ khí, thánh di vật, đội hình & nhiều hơn nữa. Tất cả những gì bạn cần để chinh phục Teyvat.'}
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/characters"
              className="group inline-flex items-center gap-2.5 text-black font-black text-sm px-8 py-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-wider"
              style={{
                background: 'linear-gradient(135deg, #f0d080, #c8a84b)',
                boxShadow: '0 6px 28px rgba(200,168,75,0.35)',
              }}
            >
              <span>⚔️</span>
              {locale === 'en' ? 'Browse Characters' : 'Xem Nhân Vật'}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/tierlist"
              className="inline-flex items-center gap-2.5 font-bold text-sm px-8 py-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-wider"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              <span>🏆</span>
              {locale === 'en' ? 'Tier List' : 'Xếp Hạng'}
            </Link>
          </div>
        </section>

        {/* ══════════════════════════════════════
            STATS BAR
        ══════════════════════════════════════ */}
        <section className="mb-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'rgba(13,13,20,0.70)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}
                >
                  {s.icon}
                </div>
                <div>
                  <div
                    className="text-2xl font-black leading-none"
                    style={{ color: s.color, fontFamily: 'var(--font-mono, monospace)' }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[10px] font-bold text-white/35 uppercase tracking-wider mt-0.5">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            CHARACTER SPOTLIGHT
        ══════════════════════════════════════ */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-[3px] h-6 rounded-full" style={{ background: 'linear-gradient(to bottom, #f0d080, #c8a84b)' }} />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">
                {locale === 'en' ? 'Character Spotlight' : 'Nhân Vật Nổi Bật'}
              </span>
            </div>
            <Link
              href="/characters"
              className="text-xs font-bold uppercase tracking-wider hover:opacity-70 transition-opacity"
              style={{ color: '#c8a84b' }}
            >
              {locale === 'en' ? 'View All →' : 'Xem Tất Cả →'}
            </Link>
          </div>
          {/* Client component for the scroll-strip */}
          <CharacterSpotlight characters={spotlight} />
        </section>

        {/* ══════════════════════════════════════
            FEATURE GRID
        ══════════════════════════════════════ */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-[3px] h-6 rounded-full" style={{ background: 'linear-gradient(to bottom, #f0d080, #c8a84b)' }} />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">
              {locale === 'en' ? 'Explore Teyvat' : 'Khám Phá Teyvat'}
            </span>
          </div>
          {/* Client component for hover effects */}
          <FeatureGrid features={features} />
        </section>

        {/* ══════════════════════════════════════
            UTILITY ROW
        ══════════════════════════════════════ */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ServerReset />
            <UpcomingBirthdays characters={characters} locale={locale} />
          </div>
        </section>

        {/* ══════════════════════════════════════
            DAILY FARMING
        ══════════════════════════════════════ */}
        <section>
          <div
            className="rounded-2xl p-5 sm:p-6"
            style={{
              background: 'rgba(13,13,20,0.60)',
              border: '1px solid rgba(255,255,255,0.05)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <DailyFarming locale={locale} />
          </div>
        </section>

      </div>
    </main>
  );
}
