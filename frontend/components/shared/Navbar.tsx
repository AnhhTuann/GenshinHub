"use client";
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import { MobileMenu } from './navbar/MobileMenu';
import { UserNav } from './navbar/UserNav';
import UISoundToggle from './UISoundToggle';
import LanguageDropdown from './navbar/LanguageDropdown';

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
      setScrolled(y > 30);
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
    { href: '/characters', label: t('characters'), icon: '⚔️' },
    { href: '/weapons',    label: t('weapons'),    icon: '🗡️' },
    { href: '/artifacts',  label: t('artifacts'),  icon: '💎' },
    { href: '/tierlist',   label: t('tierlist'),   icon: '🏆' },
    { href: '/teams',      label: 'Teams',          icon: '👥' },
    { href: '/banners',    label: t('banners'),    icon: '📜' },
    { href: '/showcase',   label: t('showcase'),   icon: '🔍' },
    { href: '/tcg',        label: t('tcg'),        icon: '🃏' },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <nav
        className="site-nav sticky top-0 z-50 w-full"
        style={{
          background: scrolled ? 'rgba(21,17,22,0.98)' : 'rgba(21,17,22,0.92)',
          backdropFilter: `blur(${scrolled ? 32 : 16}px) saturate(170%)`,
          WebkitBackdropFilter: `blur(${scrolled ? 32 : 16}px) saturate(170%)`,
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.09)'
            : '1px solid rgba(255,255,255,0.055)',
          boxShadow: scrolled ? '0 8px 28px rgba(0,0,0,0.2)' : 'none',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        <div className="site-nav-inner max-w-[1480px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-5">

          {/* ── Logo ── */}
          <Link
            className="flex items-center gap-3 shrink-0 group"
            href="/"
            onClick={handleLogoClick}
          >
            {/* Paimon Logo */}
            <div className="site-brand-mark relative w-11 h-11 flex items-center justify-center rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img src="/logo.webp" alt="GenshinHub Logo" className="w-full h-full object-cover scale-[1.1]" />
            </div>

            {/* Text */}
            <div className="hidden sm:flex flex-col leading-none">
              <span
                className="text-[15px] font-black tracking-[0.18em] uppercase"
                style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  backgroundImage: 'linear-gradient(120deg, #f3f5ff 0%, #aab2ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                GENSHINHUB
              </span>
              <span className="mt-1.5 text-[8px] font-semibold tracking-[0.24em] text-white/35 uppercase">Teyvat field guide</span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 4).map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={link.href === '/' ? handleLogoClick : undefined}
                  className={`site-nav-link relative px-3.5 py-2.5 rounded-full text-[11px] font-bold tracking-wide whitespace-nowrap group transition-all duration-200 ${
                    active
                      ? 'is-active text-[var(--accent-primary-light)] bg-[var(--accent-primary-dim)]'
                      : 'text-white/55 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="site-nav-more relative">
              <button
                type="button"
                className={`site-nav-link inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-[11px] font-bold tracking-wide transition-all ${moreOpen ? 'is-active text-[var(--accent-primary-light)] bg-[var(--accent-primary-dim)]' : 'text-white/55 hover:text-white hover:bg-white/5'}`}
                onClick={() => setMoreOpen(open => !open)}
                aria-expanded={moreOpen}
                aria-haspopup="true"
              >
                {locale === 'en' ? 'Explore' : 'Khám phá'}
                <svg className={`w-3 h-3 transition-transform ${moreOpen ? 'rotate-180' : ''}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="m3.5 6 4.5 4 4.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
                      <span className="site-nav-menu-icon" aria-hidden="true">{link.icon}</span>
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
              className="site-search-trigger hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 bg-white/[0.035] hover:bg-[var(--accent-primary-dim)] border border-white/10 hover:border-[var(--border-accent)] text-white/65 hover:text-[var(--accent-primary-light)]"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Search
              <kbd className="ml-1 px-1.5 py-0.5 rounded bg-black/40 text-[9px] border border-white/10 font-mono">Ctrl+K</kbd>
            </button>
            <button 
              onClick={handleSearchClick}
              className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 bg-white/[0.035] hover:bg-[var(--accent-primary-dim)] border border-white/10 hover:border-[var(--border-accent)] text-white/65 hover:text-[var(--accent-primary-light)]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>

            {/* Auth Component */}
            <UserNav />

            {/* UI Sound Toggle */}
            <UISoundToggle />

            {/* Language switch */}
            <LanguageDropdown />

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full gap-1.5"
              style={{ border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.035)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span
                className="block h-[1.5px] bg-white/70 rounded-full"
                style={{
                  width: '16px',
                  transform: mobileOpen ? 'rotate(45deg) translateY(5px)' : 'none',
                  transition: 'transform 0.3s ease',
                }}
              />
              <span
                className="block h-[1.5px] bg-white/70 rounded-full"
                style={{
                  width: mobileOpen ? '0px' : '16px',
                  opacity: mobileOpen ? 0 : 1,
                  transition: 'width 0.3s ease, opacity 0.3s ease',
                }}
              />
              <span
                className="block h-[1.5px] bg-white/70 rounded-full"
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
          className="absolute bottom-0 left-0 h-[2px]"
          style={{
            width: `${scrollPct}%`,
            background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-second))',
            opacity: scrollPct > 0 ? 1 : 0,
          }}
        />
      </nav>

      {/* ── Mobile Menu ── */}
      <MobileMenu navLinks={navLinks} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} isActive={isActive} handleLogoClick={handleLogoClick} />
    </>
  );
}
