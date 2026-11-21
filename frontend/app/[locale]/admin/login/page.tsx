"use client";
import { useState, useTransition } from 'react';
import { loginAdmin } from '@/lib/adminAuth';
import { LoaderCircle, Shield } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) ?? 'vi';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    startTransition(async () => {
      const result = await loginAdmin(password);
      if (result.error) {
        setError(result.error);
      } else {
        router.push(`/${locale}/admin`);
        router.refresh();
      }
    });
  };

  return (
    <div className="grid min-h-[calc(100svh-11rem)] place-items-center px-3 py-8">
      <section className="atlas-surface w-full max-w-md p-5 sm:p-8" aria-labelledby="admin-access-title">
        <header className="mb-6">
          <span className="atlas-quick-icon mb-4"><Shield size={24} aria-hidden="true" /></span>
          <h1 id="admin-access-title" className="atlas-section-title">Admin Access</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">GenshinHub control panel</p>
        </header>

        <form onSubmit={handleSubmit} aria-busy={isPending} className="fantasy-auth-form grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="admin-password" className="text-sm font-semibold">Admin Password</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'admin-access-error' : undefined}
              className="min-h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2.5"
            />
            {error && <p id="admin-access-error" role="alert" className="text-sm text-red-300">{error}</p>}
          </div>

          <button type="submit" disabled={isPending || !password}
            className="atlas-auth-submit flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 font-bold disabled:cursor-not-allowed disabled:opacity-65">
            {isPending ? <><LoaderCircle size={18} className="motion-safe:animate-spin" aria-hidden="true" />Verifying…</> : 'Enter Admin Panel'}
          </button>
        </form>
        <p className="mt-5 text-sm text-[var(--text-secondary)]">Access is limited to authorized administrators.</p>
      </section>
    </div>
  );
}
