export function SectionHeader({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className={`w-[3px] h-5 rounded-full ${accent}`} />
      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 font-display">{label}</span>
    </div>
  );
}

export function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-[#06060a]/60 border border-white/[0.05] rounded-xl p-3 sm:p-4 flex flex-col items-center gap-1">
      <span className={`text-xl sm:text-2xl font-black font-display ${color}`}>{value.toLocaleString()}</span>
      <span className="text-white/25 text-[9px] font-black uppercase tracking-wider">{label}</span>
    </div>
  );
}

export default function CharacterOverview({ 
  character, 
  desc, 
  elColor, 
  accentCls, 
  t 
}: { 
  character: any; 
  desc: string; 
  elColor: string; 
  accentCls: string; 
  t: any; 
}) {
  return (
    <section className="bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl overflow-hidden">
      <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${elColor}60, transparent)` }} />
      <div className="p-5 sm:p-6">
        <SectionHeader label="Overview" accent={accentCls} />
        {desc && (
          <p className="text-white/40 text-sm leading-relaxed mb-5 border-l-2 border-white/[0.07] pl-4 italic">{desc}</p>
        )}
        <p className="text-white/20 text-[9px] font-black uppercase tracking-widest mb-3">{t('baseStats')} (Lv. 90)</p>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <StatCard label={t('hp')}  value={character.baseHp  || 0} color="text-emerald-400" />
          <StatCard label={t('atk')} value={character.baseAtk || 0} color="text-red-400" />
          <StatCard label={t('def')} value={character.baseDef || 0} color="text-blue-400" />
        </div>
      </div>
    </section>
  );
}
