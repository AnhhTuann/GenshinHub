"use client";
import { useState, useTransition } from 'react';
import { loginAdmin } from '@/lib/adminAuth';
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
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--bg-void, #04040a)' }}
    >
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(200,168,75,0.08) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
      </div>

      <div
        className="w-full max-w-md rounded-3xl p-8"
        style={{
          background: 'rgba(8,8,18,0.90)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(200,168,75,0.15)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)',
        }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-4 text-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(200,168,75,0.15), rgba(8,8,18,0.9))',
              border: '1px solid rgba(200,168,75,0.25)',
              boxShadow: '0 0 30px rgba(200,168,75,0.12)',
            }}
          >
            🛡️
          </div>
          <h1
            className="text-2xl font-black uppercase tracking-[0.1em]"
            style={{
              fontFamily: 'var(--font-cinzel, Cinzel, serif)',
              background: 'linear-gradient(135deg, #f0d080, #c8a84b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Admin Access
          </h1>
          <p className="text-white/30 text-xs mt-1 font-medium tracking-wider">GENSHINHUB CONTROL PANEL</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-white/35">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoFocus
              className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none"
              style={{
                background: 'rgba(4,4,10,0.8)',
                border: error ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.9)',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(200,168,75,0.4)';
                e.target.style.boxShadow = '0 0 0 3px rgba(200,168,75,0.08)';
              }}
              onBlur={e => {
                e.target.style.borderColor = error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)';
                e.target.style.boxShadow = 'none';
              }}
            />
            {error && (
              <p className="text-red-400 text-xs font-medium flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending || !password}
            className="w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: isPending
                ? 'rgba(200,168,75,0.4)'
                : 'linear-gradient(135deg, #f0d080, #c8a84b)',
              color: '#080812',
              boxShadow: isPending ? 'none' : '0 6px 24px rgba(200,168,75,0.3)',
            }}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Verifying...
              </span>
            ) : '→  Enter Admin Panel'}
          </button>
        </form>

        <p className="text-center text-white/15 text-[10px] mt-6 font-medium tracking-wider">
          Unauthorized access is prohibited · GenshinHub Admin
        </p>
      </div>
    </div>
  );
}
