"use client";
import { useState } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
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
        <div
          className="absolute -top-[15%] left-[10%] w-[700px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(200,168,75,0.06) 0%, transparent 70%)', filter: 'blur(130px)' }}
        />
        <div
          className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(127,90,240,0.04) 0%, transparent 70%)', filter: 'blur(110px)' }}
        />
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

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="relative flex-1 group">
            <input
              type="text"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              placeholder={t('placeholder')}
              className="w-full bg-[#0d0d14]/80 text-white/90 px-6 py-4 rounded-2xl outline-none text-sm font-medium transition-all placeholder:text-white/30 backdrop-blur-md"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(200,168,75,0.4)';
                e.target.style.boxShadow = '0 0 0 3px rgba(200,168,75,0.1), 0 4px 20px rgba(0,0,0,0.2)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 rounded-2xl shrink-0 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, #e8c46b, #c8a84b)',
              color: '#000',
              boxShadow: '0 8px 25px -5px rgba(200,168,75,0.3)',
            }}
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
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                {t('fetchProfile')}
              </>
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
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0" style={{ background: '#0d0d14', border: '1px solid rgba(200,168,75,0.3)', boxShadow: '0 0 20px rgba(200,168,75,0.15)' }}>
                  <FallbackImage src={showcase.avatarUrl} alt="Player Avatar" fill className="object-cover scale-105" sizes="96px" />
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
                          className="relative flex flex-col justify-end h-48 rounded-2xl border overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                          style={{
                            border: `1px solid ${is5 ? 'rgba(245,158,11,0.25)' : 'rgba(168,85,247,0.25)'}`,
                            background: `linear-gradient(to top, ${is5 ? 'rgba(245,158,11,0.08)' : 'rgba(168,85,247,0.08)'} 0%, rgba(8,8,16,0.9) 100%)`,
                          }}
                        >
                          <div className="absolute inset-0 -z-10 group-hover:scale-[1.08] transition-transform duration-500">
                            <FallbackImage
                              src={`/assets/characters/UI_AvatarIcon_${mapped.icon}.webp`}
                              alt={mapped.name}
                              fill
                              sizes="150px"
                              className="object-cover object-top opacity-90"
                            />
                          </div>
                          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/95 via-black/40 to-transparent -z-10" />

                          <div
                            className="absolute top-2 left-2 p-1 rounded-lg backdrop-blur-sm"
                            style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}
                          >
                            <FallbackImage src={`/assets/elements/${mapped.element.toLowerCase()}.webp`} alt={mapped.element} width={20} height={20} className="object-contain" />
                          </div>

                          <div className="text-center pb-3 flex flex-col items-center bg-black/40 backdrop-blur-[2px]">
                            <div className="flex gap-0.5 mb-1 mt-1">
                              {Array(mapped.rarity).fill(0).map((_, i) => (
                                <span key={i} className="text-[8px] text-yellow-400 drop-shadow-md">★</span>
                              ))}
                            </div>
                            <span className={`text-[11px] font-bold truncate px-2 w-full ${EL_TEXT[mapped.element] ?? 'text-white/80'}`}>
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
