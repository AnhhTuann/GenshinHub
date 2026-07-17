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

  useEffect(() => { setMobileOpen(false); }, [pathname]);

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
        className="sticky top-0 z-50 w-full"
        style={{
          background: scrolled ? 'rgba(3,3,8,0.97)' : 'rgba(3,3,8,0.75)',
          backdropFilter: `blur(${scrolled ? 32 : 16}px) saturate(170%)`,
          WebkitBackdropFilter: `blur(${scrolled ? 32 : 16}px) saturate(170%)`,
          borderBottom: scrolled
            ? '1px solid rgba(168,85,247,0.18)'
            : '1px solid rgba(255,255,255,0.04)',
          boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.6), 0 0 60px -20px rgba(168,85,247,0.12)' : 'none',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link
            className="flex items-center gap-3 shrink-0 group"
            href="/"
            onClick={handleLogoClick}
          >
            {/* Paimon Logo */}
            <div className="relative w-11 h-11 flex items-center justify-center rounded-xl overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:scale-105 transition-transform duration-300 border border-white/10 bg-black/50">
              <img src="/logo.webp" alt="GenshinHub Logo" className="w-full h-full object-cover scale-[1.1]" />
            </div>

            {/* Text */}
            <div className="hidden sm:flex items-baseline gap-0.5">
              <span
                className="text-lg font-black tracking-widest uppercase"
                style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  background: 'linear-gradient(135deg, #fff 0%, #c084fc 35%, #a855f7 60%, #22d3ee 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Genshin
              </span>
              <span className="text-lg font-black tracking-widest uppercase text-white/90" style={{ fontFamily: 'var(--font-cinzel, Cinzel, serif)' }}>
                Hub
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={link.href === '/' ? handleLogoClick : undefined}
                  className={`relative px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider whitespace-nowrap group transition-all duration-200 ${
                    active
                      ? 'text-[#c084fc] bg-[rgba(168,85,247,0.12)]'
                      : 'text-white/40 hover:text-[#c084fc] hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {/* Active dot */}
                  {active && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: '#a855f7', boxShadow: '0 0 6px rgba(168,85,247,0.7)' }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search Button (Triggers Cmd+K) */}
            <button 
              onClick={handleSearchClick}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 bg-white/5 hover:bg-[rgba(168,85,247,0.08)] border border-white/10 hover:border-[rgba(168,85,247,0.30)] text-white/60 hover:text-[#c084fc]"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Search
              <kbd className="ml-1 px-1.5 py-0.5 rounded bg-black/40 text-[9px] border border-white/10 font-mono">Ctrl+K</kbd>
            </button>
            <button 
              onClick={handleSearchClick}
              className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 bg-white/5 hover:bg-[rgba(168,85,247,0.08)] border border-white/10 hover:border-[rgba(168,85,247,0.30)] text-white/60 hover:text-[#c084fc]"
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
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-xl gap-1.5"
              style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}
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
            background: 'linear-gradient(90deg, transparent, #a855f7, #22d3ee)',
            opacity: scrolled ? 0.80 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      </nav>

      {/* ── Mobile Menu ── */}
      <MobileMenu navLinks={navLinks} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} isActive={isActive} handleLogoClick={handleLogoClick} />
    </>
  );
}
