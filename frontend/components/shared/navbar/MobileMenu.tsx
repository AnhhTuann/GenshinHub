import { Link } from '@/i18n/routing';

export function MobileMenu({ navLinks, mobileOpen, setMobileOpen, isActive, handleLogoClick }: any) {
  return (
    <>
      <div
        className="lg:hidden fixed left-0 right-0 z-40 overflow-hidden"
        style={{
          top: '68px',
          maxHeight: mobileOpen ? '620px' : '0px',
          transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)',
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderBottom: mobileOpen ? '1px solid rgba(226, 232, 240, 0.9)' : 'none',
          boxShadow: mobileOpen ? '0 20px 40px -10px rgba(30, 27, 75, 0.12)' : 'none',
        }}
      >
        <div className="flex flex-col p-4 gap-1.5">
          {navLinks.map((link: any) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  if (link.href === '/') handleLogoClick();
                  setMobileOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-violet-50 text-violet-700 border border-violet-200/60 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  active ? 'bg-violet-100 text-violet-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  <link.icon className="w-4 h-4" />
                </div>
                <span className="font-bold tracking-wide">
                  {link.label}
                </span>
                {active && (
                  <svg className="ml-auto w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          className="lg:hidden fixed inset-0 z-30"
          style={{ background: 'rgba(15, 23, 42, 0.3)', backdropFilter: 'blur(4px)', top: '68px' }}
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
