'use client';

import { useState, useEffect, useMemo } from 'react';
import { fetchGraphQL, GET_MATERIALS } from '@/lib/graphql';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import toast from 'react-hot-toast';
import MaterialFormModal from '@/components/admin/MaterialFormModal';

interface MaterialData {
  id: string;
  nameEn: string;
  nameVi: string;
  type: string;
  rarity: number;
  iconUrl?: string;
}

export default function MaterialsPage() {
  const t = useTranslations('Materials');
  const locale = useLocale();
  const [materials, setMaterials] = useState<MaterialData[]>([]);
  const [search, setSearch] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialData | undefined>(undefined);

  const fetchMaterials = () => {
    fetchGraphQL(GET_MATERIALS).then(data => {
      setMaterials(data.materials || []);
    }).catch(err => {
      console.error(err);
      toast.error('Failed to load materials');
    });
  };

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('admin_key'));
    fetchMaterials();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this material?')) return;
    
    try {
      await fetchGraphQL(`mutation DeleteMaterial($id: String!) { deleteMaterial(id: $id) }`, { id });
      toast.success('Material deleted!');
      fetchMaterials();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const openAdd = () => {
    setSelectedMaterial(undefined);
    setIsEditing(true);
  };

  const openEdit = (mat: MaterialData) => {
    setSelectedMaterial(mat);
    setIsEditing(true);
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return materials;
    const lower = search.toLowerCase();
    return materials.filter(m => 
      m.nameEn.toLowerCase().includes(lower) || 
      m.nameVi.toLowerCase().includes(lower) || 
      m.id.toLowerCase().includes(lower)
    );
  }, [materials, search]);

  const getValidIconUrl = (url: string | undefined): string => {
    if (!url) return '';
    let finalUrl = url;
    if (!finalUrl.startsWith('http') && !finalUrl.startsWith('/')) {
      finalUrl = `https://gi.yatta.moe/assets/UI/${finalUrl}`;
    }
    if (finalUrl.includes('enka.network/ui/')) {
      finalUrl = finalUrl.replace('https://enka.network/ui/', 'https://gi.yatta.moe/assets/UI/');
    }
    if (!finalUrl.match(/\.(png|jpg|jpeg|webp|svg)$/)) {
      finalUrl += '.png';
    }
    return finalUrl;
  };

  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-white pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black font-display uppercase tracking-wider text-gradient-gold">
              {t('title')}
            </h1>
            <p className="text-white/50 text-sm mt-1">{t('description')}</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input 
              type="text" 
              placeholder={t('searchPlaceholder')} 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-[#050508]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50 w-full md:w-64"
            />
            {isAdmin && (
              <button 
                onClick={openAdd}
                className="shrink-0 px-5 py-3 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold rounded-xl hover:bg-cyan-500/30 transition-colors whitespace-nowrap"
              >
                ➕ {t('addMaterial')}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {filtered.map(mat => {
            const displayName = locale === 'vi' ? mat.nameVi : mat.nameEn;
            return (
            <div 
              key={mat.id}
              onClick={() => isAdmin && openEdit(mat)}
              className={`relative bg-[#0d0d14]/70 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center group transition-all ${isAdmin ? 'cursor-pointer hover:border-amber-500/50 hover:bg-amber-500/5' : ''}`}
            >
              {isAdmin && (
                <button 
                  onClick={(e) => handleDelete(mat.id, e)}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500/20 text-red-400 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/40 z-10"
                >
                  ✕
                </button>
              )}
              
              <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br from-white/10 to-transparent p-2 mb-3 border ${
                mat.rarity === 5 ? 'border-yellow-500/30' :
                mat.rarity === 4 ? 'border-purple-500/30' :
                mat.rarity === 3 ? 'border-blue-500/30' :
                mat.rarity === 2 ? 'border-green-500/30' : 'border-white/10'
              }`}>
                {mat.iconUrl ? (
                  <Image src={getValidIconUrl(mat.iconUrl)} alt={displayName} fill className="object-contain drop-shadow-md" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[9px] text-white/30">NO IMG</div>
                )}
              </div>
              
              <h3 className="text-xs font-bold text-gray-200 mb-1 line-clamp-2" title={displayName}>{displayName}</h3>
              <p className="text-[10px] text-gray-500 line-clamp-1">{mat.type}</p>
            </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500 font-bold">
            {t('noMaterials')}
          </div>
        )}
      </div>

      {isEditing && (
        <MaterialFormModal
          initialData={selectedMaterial}
          onClose={() => setIsEditing(false)}
          onSaved={fetchMaterials}
        />
      )}
    </main>
  );
}
