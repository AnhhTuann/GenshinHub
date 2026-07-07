"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { useUser } from '@/context/UserContext';
import { Loader2, Mail, Lock, User, UserPlus } from 'lucide-react';
import FallbackImage from '@/components/ui/FallbackImage';

export default function RegisterPage() {
  const router = useRouter();
  const t = useTranslations('Common');
  const { refreshUser } = useUser();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    gender: 'male', // default
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      await refreshUser();
      toast.success('Account created successfully!');
      router.push('/profile');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-64px)] flex items-center justify-center p-4 pt-12 pb-24">
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
              Join Teyvat
            </h1>
            <p className="text-white/40 text-sm">Create your GenshinHub traveler profile</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Gender Selection */}
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-3 text-center">Choose your Traveler</label>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: 'male' })}
                  className={`relative overflow-hidden rounded-2xl border-2 transition-all ${
                    formData.gender === 'male' ? 'border-[#c8a84b] scale-[1.02] bg-[#c8a84b]/10' : 'border-white/10 bg-white/5 opacity-60 hover:opacity-100 hover:border-white/30'
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
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: 'female' })}
                  className={`relative overflow-hidden rounded-2xl border-2 transition-all ${
                    formData.gender === 'female' ? 'border-[#c8a84b] scale-[1.02] bg-[#c8a84b]/10' : 'border-white/10 bg-white/5 opacity-60 hover:opacity-100 hover:border-white/30'
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
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2 ml-1 mt-6">Username</label>
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
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
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
  );
}
