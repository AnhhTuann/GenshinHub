'use client';

import React, { useMemo, useState, useEffect } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import { Link } from '@/i18n/routing';
import { CharacterData } from '@/types/character';
import { motion, useReducedMotion } from 'framer-motion';

interface UpcomingBirthdaysProps {
  characters: CharacterData[];
  locale: string;
}

const EL_COLOR: Record<string, string> = {
  Pyro: '#ff6b4a', Hydro: '#4fc3f7', Cryo: '#80deea',
  Electro: '#ce93d8', Anemo: '#4db6ac', Geo: '#ffd54f', Dendro: '#aed581',
};

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function UpcomingBirthdays({ characters, locale }: UpcomingBirthdaysProps) {
  const [isMounted, setIsMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  useEffect(() => { setIsMounted(true); }, []);

  const upcoming = useMemo(() => {
    if (!isMounted) return [];
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    return characters
      .filter(c => c.birthday)
      .map(c => {
        const [monthStr, dayStr] = c.birthday!.split('/');
        const month = parseInt(monthStr, 10);
        const day = parseInt(dayStr, 10);
        const isToday = month === currentMonth && day === currentDay;

        let sortScore = 0;
        if (isToday) sortScore = 0;
        else if (month === currentMonth && day > currentDay) sortScore = day - currentDay;
        else if (month > currentMonth) sortScore = (month - currentMonth) * 31 + day;
        else sortScore = (12 - currentMonth + month) * 31 + day;

        return { ...c, bMonth: month, bDay: day, sortScore, isToday };
      })
      .sort((a, b) => a.sortScore - b.sortScore)
      .slice(0, 8);
  }, [characters, isMounted]);

  if (!isMounted || upcoming.length === 0) return null;

  const hasToday = upcoming.some(c => c.isToday);

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        minHeight: '200px',
        background: 'linear-gradient(145deg, rgba(13,13,22,0.90), rgba(6,6,12,0.95))',
        border: hasToday ? '1px solid rgba(251,191,36,0.25)' : '1px solid rgba(255,255,255,0.06)',
        boxShadow: hasToday ? '0 0 30px -10px rgba(251,191,36,0.15)' : 'none',
      }}
      className="rounded-2xl p-4 relative overflow-hidden"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: hasToday
            ? 'linear-gradient(90deg, transparent, rgba(251,191,36,0.7), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg leading-none">🎂</span>
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">
            Upcoming Birthdays
          </span>
          {hasToday && (
            <span
              className="ml-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider"
              style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}
            >
              🎉 Today!
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {upcoming.map((char, idx) => {
          const elColor = EL_COLOR[char.element] ?? '#c8a84b';
          const name = locale === 'en' ? char.nameEn : char.nameVi;
          return (
            <motion.div
              key={char.id}
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04, ease: 'backOut' }}
            >
              <Link
                href={`/characters/${char.id}`}
                className="group flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
              >
                {/* Avatar */}
                <div
                  className={`relative w-full aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                    char.isToday
                      ? 'shadow-[0_0_16px_rgba(251,191,36,0.35)]'
                      : 'group-hover:shadow-[0_0_12px_rgba(255,255,255,0.08)]'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${elColor}25, #0d0d14)`,
                    border: char.isToday
                      ? '1.5px solid rgba(251,191,36,0.55)'
                      : `1px solid ${elColor}25`,
                  }}
                >
                  <FallbackImage
                    src={char.avatarUrl}
                    alt={name}
                    fill
                    className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                  {/* Element badge */}
                  <div
                    className="absolute top-0.5 left-0.5 w-4 h-4 rounded-md overflow-hidden"
                    style={{ background: `${elColor}30`, border: `1px solid ${elColor}40` }}
                  >
                    <FallbackImage
                      src={`/assets/elements/${char.element.toLowerCase()}.webp`}
                      alt={char.element}
                      fill
                      className="object-contain p-[1px]"
                      unoptimized
                    />
                  </div>
                  {/* Today indicator */}
                  {char.isToday && (
                    <div className="absolute bottom-0 left-0 right-0 py-0.5 text-center text-[7px] font-black uppercase tracking-wider"
                      style={{ background: 'linear-gradient(to right, #f59e0b, #fbbf24)', color: '#000' }}>
                      🎂 Today
                    </div>
                  )}
                </div>

                {/* Name */}
                <span className="text-[8px] font-bold text-white/50 group-hover:text-white/80 transition-colors text-center leading-tight truncate w-full">
                  {name.split(' ').slice(-1)[0]}
                </span>

                {/* Date */}
                <span
                  className="text-[9px] font-black tabular-nums"
                  style={{ color: char.isToday ? '#fbbf24' : 'rgba(255,255,255,0.3)' }}
                >
                  {MONTHS[char.bMonth - 1]} {char.bDay}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
