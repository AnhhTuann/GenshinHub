"use client";
import { Link, usePathname } from '@/i18n/routing';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { logoutAdmin } from '@/lib/adminAuth';
import { Toaster } from 'react-hot-toast';

const NAV_GROUPS = [
  {
    label: 'Overview',
    icon: '📊',
    items: [
      { href: '/admin',            label: 'Dashboard', icon: '🏠' },
    ],
  },
  {
    label: 'Data',
    icon: '⚔️',
    items: [
      { href: '/admin/characters', label: 'Characters', icon: '⚔️' },
      { href: '/admin/weapons',    label: 'Weapons',    icon: '🗡️' },
      { href: '/admin/artifacts',  label: 'Artifacts',  icon: '💎' },
      { href: '/admin/materials',  label: 'Materials',  icon: '📦' },
    ],
  },
  {
    label: 'Tools',
    icon: '🔧',
    items: [
      { href: '/admin/tierlist',   label: 'Tier List',  icon: '🏆' },
      { href: '/admin/backups',    label: 'Backups',    icon: '💾' },
      { href: '/admin/export',     label: 'Export TS',  icon: '📤' },
    ],
  },
];

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params   = useParams();
  const locale   = (params?.locale as string) ?? 'vi';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const isActive = (href: string) => {
    const localePath = `/${locale}${href}`;
    if (href === '/admin') return pathname === localePath;
    return pathname.startsWith(localePath);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await logoutAdmin(locale);
  };

  const sidebarContent = (
    <nav className="flex flex-col gap-0.5 flex-1">
      {NAV_GROUPS.map((group) => (
        <div key={group.label} className="mb-2">
          <div className="px-3 py-1.5 flex items-center gap-2">
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20">{group.label}</span>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
          </div>
          {group.items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href as any}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  active 
                    ? 'bg-[#c8a84b]/10 border border-[#c8a84b]/20 text-[#f0d080] shadow-[0_0_12px_rgba(200,168,75,0.08)]' 
                    : 'border border-transparent text-white/40 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-base w-5 text-center shrink-0">{item.icon}</span>
                <span style={{ fontFamily: active ? 'var(--font-cinzel, serif)' : 'inherit', fontSize: active ? '0.68rem' : undefined, letterSpacing: active ? '0.04em' : undefined }}>
                  {item.label}
                </span>
                {active && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#c8a84b', boxShadow: '0 0 6px rgba(200,168,75,0.7)' }} />
                )}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen text-white" style={{ background: 'var(--bg-void, #04040a)' }}>
      {/* Global Toast provider */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(13,13,20,0.98)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 600,
            backdropFilter: 'blur(20px)',
          },
          success: {
            iconTheme: { primary: '#c8a84b', secondary: '#080812' },
            style: { borderColor: 'rgba(200,168,75,0.25)' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
            style: { borderColor: 'rgba(239,68,68,0.25)' },
          },
          duration: 3500,
        }}
      />

      {/* ── Topbar ── */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14"
        style={{
          background: 'rgba(4,4,10,0.96)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(200,168,75,0.08)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.4)',
        }}
      >
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {[0,1,2].map(i => (
              <span key={i} className="block w-4 h-0.5 bg-white/50 rounded-full" />
            ))}
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
              style={{ background: 'rgba(200,168,75,0.12)', border: '1px solid rgba(200,168,75,0.20)' }}
            >
              🛡️
            </div>
            <span
              className="text-[13px] font-black uppercase tracking-[0.12em]"
              style={{
                fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                background: 'linear-gradient(135deg, #f0d080, #c8a84b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Admin
            </span>
            <span className="text-white/15 text-xs">·</span>
            <span className="text-white/30 text-xs font-medium">GenshinHub</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Admin mode badge */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
            style={{ background: 'rgba(200,168,75,0.08)', border: '1px solid rgba(200,168,75,0.15)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400/70">Admin Mode</span>
          </div>

          {/* View Site */}
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Site
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all"
            style={{
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.15)',
              color: 'rgba(239,68,68,0.7)',
            }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {loggingOut ? '...' : 'Logout'}
          </button>
        </div>
      </header>

      <div className="flex max-w-[1600px] mx-auto">

        {/* ── Desktop Sidebar ── */}
        <aside
          className="hidden lg:flex flex-col w-56 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto pt-4 pb-6 px-3"
          style={{
            borderRight: '1px solid rgba(255,255,255,0.04)',
            background: 'rgba(4,4,10,0.6)',
          }}
        >
          {sidebarContent}
        </aside>

        {/* ── Mobile Sidebar overlay ── */}
        {mobileOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', top: '56px' }}
            onClick={() => setMobileOpen(false)}
          />
        )}
        <div
          className="lg:hidden fixed left-0 bottom-0 z-50 w-64 overflow-y-auto pt-4 pb-6 px-3"
          style={{
            top: '56px',
            transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
            background: 'rgba(4,4,10,0.98)',
            backdropFilter: 'blur(24px)',
            borderRight: '1px solid rgba(200,168,75,0.10)',
          }}
        >
          {sidebarContent}
        </div>

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-24">
          {children}
        </main>
      </div>
    </div>
  );
}
