"use client";

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import toast from 'react-hot-toast';
import { Loader2, Mail, ArrowLeft, Send, KeyRound, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const startCountdown = () => {
    setCountdown(60);
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.status === 429) {
        throw new Error(data.error || 'Please wait before requesting again');
      }

      // Always show success (anti-enumeration)
      setSent(true);
      startCountdown();
      toast.success('If this email exists, a code has been sent!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-64px)] flex items-center justify-center p-4">

      <div className="w-full max-w-md">
        <div className="atlas-surface px-5 py-7 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transition-all duration-500 ${
              sent
                ? 'bg-gradient-to-br from-green-500 to-green-700 shadow-green-500/20'
                : 'bg-[var(--accent-primary-dim)] text-[var(--accent-primary-light)] shadow-[#e8b64c]/20'
            }`}>
              {sent ? <CheckCircle2 className="w-7 h-7 text-white" /> : <KeyRound className="w-7 h-7" />}
            </div>
            <h1
              className="atlas-section-title mb-2"
            >
              {sent ? 'Check your email' : 'Forgot Password'}
            </h1>
            <p className="text-white/40 text-sm">
              {sent
                ? `A verification code was sent to ${email}. Check your inbox.`
                : 'Enter your email and we\'ll send you a reset code.'
              }
            </p>
          </div>

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2 ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/30" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#e8b64c]/50 focus:bg-white/10 transition-all"
                    placeholder="traveler@teyvat.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !email}
                className="atlas-auth-submit w-full py-3.5 mt-2 rounded-xl font-bold uppercase tracking-widest text-sm transition-all relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Send Reset Code</>}
                </span>
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Info box */}
              <div className="bg-[#e8b64c]/10 border border-[#e8b64c]/20 rounded-xl p-4">
                <p className="text-sm text-[#ffdf9e] text-center">
                  The code is valid for <strong>10 minutes</strong>. Check your spam folder if you don&apos;t see it.
                </p>
              </div>

              <Link
                href={`/auth/reset-password?email=${encodeURIComponent(email)}`}
                className="atlas-auth-submit w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all relative overflow-hidden group flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span className="font-bold uppercase tracking-widest text-sm">Enter Reset Code</span>
              </Link>

              <button
                onClick={handleSubmit as any}
                disabled={loading || countdown > 0}
                className="w-full py-2 text-sm text-white/40 hover:text-white disabled:opacity-30 transition-colors font-medium"
              >
                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
              </button>
            </div>
          )}

          <div className="mt-6 text-center border-t border-white/5 pt-6">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
