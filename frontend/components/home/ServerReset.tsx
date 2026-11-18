'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Clock, Globe, Sparkles } from 'lucide-react';

interface ServerResetProps {
  locale?: string;
}

const SERVERS = [
  { label: 'Asia', offset: 8, color: '#7C5AE0', bg: 'rgba(124,90,224,0.12)' },
  { label: 'Europe', offset: 1, color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  { label: 'America', offset: -5, color: '#f43f5e', bg: 'rgba(244,63,94,0.12)' },
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
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="server-reset-panel group relative rounded-2xl overflow-hidden p-5 flex flex-col justify-between"
      style={{
        background: 'rgba(255, 255, 255, 0.92)',
        border: '1px solid rgba(23, 43, 58, 0.08)',
        boxShadow: '0 8px 24px rgba(23, 43, 58, 0.05)',
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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span
            className="w-2.5 h-2.5 rounded-full animate-pulse shrink-0"
            style={{
              background: isUrgent ? '#ef4444' : server.color,
              boxShadow: `0 0 10px ${isUrgent ? 'rgba(239,68,68,0.5)' : server.color}`,
            }}
          />
          <div>
            <h3 className="text-[13px] font-extrabold text-slate-800 flex items-center gap-1.5 leading-none">
              <span>{locale === 'vi' ? 'Làm mới máy chủ' : 'Server Reset'}</span>
              {isUrgent && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-red-100 text-red-600 border border-red-200">
                  {locale === 'vi' ? 'Sắp reset!' : 'Reset Soon!'}
                </span>
              )}
            </h3>
            <span className="text-[10px] font-semibold text-slate-400 mt-0.5 flex items-center gap-1">
              <Globe size={10} />
              <span>{server.label} Time: {currentServerTime}</span>
            </span>
          </div>
        </div>

        {/* Server Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
          {SERVERS.map((s, i) => {
            const isActive = activeIdx === i;
            return (
              <button
                key={s.label}
                onClick={() => setActiveIdx(i)}
                className="relative px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors duration-200"
                style={{
                  color: isActive ? s.color : 'rgba(100, 116, 139, 0.8)',
                }}
                type="button"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeServerResetTab"
                    className="absolute inset-0 rounded-lg shadow-xs"
                    style={{
                      background: '#ffffff',
                      border: `1px solid ${s.color}35`,
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
                  className="rounded-3xl px-3 sm:px-4 py-3.5 sm:py-4 md:py-5 min-w-[76px] sm:min-w-[92px] md:min-w-[104px] text-center relative overflow-hidden backdrop-blur-md transition-all duration-300 shadow-sm"
                  style={{
                    background: `linear-gradient(145deg, #ffffff, ${server.color}0a)`,
                    border: `1.5px solid ${server.color}35`,
                    boxShadow: `0 8px 24px ${server.color}15`,
                  }}
                >
                  <span
                    className="relative text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight tabular-nums drop-shadow-xs"
                    style={{
                      color: isUrgent && block.label.includes('HR') ? '#ef4444' : server.color,
                    }}
                  >
                    {block.val}
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-black text-slate-400 tracking-[0.2em] uppercase mt-2">
                  {block.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Progress Bar & Footer */}
      <div className="mt-3">
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
          <div
            className="h-full rounded-full transition-all duration-1000 relative overflow-hidden"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${server.color}80, ${server.color})`,
            }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 text-[10px] font-bold">
          <span className="text-slate-400 flex items-center gap-1">
            <Clock size={11} className="text-slate-400" />
            <span>04:00 Daily Reset</span>
          </span>
          <span className="font-extrabold" style={{ color: server.color }}>
            {progress.toFixed(0)}% {locale === 'vi' ? 'đã qua' : 'elapsed'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
