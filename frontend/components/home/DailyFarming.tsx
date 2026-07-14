'use client';

import React, { useEffect, useState } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import { getFarmingDataForDay, DailyDomain } from '@/data/dailyFarming';
import { Link } from '@/i18n/routing';
import { motion, useReducedMotion } from 'framer-motion';

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
  const shouldReduceMotion = useReducedMotion();

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
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ minHeight: '300px' }}
      className="flex flex-col gap-4 w-full"
    >
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-[3px] h-5 rounded-full shrink-0" style={{ background: 'linear-gradient(to bottom, #f0d080, #c8a84b)' }} />
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/50">Daily Farming</span>
        </div>

        {/* Day selector pills */}
        <div className="flex gap-0.5 bg-black/30 p-0.5 rounded-xl border border-white/[0.05]">
          {DAYS.map((day, idx) => {
            const isToday = idx === todayIdx;
            const isActive = idx === selectedDay;
            return (
              <button
                key={idx}
                onClick={() => setSelectedDay(idx)}
                className="px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-200 relative motion-safe:active:scale-95"
                style={{
                  background: isActive ? 'rgba(200,168,75,0.15)' : 'transparent',
                  color: isActive ? '#f0d080' : 'rgba(255,255,255,0.3)',
                  border: isActive ? '1px solid rgba(200,168,75,0.3)' : '1px solid transparent',
                }}
              >
                {day.label}
                {isToday && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: '#c8a84b', boxShadow: '0 0 5px rgba(200,168,75,0.7)' }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {selectedDay === 0 ? (
        /* Sunday all-access */
        <div
          className="flex flex-col items-center justify-center py-10 text-center rounded-2xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(200,168,75,0.07), rgba(240,208,128,0.04))',
            border: '1px solid rgba(200,168,75,0.18)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(200,168,75,0.08) 0%, transparent 60%)' }}
          />
          <span className="text-5xl mb-4 animate-bounce">✨</span>
          <p className="text-white font-black text-lg text-gradient-gold mb-1.5">Sunday All-Access</p>
          <p className="text-white/50 text-sm max-w-xs">All domains are open today. Farm any material you need!</p>
          <div className="flex gap-2 mt-4">
            {['🔥','💧','🌿','⚡','🌀','❄️','🪨'].map((el, i) => (
              <span key={i} className="text-lg animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>{el}</span>
            ))}
          </div>
        </div>
      ) : data ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {data.map((domain, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 group"
              style={{
                background: 'linear-gradient(145deg, rgba(13,13,22,0.85), rgba(6,6,12,0.95))',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Domain header */}
              <div
                className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.04] group-hover:border-white/[0.07] transition-colors"
                style={{ background: 'rgba(0,0,0,0.25)' }}
              >
                <div className="relative w-7 h-7 shrink-0">
                  <FallbackImage src={domain.itemIcon} alt="domain item" fill className="object-contain drop-shadow-md" unoptimized />
                </div>
                <span className="font-bold text-[13px] text-white/80 truncate">{domain.domainName}</span>
              </div>

              {/* Items */}
              <div className="p-3 flex flex-wrap gap-2">
                {domain.characters.map(char => (
                  <Link href={`/characters/${char.id}`} key={char.id}>
                    <div className={`yatta-item yatta-item-${char.rarity}star`} title={char.name}>
                      <FallbackImage src={char.avatarUrl} alt={char.name} fill className="object-cover" unoptimized />
                      <div className="yatta-item-element">
                        <FallbackImage src={`/assets/elements/${char.element.toLowerCase()}.webp`} alt={char.element} fill className="object-contain" unoptimized />
                      </div>
                    </div>
                  </Link>
                ))}
                {domain.weapons.map(weapon => (
                  <div key={weapon.id} className={`yatta-item yatta-item-${weapon.rarity}star`} title={weapon.name}>
                    <FallbackImage src={weapon.iconUrl} alt={weapon.name} fill className="object-cover" unoptimized />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </motion.div>
  );
}
