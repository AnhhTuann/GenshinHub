"use client";
import { useEffect, useState } from 'react';
import { fetchGraphQL } from '@/lib/graphql';
import Link from 'next/link';

interface Stats { characters: number; weapons: number; artifacts: number; materials: number; }

const STAT_CARDS = (s: Stats) => [
  { label: 'Characters', value: s.characters, icon: '⚔️', color: '#e8b64c', href: '/admin/characters', bg: 'rgba(232,182,76,0.08)' },
  { label: 'Weapons',    value: s.weapons,    icon: '🗡️', color: '#3aa8ff', href: '/admin/weapons',    bg: 'rgba(58,168,255,0.08)' },
  { label: 'Artifacts',  value: s.artifacts,  icon: '💎', color: '#cf8fff', href: '/admin/artifacts',  bg: 'rgba(207,143,255,0.08)' },
  { label: 'Materials',  value: s.materials,  icon: '📦', color: '#9ede5f', href: '/admin/materials',  bg: 'rgba(158,222,95,0.08)' },
];

const QUICK_ACTIONS = [
  { label: 'Add Character', href: '/admin/characters', icon: '👤', color: '#e8b64c' },
  { label: 'Add Weapon',    href: '/admin/weapons',    icon: '🗡️', color: '#3aa8ff' },
  { label: 'Manage Tiers',  href: '/admin/tierlist',   icon: '🏆', color: '#ffd34d' },
  { label: 'Backup DB',     href: '/admin/backups',    icon: '💾', color: '#9ede5f' },
  { label: 'Export Seeds',  href: '/admin/export',     icon: '📤', color: '#cf8fff' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ characters: 0, weapons: 0, artifacts: 0, materials: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [c, w, a, m] = await Promise.all([
          fetchGraphQL(`query { characters { id } }`),
          fetchGraphQL(`query { weapons { id } }`),
          fetchGraphQL(`query { artifacts { id } }`),
          fetchGraphQL(`query { materials { id } }`),
        ]);
        setStats({
          characters: c.characters?.length ?? 0,
          weapons:    w.weapons?.length    ?? 0,
          artifacts:  a.artifacts?.length  ?? 0,
          materials:  m.materials?.length  ?? 0,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const cards = STAT_CARDS(stats);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1
          className="text-2xl font-black uppercase tracking-wide mb-1"
          style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            background: 'linear-gradient(135deg, #ffdf9e, #e8b64c)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}
        >
          Dashboard
        </h1>
        <p className="text-white/30 text-sm">Welcome back, Admin. Here&apos;s an overview of your database.</p>
      </div>

      {/* Stats Cards */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href as any}
              className="group rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: card.bg,
                border: `1px solid ${card.color}20`,
                boxShadow: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 24px ${card.color}15`)}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: `${card.color}18`, border: `1px solid ${card.color}30` }}
                >
                  {card.icon}
                </div>
                <svg
                  className="w-4 h-4 opacity-0 group-hover:opacity-60 group-hover:translate-x-0.5 transition-all"
                  style={{ color: card.color }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div>
                <div
                  className="text-3xl font-black leading-none"
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    color: card.color,
                    filter: loading ? 'blur(8px)' : 'none',
                    transition: 'filter 0.4s ease',
                  }}
                >
                  {loading ? '—' : card.value}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-white/35 mt-0.5">
                  {card.label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-[3px] h-5 rounded-full" style={{ background: 'linear-gradient(to bottom, #ffdf9e, #e8b64c)' }} />
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/35">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.label}
              href={action.href as any}
              className="flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 group"
              style={{
                background: 'rgba(16,22,46,0.70)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${action.color}30`;
                e.currentTarget.style.boxShadow = `0 4px 16px ${action.color}12`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span className="text-xl w-8 text-center shrink-0">{action.icon}</span>
              <span className="text-xs font-bold text-white/60 group-hover:text-white/85 transition-colors">{action.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Help Card */}
      <section
        className="rounded-2xl p-5"
        style={{
          background: 'rgba(232,182,76,0.04)',
          border: '1px solid rgba(232,182,76,0.12)',
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
            style={{ background: 'rgba(232,182,76,0.12)', border: '1px solid rgba(232,182,76,0.20)' }}
          >
            💡
          </div>
          <div>
            <h3 className="text-sm font-black text-amber-400/80 mb-2">Getting Started</h3>
            <ul className="text-xs text-white/40 space-y-1.5 font-medium">
              <li className="flex items-center gap-2"><span className="text-amber-400/50">→</span> Use the sidebar to navigate between entity managers.</li>
              <li className="flex items-center gap-2"><span className="text-amber-400/50">→</span> All changes auto-save to database via GraphQL mutations.</li>
              <li className="flex items-center gap-2"><span className="text-amber-400/50">→</span> Use <strong className="text-white/60">Backups</strong> to create snapshots before making bulk edits.</li>
              <li className="flex items-center gap-2"><span className="text-amber-400/50">→</span> Use <strong className="text-white/60">Export TS</strong> to persist changes permanently to seed files.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
