'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAdmin } from '@/hooks/useAdmin';
import FallbackImage from '@/components/ui/FallbackImage';
import { fetchGraphQL, GET_MATERIALS } from '@/lib/graphql';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import MaterialCard from '@/components/MaterialCard';

const MaterialFormModal = dynamic(() => import('@/components/admin/MaterialFormModal'), { ssr: false });

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
  const [search, setSearch] = useState('');
  const { isAdmin } = useAdmin();
  
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
      finalUrl += '.webp';
    }
    return finalUrl;
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 relative overflow-hidden" style={{ background: 'var(--bg-void, #04040a)' }}>
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] blur-[130px] rounded-full" style={{ background: 'rgba(168,85,247,0.07)' }} />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] blur-[100px] rounded-full" style={{ background: 'rgba(34,211,238,0.05)' }} />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
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
              className="w-full md:w-64 bg-[#0d0d14]/80 border border-white/[0.08] text-white/90 px-4 py-3 rounded-xl outline-none text-sm font-medium transition-all placeholder:text-white/30 backdrop-blur-md"
              onFocus={e => {
                e.target.style.borderColor = 'rgba(168,85,247,0.50)';
                e.target.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.12)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                e.target.style.boxShadow = 'none';
              }}
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {filtered.map(mat => (
            <MaterialCard
              key={mat.id}
              id={mat.id}
              nameEn={mat.nameEn}
              nameVi={mat.nameVi}
              type={mat.type}
              rarity={mat.rarity}
              iconUrl={mat.iconUrl}
              locale={locale}
              isAdmin={isAdmin}
              onEdit={() => openEdit(mat)}
              onDelete={(e) => handleDelete(mat.id, e)}
            />
          ))}
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
