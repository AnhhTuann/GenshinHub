'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { CharacterData } from '@/types/character';
import { isSameDay, isAfter, isBefore, addDays, getMonth, getDate, parse } from 'date-fns';

interface UpcomingBirthdaysProps {
  characters: CharacterData[];
  locale: string;
}

export default function UpcomingBirthdays({ characters }: UpcomingBirthdaysProps) {
  const upcoming = useMemo(() => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    const withDates = characters
      .filter(c => c.birthday)
      .map(c => {
        const [monthStr, dayStr] = c.birthday!.split('/');
        const month = parseInt(monthStr, 10);
        const day = parseInt(dayStr, 10);
        
        let sortScore = 0;
        if (month === currentMonth && day === currentDay) sortScore = 0; // Today
        else if (month === currentMonth && day > currentDay) sortScore = day - currentDay; // This month, future
        else if (month > currentMonth) sortScore = (month - currentMonth) * 31 + day; // Future month
        else sortScore = (12 - currentMonth + month) * 31 + day; // Next year

        return { ...c, bMonth: month, bDay: day, sortScore };
      });

    withDates.sort((a, b) => a.sortScore - b.sortScore);
    return withDates.slice(0, 10);
  }, [characters]);

  if (upcoming.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-white font-bold text-lg">Coming Birthdays</h2>
      
      <div className="yatta-container p-3">
        <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-2">
          {upcoming.map(char => (
            <div key={char.id} className="flex flex-col items-center gap-1 shrink-0">
              <div className={`yatta-item yatta-item-${char.rarity}star`}>
                <Image src={char.avatarUrl} alt={char.nameEn} fill className="object-cover" unoptimized />
                <div className="yatta-item-element">
                  <Image src={`/images/elements/${char.element.toLowerCase()}.png`} alt={char.element} fill className="object-contain" unoptimized />
                </div>
              </div>
              <div className="bg-white text-[#252236] text-[11px] font-bold px-3 py-0.5 rounded-sm shadow-sm w-full text-center">
                {char.bMonth}/{char.bDay}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #252236; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #463f64; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #5c5382; }
      `}</style>
    </div>
  );
}
