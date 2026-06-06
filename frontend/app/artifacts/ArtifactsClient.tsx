'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ArtifactSet {
  id: string;
  name: string;
  rarityList: number[];
  piece2Desc: string | null;
  piece4Desc: string | null;
  iconUrl: string | null;
}

const PIECE_ICONS = ['⏱️', '🏆', '🌺'];

function RarityStars({ rarityList }: { rarityList: number[] }) {
  const max = Math.max(...rarityList);
  const color = max === 5 ? 'text-yellow-400' : max === 4 ? 'text-purple-400' : 'text-blue-400';
  return <span className={`${color} text-xs font-bold`}>{'★'.repeat(max)}</span>;
}

function rarityBorder(rarityList: number[]) {
  const max = Math.max(...rarityList);
  if (max === 5) return 'border-yellow-500/30 hover:border-yellow-400/60';
  if (max === 4) return 'border-purple-500/30 hover:border-purple-400/60';
  return 'border-blue-500/30 hover:border-blue-400/60';
}

function rarityGlow(rarityList: number[]) {
  const max = Math.max(...rarityList);
  if (max === 5) return 'from-yellow-900/20 to-transparent';
  if (max === 4) return 'from-purple-900/20 to-transparent';
  return 'from-blue-900/20 to-transparent';
}

export default function ArtifactsClient({ artifacts }: { artifacts: ArtifactSet[] }) {
  const [search, setSearch] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<number | null>(null);
  const [selected, setSelected] = useState<ArtifactSet | null>(null);

  const filtered = useMemo(() => {
    return artifacts.filter(a => {
      const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
      const matchRarity = selectedRarity === null || a.rarityList.includes(selectedRarity);
      return matchSearch && matchRarity;
    });
  }, [artifacts, search, selectedRarity]);

  return (
    <main className="min-h-screen bg-[#0b0b0e] text-gray-200 pb-24 font-sans selection:bg-yellow-500/30">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">
        <Link className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium w-fit mb-6" href="/">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Trang chủ
        </Link>
        <h1 className="text-4xl font-black text-white mb-1">💎 Thánh Di Vật</h1>
        <p className="text-gray-400 text-sm">Toàn bộ {artifacts.length} bộ thánh di vật trong Genshin Impact</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="bg-[#15151a] border border-gray-800/60 rounded-2xl p-5 sticky top-6 flex flex-col gap-5">
            {/* Search */}
            <div>
              <label className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 block">Tìm kiếm</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Tên bộ..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-[#0b0b0e] border border-gray-700/60 rounded-xl pl-9 pr-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-yellow-500/60 transition-colors"
                />
              </div>
            </div>

            {/* Rarity Filter */}
            <div>
              <label className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 block">Độ hiếm</label>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setSelectedRarity(null)}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedRarity === null ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                  }`}
                >
                  Tất cả
                </button>
                {[5, 4, 3].map(r => (
                  <button
                    key={r}
                    onClick={() => setSelectedRarity(selectedRarity === r ? null : r)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedRarity === r
                        ? r === 5 ? 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/30'
                          : r === 4 ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                          : 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
                    }`}
                  >
                    <span className={r === 5 ? 'text-yellow-400' : r === 4 ? 'text-purple-400' : 'text-blue-400'}>
                      {'★'.repeat(r)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-800/50">
              <p className="text-gray-500 text-xs">
                Hiển thị <span className="text-gray-300 font-bold">{filtered.length}</span> / {artifacts.length} bộ
              </p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-500">
              Không tìm thấy bộ thánh di vật nào
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map(artifact => (
                <button
                  key={artifact.id}
                  onClick={() => setSelected(artifact)}
                  className={`group text-left bg-[#15151a] border ${rarityBorder(artifact.rarityList)} rounded-2xl overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40`}
                >
                  {/* Top gradient stripe */}
                  <div className={`h-1 w-full bg-gradient-to-r ${
                    Math.max(...artifact.rarityList) === 5 ? 'from-yellow-600 to-amber-400'
                    : Math.max(...artifact.rarityList) === 4 ? 'from-purple-600 to-violet-400'
                    : 'from-blue-600 to-sky-400'
                  }`} />

                  <div className="p-4 flex gap-4 items-start">
                    {/* Icon */}
                    <div className={`relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br ${
                      Math.max(...artifact.rarityList) === 5 ? 'from-[#FFE082]/20 to-[#E65100]/20'
                      : Math.max(...artifact.rarityList) === 4 ? 'from-[#CE93D8]/20 to-[#6A1B9A]/20'
                      : 'from-[#90CAF9]/20 to-[#0D47A1]/20'
                    } border border-white/5`}>
                      {artifact.iconUrl ? (
                        <Image
                          src={artifact.iconUrl}
                          alt={artifact.name}
                          fill
                          className="object-contain p-1.5 group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">💎</div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm leading-tight mb-1 group-hover:text-yellow-100 transition-colors">
                        {artifact.name}
                      </p>
                      <RarityStars rarityList={artifact.rarityList} />

                      <div className="mt-2 space-y-1">
                        {artifact.piece2Desc && (
                          <div className="flex gap-1.5">
                            <span className="text-gray-500 text-[10px] font-bold mt-0.5 shrink-0">2⃣</span>
                            <p className="text-gray-400 text-[10px] leading-relaxed line-clamp-2">{artifact.piece2Desc}</p>
                          </div>
                        )}
                        {artifact.piece4Desc && (
                          <div className="flex gap-1.5">
                            <span className="text-gray-500 text-[10px] font-bold mt-0.5 shrink-0">4⃣</span>
                            <p className="text-gray-400 text-[10px] leading-relaxed line-clamp-2">{artifact.piece4Desc}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className={`bg-[#15151a] border ${rarityBorder(selected.rarityList)} rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden`}
            onClick={e => e.stopPropagation()}
          >
            {/* Top gradient */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${
              Math.max(...selected.rarityList) === 5 ? 'from-yellow-600 via-amber-400 to-orange-500'
              : Math.max(...selected.rarityList) === 4 ? 'from-purple-600 via-violet-400 to-fuchsia-500'
              : 'from-blue-600 via-sky-400 to-cyan-500'
            }`} />

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <div className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br ${
                  Math.max(...selected.rarityList) === 5 ? 'from-[#FFE082]/30 to-[#E65100]/30'
                  : Math.max(...selected.rarityList) === 4 ? 'from-[#CE93D8]/30 to-[#6A1B9A]/30'
                  : 'from-[#90CAF9]/30 to-[#0D47A1]/30'
                } border border-white/10 shadow-lg`}>
                  {selected.iconUrl ? (
                    <Image src={selected.iconUrl} alt={selected.name} fill className="object-contain p-2" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">💎</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-black text-white leading-tight mb-1">{selected.name}</h2>
                  <RarityStars rarityList={selected.rarityList} />
                  <p className="text-gray-500 text-xs mt-1">
                    Max {Math.max(...selected.rarityList)}★ · {selected.rarityList.join(', ')}★
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors text-lg leading-none"
                >✕</button>
              </div>

              {/* Bonuses */}
              <div className="space-y-3">
                {selected.piece2Desc && (
                  <div className="bg-[#0b0b0e]/70 border border-gray-800/60 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-black px-2 py-0.5 rounded-md ${
                        Math.max(...selected.rarityList) === 5 ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-purple-500/20 text-purple-400'
                      }`}>2 Mảnh</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{selected.piece2Desc}</p>
                  </div>
                )}
                {selected.piece4Desc && (
                  <div className="bg-[#0b0b0e]/70 border border-gray-800/60 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-black px-2 py-0.5 rounded-md ${
                        Math.max(...selected.rarityList) === 5 ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-purple-500/20 text-purple-400'
                      }`}>4 Mảnh</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{selected.piece4Desc}</p>
                  </div>
                )}
                {!selected.piece2Desc && !selected.piece4Desc && (
                  <p className="text-gray-500 text-sm text-center py-4">Chưa có dữ liệu hiệu ứng</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
