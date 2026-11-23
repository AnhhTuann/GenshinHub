"use client";

import { useState } from 'react';
import { useRouter, Link } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useUser } from '@/context/UserContext';
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) ?? 'vi';
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setUser(data.user);
      toast.success(locale === 'vi' ? 'Đăng nhập thành công!' : 'Signed in successfully!');
      router.push('/profile');
      router.refresh(); // Ensure layout updates
    } catch (err: any) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="relative flex-1 flex items-center justify-center p-4">

      <div className="w-full max-w-md">
        <div className="atlas-surface px-5 py-7 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[var(--accent-primary-dim)] text-[var(--accent-primary-light)] flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h1
              className="atlas-section-title mb-2"
            >
              {locale === 'vi' ? 'Chào mừng trở lại' : 'Welcome Back'}
            </h1>
            <p className="text-white/40 text-sm">{locale === 'vi' ? 'Đăng nhập tài khoản GenshinHub' : 'Sign in to your GenshinHub account'}</p>
          </div>

          <form onSubmit={handleSubmit} aria-busy={loading} className="fantasy-auth-form space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/30" />
                </div>
                <input
                  type="email"
                  required
                  id="login-email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#e8b64c]/50 focus:bg-white/10 transition-all"
                  placeholder="traveler@teyvat.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="login-password" className="block text-xs font-bold text-white/60 uppercase tracking-wider ml-1">{locale === 'vi' ? 'Mật khẩu' : 'Password'}</label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-[#e8b64c] hover:text-[#ffdf9e] transition-colors font-medium"
                >
                  {locale === 'vi' ? 'Quên mật khẩu?' : 'Forgot password?'}
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/30" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  id="login-password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-12 text-white placeholder-white/20 focus:outline-none focus:border-[#e8b64c]/50 focus:bg-white/10 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white/60 transition-colors"
                  aria-label={showPassword
                    ? (locale === 'vi' ? 'Ẩn mật khẩu' : 'Hide password')
                    : (locale === 'vi' ? 'Hiện mật khẩu' : 'Show password')}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="w-4 h-4 rounded border-white/10 bg-white/5 text-[#e8b64c] focus:ring-[#e8b64c]/50 focus:ring-offset-0 cursor-pointer accent-[#e8b64c]"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-white/60 cursor-pointer select-none">
                {locale === 'vi' ? 'Ghi nhớ đăng nhập' : 'Remember me'}
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="atlas-auth-submit w-full py-3.5 mt-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (locale === 'vi' ? 'Đăng nhập' : 'Sign in')}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <p className="text-white/40 text-sm">
              {locale === 'vi' ? 'Chưa có tài khoản?' : "Don't have an account?"}{' '}
              <Link href="/auth/register" className="text-[#e8b64c] hover:text-[#ffdf9e] font-bold transition-colors">
                {locale === 'vi' ? 'Đăng ký' : 'Sign up'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
