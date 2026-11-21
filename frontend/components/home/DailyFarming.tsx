'use client';

import React, { useEffect, useState } from 'react';
import ElementIcon from '@/components/ui/ElementIcon';
import FallbackImage from '@/components/ui/FallbackImage';
import { getFarmingDataForDay } from '@/data/dailyFarming';
import type { DailyDomain } from '@/data/dailyFarming';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { Sparkles, Swords, Star, Users } from 'lucide-react';

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
  Mondstadt: 'var(--anemo)',
  Liyue: 'var(--geo)',
  Inazuma: 'var(--electro)',
  Sumeru: 'var(--dendro)',
  Fontaine: 'var(--hydro)',
  Natlan: 'var(--pyro)',
};

type FarmChar = DailyDomain['characters'][number];
type FarmWeapon = DailyDomain['weapons'][number];

/* ─── Tiny rarity row shared by mini tiles ─────────────── */
function RarityRow({ rarity }: { rarity: number }) {
  return (
    <span className="df-rarity" data-rarity={rarity} aria-label={`${rarity}★`}>
      {Array.from({ length: rarity }).map((_, i) => (
        <Star key={i} size={8} fill="currentColor" stroke="none" aria-hidden="true" />
      ))}
    </span>
  );
}

/* ─── Compact character tile — same language as CharacterCard ─────────── */
function MiniCharacter({ char }: { char: FarmChar }) {
  return (
    <Link
      href={`/characters/${char.id}`}
      className="df-tile df-tile--char group"
      data-element={char.element.toLowerCase()}
      title={char.name}
    >
      <span className="df-tile-art">
        <span className="df-tile-art-inner">
          <FallbackImage
            src={char.avatarUrl}
            alt={char.name}
            fill
            sizes="72px"
            className="object-contain object-bottom"
            unoptimized
          />
        </span>
        <span className="df-tile-element"><ElementIcon element={char.element} /></span>
        <RarityRow rarity={char.rarity} />
      </span>
      <span className="df-tile-name">{char.name}</span>
    </Link>
  );
}

/* ─── Compact weapon tile — mirrors the mini character tile ───────────── */
function MiniWeapon({ weapon }: { weapon: FarmWeapon }) {
  return (
    <div className="df-tile df-tile--weapon group" title={weapon.name}>
      <span className="df-tile-art" data-rarity={weapon.rarity}>
        <span className="df-tile-art-inner">
          <FallbackImage
            src={weapon.iconUrl}
            alt={weapon.name}
            fill
            sizes="72px"
            className="object-contain"
            unoptimized
          />
        </span>
        <RarityRow rarity={weapon.rarity} />
      </span>
      <span className="df-tile-name">{weapon.name}</span>
    </div>
  );
}

/* ─── Consistent sub-section wrapper ──────────────────────────────────── */
function DomainCardSection({
  icon,
  title,
  count,
  children,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
  children: React.ReactNode;
  tone: 'character' | 'weapon';
}) {
  return (
    <section className={`df-section df-section--${tone}`}>
      <header className="df-section-head">
        <span className="df-section-title">{icon}{title}</span>
        <span className="df-section-count">{count}</span>
      </header>
      <div className="df-section-body">{children}</div>
    </section>
  );
}

/* ─── One domain card ──────────────────────────────────────────────────── */
function DomainCard({ domain, locale }: { domain: DailyDomain; locale: string }) {
  const regColor = REGION_COLORS[domain.region] ?? 'var(--accent-primary)';

  return (
    <article className="df-card group" style={{ '--df-region': regColor } as React.CSSProperties}>
      {/* Header */}
      <header className="df-card-head">
        <span className="df-card-icon">
          <FallbackImage src={domain.itemIcon} alt="" fill className="object-contain" unoptimized />
        </span>
        <span className="df-card-heading">
          <h4 className="df-card-title">{domain.domainName}</h4>
          <span className="df-card-subtitle">
            {locale === 'vi' ? 'Nguyên liệu thiên phú & vũ khí' : 'Talent & weapon materials'}
          </span>
        </span>
        <span className="df-region-badge">{domain.region}</span>
      </header>

      {/* Body: two aligned sub-sections */}
      <div className="df-card-body">
        {domain.characters.length > 0 && (
          <DomainCardSection
            tone="character"
            icon={<Users size={14} aria-hidden="true" />}
            title={locale === 'vi' ? 'Nhân vật sử dụng' : 'Characters'}
            count={domain.characters.length}
          >
            {domain.characters.map((char) => <MiniCharacter key={char.id} char={char} />)}
          </DomainCardSection>
        )}
        {domain.weapons.length > 0 && (
          <DomainCardSection
            tone="weapon"
            icon={<Swords size={14} aria-hidden="true" />}
            title={locale === 'vi' ? 'Vũ khí nâng cấp' : 'Weapons'}
            count={domain.weapons.length}
          >
            {domain.weapons.map((weapon) => <MiniWeapon key={weapon.id} weapon={weapon} />)}
          </DomainCardSection>
        )}
      </div>
    </article>
  );
}

export default function DailyFarming({ locale }: DailyFarmingProps) {
  const [selectedDay, setSelectedDay] = useState(1);
  const data = getFarmingDataForDay(selectedDay);
  const [todayIdx, setTodayIdx] = useState(1);

  useEffect(() => {
    const now = new Date();
    const serverTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 3600000 * 8);
    if (serverTime.getHours() < 4) serverTime.setDate(serverTime.getDate() - 1);
    const day = serverTime.getDay();
    setSelectedDay(day);
    setTodayIdx(day);
  }, []);

  const gridClass = `fantasy-daily-panel df-grid ${data && data.length === 2 ? 'df-grid--two' : ''}`;

  return (
    <motion.div
      initial={false}
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
            style={{ background: 'linear-gradient(to bottom, var(--accent-vivid), var(--accent-primary))' }}
          />
          <div>
            <h3 className="text-sm font-extrabold text-[var(--text-primary)] flex items-center gap-2">
              <span>{locale === 'vi' ? 'Lịch Farm Nguyên Liệu' : 'Daily Domain Farming'}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--selected-surface)] text-[var(--accent-primary-light)]">
                {locale === 'vi' ? DAYS[selectedDay].fullVi : DAYS[selectedDay].fullEn}
              </span>
            </h3>
          </div>
        </div>

        {/* Day Selector Tabs */}
        <div className="daily-farming-days flex flex-wrap items-center gap-1 bg-[var(--bg-elevated)] p-1 rounded-2xl border border-[var(--border-default)]">
          {DAYS.map((day, idx) => {
            const isToday = idx === todayIdx;
            const isActive = idx === selectedDay;
            return (
              <button
                key={idx}
                onClick={() => setSelectedDay(idx)}
                aria-pressed={isActive}
                className="relative min-h-11 min-w-11 px-2 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors duration-200"
                style={{
                  color: isActive ? 'var(--accent-primary-light)' : 'var(--text-secondary)',
                }}
                type="button"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeFarmingDayPill"
                    className="absolute inset-0 rounded-xl shadow-xs"
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-accent)',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  <span>{day.label}</span>
                  {isToday && (
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: 'var(--accent-primary)' }}
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
          className="fantasy-daily-panel df-sunday flex flex-col items-center justify-center py-10 text-center relative overflow-hidden p-6"
          style={{
            background: 'linear-gradient(135deg, var(--accent-primary-dim), var(--gold-glow))',
            border: '1px solid var(--border-accent)',
          }}
        >
          <div className="w-12 h-12 rounded-2xl bg-[var(--gold-200)] text-[var(--gold-600)] flex items-center justify-center mb-3 shadow-xs">
            <Sparkles size={24} />
          </div>
          <h4 className="text-[var(--text-primary)] font-extrabold text-lg mb-1">
            {locale === 'vi' ? 'Chủ Nhật: Mở Toàn Bộ Bí Cảnh' : 'Sunday All-Access'}
          </h4>
          <p className="text-[var(--text-secondary)] text-xs max-w-sm">
            {locale === 'vi'
              ? 'Tất cả các loại sách thiên phú và nguyên liệu vũ khí đều có thể farm hôm nay!'
              : 'All talent books and weapon materials are available today. Farm whatever you need!'}
          </p>
          <div className="flex gap-2.5 mt-4">
            {['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'].map((element) => (
              <ElementIcon key={element} element={element} label={element} />
            ))}
          </div>
        </div>
      ) : data ? (
        <div key={selectedDay} className={gridClass}>
          {data.map((domain, idx) => (
            <DomainCard key={idx} domain={domain} locale={locale} />
          ))}
        </div>
      ) : null}
    </motion.div>
  );
}
