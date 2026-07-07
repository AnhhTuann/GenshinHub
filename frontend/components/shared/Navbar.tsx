"use client";
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import { MobileMenu } from './navbar/MobileMenu';
import { UserNav } from './navbar/UserNav';
import UISoundToggle from './UISoundToggle';

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
          background: scrolled ? 'rgba(4,4,10,0.95)' : 'rgba(4,4,10,0.70)',
          backdropFilter: `blur(${scrolled ? 28 : 14}px) saturate(160%)`,
          WebkitBackdropFilter: `blur(${scrolled ? 28 : 14}px) saturate(160%)`,
          borderBottom: scrolled
            ? '1px solid rgba(200,168,75,0.12)'
            : '1px solid rgba(255,255,255,0.04)',
          boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.5)' : 'none',
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
            <div className="hidden sm:flex flex-col leading-none gap-[2px]">
              <span
                className="text-[15px] font-black tracking-[0.14em] uppercase leading-none"
                style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  background: 'linear-gradient(135deg, #fff8e1 0%, #f0c84b 40%, #c8a84b 70%, #f0d080 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: 'none',
                }}
              >
                Genshin
              </span>
              <div className="flex items-center gap-1.5">
                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(200,168,75,0.6), transparent)' }} />
                <span
                  className="text-[8px] font-bold tracking-[0.35em] uppercase"
                  style={{ color: 'rgba(200,168,75,0.55)' }}
                >
                  Hub
                </span>
                <div className="w-0.5 h-0.5 rounded-full" style={{ background: 'rgba(200,168,75,0.4)' }} />
                <span
                  className="text-[8px] font-bold tracking-[0.35em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.22)' }}
                >
                  Wiki
                </span>
                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,168,75,0.2))' }} />
              </div>
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
                      ? 'text-[#f0d080] bg-[#c8a84b]/10'
                      : 'text-white/40 hover:text-[#f0d080] hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {/* Active gold dot */}
                  {active && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: '#c8a84b', boxShadow: '0 0 4px rgba(200,168,75,0.8)' }}
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
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-[#f0d080]"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Search
              <kbd className="ml-1 px-1.5 py-0.5 rounded bg-black/40 text-[9px] border border-white/10 font-mono">Ctrl+K</kbd>
            </button>
            <button 
              onClick={handleSearchClick}
              className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-[#f0d080]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>

            {/* Auth Component */}
            <UserNav />

            {/* UI Sound Toggle */}
            <UISoundToggle />

            {/* Language switch */}
            <div
              className="flex items-center rounded-xl overflow-hidden"
              style={{
                background: 'rgba(13,13,20,0.6)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {(['vi', 'en'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => router.replace(pathname, { locale: l })}
                  className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${
                    locale === l
                      ? 'text-[#f0d080] bg-[#c8a84b]/15'
                      : 'text-white/30 hover:text-[#f0d080] hover:bg-white/5'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

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
            background: 'linear-gradient(90deg, #8a6820, #c8a84b, #f0d080)',
            opacity: scrolled ? 0.75 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      </nav>

      {/* ── Mobile Menu ── */}
      <MobileMenu navLinks={navLinks} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} isActive={isActive} handleLogoClick={handleLogoClick} />
    </>
  );
}
