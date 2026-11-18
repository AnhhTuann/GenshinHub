'use client';

import React, { useEffect, useState } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import { getFarmingDataForDay, DailyDomain } from '@/data/dailyFarming';
import { Link } from '@/i18n/routing';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Swords, Star, Users } from 'lucide-react';

const ELEM_VISION: Record<string, { bg: string; border: string }> = {
  Pyro:    { bg: '#2b0d0d', border: '#ff5a45' },
  Hydro:   { bg: '#081e36', border: '#3aa8ff' },
  Cryo:    { bg: '#092330', border: '#4ecfe0' },
  Electro: { bg: '#1c0f30', border: '#bf7bff' },
  Anemo:   { bg: '#072522', border: '#32d4c2' },
  Geo:     { bg: '#281c07', border: '#f0bb3b' },
  Dendro:  { bg: '#0e260c', border: '#78ce32' },
};

function getElemVision(element?: string) {
  if (!element) return { bg: '#171c26', border: '#7C5AE0' };
  const capitalized = element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
  return ELEM_VISION[capitalized] || { bg: '#171c26', border: '#7C5AE0' };
}

interface DailyFarmingProps {
  locale: string;
}

const DAYS = [
  { label: 'Sun', fullEn: 'Sunday', fullVi: 'Chủ Nhật' },
  { label: 'Mon', fullEn: 'Monday', fullVi: 'Thứ Hai' },
  { label: 'Tue', fullEn: 'Tuesday', fullVi: 'Thứ Ba' },
  { label: 'Wed', fullEn: 'Wednesday', fullVi: 'Thứ Tư' },
  { label: 'Thu', fullEn: 'Thursday', fullVi: 'Thứ Năm' },
  { label: 'Fri', fullEn: 'Friday', fullVi: 'Thứ Sáu' },
  { label: 'Sat', fullEn: 'Saturday', fullVi: 'Thứ Bảy' },
];

const REGION_COLORS: Record<string, string> = {
  Mondstadt: '#35d6c5',
  Liyue: '#ffd34d',
  Inazuma: '#cf8fff',
  Sumeru: '#9ede5f',
  Fontaine: '#3aa8ff',
  Natlan: '#ff5a45',
};

export default function DailyFarming({ locale }: DailyFarmingProps) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [data, setData] = useState<DailyDomain[] | null>(null);
  const [todayIdx, setTodayIdx] = useState(1);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const now = new Date();
    const serverTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 3600000 * 8);
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
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-4 w-full"
    >
      {/* Header Row */}
      <div className="daily-farming-header flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className="w-1.5 h-6 rounded-full shrink-0"
            style={{ background: 'linear-gradient(to bottom, #9B7AFF, #7C5AE0)' }}
          />
          <div>
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
              <span>{locale === 'vi' ? 'Lịch Farm Nguyên Liệu' : 'Daily Domain Farming'}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-[#7C5AE0]">
                {locale === 'vi' ? DAYS[selectedDay].fullVi : DAYS[selectedDay].fullEn}
              </span>
            </h3>
          </div>
        </div>

        {/* Day Selector Tabs */}
        <div className="daily-farming-days flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
          {DAYS.map((day, idx) => {
            const isToday = idx === todayIdx;
            const isActive = idx === selectedDay;
            return (
              <button
                key={idx}
                onClick={() => setSelectedDay(idx)}
                className="relative px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-colors duration-200"
                style={{
                  color: isActive ? '#7C5AE0' : 'rgba(100, 116, 139, 0.75)',
                }}
                type="button"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeFarmingDayPill"
                    className="absolute inset-0 rounded-xl shadow-xs"
                    style={{
                      background: '#ffffff',
                      border: '1px solid rgba(124, 90, 224, 0.35)',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  <span>{day.label}</span>
                  {isToday && (
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: '#7C5AE0' }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {selectedDay === 0 ? (
        /* Sunday All-Access Banner */
        <div
          className="flex flex-col items-center justify-center py-10 text-center rounded-2xl relative overflow-hidden p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(124,90,224,0.08), rgba(232,184,76,0.06))',
            border: '1px solid rgba(124,90,224,0.2)',
          }}
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3 shadow-xs">
            <Sparkles size={24} />
          </div>
          <h4 className="text-slate-900 font-extrabold text-lg mb-1">
            {locale === 'vi' ? 'Chủ Nhật: Mở Toàn Bộ Bí Cảnh' : 'Sunday All-Access'}
          </h4>
          <p className="text-slate-500 text-xs max-w-sm">
            {locale === 'vi'
              ? 'Tất cả các loại sách thiên phú và nguyên liệu vũ khí đều có thể farm hôm nay!'
              : 'All talent books and weapon materials are available today. Farm whatever you need!'}
          </p>
          <div className="flex gap-2.5 mt-4">
            {['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'].map((element) => (
              <span key={element} title={element} className="relative w-6 h-6">
                <FallbackImage
                  src={`/assets/elements/${element.toLowerCase()}.webp`}
                  alt={element}
                  fill
                  className="object-contain"
                />
              </span>
            ))}
          </div>
        </div>
      ) : data ? (
        /* Responsive Balanced Grid: 2 columns if 2 items, 3 columns if 3+ items */
        <div
          className={`grid gap-4 ${
            data.length === 2
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {data.map((domain, idx) => {
            const regColor = REGION_COLORS[domain.region] ?? '#7C5AE0';

            return (
              <motion.div
                key={idx}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-2xl overflow-hidden backdrop-blur-md transition-shadow duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.94)',
                  border: '1px solid rgba(23, 43, 58, 0.08)',
                  boxShadow: '0 6px 20px rgba(23, 43, 58, 0.04)',
                }}
              >
                {/* Domain Header */}
                <div
                  className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100"
                  style={{ background: `linear-gradient(90deg, ${regColor}12, transparent)` }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="relative w-9 h-9 shrink-0 rounded-xl overflow-hidden p-1 shadow-xs border"
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderColor: `${regColor}40`,
                        boxShadow: `0 2px 8px ${regColor}20`,
                      }}
                    >
                      <FallbackImage
                        src={domain.itemIcon}
                        alt="material icon"
                        fill
                        className="object-contain drop-shadow"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-[14px] text-slate-800 truncate">
                        {domain.domainName}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {locale === 'vi' ? 'Nguyên liệu thiên phú & vũ khí' : 'Talent & Weapon Material'}
                      </p>
                    </div>
                  </div>

                  <span
                    className="text-[10px] font-extrabold px-2.5 py-1 rounded-full shrink-0 uppercase tracking-wider"
                    style={{
                      background: `${regColor}18`,
                      color: regColor,
                      border: `1px solid ${regColor}35`,
                      boxShadow: `0 2px 6px ${regColor}15`,
                    }}
                  >
                    {domain.region}
                  </span>
                </div>

                {/* Items Section */}
                <div className="p-4 sm:p-5 flex flex-col gap-4">
                  {/* Characters */}
                  {domain.characters.length > 0 && (
                    <div className="bg-slate-50/70 border border-slate-100/90 rounded-2xl p-3.5 sm:p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                          <Sparkles size={14} className="text-[#7C5AE0]" />
                          <span>{locale === 'vi' ? 'Nhân vật sử dụng' : 'Characters'}</span>
                        </div>
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200/80 shadow-2xs">
                          {domain.characters.length}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {domain.characters.map((char) => {
                          const vision = getElemVision(char.element);
                          return (
                            <motion.div
                              key={char.id}
                              whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.05 }}
                              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            >
                              <Link
                                href={`/characters/${char.id}`}
                                className="group flex flex-col items-center text-center"
                              >
                                {/* Avatar Box (To đẹp giống Upcoming Birthdays) */}
                                <div
                                  className="relative w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.14)]"
                                  style={{
                                    background:
                                      char.rarity === 5
                                        ? 'linear-gradient(145deg, #d49542 0%, #eec278 40%, #995c1c 100%)'
                                        : 'linear-gradient(145deg, #6c4298 0%, #9865c9 40%, #4a2168 100%)',
                                    border:
                                      char.rarity === 5
                                        ? '1.5px solid rgba(245, 195, 95, 0.75)'
                                        : '1.5px solid rgba(192, 132, 252, 0.65)',
                                    boxShadow:
                                      char.rarity === 5
                                        ? '0 4px 12px rgba(212, 149, 66, 0.25)'
                                        : '0 4px 12px rgba(108, 66, 152, 0.25)',
                                  }}
                                >
                                  <FallbackImage
                                    src={char.avatarUrl}
                                    alt={char.name}
                                    fill
                                    sizes="80px"
                                    className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                                    unoptimized
                                  />

                                  {/* Element Vision Medallion (Top Left) */}
                                  <div
                                    className="absolute top-1 left-1 w-5 h-5 rounded-full flex items-center justify-center p-0.5 shadow-xs"
                                    style={{
                                      background: vision.bg,
                                      border: `1px solid ${vision.border}`,
                                      boxShadow: `0 1px 4px ${vision.border}45`,
                                    }}
                                  >
                                    <FallbackImage
                                      src={`/assets/elements/${char.element.toLowerCase()}.webp`}
                                      alt={char.element}
                                      width={16}
                                      height={16}
                                      className="w-3.5 h-3.5 object-contain drop-shadow-[0_0_1px_rgba(255,255,255,0.5)]"
                                    />
                                  </div>

                                  {/* Bottom Stars Bar */}
                                  <div className="absolute bottom-0 inset-x-0 h-3.5 bg-black/45 backdrop-blur-[2px] flex items-center justify-center gap-0.5 rounded-b-[14px]">
                                    {Array.from({ length: char.rarity }).map((_, i) => (
                                      <Star
                                        key={i}
                                        size={8}
                                        fill={char.rarity === 5 ? '#FFD147' : '#E0B8FF'}
                                        stroke="none"
                                      />
                                    ))}
                                  </div>
                                </div>

                                {/* Name */}
                                <span className="text-[11px] font-extrabold text-slate-700 group-hover:text-[#7C5AE0] transition-colors mt-1.5 truncate max-w-[66px] sm:max-w-[70px] px-0.5">
                                  {char.name}
                                </span>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Weapons */}
                  {domain.weapons.length > 0 && (
                    <div className="bg-slate-50/70 border border-slate-100/90 rounded-2xl p-3.5 sm:p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                          <Swords size={14} className="text-amber-500" />
                          <span>{locale === 'vi' ? 'Vũ khí nâng cấp' : 'Weapons'}</span>
                        </div>
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200/80 shadow-2xs">
                          {domain.weapons.length}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {domain.weapons.map((weapon) => (
                          <motion.div
                            key={weapon.id}
                            whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.05 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="group flex flex-col items-center text-center">
                              {/* Weapon Box (To đẹp giống Upcoming Birthdays) */}
                              <div
                                className="relative w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.14)]"
                                style={{
                                  background:
                                    weapon.rarity === 5
                                      ? 'linear-gradient(145deg, #d49542 0%, #eec278 40%, #995c1c 100%)'
                                      : 'linear-gradient(145deg, #6c4298 0%, #9865c9 40%, #4a2168 100%)',
                                  border:
                                    weapon.rarity === 5
                                      ? '1.5px solid rgba(245, 195, 95, 0.75)'
                                      : '1.5px solid rgba(192, 132, 252, 0.65)',
                                  boxShadow:
                                    weapon.rarity === 5
                                      ? '0 4px 12px rgba(212, 149, 66, 0.25)'
                                      : '0 4px 12px rgba(108, 66, 152, 0.25)',
                                }}
                              >
                                <FallbackImage
                                  src={weapon.iconUrl}
                                  alt={weapon.name}
                                  fill
                                  sizes="80px"
                                  className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-110 drop-shadow"
                                  unoptimized
                                />

                                {/* Bottom Stars Bar */}
                                <div className="absolute bottom-0 inset-x-0 h-3.5 bg-black/45 backdrop-blur-[2px] flex items-center justify-center gap-0.5 rounded-b-[14px]">
                                  {Array.from({ length: weapon.rarity }).map((_, i) => (
                                    <Star
                                      key={i}
                                      size={8}
                                      fill={weapon.rarity === 5 ? '#FFD147' : '#E0B8FF'}
                                      stroke="none"
                                    />
                                  ))}
                                </div>
                              </div>

                              {/* Weapon Name */}
                              <span
                                className="text-[11px] font-extrabold text-slate-700 group-hover:text-[#7C5AE0] transition-colors mt-1.5 truncate max-w-[68px] sm:max-w-[72px] px-0.5"
                                title={weapon.name}
                              >
                                {weapon.name}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : null}
    </motion.div>
  );
}
