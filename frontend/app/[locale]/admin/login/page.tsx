"use client";
import { Suspense, useState, useTransition } from 'react';
import { loginAdmin } from '@/lib/adminAuth';
import { Eye, EyeOff, LoaderCircle, Shield } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';

const COPY = {
  en: {
    title: 'Admin sign in',
    subtitle: 'GenshinHub control panel',
    username: 'Admin username',
    password: 'Admin password',
    show: 'Show password',
    hide: 'Hide password',
    submit: 'Enter Admin Panel',
    verifying: 'Verifying…',
    expired: 'Your Admin session expired. Please sign in again.',
    denied: 'This customer account does not have Admin access.',
    note: 'Access is limited to authorized administrators.',
    fail: 'Admin sign-in failed.',
  },
  vi: {
    title: 'Đăng nhập Admin',
    subtitle: 'Bảng điều khiển GenshinHub',
    username: 'Tên đăng nhập Admin',
    password: 'Mật khẩu Admin',
    show: 'Hiện mật khẩu',
    hide: 'Ẩn mật khẩu',
    submit: 'Vào bảng Admin',
    verifying: 'Đang xác thực…',
    expired: 'Phiên Admin đã hết hạn. Vui lòng đăng nhập lại.',
    denied: 'Tài khoản này không có quyền truy cập Admin.',
    note: 'Chỉ quản trị viên được phép truy cập.',
    fail: 'Đăng nhập Admin thất bại.',
  },
} as const;

function AdminLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const searchParams = useSearchParams();
  const rawLocale = (params?.locale as string) ?? 'en';
  const locale: 'en' | 'vi' = rawLocale === 'vi' ? 'vi' : 'en';
  const copy = COPY[locale];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    startTransition(async () => {
      const result = await loginAdmin(username, password, locale);
      if (result.error) {
        setError(result.error);
      } else {
        // A full navigation avoids an RSC prefetch of this login route, whose
        // middleware redirect can otherwise be cross-origin in local dev.
        window.location.assign(`/${locale}/admin`);
      }
    });
  };

  return (
    <div className="grid min-h-[calc(100svh-11rem)] place-items-center px-3 py-8">
      <section className="atlas-surface w-full max-w-md p-5 sm:p-8" aria-labelledby="admin-access-title">
        <header className="mb-6">
          <span className="atlas-quick-icon mb-4"><Shield size={24} aria-hidden="true" /></span>
          <h1 id="admin-access-title" className="atlas-section-title">{copy.title}</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">{copy.subtitle}</p>
        </header>

        {searchParams.get('expired') === '1' && (
          <p role="status" className="mb-4 rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-sm text-amber-200">
            {copy.expired}
          </p>
        )}

        {searchParams.get('denied') === '1' && (
          <p role="status" className="mb-4 rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-sm text-amber-200">
            {copy.denied}
          </p>
        )}

        <form onSubmit={handleSubmit} aria-busy={isPending} className="fantasy-auth-form grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="admin-username" className="text-sm font-semibold">{copy.username}</label>
            <input
              id="admin-username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={event => setUsername(event.target.value)}
              aria-invalid={Boolean(error)}
              className="min-h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2.5"
              required
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="admin-password" className="text-sm font-semibold">{copy.password}</label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'admin-access-error' : undefined}
                className="min-h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2.5 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(value => !value)}
                aria-label={showPassword ? copy.hide : copy.show}
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-[var(--text-secondary)]"
              >
                {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
              </button>
            </div>
            {error && <p id="admin-access-error" role="alert" className="text-sm text-red-300">{error}</p>}
          </div>

          <button type="submit" disabled={isPending || !username || !password}
            className="atlas-auth-submit flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 font-bold disabled:cursor-not-allowed disabled:opacity-65">
            {isPending ? <><LoaderCircle size={18} className="motion-safe:animate-spin" aria-hidden="true" />{copy.verifying}</> : copy.submit}
          </button>
        </form>
        <p className="mt-5 text-sm text-[var(--text-secondary)]">{copy.note}</p>
      </section>
    </div>
  );
}

export default function AdminLoginPage() {
  return <Suspense fallback={null}><AdminLoginForm /></Suspense>;
}
