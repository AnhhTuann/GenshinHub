"use client";

import { useLocale } from 'next-intl';
import toast from 'react-hot-toast';
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  username: string;
  gender: 'male' | 'female';
  displayName?: string;
  avatarUrl?: string;
  travelerCharId: string;
  favoritesCount: number;
  favoriteIds?: string[];
  wishlist?: any[];
  teams?: any[];
  gachaStats?: {
    character: { pulls: number, pity: number, guaranteed?: boolean };
    weapon: { pulls: number, pity: number, guaranteed?: boolean };
    standard: { pulls: number, pity: number, guaranteed?: boolean };
    winRate: number;
    totalPulls: number;
    fiveStarHistory?: {
      id: string;
      name: string;
      type: string;
      pity: number;
      win?: boolean;
      date: string;
    }[];
  };
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (!response.ok) throw new Error('Logout failed');
    } catch {
      toast.error(locale === 'vi' ? 'Không thể đăng xuất. Vui lòng thử lại.' : 'Unable to sign out. Please try again.');
      return;
    }
    setUser(null);
    window.location.reload();
  };

  return (
    <UserContext.Provider value={{ user, loading, setUser, logout, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
