"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import toast from 'react-hot-toast';
import { Loader2, Mail, ArrowLeft, Send, KeyRound, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const params = useParams();
  const locale = (params?.locale as string) === 'vi' ? 'vi' : 'en';
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
        body: JSON.stringify({ email, locale }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || (locale === 'vi' ? 'Vui lòng thử lại sau.' : 'Please try again later.'));
      }

      // Always show success (anti-enumeration)
      setSent(true);
      startCountdown();
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
              {sent
                ? (locale === 'vi' ? 'Kiểm tra email' : 'Check your email')
                : (locale === 'vi' ? 'Quên mật khẩu' : 'Forgot password')}
            </h1>
            <p className="text-white/40 text-sm" role={sent ? 'status' : undefined}>
              {sent
                ? (locale === 'vi'
                  ? 'Nếu địa chỉ này đủ điều kiện và dịch vụ email khả dụng, bạn sẽ nhận được liên kết đặt lại mật khẩu.'
                  : 'If this address is eligible and email delivery is available, you’ll receive a reset link.')
                : (locale === 'vi' ? 'Nhập email để yêu cầu liên kết đặt lại mật khẩu.' : 'Enter your email to request a password reset link.')}
            </p>
          </div>

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="reset-request-email" className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2 ml-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/30" />
                  </div>
                  <input
                    id="reset-request-email"
                    autoComplete="email"
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
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> {locale === 'vi' ? 'Gửi liên kết' : 'Send reset link'}</>}
                </span>
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Info box */}
              <div className="bg-[#e8b64c]/10 border border-[#e8b64c]/20 rounded-xl p-4">
                <p className="text-sm text-[#ffdf9e] text-center">
                  {locale === 'vi' ? 'Liên kết có hiệu lực trong 15 phút.' : 'The link is valid for 15 minutes.'}
                </p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || countdown > 0}
                className="w-full py-2 text-sm text-white/40 hover:text-white disabled:opacity-30 transition-colors font-medium"
              >
                {countdown > 0
                  ? (locale === 'vi' ? `Gửi lại sau ${countdown} giây` : `Resend in ${countdown}s`)
                  : (locale === 'vi' ? 'Gửi lại liên kết' : 'Resend link')}
              </button>
            </div>
          )}

          <div className="mt-6 text-center border-t border-white/5 pt-6">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              {locale === 'vi' ? 'Quay lại đăng nhập' : 'Back to sign in'}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
