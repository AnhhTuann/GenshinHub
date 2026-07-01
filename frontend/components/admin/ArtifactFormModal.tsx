'use client';

import { useState, useEffect } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import Image from 'next/image';
import { fetchGraphQL } from '@/lib/graphql';

interface ArtifactFormData {
  id: string;
  nameEn: string;
  nameVi: string;
  rarityList: number[];
  piece2DescEn: string;
  piece2DescVi: string;
  piece4DescEn: string;
  piece4DescVi: string;
  iconUrl: string;
}

const EMPTY_ARTIFACT: ArtifactFormData = {
  id: '', nameEn: '', nameVi: '', rarityList: [4, 5],
  piece2DescEn: '', piece2DescVi: '', piece4DescEn: '', piece4DescVi: '',
  iconUrl: '',
};

interface Props {
  artifact?: ArtifactFormData | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function ArtifactFormModal({ artifact, onClose, onSaved }: Props) {
  const isNew = !artifact;
  const [form, setForm] = useState<ArtifactFormData>(artifact || { ...EMPTY_ARTIFACT });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const updateField = (key: keyof ArtifactFormData, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const toggleRarity = (r: number) => {
    setForm(prev => ({
      ...prev,
      rarityList: prev.rarityList.includes(r)
        ? prev.rarityList.filter(x => x !== r)
        : [...prev.rarityList, r].sort()
    }));
  };

  const handleSave = async () => {
    if (!form.id.trim() || !form.nameEn.trim() || !form.nameVi.trim()) {
      setError('ID, Name EN, và Name VI là bắt buộc');
      return;
    }
    if (form.rarityList.length === 0) {
      setError('Phải chọn ít nhất 1 rarity');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const input: any = {
        id: form.id,
        nameEn: form.nameEn,
        nameVi: form.nameVi,
        rarityList: form.rarityList,
        piece2DescEn: form.piece2DescEn || null,
        piece2DescVi: form.piece2DescVi || null,
        piece4DescEn: form.piece4DescEn || null,
        piece4DescVi: form.piece4DescVi || null,
        iconUrl: form.iconUrl || null,
      };
      await fetchGraphQL(
        `mutation Upsert($input: ArtifactSetInput!) { upsertArtifactSet(input: $input) { id } }`,
        { input }
      );
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Lỗi khi lưu');
    } finally {
      setLoading(false);
    }
  };

  const labelClass = "text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block";
  const inputClass = "w-full bg-[#050508] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all placeholder-gray-600 font-medium";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#0d0d14] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/60 mx-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Header gradient stripe */}
        <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-t-3xl" />

        <div className="p-6 sm:p-8">
          {/* Title */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-white flex items-center gap-3">
              <span className="text-2xl">{isNew ? '💎' : '✏️'}</span>
              {isNew ? 'Add New Artifact Set' : `Edit: ${form.nameEn}`}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-xl p-2 hover:bg-white/5 rounded-xl">✕</button>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-semibold">
              ⚠️ {error}
            </div>
          )}

          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* ID */}
            <div>
              <label className={labelClass}>ID</label>
              <input value={form.id} onChange={e => updateField('id', e.target.value)} placeholder="e.g. 15001" className={inputClass} disabled={!isNew} />
            </div>

            {/* Rarity */}
            <div>
              <label className={labelClass}>Rarity List</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => toggleRarity(r)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-black border transition-all ${
                      form.rarityList.includes(r)
                        ? r >= 5 ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                          : r >= 4 ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
                          : 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                        : 'bg-white/[0.02] text-gray-500 border-white/5 hover:bg-white/5 hover:text-gray-300'
                    }`}
                  >
                    {r}★
                  </button>
                ))}
              </div>
            </div>

            {/* Name EN */}
            <div>
              <label className={labelClass}>Name (EN)</label>
              <input value={form.nameEn} onChange={e => updateField('nameEn', e.target.value)} placeholder="Crimson Witch of Flames" className={inputClass} />
            </div>

            {/* Name VI */}
            <div>
              <label className={labelClass}>Name (VI)</label>
              <input value={form.nameVi} onChange={e => updateField('nameVi', e.target.value)} placeholder="Diệm Liệt Ma Nữ Cháy Rực" className={inputClass} />
            </div>

            {/* Icon URL */}
            <div className="sm:col-span-2">
              <label className={labelClass}>Icon URL</label>
              <div className="flex gap-3">
                <input value={form.iconUrl} onChange={e => updateField('iconUrl', e.target.value)} placeholder="/assets/artifacts/..." className={inputClass} />
                {form.iconUrl && (
                  <div className="relative w-11 h-11 flex-shrink-0 rounded-xl border border-white/10 bg-[#050508] flex items-center justify-center overflow-hidden">
                    <FallbackImage src={form.iconUrl} alt="preview" fill sizes="36px" className="object-contain p-1" onError={e => (e.currentTarget.style.display = 'none')} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Set Effects Section */}
          <div className="mt-6 pt-6 border-t border-white/5">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="text-yellow-500">✦</span> Set Effects
            </h3>
            <div className="space-y-4">
              {/* 2-Piece */}
              <div className="bg-[#050508]/50 border border-white/5 rounded-2xl p-4">
                <span className="text-violet-400 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 mb-3 inline-block">
                  2-Piece Set
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  <div>
                    <label className={labelClass}>Description (EN)</label>
                    <textarea value={form.piece2DescEn} onChange={e => updateField('piece2DescEn', e.target.value)} rows={2} className={inputClass + ' resize-none'} />
                  </div>
                  <div>
                    <label className={labelClass}>Description (VI)</label>
                    <textarea value={form.piece2DescVi} onChange={e => updateField('piece2DescVi', e.target.value)} rows={2} className={inputClass + ' resize-none'} />
                  </div>
                </div>
              </div>

              {/* 4-Piece */}
              <div className="bg-[#050508]/50 border border-white/5 rounded-2xl p-4">
                <span className="text-amber-400 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 mb-3 inline-block">
                  4-Piece Set
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  <div>
                    <label className={labelClass}>Description (EN)</label>
                    <textarea value={form.piece4DescEn} onChange={e => updateField('piece4DescEn', e.target.value)} rows={3} className={inputClass + ' resize-none'} />
                  </div>
                  <div>
                    <label className={labelClass}>Description (VI)</label>
                    <textarea value={form.piece4DescVi} onChange={e => updateField('piece4DescVi', e.target.value)} rows={3} className={inputClass + ' resize-none'} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex items-center gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl text-sm font-bold text-gray-400 bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-8 py-3 rounded-xl text-sm font-black text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Saving...' : isNew ? '💎 Create Artifact Set' : '💾 Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
