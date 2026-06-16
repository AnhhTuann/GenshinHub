"use client";
import { useState } from 'react';
import { fetchGraphQL, GET_SHOWCASE } from '@/lib/graphql';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { CHARACTER_MAP } from '@/lib/characterMap';

export default function ShowcaseClient() {
  const [uid, setUid] = useState('');
  const [showcase, setShowcase] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const locale = useLocale();
  const t = useTranslations('Showcase');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uid.trim()) return;
    setLoading(true);
    setError('');
    setShowcase(null);
    try {
      const data = await fetchGraphQL(GET_SHOWCASE, { uid: uid.trim() });
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

  const EL_TEXT: Record<string, string> = {
    Pyro: 'text-[#ff6b4a]',
    Hydro: 'text-[#4fc3f7]',
    Cryo: 'text-[#80deea]',
    Electro: 'text-[#ce93d8]',
    Anemo: 'text-[#4db6ac]',
    Geo: 'text-[#ffd54f]',
    Dendro: 'text-[#aed581]',
  };

  return (
    <div className="min-h-screen bg-[#06060a] text-white font-sans">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-5%] left-[25%] w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[15%]  w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[2px] bg-yellow-400 rounded-full" />
              <span className="text-yellow-400/60 text-[10px] font-black uppercase tracking-[0.25em]">Enka.Network</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tighter text-gradient-gold mb-2">
              {t('title')}
            </h1>
            <p className="text-white/35 text-sm max-w-lg leading-relaxed">{t('description')}</p>
          </div>
          <Link
            href="/"
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] hover:border-white/10 rounded-xl text-sm font-semibold text-white/40 hover:text-white/70 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('backToHome')}
          </Link>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            placeholder={t('placeholder')}
            className="flex-1 bg-[#0d0d14]/70 text-white/90 px-5 py-4 rounded-xl border border-white/[0.06] focus:border-yellow-400/30 focus:ring-1 focus:ring-yellow-400/10 outline-none text-sm transition-all placeholder:text-white/20 backdrop-blur-md"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary px-8 py-4 text-sm flex items-center justify-center gap-2 rounded-xl shrink-0"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {t('searching')}
              </>
            ) : (
              t('fetchProfile')
            )}
          </button>
        </form>

        {error && (
          <div className="flex items-center gap-3 p-4 mb-6 bg-red-500/[0.06] border border-red-500/20 rounded-xl text-red-400 text-sm font-medium animate-fade-in">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77 1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </div>
        )}

        {showcase && (
          <div className="bg-[#0d0d14]/60 border border-white/[0.06] rounded-2xl overflow-hidden animate-scale-in backdrop-blur-md shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-5 p-6 border-b border-white/[0.05]">
              {showcase.avatarUrl ? (
                <div className="relative w-20 h-20 rounded-full border-2 border-amber-400/20 overflow-hidden bg-[#0d0d14] shrink-0 shadow-lg">
                  <Image src={showcase.avatarUrl} alt="Player Avatar" fill className="object-cover scale-105" sizes="80px" />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#0d0d14] border-2 border-white/[0.05] flex items-center justify-center text-white/20 text-xs shrink-0">
                  No Avatar
                </div>
              )}
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-black font-display text-white mb-2">{showcase.nickname}</h2>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <span className="text-xs font-bold text-white/40 bg-white/[0.05] border border-white/[0.06] px-3 py-1 rounded-full">
                    AR {showcase.level}
                  </span>
                  <span className="text-xs font-bold text-white/25 bg-black/30 px-3 py-1 rounded-full">
                    UID: {showcase.uid}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">{t('showcaseCharacters')}</span>
                <span className="text-[9px] bg-white/[0.05] border border-white/[0.06] px-2 py-0.5 rounded-full font-mono text-white/40">
                  {showcase.characters.length}
                </span>
              </div>

              {showcase.characters.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {showcase.characters.map((charId: string) => {
                    const mapped = CHARACTER_MAP[charId];
                    if (mapped) {
                      const is5 = mapped.rarity === 5;
                      return (
                        <Link
                          key={charId}
                          href={`/characters/${mapped.id}`}
                          className={`relative flex flex-col justify-end h-44 rounded-2xl border overflow-hidden group transition-all duration-300 ${
                            is5
                              ? 'border-amber-500/20 hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.12)]'
                              : 'border-purple-500/15 hover:border-purple-400/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.10)]'
                          } bg-gradient-to-b ${is5 ? 'from-[#1a1100] to-[#0d0900]' : 'from-[#110a1e] to-[#08050f]'}`}
                        >
                          <div className="absolute inset-0 -z-10 group-hover:scale-[1.06] transition-transform duration-500">
                            <Image
                              src={`/images/avatars/UI_AvatarIcon_${mapped.icon}.png`}
                              alt={mapped.name}
                              fill
                              sizes="150px"
                              className="object-cover object-top opacity-90"
                            />
                          </div>
                          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/95 via-black/50 to-transparent -z-10" />

                          <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                            <Image src={`/elements/${mapped.element.toLowerCase()}.png`} alt={mapped.element} width={14} height={14} className="object-contain" />
                          </div>

                          <div className="text-center pb-2 flex flex-col items-center bg-black/50 border-t border-white/[0.06] backdrop-blur-[2px]">
                            <div className="flex gap-0.5 mb-0.5">
                              {Array(mapped.rarity).fill(0).map((_, i) => (
                                <span key={i} className="text-[7px] text-yellow-400">★</span>
                              ))}
                            </div>
                            <span className={`text-[10px] font-bold truncate px-1.5 max-w-full ${EL_TEXT[mapped.element] ?? 'text-white/80'}`}>
                              {mapped.name}
                            </span>
                          </div>
                        </Link>
                      );
                    }
                    return (
                      <div key={charId} className="bg-white/[0.01] border border-white/[0.03] p-3 rounded-2xl flex flex-col items-center justify-center aspect-square text-center">
                        <div className="text-white/20 text-[9px] font-mono mb-1">ID</div>
                        <div className="text-white/50 text-[10px] font-semibold break-all">{charId}</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-white/[0.05] bg-white/[0.03] p-6 text-white/60 text-sm">No showcased characters found.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
