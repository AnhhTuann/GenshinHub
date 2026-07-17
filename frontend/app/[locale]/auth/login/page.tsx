"use client";

import { useState } from 'react';
import { useRouter, Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { useUser } from '@/context/UserContext';
import { Loader2, Mail, Lock } from 'lucide-react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations('Common');
  const { refreshUser, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  
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
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setUser(data.user);
      toast.success('Logged in successfully!');
      router.push('/profile');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string, token: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          token,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Social login failed');

      setUser(result.user);
      toast.success('Logged in successfully!');
      router.push('/profile');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    await handleSocialLogin('google', token);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'dummy-client-id'}>
    <main className="relative min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      {/* Ambient backgrounds */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full" 
             style={{ background: 'radial-gradient(ellipse, rgba(200,168,75,0.05) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      </div>

      <div className="w-full max-w-md">
        <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 
              className="text-3xl font-black uppercase tracking-widest mb-2"
              style={{
                fontFamily: 'var(--font-cinzel)',
                background: 'linear-gradient(135deg, #f0d080 0%, #c8a84b 60%, #8a6820 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome Back
            </h1>
            <p className="text-white/40 text-sm">Sign in to your GenshinHub account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/30" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c8a84b]/50 focus:bg-white/10 transition-all"
                  placeholder="traveler@teyvat.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/30" />
                </div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c8a84b]/50 focus:bg-white/10 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="w-4 h-4 rounded border-white/10 bg-white/5 text-[#c8a84b] focus:ring-[#c8a84b]/50 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-white/60 cursor-pointer select-none">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #c8a84b 0%, #8a6820 100%)',
                boxShadow: '0 4px 15px rgba(200,168,75,0.3)',
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative text-black flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Login'}
              </span>
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <span className="w-1/5 border-b border-white/10 lg:w-1/4"></span>
            <span className="text-xs text-center text-white/40 uppercase">Or login with</span>
            <span className="w-1/5 border-b border-white/10 lg:w-1/4"></span>
          </div>

          <div className="mt-6 flex gap-4">
            <div className="w-1/2">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error('Google login failed')}
                theme="filled_black"
                shape="rectangular"
                width="100%"
                text="signin_with"
              />
            </div>
            <div className="w-1/2">
              <FacebookLogin
                appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || 'dummy-app-id'}
                autoLoad={false}
                fields="name,email,picture"
                callback={(resp: any) => {
                  if (resp.accessToken) handleSocialLogin('facebook', resp.accessToken);
                  else toast.error('Facebook login failed');
                }}
                render={(renderProps: any) => (
                  <button
                    onClick={renderProps.onClick}
                    className="w-full h-[40px] flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#1864D9] text-white rounded-[4px] font-medium text-[14px] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                  </button>
                )}
              />
            </div>
          </div>

          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <p className="text-white/40 text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="text-[#c8a84b] hover:text-[#f0d080] font-bold transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
    </GoogleOAuthProvider>
  );
}
