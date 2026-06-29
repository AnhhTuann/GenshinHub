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
};

export const revalidate = 300;

const FEATURES = (t: any, locale: string) => [
  { href: '/characters', label: t('characters'), desc: locale === 'en' ? 'Builds, teams & stats' : 'Build, đội hình & chỉ số', color: '#ff6b4a', bg: 'rgba(255,107,74,0.08)', icon: '⚔️' },
  { href: '/weapons',    label: t('weapons'),    desc: locale === 'en' ? 'Find the perfect weapon' : 'Tìm vũ khí tốt nhất',    color: '#ffd54f', bg: 'rgba(255,213,79,0.08)', icon: '🗡️' },
  { href: '/artifacts',  label: t('artifacts'),  desc: locale === 'en' ? 'Best artifact sets' : 'Bộ thánh di vật tốt nhất',   color: '#ce93d8', bg: 'rgba(206,147,216,0.08)', icon: '💎' },
  { href: '/tierlist',   label: t('tierlist'),   desc: locale === 'en' ? 'Current meta rankings' : 'Xếp hạng meta hiện tại',   color: '#ffd54f', bg: 'rgba(255,213,79,0.08)', icon: '🏆' },
  { href: '/teams',      label: 'Teams',          desc: locale === 'en' ? 'Best team comps' : 'Đội hình meta tốt nhất',        color: '#4fc3f7', bg: 'rgba(79,195,247,0.08)', icon: '👥' },
  { href: '/banners',    label: t('banners'),    desc: locale === 'en' ? 'Current & upcoming' : 'Banner hiện tại & sắp tới',   color: '#ec4899', bg: 'rgba(236,72,153,0.08)', icon: '📜' },
  { href: '/materials',  label: 'Materials',      desc: locale === 'en' ? 'Ascension & talent mats' : 'Nguyên liệu thăng cấp', color: '#aed581', bg: 'rgba(174,213,129,0.08)', icon: '📦' },
  { href: '/showcase',   label: t('showcase'),   desc: locale === 'en' ? 'View your builds' : 'Xem build của bạn',             color: '#4fc3f7', bg: 'rgba(79,195,247,0.08)', icon: '🔍' },
  { href: '/tcg',        label: t('tcg'),        desc: locale === 'en' ? 'Card game decks' : 'Bộ bài TCG',                     color: '#4db6ac', bg: 'rgba(77,182,172,0.08)', icon: '🃏' },
];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Common' });
  const data = await fetchGraphQL(GET_CHARACTERS);
  const characters: CharacterData[] = data.characters || [];

  const total5Star = characters.filter(c => c.rarity === 5).length;
  const features   = FEATURES(t, locale);

  // Pick 6 spotlight chars — prefer 5★
  const spotlight = [...characters]
    .sort((a, b) => b.rarity - a.rarity)
    .slice(0, 8);

  return (
    <main className="relative min-h-screen text-white overflow-x-hidden" style={{ background: 'var(--bg-void, #04040a)' }}>

      {/* ── Aurora ambient glows ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-15%] left-[-8%] w-[900px] h-[700px] rounded-full blur-[180px]"
          style={{ background: 'radial-gradient(ellipse, rgba(200,168,75,0.06) 0%, transparent 70%)' }} />
        <div className="absolute top-[25%] right-[-12%] w-[700px] h-[600px] rounded-full blur-[160px]"
          style={{ background: 'radial-gradient(ellipse, rgba(127,90,240,0.05) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[10%] left-[20%] w-[600px] h-[500px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(ellipse, rgba(79,195,247,0.04) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-12 pb-28">

        {/* ══════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════ */}
        <section className="relative mb-16 text-center pt-4">
          {/* Big radial behind title */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
            <div className="w-[700px] h-[400px] rounded-full blur-[100px]"
              style={{ background: 'radial-gradient(ellipse, rgba(200,168,75,0.07) 0%, transparent 65%)' }} />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
            style={{ background: 'rgba(200,168,75,0.10)', border: '1px solid rgba(200,168,75,0.22)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#c8a84b' }} />
            <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: '#c8a84b' }}>
              {locale === 'en' ? 'Your Ultimate Teyvat Guide' : 'Cẩm Nang Teyvat Của Bạn'}
            </span>
          </div>

          {/* Main title */}
          <h1 className="text-6xl sm:text-7xl md:text-[90px] font-black uppercase tracking-tight leading-none mb-5 animate-hero-reveal">
            <span className="text-gradient-gold-animated" style={{ fontFamily: 'var(--font-cinzel, Cinzel, serif)' }}>
              Genshin
            </span>
            <span className="text-white/90" style={{ fontFamily: 'var(--font-cinzel, Cinzel, serif)' }}>
              Hub
            </span>
          </h1>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-24 sm:w-40" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,168,75,0.4))' }} />
            <svg className="w-4 h-4" style={{ color: '#c8a84b' }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2 L12 8 L18 8 L13.5 11.5 L15.5 18 L10 14 L4.5 18 L6.5 11.5 L2 8 L8 8 Z" />
            </svg>
            <div className="h-px w-24 sm:w-40" style={{ background: 'linear-gradient(90deg, rgba(200,168,75,0.4), transparent)' }} />
          </div>

          {/* Tagline */}
          <p className="text-white/40 text-base sm:text-lg font-medium max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in-up stagger-2">
            {locale === 'en'
              ? 'Characters, builds, weapons, artifacts, teams & more. Everything you need to conquer Teyvat.'
              : 'Nhân vật, build, vũ khí, thánh di vật, đội hình & nhiều hơn nữa. Tất cả những gì bạn cần để chinh phục Teyvat.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-3 flex-wrap animate-fade-in-up stagger-3">
            <Link
              href="/characters"
              className="group inline-flex items-center gap-2.5 text-black font-black text-sm px-8 py-3.5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl uppercase tracking-wider"
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
              className="inline-flex items-center gap-2.5 font-bold text-sm px-8 py-3.5 rounded-2xl transition-all duration-300 hover:scale-105 uppercase tracking-wider"
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
            {[
              { value: characters.length, label: locale === 'en' ? 'Total Characters' : 'Tổng Nhân Vật', icon: '⚔️', color: '#c8a84b' },
              { value: total5Star,         label: locale === 'en' ? '5★ Legends' : 'Nhân Vật 5★',        icon: '⭐', color: '#ffd54f' },
              { value: 9,                  label: locale === 'en' ? 'Sections' : 'Mục',                   icon: '📚', color: '#ce93d8' },
              { value: 2,                  label: locale === 'en' ? 'Languages' : 'Ngôn Ngữ',             icon: '🌐', color: '#4fc3f7' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1"
                style={{ '--hover-color': stat.color } as any}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: `${stat.color}18`, border: `1px solid ${stat.color}30` }}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-black leading-none" style={{ color: stat.color, fontFamily: 'var(--font-mono, monospace)' }}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-bold text-white/35 uppercase tracking-wider mt-0.5">
                    {stat.label}
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
            <Link href="/characters" className="text-xs font-bold uppercase tracking-wider transition-colors hover:opacity-80" style={{ color: '#c8a84b' }}>
              {locale === 'en' ? 'View All →' : 'Xem Tất Cả →'}
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {spotlight.map((char) => {
              const name = locale === 'en' ? char.nameEn : (char.nameVi || char.nameEn);
              const ELEM_COLOR: Record<string, string> = {
                Pyro: '#ff6b4a', Hydro: '#4fc3f7', Cryo: '#80deea',
                Electro: '#ce93d8', Anemo: '#4db6ac', Geo: '#ffd54f', Dendro: '#aed581'
              };
              const ec = ELEM_COLOR[char.element] ?? '#ffffff';
              return (
                <Link
                  key={char.id}
                  href={`/characters/${char.id}`}
                  className="group relative shrink-0 w-28 sm:w-32 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  style={{
                    height: '140px',
                    border: `1px solid ${ec}30`,
                    background: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(8,8,16,0.6))`,
                  }}
                >
                  <Image src={char.avatarUrl || '/images/avatars/UI_AvatarIcon_PlayerGirl.png'} alt={name} fill
                    sizes="130px" className="object-cover object-top group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 to-transparent" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${ec}20, transparent 60%)` }} />
                  <div className="absolute bottom-2 left-0 right-0 text-center">
                    <div className="text-[10px] font-extrabold truncate px-1.5" style={{ color: ec }}>
                      {name}
                    </div>
                  </div>
                  <div className="absolute top-1.5 left-1.5 p-0.5 rounded-md" style={{ background: `${ec}25`, border: `1px solid ${ec}40` }}>
                    <Image src={`/elements/${char.element.toLowerCase()}.png`} alt={char.element} width={16} height={16} className="w-4 h-4 object-contain" />
                  </div>
                  {/* Hover glow overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{ boxShadow: `inset 0 0 30px ${ec}25` }} />
                </Link>
              );
            })}
          </div>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {features.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group relative rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{
                  background: card.bg,
                  border: `1px solid ${card.color}20`,
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${card.color}18 0%, transparent 70%)` }} />
                {/* Hover border */}
                <div className="absolute inset-0 rounded-2xl transition-all duration-300"
                  style={{ boxShadow: `inset 0 0 0 1px ${card.color}00` }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.boxShadow = `inset 0 0 0 1px ${card.color}40`)}
                  onMouseLeave={e => ((e.target as HTMLElement).style.boxShadow = `inset 0 0 0 1px ${card.color}00`)}
                />
                <div className="text-3xl leading-none">{card.icon}</div>
                <div className="relative">
                  <div className="font-black text-sm text-white/90 uppercase tracking-wide group-hover:text-white transition-colors">
                    {card.label}
                  </div>
                  <div className="text-[10px] text-white/35 font-medium mt-0.5 leading-snug group-hover:text-white/55 transition-colors">
                    {card.desc}
                  </div>
                </div>
                <svg
                  className="absolute bottom-3.5 right-3.5 w-3.5 h-3.5 opacity-25 group-hover:opacity-70 group-hover:translate-x-0.5 transition-all duration-200"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  style={{ color: card.color }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            ))}
          </div>
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
          <div className="glass-card rounded-2xl p-5 sm:p-6">
            <DailyFarming locale={locale} />
          </div>
        </section>

      </div>
    </main>
  );
}
