'use client';

import React, { useState } from 'react';

const BANNERS = [
  { icon: '⚡', text: 'Event Wish "Frosted Nocturne" — Boosted Drop Rate for Lohen (Cryo)!' },
  { icon: '🔥', text: 'Event Wish "Ancient Flame Ablaze" — Boosted Drop Rate for Mavuika (Pyro)!' },
  { icon: '⚔️', text: 'Event Wish "Epitome Invocation" — Boosted Drop Rate for Disaster and Remorse (Polearm) & A Thousand Blazing Suns (Claymore)!' },
];

const TABS = [
  { id: 'Banners', icon: '📜' },
  { id: 'Events', icon: '🎉' },
  { id: 'Other',  icon: '📌' },
];

export default function Notices() {
  const [activeTab, setActiveTab] = useState('Banners');

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, rgba(13,13,22,0.90), rgba(6,6,12,0.95))',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Tabs */}
      <div className="flex items-center gap-1 px-4 pt-3 pb-0 border-b border-white/[0.06]">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mr-2 flex-shrink-0">
          📋 Notices
        </span>
        {TABS.map(tab => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative pb-2.5 px-3 text-[11px] font-black transition-colors duration-200 whitespace-nowrap"
              style={{ color: active ? '#f0d080' : 'rgba(255,255,255,0.35)' }}
            >
              {tab.icon} {tab.id}
              {active && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                  style={{ background: 'linear-gradient(90deg, transparent, #c8a84b, transparent)' }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2.5 min-h-[110px]">
        {activeTab === 'Banners' && BANNERS.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2.5 p-2.5 rounded-xl transition-all duration-200 cursor-pointer group"
            style={{
              background: 'rgba(200,168,75,0.04)',
              border: '1px solid rgba(200,168,75,0.08)',
            }}
          >
            <span className="text-base leading-none flex-shrink-0 mt-0.5">{item.icon}</span>
            <span
              className="text-[11px] font-medium leading-relaxed transition-colors duration-200"
              style={{ color: 'rgba(240,208,128,0.7)' }}
            >
              {item.text}
            </span>
          </div>
        ))}
        {activeTab === 'Events' && (
          <div className="flex flex-col items-center justify-center h-[80px] text-white/25 text-sm">
            <span className="text-2xl mb-1">🎉</span>
            No new events.
          </div>
        )}
        {activeTab === 'Other' && (
          <div className="flex flex-col items-center justify-center h-[80px] text-white/25 text-sm">
            <span className="text-2xl mb-1">📌</span>
            No other notices.
          </div>
        )}
      </div>
    </div>
  );
}
