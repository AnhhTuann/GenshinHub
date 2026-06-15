'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { tcgCards, TCGCard } from '@/data/tcgCards';
import { metaDecks } from '@/data/tcgDecks';
import { Link } from '@/i18n/routing';

export default function TCGClient({ locale }: { locale: string }) {
  const [activeTab, setActiveTab] = useState<'cards' | 'decks'>('cards');
  const [filterType, setFilterType] = useState<string>('all');
  const [search, setSearch] = useState('');

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
    <main className="min-h-screen pt-[100px] pb-24 relative z-10 px-4 sm:px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <Link href="/" className="text-sm font-bold text-white/50 hover:text-white mb-2 flex items-center gap-1 transition-colors uppercase tracking-widest">
              &larr; Home
            </Link>
            <h1 className="text-4xl font-black text-white mb-1 font-display uppercase tracking-tight text-gradient-gold">
              Genius Invokation TCG
            </h1>
            <p className="text-gray-455 text-sm font-medium">
              Explore {tcgCards.length} cards and the best meta decks in Teyvat.
            </p>
          </div>
          
          <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'cards' ? 'bg-white/10 text-white shadow-lg border border-white/10' : 'text-white/40 hover:text-white/80 hover:bg-white/5'}`}
            >
              Card List
            </button>
            <button
              onClick={() => setActiveTab('decks')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'decks' ? 'bg-white/10 text-white shadow-lg border border-white/10' : 'text-white/40 hover:text-white/80 hover:bg-white/5'}`}
            >
              Meta Decks
            </button>
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
                  <div key={card.id} className="group flex flex-col items-center gap-2">
                    <div className="relative w-full aspect-[256/440] rounded-xl overflow-hidden glass-hover shadow-lg transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
                      <Image
                        src={`/images/tcg/${card.icon}.png`}
                        alt={name}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <span className="text-xs font-semibold text-center text-white/70 group-hover:text-white transition-colors line-clamp-2">
                      {name}
                    </span>
                  </div>
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
                      <div key={charId} className="w-1/3 aspect-[256/440] relative rounded-lg overflow-hidden shadow-xl border border-white/10 group-hover:border-white/20 transition-colors">
                        <Image
                          src={`/images/tcg/${card.icon}.png`}
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
