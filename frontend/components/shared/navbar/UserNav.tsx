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
    return <div className="w-16 h-11 rounded-xl bg-[var(--bg-elevated)] motion-safe:animate-pulse" />;
  }

  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="site-nav-login inline-flex items-center justify-center rounded-xl px-3 text-xs font-bold"
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
        className="site-nav-control gap-2 p-1 sm:pr-3"
      >
        <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-[var(--fantasy-gold)] shadow-xs">
          <FallbackImage
            src={avatarSrc}
            alt={user.username}
            width={28}
            height={28}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-xs font-bold text-[var(--text-primary)] max-w-[85px] truncate hidden sm:block">
          {user.displayName || user.username}
        </span>
      </button>

      {open && (
        <div className="site-nav-menu absolute right-0 top-full mt-2 w-52 rounded-2xl border overflow-hidden py-2 z-50 shadow-2xl">
          <div className="px-4 py-2 border-b border-[var(--border-default)] mb-1">
            <p className="text-sm font-bold text-[var(--text-primary)] truncate">{user.displayName || user.username}</p>
            <p className="text-xs text-[var(--text-secondary)] truncate">{user.email}</p>
          </div>
          
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] transition-colors"
          >
            <User className="w-4 h-4 text-[var(--accent-primary-light)]" />
            Profile
          </Link>
          
          <Link
            href="/profile#favorites"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] transition-colors"
          >
            <Heart className="w-4 h-4 text-pink-500" />
            Favorites
            <span className="ml-auto bg-[var(--selected-surface)] text-[var(--text-primary)] text-xs font-black px-1.5 py-0.5 rounded-full">
              {user.favoritesCount}
            </span>
          </Link>
          
          <Link
            href="/profile/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] transition-colors"
          >
            <Settings className="w-4 h-4 text-[var(--text-secondary)]" />
            Settings
          </Link>
          
          <div className="h-px bg-[var(--bg-elevated)] my-1.5" />
          
          <button
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-[var(--danger-ink)] hover:bg-[var(--bg-overlay)] transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-current" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
