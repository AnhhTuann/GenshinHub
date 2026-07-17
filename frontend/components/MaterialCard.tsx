\"use client\";

import { motion } from 'framer-motion';
import FallbackImage from '@/components/ui/FallbackImage';

// ─── Rarity config for materials ───────────────────────────
const MAT_RARITY = {
  5: { ring: 'from-[#ffd54f] via-[#f59e0b] to-[#d97706]', glow: 'rgba(245,158,11,', stars: '#ffd54f', badge: 'rgba(245,158,11,0.16)', badgeBorder: 'rgba(245,158,11,0.35)', text: '#ffd54f', dots: 5 },
  4: { ring: 'from-[#c084fc] via-[#a855f7] to-[#7c3aed]', glow: 'rgba(168,85,247,', stars: '#c084fc', badge: 'rgba(168,85,247,0.16)', badgeBorder: 'rgba(168,85,247,0.35)', text: '#c084fc', dots: 4 },
  3: { ring: 'from-[#60a5fa] via-[#3b82f6] to-[#1d4ed8]', glow: 'rgba(59,130,246,', stars: '#93c5fd', badge: 'rgba(59,130,246,0.16)', badgeBorder: 'rgba(59,130,246,0.35)', text: '#93c5fd', dots: 3 },
  2: { ring: 'from-[#4ade80] via-[#22c55e] to-[#15803d]', glow: 'rgba(34,197,94,', stars: '#86efac', badge: 'rgba(34,197,94,0.16)', badgeBorder: 'rgba(34,197,94,0.35)', text: '#86efac', dots: 2 },
  1: { ring: 'from-slate-400 via-slate-500 to-slate-600',   glow: 'rgba(148,163,184,', stars: '#94a3b8', badge: 'rgba(148,163,184,0.12)', badgeBorder: 'rgba(148,163,184,0.25)', text: '#94a3b8', dots: 1 },
};

interface MaterialCardProps {
  id: string;
  nameEn: string;
  nameVi: string;
  type: string;
  rarity: number;
  iconUrl?: string;
  locale: string;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: (e: React.MouseEvent) => void;
}

export default function MaterialCard({ id, nameEn, nameVi, type, rarity, iconUrl, locale, isAdmin, onEdit, onDelete }: MaterialCardProps) {
  const displayName = locale === 'vi' ? nameVi : nameEn;
  const cfg = MAT_RARITY[rarity as 1 | 2 | 3 | 4 | 5] ?? MAT_RARITY[1];

  const getValidIconUrl = (url: string | undefined): string => {
    if (!url) return '';
    let finalUrl = url;
    if (!finalUrl.startsWith('http') && !finalUrl.startsWith('/')) finalUrl = `https://gi.yatta.moe/assets/UI/${finalUrl}`;
    if (finalUrl.includes('enka.network/ui/')) finalUrl = finalUrl.replace('https://enka.network/ui/', 'https://gi.yatta.moe/assets/UI/');
    if (!finalUrl.match(/\.(png|jpg|jpeg|webp|svg)$/)) finalUrl += '.webp';
    return finalUrl;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.90 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -5, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      onClick={isAdmin ? onEdit : undefined}
      className={`relative flex flex-col items-center text-center group rounded-2xl p-3.5 overflow-hidden ${isAdmin ? 'cursor-pointer' : 'cursor-default'}`}
      style={{
        background: `linear-gradient(160deg, rgba(10,10,22,0.95) 0%, rgba(5,5,12,0.99) 100%)`,
        border: `1px solid ${cfg.glow}0.18)`,
        backdropFilter: 'blur(16px)',
        boxShadow: `0 4px 20px rgba(0,0,0,0.40)`,
        transition: 'border-color 0.3s ease, box-shadow 0.35s ease',
      }}
    >
      {/* Top sheen line */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${cfg.glow}0.45), transparent)` }}
      />

      {/* Corner glow */}
      <div
        className="absolute -top-6 -right-6 w-16 h-16 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${cfg.glow}0.20), transparent 70%)`, filter: 'blur(10px)' }}
      />

      {/* Admin delete */}
      {isAdmin && (
        <button
          onClick={onDelete}
          className="absolute top-2 right-2 w-5 h-5 bg-red-500/20 text-red-400 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/40 z-10 text-[10px] font-bold"
        >
          ✕
        </button>
      )}

      {/* Icon with rarity ring */}
      <div className="relative mb-3">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cfg.ring} p-[1.5px]`}>
          <div
            className="w-full h-full rounded-2xl flex items-center justify-center p-2.5 overflow-hidden"
            style={{ background: 'rgba(5,5,12,0.92)', boxShadow: `inset 0 0 16px ${cfg.glow}0.08)` }}
          >
            {iconUrl ? (
              <FallbackImage
                src={getValidIconUrl(iconUrl)}
                alt={displayName} fill
                className="object-contain drop-shadow-lg"
                unoptimized
              />
            ) : (
              <span className="text-white/20 text-[10px] font-bold">NO IMG</span>
            )}
          </div>
        </div>

        {/* Rarity dots below icon */}
        <div className="absolute -bottom-1.5 inset-x-0 flex justify-center gap-0.5">
          {Array.from({ length: cfg.dots }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: cfg.stars, boxShadow: i === 0 ? `0 0 4px ${cfg.glow}0.8)` : undefined }}
            />
          ))}
        </div>
      </div>

      {/* Name */}
      <h3
        className="text-[11px] font-bold leading-tight line-clamp-2 mt-0.5 px-1 transition-colors duration-200"
        style={{ color: 'rgba(255,255,255,0.88)' }}
        title={displayName}
      >
        {displayName}
      </h3>

      {/* Type badge */}
      <div
        className="mt-2 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider truncate max-w-full"
        style={{
          background: cfg.badge,
          border: `1px solid ${cfg.badgeBorder}`,
          color: cfg.text,
        }}
      >
        {type}
      </div>
    </motion.div>
  );
}
