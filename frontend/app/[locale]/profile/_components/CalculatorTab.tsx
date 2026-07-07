"use client";

import { useState } from 'react';
import { User } from '@/context/UserContext';
import { Calculator as CalcIcon, ChevronRight } from 'lucide-react';
import FallbackImage from '@/components/ui/FallbackImage';

// Simplified character level materials for demonstration (e.g. Mora and Hero's Wits)
const calculateMaterials = (startLvl: number, targetLvl: number) => {
  // Very rough approximation for Genshin
  const expNeeded = (targetLvl - startLvl) * 10000;
  const wits = Math.ceil(expNeeded / 20000);
  const mora = wits * 4000;
  const bossMats = targetLvl > 40 ? Math.floor((targetLvl - 40) / 10) * 2 : 0;
  
  return {
    wits: Math.max(0, wits),
    mora: Math.max(0, mora),
    bossMats: Math.max(0, bossMats),
  };
};

export default function CalculatorTab({ user }: { user: User }) {
  const [selectedChar, setSelectedChar] = useState<string>('zhongli');
  const [startLevel, setStartLevel] = useState<number>(1);
  const [targetLevel, setTargetLevel] = useState<number>(90);

  // Hardcoded for demo
  const availableChars = ['zhongli', 'raiden', 'nahida', 'furina', 'bennett', 'kazuha'];
  
  const materials = calculateMaterials(startLevel, targetLevel);

  return (
    <div className="space-y-8">
      <div className="bg-[#1a1a24] border border-[#c8a84b]/30 rounded-2xl p-6">
        <h3 className="text-lg font-black uppercase tracking-widest text-[#f0d080] mb-6 flex items-center gap-2">
          <CalcIcon className="w-5 h-5" />
          Ascension Calculator
        </h3>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Controls */}
          <div className="flex-1 space-y-6">
            <div>
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Select Character</p>
              <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                {availableChars.map(char => (
                  <button
                    key={char}
                    onClick={() => setSelectedChar(char)}
                    className={`w-14 h-14 shrink-0 rounded-xl border-2 transition-all overflow-hidden ${
                      selectedChar === char ? 'border-[#c8a84b] scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <FallbackImage src={`/assets/characters/${char}/avatar.webp`} alt={char} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Current Level</label>
                <input
                  type="range"
                  min="1"
                  max="90"
                  value={startLevel}
                  onChange={(e) => setStartLevel(Math.min(parseInt(e.target.value), targetLevel - 1))}
                  className="w-full accent-[#c8a84b]"
                />
                <div className="text-center mt-1 font-black text-[#f0d080]">Lv. {startLevel}</div>
              </div>
              <ChevronRight className="w-6 h-6 text-white/20 mt-4" />
              <div className="flex-1">
                <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Target Level</label>
                <input
                  type="range"
                  min="2"
                  max="90"
                  value={targetLevel}
                  onChange={(e) => setTargetLevel(Math.max(parseInt(e.target.value), startLevel + 1))}
                  className="w-full accent-[#c8a84b]"
                />
                <div className="text-center mt-1 font-black text-[#f0d080]">Lv. {targetLevel}</div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="w-full md:w-72 bg-black/40 rounded-2xl p-6 border border-white/10">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Required Materials</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#c8a84b]/20 flex items-center justify-center text-[#f0d080] font-bold text-xs">M</div>
                  <span className="font-bold text-white">Mora</span>
                </div>
                <span className="font-black text-[#f0d080]">{materials.mora.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xs">W</div>
                  <span className="font-bold text-white">Hero's Wit</span>
                </div>
                <span className="font-black text-white">{materials.wits}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-xs">B</div>
                  <span className="font-bold text-white">Boss Mats</span>
                </div>
                <span className="font-black text-white">{materials.bossMats}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
