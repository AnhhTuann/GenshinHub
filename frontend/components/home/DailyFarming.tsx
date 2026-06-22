'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getFarmingDataForDay, DailyDomain } from '@/data/dailyFarming';
import { Link } from '@/i18n/routing';

interface DailyFarmingProps {
  locale: string;
}

const DAYS = [
  { label: 'Sun', full: 'Sunday' },
  { label: 'Mon', full: 'Monday' },
  { label: 'Tue', full: 'Tuesday' },
  { label: 'Wed', full: 'Wednesday' },
  { label: 'Thu', full: 'Thursday' },
  { label: 'Fri', full: 'Friday' },
  { label: 'Sat', full: 'Saturday' },
];

export default function DailyFarming({ locale }: DailyFarmingProps) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [data, setData] = useState<DailyDomain[] | null>(null);
  const [todayIdx, setTodayIdx] = useState(1);

  useEffect(() => {
    const now = new Date();
    const serverTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3600000 * 8));
    if (serverTime.getHours() < 4) serverTime.setDate(serverTime.getDate() - 1);
    const day = serverTime.getDay();
    setSelectedDay(day);
    setTodayIdx(day);
  }, []);

  useEffect(() => {
    setData(getFarmingDataForDay(selectedDay));
  }, [selectedDay]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-[3px] h-5 rounded-full bg-yellow-400 shrink-0" />
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">Daily Farming</span>
        </div>

        {/* Day selector pills */}
        <div className="flex gap-1 bg-black/30 p-0.5 rounded-xl border border-white/[0.05]">
          {DAYS.map((day, idx) => {
            const isToday = idx === todayIdx;
            const isActive = idx === selectedDay;
            return (
              <button
                key={idx}
                onClick={() => setSelectedDay(idx)}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-200 relative ${
                  isActive
                    ? 'bg-yellow-400/15 text-yellow-400 shadow-sm'
                    : 'text-white/30 hover:text-white/60 hover:bg-white/[0.04]'
                }`}
              >
                {day.label}
                {isToday && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-yellow-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {selectedDay === 0 ? (
        /* Sunday all-access */
        <div className="flex flex-col items-center justify-center py-10 text-center bg-gradient-to-br from-yellow-400/5 to-transparent border border-yellow-400/10 rounded-2xl">
          <span className="text-4xl mb-3">✨</span>
          <p className="text-white font-black text-lg text-gradient-gold mb-1">Sunday All-Access</p>
          <p className="text-white/50 text-sm max-w-xs">All domains are open today. Farm any material you need!</p>
        </div>
      ) : data ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {data.map((domain, idx) => (
            <div
              key={idx}
              className="bg-[#0d0d14]/80 border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.10] transition-colors"
            >
              {/* Domain header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.04] bg-black/20">
                <div className="relative w-7 h-7 shrink-0">
                  <Image src={domain.itemIcon} alt="domain item" fill className="object-contain drop-shadow-md" unoptimized />
                </div>
                <span className="font-bold text-[13px] text-white/80 truncate">{domain.domainName}</span>
              </div>

              {/* Items */}
              <div className="p-3 flex flex-wrap gap-2">
                {domain.characters.map(char => (
                  <Link href={`/characters/${char.id}`} key={char.id}>
                    <div className={`yatta-item yatta-item-${char.rarity}star`} title={char.name}>
                      <Image src={char.avatarUrl} alt={char.name} fill className="object-cover" unoptimized />
                      <div className="yatta-item-element">
                        <Image src={`/images/elements/${char.element.toLowerCase()}.png`} alt={char.element} fill className="object-contain" unoptimized />
                      </div>
                    </div>
                  </Link>
                ))}
                {domain.weapons.map(weapon => (
                  <div key={weapon.id} className={`yatta-item yatta-item-${weapon.rarity}star`} title={weapon.name}>
                    <Image src={weapon.iconUrl} alt={weapon.name} fill className="object-cover" unoptimized />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
