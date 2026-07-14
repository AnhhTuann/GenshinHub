'use client';

import React, { useState, useEffect } from 'react';

const SERVERS = [
  { label: 'Asia',    offset: 8,  flag: '🌏', color: '#4fc3f7' },
  { label: 'Europe',  offset: 1,  flag: '🌍', color: '#aed581' },
  { label: 'America', offset: -5, flag: '🌎', color: '#ff6b4a' },
];

export default function ServerReset() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ h: '00', m: '00', s: '00' });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const offsetHours = SERVERS[activeIdx].offset;
      const serverTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3600000 * offsetHours));

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
  const urgency = parseInt(timeLeft.h) < 2;

  return (
    <div
      className="rounded-2xl overflow-hidden relative"
      style={{
        background: 'linear-gradient(145deg, rgba(13,13,22,0.90), rgba(6,6,12,0.95))',
        border: `1px solid ${server.color}22`,
        boxShadow: `0 0 30px -10px ${server.color}15`,
      }}
    >
      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${server.color}60, transparent)` }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-2.5">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              background: urgency ? '#f87171' : '#34d399',
              boxShadow: `0 0 8px ${urgency ? 'rgba(248,113,113,0.7)' : 'rgba(52,211,153,0.6)'}`,
            }}
          />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">
            Server Reset
          </span>
        </div>

        {/* Server tabs */}
        <div className="flex gap-0.5 bg-black/30 p-0.5 rounded-xl border border-white/[0.05]">
          {SERVERS.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setActiveIdx(i)}
              className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-200"
              style={{
                background: activeIdx === i ? `${s.color}18` : 'transparent',
                color: activeIdx === i ? s.color : 'rgba(255,255,255,0.3)',
                border: activeIdx === i ? `1px solid ${s.color}35` : '1px solid transparent',
              }}
            >
              {s.flag} {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Countdown */}
      <div className="px-5 pb-5">
        <div className="flex items-center justify-center gap-3 mb-4">
          {[
            { val: timeLeft.h, label: 'HR' },
            { val: timeLeft.m, label: 'MIN' },
            { val: timeLeft.s, label: 'SEC' },
          ].map((block, i) => (
            <React.Fragment key={block.label}>
              {i > 0 && (
                <span
                  className="font-black text-xl mb-3 animate-pulse"
                  style={{ color: `${server.color}60` }}
                >
                  :
                </span>
              )}
              <div className="flex flex-col items-center">
                <div
                  className="rounded-xl px-3 py-2 min-w-[56px] text-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, rgba(0,0,0,0.5), ${server.color}08)`,
                    border: `1px solid ${server.color}20`,
                  }}
                >
                  {/* inner glow */}
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${server.color}12, transparent 60%)` }}
                  />
                  <span
                    className="relative text-2xl font-black tabular-nums"
                    style={{ color: urgency && block.label === 'HR' ? '#f87171' : server.color }}
                  >
                    {block.val}
                  </span>
                </div>
                <span className="text-[8px] font-black text-white/25 uppercase tracking-widest mt-1.5">{block.label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 relative overflow-hidden"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${server.color}80, ${server.color})`,
            }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
          </div>
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[8px] text-white/20 font-bold">04:00 Reset</span>
          <span className="text-[8px] font-bold" style={{ color: `${server.color}60` }}>
            {progress.toFixed(0)}% elapsed
          </span>
        </div>
      </div>
    </div>
  );
}
