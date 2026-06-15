'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getTodayFarmingData, DailySchedule } from '@/data/dailyFarming';

interface DailyFarmingProps {
  locale: string;
}

export default function DailyFarming({ locale }: DailyFarmingProps) {
  const [schedule, setSchedule] = useState<DailySchedule | null>(null);
  const [isSunday, setIsSunday] = useState(false);

  useEffect(() => {
    // Determine the current farming data on the client side to match user's real time correctly
    const data = getTodayFarmingData();
    if (!data) {
      setIsSunday(true);
    } else {
      setSchedule(data);
    }
  }, []);

  return (
    <div className="glass-strong rounded-3xl p-5 border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all flex flex-col h-full">
      <div className="absolute -inset-24 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 -z-10 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-white/80 flex items-center gap-2">
          <span className="text-blue-400">⚔️</span> Today&apos;s Domains
        </h3>
      </div>
      
      {isSunday ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <span className="text-4xl mb-2">✨</span>
          <p className="text-white font-bold mb-1">Sunday All-Access</p>
          <p className="text-xs text-white/50">All Talent and Weapon Ascension materials are available today!</p>
        </div>
      ) : schedule ? (
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex flex-col gap-4">
            {schedule.domains.map((domain, idx) => (
              <div key={idx} className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col gap-2">
                <p className="text-[10px] font-black tracking-widest text-white/30 uppercase">{domain.region}</p>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/70">Talent</span>
                    <span className="text-sm font-bold text-amber-100">{locale === 'vi' ? domain.talentNameVi : domain.talentNameEn}</span>
                  </div>
                  <div className="h-px w-full bg-white/5" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/70">Weapon</span>
                    <span className="text-sm font-bold text-blue-100">{locale === 'vi' ? domain.weaponNameVi : domain.weaponNameEn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
        </div>
      )}
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
      `}</style>
    </div>
  );
}
