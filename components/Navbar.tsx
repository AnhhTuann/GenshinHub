import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="h-16 border-b border-zinc-800 flex items-center justify-between px-4 md:px-8 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 shrink-0">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-xs">GEN</div>
          SHIN<span className="text-purple-500">BUILDS</span>
        </Link>
        <div className="hidden md:flex gap-6 text-sm font-medium text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors">Characters</Link>
          <button className="hover:text-white transition-colors cursor-not-allowed">Weapons</button>
          <button className="hover:text-white transition-colors cursor-not-allowed">Artifacts</button>
          <button className="hover:text-white transition-colors cursor-not-allowed">Tier List</button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* We'll handle search in the characters page or create a global search later */}
      </div>
    </nav>
  );
}
