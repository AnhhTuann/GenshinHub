'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/routing';

export default function Notices() {
  const [activeTab, setActiveTab] = useState('Banners');

  const banners = [
    'Event Wish "Frosted Nocturne" - Boosted Drop Rate for "Sharpened Arrowhead" Lohen (Cryo)!',
    'Event Wish "Ancient Flame Ablaze" - Boosted Drop Rate for "Night-Igniting Flame" Mavuika (Pyro)!',
    'Event Wish "Epitome Invocation" - Boosted Drop Rate for Disaster and Remorse (Polearm) and A Thousand Blazing Suns (Claymore)!'
  ];

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-white font-bold text-lg text-gradient-gold">Notices</h2>
      <div className="glass-strong rounded-xl">
        <div className="flex items-center gap-6 px-4 pt-3 border-b border-white/10">
          {['Banners', 'Events', 'Other'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-bold transition-colors ${
                activeTab === tab ? 'text-white border-b-2 border-white' : 'text-white/50 hover:text-white/80'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4 flex flex-col gap-3 min-h-[120px]">
          {activeTab === 'Banners' && banners.map((text, idx) => (
            <div key={idx} className="text-sm text-yellow-500 hover:text-yellow-400 hover:underline cursor-pointer transition-colors">
              {text}
            </div>
          ))}
          {activeTab === 'Events' && (
            <div className="text-sm text-white/50 italic">No new events.</div>
          )}
          {activeTab === 'Other' && (
            <div className="text-sm text-white/50 italic">No other notices.</div>
          )}
        </div>
      </div>
    </div>
  );
}
