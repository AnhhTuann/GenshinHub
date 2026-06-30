'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
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
  const shouldReduceMotion = useReducedMotion();
  const upcoming = useMemo(() => {
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
  }, [characters]);

  if (upcoming.length === 0) return null;

  return (
    <motion.div 
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ minHeight: '200px' }} // CLS protection
      className="bg-[#0d0d14]/80 border border-white/[0.06] rounded-2xl p-4"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">🎂</span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Upcoming Birthdays</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {upcoming.map(char => {
          const elColor = EL_COLOR[char.element] ?? '#ffffff';
          const name = locale === 'en' ? char.nameEn : char.nameVi;
          return (
            <Link
              href={`/characters/${char.id}`}
              key={char.id}
              className="group flex flex-col items-center gap-1.5 motion-safe:active:scale-95 transition-transform"
            >
              {/* Avatar */}
              <div
                className={`relative w-full aspect-square rounded-xl overflow-hidden border transition-all duration-200 ${
                  char.isToday
                    ? 'border-yellow-400/50 shadow-[0_0_12px_rgba(251,191,36,0.25)]'
                    : 'border-white/[0.06] group-hover:border-white/20'
                }`}
                style={{ background: `linear-gradient(135deg, ${elColor}18, #0d0d14)` }}
              >
                <Image
                  src={char.avatarUrl}
                  alt={name}
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
                {/* Element badge */}
                <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded bg-black/40 p-0.5">
                  <Image
                    src={`/images/elements/${char.element.toLowerCase()}.png`}
                    alt={char.element}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                {/* Today indicator */}
                {char.isToday && (
                  <div className="absolute bottom-0 left-0 right-0 bg-yellow-400/80 text-black text-[7px] font-black text-center py-0.5 uppercase tracking-wider">
                    Today!
                  </div>
                )}
              </div>

              {/* Name */}
              <span className="text-[8px] font-bold text-white/50 group-hover:text-white/80 transition-colors text-center leading-tight truncate w-full text-center">
                {name.split(' ').slice(-1)[0]}
              </span>

              {/* Date */}
              <span className={`text-[9px] font-black tabular-nums ${char.isToday ? 'text-yellow-400' : 'text-white/30'}`}>
                {MONTHS[char.bMonth - 1]} {char.bDay}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
