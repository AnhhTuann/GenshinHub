\"use client\";
import FallbackImage from '@/components/ui/FallbackImage';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { ArtifactBuild } from '@/types/character';
import { ExternalLink, Layers } from 'lucide-react';

// ── Rarity visual config ───────────────────────────────────
const RARITY_CFG = {
  5: {
    iconRing: 'from-[#ffd54f] via-[#f59e0b] to-[#d97706]',
    glow: 'rgba(245,158,11,',
    border: 'rgba(245,158,11,0.22)',
    borderHover: 'rgba(245,158,11,0.50)',
    badge: { bg: 'rgba(245,158,11,0.14)', border: 'rgba(245,158,11,0.35)', text: '#ffd54f' },
    subPriority: { bg: 'rgba(250,204,21,0.12)', border: 'rgba(250,204,21,0.28)', text: '#fde68a' },
    slotBg: 'rgba(245,158,11,0.06)',
    slotBorder: 'rgba(245,158,11,0.12)',
    stars: '★★★★★',
    starColor: '#ffd54f',
  },
  4: {
    iconRing: 'from-[#c084fc] via-[#a855f7] to-[#7c3aed]',
    glow: 'rgba(168,85,247,',
    border: 'rgba(168,85,247,0.22)',
    borderHover: 'rgba(168,85,247,0.50)',
    badge: { bg: 'rgba(168,85,247,0.14)', border: 'rgba(168,85,247,0.35)', text: '#c084fc' },
    subPriority: { bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.28)', text: '#e9d5ff' },
    slotBg: 'rgba(168,85,247,0.06)',
    slotBorder: 'rgba(168,85,247,0.12)',
    stars: '★★★★',
    starColor: '#c084fc',
  },
};

export default function ArtifactCard({ artifact }: { artifact: ArtifactBuild }) {
  const locale = useLocale();
  const t = useTranslations('Artifact');
  const rarity = artifact.rarity || 5;
  const setName = locale === 'en' ? artifact.setNameEn : artifact.setNameVi;
  const isMix = artifact.mixSets && artifact.mixSets.length > 0;
  const shouldReduceMotion = useReducedMotion();

  const cfg = rarity === 5 ? RARITY_CFG[5] : RARITY_CFG[4];

  const cardBody = (
    <>
      {/* ── Header ── */}
      <div className="flex items-start gap-3 mb-4">
        {/* Artifact icon with animated ring */}
        <div className="relative shrink-0 mt-0.5">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cfg.iconRing} p-[1.5px]`}>
            <div
              className="w-full h-full rounded-2xl flex items-center justify-center overflow-hidden"
              style={{ background: 'rgba(5,5,12,0.90)' }}
            >
              {artifact.iconUrl ? (
                <FallbackImage src={artifact.iconUrl} alt={setName || 'Artifact'} width={48} height={48} className="object-contain" />
              ) : (
                <span className="text-2xl">💎</span>
              )}
            </div>
          </div>
          {/* Glow dot */}
          <div
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[rgba(5,5,12,0.95)]"
            style={{ background: cfg.badge.text, boxShadow: `0 0 8px ${cfg.glow}0.7)` }}
          />
        </div>

        {/* Name + meta */}
        <div className="flex-1 min-w-0">
          <div
            className="text-[9px] font-black uppercase tracking-[0.2em] mb-1 flex items-center gap-1.5"
            style={{ color: cfg.starColor }}
          >
            <span>{cfg.stars}</span>
            <span className="opacity-50">·</span>
            <span style={{ color: cfg.badge.text }}>{isMix ? 'Mix 2pc' : artifact.pieces === 2 ? t('2piece') : t('4piece')}</span>
          </div>
          <h4 className="font-black text-white/90 text-sm leading-tight truncate">
            {isMix
              ? (locale === 'en' ? 'Mix 2-Piece Sets' : 'Kết hợp bộ 2 món')
              : (setName && !setName.includes('Thánh Di Vật') && !setName.toLowerCase().includes('mix')
                  ? setName
                  : locale === 'en' ? 'Recommended Artifacts' : 'Đề Xuất Thánh Di Vật')}
          </h4>
          {!isMix && artifact.artifactSetId && (
            <div className="flex items-center gap-1 mt-1">
              <ExternalLink className="w-2.5 h-2.5 opacity-40" style={{ color: cfg.badge.text }} />
              <span className="text-[9px] opacity-40 font-semibold" style={{ color: cfg.badge.text }}>
                {locale === 'en' ? 'View Set' : 'Xem Bộ'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="h-px mb-4" style={{ background: `linear-gradient(90deg, transparent, ${cfg.glow}0.20), transparent)` }} />

      {/* ── Mix sets list ── */}
      {isMix && (
        <div className="space-y-2 mb-4">
          {artifact.mixSets!.map((set, idx) => {
            const sName = locale === 'en' ? set.nameEn : set.nameVi;
            const row = (
              <div
                key={idx}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 transition-all duration-200"
                style={{ background: cfg.slotBg, border: `1px solid ${cfg.slotBorder}` }}
              >
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${cfg.iconRing} p-[1px] shrink-0`}>
                  <div className="w-full h-full rounded-md flex items-center justify-center" style={{ background: 'rgba(5,5,12,0.85)' }}>
                    {set.iconUrl
                      ? <FallbackImage src={set.iconUrl} alt={sName} width={22} height={22} className="object-contain" />
                      : <span className="text-xs">💎</span>}
                  </div>
                </div>
                <span className="text-xs font-semibold text-white/75 flex-1 truncate">{sName}</span>
                <span
                  className="text-[8px] font-black px-1.5 py-0.5 rounded-md shrink-0"
                  style={{ background: cfg.badge.bg, border: `1px solid ${cfg.badge.border}`, color: cfg.badge.text }}
                >
                  2pc
                </span>
              </div>
            );
            return set.artifactSetId
              ? <Link key={idx} href={`/artifacts/${set.artifactSetId}`} className="block hover:opacity-80 transition-opacity">{row}</Link>
              : <div key={idx}>{row}</div>;
          })}
        </div>
      )}

      {/* ── Main Stat Slots Grid ── */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'Sands', emoji: '⏳', values: artifact.sands },
          { label: 'Goblet', emoji: '🏺', values: artifact.goblet },
          { label: 'Circlet', emoji: '👑', values: artifact.circlet },
        ].map(({ label, emoji, values }) => (
          <div
            key={label}
            className="rounded-xl p-2.5 flex flex-col items-center gap-1.5 transition-colors duration-200 group/slot"
            style={{ background: cfg.slotBg, border: `1px solid ${cfg.slotBorder}` }}
          >
            <span className="text-sm select-none">{emoji}</span>
            <span className="text-white/30 text-[7px] font-black uppercase tracking-widest">{label}</span>
            <span className="text-white/80 text-[9px] font-bold text-center leading-snug">
              {values.join(' /\n')}
            </span>
          </div>
        ))}
      </div>

      {/* ── Substats priority ── */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-2.5 h-2.5 opacity-40" style={{ color: cfg.badge.text }} />
          <span className="text-white/30 text-[8px] font-black uppercase tracking-[0.2em]">{t('substats')}</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {artifact.subStatsPriority.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <span
                className="text-[9px] font-bold px-2 py-0.5 rounded-lg transition-colors"
                style={
                  idx === 0
                    ? { background: cfg.subPriority.bg, border: `1px solid ${cfg.subPriority.border}`, color: cfg.subPriority.text }
                    : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.45)' }
                }
              >
                {stat}
              </span>
              {idx < artifact.subStatsPriority.length - 1 && (
                <span className="text-white/15 text-[10px]">›</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const wrappedCard = (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 380, damping: 26 }}
      className="relative rounded-3xl p-5 group overflow-hidden"
      style={{
        background: `linear-gradient(145deg, rgba(12,12,24,0.96) 0%, rgba(5,5,12,0.99) 100%)`,
        border: `1px solid ${cfg.border}`,
        backdropFilter: 'blur(20px)',
        boxShadow: `0 4px 24px rgba(0,0,0,0.45)`,
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onHoverStart={() => {}}
    >
      {/* Top-right corner accent glow */}
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${cfg.glow}0.12), transparent 70%)`, filter: 'blur(12px)' }}
      />

      {cardBody}
    </motion.div>
  );

  if (!isMix && artifact.artifactSetId) {
    return <Link href={`/artifacts/${artifact.artifactSetId}`} className="block">{wrappedCard}</Link>;
  }
  return wrappedCard;
}
