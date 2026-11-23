"use client";

import { useState, Suspense } from 'react';
import { useRouter, Link } from '@/i18n/routing';
import { useParams, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { Loader2, Lock, Eye, EyeOff, ArrowLeft, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';

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

function ResetPasswordForm() {
  const router = useRouter();
  const params = useParams();
  const locale: 'en' | 'vi' = (params?.locale as string) === 'vi' ? 'vi' : 'en';
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get('token') || '';

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordStrength = getPasswordStrength(formData.newPassword);
  const passwordsMatch = formData.confirmPassword.length > 0 && formData.newPassword === formData.confirmPassword;
  const passwordsMismatch = formData.confirmPassword.length > 0 && formData.newPassword !== formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error(locale === 'vi' ? 'Mật khẩu không khớp' : "Passwords don't match");
      return;
    }
    const strong = formData.newPassword.length >= 8 && new TextEncoder().encode(formData.newPassword).length <= 72
      && /[a-z]/.test(formData.newPassword) && /[A-Z]/.test(formData.newPassword)
      && /[0-9]/.test(formData.newPassword) && /[^A-Za-z0-9]/.test(formData.newPassword);
    if (!strong) {
      toast.error(locale === 'vi'
        ? 'Mật khẩu cần ít nhất 8 ký tự và tối đa 72 byte UTF-8, gồm chữ hoa, chữ thường, số và ký tự đặc biệt'
        : 'Use at least 8 characters and at most 72 UTF-8 bytes, with upper/lower case, a number, and a symbol');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: tokenFromUrl,
          newPassword: formData.newPassword,
          locale,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to reset password');

      setSuccess(true);
      toast.success(locale === 'vi' ? 'Đã đặt lại mật khẩu!' : 'Password reset successfully!');
      setTimeout(() => router.push('/auth/login'), 2500);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-4 py-4">
        <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>
        <h2 className="text-xl font-black text-white uppercase tracking-widest">{locale === 'vi' ? 'Đã đặt lại mật khẩu!' : 'Password Reset!'}</h2>
        <p className="text-white/50 text-sm">{locale === 'vi' ? 'Đang chuyển đến trang đăng nhập…' : 'Redirecting you to login...'}</p>
        <Loader2 className="w-5 h-5 text-[#e8b64c] animate-spin mx-auto" />
      </div>
    );
  }

  if (!tokenFromUrl) {
    return <p role="alert" className="text-center text-red-300">
      {locale === 'vi' ? 'Mở liên kết đặt lại từ email của bạn.' : 'Open the reset link from your email.'}
    </p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-busy={loading}>
      {/* New Password */}
      <div>
        <label htmlFor="new-password" className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2 ml-1">{locale === 'vi' ? 'Mật khẩu mới' : 'New Password'}</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-white/30" />
          </div>
          <input
            id="new-password"
            autoComplete="new-password"
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-12 text-white placeholder-white/20 focus:outline-none focus:border-[#e8b64c]/50 focus:bg-white/10 transition-all"
            placeholder="••••••••"
            minLength={8}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white/60 transition-colors"
            aria-label={showPassword ? (locale === 'vi' ? 'Ẩn mật khẩu' : 'Hide password') : (locale === 'vi' ? 'Hiện mật khẩu' : 'Show password')}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {formData.newPassword.length > 0 && (
          <div className="mt-2 space-y-1">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full transition-all duration-300"
                  style={{ backgroundColor: i <= passwordStrength.score ? passwordStrength.color : 'rgba(255,255,255,0.1)' }}
                />
              ))}
            </div>
            <p className="text-[10px] ml-1" style={{ color: passwordStrength.color }}>{passwordStrength.label}</p>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirm-new-password" className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2 ml-1">{locale === 'vi' ? 'Xác nhận mật khẩu mới' : 'Confirm New Password'}</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-white/30" />
          </div>
          <input
            id="confirm-new-password"
            autoComplete="new-password"
            type={showConfirm ? 'text' : 'password'}
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className={`w-full bg-white/5 border rounded-xl py-3 pl-11 pr-12 text-white placeholder-white/20 focus:outline-none focus:bg-white/10 transition-all ${
              passwordsMatch ? 'border-green-500/50' :
              passwordsMismatch ? 'border-red-500/50' :
              'border-white/10 focus:border-[#e8b64c]/50'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white/60 transition-colors"
            aria-label={showConfirm ? (locale === 'vi' ? 'Ẩn mật khẩu' : 'Hide password') : (locale === 'vi' ? 'Hiện mật khẩu' : 'Show password')}
          >
            {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
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
        disabled={loading || passwordsMismatch || formData.newPassword.length < 8 || !tokenFromUrl}
        className="atlas-auth-submit w-full py-3.5 mt-2 rounded-xl font-bold uppercase tracking-widest text-sm transition-all relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        <span className="relative flex items-center justify-center gap-2">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShieldCheck className="w-4 h-4" /> {locale === 'vi' ? 'Đặt lại mật khẩu' : 'Reset Password'}</>}
        </span>
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  const locale = useParams()?.locale;
  return (
    <main className="relative min-h-[calc(100vh-64px)] flex items-center justify-center p-4">

      <div className="w-full max-w-md">
        <div className="atlas-surface px-5 py-7 sm:p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[var(--accent-primary-dim)] text-[var(--accent-primary-light)] flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1
              className="atlas-section-title mb-2"
            >
              {locale === 'vi' ? 'Đặt lại mật khẩu' : 'Reset Password'}
            </h1>
            <p className="text-white/40 text-sm">{locale === 'vi' ? 'Đặt mật khẩu mới bằng liên kết trong email' : 'Enter the code from your email and set a new password'}</p>
          </div>

          <Suspense fallback={<div className="flex justify-center py-8"><Loader2 className="w-8 h-8 text-[#e8b64c] animate-spin" /></div>}>
            <ResetPasswordForm />
          </Suspense>

          <div className="mt-6 text-center border-t border-white/5 pt-6">
            <Link
              href="/auth/forgot-password"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              {locale === 'vi' ? 'Yêu cầu liên kết mới' : 'Back to Forgot Password'}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
