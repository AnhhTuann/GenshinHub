"use client";
import { useState } from 'react';
import { fetchGraphQL, GET_SHOWCASE } from '@/lib/graphql';
import Link from 'next/link';

export default function ShowcasePage() {
  const [uid, setUid] = useState('');
  const [showcase, setShowcase] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uid) return;
    setLoading(true);
    setError('');
    setShowcase(null);
    try {
      const data = await fetchGraphQL(GET_SHOWCASE, { uid });
      if (data.showcase) {
        setShowcase(data.showcase);
      } else {
        setError('Không tìm thấy người chơi hoặc API bị lỗi.');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi khi kết nối.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-zinc-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Player Showcase (Enka.Network)
          </h1>
          <Link href="/" className="px-4 py-2 bg-[#1c1c22] rounded-lg text-sm font-semibold hover:bg-zinc-800 transition">
            Quay lại Home
          </Link>
        </div>

        <form onSubmit={handleSearch} className="flex gap-4 mb-10">
          <input 
            type="text" 
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            placeholder="Nhập Genshin Impact UID (VD: 800000000)" 
            className="flex-1 bg-[#111115] text-white px-5 py-4 rounded-xl border border-gray-800 focus:border-blue-500 outline-none text-lg"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition disabled:opacity-50"
          >
            {loading ? 'Đang tìm...' : 'Tra cứu'}
          </button>
        </form>

        {error && <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 font-medium">{error}</div>}

        {showcase && (
          <div className="bg-[#15151a] border border-[#1c1c22] rounded-3xl p-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="flex items-center gap-6 relative z-10 mb-8 pb-8 border-b border-[#1c1c22]">
              {showcase.avatarUrl ? (
                <img src={showcase.avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-[#1c1c22]" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-zinc-800 border-4 border-[#1c1c22]"></div>
              )}
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{showcase.nickname}</h2>
                <div className="text-sm font-semibold text-zinc-400 bg-black/40 px-3 py-1 rounded-full w-fit">
                  Adventure Rank: {showcase.level}
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 text-zinc-500">
                Nhân vật trưng bày ({showcase.characters.length})
              </h3>
              {showcase.characters.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {showcase.characters.map((charId: string) => (
                    <div key={charId} className="bg-[#1c1c22] p-4 rounded-2xl border border-zinc-800 flex flex-col items-center justify-center aspect-square">
                      <div className="text-zinc-500 text-xs font-mono mb-2">Avatar ID</div>
                      <div className="text-lg font-bold text-white">{charId}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-zinc-500 italic">Người chơi này không trưng bày nhân vật nào.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
