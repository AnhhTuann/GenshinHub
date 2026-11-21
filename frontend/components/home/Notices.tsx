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
        background: 'linear-gradient(145deg, var(--bg-surface), var(--bg-elevated))',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--atlas-shadow)',
      }}
    >
      {/* Tabs */}
      <div className="flex items-center gap-1 px-4 pt-3 pb-0 border-b border-[var(--border-default)]">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-tertiary)] mr-2 flex-shrink-0">
          📋 Notices
        </span>
        {TABS.map(tab => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative pb-2.5 px-3 text-xs font-black transition-colors duration-200 whitespace-nowrap"
              style={{ color: active ? 'var(--gold-ink)' : 'var(--text-secondary)' }}
            >
              {tab.icon} {tab.id}
              {active && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                  style={{ background: 'linear-gradient(90deg, transparent, var(--fantasy-gold), transparent)' }}
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
              background: 'var(--gold-glow)',
              border: '1px solid var(--border-gold)',
            }}
          >
            <span className="text-base leading-none flex-shrink-0 mt-0.5">{item.icon}</span>
            <span
              className="text-xs font-medium leading-relaxed transition-colors duration-200 text-[var(--text-secondary)]"
            >
              {item.text}
            </span>
          </div>
        ))}
        {activeTab === 'Events' && (
          <div className="flex flex-col items-center justify-center h-[80px] text-[var(--text-tertiary)] text-sm">
            <span className="text-2xl mb-1">🎉</span>
            No new events.
          </div>
        )}
        {activeTab === 'Other' && (
          <div className="flex flex-col items-center justify-center h-[80px] text-[var(--text-tertiary)] text-sm">
            <span className="text-2xl mb-1">📌</span>
            No other notices.
          </div>
        )}
      </div>
    </div>
  );
}
