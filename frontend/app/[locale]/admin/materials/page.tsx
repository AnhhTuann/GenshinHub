"use client";
import { useState, useEffect, useCallback } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fetchGraphQL } from '@/lib/graphql';
import toast from 'react-hot-toast';
import { useConfirm } from '@/components/admin/ui/ConfirmModal';
import Pagination from '@/components/admin/ui/Pagination';
import AdminModal from '@/components/admin/ui/AdminModal';
import ImageUrlInput from '@/components/admin/ui/ImageUrlInput';
import Image from 'next/image';

const MATERIAL_TYPES = [
  'Ascension Gem',
  'Boss Material',
  'Local Specialty',
  'Common Enemy Material',
  'Talent Book',
  'Weekly Boss Material',
  'Weapon Ascension Material',
  'Other'
];

const MaterialSchema = z.object({
  id:      z.string().min(1,'ID required').regex(/^[a-z0-9-]+$/,'Lowercase, numbers, hyphens only'),
  nameEn:  z.string().min(1,'Name (EN) required'),
  nameVi:  z.string().min(1,'Name (VI) required'),
  type:    z.string().min(1,'Type required'),
  rarity:  z.coerce.number().int().min(1).max(5),
  iconUrl: z.string().optional().default(''),
});
type MaterialFormData = z.infer<typeof MaterialSchema>;

const PER_PAGE = 24;

export default function MaterialsAdmin() {
  const [all,       setAll]       = useState<any[]>([]);
  const [search,    setSearch]    = useState('');
  const [typeFilter,setTypeFilter]= useState('');
  const [page,      setPage]      = useState(1);
  const [loading,   setLoading]   = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId,    setEditId]    = useState<string|null>(null);
  const { confirm, modal: confirmModal } = useConfirm();

  const { register, handleSubmit, reset, control, watch, setValue, formState: { errors, isDirty } } = useForm<MaterialFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(MaterialSchema) as any,
    defaultValues: { id:'', nameEn:'', nameVi:'', type:'Local Specialty', rarity:1, iconUrl:'' },
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await fetchGraphQL(`query { materials { id nameEn nameVi type rarity iconUrl } }`);
      setAll(d.materials ?? []);
    } catch (e: any) { toast.error(e.message); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = all.filter(m => 
    (!search || m.nameEn.toLowerCase().includes(search.toLowerCase())) &&
    (!typeFilter || m.type === typeFilter)
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const items      = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  useEffect(() => setPage(1), [search, typeFilter]);

  const openNew = () => { setEditId(null); reset(); setModalOpen(true); };
  const openEdit = (m: any) => {
    setEditId(m.id);
    reset({ ...m, iconUrl: m.iconUrl ?? '' });
    setModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    const ok = await confirm({ title:'Delete Material', message:`Delete "${name}"?`, confirmLabel:'Delete', danger:true });
    if (!ok) return;
    try {
      await fetchGraphQL(`mutation { deleteMaterial(id:"${id}") }`);
      toast.success(`${name} deleted.`);
      load();
    } catch (e: any) { toast.error(e.message); }
  };

  const onSave = async (data: MaterialFormData) => {
    const tid = toast.loading(editId ? 'Saving...' : 'Creating...');
    try {
      await fetchGraphQL(`mutation U($input:MaterialInput!){upsertMaterial(input:$input)}`, { input: data });
      toast.success(editId?`${data.nameEn} saved!`:`${data.nameEn} created!`,{id:tid});
      setModalOpen(false);
      load();
    } catch (e: any) { toast.error('Error: '+e.message,{id:tid}); }
  };

  const nameEnVal = watch('nameEn');
  useEffect(()=>{
    if(!editId && nameEnVal) setValue('id', nameEnVal.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,''));
  },[editId,nameEnVal,setValue]);

  const RARITY_COLOR: Record<number,string> = {5:'#ffd54f',4:'#ce93d8',3:'#80cbc4',2:'#a5d6a7',1:'#bdbdbd'};
  const RARITY_BG: Record<number,string> = {5:'rgba(255,213,79,0.1)',4:'rgba(206,147,216,0.1)',3:'rgba(128,203,196,0.1)',2:'rgba(165,214,167,0.1)',1:'rgba(189,189,189,0.1)'};

  // Get unique types from existing data to populate filter
  const existingTypes = Array.from(new Set(all.map(m => m.type))).filter(Boolean).sort();

  return (
    <div className="flex flex-col gap-5">
      {confirmModal}

      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-black uppercase tracking-wide" style={{ fontFamily:'var(--font-cinzel,Cinzel,serif)', background:'linear-gradient(135deg,#aed581,#689f38)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            Materials
          </h1>
          <p className="text-white/30 text-xs mt-0.5">{loading?'Loading...':`${filtered.length} of ${all.length} materials`}</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-wider" style={{ background:'linear-gradient(135deg,#aed581,#689f38)', color:'#fff', boxShadow:'0 4px 16px rgba(174,213,129,0.25)' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4"/></svg>
          Add Material
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap p-3.5 rounded-2xl" style={{ background:'rgba(8,8,18,0.80)', border:'1px solid rgba(255,255,255,0.05)' }}>
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" placeholder="Search materials..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full pl-8 pr-3 py-2 rounded-xl text-xs font-medium outline-none" style={{background:'rgba(4,4,10,0.8)',border:'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.85)'}}/>
        </div>
        <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)} className="px-3 py-2 rounded-xl text-xs font-bold outline-none" style={{background:'rgba(4,4,10,0.8)',border:'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.7)'}}>
          <option value="">All Types</option>
          {existingTypes.map(t=><option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-12 text-center text-white/25 text-sm">Loading materials...</div>
      ) : items.length === 0 ? (
        <div className="py-12 text-center text-white/25 text-sm">No materials found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {items.map(m => (
            <div key={m.id} className="flex gap-3 p-3 rounded-2xl group transition-colors" style={{ background:'rgba(8,8,18,0.70)', border:'1px solid rgba(255,255,255,0.05)' }} onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'} onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.05)'}>
              <div className="relative w-12 h-12 rounded-xl shrink-0 overflow-hidden" style={{ background: RARITY_BG[m.rarity] || 'rgba(255,255,255,0.05)', border: `1px solid ${RARITY_COLOR[m.rarity]||'#fff'}30` }}>
                {m.iconUrl && <FallbackImage src={m.iconUrl} alt={m.nameEn} fill className="object-contain p-1" sizes="48px" unoptimized/>}
              </div>
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <div className="text-sm font-bold text-white/90 truncate">{m.nameEn}</div>
                <div className="text-[10px] text-white/40 truncate">{m.type}</div>
              </div>
              <div className="flex flex-col gap-1 items-end justify-between shrink-0">
                <div className="text-[10px] font-black" style={{ color: RARITY_COLOR[m.rarity]||'#fff' }}>{'★'.repeat(m.rarity)}</div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={()=>openEdit(m)} className="p-1.5 rounded-lg text-white/40 hover:bg-white/10 hover:text-white/80 transition-colors" title="Edit">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                  </button>
                  <button onClick={()=>handleDelete(m.id,m.nameEn)} className="p-1.5 rounded-lg text-red-400/50 hover:bg-red-400/10 hover:text-red-400 transition-colors" title="Delete">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between px-1">
        <span className="text-white/25 text-xs">Showing {Math.min((page-1)*PER_PAGE+1,filtered.length)}–{Math.min(page*PER_PAGE,filtered.length)} of {filtered.length}</span>
        <Pagination page={page} totalPages={totalPages} onChange={setPage}/>
      </div>

      {/* Form Modal */}
      <AdminModal open={modalOpen} onClose={()=>setModalOpen(false)} title={editId?'Edit Material':'Add Material'} subtitle={editId||'New material'} size="md"
        footer={
          <div className="flex items-center justify-between">
            {isDirty&&<span className="flex items-center gap-1.5 text-xs" style={{color:'#f0d080'}}><span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"/>Unsaved</span>}
            <div className="flex gap-2 ml-auto">
              <button onClick={()=>setModalOpen(false)} className="px-4 py-2 rounded-xl text-sm font-bold" style={{background:'rgba(255,255,255,0.05)',color:'rgba(255,255,255,0.5)'}}>Cancel</button>
              <button onClick={handleSubmit(onSave)} className="px-5 py-2 rounded-xl text-sm font-black uppercase tracking-wide" style={{background:'linear-gradient(135deg,#aed581,#689f38)',color:'#fff',boxShadow:'0 4px 16px rgba(174,213,129,0.25)'}}>
                {editId?'Save':'Create'}
              </button>
            </div>
          </div>
        }
      >
        <div className="px-6 py-5 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5 col-span-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">ID (slug) <span className="text-red-400">*</span></label>
            <input {...register('id')} placeholder="e.g. agnidus-agate-sliver" className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none font-mono" style={{background:'rgba(4,4,10,0.8)',border:errors.id?'1px solid rgba(239,68,68,0.5)':'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.88)'}}/>
            {errors.id&&<p className="text-red-400 text-xs">{errors.id.message}</p>}
          </div>
          {(['nameEn','nameVi'] as const).map(f=>(
            <div key={f} className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Name ({f==='nameEn'?'EN':'VI'}) <span className="text-red-400">*</span></label>
              <input {...register(f)} className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none" style={{background:'rgba(4,4,10,0.8)',border:errors[f]?'1px solid rgba(239,68,68,0.5)':'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.88)'}}/>
            </div>
          ))}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Type <span className="text-red-400">*</span></label>
            <input {...register('type')} list="material-types" className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none" style={{background:'rgba(4,4,10,0.8)',border:errors.type?'1px solid rgba(239,68,68,0.5)':'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.88)'}}/>
            <datalist id="material-types">
              {MATERIAL_TYPES.map(t=><option key={t} value={t}/>)}
            </datalist>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Rarity</label>
            <select {...register('rarity')} className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none appearance-none" style={{background:'rgba(4,4,10,0.8)',border:'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.88)'}}>
              {[1,2,3,4,5].map(r=><option key={r} value={r}>{'★'.repeat(r)} {r}-Star</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <Controller control={control} name="iconUrl" render={({field})=>(
              <ImageUrlInput label="Icon URL" value={field.value||''} onChange={field.onChange} error={errors.iconUrl?.message} placeholder="https://cdn.../material-icon.png"/>
            )}/>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
