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
import HeroParticles from '@/components/home/HeroParticles';
import PremiumButton from '@/components/ui/PremiumButton';

export const metadata: Metadata = {
  title: 'GenshinHub — Genshin Impact Database & Builds',
  description: 'Explore characters, weapons, artifacts, banners, team builds, and utility tools for Genshin Impact.',
  openGraph: {
    title: 'GenshinHub — Genshin Impact Database',
    description: 'Everything you need to conquer Teyvat — builds, teams, weapons, artifacts and more.',
    images: ['/icon.webp'],
    type: 'website',
  },
};

export const revalidate = 3600;

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
      {/* ── Aurora ambient glows ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-[20%] -left-[10%] w-[900px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.11) 0%, transparent 65%)', filter: 'blur(110px)' }}
        />
        <div
          className="absolute top-[30%] -right-[15%] w-[700px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(34,211,238,0.08) 0%, transparent 65%)', filter: 'blur(100px)' }}
        />
        <div
          className="absolute -bottom-[10%] left-[25%] w-[700px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(52,211,153,0.06) 0%, transparent 65%)', filter: 'blur(90px)' }}
        />
        {/* Extra vivid accent */}
        <div
          className="absolute top-[55%] left-[10%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.05) 0%, transparent 65%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-10 pb-28">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="relative mb-16 text-center">
          <div
            className="absolute inset-x-0 top-0 h-[400px] -z-10 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(168,85,247,0.10) 0%, rgba(34,211,238,0.04) 60%, transparent 80%)' }}
          />
          <HeroParticles />

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 relative overflow-hidden"
            style={{ background: 'rgba(168,85,247,0.10)', border: '1px solid rgba(168,85,247,0.28)' }}
          >
            {/* Shimmer shine */}
            <div
              className="absolute inset-0 -translate-x-full animate-[shimmer_3s_linear_infinite] pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.18), transparent)', width: '60%' }}
            />
            <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: '#a855f7', boxShadow: '0 0 10px rgba(168,85,247,0.7)' }} />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] relative z-10" style={{ color: '#c084fc' }}>
              ✨ {locale === 'en' ? 'Your Ultimate Teyvat Guide' : 'Cẩm Nang Teyvat Của Bạn'}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-6xl sm:text-7xl md:text-[90px] font-black uppercase tracking-tight leading-none mb-5 animate-name-reveal"
            style={{ fontFamily: 'var(--font-cinzel, Cinzel, serif)' }}
          >
            <span className="text-gradient-gold-animated">
              Genshin
            </span>
            <span className="text-white/90">Hub</span>
          </h1>

          {/* Decorative rule */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-24 sm:w-40" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.50))' }} />
            <svg className="w-3.5 h-3.5 shrink-0" style={{ color: '#a855f7' }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2 L12 8 L18 8 L13.5 11.5 L15.5 18 L10 14 L4.5 18 L6.5 11.5 L2 8 L8 8 Z" />
            </svg>
            <div className="h-px w-24 sm:w-40" style={{ background: 'linear-gradient(90deg, rgba(168,85,247,0.50), transparent)' }} />
          </div>

          {/* Tagline */}
          <p className="text-white/40 text-base sm:text-lg font-medium max-w-xl mx-auto mb-10 leading-relaxed">
            {locale === 'en'
              ? 'Characters, builds, weapons, artifacts, teams & more. Everything you need to conquer Teyvat.'
              : 'Nhân vật, build, vũ khí, thánh di vật, đội hình & nhiều hơn nữa. Tất cả những gì bạn cần để chinh phục Teyvat.'}
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <PremiumButton href="/characters" icon="⚔️">
              {locale === 'en' ? 'Browse Characters' : 'Xem Nhân Vật'}
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </PremiumButton>
            
            <PremiumButton href="/tierlist" variant="secondary" icon="🏆">
              {locale === 'en' ? 'Tier List' : 'Xếp Hạng'}
            </PremiumButton>
          </div>
        </section>

        {/* ══════════════════════════════════════
            STATS BAR
        ══════════════════════════════════════ */}
        <section className="mb-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, rgba(13,13,22,0.85), rgba(6,6,12,0.95))',
                  border: `1px solid ${s.color}20`,
                  boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 30% 50%, ${s.color}0d 0%, transparent 70%)` }}
                />
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${s.color}18`,
                    border: `1px solid ${s.color}35`,
                    boxShadow: `0 0 14px ${s.color}18`,
                  }}
                >
                  {s.icon}
                </div>
                <div>
                  <div
                    className="text-2xl font-black leading-none"
                    style={{ color: s.color, fontFamily: 'var(--font-mono, monospace)', textShadow: `0 0 20px ${s.color}40` }}
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
              <div className="w-[3px] h-6 rounded-full" style={{ background: 'linear-gradient(to bottom, #c084fc, #a855f7)' }} />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">
                {locale === 'en' ? 'Character Spotlight' : 'Nhân Vật Nổi Bật'}
              </span>
            </div>
            <Link
              href="/characters"
              className="text-xs font-bold uppercase tracking-wider hover:opacity-70 transition-opacity"
              style={{ color: '#a855f7' }}
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
            <div className="w-[3px] h-6 rounded-full" style={{ background: 'linear-gradient(to bottom, #22d3ee, #a855f7)' }} />
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
