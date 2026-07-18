"use client";

import { useUser } from '@/context/UserContext';
import { useRouter } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Loader2, Save, User as UserIcon, AtSign, ChevronLeft, Lock, Mail, KeyRound, ArrowRight, ShieldCheck, Eye, EyeOff, AlignLeft, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const { user, setUser, logout, loading: userLoading } = useUser();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'email' | 'danger'>('profile');
  const [loading, setLoading] = useState(false);

  // Password visibility
  const [showOldPw, setShowOldPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  // Forms
  const [profileForm, setProfileForm] = useState({ username: '', displayName: '', bio: '' });
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
        bio: (user as any).bio || '',
      });
      setEmailForm(prev => ({ ...prev, newEmail: user.email || '' }));
    }
  }, [user]);

  // Redirect if not logged in (useEffect, not render)
  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/auth/login');
    }
  }, [userLoading, user, router]);

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

  if (!user) return null;

  // Password strength
  const getPwStrength = (pw: string) => {
    let s = 0;
    if (pw.length >= 6) s++;
    if (pw.length >= 10) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    const labels = ['', 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
    const colors = ['', '#ef4444', '#f97316', '#eab308', '#22c55e', '#c8a84b'];
    return { score: s, label: labels[s] || '', color: colors[s] || '' };
  };
  const pwStrength = getPwStrength(passwordForm.newPassword);

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
    if (passwordForm.newPassword.length < 6) {
      return toast.error('Password must be at least 6 characters');
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

      toast.success('Password changed! Please log in again.');
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });

      // Force logout after short delay
      setTimeout(() => logout(), 1500);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Email Submit ---
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
      setCountdown(60);
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

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c8a84b] transition-colors";
  const labelClass = "text-xs font-bold text-white/60 uppercase tracking-widest";
  const submitBtnClass = "px-8 py-4 rounded-xl bg-[#c8a84b] text-black font-black uppercase tracking-widest text-sm hover:bg-[#d4b455] transition-all disabled:opacity-50 flex items-center gap-3";

  const sidebarItems = [
    { id: 'profile', label: 'Profile Details', icon: <UserIcon className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Lock className="w-4 h-4" /> },
    { id: 'email', label: 'Email Address', icon: <Mail className="w-4 h-4" /> },
    { id: 'danger', label: 'Account', icon: <LogOut className="w-4 h-4" /> },
  ];

  return (
    <main className="min-h-[calc(100vh-64px)] p-4 md:p-8 flex justify-center items-start pt-12 md:pt-24 relative">
      {/* Ambient bg */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(200,168,75,0.1) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

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
            {sidebarItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  item.id === 'danger'
                    ? activeTab === 'danger'
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : 'text-red-500/60 hover:text-red-400 hover:bg-red-500/5 border border-transparent'
                    : activeTab === item.id
                      ? 'bg-[#c8a84b]/10 text-[#f0d080] border border-[#c8a84b]/20'
                      : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[#0a0a0f] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c8a84b]/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2" />

          <div className="relative">

            {/* ── Profile Details ── */}
            {activeTab === 'profile' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h1 className="text-2xl font-black uppercase tracking-widest text-[#f0d080] mb-8 font-[family-name:var(--font-cinzel)] border-b border-white/10 pb-4">
                  Profile Details
                </h1>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className={labelClass}>Username</label>
                    <div className="relative">
                      <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="text"
                        value={profileForm.username}
                        onChange={e => setProfileForm({ ...profileForm, username: e.target.value })}
                        className={inputClass}
                        required
                        minLength={3}
                        maxLength={20}
                        pattern="[a-zA-Z0-9_]+"
                      />
                    </div>
                    <p className="text-[10px] text-white/30">Only letters, numbers, and underscores. Used for logging in.</p>
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Display Name</label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="text"
                        value={profileForm.displayName}
                        onChange={e => setProfileForm({ ...profileForm, displayName: e.target.value })}
                        className={inputClass}
                        placeholder="What should we call you?"
                        maxLength={50}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Bio</label>
                    <div className="relative">
                      <AlignLeft className="absolute left-4 top-4 w-5 h-5 text-white/30" />
                      <textarea
                        value={profileForm.bio}
                        onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c8a84b] transition-colors resize-none"
                        placeholder="Tell the world about your Genshin journey..."
                        rows={3}
                        maxLength={200}
                      />
                      <p className="text-[10px] text-white/30 text-right">{profileForm.bio.length}/200</p>
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button type="submit" disabled={loading} className={submitBtnClass}>
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Save Changes</>}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── Security ── */}
            {activeTab === 'security' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h1 className="text-2xl font-black uppercase tracking-widest text-[#f0d080] mb-8 font-[family-name:var(--font-cinzel)] border-b border-white/10 pb-4">
                  Security
                </h1>
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className={labelClass}>Current Password</label>
                    <div className="relative">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type={showOldPw ? 'text' : 'password'}
                        value={passwordForm.oldPassword}
                        onChange={e => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                        className={inputClass + ' pr-12'}
                        required
                      />
                      <button type="button" tabIndex={-1} onClick={() => setShowOldPw(!showOldPw)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                        {showOldPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type={showNewPw ? 'text' : 'password'}
                        value={passwordForm.newPassword}
                        onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        className={inputClass + ' pr-12'}
                        required minLength={6}
                      />
                      <button type="button" tabIndex={-1} onClick={() => setShowNewPw(!showNewPw)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                        {showNewPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {passwordForm.newPassword.length > 0 && (
                      <div className="space-y-1">
                        <div className="flex gap-1">
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                              style={{ backgroundColor: i <= pwStrength.score ? pwStrength.color : 'rgba(255,255,255,0.1)' }} />
                          ))}
                        </div>
                        <p className="text-[10px]" style={{ color: pwStrength.color }}>{pwStrength.label}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Confirm New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type={showConfirmPw ? 'text' : 'password'}
                        value={passwordForm.confirmPassword}
                        onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        className={`${inputClass} pr-12 ${
                          passwordForm.confirmPassword.length > 0
                            ? passwordForm.newPassword === passwordForm.confirmPassword
                              ? 'border-green-500/50'
                              : 'border-red-500/50'
                            : ''
                        }`}
                        required minLength={6}
                      />
                      <button type="button" tabIndex={-1} onClick={() => setShowConfirmPw(!showConfirmPw)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                        {showConfirmPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {passwordForm.confirmPassword.length > 0 && passwordForm.newPassword !== passwordForm.confirmPassword && (
                      <p className="text-[10px] text-red-400">Passwords do not match</p>
                    )}
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button type="submit" disabled={loading} className={submitBtnClass}>
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShieldCheck className="w-5 h-5" /> Update Password</>}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── Email Address ── */}
            {activeTab === 'email' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h1 className="text-2xl font-black uppercase tracking-widest text-[#f0d080] mb-8 font-[family-name:var(--font-cinzel)] border-b border-white/10 pb-4">
                  Email Address
                </h1>

                {!otpSent ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className={labelClass}>Current Email</label>
                      <div className="px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white/50 flex items-center gap-3">
                        <Mail className="w-5 h-5" />
                        {user.email}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className={labelClass}>New Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input
                          type="email"
                          value={emailForm.newEmail}
                          onChange={e => setEmailForm({ ...emailForm, newEmail: e.target.value })}
                          className={inputClass}
                          required
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        onClick={handleRequestOtp}
                        disabled={loading || !emailForm.newEmail || emailForm.newEmail === user.email || countdown > 0}
                        className={submitBtnClass}
                      >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : countdown > 0 ? `Wait ${countdown}s` : <><ArrowRight className="w-5 h-5" /> Send Verification Code</>}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="bg-[#c8a84b]/10 border border-[#c8a84b]/20 rounded-xl p-4 mb-6">
                      <p className="text-sm text-[#f0d080]">We&apos;ve sent a 6-digit code to <strong>{emailForm.newEmail}</strong>.</p>
                    </div>

                    <div className="space-y-2">
                      <label className={labelClass}>Verification Code</label>
                      <div className="relative">
                        <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input
                          type="text"
                          value={emailForm.otp}
                          onChange={e => setEmailForm({ ...emailForm, otp: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                          className={`${inputClass} tracking-[0.5em] font-mono text-lg text-center`}
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

                      <button type="submit" disabled={loading || emailForm.otp.length < 6} className={submitBtnClass}>
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShieldCheck className="w-5 h-5" /> Verify & Save</>}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* ── Danger Zone / Account ── */}
            {activeTab === 'danger' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h1 className="text-2xl font-black uppercase tracking-widest text-red-400 mb-8 font-[family-name:var(--font-cinzel)] border-b border-red-500/20 pb-4">
                  Account
                </h1>

                <div className="space-y-4">
                  {/* Logout */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-black text-white uppercase tracking-widest text-sm mb-1">Log Out</h3>
                      <p className="text-white/40 text-xs">Sign out of your GenshinHub account on this device.</p>
                    </div>
                    <button
                      onClick={logout}
                      className="shrink-0 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-bold uppercase tracking-wider text-xs transition-all text-white flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>

                  {/* Account Info */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                    <h3 className="font-black text-white/60 uppercase tracking-widest text-xs mb-3">Account Info</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center py-1 border-b border-white/5">
                        <span className="text-white/40">Username</span>
                        <span className="text-white font-medium">@{user.username}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-white/5">
                        <span className="text-white/40">Email</span>
                        <span className="text-white font-medium">{user.email}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-white/40">Traveler</span>
                        <span className="text-white font-medium capitalize">{user.gender}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
