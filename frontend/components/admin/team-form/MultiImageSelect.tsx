import React, { useState, useEffect, useRef } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';

export function MultiImageSelect({ values, onChange, options, type }: any) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filtered = options.filter((o: any) => o.nameEn.toLowerCase().includes(search.toLowerCase()));

  const toggle = (name: string) => {
    if (values.includes(name)) onChange(values.filter((v: string) => v !== name));
    else onChange([...values, name]);
  };

  const remove = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(values.filter((v: string) => v !== name));
  };

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen(!open)} className="w-full bg-black/40 border border-white/10 rounded-lg p-1.5 min-h-[38px] cursor-pointer flex flex-wrap gap-1.5 items-center">
        {values.length === 0 && <span className="text-white/40 text-sm px-1.5 py-0.5">Select {type}...</span>}
        {values.map((val: string) => {
          const opt = options.find((o: any) => o.nameEn === val);
          const src = opt?.iconUrl || null;
          return (
            <div key={val} className="flex items-center gap-1.5 bg-white/10 hover:bg-red-500/20 hover:border-red-500/30 border border-white/10 rounded pl-1.5 pr-1 py-1 group transition-colors" onClick={(e) => remove(val, e)}>
              {src && <div className="relative w-3.5 h-3.5"><FallbackImage src={src} alt="" fill className="object-contain" /></div>}
              <span className="text-white/80 font-semibold text-[10px] truncate max-w-[100px]">{val}</span>
              <span className="text-white/30 group-hover:text-red-400 text-[10px] ml-1">✕</span>
            </div>
          );
        })}
      </div>
      
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-[#1a1a24] border border-white/10 rounded-xl shadow-2xl max-h-60 flex flex-col">
          <div className="p-2 border-b border-white/10 shrink-0">
            <input autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${type}...`} className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none" />
          </div>
          <div className="overflow-y-auto custom-scrollbar p-1">
            {filtered.map((o: any) => {
              const isSelected = values.includes(o.nameEn);
              const src = o.iconUrl;
              return (
                <div key={o.id || o.nameEn} onClick={() => toggle(o.nameEn)} className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-white/10 ${isSelected ? 'bg-blue-500/20 border border-blue-500/30' : 'border border-transparent'}`}>
                  {src && <div className="relative w-6 h-6 rounded bg-white/5"><FallbackImage src={src} alt="" fill className="object-contain" /></div>}
                  <span className="text-sm text-white">{o.nameEn}</span>
                  {isSelected && <span className="ml-auto text-blue-400 text-xs">✓</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
