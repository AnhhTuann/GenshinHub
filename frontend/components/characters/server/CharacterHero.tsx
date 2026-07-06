import { Link } from '@/i18n/routing';
import FallbackImage from '@/components/ui/FallbackImage';
import ParallaxSplash from '@/components/ParallaxSplash';
import AdminEditableSplash from '@/components/AdminEditableSplash';
import ShareButton from '@/components/ShareButton';

export default function CharacterHero({ 
  character, 
  name, 
  title, 
  elColor, 
  elText, 
  elGlow, 
  rarityBadge, 
  rarityStyle, 
  tCommon 
}: { 
  character: any; 
  name: string; 
  title: string; 
  elColor: string; 
  elText: string; 
  elGlow: string; 
  rarityBadge: string; 
  rarityStyle: string; 
  tCommon: any; 
}) {
  return (
    <AdminEditableSplash characterId={character.id}>
      <div className="relative w-full overflow-hidden" style={{ minHeight: 'clamp(400px, 50vw, 650px)' }}>
        {/* Splash art background */}
        {character.splashArtUrl && (
          <ParallaxSplash imageUrl={character.splashArtUrl} />
        )}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06060a] via-[#06060a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06060a]/70 via-transparent to-transparent" />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${elGlow} 0%, transparent 60%)` }}
        />

        {/* Top actions (Back & Share) */}
        <div className="absolute top-4 left-0 right-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-xs font-black uppercase tracking-wider group bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/[0.06] hover:border-white/[0.12]"
          >
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            {tCommon('back')}
          </Link>
          <ShareButton title={`${name} Build - GenshinHub`} />
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-6 sm:pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="flex flex-col gap-2">
            {/* Element + rarity badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/[0.08]">
                <div className="relative w-4 h-4">
                  <FallbackImage src={`/assets/elements/${character.element.toLowerCase()}.webp`} alt={character.element} fill className="object-contain" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: elColor }}>
                  {character.element}
                </span>
              </div>
              <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border backdrop-blur-sm ${rarityStyle}`}>
                {rarityBadge}
              </span>
              {character.weapon && (
                <span className="text-[10px] font-black px-2.5 py-1 rounded-lg border border-white/[0.08] bg-black/30 backdrop-blur-sm text-white/60">
                  {character.weapon}
                </span>
              )}
            </div>

            {/* Name */}
            <div>
              <h1 className={`text-4xl sm:text-5xl md:text-[80px] font-black leading-none uppercase tracking-tight drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] ${elText}`} style={{ fontFamily: 'var(--font-cinzel, Cinzel, serif)' }}>
                {name}
              </h1>
              {title && (
                <p className="text-white/45 text-sm sm:text-base italic mt-1 font-medium">{title}</p>
              )}
            </div>

            {/* Quick stats row */}
            <div className="flex items-center gap-4 flex-wrap mt-1">
              {[
                { label: 'HP', value: character.baseHp, color: 'text-emerald-400' },
                { label: 'ATK', value: character.baseAtk, color: 'text-red-400' },
                { label: 'DEF', value: character.baseDef, color: 'text-blue-400' },
              ].filter(s => s.value).map(({ label, value, color }) => (
                <div key={label} className="flex items-baseline gap-1.5">
                  <span className={`text-base font-black font-display ${color}`}>{value?.toLocaleString()}</span>
                  <span className="text-[10px] text-white/30 uppercase font-bold">{label}</span>
                </div>
              ))}
              {character.region && (
                <>
                  <div className="w-px h-4 bg-white/10" />
                  <span className="text-xs text-white/35 font-medium">{character.region}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Decorative bottom element line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${elColor}60, transparent)` }}
        />
      </div>
    </AdminEditableSplash>
  );
}
