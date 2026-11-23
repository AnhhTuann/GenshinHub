"use client";

import { useState, useMemo } from 'react';
import { useRouter, Link } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useUser } from '@/context/UserContext';
import { Loader2, Mail, Lock, User, UserPlus, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import FallbackImage from '@/components/ui/FallbackImage';

// Password strength calculator
function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Very Weak', color: '#ef4444' };
  if (score === 2) return { score, label: 'Weak', color: '#ff9a4d' };
  if (score === 3) return { score, label: 'Fair', color: '#f2c14e' };
  if (score === 4) return { score, label: 'Strong', color: '#86a98f' };
  return { score, label: 'Very Strong', color: '#e8b64c' };
}

export default function RegisterPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) ?? 'vi';
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male' as 'male' | 'female',
  });

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch = formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword;
  const passwordsMismatch = formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error(locale === 'vi' ? 'Mật khẩu không khớp' : "Passwords don't match");
      return;
    }
    const strong = formData.password.length >= 8 && new TextEncoder().encode(formData.password).length <= 72
      && /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password)
      && /[0-9]/.test(formData.password) && /[^A-Za-z0-9]/.test(formData.password);
    if (!strong) {
      toast.error(locale === 'vi'
        ? 'Mật khẩu cần ít nhất 8 ký tự và tối đa 72 byte UTF-8, gồm chữ hoa, chữ thường, số và ký tự đặc biệt'
        : 'Use at least 8 characters and at most 72 UTF-8 bytes, with upper/lower case, a number, and a symbol');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setUser(data.user);
      toast.success(locale === 'vi' ? 'Đăng ký thành công!' : 'Registration successful!');
      router.push('/profile');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="relative flex-1 flex items-center justify-center p-4">

      <div className="w-full max-w-md">
        <div className="atlas-surface px-5 py-7 sm:p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[var(--accent-primary-dim)] text-[var(--accent-primary-light)] flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-7 h-7" />
            </div>
            <h1
              className="atlas-section-title mb-2"
            >
              {locale === 'vi' ? 'Tham gia Teyvat' : 'Join Teyvat'}
            </h1>
            <p className="text-white/40 text-sm">{locale === 'vi' ? 'Tạo hồ sơ Nhà Lữ Hành trên GenshinHub' : 'Create your GenshinHub traveler profile'}</p>
          </div>

          <form onSubmit={handleSubmit} aria-busy={loading} className="fantasy-auth-form space-y-4">

            {/* Gender / Traveler Selection */}
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-3 text-center">{locale === 'vi' ? 'Chọn Nhà Lữ Hành' : 'Choose your Traveler'}</label>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: 'male' })}
                  className={`relative overflow-hidden rounded-2xl border-2 transition-all ${
                    formData.gender === 'male' ? 'border-[#e8b64c] scale-[1.02] bg-[#e8b64c]/10 shadow-lg shadow-[#e8b64c]/10' : 'border-white/10 bg-white/5 opacity-60 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <div className="aspect-[3/4] relative">
                    <FallbackImage
                      src="/assets/characters/PlayerBoy/avatar.webp"
                      alt="Traveler (Boy)"
                      fill
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-center">
                      <span className="text-xs font-bold text-white">PlayerBoy</span>
                    </div>
                    {formData.gender === 'male' && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-5 h-5 text-[#e8b64c]" />
                      </div>
                    )}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: 'female' })}
                  className={`relative overflow-hidden rounded-2xl border-2 transition-all ${
                    formData.gender === 'female' ? 'border-[#e8b64c] scale-[1.02] bg-[#e8b64c]/10 shadow-lg shadow-[#e8b64c]/10' : 'border-white/10 bg-white/5 opacity-60 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <div className="aspect-[3/4] relative">
                    <FallbackImage
                      src="/assets/characters/PlayerGirl/avatar.webp"
                      alt="Traveler (Girl)"
                      fill
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-center">
                      <span className="text-xs font-bold text-white">PlayerGirl</span>
                    </div>
                    {formData.gender === 'female' && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-5 h-5 text-[#e8b64c]" />
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Username */}
            <div>
              <label htmlFor="register-username" className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2 ml-1 mt-4">{locale === 'vi' ? 'Tên đăng nhập' : 'Username'}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-white/30" />
                </div>
                <input
                  type="text"
                  required
                  id="register-username"
                  autoComplete="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#e8b64c]/50 focus:bg-white/10 transition-all"
                  placeholder="traveler123"
                  minLength={3}
                  maxLength={20}
                  pattern="[a-zA-Z0-9_]+"
                  title="Only letters, numbers, and underscores are allowed"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="register-email" className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/30" />
                </div>
                <input
                  type="email"
                  required
                  id="register-email"
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
              <label htmlFor="register-password" className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2 ml-1">{locale === 'vi' ? 'Mật khẩu' : 'Password'}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/30" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  id="register-password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-12 text-white placeholder-white/20 focus:outline-none focus:border-[#e8b64c]/50 focus:bg-white/10 transition-all"
                  placeholder="••••••••"
                  minLength={8}
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
              {/* Password Strength Indicator */}
              {formData.password.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: i <= passwordStrength.score ? passwordStrength.color : 'rgba(255,255,255,0.1)',
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] ml-1" style={{ color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="register-confirmPassword" className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2 ml-1">{locale === 'vi' ? 'Xác nhận mật khẩu' : 'Confirm Password'}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/30" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  id="register-confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full bg-white/5 border rounded-xl py-3 pl-11 pr-12 text-white placeholder-white/20 focus:outline-none focus:bg-white/10 transition-all ${
                    passwordsMatch ? 'border-green-500/50 focus:border-green-500' :
                    passwordsMismatch ? 'border-red-500/50 focus:border-red-500' :
                    'border-white/10 focus:border-[#e8b64c]/50'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white/60 transition-colors"
                  aria-label={showConfirmPassword
                    ? (locale === 'vi' ? 'Ẩn mật khẩu xác nhận' : 'Hide password confirmation')
                    : (locale === 'vi' ? 'Hiện mật khẩu xác nhận' : 'Show password confirmation')}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                {/* Match indicator */}
                {formData.confirmPassword.length > 0 && (
                  <div className="absolute inset-y-0 right-12 flex items-center">
                    {passwordsMatch
                      ? <CheckCircle2 className="h-4 w-4 text-green-500" />
                      : <XCircle className="h-4 w-4 text-red-500" />
                    }
                  </div>
                )}
              </div>
              {passwordsMismatch && (
                <p className="text-[10px] text-red-400 mt-1 ml-1">{locale === 'vi' ? 'Mật khẩu không khớp' : 'Passwords do not match'}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || passwordsMismatch}
              className="atlas-auth-submit w-full py-3.5 mt-6 rounded-xl font-bold uppercase tracking-widest text-sm transition-all relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><UserPlus className="w-4 h-4" /> {locale === 'vi' ? 'Tạo tài khoản' : 'Create account'}</>}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <p className="text-white/40 text-sm">
              {locale === 'vi' ? 'Đã có tài khoản?' : 'Already have an account?'}{' '}
              <Link href="/auth/login" className="text-[#e8b64c] hover:text-[#ffdf9e] font-bold transition-colors">
                {locale === 'vi' ? 'Đăng nhập' : 'Log in'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
