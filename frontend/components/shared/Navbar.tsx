import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#111115]/90 backdrop-blur-md border-b border-gray-800 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
        <Link className="flex items-center gap-2" href="/">
          <span className="text-2xl">🌟</span>
          <span className="text-xl font-bold text-white tracking-wide">
            Teyvat<span className="text-yellow-500">DB</span>
          </span>
        </Link>
        <div className="hidden md:flex gap-6">
          <Link className="text-sm font-medium text-gray-300 hover:text-white transition-colors" href="/">Nhân Vật</Link>
          <span className="text-sm font-medium text-gray-500 cursor-not-allowed">Vũ Khí (Coming Soon)</span>
        </div>
        <div>
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">Đóng góp</button>
        </div>
      </div>
    </nav>
  );
}
