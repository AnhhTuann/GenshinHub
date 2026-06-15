'use client';

import React, { useState, useEffect } from 'react';

export default function ServerReset() {
  const [activeTab, setActiveTab] = useState('Asia');
  const [timeLeft, setTimeLeft] = useState('00d 00h 00m 00s');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // Reset happens at 4:00 AM server time.
      // Asia is UTC+8, Europe UTC+1, America UTC-5
      const offsetHours = activeTab === 'Asia' ? 8 : activeTab === 'Europe' ? 1 : -5;
      
      const serverTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3600000 * offsetHours));
      
      const resetTime = new Date(serverTime);
      if (serverTime.getHours() >= 4) {
        resetTime.setDate(resetTime.getDate() + 1);
      }
      resetTime.setHours(4, 0, 0, 0);

      const diff = resetTime.getTime() - serverTime.getTime();
      
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${d.toString().padStart(2, '0')}d ${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTab]);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-white font-bold text-lg">Server Reset</h2>
      <div className="yatta-container flex flex-col border-[#463f64]">
        <div className="flex">
          {['Asia', 'Europe', 'America'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 text-sm font-bold border-b border-r last:border-r-0 border-[#463f64] transition-colors ${
                activeTab === tab ? 'bg-[#463f64] text-white' : 'bg-[#312c45] text-white/50 hover:bg-[#3b3552]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="py-2 text-center text-lg font-bold text-white bg-[#3b3552]">
          {timeLeft}
        </div>
      </div>
    </div>
  );
}
