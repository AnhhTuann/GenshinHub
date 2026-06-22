'use client';

import React, { useState, useEffect } from 'react';

const SERVERS = [
  { label: 'Asia', offset: 8, flag: '🌏' },
  { label: 'Europe', offset: 1, flag: '🌍' },
  { label: 'America', offset: -5, flag: '🌎' },
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

  return (
    <div className="bg-[#0d0d14]/80 border border-white/[0.06] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Server Reset</span>
        </div>
        {/* Server tabs */}
        <div className="flex gap-1 bg-black/30 p-0.5 rounded-lg border border-white/[0.05]">
          {SERVERS.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setActiveIdx(i)}
              className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all duration-200 ${
                activeIdx === i
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-white/30 hover:text-white/60'
              }`}
            >
              {s.flag} {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Countdown */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-center gap-2 mb-3">
          {[
            { val: timeLeft.h, label: 'HR' },
            { val: timeLeft.m, label: 'MIN' },
            { val: timeLeft.s, label: 'SEC' },
          ].map((block, i) => (
            <React.Fragment key={block.label}>
              {i > 0 && <span className="text-white/20 font-black text-xl mb-3">:</span>}
              <div className="flex flex-col items-center">
                <div className="bg-black/40 border border-white/[0.07] rounded-xl px-3 py-2 min-w-[52px] text-center">
                  <span className="text-2xl font-black text-white font-display tabular-nums">{block.val}</span>
                </div>
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest mt-1">{block.label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-emerald-500/60 to-emerald-400"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[8px] text-white/20 font-bold">04:00 Reset</span>
          <span className="text-[8px] text-white/20 font-bold">{progress.toFixed(0)}% of day elapsed</span>
        </div>
      </div>
    </div>
  );
}
