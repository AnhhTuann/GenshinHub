'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { CharacterData } from '@/types/character';
import { differenceInCalendarDays, parse, isValid, setYear, isBefore } from 'date-fns';

interface UpcomingBirthdaysProps {
  characters: CharacterData[];
  locale: string;
}

export default function UpcomingBirthdays({ characters, locale }: UpcomingBirthdaysProps) {
  const upcoming = useMemo(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Parse birthdays and calculate difference
    const charsWithDiff = characters
      .filter(c => c.birthday && c.birthday !== 'Chưa rõ' && c.birthday !== 'Unknown' && c.birthday !== '')
      .map(c => {
        // Expected format: DD/MM (e.g. 15/07)
        const parts = c.birthday!.split('/');
        if (parts.length !== 2) return null;
        
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        if (isNaN(day) || isNaN(month)) return null;
        
        let bdayThisYear = new Date(currentYear, month - 1, day);
        
        // If the birthday has passed this year, look at next year's
        if (isBefore(bdayThisYear, new Date(today.setHours(0,0,0,0)))) {
          bdayThisYear = new Date(currentYear + 1, month - 1, day);
        }
        
        const daysUntil = differenceInCalendarDays(bdayThisYear, today);
        return { ...c, daysUntil, dateStr: c.birthday };
      })
      .filter(c => c !== null) as (CharacterData & { daysUntil: number, dateStr: string })[];
    
    // Sort by closest birthday and take top 5
    charsWithDiff.sort((a, b) => a.daysUntil - b.daysUntil);
    return charsWithDiff.slice(0, 5);
  }, [characters]);

  if (upcoming.length === 0) return null;

  return (
    <div className="glass-strong rounded-3xl p-5 border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all flex flex-col h-full">
      <div className="absolute -inset-24 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 -z-10 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-white/80 flex items-center gap-2">
          <span className="text-pink-400">🎂</span> Upcoming Birthdays
        </h3>
      </div>
      
      <div className="flex flex-col gap-3 flex-1">
        {upcoming.map((char) => {
          const isToday = char.daysUntil === 0;
          return (
            <Link 
              href={`/characters/${char.id}`} 
              key={char.id} 
              className={`flex items-center gap-3 p-2 rounded-xl transition-all ${isToday ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.15)]' : 'hover:bg-white/5 border border-transparent'}`}
            >
              <div className="w-10 h-10 relative rounded-full overflow-hidden bg-[#1a1a24] shrink-0 border border-white/10">
                <Image src={char.avatarUrl} alt={locale === 'vi' ? char.nameVi : char.nameEn} fill className="object-cover" unoptimized />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold truncate ${isToday ? 'text-pink-300' : 'text-white'}`}>
                  {locale === 'vi' ? char.nameVi : char.nameEn}
                </p>
                <p className="text-xs text-white/40">
                  {isToday ? 'Today!' : `In ${char.daysUntil} day${char.daysUntil > 1 ? 's' : ''} (${char.dateStr})`}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
