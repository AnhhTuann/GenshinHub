"use client";

import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { fetchGraphQLClient } from '@/lib/graphql/client';
import toast from 'react-hot-toast';
import { Loader2, X, Save, User, AtSign, AlignLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface EditProfileModalProps {
  onClose: () => void;
}

export default function EditProfileModal({ onClose }: EditProfileModalProps) {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    displayName: user?.displayName || '',
    bio: (user as any)?.bio || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      // We need to read the token from cookie or let fetchGraphQLClient handle it if the backend relies on Authorization.
      // Wait, client-side fetchGraphQLClient doesn't send HttpOnly cookies to the GraphQL API.
      // BUT we created an API route /api/auth/me to handle this securely.
      // Let's create an API route /api/auth/profile to proxy this mutation securely.
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to update profile');

      toast.success('Profile updated successfully!');
      setUser(result.user);
      onClose();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="absolute inset-0"
        onClick={onClose}
      />
      
      <div className="relative bg-[#0a0a0f] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-black tracking-widest uppercase text-[#f0d080] font-[family-name:var(--font-cinzel)]">
            Edit Profile
          </h2>
          <button 
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Username</label>
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c8a84b] transition-colors"
                placeholder="Choose a username"
                required
              />
            </div>
            <p className="text-[10px] text-white/40">This is used for logging in.</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Display Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                value={formData.displayName}
                onChange={e => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c8a84b] transition-colors"
                placeholder="What should we call you?"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Bio</label>
            <div className="relative">
              <AlignLeft className="absolute left-3 top-3 w-4 h-4 text-white/30" />
              <textarea
                value={formData.bio}
                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c8a84b] transition-colors resize-none"
                placeholder="Tell the world about your Genshin journey..."
                rows={3}
                maxLength={200}
              />
              <p className="text-[10px] text-white/30 mt-1 text-right">{formData.bio.length}/200</p>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-white/10 text-white font-bold uppercase tracking-wider text-xs hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#c8a84b] text-black font-black uppercase tracking-wider text-xs hover:bg-[#d4b455] transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
