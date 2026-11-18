"use client";

import { useUser } from '@/context/UserContext';
import { Link } from '@/i18n/routing';
import { useState, useRef, useEffect } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import { getCharacterAvatar } from '@/utils/assetMap';
import { User, LogOut, Settings, Heart } from 'lucide-react';

export function UserNav() {
  const { user, loading, logout } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-slate-200/60 animate-pulse" />;
  }

  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="relative group inline-flex items-center justify-center px-4 py-1.5 sm:py-2 rounded-full text-xs font-extrabold text-white transition-all duration-300 shadow-md shadow-violet-500/25 hover:shadow-lg hover:shadow-violet-500/40 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #7C5AE0 0%, #9B7AFF 100%)',
        }}
      >
        <span className="relative z-10 tracking-wide">Login</span>
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </Link>
    );
  }

  const avatarSrc = user.avatarUrl || getCharacterAvatar(user.travelerCharId, user.gender);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200/80 hover:border-violet-300/80 transition-all shadow-xs cursor-pointer"
      >
        <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-[#e8b64c]/70 shadow-xs">
          <FallbackImage
            src={avatarSrc}
            alt={user.username}
            width={28}
            height={28}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-xs font-bold text-slate-800 max-w-[85px] truncate hidden sm:block">
          {user.displayName || user.username}
        </span>
      </button>

      {open && (
        <div className="site-nav-menu absolute right-0 top-full mt-2 w-52 rounded-2xl border border-slate-200/90 overflow-hidden py-2 z-50 shadow-2xl">
          <div className="px-4 py-2 border-b border-slate-100 mb-1">
            <p className="text-sm font-bold text-slate-900 truncate">{user.displayName || user.username}</p>
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
          </div>
          
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-700 hover:text-violet-700 hover:bg-violet-50/70 transition-colors"
          >
            <User className="w-4 h-4 text-violet-500" />
            Profile
          </Link>
          
          <Link
            href="/profile#favorites"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-700 hover:text-violet-700 hover:bg-violet-50/70 transition-colors"
          >
            <Heart className="w-4 h-4 text-pink-500" />
            Favorites
            <span className="ml-auto bg-violet-100 text-violet-700 text-[10px] font-black px-1.5 py-0.5 rounded-full">
              {user.favoritesCount}
            </span>
          </Link>
          
          <Link
            href="/profile/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-700 hover:text-violet-700 hover:bg-violet-50/70 transition-colors"
          >
            <Settings className="w-4 h-4 text-slate-500" />
            Settings
          </Link>
          
          <div className="h-px bg-slate-100 my-1.5" />
          
          <button
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50/80 transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
