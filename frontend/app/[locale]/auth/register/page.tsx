"use client";

import { useState, useMemo } from 'react';
import { useRouter, Link } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useUser } from '@/context/UserContext';
import { Loader2, Mail, Lock, User, UserPlus, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import FallbackImage from '@/components/ui/FallbackImage';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// Password strength calculator
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
      toast.error("Passwords don't match");
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...payload } = formData;
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setUser(data.user);
      toast.success('Registration successful!');
      window.location.href = `/${locale}/profile`;
    } catch (err: any) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string, token: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, token, gender: formData.gender }),
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
    await handleSocialLogin('google', credentialResponse.credential);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'dummy-client-id'}>
    <main className="relative min-h-[calc(100vh-64px)] flex items-center justify-center p-4 pt-12 pb-24">
      {/* Ambient backgrounds */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full"
             style={{ background: 'radial-gradient(ellipse, rgba(200,168,75,0.07) 0%, transparent 70%)', filter: 'blur(100px)' }} />
        <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] rounded-full"
             style={{ background: 'radial-gradient(ellipse, rgba(100,150,250,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div className="w-full max-w-md">
        <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c8a84b] to-[#8a6820] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#c8a84b]/20">
              <UserPlus className="w-7 h-7 text-black" />
            </div>
            <h1
              className="text-3xl font-black uppercase tracking-widest mb-2"
              style={{
                fontFamily: 'var(--font-cinzel)',
                background: 'linear-gradient(135deg, #f0d080 0%, #c8a84b 60%, #8a6820 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Join Teyvat
            </h1>
            <p className="text-white/40 text-sm">Create your GenshinHub traveler profile</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Gender / Traveler Selection */}
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-3 text-center">Choose your Traveler</label>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: 'male' })}
                  className={`relative overflow-hidden rounded-2xl border-2 transition-all ${
                    formData.gender === 'male' ? 'border-[#c8a84b] scale-[1.02] bg-[#c8a84b]/10 shadow-lg shadow-[#c8a84b]/10' : 'border-white/10 bg-white/5 opacity-60 hover:opacity-100 hover:border-white/30'
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
                        <CheckCircle2 className="w-5 h-5 text-[#c8a84b]" />
                      </div>
                    )}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: 'female' })}
                  className={`relative overflow-hidden rounded-2xl border-2 transition-all ${
                    formData.gender === 'female' ? 'border-[#c8a84b] scale-[1.02] bg-[#c8a84b]/10 shadow-lg shadow-[#c8a84b]/10' : 'border-white/10 bg-white/5 opacity-60 hover:opacity-100 hover:border-white/30'
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
                        <CheckCircle2 className="w-5 h-5 text-[#c8a84b]" />
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2 ml-1 mt-4">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-white/30" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c8a84b]/50 focus:bg-white/10 transition-all"
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

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/30" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2 ml-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/30" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full bg-white/5 border rounded-xl py-3 pl-11 pr-12 text-white placeholder-white/20 focus:outline-none focus:bg-white/10 transition-all ${
                    passwordsMatch ? 'border-green-500/50 focus:border-green-500' :
                    passwordsMismatch ? 'border-red-500/50 focus:border-red-500' :
                    'border-white/10 focus:border-[#c8a84b]/50'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white/60 transition-colors"
                  tabIndex={-1}
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
                <p className="text-[10px] text-red-400 mt-1 ml-1">Passwords do not match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || passwordsMismatch}
              className="w-full py-3.5 mt-6 rounded-xl font-bold uppercase tracking-widest text-sm transition-all relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #c8a84b 0%, #8a6820 100%)',
                boxShadow: '0 4px 15px rgba(200,168,75,0.3)',
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative text-black flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><UserPlus className="w-4 h-4" /> Create Account</>}
              </span>
            </button>
          </form>

          {/* Social */}
          <div className="mt-6 flex items-center justify-between">
            <span className="w-1/5 border-b border-white/10 lg:w-1/4"></span>
            <span className="text-xs text-center text-white/40 uppercase">Or register with</span>
            <span className="w-1/5 border-b border-white/10 lg:w-1/4"></span>
          </div>

          <div className="mt-6 flex gap-4">
            <div className="w-1/2">
              {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID !== 'dummy-client-id' ? (
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error('Google login failed')}
                  theme="filled_black"
                  shape="rectangular"
                  width="100%"
                  text="signup_with"
                />
              ) : (
                <button
                  disabled
                  className="w-full h-[40px] flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white/30 rounded-lg text-sm cursor-not-allowed"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Google (N/A)
                </button>
              )}
            </div>
            <div className="w-1/2">
              <button
                disabled
                className="w-full h-[40px] flex items-center justify-center gap-2 bg-[#1877F2]/20 border border-[#1877F2]/30 text-[#1877F2]/50 rounded-lg text-sm cursor-not-allowed"
                title="Facebook login coming soon"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook (Soon)
              </button>
            </div>
          </div>

          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <p className="text-white/40 text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-[#c8a84b] hover:text-[#f0d080] font-bold transition-colors">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
    </GoogleOAuthProvider>
  );
}
