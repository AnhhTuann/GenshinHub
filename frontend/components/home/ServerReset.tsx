'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Clock, Globe, Sparkles } from 'lucide-react';

interface ServerResetProps {
  locale?: string;
}

const SERVERS = [
  { label: 'Asia', offset: 8, color: 'var(--accent-primary)' },
  { label: 'Europe', offset: 1, color: 'var(--accent-second)' },
  { label: 'America', offset: -5, color: 'var(--pyro)' },
];

export default function ServerReset({ locale = 'en' }: ServerResetProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ h: '00', m: '00', s: '00' });
  const [currentServerTime, setCurrentServerTime] = useState('00:00:00');
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const offsetHours = SERVERS[activeIdx].offset;
      const serverTime = new Date(
        now.getTime() + now.getTimezoneOffset() * 60000 + 3600000 * offsetHours
      );

      setCurrentServerTime(
        serverTime.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );

      const resetTime = new Date(serverTime);
      if (serverTime.getHours() >= 4) resetTime.setDate(resetTime.getDate() + 1);
      resetTime.setHours(4, 0, 0, 0);

      const diff = resetTime.getTime() - serverTime.getTime();
      const totalSeconds = 24 * 3600;
      const elapsedSeconds = totalSeconds - Math.floor(diff / 1000);
      setProgress(Math.min(100, Math.max(0, (elapsedSeconds / totalSeconds) * 100)));

      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        h: h.toString().padStart(2, '0'),
        m: m.toString().padStart(2, '0'),
        s: s.toString().padStart(2, '0'),
      });
    };

    calc();
    const timer = setInterval(calc, 1000);
    return () => clearInterval(timer);
  }, [activeIdx]);

  const server = SERVERS[activeIdx];
  const isUrgent = parseInt(timeLeft.h, 10) < 2;

  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="server-reset-panel group relative rounded-2xl overflow-hidden p-5 flex flex-col justify-between"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--atlas-shadow)',
      }}
    >
      {/* Top ambient colored line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${server.color}, transparent)`,
        }}
      />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{
              background: isUrgent ? 'var(--danger-ink)' : server.color,
              boxShadow: `0 0 10px -2px ${isUrgent ? 'var(--danger-ink)' : server.color}`,
            }}
          />
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5 leading-none">
              <span>{locale === 'vi' ? 'Làm mới máy chủ' : 'Server Reset'}</span>
              {isUrgent && (
                <span className="text-xs font-bold px-1.5 py-0.5 rounded-md bg-[color-mix(in_srgb,var(--danger-ink)_12%,var(--bg-surface))] text-[var(--danger-ink)] border border-[color-mix(in_srgb,var(--danger-ink)_30%,var(--border-default))]">
                  {locale === 'vi' ? 'Sắp reset!' : 'Reset Soon!'}
                </span>
              )}
            </h3>
            <span className="text-xs font-semibold text-[var(--text-secondary)] mt-0.5 flex items-center gap-1">
              <Globe size={10} />
              <span>{server.label} Time: {currentServerTime}</span>
            </span>
          </div>
        </div>

        {/* Server Tabs */}
        <div className="flex items-center gap-1 bg-[var(--bg-elevated)] p-1 rounded-xl border border-[var(--border-default)]">
          {SERVERS.map((s, i) => {
            const isActive = activeIdx === i;
            return (
              <button
                key={s.label}
                onClick={() => setActiveIdx(i)}
                className="relative min-h-11 min-w-11 px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors duration-200"
                style={{
                  color: isActive ? 'var(--accent-primary-light)' : 'var(--text-secondary)',
                }}
                type="button"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeServerResetTab"
                    className="absolute inset-0 rounded-lg shadow-xs"
                    style={{
                      background: 'var(--bg-surface)',
                      border: `1px solid color-mix(in srgb, ${s.color} 32%, var(--border-default))`,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Countdown Timer Blocks (Enlarged) */}
      <div className="my-auto py-4">
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 md:gap-5">
          {[
            { val: timeLeft.h, label: locale === 'vi' ? 'GIỜ' : 'HR' },
            { val: timeLeft.m, label: locale === 'vi' ? 'PHÚT' : 'MIN' },
            { val: timeLeft.s, label: locale === 'vi' ? 'GIÂY' : 'SEC' },
          ].map((block, i) => (
            <React.Fragment key={block.label}>
              {i > 0 && (
                <span
                  className="font-black text-2xl sm:text-4xl md:text-5xl -mt-6 animate-pulse opacity-45"
                  style={{ color: server.color }}
                >
                  :
                </span>
              )}
              <div className="flex flex-col items-center">
                <div
                  className="rounded-3xl px-3 sm:px-4 py-3.5 sm:py-4 md:py-5 min-w-[52px] sm:min-w-[76px] xl:min-w-[96px] text-center relative overflow-hidden transition-all duration-300 shadow-sm"
                  style={{
                    background: `linear-gradient(145deg, var(--bg-elevated), color-mix(in srgb, ${server.color} 5%, var(--bg-elevated)))`,
                    border: `1.5px solid color-mix(in srgb, ${server.color} 28%, var(--border-default))`,
                    boxShadow: `0 8px 24px -12px color-mix(in srgb, ${server.color} 55%, transparent)`,
                  }}
                >
                  <span
                    className="relative text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight tabular-nums drop-shadow-xs"
                    style={{
                      color: isUrgent && block.label.includes('HR') ? 'var(--danger-ink)' : 'var(--accent-primary-light)',
                    }}
                  >
                    {block.val}
                  </span>
                </div>
                <span className="text-xs font-black text-[var(--text-secondary)] tracking-[0.2em] uppercase mt-2">
                  {block.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Progress Bar & Footer */}
      <div className="mt-3">
        <div className="h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden p-0.5 border border-[var(--border-default)]">
          <div
            className="h-full rounded-full transition-all duration-1000 relative overflow-hidden"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, color-mix(in srgb, ${server.color} 60%, transparent), ${server.color})`,
            }}
          >
            <div className="absolute inset-0 animate-pulse rounded-full" style={{ background: 'color-mix(in srgb, var(--bg-surface) 35%, transparent)' }} />
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 text-xs font-bold">
          <span className="text-[var(--text-secondary)] flex items-center gap-1">
            <Clock size={11} className="text-[var(--text-secondary)]" />
            <span>04:00 Daily Reset</span>
          </span>
          <span className="font-extrabold text-[var(--accent-primary-light)]">
            {progress.toFixed(0)}% {locale === 'vi' ? 'đã qua' : 'elapsed'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
