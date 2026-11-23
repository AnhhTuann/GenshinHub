'use client';

import React, { useMemo, useState, useEffect } from 'react';
import ElementIcon from '@/components/ui/ElementIcon';
import FallbackImage from '@/components/ui/FallbackImage';
import { Link } from '@/i18n/routing';
import { CharacterData } from '@/types/character';
import { motion } from 'framer-motion';
import { CalendarDays, Cake, Sparkles, Star } from 'lucide-react';

interface UpcomingBirthdaysProps {
  characters: CharacterData[];
  locale: string;
}

const EL_COLOR: Record<string, string> = {
  Pyro: '#ff5a45', Hydro: '#3aa8ff', Cryo: '#8fe8f5',
  Electro: '#cf8fff', Anemo: '#35d6c5', Geo: '#ffd34d', Dendro: '#9ede5f',
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_VI = ['Thg 1', 'Thg 2', 'Thg 3', 'Thg 4', 'Thg 5', 'Thg 6', 'Thg 7', 'Thg 8', 'Thg 9', 'Thg 10', 'Thg 11', 'Thg 12'];

type UpcomingChar = CharacterData & { bMonth: number; bDay: number; daysUntil: number; isToday: boolean };

/* ─── Compact character card — same visual language as CharacterCard ───── */
function BirthdayCharacterCard({
  char,
  name,
  monthLabel,
  locale,
}: {
  char: UpcomingChar;
  name: string;
  monthLabel: string;
  locale: string;
}) {
  const el = char.element;
  const color = EL_COLOR[el] ?? '#a77cf6';
  const is5 = char.rarity === 5;

  return (
    <Link
      href={`/characters/${char.id}`}
      className={`bday-card group${char.isToday ? ' is-today' : ''}`}
      data-element={el.toLowerCase()}
      style={{ '--card-element': color } as React.CSSProperties}
      aria-label={`${name} — ${monthLabel} ${char.bDay}`}
    >
      {/* Artwork — breathing room, no hair/head crop */}
      <span className="bday-art">
        <span className="bday-art-inner">
          <FallbackImage
            src={char.avatarUrl}
            alt={name}
            fill
            sizes="(max-width: 767px) 44vw, 180px"
            className="object-contain object-bottom"
            unoptimized
          />
        </span>
      </span>

      {/* Bottom nameplate scrim */}
      <span className="bday-scrim" aria-hidden="true" />
      {is5 && <span className="bday-sparkle" aria-hidden="true" />}

      {/* Element badge */}
      <span className="bday-element"><ElementIcon element={el} label={el} /></span>

      {/* Birthday ribbon */}
      {char.isToday && (
        <span className="bday-ribbon">
          <Sparkles size={10} aria-hidden="true" /> {locale === 'vi' ? 'Hôm nay' : 'Today'}
        </span>
      )}

      {/* Nameplate */}
      <span className="bday-body">
        <span className="bday-name">{name}</span>
        <span className="bday-meta">
          <span className="character-rarity bday-rarity" data-rarity={char.rarity} aria-label={`${char.rarity}★`}>
            {Array.from({ length: char.rarity }).map((_, i) => (
              <Star key={i} size={9} fill="currentColor" stroke="none" aria-hidden="true" />
            ))}
          </span>
          <span className={`bday-date${char.isToday ? ' is-today' : ''}`}>
            <CalendarDays size={10} aria-hidden="true" />
            {monthLabel} {char.bDay}
          </span>
        </span>
      </span>
    </Link>
  );
}

export default function UpcomingBirthdays({ characters, locale }: UpcomingBirthdaysProps) {
  const [isMounted, setIsMounted] = useState(false);

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
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="upcoming-birthdays-panel relative rounded-2xl p-5 flex flex-col justify-between"
      style={{
        background: 'var(--bg-surface)',
        border: `1px solid ${hasToday ? 'var(--border-gold)' : 'var(--border-subtle)'}`,
        boxShadow: hasToday ? '0 8px 24px -12px var(--gold-glow-strong)' : 'var(--atlas-shadow)',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: hasToday
            ? 'linear-gradient(90deg, transparent, var(--fantasy-gold), transparent)'
            : 'linear-gradient(90deg, transparent, var(--accent-primary), transparent)',
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[var(--accent-primary-dim)] flex items-center justify-center text-[var(--accent-primary-light)]">
            <Cake size={14} />
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
            <span>{locale === 'vi' ? 'Sinh nhật sắp tới' : 'Upcoming Birthdays'}</span>
            {hasToday && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-extrabold bg-[var(--gold-200)] text-[var(--gold-600)] border border-[var(--border-gold)] shadow-xs">
                <Sparkles size={11} className="text-[var(--fantasy-gold)]" />
                {locale === 'vi' ? 'Hôm nay!' : 'Today!'}
              </span>
            )}
          </h3>
        </div>

        <span className="text-xs font-bold text-[var(--text-secondary)]">
          {locale === 'vi' ? '8 nhân vật gần nhất' : 'Next 8 birthdays'}
        </span>
      </div>

      {/* Compact character cards */}
      <div className="bday-grid">
        {upcoming.map((char) => {
          const name = locale === 'vi' ? char.nameVi || char.nameEn : char.nameEn;
          const monthLabel = locale === 'vi' ? MONTHS_VI[char.bMonth - 1] : MONTHS[char.bMonth - 1];

          return (
            <div key={char.id} className="bday-card-shell">
              <BirthdayCharacterCard
                char={char}
                name={name}
                monthLabel={monthLabel}
                locale={locale}
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
