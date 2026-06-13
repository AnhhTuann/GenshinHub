"use client";
import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const tabs = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Characters', href: '/admin/characters' },
    { name: 'Weapons', href: '/admin/weapons' },
    { name: 'Artifacts', href: '/admin/artifacts' },
    { name: 'Export TS', href: '/admin/export' },
  ];

  return (
    <div className="min-h-screen bg-[#06060a] text-white pt-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-[#0d0d14] border border-white/10 rounded-2xl p-4 sticky top-24">
            <h2 className="text-xl font-black mb-6 px-2 text-white/90">Admin Panel</h2>
            <nav className="flex flex-col gap-2">
              {tabs.map((tab) => {
                const isActive = pathname === tab.href || pathname === `/vi${tab.href}` || pathname === `/en${tab.href}`;
                return (
                  <Link 
                    key={tab.name} 
                    href={tab.href as any}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive 
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                        : 'text-white/50 hover:bg-white/5 hover:text-white/80 border border-transparent'
                    }`}
                  >
                    {tab.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 bg-[#0d0d14] border border-white/10 rounded-2xl p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
