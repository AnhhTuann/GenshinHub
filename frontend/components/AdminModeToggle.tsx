"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAdminStatus, loginAdmin, logoutAdmin } from '@/lib/adminAuth';
import toast from 'react-hot-toast';

export default function AdminModeToggle() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAdminStatus().then(status => {
      setIsAdmin(status);
      setIsLoading(false);
    });
  }, []);

  const handleToggle = async () => {
    if (isAdmin) {
      setIsLoading(true);
      await logoutAdmin('vi', false);
      setIsAdmin(false);
      setIsLoading(false);
      router.refresh();
      toast.success('Đã tắt Admin Mode');
    } else {
      const pwd = prompt("Nhập mật khẩu Admin:");
      if (pwd) {
        setIsLoading(true);
        const result = await loginAdmin(pwd);
        if (result.error) {
          toast.error(result.error);
        } else {
          setIsAdmin(true);
          toast.success('Admin Mode ON');
          router.refresh();
        }
        setIsLoading(false);
      }
    }
  };

  if (isLoading && !isAdmin) return null;

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`fixed bottom-4 right-4 z-50 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg transition-all border ${
        isAdmin 
          ? 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30' 
          : 'bg-white/5 text-white/40 border-white/10 hover:bg-white/10'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? '...' : isAdmin ? '🔴 Admin Mode ON' : '⚙️ Admin'}
    </button>
  );
}
