'use client';

import { useState, useEffect } from 'react';
import { fetchGraphQL } from '@/lib/graphql';

interface WeaponFormData {
  id: string;
  nameEn: string;
  nameVi: string;
  rarity: number;
  type: string;
  baseAtk: number;
  subStat: string;
  subStatValue: number | null;
  passiveNameEn: string;
  passiveNameVi: string;
  passiveDescEn: string;
  passiveDescVi: string;
  iconUrl: string;
  tier: string;
}

const EMPTY_WEAPON: WeaponFormData = {
  id: '', nameEn: '', nameVi: '', rarity: 4, type: 'Sword',
  baseAtk: 510, subStat: '', subStatValue: null,
  passiveNameEn: '', passiveNameVi: '', passiveDescEn: '', passiveDescVi: '',
  iconUrl: '', tier: '',
};

const WEAPON_TYPES = ['Kiếm Đơn', 'Trọng Kiếm', 'Vũ Khí Cán Dài', 'Cung', 'Pháp Khí'];
const RARITIES = [1, 2, 3, 4, 5];
const SUB_STATS = ['', 'HP%', 'Tấn Công%', 'Phòng Ngự%', 'Tỷ Lệ Bạo Kích', 'Sát Thương Bạo Kích', 'Hiệu Quả Nạp', 'Tinh Thông Nguyên Tố', 'Sát Thương Vật Lý%'];

interface Props {
  weapon?: WeaponFormData | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function WeaponFormModal({ weapon, onClose, onSaved }: Props) {
  const isNew = !weapon;
  const [form, setForm] = useState<WeaponFormData>(weapon || { ...EMPTY_WEAPON });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const updateField = (key: keyof WeaponFormData, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!form.id.trim() || !form.nameEn.trim() || !form.nameVi.trim()) {
      setError('ID, Name EN, và Name VI là bắt buộc');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const input: any = {
        id: form.id,
        nameEn: form.nameEn,
        nameVi: form.nameVi,
        rarity: form.rarity,
        type: form.type,
        baseAtk: form.baseAtk,
        subStat: form.subStat || null,
        subStatValue: form.subStatValue || null,
        passiveNameEn: form.passiveNameEn || null,
        passiveNameVi: form.passiveNameVi || null,
        passiveDescEn: form.passiveDescEn || null,
        passiveDescVi: form.passiveDescVi || null,
        iconUrl: form.iconUrl || null,
        tier: form.tier || null,
      };
      await fetchGraphQL(
        `mutation Upsert($input: WeaponInput!) { upsertWeapon(input: $input) { id } }`,
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
  const inputClass = "w-full bg-[#050508] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder-gray-600 font-medium";
  const selectClass = "w-full bg-[#050508] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all font-medium appearance-none cursor-pointer";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#0d0d14] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/60 mx-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Header gradient stripe */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-500 rounded-t-3xl" />

        <div className="p-6 sm:p-8">
          {/* Title */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-white flex items-center gap-3">
              <span className="text-2xl">{isNew ? '➕' : '✏️'}</span>
              {isNew ? 'Add New Weapon' : `Edit: ${form.nameEn}`}
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
              <input value={form.id} onChange={e => updateField('id', e.target.value)} placeholder="e.g. 15509" className={inputClass} disabled={!isNew} />
            </div>

            {/* Type */}
            <div>
              <label className={labelClass}>Type</label>
              <select value={form.type} onChange={e => updateField('type', e.target.value)} className={selectClass}>
                {WEAPON_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Name EN */}
            <div>
              <label className={labelClass}>Name (EN)</label>
              <input value={form.nameEn} onChange={e => updateField('nameEn', e.target.value)} placeholder="Primordial Jade Cutter" className={inputClass} />
            </div>

            {/* Name VI */}
            <div>
              <label className={labelClass}>Name (VI)</label>
              <input value={form.nameVi} onChange={e => updateField('nameVi', e.target.value)} placeholder="Phong Ưng Kiếm" className={inputClass} />
            </div>

            {/* Rarity */}
            <div>
              <label className={labelClass}>Rarity</label>
              <div className="flex gap-2">
                {RARITIES.map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => updateField('rarity', r)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-black border transition-all ${
                      form.rarity === r
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

            {/* Base ATK */}
            <div>
              <label className={labelClass}>Base ATK</label>
              <input type="number" value={form.baseAtk} onChange={e => updateField('baseAtk', parseInt(e.target.value) || 0)} className={inputClass} />
            </div>

            {/* SubStat */}
            <div>
              <label className={labelClass}>Sub Stat</label>
              <select value={form.subStat} onChange={e => updateField('subStat', e.target.value)} className={selectClass}>
                {SUB_STATS.map(s => <option key={s} value={s}>{s || '— None —'}</option>)}
              </select>
            </div>

            {/* SubStat Value */}
            <div>
              <label className={labelClass}>Sub Stat Value</label>
              <input type="number" step="0.1" value={form.subStatValue ?? ''} onChange={e => updateField('subStatValue', e.target.value ? parseFloat(e.target.value) : null)} placeholder="e.g. 44.1" className={inputClass} />
            </div>

            {/* Tier */}
            <div>
              <label className={labelClass}>Tier</label>
              <select value={form.tier} onChange={e => updateField('tier', e.target.value)} className={selectClass}>
                {['', 'SS', 'S', 'A', 'B', 'C', 'D'].map(t => <option key={t} value={t}>{t || '— None —'}</option>)}
              </select>
            </div>

            {/* Icon URL */}
            <div>
              <label className={labelClass}>Icon URL</label>
              <input value={form.iconUrl} onChange={e => updateField('iconUrl', e.target.value)} placeholder="/images/weapons/..." className={inputClass} />
            </div>
          </div>

          {/* Icon Preview */}
          {form.iconUrl && (
            <div className="mt-4 flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl border border-white/10 bg-[#050508] flex items-center justify-center overflow-hidden">
                <img src={form.iconUrl} alt="preview" className="w-12 h-12 object-contain" onError={e => (e.currentTarget.style.display = 'none')} />
              </div>
              <span className="text-gray-500 text-xs">Icon Preview</span>
            </div>
          )}

          {/* Passive Section */}
          <div className="mt-6 pt-6 border-t border-white/5">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="text-yellow-500">⚡</span> Passive Skill
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Passive Name (EN)</label>
                <input value={form.passiveNameEn} onChange={e => updateField('passiveNameEn', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Passive Name (VI)</label>
                <input value={form.passiveNameVi} onChange={e => updateField('passiveNameVi', e.target.value)} className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Passive Desc (EN)</label>
                <textarea value={form.passiveDescEn} onChange={e => updateField('passiveDescEn', e.target.value)} rows={3} className={inputClass + ' resize-none'} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Passive Desc (VI)</label>
                <textarea value={form.passiveDescVi} onChange={e => updateField('passiveDescVi', e.target.value)} rows={3} className={inputClass + ' resize-none'} />
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
              className="px-8 py-3 rounded-xl text-sm font-black text-black bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Saving...' : isNew ? '✨ Create Weapon' : '💾 Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
