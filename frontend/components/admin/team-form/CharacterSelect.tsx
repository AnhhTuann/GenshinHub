import React, { useState, useEffect, useRef } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';

export function CharacterSelect({ value, onChange, allCharacters }: any) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selected = allCharacters.find((c: any) => c.id === value);
  const filtered = allCharacters.filter((c: any) => c.nameEn.toLowerCase().includes(search.toLowerCase()) || c.id.includes(search.toLowerCase()));

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen(!open)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500/50 outline-none cursor-pointer flex items-center justify-between">
        {selected ? (
          <div className="flex items-center gap-2">
            <div className="relative w-5 h-5 rounded-full overflow-hidden bg-white/10"><FallbackImage src={selected.avatarUrl} alt="" fill className="object-cover" /></div>
            <span>{selected.nameEn}</span>
          </div>
        ) : <span className="text-white/40">Select Character...</span>}
        <span className="text-white/40 text-xs">▼</span>
      </div>
      
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-[#1a1a24] border border-white/10 rounded-xl shadow-2xl max-h-60 flex flex-col">
          <div className="p-2 border-b border-white/10 shrink-0">
            <input autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder="Search character..." className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none" />
          </div>
          <div className="overflow-y-auto custom-scrollbar p-1">
            {filtered.map((c: any) => (
              <div key={c.id} onClick={() => { onChange(c.id); setOpen(false); setSearch(''); }} className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-white/10 ${value === c.id ? 'bg-blue-500/20' : ''}`}>
                <div className="relative w-6 h-6 rounded bg-white/5"><FallbackImage src={c.avatarUrl} alt="" fill className="object-cover" /></div>
                <div className="flex flex-col"><span className="text-sm text-white leading-tight">{c.nameEn}</span><span className="text-[9px] text-white/40">{c.id}</span></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
