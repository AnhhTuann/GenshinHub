"use client";
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import { MobileMenu } from './navbar/MobileMenu';
import { UserNav } from './navbar/UserNav';
import UISoundToggle from './UISoundToggle';
import LanguageDropdown from './navbar/LanguageDropdown';
import { Sword, Swords, Gem, Trophy, Users, ScrollText, Search, Layers, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const pathname   = usePathname();
  const locale     = useLocale();
  const router     = useRouter();
  const t          = useTranslations('Common');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [scrollPct,  setScrollPct]  = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(maxScroll > 0 ? Math.min(100, (y / maxScroll) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  const handleLogoClick = () => {
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('reset-search'));
  };

  const handleSearchClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-command-palette'));
    }
  };

  const navLinks = [
    { href: '/characters', label: t('characters'), icon: Sword },
    { href: '/weapons',    label: t('weapons'),    icon: Swords },
    { href: '/artifacts',  label: t('artifacts'),  icon: Gem },
    { href: '/tierlist',   label: t('tierlist'),   icon: Trophy },
    { href: '/teams',      label: 'Teams',          icon: Users },
    { href: '/banners',    label: t('banners'),    icon: ScrollText },
    { href: '/showcase',   label: t('showcase'),   icon: Search },
    { href: '/tcg',        label: t('tcg'),        icon: Layers },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <nav
        className={`site-nav sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? ' is-scrolled' : ''}`}
      >
        <div className="site-nav-inner max-w-[1480px] mx-auto px-4 sm:px-6 h-[68px] sm:h-[72px] flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link
            className="flex items-center gap-3 shrink-0 group select-none"
            href="/"
            onClick={handleLogoClick}
          >
            {/* Paimon Logo Mark */}
            <div className="site-brand-mark relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-2xl overflow-hidden group-hover:scale-105 transition-all duration-300">
              <img src="/logo.webp" alt="GenshinHub Logo" className="w-full h-full object-cover scale-[1.08] transition-transform duration-300 group-hover:scale-115" />
            </div>

            {/* Text Brand */}
            <div className="hidden sm:flex flex-col leading-none">
              <span className="site-brand-name text-[15px] sm:text-[16px] font-black tracking-[0.14em] uppercase">
                GENSHINHUB
              </span>
              <span className="mt-1 text-[11px] font-bold tracking-[0.16em] text-[var(--accent-primary-light)] uppercase">
                Teyvat field guide
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center site-nav-links">
            {navLinks.slice(0, 4).map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={link.href === '/' ? handleLogoClick : undefined}
                  className={`site-nav-link relative whitespace-nowrap ${active ? 'is-active' : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="site-nav-more relative">
              <button
                type="button"
                className={`site-nav-link site-nav-explore inline-flex items-center gap-1.5 ${moreOpen ? 'is-active' : ''}`}
                onClick={() => setMoreOpen(open => !open)}
                aria-expanded={moreOpen}
                aria-haspopup="true"
              >
                <span>{locale === 'en' ? 'Explore' : 'Khám phá'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} />
              </button>
              {moreOpen && (
                <div className="site-nav-menu absolute right-0 top-full mt-3 w-64 p-2 rounded-2xl">
                  {navLinks.slice(4).map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`site-nav-menu-link ${isActive(link.href) ? 'is-active' : ''}`}
                      onClick={() => setMoreOpen(false)}
                    >
                      <span className="site-nav-menu-icon" aria-hidden="true"><link.icon className="w-3.5 h-3.5" /></span>
                      <span>{link.label}</span>
                      <span className="site-nav-menu-arrow" aria-hidden="true">↗</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search Button (Triggers Cmd+K) */}
            <button 
              onClick={handleSearchClick}
              className="site-search-trigger site-search-desktop inline-flex items-center gap-2 cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-current" aria-hidden="true" />
              <span>{locale === 'en' ? 'Search' : 'Tìm kiếm'}</span>
              <kbd className="ml-1 hidden xl:inline px-1.5 py-0.5 rounded text-xs font-mono font-bold">Ctrl+K</kbd>
            </button>
            <button 
              onClick={handleSearchClick}
              className="site-search-mobile site-search-trigger site-search-icon-btn"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px] text-current" aria-hidden="true" />
            </button>

            {/* Auth Component */}
            <UserNav />

            {/* UI Sound Toggle */}
            <UISoundToggle />

            {/* Language switch */}
            <LanguageDropdown />

            {/* Hamburger */}
            <button
              className="site-nav-hamburger site-nav-control flex-col gap-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-site-menu"
            >
              <span
                className="block h-[1.8px] bg-current rounded-full"
                style={{
                  width: '16px',
                  transform: mobileOpen ? 'rotate(45deg) translateY(5px)' : 'none',
                  transition: 'transform 0.3s ease',
                }}
              />
              <span
                className="block h-[1.8px] bg-current rounded-full"
                style={{
                  width: mobileOpen ? '0px' : '16px',
                  opacity: mobileOpen ? 0 : 1,
                  transition: 'width 0.3s ease, opacity 0.3s ease',
                }}
              />
              <span
                className="block h-[1.8px] bg-current rounded-full"
                style={{
                  width: '16px',
                  transform: mobileOpen ? 'rotate(-45deg) translateY(-5px)' : 'none',
                  transition: 'transform 0.3s ease',
                }}
              />
            </button>
          </div>
        </div>

        {/* ── Scroll Progress Bar ── */}
        <div
          className="absolute bottom-0 left-0 h-[2.5px] transition-all duration-150"
          style={{
            width: `${scrollPct}%`,
            background: 'linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-vivid) 40%, var(--fantasy-gold) 100%)',
            opacity: scrollPct > 0 ? 1 : 0,
            boxShadow: '0 0 8px -2px var(--accent-primary-glow)',
          }}
        />
      </nav>

      {/* ── Mobile Menu ── */}
      <MobileMenu navLinks={navLinks} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} isActive={isActive} handleLogoClick={handleLogoClick} />
    </>
  );
}
