'use client';

import React, { useState, useMemo } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import Image from 'next/image';
import { tcgCards, TCGCard } from '@/data/tcgCards';
import { metaDecks } from '@/data/tcgDecks';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function TCGClient({ locale }: { locale: string }) {
  const [activeTab, setActiveTab] = useState<'cards' | 'decks'>('cards');
  const [filterType, setFilterType] = useState<string>('all');
  const [search, setSearch] = useState('');
  const t = useTranslations('Common');

  // Extract unique card types
  const cardTypes = useMemo(() => {
    const types = new Set(tcgCards.map(c => c.type));
    return Array.from(types);
  }, []);

  const filteredCards = useMemo(() => {
    return tcgCards.filter(card => {
      if (filterType !== 'all' && card.type !== filterType) return false;
      
      const q = search.toLowerCase();
      const name = locale === 'vi' ? card.nameVi : card.nameEn;
      if (q && !name.toLowerCase().includes(q)) return false;
      
      return true;
    });
  }, [filterType, search, locale]);

  return (
    <main className="min-h-screen pt-[100px] pb-24 relative z-10 px-4 sm:px-6" style={{ background: 'var(--bg-void, #04040a)' }}>
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(200,168,75,0.06) 0%, transparent 70%)', filter: 'blur(120px)' }} />
        <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(127,90,240,0.05) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      </div>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <Link href="/" className="text-sm font-bold text-white/50 hover:text-white mb-2 flex items-center gap-1 transition-colors uppercase tracking-widest">
              &larr; Home
            </Link>
            <h1 className="text-4xl font-black text-white mb-1 font-display uppercase tracking-tight text-gradient-gold">
              {t('tcg')}
            </h1>
            <p className="text-gray-455 text-sm font-medium">
              {locale === 'vi' ? `Khám phá ${tcgCards.length} lá bài và các bộ bài Meta Teyvat` : `Explore ${tcgCards.length} cards and the best meta decks in Teyvat.`}
            </p>
          </div>
          
          <div className="flex items-center gap-1 border-b border-white/[0.06] pb-0">
            {[
              { id: 'cards', label: 'Card List', icon: '🃏' },
              { id: 'decks', label: 'Meta Decks', icon: '🏆' },
            ].map(tab => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'cards' | 'decks')}
                  className="relative pb-2.5 px-4 text-xs sm:text-sm font-black transition-colors duration-200 uppercase tracking-wider"
                  style={{ color: active ? '#f0d080' : 'rgba(255,255,255,0.4)' }}
                >
                  <span className="mr-1.5">{tab.icon}</span>{tab.label}
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
        </div>

        {/* Tab Content: Cards */}
        {activeTab === 'cards' && (
          <div className="animate-fade-in-up">
            <div className="flex flex-col sm:flex-row gap-4 mb-8 glass-strong p-4 rounded-2xl border-white/10">
              <input
                type="text"
                placeholder="Search cards..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-base flex-1 min-w-0"
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="input-base sm:w-48"
              >
                <option value="all">All Types</option>
                {cardTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {filteredCards.map((card) => {
                const name = locale === 'vi' ? card.nameVi : card.nameEn;
                return (
                  <Link href={`/tcg/${card.id}`} key={card.id} className="group flex flex-col items-center gap-2 cursor-pointer">
                    <div className="relative w-full aspect-[256/440] transition-transform duration-300 group-hover:-translate-y-2 drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_15px_25px_rgba(200,168,75,0.3)]">
                      <FallbackImage
                        src={`/assets/tcg/${card.icon}.webp`}
                        alt={name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <span className="text-xs font-semibold text-center text-white/70 group-hover:text-white transition-colors line-clamp-2">
                      {name}
                    </span>
                  </Link>
                );
              })}
            </div>
            
            {filteredCards.length === 0 && (
              <div className="text-center py-24 text-white/40 font-medium">
                No cards found matching your criteria.
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Decks */}
        {activeTab === 'decks' && (
          <div className="animate-fade-in-up grid grid-cols-1 lg:grid-cols-2 gap-8">
            {metaDecks.map(deck => (
              <div key={deck.id} className="glass-strong p-6 rounded-3xl border-white/10 flex flex-col gap-6 relative overflow-hidden group hover:border-white/20 transition-all">
                {/* Decorative background glow */}
                <div className="absolute -inset-24 bg-gradient-to-br from-[var(--gold-glow)] to-transparent opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 -z-10 pointer-events-none" />
                
                <div>
                  <h3 className="text-2xl font-black text-white mb-2 font-display">{deck.name}</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-medium">{deck.description}</p>
                </div>
                
                <div className="flex gap-4">
                  {deck.characterIds.map(charId => {
                    const card = tcgCards.find(c => c.id === charId);
                    if (!card) return null;
                    return (
                      <div key={charId} className="w-1/3 aspect-[256/440] relative drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_15px_25px_rgba(200,168,75,0.3)] transition-all group-hover:-translate-y-2 duration-300">
                        <FallbackImage
                          src={`/assets/tcg/${card.icon}.webp`}
                          alt={card.nameEn}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
