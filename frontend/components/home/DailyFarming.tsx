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
    <div className="flex flex-col gap-2 h-full">
      <div className="flex items-center gap-2">
        <h2 className="text-white font-bold text-lg flex items-center gap-2">
          <span className="text-xl">⚙️</span> Daily Farming
        </h2>
        <div className="ml-auto">
          <select 
            value={selectedDay} 
            onChange={e => setSelectedDay(Number(e.target.value))}
            className="bg-[#312c45] text-white border border-[#463f64] rounded px-3 py-1 text-sm outline-none cursor-pointer focus:border-purple-500"
          >
            {days.map((day, idx) => (
              <option key={idx} value={idx}>{day}</option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-xs text-white/50 mb-1">You can click on the icon above to highlight items you want to farm</p>

      <div className="yatta-container flex-1 overflow-y-auto custom-scrollbar flex flex-col">
        {selectedDay === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <span className="text-4xl mb-3">✨</span>
            <p className="text-white font-bold mb-1">Sunday All-Access</p>
            <p className="text-sm text-white/50">All Domains are open. Farm any material you need!</p>
          </div>
        ) : data ? (
          data.map((domain, idx) => (
            <div key={idx} className="flex flex-col border-b border-[#463f64] last:border-b-0">
              <div className="yatta-header gap-2 justify-start">
                <div className="relative w-6 h-6">
                  <Image src={domain.itemIcon} alt="domain item" fill className="object-contain drop-shadow-md" unoptimized />
                </div>
                <span>{domain.domainName}</span>
              </div>
              <div className="p-3 bg-[#252236] flex flex-wrap gap-2">
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

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #252236; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #463f64; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #5c5382; }
      `}</style>
    </div>
  );
}
