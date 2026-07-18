"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, Link } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { Loader2, Lock, KeyRound, Eye, EyeOff, ArrowLeft, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { score, label: 'Very Weak', color: '#ef4444' };
  if (score === 2) return { score, label: 'Weak', color: '#f97316' };
  if (score === 3) return { score, label: 'Fair', color: '#eab308' };
  if (score === 4) return { score, label: 'Strong', color: '#22c55e' };
  return { score, label: 'Very Strong', color: '#c8a84b' };
}

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get('email') || '';

  const [formData, setFormData] = useState({
    email: emailFromUrl,
    otp: '',
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
      toast.error("Passwords don't match");
      return;
    }
    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (formData.otp.length !== 6) {
      toast.error('Please enter the 6-digit code');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to reset password');

      setSuccess(true);
      toast.success('Password reset successfully!');
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
        <h2 className="text-xl font-black text-white uppercase tracking-widest">Password Reset!</h2>
        <p className="text-white/50 text-sm">Redirecting you to login...</p>
        <Loader2 className="w-5 h-5 text-[#c8a84b] animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email (pre-filled, readonly) */}
      <div>
        <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2 ml-1">Email</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white/70 placeholder-white/20 focus:outline-none focus:border-[#c8a84b]/50 transition-all"
          placeholder="your@email.com"
        />
      </div>

      {/* OTP Code */}
      <div>
        <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2 ml-1">
          Verification Code
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <KeyRound className="h-5 w-5 text-white/30" />
          </div>
          <input
            type="text"
            required
            value={formData.otp}
            onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '').slice(0, 6) })}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c8a84b]/50 focus:bg-white/10 transition-all tracking-[0.5em] font-mono text-lg text-center"
            placeholder="000000"
            maxLength={6}
          />
        </div>
        <p className="text-[10px] text-white/30 mt-1 ml-1">Enter the 6-digit code sent to your email</p>
      </div>

      {/* New Password */}
      <div>
        <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2 ml-1">New Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-white/30" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-12 text-white placeholder-white/20 focus:outline-none focus:border-[#c8a84b]/50 focus:bg-white/10 transition-all"
            placeholder="••••••••"
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white/60 transition-colors"
            tabIndex={-1}
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
        <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2 ml-1">Confirm New Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-white/30" />
          </div>
          <input
            type={showConfirm ? 'text' : 'password'}
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className={`w-full bg-white/5 border rounded-xl py-3 pl-11 pr-12 text-white placeholder-white/20 focus:outline-none focus:bg-white/10 transition-all ${
              passwordsMatch ? 'border-green-500/50' :
              passwordsMismatch ? 'border-red-500/50' :
              'border-white/10 focus:border-[#c8a84b]/50'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white/60 transition-colors"
            tabIndex={-1}
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
          <p className="text-[10px] text-red-400 mt-1 ml-1">Passwords do not match</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || passwordsMismatch || formData.otp.length < 6}
        className="w-full py-3.5 mt-2 rounded-xl font-bold uppercase tracking-widest text-sm transition-all relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: 'linear-gradient(135deg, #c8a84b 0%, #8a6820 100%)',
          boxShadow: '0 4px 15px rgba(200,168,75,0.3)',
        }}
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        <span className="relative text-black flex items-center justify-center gap-2">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShieldCheck className="w-4 h-4" /> Reset Password</>}
        </span>
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="relative min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(200,168,75,0.06) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
      </div>

      <div className="w-full max-w-md">
        <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c8a84b] to-[#8a6820] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#c8a84b]/20">
              <ShieldCheck className="w-7 h-7 text-black" />
            </div>
            <h1
              className="text-2xl font-black uppercase tracking-widest mb-2"
              style={{
                fontFamily: 'var(--font-cinzel)',
                background: 'linear-gradient(135deg, #f0d080 0%, #c8a84b 60%, #8a6820 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Reset Password
            </h1>
            <p className="text-white/40 text-sm">Enter the code from your email and set a new password</p>
          </div>

          <Suspense fallback={<div className="flex justify-center py-8"><Loader2 className="w-8 h-8 text-[#c8a84b] animate-spin" /></div>}>
            <ResetPasswordForm />
          </Suspense>

          <div className="mt-6 text-center border-t border-white/5 pt-6">
            <Link
              href="/auth/forgot-password"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
