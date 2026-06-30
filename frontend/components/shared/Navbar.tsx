"use client";
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

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
            {/* Premium multi-layered SVG emblem */}
            <div
              className="relative w-10 h-10 flex items-center justify-center rounded-xl overflow-visible"
              style={{
                background: 'linear-gradient(135deg, rgba(200,168,75,0.12) 0%, rgba(8,8,18,0.9) 100%)',
                border: '1px solid rgba(200,168,75,0.25)',
                boxShadow: '0 0 20px rgba(200,168,75,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              <svg
                viewBox="0 0 80 80"
                fill="none"
                className="w-7 h-7"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(200,168,75,0.5))',
                  transition: 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)',
                }}
              >
                <defs>
                  <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#fff8e1" />
                    <stop offset="45%"  stopColor="#f0c84b" />
                    <stop offset="100%" stopColor="#7a5a10" />
                  </linearGradient>
                  <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="rgba(255,248,225,0.7)" />
                    <stop offset="100%" stopColor="rgba(200,168,75,0.15)" />
                  </linearGradient>
                  <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="rgba(255,248,225,0.9)" />
                    <stop offset="60%"  stopColor="rgba(240,200,75,0.5)" />
                    <stop offset="100%" stopColor="rgba(200,168,75,0)" />
                  </radialGradient>
                </defs>

                {/* Outer ring with tick marks */}
                <circle cx="40" cy="40" r="37" stroke="url(#g1)" strokeWidth="0.8" strokeOpacity="0.45" fill="none" />
                {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  const x1 = (40 + 35 * Math.sin(rad)).toFixed(2);
                  const y1 = (40 - 35 * Math.cos(rad)).toFixed(2);
                  const isMajor = deg % 90 === 0;
                  const x2 = (40 + (isMajor ? 30 : 32) * Math.sin(rad)).toFixed(2);
                  const y2 = (40 - (isMajor ? 30 : 32) * Math.cos(rad)).toFixed(2);
                  return (
                    <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="url(#g1)"
                      strokeWidth={isMajor ? 1.2 : 0.6}
                      strokeOpacity={isMajor ? 0.85 : 0.4}
                    />
                  );
                })}

                {/* 4-pointed outer diamond (big) */}
                <path
                  d="M40 6 L46 34 L74 40 L46 46 L40 74 L34 46 L6 40 L34 34 Z"
                  fill="url(#g2)"
                  stroke="url(#g1)"
                  strokeWidth="0.7"
                  strokeOpacity="0.7"
                />

                {/* 4-pointed inner diamond (small, rotated 45°) */}
                <path
                  d="M40 20 L43.5 36.5 L57 40 L43.5 43.5 L40 57 L36.5 43.5 L23 40 L36.5 36.5 Z"
                  fill="url(#g1)"
                  fillOpacity="0.85"
                />

                {/* Center hexagon gem facets */}
                <polygon
                  points="40,30 46.9,35 46.9,45 40,50 33.1,45 33.1,35"
                  fill="url(#g1)"
                  fillOpacity="0.4"
                  stroke="url(#g1)"
                  strokeWidth="0.5"
                  strokeOpacity="0.8"
                />

                {/* Diagonal cross lines */}
                <line x1="26" y1="26" x2="54" y2="54" stroke="url(#g1)" strokeWidth="0.5" strokeOpacity="0.3" />
                <line x1="54" y1="26" x2="26" y2="54" stroke="url(#g1)" strokeWidth="0.5" strokeOpacity="0.3" />

                {/* Center bright dot */}
                <circle cx="40" cy="40" r="3.5" fill="url(#centerGlow)" />
                <circle cx="40" cy="40" r="1.8" fill="white" fillOpacity="0.95" />
              </svg>
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
                  className="relative px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider whitespace-nowrap group"
                  style={{
                    color: active ? '#f0d080' : 'rgba(255,255,255,0.42)',
                    background: active ? 'rgba(200,168,75,0.10)' : 'transparent',
                    transition: 'color 0.2s ease, background 0.2s ease',
                  }}
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
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Search
              <kbd className="ml-1 px-1.5 py-0.5 rounded bg-black/40 text-[9px] border border-white/10 font-mono">Ctrl+K</kbd>
            </button>
            <button 
              onClick={handleSearchClick}
              className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>

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
                  className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest"
                  style={{
                    color: locale === l ? '#f0d080' : 'rgba(255,255,255,0.28)',
                    background: locale === l ? 'rgba(200,168,75,0.12)' : 'transparent',
                    transition: 'color 0.2s ease, background 0.2s ease',
                  }}
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
      <div
        className="md:hidden fixed left-0 right-0 z-40 overflow-hidden"
        style={{
          top: '64px',
          maxHeight: mobileOpen ? '600px' : '0px',
          transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)',
          background: 'rgba(4,4,10,0.98)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderBottom: mobileOpen ? '1px solid rgba(200,168,75,0.10)' : 'none',
          boxShadow: mobileOpen ? '0 20px 60px rgba(0,0,0,0.7)' : 'none',
        }}
      >
        <div className="flex flex-col p-4 gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={link.href === '/' ? handleLogoClick : undefined}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold"
                style={{
                  background: active ? 'rgba(200,168,75,0.10)' : 'transparent',
                  border: active ? '1px solid rgba(200,168,75,0.20)' : '1px solid transparent',
                  color: active ? '#f0d080' : 'rgba(255,255,255,0.55)',
                  transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
                }}
              >
                <span className="text-base">{link.icon}</span>
                <span style={{ fontFamily: active ? 'var(--font-cinzel, serif)' : 'inherit', fontSize: active ? '0.7rem' : undefined, letterSpacing: active ? '0.06em' : undefined }}>
                  {link.label}
                </span>
                {active && (
                  <svg className="ml-auto w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-30"
          style={{ background: 'rgba(0,0,0,0.50)', backdropFilter: 'blur(2px)', top: '64px' }}
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
