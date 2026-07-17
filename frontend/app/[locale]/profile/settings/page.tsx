"use client";

import { useUser } from '@/context/UserContext';
import { useRouter } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Loader2, Save, User as UserIcon, AtSign, ChevronLeft, Lock, Mail, KeyRound, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SettingsPage() {
  const { user, setUser, logout, loading: userLoading } = useUser();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'email'>('profile');
  const [loading, setLoading] = useState(false);
  
  // Forms
  const [profileForm, setProfileForm] = useState({ username: '', displayName: '' });
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [emailForm, setEmailForm] = useState({ newEmail: '', otp: '' });
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Initialize profile form when user data is loaded
  useEffect(() => {
    if (user) {
      setProfileForm({
        username: user.username || '',
        displayName: user.displayName || '',
      });
      setEmailForm(prev => ({ ...prev, newEmail: user.email || '' }));
    }
  }, [user]);

  // OTP Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  if (userLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#c8a84b] animate-spin" />
      </div>
    );
  }

  if (!user) {
    if (typeof window !== 'undefined') router.push('/auth/login');
    return null;
  }

  // --- Profile Submit ---
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to update profile');

      setUser(result.user);
      toast.success('Profile updated successfully!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Password Submit ---
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return toast.error("New passwords don't match");
    }
    
    setLoading(true);
    try {
      const res = await fetch('/api/auth/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to change password');

      toast.success('Password changed successfully! Please log in again.');
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      
      // Force logout
      setTimeout(() => logout(), 1500);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Email Submit (Request OTP & Verify) ---
  const handleRequestOtp = async () => {
    if (!emailForm.newEmail || emailForm.newEmail === user.email) {
      return toast.error('Please enter a different email');
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'REQUEST_OTP', newEmail: emailForm.newEmail }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to request OTP');

      toast.success('Verification code sent to your new email!');
      setOtpSent(true);
      setCountdown(60); // 60s cooldown
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailForm.otp) return toast.error('Please enter the OTP');

    setLoading(true);
    try {
      const res = await fetch('/api/auth/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'VERIFY_OTP', newEmail: emailForm.newEmail, otp: emailForm.otp }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to verify OTP');

      setUser(result.user);
      toast.success('Email updated successfully!');
      setOtpSent(false);
      setEmailForm(prev => ({ ...prev, otp: '' }));
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] p-4 md:p-8 flex justify-center items-start pt-12 md:pt-24">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <button 
            onClick={() => router.push('/profile')}
            className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Profile
          </button>

          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === 'profile' ? 'bg-[#c8a84b]/10 text-[#f0d080] border border-[#c8a84b]/20' : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <UserIcon className="w-4 h-4" /> Profile Details
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === 'security' ? 'bg-[#c8a84b]/10 text-[#f0d080] border border-[#c8a84b]/20' : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Lock className="w-4 h-4" /> Security
            </button>
            <button 
              onClick={() => setActiveTab('email')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === 'email' ? 'bg-[#c8a84b]/10 text-[#f0d080] border border-[#c8a84b]/20' : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Mail className="w-4 h-4" /> Email Address
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[#0a0a0f] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Ambient background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c8a84b]/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2" />

          <div className="relative">
            {activeTab === 'profile' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h1 className="text-2xl font-black uppercase tracking-widest text-[#f0d080] mb-8 font-[family-name:var(--font-cinzel)] border-b border-white/10 pb-4">
                  Profile Details
                </h1>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Username</label>
                    <div className="relative">
                      <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="text"
                        value={profileForm.username}
                        onChange={e => setProfileForm({ ...profileForm, username: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c8a84b] transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Display Name</label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="text"
                        value={profileForm.displayName}
                        onChange={e => setProfileForm({ ...profileForm, displayName: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c8a84b] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button type="submit" disabled={loading} className="px-8 py-4 rounded-xl bg-[#c8a84b] text-black font-black uppercase tracking-widest text-sm hover:bg-[#d4b455] transition-all disabled:opacity-50 flex items-center gap-3">
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Save Changes</>}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h1 className="text-2xl font-black uppercase tracking-widest text-[#f0d080] mb-8 font-[family-name:var(--font-cinzel)] border-b border-white/10 pb-4">
                  Security
                </h1>
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Current Password</label>
                    <div className="relative">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="password"
                        value={passwordForm.oldPassword}
                        onChange={e => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c8a84b] transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/60 uppercase tracking-widest">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c8a84b] transition-colors"
                        required minLength={6}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c8a84b] transition-colors"
                        required minLength={6}
                      />
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button type="submit" disabled={loading} className="px-8 py-4 rounded-xl bg-[#c8a84b] text-black font-black uppercase tracking-widest text-sm hover:bg-[#d4b455] transition-all disabled:opacity-50 flex items-center gap-3">
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShieldCheck className="w-5 h-5" /> Update Password</>}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h1 className="text-2xl font-black uppercase tracking-widest text-[#f0d080] mb-8 font-[family-name:var(--font-cinzel)] border-b border-white/10 pb-4">
                  Email Address
                </h1>

                {!otpSent ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Current Email</label>
                      <div className="px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white/50 flex items-center gap-3">
                        <Mail className="w-5 h-5" />
                        {user.email}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/60 uppercase tracking-widest">New Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input
                          type="email"
                          value={emailForm.newEmail}
                          onChange={e => setEmailForm({ ...emailForm, newEmail: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c8a84b] transition-colors"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <button 
                        onClick={handleRequestOtp} 
                        disabled={loading || !emailForm.newEmail || emailForm.newEmail === user.email || countdown > 0} 
                        className="px-8 py-4 rounded-xl bg-[#c8a84b] text-black font-black uppercase tracking-widest text-sm hover:bg-[#d4b455] transition-all disabled:opacity-50 flex items-center gap-3"
                      >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : countdown > 0 ? `Wait ${countdown}s` : <><ArrowRight className="w-5 h-5" /> Send Verification Code</>}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="bg-[#c8a84b]/10 border border-[#c8a84b]/20 rounded-xl p-4 mb-6">
                      <p className="text-sm text-[#f0d080]">We&apos;ve sent a 6-digit verification code to <strong>{emailForm.newEmail}</strong>.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Verification Code</label>
                      <div className="relative">
                        <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input
                          type="text"
                          value={emailForm.otp}
                          onChange={e => setEmailForm({ ...emailForm, otp: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c8a84b] transition-colors tracking-[0.5em] font-mono text-lg"
                          placeholder="000000"
                          maxLength={6}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-between items-center">
                      <button 
                        type="button"
                        onClick={handleRequestOtp}
                        disabled={loading || countdown > 0}
                        className="text-xs font-bold text-white/40 hover:text-white uppercase tracking-widest transition-colors disabled:opacity-50"
                      >
                        {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend Code'}
                      </button>

                      <button type="submit" disabled={loading || emailForm.otp.length < 6} className="px-8 py-4 rounded-xl bg-[#c8a84b] text-black font-black uppercase tracking-widest text-sm hover:bg-[#d4b455] transition-all disabled:opacity-50 flex items-center gap-3">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShieldCheck className="w-5 h-5" /> Verify & Save</>}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
