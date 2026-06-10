"use client";
import {Link, usePathname, useRouter} from '@/i18n/routing';
import {useLocale, useTranslations} from 'next-intl';

export default function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('Common');

  const handleLogoClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('reset-search'));
    }
  };

  const navLinks = [
    { href: '/', label: t('characters') },
    { href: '/weapons', label: t('weapons') },
    { href: '/artifacts', label: t('artifacts') },
    { href: '/teams', label: 'Teams' },
    { href: '/showcase', label: t('showcase') },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#07070a]/80 backdrop-blur-xl border-b border-gray-900/80 shadow-lg">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link 
          className="flex items-center gap-2.5 hover:opacity-90 active:scale-98 transition-all duration-150 group" 
          href="/"
          onClick={handleLogoClick}
        >
          <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">🌟</span>
          <span className="text-xl font-black text-white tracking-wider font-display">
            TEYVAT<span className="text-yellow-500 font-extrabold">DB</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-1 bg-[#101015]/40 p-1 rounded-full border border-gray-900">
          {navLinks.map((link) => {
            const isActive = link.href === '/' 
              ? pathname === '/' 
              : pathname.startsWith(link.href);
            return (
              <Link 
                key={link.href}
                className={`text-xs font-extrabold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.1)]' 
                    : 'text-gray-400 hover:text-gray-100 hover:bg-white/5 border border-transparent'
                }`}
                href={link.href}
                onClick={link.href === '/' ? handleLogoClick : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={locale}
            onChange={(e) => {
              router.replace(pathname, {locale: e.target.value});
            }}
            className="bg-[#101015] border border-gray-800 text-gray-300 text-xs uppercase font-bold tracking-wider py-1.5 px-2 rounded-md outline-none hover:border-gray-600 transition-colors"
          >
            <option value="vi">VI</option>
            <option value="en">EN</option>
          </select>

          <button className="relative overflow-hidden bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-[0_4px_12px_rgba(234,179,8,0.25)] hover:shadow-[0_4px_20px_rgba(234,179,8,0.4)] active:scale-95 hidden sm:block">
            Contribute
          </button>
        </div>
      </div>
    </nav>
  );
}
