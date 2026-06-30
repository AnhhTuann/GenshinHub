"use client";
import { useState } from 'react';
import { fetchGraphQL, GENERATE_CHARACTER_AI } from '@/lib/graphql';
import toast from 'react-hot-toast';

export default function AICharacterGenerator({ onGenerated }: { onGenerated: () => void }) {
  const [characterName, setCharacterName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!characterName.trim()) {
      toast.error("Vui lòng nhập tên nhân vật");
      return;
    }
    
    setIsGenerating(true);
    const loadingToast = toast.loading(`Đang nhờ AI phân tích & tạo dữ liệu cho ${characterName}... (Có thể mất 10-20 giây)`);
    
    try {
      await fetchGraphQL(GENERATE_CHARACTER_AI, { nameEn: characterName.trim() }, 0); // Revalidate 0 (No cache)
      toast.success(`Đã thêm thành công nhân vật ${characterName}!`, { id: loadingToast });
      setCharacterName("");
      onGenerated();
    } catch (e: any) {
      toast.error(`Lỗi: ${e.message}`, { id: loadingToast });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="mb-8 p-6 rounded-2xl relative overflow-hidden" style={{ background:'rgba(8,8,18,0.7)', border:'1px solid rgba(255,255,255,0.05)' }}>
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full -translate-y-1/2 translate-x-1/3" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 justify-between">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl">✨</span>
            <h2 className="text-sm font-black uppercase tracking-widest text-amber-400">AI Auto-Generate Character</h2>
          </div>
          <p className="text-xs text-white/40 leading-relaxed font-medium">
            Enter an English character name (e.g. <span className="text-white/70">"Yae Miko"</span>) to automatically scrape the fandom wiki and structure data via AI. This will populate name, rarity, element, weapon, base stats, lore, and images.
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Character Name..." 
            value={characterName}
            onChange={e => setCharacterName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleGenerate()}
            disabled={isGenerating}
            className="w-full md:w-64 px-4 py-2.5 rounded-xl text-sm outline-none font-bold placeholder-white/20"
            style={{ background:'rgba(4,4,10,0.8)', border:'1px solid rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.85)' }}
          />
          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !characterName}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-wide disabled:opacity-50 shrink-0"
            style={{ background:'linear-gradient(135deg, #f0d080, #c8a84b)', color:'#080812', boxShadow:'0 4px 16px rgba(200,168,75,0.3)' }}
          >
            {isGenerating ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            ) : "Generate"}
          </button>
        </div>
      </div>
    </section>
  );
}
