"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchGraphQL } from '@/lib/graphql';
import toast from 'react-hot-toast';

export default function AdminEditableSplash({ characterId, children }: { characterId: string, children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('admin_key'));
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      let finalUrl = urlInput;
      
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const uploadUrl = process.env.NEXT_PUBLIC_UPLOAD_URL || 'http://localhost:4000/upload';
        const res = await fetch(uploadUrl, {
          method: 'POST',
          headers: { 'x-admin-key': localStorage.getItem('admin_key') || '' },
          body: formData
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        finalUrl = data.url;
      }

      if (!finalUrl) {
        toast.error("Please provide a URL or upload a file.");
        setLoading(false);
        return;
      }

      await fetchGraphQL(`
        mutation UpdateSplash($id: String!, $url: String!) {
          updateCharacterSplashArt(id: $id, splashArtUrl: $url) { id }
        }
      `, { id: characterId, url: finalUrl });

      setIsEditing(false);
      router.refresh();
    } catch (err: any) {
      toast.error("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group/splash w-full h-full">
      {children}
      
      {isAdmin && (
        <button 
          onClick={() => setIsEditing(true)}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/80 text-white px-3 py-1.5 rounded border border-white/20 text-xs font-bold opacity-0 group-hover/splash:opacity-100 transition-opacity"
        >
          ✏️ Edit Splash Art
        </button>
      )}

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0d0d14] border border-white/10 rounded-xl p-6 w-full max-w-md flex flex-col gap-4 shadow-2xl">
            <h3 className="text-xl font-bold text-white">Edit Splash Art</h3>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-white/50 uppercase">Option 1: Paste URL</label>
              <input 
                type="text" 
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://..."
                className="bg-black/50 border border-white/10 rounded p-2 text-sm text-white focus:border-blue-500 outline-none"
              />
            </div>
            
            <div className="text-center text-xs text-white/30 font-bold">- OR -</div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-white/50 uppercase">Option 2: Upload File</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-bold file:bg-white/10 file:text-white hover:file:bg-white/20"
              />
            </div>

            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
              <button 
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2 rounded bg-white/5 hover:bg-white/10 text-white/70 font-bold text-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={loading}
                className="flex-1 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
