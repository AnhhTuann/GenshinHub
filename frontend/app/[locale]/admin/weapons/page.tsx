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

const WEAPON_TYPES = ['Sword','Claymore','Polearm','Bow','Catalyst'];
const RARITIES = [5,4,3,2,1];
const SUBSTATS = ['ATK%','HP%','DEF%','CRIT Rate%','CRIT DMG%','Energy Recharge%','Elemental Mastery','Physical DMG%',''];
const TIERS = ['SS','S','A','B','C'];

const WEAPON_TYPE_VALUES = ['Sword','Claymore','Polearm','Bow','Catalyst'] as const;

const WeaponSchema = z.object({
  id:             z.string().min(1,'ID required').regex(/^[a-z0-9-]+$/,'Lowercase, numbers, hyphens only'),
  nameEn:         z.string().min(1,'Name (EN) required'),
  nameVi:         z.string().min(1,'Name (VI) required'),
  rarity:         z.coerce.number().int().min(1).max(5),
  type:           z.enum(WEAPON_TYPE_VALUES),
  baseAtk:        z.coerce.number().int().positive('Base ATK must be positive'),
  subStat:        z.string().optional().default(''),
  subStatValue:   z.coerce.number().optional().default(0),
  passiveNameEn:  z.string().optional().default(''),
  passiveNameVi:  z.string().optional().default(''),
  passiveDescEn:  z.string().optional().default(''),
  passiveDescVi:  z.string().optional().default(''),
  iconUrl:        z.string().optional().default(''),
  tier:           z.string().optional().default(''),
});
type WeaponFormData = z.infer<typeof WeaponSchema>;

const PER_PAGE = 20;

export default function WeaponsAdmin() {
  const [all,       setAll]       = useState<any[]>([]);
  const [search,    setSearch]    = useState('');
  const [typeFilter,setTypeFilter]= useState('');
  const [page,      setPage]      = useState(1);
  const [loading,   setLoading]   = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId,    setEditId]    = useState<string|null>(null);
  const { confirm, modal: confirmModal } = useConfirm();

  const { register, handleSubmit, reset, control, watch, setValue, formState: { errors, isDirty } } = useForm<WeaponFormData>({ 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(WeaponSchema) as any,
    defaultValues: { id:'',nameEn:'',nameVi:'',rarity:5,type:'Sword',baseAtk:608,subStat:'',subStatValue:0,passiveNameEn:'',passiveNameVi:'',passiveDescEn:'',passiveDescVi:'',iconUrl:'',tier:'' },
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await fetchGraphQL(`query { weapons { id nameEn nameVi rarity type baseAtk subStat iconUrl tier } }`);
      setAll(d.weapons ?? []);
    } catch (e: any) { toast.error(e.message); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = all.filter(w =>
    (!search     || w.nameEn.toLowerCase().includes(search.toLowerCase())) &&
    (!typeFilter || w.type === typeFilter)
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const items      = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  useEffect(() => setPage(1), [search, typeFilter]);

  const openNew = () => { setEditId(null); reset(); setModalOpen(true); };
  const openEdit = async (id: string) => {
    setEditId(id);
    try {
      const d = await fetchGraphQL(`query { weapon(id:"${id}") { id nameEn nameVi rarity type baseAtk subStat subStatValue passiveNameEn passiveNameVi passiveDescEn passiveDescVi iconUrl tier } }`);
      const w = d.weapon;
      if (w) reset({ ...w, subStat: w.subStat??'', subStatValue: w.subStatValue??0, passiveNameEn:w.passiveNameEn??'', passiveNameVi:w.passiveNameVi??'', passiveDescEn:w.passiveDescEn??'', passiveDescVi:w.passiveDescVi??'', iconUrl:w.iconUrl??'', tier:w.tier??'' });
    } catch (e: any) { toast.error('Load failed: '+e.message); }
    setModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    const ok = await confirm({ title:'Delete Weapon', message:`Delete "${name}"?`, confirmLabel:'Delete', danger:true });
    if (!ok) return;
    try {
      await fetchGraphQL(`mutation { deleteWeapon(id:"${id}") }`);
      toast.success(`${name} deleted.`);
      load();
    } catch (e: any) { toast.error(e.message); }
  };

  const onSave = async (data: WeaponFormData) => {
    const tid = toast.loading(editId ? 'Saving...' : 'Creating...');
    try {
      const input = { ...data, rarity:Number(data.rarity), baseAtk:Number(data.baseAtk), subStatValue:Number(data.subStatValue||0), subStat:data.subStat||null, tier:data.tier||null };
      await fetchGraphQL(`mutation U($input:WeaponInput!){upsertWeapon(input:$input){id}}`, { input });
      toast.success(editId?`${data.nameEn} saved!`:`${data.nameEn} created!`,{id:tid});
      setModalOpen(false);
      load();
    } catch (e: any) { toast.error('Error: '+e.message,{id:tid}); }
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const nameEnVal = watch('nameEn');
  useEffect(()=>{
    if(!editId && nameEnVal) setValue('id', nameEnVal.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,''));
  },[editId,nameEnVal,setValue]);

  const RARITY_COLOR: Record<number,string> = {5:'#ffd54f',4:'#ce93d8',3:'#80cbc4',2:'#a5d6a7',1:'#bdbdbd'};

  return (
    <div className="flex flex-col gap-5">
      {confirmModal}

      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-black uppercase tracking-wide" style={{ fontFamily:'var(--font-cinzel,Cinzel,serif)', background:'linear-gradient(135deg,#4fc3f7,#0284c7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            Weapons
          </h1>
          <p className="text-white/30 text-xs mt-0.5">{loading?'Loading...':`${filtered.length} of ${all.length} weapons`}</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-wider" style={{ background:'linear-gradient(135deg,#4fc3f7,#0284c7)', color:'#fff', boxShadow:'0 4px 16px rgba(79,195,247,0.3)' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4"/></svg>
          Add Weapon
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap p-3.5 rounded-2xl" style={{ background:'rgba(8,8,18,0.80)', border:'1px solid rgba(255,255,255,0.05)' }}>
        <div className="relative flex-1 min-w-[160px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" placeholder="Search weapons..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full pl-8 pr-3 py-2 rounded-xl text-xs font-medium outline-none" style={{background:'rgba(4,4,10,0.8)',border:'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.85)'}}/>
        </div>
        <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)} className="px-3 py-2 rounded-xl text-xs font-bold outline-none" style={{background:'rgba(4,4,10,0.8)',border:'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.7)'}}>
          <option value="">All Types</option>
          {WEAPON_TYPES.map(t=><option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{background:'rgba(8,8,18,0.70)',border:'1px solid rgba(255,255,255,0.05)'}}>
        <div className="grid items-center text-[10px] font-black uppercase tracking-widest text-white/25 px-4 py-2.5" style={{gridTemplateColumns:'40px 1fr 90px 80px 90px 70px 80px',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
          <span/><span>Name</span><span>Type</span><span>Rarity</span><span>Base ATK</span><span>Tier</span><span className="text-right">Actions</span>
        </div>
        {loading ? (
          <div className="py-12 text-center text-white/25 text-sm">Loading...</div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center text-white/25 text-sm">No weapons found.</div>
        ) : items.map((w,i)=>(
          <div key={w.id}
            className="grid items-center px-4 py-2.5 transition-colors"
            style={{gridTemplateColumns:'40px 1fr 90px 80px 90px 70px 80px', borderBottom:i===items.length-1?'none':'1px solid rgba(255,255,255,0.04)'}}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.02)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden" style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)'}}>
              {w.iconUrl&&<FallbackImage src={w.iconUrl} alt={w.nameEn} fill className="object-contain p-0.5" sizes="32px" unoptimized/>}
            </div>
            <div><div className="text-sm font-bold text-white/85">{w.nameEn}</div><div className="text-[10px] text-white/25 font-mono">{w.id}</div></div>
            <div className="text-xs text-white/45 font-medium">{w.type}</div>
            <div className="text-xs font-bold" style={{color:RARITY_COLOR[w.rarity]||'#fff'}}>{'★'.repeat(w.rarity)}</div>
            <div className="text-xs font-mono font-bold text-white/70">{w.baseAtk}</div>
            <div>{w.tier?<span className="px-2 py-0.5 rounded text-[10px] font-black" style={{background:'rgba(200,168,75,0.12)',color:'#f0d080',border:'1px solid rgba(200,168,75,0.20)'}}>{w.tier}</span>:<span className="text-white/15 text-xs">—</span>}</div>
            <div className="flex gap-1.5 justify-end">
              <button onClick={()=>openEdit(w.id)} className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase" style={{background:'rgba(79,195,247,0.10)',border:'1px solid rgba(79,195,247,0.20)',color:'#4fc3f7'}}>Edit</button>
              <button onClick={()=>handleDelete(w.id,w.nameEn)} className="px-2 py-1.5 rounded-lg text-[10px] font-bold" style={{background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.15)',color:'rgba(239,68,68,0.7)'}}>
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
      <AdminModal open={modalOpen} onClose={()=>setModalOpen(false)} title={editId?'Edit Weapon':'Add Weapon'} subtitle={editId||'New weapon'} size="lg"
        footer={
          <div className="flex items-center justify-between">
            {isDirty&&<span className="flex items-center gap-1.5 text-xs" style={{color:'#f0d080'}}><span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"/>Unsaved</span>}
            <div className="flex gap-2 ml-auto">
              <button onClick={()=>setModalOpen(false)} className="px-4 py-2 rounded-xl text-sm font-bold" style={{background:'rgba(255,255,255,0.05)',color:'rgba(255,255,255,0.5)'}}>Cancel</button>
              <button onClick={handleSubmit(onSave)} className="px-5 py-2 rounded-xl text-sm font-black uppercase tracking-wide" style={{background:'linear-gradient(135deg,#4fc3f7,#0284c7)',color:'#fff',boxShadow:'0 4px 16px rgba(79,195,247,0.25)'}}>
                {editId?'Save Changes':'Create Weapon'}
              </button>
            </div>
          </div>
        }
      >
        <div className="px-6 py-5 grid grid-cols-2 gap-4">
          {/* ID */}
          <div className="flex flex-col gap-1.5 col-span-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">ID (slug) <span className="text-red-400">*</span></label>
            <input {...register('id')} placeholder="e.g. staff-of-homa" className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none font-mono" style={{background:'rgba(4,4,10,0.8)',border:errors.id?'1px solid rgba(239,68,68,0.5)':'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.88)'}}/>
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
          {/* Type / Rarity / BaseAtk / SubStat / SubStatValue */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Type <span className="text-red-400">*</span></label>
            <select {...register('type')} className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none appearance-none" style={{background:'rgba(4,4,10,0.8)',border:'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.88)'}}>
              {WEAPON_TYPES.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Rarity</label>
            <select {...register('rarity')} className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none appearance-none" style={{background:'rgba(4,4,10,0.8)',border:'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.88)'}}>
              {RARITIES.map(r=><option key={r} value={r}>{'★'.repeat(r)} {r}-Star</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Base ATK <span className="text-red-400">*</span></label>
            <input {...register('baseAtk')} type="number" className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none font-mono" style={{background:'rgba(4,4,10,0.8)',border:errors.baseAtk?'1px solid rgba(239,68,68,0.5)':'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.88)'}}/>
            {errors.baseAtk&&<p className="text-red-400 text-xs">{errors.baseAtk.message}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Sub Stat</label>
            <select {...register('subStat')} className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none appearance-none" style={{background:'rgba(4,4,10,0.8)',border:'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.88)'}}>
              {SUBSTATS.map(s=><option key={s} value={s}>{s||'None'}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Sub Stat Value (%)</label>
            <input {...register('subStatValue')} type="number" step="0.1" className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none font-mono" style={{background:'rgba(4,4,10,0.8)',border:'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.88)'}}/>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Tier</label>
            <select {...register('tier')} className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none appearance-none" style={{background:'rgba(4,4,10,0.8)',border:'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.88)'}}>
              <option value="">— None —</option>
              {TIERS.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          {/* Passive */}
          <div className="flex flex-col gap-1.5 col-span-2 pt-1 border-t" style={{borderColor:'rgba(255,255,255,0.05)'}}>
            <label className="text-[11px] font-bold uppercase tracking-widest text-white/20">Passive Name</label>
          </div>
          {(['passiveNameEn','passiveNameVi'] as const).map(f=>(
            <div key={f} className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">{f==='passiveNameEn'?'EN':'VI'}</label>
              <input {...register(f)} className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none" style={{background:'rgba(4,4,10,0.8)',border:'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.88)'}}/>
            </div>
          ))}
          {(['passiveDescEn','passiveDescVi'] as const).map(f=>(
            <div key={f} className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Passive Desc {f==='passiveDescEn'?'(EN)':'(VI)'}</label>
              <textarea {...register(f)} rows={2} className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none resize-none" style={{background:'rgba(4,4,10,0.8)',border:'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.88)'}}/>
            </div>
          ))}
          {/* Icon URL */}
          <div className="col-span-2">
            <Controller control={control} name="iconUrl" render={({field})=>(
              <ImageUrlInput label="Icon URL" value={field.value||''} onChange={field.onChange} error={errors.iconUrl?.message} placeholder="https://cdn.../weapon-icon.webp"/>
            )}/>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
