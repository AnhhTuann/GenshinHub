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
    return <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />;
  }

  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 bg-[#c8a84b]/10 hover:bg-[#c8a84b]/20 border border-[#c8a84b]/30 text-[#f0d080]"
      >
        Login
      </Link>
    );
  }

  const avatarSrc = user.avatarUrl || getCharacterAvatar(user.travelerCharId, user.gender);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
      >
        <div className="w-7 h-7 rounded-full overflow-hidden border border-[#c8a84b]/50">
          <FallbackImage
            src={avatarSrc}
            alt={user.username}
            width={28}
            height={28}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-xs font-bold text-white/80 max-w-[80px] truncate hidden sm:block">
          {user.displayName || user.username}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-[#0a0a0f] border border-white/10 shadow-xl overflow-hidden py-2 z-50">
          <div className="px-4 py-2 border-b border-white/5 mb-2">
            <p className="text-sm font-bold text-white truncate">{user.displayName || user.username}</p>
            <p className="text-xs text-white/40 truncate">{user.email}</p>
          </div>
          
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <User className="w-4 h-4" />
            Profile
          </Link>
          
          <Link
            href="/profile#favorites"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Heart className="w-4 h-4" />
            Favorites
            <span className="ml-auto bg-white/10 text-white/70 text-[10px] px-1.5 py-0.5 rounded-full">
              {user.favoritesCount}
            </span>
          </Link>
          
          <Link
            href="/profile/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
          
          <div className="h-px bg-white/5 my-2" />
          
          <button
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
