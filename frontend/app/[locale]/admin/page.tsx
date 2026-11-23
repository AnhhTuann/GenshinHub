"use client";
import { useEffect, useState } from 'react';
import { fetchGraphQL } from '@/lib/graphql';
import Link from 'next/link';
import { Archive, ArrowUpRight, Download, Gem, Info, Package, Sword, Trophy, UserRound, UserRoundPlus } from 'lucide-react';

interface Stats { characters: number; weapons: number; artifacts: number; materials: number; }

const STAT_CARDS = (stats: Stats) => [
  { label: 'Characters', value: stats.characters, icon: UserRound, href: '/admin/characters' },
  { label: 'Weapons', value: stats.weapons, icon: Sword, href: '/admin/weapons' },
  { label: 'Artifacts', value: stats.artifacts, icon: Gem, href: '/admin/artifacts' },
  { label: 'Materials', value: stats.materials, icon: Package, href: '/admin/materials' },
];

const QUICK_ACTIONS = [
  { label: 'Add Character', href: '/admin/characters', icon: UserRoundPlus },
  { label: 'Add Weapon', href: '/admin/weapons', icon: Sword },
  { label: 'Manage Tiers', href: '/admin/tierlist', icon: Trophy },
  { label: 'Backup DB', href: '/admin/backups', icon: Archive },
  { label: 'Export Seeds', href: '/admin/export', icon: Download },
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

  return (
    <div className="grid gap-8">
      <header>
        <h1 className="atlas-section-title">Dashboard</h1>
        <p className="mt-2 text-[var(--text-secondary)]">Manage the GenshinHub database.</p>
      </header>
      <section aria-label="Database inventory" aria-busy={loading} className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {STAT_CARDS(stats).map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href as any} className="atlas-surface atlas-admin-stat">
            <span className="atlas-quick-icon"><Icon size={22} aria-hidden="true" /></span>
            <strong>{loading ? '—' : value}</strong>
            <span>{label}</span>
          </Link>
        ))}
      </section>

      <div className="grid lg:grid-cols-[1fr_1.25fr] gap-4 items-start">
        <section className="atlas-surface p-4 sm:p-6">
          <h2 className="text-lg font-bold mb-3">Quick actions</h2>
          <div className="divide-y divide-[var(--border-default)]">
            {QUICK_ACTIONS.map(({ label, href, icon: Icon }) => (
              <Link key={label} href={href as any} className="atlas-admin-action">
                <Icon size={18} aria-hidden="true" />
                <span>{label}</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
        <section className="atlas-surface p-4 sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold mb-3"><Info size={20} aria-hidden="true" />Getting started</h2>
          <ul className="space-y-3 ps-5 list-disc text-sm leading-relaxed text-[var(--text-secondary)]">
            <li>Use the sidebar to navigate between entity managers.</li>
            <li>All changes auto-save to the database via GraphQL.</li>
            <li>Use <strong>Backups</strong> to create snapshots before making bulk edits.</li>
            <li>Use <strong>Export TS</strong> to persist changes to seed files.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
