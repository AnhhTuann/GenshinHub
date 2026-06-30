'use client';

import { useState, useEffect } from 'react';
import { fetchGraphQL } from '@/lib/graphql';
import toast from 'react-hot-toast';

interface MaterialData {
  id: string;
  nameEn: string;
  nameVi: string;
  type: string;
  rarity: number;
  iconUrl?: string;
}

interface Props {
  initialData?: MaterialData; // If provided, edit mode. If not, create mode.
  onClose: () => void;
  onSaved: () => void;
}

export default function MaterialFormModal({ initialData, onClose, onSaved }: Props) {
  const [formData, setFormData] = useState<MaterialData>({
    id: initialData?.id || '',
    nameEn: initialData?.nameEn || '',
    nameVi: initialData?.nameVi || '',
    type: initialData?.type || 'Ascension Material',
    rarity: initialData?.rarity || 1,
    iconUrl: initialData?.iconUrl || ''
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleSave = async () => {
    if (!formData.id || !formData.nameEn) {
      toast.error('ID and Name EN are required!');
      return;
    }
    setLoading(true);
    try {
      await fetchGraphQL(`
        mutation UpsertMaterial($input: MaterialInput!) {
          upsertMaterial(input: $input)
        }
      `, {
        input: formData
      });
      toast.success(initialData ? 'Material updated!' : 'Material added!');
      onSaved();
      onClose();
    } catch (err: any) {
      toast.error("Error: " + err.message);
      setLoading(false);
    }
  };

  const updateField = (field: keyof MaterialData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-[#0d0d14] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-black text-white">{initialData ? '✏️ Edit Material' : '➕ Add Material'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">✕</button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Material ID</label>
            <input 
              type="text" 
              value={formData.id} 
              onChange={e => updateField('id', e.target.value)} 
              disabled={!!initialData} // Cannot edit ID if updating
              className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50 disabled:opacity-50" 
              placeholder="e.g. prithiva_topaz_sliver" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Name EN</label>
              <input 
                type="text" 
                value={formData.nameEn} 
                onChange={e => updateField('nameEn', e.target.value)} 
                className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50" 
                placeholder="Prithiva Topaz Sliver" 
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Name VI</label>
              <input 
                type="text" 
                value={formData.nameVi} 
                onChange={e => updateField('nameVi', e.target.value)} 
                className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50" 
                placeholder="Mảnh Hoàng Ngọc Kiên Cố" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Type</label>
              <input 
                type="text" 
                value={formData.type} 
                onChange={e => updateField('type', e.target.value)} 
                className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50" 
                placeholder="Ascension Material" 
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Rarity (Stars)</label>
              <input 
                type="number" 
                value={formData.rarity} 
                onChange={e => updateField('rarity', parseInt(e.target.value) || 1)} 
                min="1" max="5"
                className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50" 
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Icon URL (Path)</label>
            <input 
              type="text" 
              value={formData.iconUrl} 
              onChange={e => updateField('iconUrl', e.target.value)} 
              className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50" 
              placeholder="/assets/items/UI_ItemIcon_xxx.webp" 
            />
          </div>
        </div>

        <div className="p-5 border-t border-white/10 flex items-center justify-end gap-3 shrink-0 bg-black/20">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl text-sm font-black bg-cyan-500 hover:bg-cyan-400 text-black transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Material'}
          </button>
        </div>
      </div>
    </div>
  );
}
