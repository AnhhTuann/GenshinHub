"use client";
import Link from 'next/link';

export default function Navbar() {
  const handleLogoClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('reset-search'));
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#111115]/90 backdrop-blur-md border-b border-gray-800 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          className="flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all duration-150" 
          href="/"
          onClick={handleLogoClick}
        >
          <span className="text-2xl">🌟</span>
          <span className="text-xl font-bold text-white tracking-wide">
            Teyvat<span className="text-yellow-500">DB</span>
          </span>
        </Link>
        <div className="hidden md:flex gap-6">
          <Link 
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors" 
            href="/"
            onClick={handleLogoClick}
          >
            Nhân Vật
          </Link>
          <Link 
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors" 
            href="/weapons"
          >
            Vũ Khí
          </Link>
          <Link 
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors" 
            href="/artifacts"
          >
            Thánh Di Vật
          </Link>
        </div>
        <div>
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">Đóng góp</button>
        </div>
      </div>
    </nav>
  );
}
