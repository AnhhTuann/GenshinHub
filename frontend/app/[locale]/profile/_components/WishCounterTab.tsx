"use client";

import { User } from '@/context/UserContext';
import { PieChart, Info, History } from 'lucide-react';
import { useState } from 'react';

export default function WishCounterTab({ user }: { user: User }) {
  // Simulated data for demo
  const [stats] = useState({
    character: { pulls: 74, pity: 90, guaranteed: true },
    weapon: { pulls: 10, pity: 80, guaranteed: false },
    standard: { pulls: 45, pity: 90 },
    winRate: 65,
    totalPulls: 1250,
  });

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

        <div className="flex items-center justify-between mb-8 relative z-10">
          <h3 className="text-lg font-black uppercase tracking-widest text-[#f0d080] flex items-center gap-2">
            <History className="w-5 h-5" />
            Wish Statistics
          </h3>
          <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-colors">
            Import Data (Script)
          </button>
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
