import { Link } from '@/i18n/routing';

export function MobileMenu({ navLinks, mobileOpen, setMobileOpen, isActive, handleLogoClick }: any) {
  return (
    <>
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
          {navLinks.map((link: any) => {
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
