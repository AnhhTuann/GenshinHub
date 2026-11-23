import { Link } from '@/i18n/routing';

export function MobileMenu({ navLinks, mobileOpen, setMobileOpen, isActive, handleLogoClick }: any) {
  return (
    <>
      <div
        id="mobile-site-menu"
        inert={!mobileOpen}
        aria-hidden={!mobileOpen}
        data-open={mobileOpen}
        className="site-mobile-menu lg:hidden fixed left-0 right-0 z-40 overflow-y-auto"
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
                aria-current={active ? 'page' : undefined}
                className={`site-nav-menu-link${active ? ' is-active' : ''}`}
              >
                <div className="site-nav-menu-icon">
                  <link.icon className="w-4 h-4" />
                </div>
                <span className="font-bold tracking-wide">
                  {link.label}
                </span>
                {active && (
                  <svg className="ml-auto w-4 h-4 text-[var(--accent-primary-light)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          style={{ background: 'var(--media-scrim)', top: '68px' }}
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
