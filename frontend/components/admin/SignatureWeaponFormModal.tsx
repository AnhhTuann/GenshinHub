'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface Weapon {
  id: string;
  nameEn: string;
  nameVi: string;
  iconUrl: string | null;
  rarity: number;
}

interface SignatureWeaponFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedWeapons: string[]) => void;
  allWeapons: Weapon[];
  initialWeapons: string[];
}

export default function SignatureWeaponFormModal({
  isOpen,
  onClose,
  onSave,
  allWeapons,
  initialWeapons
}: SignatureWeaponFormModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialWeapons);
  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const toggleWeapon = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    // Convert weapon IDs to nameEn since schema stores nameEn
    const names = selectedIds.map(id => {
      const w = allWeapons.find(aw => aw.id === id);
      return w ? w.nameEn : id;
    });
    onSave(names);
    onClose();
  };

  const filteredWeapons = allWeapons.filter(w => 
    w.nameEn.toLowerCase().includes(search.toLowerCase()) ||
    w.nameVi.toLowerCase().includes(search.toLowerCase())
  );

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a1a24] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
          <h2 className="text-xl font-bold text-white">Edit Signature Weapons</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1">
          <input
            type="text"
            placeholder="Search weapons..."
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors mb-4"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredWeapons.map(w => {
              const isSelected = selectedIds.includes(w.id);
              return (
                <button
                  key={w.id}
                  onClick={() => toggleWeapon(w.id)}
                  className={`flex items-center gap-3 p-2 rounded-xl border text-left transition-all ${
                    isSelected 
                      ? 'bg-amber-500/20 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                      : 'bg-black/20 border-white/5 hover:bg-white/5'
                  }`}
                >
                  <div className="w-10 h-10 relative bg-gradient-to-br from-white/10 to-transparent rounded-lg shrink-0 flex items-center justify-center overflow-hidden p-0.5">
                    {w.iconUrl ? (
                      <Image src={w.iconUrl} alt={w.nameEn} fill className="object-contain" />
                    ) : (
                      <span className="text-[8px] text-white/30">No Icon</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{w.nameEn}</p>
                    <p className="text-[10px] text-white/40 truncate">{w.nameVi}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/10 flex justify-end gap-3 bg-white/[0.02]">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl font-bold text-sm text-white/60 hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="px-5 py-2.5 rounded-xl font-bold text-sm bg-amber-500 text-black hover:bg-amber-400 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
