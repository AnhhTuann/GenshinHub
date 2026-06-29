"use client";
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = (t: any) => [
  { href: '/characters', label: t('characters'), icon: '⚔️' },
  { href: '/weapons',    label: t('weapons'),    icon: '🗡️' },
  { href: '/artifacts',  label: t('artifacts'),  icon: '💎' },
  { href: '/tierlist',   label: t('tierlist'),   icon: '🏆' },
  { href: '/teams',      label: 'Teams',          icon: '👥' },
  { href: '/banners',    label: t('banners'),    icon: '📜' },
  { href: '/showcase',   label: t('showcase'),   icon: '🔍' },
  { href: '/tcg',        label: t('tcg'),        icon: '🃏' },
];

export default function Navbar() {
  const pathname    = usePathname();
  const locale      = useLocale();
  const router      = useRouter();
  const t           = useTranslations('Common');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [scrollPct,  setScrollPct]  = useState(0);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(maxScroll > 0 ? Math.min(100, (y / maxScroll) * 100) : 0);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const handleLogoClick = () => {
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('reset-search'));
  };

  const navLinks = NAV_LINKS(t);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <nav
        className="sticky top-0 z-50 w-full transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(4,4,10,0.96)'
            : 'rgba(4,4,10,0.70)',
          backdropFilter: `blur(${scrolled ? 28 : 12}px) saturate(160%)`,
          WebkitBackdropFilter: `blur(${scrolled ? 28 : 12}px) saturate(160%)`,
          borderBottom: scrolled
            ? '1px solid rgba(200,168,75,0.12)'
            : '1px solid rgba(255,255,255,0.04)',
          boxShadow: scrolled
            ? '0 4px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(200,168,75,0.08)'
            : 'none',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link
            className="flex items-center gap-2.5 shrink-0 group"
            href="/"
            onClick={handleLogoClick}
          >
            {/* Paimon-inspired star diamond SVG */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg
                className="w-7 h-7 group-hover:rotate-[72deg] transition-transform duration-700 ease-out"
                viewBox="0 0 100 100" fill="none"
                style={{ filter: 'drop-shadow(0 0 10px rgba(200,168,75,0.6))' }}
              >
                <defs>
                  <linearGradient id="ng" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#f0d080" />
                    <stop offset="40%"  stopColor="#c8a84b" />
                    <stop offset="100%" stopColor="#8a6820" />
                  </linearGradient>
                </defs>
                <path d="M50 2 L60 40 L98 50 L60 60 L50 98 L40 60 L2 50 L40 40 Z" fill="url(#ng)" />
                <path d="M50 18 L56 44 L82 50 L56 56 L50 82 L44 56 L18 50 L44 44 Z" fill="rgba(255,255,255,0.15)" />
              </svg>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span
                className="text-[1.05rem] font-black tracking-[0.12em] uppercase"
                style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  background: 'linear-gradient(135deg, #f0d080 0%, #c8a84b 50%, #f0d080 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Genshin
              </span>
              <span className="text-[0.6rem] font-bold tracking-[0.35em] uppercase text-white/40 -mt-0.5">
                Hub · Wiki
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={link.href === '/' ? handleLogoClick : undefined}
                  className="relative px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-250 group"
                  style={{
                    color: active ? 'var(--gold-light, #f0d080)' : 'rgba(255,255,255,0.45)',
                    background: active ? 'rgba(200,168,75,0.10)' : 'transparent',
                  }}
                >
                  {link.label}
                  {/* Gold underline — slides in from center */}
                  <span
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ease-out"
                    style={{
                      width: active ? '80%' : '0%',
                      background: 'linear-gradient(90deg, transparent, var(--gold-500, #c8a84b), transparent)',
                    }}
                  />
                  {/* Hover underline */}
                  <span
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full opacity-0 group-hover:opacity-100 group-hover:w-[60%] w-0 transition-all duration-300 ease-out"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    }}
                  />
                </Link>
              );
            })}
          </div>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language switcher */}
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
                  className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all duration-200"
                  style={{
                    color: locale === l ? 'var(--gold-light, #f0d080)' : 'rgba(255,255,255,0.3)',
                    background: locale === l ? 'rgba(200,168,75,0.12)' : 'transparent',
                  }}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-xl gap-1.5 transition-all hover:bg-white/[0.06]"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-4 h-[1.5px] bg-white/70 rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
              <span className={`block h-[1.5px] bg-white/70 rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 w-0' : 'w-4'}`} />
              <span className={`block w-4 h-[1.5px] bg-white/70 rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* ── Scroll Progress Bar ── */}
        <div
          className="absolute bottom-0 left-0 h-[2px] transition-all duration-100"
          style={{
            width: `${scrollPct}%`,
            background: 'linear-gradient(90deg, var(--gold-600,#b8922e), var(--gold-light,#f0d080), var(--gold-500,#c8a84b))',
            opacity: scrolled ? 0.7 : 0,
          }}
        />
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed top-16 left-0 right-0 z-50"
              style={{
                background: 'rgba(6,6,14,0.98)',
                backdropFilter: 'blur(28px)',
                borderBottom: '1px solid rgba(200,168,75,0.10)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
              }}
            >
              <div className="flex flex-col p-4 gap-1">
                {navLinks.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={link.href === '/' ? handleLogoClick : undefined}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200"
                        style={{
                          background: active ? 'rgba(200,168,75,0.10)' : 'transparent',
                          border: active ? '1px solid rgba(200,168,75,0.18)' : '1px solid transparent',
                          color: active ? 'var(--gold-light,#f0d080)' : 'rgba(255,255,255,0.6)',
                        }}
                      >
                        <span className="text-lg">{link.icon}</span>
                        <span
                          style={{ fontFamily: active ? 'var(--font-cinzel, sans-serif)' : 'inherit' }}
                        >
                          {link.label}
                        </span>
                        {active && (
                          <svg className="ml-auto w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
