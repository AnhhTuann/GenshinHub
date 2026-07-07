"use client";

import { User, useUser } from '@/context/UserContext';
import { PieChart, Info, History, Link, Loader2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function WishCounterTab({ user }: { user: User }) {
  const { refreshUser } = useUser();
  const [urlInput, setUrlInput] = useState('');
  const [syncing, setSyncing] = useState(false);
  
  // Use DB stats if available, otherwise default to 0
  const stats = user.gachaStats || {
    character: { pulls: 0, pity: 90, guaranteed: false },
    weapon: { pulls: 0, pity: 80, guaranteed: false },
    standard: { pulls: 0, pity: 90 },
    winRate: 0,
    totalPulls: 0,
  };

  const handleSync = async () => {
    if (!urlInput.trim()) {
      toast.error('Vui lòng nhập URL Script!');
      return;
    }
    
    setSyncing(true);
    try {
      const res = await fetch('/api/auth/gacha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Sync failed');
      
      toast.success('Đồng bộ dữ liệu thành công!');
      setUrlInput('');
      await refreshUser(); // Fetch user again to get new gachaStats
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSyncing(false);
    }
  };

  const getProgressColor = (pulls: number, pity: number) => {
    const ratio = pulls / pity;
    if (ratio > 0.8) return '#ef4444'; // Red (Soft pity/Hard pity)
    if (ratio > 0.5) return '#f0d080'; // Yellow
    return '#4db6ac'; // Green
  };

  const CircularProgress = ({ pulls, pity, label, guaranteed }: any) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (pulls / pity) * circumference;
    const color = getProgressColor(pulls, pity);

    return (
      <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/5">
        <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r={radius}
              className="stroke-white/10"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke={color}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-black text-white" style={{ color }}>{pulls}</span>
            <span className="text-[9px] font-bold text-white/40 uppercase">/ {pity}</span>
          </div>
        </div>
        <p className="text-xs font-bold text-white uppercase tracking-widest text-center">{label}</p>
        {guaranteed !== undefined && (
          <span className={`mt-2 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${guaranteed ? 'bg-[#c8a84b]/20 text-[#f0d080] border border-[#c8a84b]/30' : 'bg-white/10 text-white/60'}`}>
            {guaranteed ? 'Guaranteed' : '50/50'}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="bg-[#1a1a24] border border-[#c8a84b]/30 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <PieChart className="w-48 h-48 text-[#c8a84b]" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 relative z-10 gap-4">
          <h3 className="text-lg font-black uppercase tracking-widest text-[#f0d080] flex items-center gap-2">
            <History className="w-5 h-5" />
            Wish Statistics
          </h3>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Paste Gacha URL script here..."
                className="w-full bg-black/50 border border-white/20 rounded-xl pl-9 pr-4 py-2 text-white text-sm focus:border-[#c8a84b] outline-none transition-colors"
                disabled={syncing}
              />
            </div>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="px-4 py-2 rounded-xl bg-[#c8a84b] hover:bg-[#f0d080] text-black text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
            >
              {syncing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sync'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <CircularProgress pulls={stats.character.pulls} pity={stats.character.pity} label="Character Banner" guaranteed={stats.character.guaranteed} />
          <CircularProgress pulls={stats.weapon.pulls} pity={stats.weapon.pity} label="Weapon Banner" guaranteed={stats.weapon.guaranteed} />
          <CircularProgress pulls={stats.standard.pulls} pity={stats.standard.pity} label="Standard Banner" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 relative z-10">
          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Total Pulls</p>
            <p className="text-2xl font-black text-white">{stats.totalPulls.toLocaleString()}</p>
          </div>
          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">50/50 Win Rate</p>
            <p className="text-2xl font-black text-[#4db6ac]">{stats.winRate}%</p>
          </div>
          <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex flex-col justify-center">
            <p className="text-xs text-white/60 italic flex items-center gap-2">
              <Info className="w-4 h-4 text-[#f0d080]" />
              Data last updated: Today
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
