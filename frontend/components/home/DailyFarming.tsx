'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getFarmingDataForDay, DailyDomain } from '@/data/dailyFarming';

interface DailyFarmingProps {
  locale: string;
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function DailyFarming({ locale }: DailyFarmingProps) {
  const [selectedDay, setSelectedDay] = useState(1); // Default to Monday temporarily
  const [data, setData] = useState<DailyDomain[] | null>(null);

  useEffect(() => {
    // On mount, set to today's server day
    const now = new Date();
    const serverTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3600000 * 8));
    if (serverTime.getHours() < 4) serverTime.setDate(serverTime.getDate() - 1);
    setSelectedDay(serverTime.getDay());
  }, []);

  useEffect(() => {
    setData(getFarmingDataForDay(selectedDay));
  }, [selectedDay]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-4 justify-between border-b border-white/10 pb-3">
        <h2 className="text-white font-bold text-xl flex items-center gap-2 text-gradient-gold">
          <span className="text-2xl">⚙️</span> Daily Farming
        </h2>
        <select 
          value={selectedDay} 
          onChange={e => setSelectedDay(Number(e.target.value))}
          className="bg-black/40 text-white border border-white/20 rounded px-4 py-1.5 text-sm outline-none cursor-pointer hover:border-white/40 focus:border-yellow-500 transition-colors"
        >
          {days.map((day, idx) => (
            <option key={idx} value={idx}>{day}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {selectedDay === 0 ? (
          <div className="lg:col-span-2 xl:col-span-3 flex flex-col items-center justify-center p-12 text-center glass-strong rounded-xl">
            <span className="text-5xl mb-4">✨</span>
            <p className="text-white font-bold text-xl mb-2 text-gradient-gold">Sunday All-Access</p>
            <p className="text-white/70">All Domains are open. Farm any material you need!</p>
          </div>
        ) : data ? (
          data.map((domain, idx) => (
            <div key={idx} className="glass-strong rounded-xl flex flex-col h-full">
              <div className="bg-black/20 px-4 py-3 border-b border-white/10 flex items-center gap-3">
                <div className="relative w-8 h-8 shrink-0">
                  <Image src={domain.itemIcon} alt="domain item" fill className="object-contain drop-shadow-md" unoptimized />
                </div>
                <span className="font-bold text-[15px]">{domain.domainName}</span>
              </div>
              <div className="p-4 flex flex-wrap gap-3 flex-1 content-start">
                {domain.characters.map((char) => (
                  <div key={char.id} className={`yatta-item yatta-item-${char.rarity}star`} title={char.name}>
                    <Image src={char.avatarUrl} alt={char.name} fill className="object-cover" unoptimized />
                    <div className="yatta-item-element">
                      <Image src={`/images/elements/${char.element.toLowerCase()}.png`} alt={char.element} fill className="object-contain" unoptimized />
                    </div>
                  </div>
                ))}
                {domain.weapons.map((weapon) => (
                  <div key={weapon.id} className={`yatta-item yatta-item-${weapon.rarity}star`} title={weapon.name}>
                    <Image src={weapon.iconUrl} alt={weapon.name} fill className="object-cover" unoptimized />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
}
