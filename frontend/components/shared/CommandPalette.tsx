"use client";

import { useEffect, useState } from "react";
import FallbackImage from '@/components/ui/FallbackImage';
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, User, Sword, Sparkles } from "lucide-react";

type Item = {
  id: string;
  name: string;
  type: "character" | "weapon" | "artifact";
  iconUrl?: string;
  rarity?: number;
};

export default function CommandPalette({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Toggle the menu when ⌘K is pressed or custom event is dispatched
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    const handleOpen = () => setOpen(true);

    document.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", handleOpen);
    
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", handleOpen);
    };
  }, []);

  const handleSelect = (item: Item) => {
    setOpen(false);
    let route = `/${item.type}s/${item.id}`;
    if (item.type === 'character') route = `/characters/${item.id}`;
    else if (item.type === 'weapon') route = `/weapons/${item.id}`; // Actually we don't have weapon details page yet, maybe just scroll to it on weapons page
    else if (item.type === 'artifact') route = `/artifacts?search=${item.id}`;
    
    // Quick routing map
    const typeRouteMap: any = {
      character: `/characters/${item.id}`,
      weapon: `/weapons?search=${item.id}`,
      artifact: `/artifacts?search=${item.id}`
    };
    
    router.push(typeRouteMap[item.type] || '/');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/65 flex items-start justify-center pt-[15vh]">
      <Command 
        className="fantasy-search-panel w-[90%] max-w-[600px] atlas-surface overflow-hidden"
        label="Global Search"
        shouldFilter={true}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      >
        <div className="flex items-center px-4 py-3 border-b border-[var(--border-default)] gap-3">
          <Search className="w-5 h-5 text-[var(--text-secondary)]" />
          <Command.Input 
            autoFocus
            className="min-w-0 flex-1 bg-transparent border-none text-[var(--text-primary)] text-base placeholder:text-[var(--text-secondary)]"
            placeholder="Search characters, weapons, artifacts..." 
          />
          <div className="text-xs font-black text-[var(--text-secondary)] uppercase px-2 py-1 rounded bg-[var(--bg-elevated)] border border-[var(--border-default)]">ESC</div>
        </div>

        <Command.List className="max-h-[400px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10">
          <Command.Empty className="py-10 text-center text-[var(--text-secondary)] text-sm">No results found.</Command.Empty>

          <Command.Group heading="Characters" className="text-xs font-black uppercase text-[var(--text-secondary)] mb-2 px-2 pt-2">
            {items.filter(i => i.type === 'character').map((item) => (
              <Command.Item
                key={item.id}
                onSelect={() => handleSelect(item)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer aria-selected:bg-[var(--selected-surface)] aria-selected:ring-1 aria-selected:ring-[var(--atlas-focus)] text-[var(--text-primary)] transition-colors"
                value={item.name + " " + item.id}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-[var(--bg-elevated)] relative border" style={{ borderColor: item.rarity === 5 ? 'rgba(255,211,77,0.3)' : 'rgba(207,143,255,0.3)' }}>
                  {item.iconUrl ? <FallbackImage src={item.iconUrl} alt={item.name} fill className="object-cover" sizes="32px" /> : <User className="w-4 h-4 m-auto mt-2 opacity-30" />}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{item.name}</span>
                  <span className="text-xs text-[var(--text-secondary)] font-mono">{item.type}</span>
                </div>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Weapons" className="text-xs font-black uppercase text-[var(--text-secondary)] my-2 px-2 pt-2 border-t border-[var(--border-subtle)]">
            {items.filter(i => i.type === 'weapon').map((item) => (
              <Command.Item
                key={item.id}
                onSelect={() => handleSelect(item)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer aria-selected:bg-[var(--selected-surface)] aria-selected:ring-1 aria-selected:ring-[var(--atlas-focus)] text-[var(--text-primary)] transition-colors"
                value={item.name + " " + item.id}
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-[var(--bg-elevated)] relative border border-[var(--border-default)] flex items-center justify-center p-1">
                  {item.iconUrl ? <FallbackImage src={item.iconUrl} alt={item.name} fill className="object-contain" sizes="32px" /> : <Sword className="w-4 h-4 opacity-30" />}
                </div>
                <span className="text-sm font-bold">{item.name}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Artifacts" className="text-xs font-black uppercase text-[var(--text-secondary)] my-2 px-2 pt-2 border-t border-[var(--border-subtle)]">
            {items.filter(i => i.type === 'artifact').map((item) => (
              <Command.Item
                key={item.id}
                onSelect={() => handleSelect(item)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer aria-selected:bg-[var(--selected-surface)] aria-selected:ring-1 aria-selected:ring-[var(--atlas-focus)] text-[var(--text-primary)] transition-colors"
                value={item.name + " " + item.id}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-[var(--bg-elevated)] relative border border-[var(--border-default)] flex items-center justify-center p-0.5">
                  {item.iconUrl ? <FallbackImage src={item.iconUrl} alt={item.name} fill className="object-cover" sizes="32px" /> : <Sparkles className="w-4 h-4 opacity-30" />}
                </div>
                <span className="text-sm font-bold">{item.name}</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
