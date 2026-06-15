"use client";
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname   = usePathname();
  const locale     = useLocale();
  const router     = useRouter();
  const t          = useTranslations('Common');
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [scrolled,   setScrolled]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const handleLogoClick = () => {
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('reset-search'));
  };

  const navLinks = [
    { href: '/',          label: t('home'),       icon: '🏠' },
    { href: '/characters',label: t('characters'), icon: '⚔️' },
    { href: '/weapons',   label: t('weapons'),    icon: '🗡️' },
    { href: '/artifacts', label: t('artifacts'),  icon: '💎' },
    { href: '/tierlist',  label: t('tierlist'),   icon: '🏆' },
    { href: '/banners',   label: t('banners'),    icon: '📜' },
    { href: '/teams',     label: 'Teams',          icon: '👥' },
    { href: '/showcase',  label: t('showcase'),   icon: '🔍' },
    { href: '/tcg',       label: t('tcg'),        icon: '🃏' },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#06060a]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'bg-[#06060a]/70 backdrop-blur-md border-b border-white/[0.04]'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            className="flex items-center gap-2.5 hover:opacity-90 active:scale-95 transition-all duration-200 group shrink-0"
            href="/"
            onClick={handleLogoClick}
          >
            <svg className="w-7 h-7 group-hover:rotate-90 transition-transform duration-500 drop-shadow-[0_0_8px_rgba(255,179,0,0.5)]" viewBox="0 0 100 100" fill="none">
              <defs>
                <linearGradient id="logo-g" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#50e4ff" />
                  <stop offset="50%"  stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#ffb300" />
                </linearGradient>
              </defs>
              <path d="M50 0 C50 35,65 50,100 50 C65 50,50 65,50 100 C50 65,35 50,0 50 C35 50,50 35,50 0 Z" fill="url(#logo-g)" />
            </svg>
            <span className="text-[1.1rem] font-black text-white tracking-wider font-display hidden sm:block">
              GENSHIN<span className="text-yellow-400">HUB</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5 bg-[#0d0d14]/60 p-1 rounded-2xl border border-white/[0.05]">
            {navLinks.map((link) => {
              const isActive = link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={link.href === '/' ? handleLogoClick : undefined}
                  className={`relative px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-yellow-400/10 text-yellow-400 shadow-[inset_0_0_12px_rgba(251,191,36,0.06)]'
                      : 'text-white/40 hover:text-white/80 hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-yellow-400" />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language switch */}
            <div className="flex items-center bg-[#0d0d14]/60 border border-white/[0.05] rounded-xl overflow-hidden">
              {['vi', 'en'].map((l) => (
                <button
                  key={l}
                  onClick={() => router.replace(pathname, { locale: l })}
                  className={`px-3 py-1.5 text-[11px] font-black uppercase tracking-wider transition-all duration-200 ${
                    locale === l
                      ? 'bg-yellow-400/10 text-yellow-400'
                      : 'text-white/35 hover:text-white/70'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.06] gap-1.5 transition-all hover:bg-white/[0.08]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-4 h-[1.5px] bg-white/70 rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
              <span className={`block w-4 h-[1.5px] bg-white/70 rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 w-0' : ''}`} />
              <span className={`block w-4 h-[1.5px] bg-white/70 rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 pt-16" onClick={() => setMobileOpen(false)}>
          <div
            className="absolute top-0 left-0 right-0 bg-[#0d0d14]/98 backdrop-blur-xl border-b border-white/[0.07] shadow-2xl animate-fade-in-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => {
                const isActive = link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={link.href === '/' ? handleLogoClick : undefined}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/10'
                        : 'text-white/60 hover:text-white hover:bg-white/[0.05] border border-transparent'
                    }`}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="uppercase tracking-wider text-xs">{link.label}</span>
                    {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-yellow-400" />}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
