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
import OpenSearchButton from '@/components/home/OpenSearchButton';
import HeroParticles from '@/components/home/HeroParticles';
import HeroVisualCard from '@/components/home/HeroVisualCard';
import AnimatedStats from '@/components/home/AnimatedStats';
import ScrollEntrance from '@/components/ScrollEntrance';
import PremiumButton from '@/components/ui/PremiumButton';
import { ArrowUpRight, Compass, Flower2, Sparkles } from 'lucide-react';

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
  { href: '/characters', label: t('characters'), desc: locale === 'en' ? 'Builds, teams & stats'      : 'Build, đội hình & chỉ số',        color: '#7C5AE0', bg: 'rgba(124,90,224,0.08)', icon: 'characters' },
  { href: '/weapons',    label: t('weapons'),    desc: locale === 'en' ? 'Find the perfect weapon'    : 'Tìm vũ khí tốt nhất',             color: '#55b5c2', bg: 'rgba(85,181,194,0.08)', icon: 'weapons' },
  { href: '/artifacts',  label: t('artifacts'),  desc: locale === 'en' ? 'Best artifact sets'         : 'Bộ thánh di vật tốt nhất',        color: '#7669d8', bg: 'rgba(118,105,216,0.08)', icon: 'artifacts' },
  { href: '/tierlist',   label: t('tierlist'),   desc: locale === 'en' ? 'Current meta rankings'      : 'Xếp hạng meta hiện tại',          color: '#a8731c', bg: 'rgba(217,157,47,0.08)', icon: 'tierlist' },
  { href: '/teams',      label: 'Teams',          desc: locale === 'en' ? 'Best team compositions'     : 'Đội hình meta tốt nhất',          color: '#4d86c7', bg: 'rgba(77,134,199,0.08)', icon: 'teams' },
  { href: '/banners',    label: t('banners'),    desc: locale === 'en' ? 'Current & upcoming banners' : 'Banner hiện tại & sắp tới',       color: '#d97560', bg: 'rgba(217,117,96,0.08)', icon: 'banners' },
  { href: '/materials',  label: 'Materials',      desc: locale === 'en' ? 'Ascension & talent mats'   : 'Nguyên liệu thăng cấp',           color: '#649d64', bg: 'rgba(100,157,100,0.08)', icon: 'materials' },
  { href: '/showcase',   label: t('showcase'),   desc: locale === 'en' ? 'View your builds'           : 'Xem build của bạn',               color: '#287d89', bg: 'rgba(40,125,137,0.08)', icon: 'showcase' },
  { href: '/tcg',        label: t('tcg'),        desc: locale === 'en' ? 'Card game decks'            : 'Bộ bài TCG',                      color: '#7b72b5', bg: 'rgba(123,114,181,0.08)', icon: 'tcg' },
];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Common' });
  const data = await fetchGraphQL(GET_CHARACTERS);
  const characters: CharacterData[] = data.characters || [];

  const total5Star = characters.filter(c => c.rarity === 5).length;
  const features   = FEATURES(t, locale);
  const spotlight  = [...characters].sort((a, b) => b.rarity - a.rarity).slice(0, 32);

  return (
    <main className="site-home">
      <div className="home-atmosphere" aria-hidden="true">
        <span className="home-atmosphere-orb home-atmosphere-orb--one" />
        <span className="home-atmosphere-orb home-atmosphere-orb--two" />
        <span className="home-atmosphere-grain" />
        <HeroParticles />
      </div>

      <div className="home-container">
        <section className="home-hero">
          <div className="home-hero-copy">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-[#7C5AE0] text-xs font-bold tracking-wide backdrop-blur-md shadow-xs mb-3">
              <Sparkles size={14} className="text-[#E8B84C] animate-pulse" aria-hidden="true" />
              <span>{locale === 'en' ? 'Your journey through Teyvat' : 'Cẩm nang đồng hành tại Teyvat'}</span>
            </div>

            <h1 className="home-title">
              {locale === 'en' ? (
                <>
                  Explore Teyvat,<br />
                  <span className="bg-gradient-to-r from-[#7C5AE0] via-[#9B7AFF] to-[#E8B84C] bg-clip-text text-transparent">
                    your way.
                  </span>
                </>
              ) : (
                <>
                  Chạm ngõ Teyvat,<br />
                  <span className="bg-gradient-to-r from-[#7C5AE0] via-[#9B7AFF] to-[#E8B84C] bg-clip-text text-transparent">
                    viết hành trình riêng.
                  </span>
                </>
              )}
            </h1>
            <p className="home-description">
              {locale === 'en'
                ? 'A thoughtful companion for every build, every team, and every adventure.'
                : 'Người bạn đồng hành cho từng đội hình, từng bản build và mọi chuyến phiêu lưu.'}
            </p>

            <div className="home-actions">
              <PremiumButton href="/characters" icon={<Compass size={17} strokeWidth={1.8} aria-hidden="true" />}>
                {locale === 'en' ? 'Discover characters' : 'Khám phá nhân vật'}
              </PremiumButton>
              <OpenSearchButton label={locale === 'en' ? 'Search the archive' : 'Tìm trong thư viện'} />
            </div>

            <div className="home-trust-line">
              <span className="home-status-dot" />
              {locale === 'en' ? 'Your Teyvat archive, all in one place' : 'Toàn bộ dữ liệu Teyvat trong một nơi'}
            </div>
          </div>

          <HeroVisualCard locale={locale} />
        </section>

        <ScrollEntrance delay={0.05}>
          <div className="mt-8 md:mt-12">
            <AnimatedStats
              charactersCount={characters.length}
              fiveStarCount={total5Star}
              collectionsCount={features.length}
              locale={locale}
            />
          </div>
        </ScrollEntrance>

        <ScrollEntrance delay={0.08}>
          <section className="home-section">
            <div className="home-section-heading">
              <div>
                <span className="home-section-kicker">{locale === 'en' ? 'Meet Teyvat' : 'Gặp gỡ Teyvat'}</span>
                <h2>{locale === 'en' ? 'Characters to know' : 'Những nhân vật nổi bật'}</h2>
              </div>
              <Link href="/characters" className="home-text-link">
                {locale === 'en' ? 'All characters' : 'Tất cả nhân vật'} <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            {spotlight.length > 0 ? (
              <CharacterSpotlight characters={spotlight} />
            ) : (
              <div className="home-empty-state">
                <span className="home-empty-symbol" aria-hidden="true"><Sparkles size={20} /></span>
                <div>
                  <strong>{locale === 'en' ? 'The archive is ready to explore' : 'Thư viện đang chờ bạn khám phá'}</strong>
                  <p>{locale === 'en' ? 'Character guides will appear here as the collection is connected.' : 'Hướng dẫn nhân vật sẽ xuất hiện tại đây khi dữ liệu được kết nối.'}</p>
                </div>
                <Link href="/characters" className="home-text-link">
                  {locale === 'en' ? 'Open archive' : 'Mở thư viện'} <span aria-hidden="true">↗</span>
                </Link>
              </div>
            )}
          </section>
        </ScrollEntrance>

        <ScrollEntrance delay={0.1}>
          <section className="home-section">
            <div className="home-section-heading">
              <div>
                <span className="home-section-kicker">{locale === 'en' ? 'Your field guide' : 'Cẩm nang phiêu lưu'}</span>
                <h2>{locale === 'en' ? 'Everything you need' : 'Mọi điều bạn cần'}</h2>
              </div>
              <p>{locale === 'en' ? 'Tools and knowledge for the next adventure.' : 'Công cụ và kiến thức cho chuyến đi tiếp theo.'}</p>
            </div>
            <FeatureGrid features={features} locale={locale} />
          </section>
        </ScrollEntrance>

        <ScrollEntrance delay={0.1}>
          <section className="home-section home-section--utilities">
            <div className="home-section-heading">
              <div>
                <span className="home-section-kicker">{locale === 'en' ? 'Daily guide' : 'Cẩm nang mỗi ngày'}</span>
                <h2>{locale === 'en' ? 'Plan your day' : 'Lên kế hoạch hôm nay'}</h2>
              </div>
            </div>
            <div className="home-utility-grid">
              <ServerReset locale={locale} />
              {characters.length > 0 ? (
                <UpcomingBirthdays characters={characters} locale={locale} />
              ) : (
                <div className="home-utility-note">
                  <Flower2 className="home-utility-note-icon" size={20} aria-hidden="true" />
                  <span className="home-section-kicker">{locale === 'en' ? 'A note for your journey' : 'Lời nhắn cho hành trình'}</span>
                  <strong>{locale === 'en' ? 'Make every resin count.' : 'Đừng để nhựa nguyên chất đầy.'}</strong>
                  <p>{locale === 'en' ? 'Check the daily domains and plan your next character build.' : 'Xem bí cảnh hôm nay và chuẩn bị cho bản build tiếp theo.'}</p>
                  <Link href="/materials" className="home-text-link">
                    {locale === 'en' ? 'View daily materials' : 'Xem nguyên liệu hôm nay'} <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              )}
            </div>
          </section>
        </ScrollEntrance>

        <ScrollEntrance delay={0.1}>
          <section className="home-section home-section--daily">
            <div className="home-tool-panel">
              <DailyFarming locale={locale} />
            </div>
          </section>
        </ScrollEntrance>
      </div>
    </main>
  );
}
