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
  { href: '/characters', label: t('characters'), desc: locale === 'en' ? 'Builds, teams & stats'      : 'Build, đội hình & chỉ số',        color: '#ff5a45', bg: 'rgba(255,90,69,0.07)',   icon: '⚔️' },
  { href: '/weapons',    label: t('weapons'),    desc: locale === 'en' ? 'Find the perfect weapon'    : 'Tìm vũ khí tốt nhất',             color: '#ffd34d', bg: 'rgba(255,211,77,0.07)',   icon: '🗡️' },
  { href: '/artifacts',  label: t('artifacts'),  desc: locale === 'en' ? 'Best artifact sets'         : 'Bộ thánh di vật tốt nhất',        color: '#cf8fff', bg: 'rgba(207,143,255,0.07)', icon: '💎' },
  { href: '/tierlist',   label: t('tierlist'),   desc: locale === 'en' ? 'Current meta rankings'      : 'Xếp hạng meta hiện tại',          color: '#e8b64c', bg: 'rgba(232,182,76,0.07)',   icon: '🏆' },
  { href: '/teams',      label: 'Teams',          desc: locale === 'en' ? 'Best team compositions'     : 'Đội hình meta tốt nhất',          color: '#3aa8ff', bg: 'rgba(58,168,255,0.07)',   icon: '👥' },
  { href: '/banners',    label: t('banners'),    desc: locale === 'en' ? 'Current & upcoming banners' : 'Banner hiện tại & sắp tới',       color: '#b678ff', bg: 'rgba(236,72,153,0.07)',   icon: '📜' },
  { href: '/materials',  label: 'Materials',      desc: locale === 'en' ? 'Ascension & talent mats'   : 'Nguyên liệu thăng cấp',           color: '#9ede5f', bg: 'rgba(158,222,95,0.07)', icon: '📦' },
  { href: '/showcase',   label: t('showcase'),   desc: locale === 'en' ? 'View your builds'           : 'Xem build của bạn',               color: '#3aa8ff', bg: 'rgba(58,168,255,0.07)',   icon: '🔍' },
  { href: '/tcg',        label: t('tcg'),        desc: locale === 'en' ? 'Card game decks'            : 'Bộ bài TCG',                      color: '#35d6c5', bg: 'rgba(53,214,197,0.07)',   icon: '🃏' },
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

  return (
    <main className="site-home">
      <div className="home-atmosphere" aria-hidden="true">
        <span className="home-atmosphere-orb home-atmosphere-orb--one" />
        <span className="home-atmosphere-orb home-atmosphere-orb--two" />
        <span className="home-atmosphere-grain" />
      </div>

      <div className="home-container">
        <section className="home-hero">
          <div className="home-hero-copy">
            <div className="home-eyebrow">
              <span className="home-eyebrow-mark">✦</span>
              <span>{locale === 'en' ? 'Your journey through Teyvat' : 'Cẩm nang đồng hành tại Teyvat'}</span>
            </div>

            <h1 className="home-title">
              {locale === 'en' ? <>Explore Teyvat,<br /><span>your way.</span></> : <>Chạm ngõ Teyvat,<br /><span>viết hành trình riêng.</span></>}
            </h1>
            <p className="home-description">
              {locale === 'en'
                ? 'A thoughtful companion for every build, every team, and every adventure.'
                : 'Người bạn đồng hành cho từng đội hình, từng bản build và mọi chuyến phiêu lưu.'}
            </p>

            <div className="home-actions">
              <PremiumButton href="/characters" icon="✧">
                {locale === 'en' ? 'Discover characters' : 'Khám phá nhân vật'}
              </PremiumButton>
              <OpenSearchButton label={locale === 'en' ? 'Search the archive' : 'Tìm trong thư viện'} />
            </div>

            <div className="home-trust-line">
              <span className="home-status-dot" />
              {locale === 'en' ? 'Your Teyvat archive, all in one place' : 'Toàn bộ dữ liệu Teyvat trong một nơi'}
            </div>
          </div>

          <div className="home-visual" aria-label="GenshinHub Teyvat guide artwork">
            <div className="home-visual-grid" />
            <span className="home-visual-index">GH&nbsp; / &nbsp;07</span>
            <span className="home-visual-caption">{locale === 'en' ? 'A GUIDE TO' : 'HÀNH TRÌNH TẠI'}</span>
            <span className="home-visual-stamp" aria-hidden="true">✿</span>
            <div className="home-visual-mascot">
              <img src="/logo.webp" alt="" />
            </div>
            <div className="home-element-chip home-element-chip--pyro">Pyro</div>
            <div className="home-element-chip home-element-chip--hydro">Hydro</div>
            <div className="home-element-chip home-element-chip--anemo">Anemo</div>
            <div className="home-visual-title">TEYVAT</div>
            <div className="home-visual-foot">
              <span>{locale === 'en' ? 'Build · Discover · Explore' : 'Xây dựng · Khám phá · Phiêu lưu'}</span>
              <span aria-hidden="true">↗</span>
            </div>
          </div>
        </section>

        <section className="home-stats" aria-label={locale === 'en' ? 'GenshinHub statistics' : 'Thống kê GenshinHub'}>
          {[
            { value: characters.length, label: locale === 'en' ? 'Characters' : 'Nhân vật', detail: locale === 'en' ? 'in the archive' : 'trong thư viện' },
            { value: total5Star, label: locale === 'en' ? 'Five-star' : 'Truyền kỳ', detail: locale === 'en' ? 'to discover' : 'đang chờ khám phá' },
            { value: '09', label: locale === 'en' ? 'Collections' : 'Danh mục', detail: locale === 'en' ? 'for your journey' : 'cho hành trình của bạn' },
          ].map((stat, index) => (
            <div className="home-stat" key={stat.label} style={{ animationDelay: `${index * 100}ms` }}>
              <span className="home-stat-number">{String(stat.value).padStart(2, '0')}</span>
              <span className="home-stat-copy">
                <strong>{stat.label}</strong>
                <small>{stat.detail}</small>
              </span>
            </div>
          ))}
          <div className="home-stats-note">
            <span>01</span>
            <span>{locale === 'en' ? 'A living guide to Teyvat' : 'Cẩm nang luôn đồng hành'}</span>
          </div>
        </section>

        <section className="home-section">
          <div className="home-section-heading">
            <div>
              <span className="home-section-kicker">01&nbsp; / &nbsp;{locale === 'en' ? 'Meet Teyvat' : 'Gặp gỡ Teyvat'}</span>
              <h2>{locale === 'en' ? 'Characters to know' : 'Những nhân vật nổi bật'}</h2>
            </div>
            <Link href="/characters" className="home-text-link">
              {locale === 'en' ? 'All characters' : 'Tất cả nhân vật'} <span aria-hidden="true">↗</span>
            </Link>
          </div>
          {spotlight.length > 0 ? (
            <CharacterSpotlight characters={spotlight} />
          ) : (
            <div className="home-empty-state">
              <span className="home-empty-symbol" aria-hidden="true">✧</span>
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

        <section className="home-section">
          <div className="home-section-heading">
            <div>
              <span className="home-section-kicker">02&nbsp; / &nbsp;{locale === 'en' ? 'Your field guide' : 'Cẩm nang phiêu lưu'}</span>
              <h2>{locale === 'en' ? 'Everything you need' : 'Mọi điều bạn cần'}</h2>
            </div>
            <p>{locale === 'en' ? 'Tools and knowledge for the next adventure.' : 'Công cụ và kiến thức cho chuyến đi tiếp theo.'}</p>
          </div>
          <FeatureGrid features={features} />
        </section>

        <section className="home-section home-section--utilities">
          <div className="home-section-heading">
            <div>
              <span className="home-section-kicker">03&nbsp; / &nbsp;{locale === 'en' ? 'Daily rituals' : 'Nhịp sống Teyvat'}</span>
              <h2>{locale === 'en' ? 'Plan your day' : 'Lên kế hoạch hôm nay'}</h2>
            </div>
          </div>
          <div className="home-utility-grid">
            <ServerReset />
            {characters.length > 0 ? (
              <UpcomingBirthdays characters={characters} locale={locale} />
            ) : (
              <div className="home-utility-note">
                <span className="home-utility-note-icon">✿</span>
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

        <section className="home-section home-section--daily">
          <div className="home-tool-panel">
            <DailyFarming locale={locale} />
          </div>
        </section>
      </div>
    </main>
  );
}
