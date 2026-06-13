"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminModeToggle() {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAdmin(!!localStorage.getItem('admin_key'));
    }
  }, []);

  const handleToggle = () => {
    if (isAdmin) {
      localStorage.removeItem('admin_key');
      setIsAdmin(false);
      router.refresh();
    } else {
      const pwd = prompt("Nhập mật khẩu Admin:");
      if (pwd) {
        localStorage.setItem('admin_key', pwd);
        setIsAdmin(true);
        router.refresh();
      }
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`fixed bottom-4 right-4 z-50 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg transition-all border ${
        isAdmin 
          ? 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30' 
          : 'bg-white/5 text-white/40 border-white/10 hover:bg-white/10'
      }`}
    >
      {isAdmin ? '🔴 Admin Mode ON' : '⚙️ Admin'}
    </button>
  );
}
