"use client";
import { useState } from 'react';
import { fetchGraphQL, GET_SHOWCASE } from '@/lib/graphql';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { CHARACTER_MAP } from '@/lib/characterMap';

export default function ShowcasePage() {
  const [uid, setUid] = useState('');
  const [showcase, setShowcase] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const locale = useLocale();
  const t = useTranslations('Showcase');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uid) return;
    setLoading(true);
    setError('');
    setShowcase(null);
    try {
      const data = await fetchGraphQL(GET_SHOWCASE, { uid });
      if (data.showcase) {
        setShowcase(data.showcase);
      } else {
        setError('Player not found or profile is not public on Enka.Network.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while connecting to Enka.Network API.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-zinc-100 py-12 px-4 md:px-8 font-sans">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500 mb-3">
              {t('title')}
            </h1>
            <p className="text-sm md:text-base text-zinc-400 max-w-2xl font-light">
              {t('description')}
            </p>
          </div>
          <Link 
            href="/" 
            className="px-5 py-2.5 bg-zinc-900/40 hover:bg-zinc-800/40 border border-white/5 hover:border-amber-500/30 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 text-zinc-300 hover:text-white"
          >
            ← {t('backToHome')}
          </Link>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-12">
          <input 
            type="text" 
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            placeholder={t('placeholder')}
            className="flex-1 bg-[#0f0f15]/80 text-white px-5 py-4 rounded-xl border border-white/5 focus:border-amber-500/50 outline-none text-lg transition duration-300 placeholder:text-zinc-600 backdrop-blur-md"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold rounded-xl hover:brightness-110 active:brightness-95 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 font-display text-sm tracking-wider uppercase"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('searching')}
              </>
            ) : t('fetchProfile')}
          </button>
        </form>

        {/* Error message */}
        {error && (
          <div className="p-5 mb-10 bg-red-500/5 border border-red-500/20 rounded-2xl text-red-400 font-medium flex items-center gap-3 backdrop-blur-md animate-fade-in">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Showcase Results */}
        {showcase && (
          <div className="backdrop-blur-md bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
            {/* Glowing inner orbs */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
            
            {/* Player Info Banner */}
            <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10 mb-10 pb-8 border-b border-white/5">
              {showcase.avatarUrl ? (
                <div className="relative w-24 h-24 rounded-full border-2 border-amber-500/30 overflow-hidden bg-[#0d0d12] shadow-lg flex-shrink-0">
                  <Image 
                    src={showcase.avatarUrl} 
                    alt="Player Avatar" 
                    fill 
                    className="object-cover scale-105"
                    sizes="96px"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-zinc-900 border-2 border-white/5 shadow-lg flex-shrink-0 flex items-center justify-center">
                  <span className="text-zinc-500 text-xs">No Avatar</span>
                </div>
              )}
              
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-display font-black tracking-tight text-white mb-2">{showcase.nickname}</h2>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2.5 items-center">
                  <span className="text-xs font-semibold text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    AR {showcase.level}
                  </span>
                  <span className="text-xs font-semibold text-zinc-500 bg-black/40 px-3 py-1 rounded-full">
                    UID: {showcase.uid}
                  </span>
                </div>
              </div>
            </div>

            {/* Showcase Characters */}
            <div className="relative z-10">
              <h3 className="text-xs font-bold font-display uppercase tracking-[0.25em] mb-6 text-zinc-400/80 flex items-center gap-2">
                {t('showcaseCharacters')}
                <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full font-mono font-normal text-zinc-300">
                  {showcase.characters.length}
                </span>
              </h3>
              
              {showcase.characters.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {showcase.characters.map((charId: string) => {
                    const mapped = CHARACTER_MAP[charId];
                    if (mapped) {
                      const is5Star = mapped.rarity === 5;
                      const cardBg = is5Star 
                        ? 'border-amber-500/20 from-amber-950/10 via-amber-900/10 to-amber-800/30 hover:border-amber-400/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]' 
                        : 'border-purple-500/20 from-purple-950/10 via-purple-900/10 to-purple-800/30 hover:border-purple-400/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]';
                      const avatarUrl = `/images/avatars/${mapped.id}.png`;

                      return (
                        <Link 
                          key={charId} 
                          href={`/characters/${mapped.id}`}
                          className={`relative flex flex-col justify-end h-44 rounded-2xl border bg-gradient-to-b ${cardBg} transition-all duration-300 overflow-hidden group`}
                        >
                          {/* Character Image */}
                          <div className="absolute inset-0 flex items-center justify-center -z-10 group-hover:scale-105 transition-transform duration-500">
                            <Image 
                              src={avatarUrl} 
                              alt={mapped.name} 
                              fill
                              sizes="(max-width: 768px) 100px, 150px"
                              className="object-cover w-full h-full opacity-90 mask-image-bottom"
                            />
                          </div>
                          
                          {/* Bottom Fade */}
                          <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-black/95 via-black/40 to-transparent -z-10"></div>

                          {/* Element Icon Badge (Top Left) */}
                          <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-md border border-white/5 w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                            <Image 
                              src={`/elements/${mapped.element.toLowerCase()}.png`} 
                              alt={mapped.element} 
                              width={16}
                              height={16}
                              className="w-4 h-4 object-contain drop-shadow-[0_0_4px_rgba(0,0,0,0.5)]"
                            />
                          </div>

                          {/* Info Area */}
                          <div className="w-full text-center pb-2 pt-0.5 flex flex-col items-center bg-black/45 backdrop-blur-[1px] border-t border-white/5 z-10">
                            {/* Star Rating */}
                            <div className="flex gap-0.5 mb-0.5">
                              {Array(mapped.rarity).fill(0).map((_, i) => (
                                <span key={i} className="text-[8px] text-yellow-400">★</span>
                              ))}
                            </div>
                            
                            {/* Name */}
                            <span className="text-[11px] font-bold tracking-wide text-gray-100 truncate px-1.5 max-w-full">
                              {mapped.name}
                            </span>
                          </div>
                        </Link>
                      );
                    }

                    // Fallback display if not mapped
                    return (
                      <div key={charId} className="bg-white/[0.01] border border-white/[0.03] p-4 rounded-2xl flex flex-col items-center justify-center aspect-square text-center">
                        <div className="text-zinc-500 text-[10px] font-mono mb-1">Avatar ID</div>
                        <div className="text-base font-bold text-white mb-2">{charId}</div>
                        <div className="text-[10px] text-zinc-400 italic">Unknown character</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-zinc-500 italic text-center py-8">
                  {t('noCharacters')}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
