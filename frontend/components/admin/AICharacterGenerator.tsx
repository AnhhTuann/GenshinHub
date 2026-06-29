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
    <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30 p-6 rounded-2xl mb-8">
      <div className="flex items-start gap-4">
        <div className="text-4xl">✨</div>
        <div className="flex-1 space-y-3">
          <h2 className="text-xl font-bold text-purple-300">Tạo nhân vật bằng AI</h2>
          <p className="text-white/60 text-sm max-w-2xl">
            Nhập tên tiếng Anh của một nhân vật (ví dụ: <code className="text-purple-300">Xbalanque</code>, <code className="text-purple-300">Mavuika</code>). AI sẽ tự động lấy chỉ số cơ bản, dịch kỹ năng, đề xuất trang bị, thánh di vật, đội hình và dự đoán Tier List!
          </p>
          
          <div className="flex gap-3 mt-4">
            <input
              type="text"
              placeholder="Tên nhân vật (Tiếng Anh)..."
              className="bg-black/50 border border-purple-500/30 rounded-xl px-4 py-2 flex-1 max-w-md focus:outline-none focus:border-purple-400 text-white"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              disabled={isGenerating}
              onKeyDown={(e) => { if (e.key === 'Enter') handleGenerate(); }}
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !characterName.trim()}
              className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-xl transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang tạo...
                </>
              ) : (
                '🤖 Tạo bằng AI'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
