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

const ArtifactSchema = z.object({
  id:           z.string().min(1,'ID required').regex(/^[a-z0-9-]+$/,'Lowercase, numbers, hyphens only'),
  nameEn:       z.string().min(1,'Name (EN) required'),
  nameVi:       z.string().min(1,'Name (VI) required'),
  rarityList:   z.array(z.number()).min(1, 'Select at least one rarity'),
  piece2DescEn: z.string().optional().default(''),
  piece2DescVi: z.string().optional().default(''),
  piece4DescEn: z.string().optional().default(''),
  piece4DescVi: z.string().optional().default(''),
  iconUrl:      z.string().optional().default(''),
});
type ArtifactFormData = z.infer<typeof ArtifactSchema>;

const PER_PAGE = 20;

export default function ArtifactsAdmin() {
  const [all,       setAll]       = useState<any[]>([]);
  const [search,    setSearch]    = useState('');
  const [page,      setPage]      = useState(1);
  const [loading,   setLoading]   = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId,    setEditId]    = useState<string|null>(null);
  const { confirm, modal: confirmModal } = useConfirm();

  const { register, handleSubmit, reset, control, watch, setValue, formState: { errors, isDirty } } = useForm<ArtifactFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(ArtifactSchema) as any,
    defaultValues: { id:'', nameEn:'', nameVi:'', rarityList:[4,5], piece2DescEn:'', piece2DescVi:'', piece4DescEn:'', piece4DescVi:'', iconUrl:'' },
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await fetchGraphQL(`query { artifacts { id nameEn nameVi rarityList iconUrl piece2DescEn piece4DescEn } }`);
      setAll(d.artifacts ?? []);
    } catch (e: any) { toast.error(e.message); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = all.filter(a => !search || a.nameEn.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const items      = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  useEffect(() => setPage(1), [search]);

  const openNew = () => { setEditId(null); reset(); setModalOpen(true); };
  const openEdit = async (id: string) => {
    setEditId(id);
    try {
      const d = await fetchGraphQL(`query { artifactSet(id:"${id}") { id nameEn nameVi rarityList piece2DescEn piece2DescVi piece4DescEn piece4DescVi iconUrl } }`);
      const a = d.artifactSet;
      if (a) reset({ ...a, piece2DescEn:a.piece2DescEn??'', piece2DescVi:a.piece2DescVi??'', piece4DescEn:a.piece4DescEn??'', piece4DescVi:a.piece4DescVi??'', iconUrl:a.iconUrl??'' });
    } catch (e: any) { toast.error('Load failed: '+e.message); }
    setModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    const ok = await confirm({ title:'Delete Artifact Set', message:`Delete "${name}"?`, confirmLabel:'Delete', danger:true });
    if (!ok) return;
    try {
      await fetchGraphQL(`mutation { deleteArtifactSet(id:"${id}") }`);
      toast.success(`${name} deleted.`);
      load();
    } catch (e: any) { toast.error(e.message); }
  };

  const onSave = async (data: ArtifactFormData) => {
    const tid = toast.loading(editId ? 'Saving...' : 'Creating...');
    try {
      await fetchGraphQL(`mutation U($input:ArtifactSetInput!){upsertArtifactSet(input:$input){id}}`, { input: data });
      toast.success(editId?`${data.nameEn} saved!`:`${data.nameEn} created!`,{id:tid});
      setModalOpen(false);
      load();
    } catch (e: any) { toast.error('Error: '+e.message,{id:tid}); }
  };

  const nameEnVal = watch('nameEn');
  useEffect(()=>{
    if(!editId && nameEnVal) setValue('id', nameEnVal.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,''));
  },[editId,nameEnVal,setValue]);

  const rarityList = watch('rarityList') || [];
  const toggleRarity = (r: number) => {
    if (rarityList.includes(r)) setValue('rarityList', rarityList.filter(x => x !== r), { shouldValidate: true, shouldDirty: true });
    else setValue('rarityList', [...rarityList, r].sort(), { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="flex flex-col gap-5">
      {confirmModal}

      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-black uppercase tracking-wide" style={{ fontFamily:'var(--font-cinzel,Cinzel,serif)', background:'linear-gradient(135deg,#ce93d8,#8e24aa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            Artifacts
          </h1>
          <p className="text-white/30 text-xs mt-0.5">{loading?'Loading...':`${filtered.length} of ${all.length} artifacts`}</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-wider" style={{ background:'linear-gradient(135deg,#ce93d8,#8e24aa)', color:'#fff', boxShadow:'0 4px 16px rgba(206,147,216,0.3)' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4"/></svg>
          Add Artifact Set
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 p-3.5 rounded-2xl" style={{ background:'rgba(8,8,18,0.80)', border:'1px solid rgba(255,255,255,0.05)' }}>
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" placeholder="Search artifact sets..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full pl-8 pr-3 py-2 rounded-xl text-xs font-medium outline-none" style={{background:'rgba(4,4,10,0.8)',border:'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.85)'}}/>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{background:'rgba(8,8,18,0.70)',border:'1px solid rgba(255,255,255,0.05)'}}>
        <div className="grid items-center text-[10px] font-black uppercase tracking-widest text-white/25 px-4 py-2.5" style={{gridTemplateColumns:'40px 180px 100px 1fr 80px',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
          <span/><span>Name</span><span>Rarities</span><span>Effect (2-Piece)</span><span className="text-right">Actions</span>
        </div>
        {loading ? (
          <div className="py-12 text-center text-white/25 text-sm">Loading...</div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center text-white/25 text-sm">No artifacts found.</div>
        ) : items.map((a,i)=>(
          <div key={a.id}
            className="grid items-center px-4 py-3 transition-colors"
            style={{gridTemplateColumns:'40px 180px 100px 1fr 80px', borderBottom:i===items.length-1?'none':'1px solid rgba(255,255,255,0.04)'}}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.02)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden" style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)'}}>
              {a.iconUrl&&<FallbackImage src={a.iconUrl} alt={a.nameEn} fill className="object-cover" sizes="32px" unoptimized/>}
            </div>
            <div className="pr-2">
              <div className="text-sm font-bold text-white/85 truncate">{a.nameEn}</div>
              <div className="text-[10px] text-white/25 font-mono truncate">{a.id}</div>
            </div>
            <div className="flex gap-1 flex-wrap">
              {(a.rarityList||[]).map((r: number) => (
                <span key={r} className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{background:r===5?'rgba(255,213,79,0.1)':'rgba(206,147,216,0.1)',color:r===5?'#ffd54f':'#ce93d8',border:r===5?'1px solid rgba(255,213,79,0.2)':'1px solid rgba(206,147,216,0.2)'}}>
                  {r}★
                </span>
              ))}
            </div>
            <div className="text-xs text-white/40 truncate pr-4">{a.piece2DescEn || '—'}</div>
            <div className="flex gap-1.5 justify-end">
              <button onClick={()=>openEdit(a.id)} className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase" style={{background:'rgba(206,147,216,0.10)',border:'1px solid rgba(206,147,216,0.20)',color:'#ce93d8'}}>Edit</button>
              <button onClick={()=>handleDelete(a.id,a.nameEn)} className="px-2 py-1.5 rounded-lg text-[10px] font-bold" style={{background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.15)',color:'rgba(239,68,68,0.7)'}}>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between px-1">
        <span className="text-white/25 text-xs">Showing {Math.min((page-1)*PER_PAGE+1,filtered.length)}–{Math.min(page*PER_PAGE,filtered.length)} of {filtered.length}</span>
        <Pagination page={page} totalPages={totalPages} onChange={setPage}/>
      </div>

      {/* Form Modal */}
      <AdminModal open={modalOpen} onClose={()=>setModalOpen(false)} title={editId?'Edit Artifact Set':'Add Artifact Set'} subtitle={editId||'New set'} size="lg"
        footer={
          <div className="flex items-center justify-between">
            {isDirty&&<span className="flex items-center gap-1.5 text-xs" style={{color:'#f0d080'}}><span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"/>Unsaved</span>}
            <div className="flex gap-2 ml-auto">
              <button onClick={()=>setModalOpen(false)} className="px-4 py-2 rounded-xl text-sm font-bold" style={{background:'rgba(255,255,255,0.05)',color:'rgba(255,255,255,0.5)'}}>Cancel</button>
              <button onClick={handleSubmit(onSave)} className="px-5 py-2 rounded-xl text-sm font-black uppercase tracking-wide" style={{background:'linear-gradient(135deg,#ce93d8,#8e24aa)',color:'#fff',boxShadow:'0 4px 16px rgba(206,147,216,0.25)'}}>
                {editId?'Save Changes':'Create Artifact'}
              </button>
            </div>
          </div>
        }
      >
        <div className="px-6 py-5 grid grid-cols-2 gap-4">
          {/* ID */}
          <div className="flex flex-col gap-1.5 col-span-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">ID (slug) <span className="text-red-400">*</span></label>
            <input {...register('id')} placeholder="e.g. crimson-witch-of-flames" className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none font-mono" style={{background:'rgba(4,4,10,0.8)',border:errors.id?'1px solid rgba(239,68,68,0.5)':'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.88)'}}/>
            {errors.id&&<p className="text-red-400 text-xs">{errors.id.message}</p>}
          </div>
          {/* Name EN/VI */}
          {(['nameEn','nameVi'] as const).map(f=>(
            <div key={f} className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Name ({f==='nameEn'?'EN':'VI'}) <span className="text-red-400">*</span></label>
              <input {...register(f)} className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none" style={{background:'rgba(4,4,10,0.8)',border:errors[f]?'1px solid rgba(239,68,68,0.5)':'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.88)'}}/>
              {errors[f]&&<p className="text-red-400 text-xs">{(errors[f] as any)?.message}</p>}
            </div>
          ))}
          {/* Rarities */}
          <div className="flex flex-col gap-1.5 col-span-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Available Rarities <span className="text-red-400">*</span></label>
            <div className="flex gap-2">
              {[3,4,5].map(r => {
                const active = rarityList.includes(r);
                return (
                  <button
                    key={r} type="button" onClick={() => toggleRarity(r)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                    style={{
                      background: active ? 'rgba(206,147,216,0.15)' : 'rgba(255,255,255,0.04)',
                      border: active ? '1px solid rgba(206,147,216,0.3)' : '1px solid rgba(255,255,255,0.08)',
                      color: active ? '#ce93d8' : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    <div className={`w-3 h-3 rounded flex items-center justify-center border ${active?'border-[#ce93d8] bg-[#ce93d8]':'border-white/20'}`}>
                      {active && <svg className="w-2.5 h-2.5 text-black" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>}
                    </div>
                    {r}★
                  </button>
                );
              })}
            </div>
            {errors.rarityList&&<p className="text-red-400 text-xs">{errors.rarityList.message}</p>}
          </div>
          {/* Piece 2 */}
          <div className="flex flex-col gap-1.5 col-span-2 pt-2 border-t" style={{borderColor:'rgba(255,255,255,0.05)'}}>
            <label className="text-[11px] font-bold uppercase tracking-widest text-white/20">2-Piece Bonus</label>
          </div>
          {(['piece2DescEn','piece2DescVi'] as const).map(f=>(
            <div key={f} className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">{f==='piece2DescEn'?'EN':'VI'}</label>
              <textarea {...register(f)} rows={2} className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none resize-none" style={{background:'rgba(4,4,10,0.8)',border:'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.88)'}}/>
            </div>
          ))}
          {/* Piece 4 */}
          <div className="flex flex-col gap-1.5 col-span-2 pt-2 border-t" style={{borderColor:'rgba(255,255,255,0.05)'}}>
            <label className="text-[11px] font-bold uppercase tracking-widest text-white/20">4-Piece Bonus</label>
          </div>
          {(['piece4DescEn','piece4DescVi'] as const).map(f=>(
            <div key={f} className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">{f==='piece4DescEn'?'EN':'VI'}</label>
              <textarea {...register(f)} rows={3} className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none resize-none" style={{background:'rgba(4,4,10,0.8)',border:'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.88)'}}/>
            </div>
          ))}
          {/* Icon URL */}
          <div className="col-span-2">
            <Controller control={control} name="iconUrl" render={({field})=>(
              <ImageUrlInput label="Icon URL" value={field.value||''} onChange={field.onChange} error={errors.iconUrl?.message} placeholder="https://cdn.../artifact-icon.webp"/>
            )}/>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
