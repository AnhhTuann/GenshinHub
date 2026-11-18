'use client';

import React, { useMemo, useState, useEffect } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import { Link } from '@/i18n/routing';
import { CharacterData } from '@/types/character';
import { motion, useReducedMotion } from 'framer-motion';
import { CalendarDays, Cake, Sparkles } from 'lucide-react';

interface UpcomingBirthdaysProps {
  characters: CharacterData[];
  locale: string;
}

const EL_COLOR: Record<string, string> = {
  Pyro: '#ff5a45',
  Hydro: '#3aa8ff',
  Cryo: '#8fe8f5',
  Electro: '#cf8fff',
  Anemo: '#35d6c5',
  Geo: '#ffd34d',
  Dendro: '#9ede5f',
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_VI = ['Thg 1', 'Thg 2', 'Thg 3', 'Thg 4', 'Thg 5', 'Thg 6', 'Thg 7', 'Thg 8', 'Thg 9', 'Thg 10', 'Thg 11', 'Thg 12'];

export default function UpcomingBirthdays({ characters, locale }: UpcomingBirthdaysProps) {
  const [isMounted, setIsMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const upcoming = useMemo(() => {
    if (!isMounted) return [];
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    return characters
      .flatMap((c) => {
        if (!c.birthday) return [];
        const parts = c.birthday.split('/');
        if (parts.length !== 2) return [];
        const [monthValue, dayValue] = parts.map(Number);
        const birthdayDate = new Date(Date.UTC(2024, monthValue - 1, dayValue));
        if (
          !Number.isInteger(monthValue) ||
          !Number.isInteger(dayValue) ||
          birthdayDate.getUTCMonth() !== monthValue - 1 ||
          birthdayDate.getUTCDate() !== dayValue
        )
          return [];
        const month = monthValue;
        const day = dayValue;
        const isToday = month === currentMonth && day === currentDay;

        let daysUntil = 0;
        if (isToday) daysUntil = 0;
        else if (month === currentMonth && day > currentDay) daysUntil = day - currentDay;
        else if (month > currentMonth) daysUntil = (month - currentMonth) * 30 + (day - currentDay);
        else daysUntil = (12 - currentMonth + month) * 30 + (day - currentDay);

        return [{ ...c, bMonth: month, bDay: day, daysUntil, isToday }];
      })
      .sort((a, b) => a.daysUntil - b.daysUntil)
      .slice(0, 8);
  }, [characters, isMounted]);

  if (!isMounted || upcoming.length === 0) return null;

  const hasToday = upcoming.some((c) => c.isToday);

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="upcoming-birthdays-panel relative rounded-2xl p-5 flex flex-col justify-between"
      style={{
        background: 'rgba(255, 255, 255, 0.92)',
        border: hasToday ? '1px solid rgba(232, 184, 76, 0.35)' : '1px solid rgba(23, 43, 58, 0.08)',
        boxShadow: hasToday ? '0 8px 24px rgba(232, 184, 76, 0.12)' : '0 8px 24px rgba(23, 43, 58, 0.05)',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: hasToday
            ? 'linear-gradient(90deg, transparent, #E8B84C, transparent)'
            : 'linear-gradient(90deg, transparent, rgba(124, 90, 224, 0.4), transparent)',
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-violet-500/10 flex items-center justify-center text-[#7C5AE0]">
            <Cake size={14} />
          </div>
          <h3 className="text-[13px] font-extrabold text-slate-800 flex items-center gap-2">
            <span>{locale === 'vi' ? 'Sinh nhật sắp tới' : 'Upcoming Birthdays'}</span>
            {hasToday && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-700 border border-amber-300 shadow-xs animate-bounce">
                <Sparkles size={11} className="text-amber-500" />
                {locale === 'vi' ? 'Hôm nay!' : 'Today!'}
              </span>
            )}
          </h3>
        </div>

        <span className="text-[10px] font-bold text-slate-400">
          {locale === 'vi' ? '8 nhân vật gần nhất' : 'Next 8 birthdays'}
        </span>
      </div>

      {/* Characters Grid: 4 cols x 2 rows */}
      <div className="grid grid-cols-4 gap-2.5 my-auto">
        {upcoming.map((char, idx) => {
          const elColor = EL_COLOR[char.element] ?? '#7C5AE0';
          const name = locale === 'vi' ? char.nameVi || char.nameEn : char.nameEn;
          const monthLabel = locale === 'vi' ? MONTHS_VI[char.bMonth - 1] : MONTHS[char.bMonth - 1];

          return (
            <motion.div
              key={char.id}
              whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.05 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/characters/${char.id}`}
                className="group flex flex-col items-center text-center"
              >
                {/* Avatar Box */}
                <div
                  className={`relative w-full aspect-square rounded-2xl overflow-hidden transition-all duration-300 ${
                    char.isToday
                      ? 'ring-2 ring-amber-400 shadow-[0_0_16px_rgba(232,184,76,0.4)]'
                      : 'group-hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)]'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${elColor}20, #f8fafc)`,
                    border: char.isToday ? '1px solid #E8B84C' : `1px solid ${elColor}30`,
                  }}
                >
                  <FallbackImage
                    src={char.avatarUrl}
                    alt={name}
                    fill
                    sizes="80px"
                    className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />

                  {/* Today Badge */}
                  {char.isToday && (
                    <div
                      className="absolute bottom-0 left-0 right-0 py-0.5 text-center text-[9px] font-black uppercase tracking-wider text-amber-900"
                      style={{ background: 'linear-gradient(to right, #fde68a, #fcd34d)' }}
                    >
                      🎉 Today
                    </div>
                  )}
                </div>

                {/* Name */}
                <span className="text-[10px] font-extrabold text-slate-700 group-hover:text-[var(--accent-primary)] transition-colors mt-1.5 truncate w-full px-0.5">
                  {name.split(' ').slice(-1)[0]}
                </span>

                {/* Element + Date */}
                <div className="mt-0.5 flex items-center justify-center gap-1.5">
                  <div
                    className="w-6 h-6 shrink-0 rounded-full overflow-hidden flex items-center justify-center shadow-[0_2px_6px_rgba(15,23,42,0.28)]"
                    style={{
                      background: '#090d12',
                      border: `1.5px solid ${elColor}90`,
                      boxShadow: `0 0 7px ${elColor}45`,
                    }}
                    title={char.element}
                  >
                    <FallbackImage
                      src={`/assets/elements/${char.element.toLowerCase()}.webp`}
                      alt={char.element}
                      width={18}
                      height={18}
                      className="w-4 h-4 object-contain drop-shadow-[0_0_2px_rgba(255,255,255,0.75)]"
                      unoptimized
                    />
                  </div>
                  <span
                    className="text-[10px] font-bold tabular-nums"
                    style={{ color: char.isToday ? '#b45309' : 'rgba(71, 85, 105, 0.9)' }}
                  >
                    {monthLabel} {char.bDay}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
