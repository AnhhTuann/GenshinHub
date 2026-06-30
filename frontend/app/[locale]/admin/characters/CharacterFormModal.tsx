"use client";
import { useEffect, useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { fetchGraphQL } from '@/lib/graphql';
import AdminModal from '@/components/admin/ui/AdminModal';
import ImageUrlInput from '@/components/admin/ui/ImageUrlInput';

// ── Zod Schema ─────────────────────────────────────────────
const ELEMENT_VALUES = ['Pyro','Hydro','Anemo','Electro','Dendro','Cryo','Geo'] as const;
const WEAPON_VALUES  = ['Sword','Claymore','Polearm','Bow','Catalyst'] as const;
const TIER_VALUES    = ['SS','S','A','B','C',''] as const;

const CharSchema = z.object({
  id:            z.string().min(1,'ID is required').regex(/^[a-z0-9-]+$/, 'Lowercase letters, numbers and hyphens only'),
  nameEn:        z.string().min(1, 'English name is required'),
  nameVi:        z.string().min(1, 'Vietnamese name is required'),
  titleEn:       z.string().optional().default(''),
  titleVi:       z.string().optional().default(''),
  element:       z.enum(ELEMENT_VALUES),
  rarity:        z.coerce.number().refine(v => v === 4 || v === 5, 'Must be 4 or 5'),
  weapon:        z.enum(WEAPON_VALUES),
  region:        z.string().optional().default(''),
  birthday:      z.string().optional().default(''),
  avatarUrl:     z.string().min(1, 'Avatar URL is required'),
  splashArtUrl:  z.string().min(1, 'Splash art URL is required'),
  descriptionEn: z.string().optional().default(''),
  descriptionVi: z.string().optional().default(''),
  baseHp:        z.coerce.number().int().nonnegative().optional(),
  baseAtk:       z.coerce.number().int().nonnegative().optional(),
  baseDef:       z.coerce.number().int().nonnegative().optional(),
  tier:          z.enum(TIER_VALUES).optional().default(''),
  role:          z.string().optional().default(''),
  recommendedC:  z.string().optional().default(''),
});

type CharFormData = z.infer<typeof CharSchema>;

const ELEMENTS    = ['Pyro','Hydro','Anemo','Electro','Dendro','Cryo','Geo'];
const WEAPON_TYPES = ['Sword','Claymore','Polearm','Bow','Catalyst'];
const REGIONS     = ['Mondstadt','Liyue','Inazuma','Sumeru','Fontaine','Natlan','Snezhnaya','Khaenri\'ah'];
const TIERS       = ['SS','S','A','B','C'];
const ELEM_COLOR: Record<string,string> = { Pyro:'#ff6b4a',Hydro:'#4fc3f7',Cryo:'#80deea',Electro:'#ce93d8',Anemo:'#4db6ac',Geo:'#ffd54f',Dendro:'#aed581' };

const TABS = [
  { id: 'basic',  label: 'Basic Info',    icon: '📋' },
  { id: 'media',  label: 'Media & Stats', icon: '🖼️' },
  { id: 'tier',   label: 'Tier & Role',   icon: '🏆' },
];

// ── Field components ────────────────────────────────────────
function Field({ label, required, children, error }: { label: string; required?: boolean; children: React.ReactNode; error?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-400 text-xs flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function TextInput({ register, name, placeholder, error, type = 'text', mono = false }: any) {
  return (
    <input
      {...register(name)}
      type={type}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
      style={{
        background: 'rgba(4,4,10,0.8)',
        border: error ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.07)',
        color: 'rgba(255,255,255,0.88)',
        fontFamily: mono ? 'var(--font-mono, monospace)' : 'inherit',
      }}
    />
  );
}

function SelectInput({ register, name, children, error }: any) {
  return (
    <select
      {...register(name)}
      className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none appearance-none"
      style={{
        background: 'rgba(4,4,10,0.8)',
        border: error ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.07)',
        color: 'rgba(255,255,255,0.88)',
      }}
    >
      {children}
    </select>
  );
}

// ── Main Component ──────────────────────────────────────────
interface Props { open: boolean; characterId: string | null; onClose: () => void; onSaved: () => void; }

export default function CharacterFormModal({ open, characterId, onClose, onSaved }: Props) {
  const isNew = !characterId;
  const [tab, setTab] = useState('basic');
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, control, watch, setValue, formState: { errors, isDirty } } = useForm<CharFormData>({ 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(CharSchema) as any,
    defaultValues: {
      id: '', nameEn: '', nameVi: '', titleEn: '', titleVi: '',
      element: 'Pyro', rarity: 5, weapon: 'Sword', region: 'Mondstadt',
      birthday: '', avatarUrl: '', splashArtUrl: '',
      descriptionEn: '', descriptionVi: '',
      baseHp: 0, baseAtk: 0, baseDef: 0,
      tier: '', role: '', recommendedC: '',
    },
  });

  const avatarUrl    = watch('avatarUrl');
  const splashArtUrl = watch('splashArtUrl');
  const elementVal   = watch('element');

  // Load existing character data
  useEffect(() => {
    if (!open) return;
    if (isNew) {
      reset();
      setTab('basic');
      return;
    }
    const load = async () => {
      try {
        const d = await fetchGraphQL(`
          query {
            character(id: "${characterId}") {
              id nameEn nameVi titleEn titleVi rarity element weapon region birthday
              avatarUrl splashArtUrl descriptionEn descriptionVi
              baseHp baseAtk baseDef tier role recommendedC
            }
          }
        `);
        const c = d.character;
        if (c) reset({
          ...c,
          rarity: c.rarity ?? 5,
          tier: c.tier ?? '',
          role: c.role ?? '',
          recommendedC: c.recommendedC ?? '',
          birthday: c.birthday ?? '',
          region: c.region ?? '',
          titleEn: c.titleEn ?? '',
          titleVi: c.titleVi ?? '',
          descriptionEn: c.descriptionEn ?? '',
          descriptionVi: c.descriptionVi ?? '',
          baseHp: c.baseHp ?? 0,
          baseAtk: c.baseAtk ?? 0,
          baseDef: c.baseDef ?? 0,
        });
      } catch (e: any) {
        toast.error('Failed to load character: ' + e.message);
      }
    };
    load();
  }, [open, characterId, isNew, reset]);

  // Auto-generate ID from English name
  const nameEnVal = watch('nameEn');
  useEffect(() => {
    if (isNew && nameEnVal) {
      setValue('id', nameEnVal.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''), { shouldValidate: false });
    }
  }, [isNew, nameEnVal, setValue]);

  const onSubmit = async (data: CharFormData) => {
    setSaving(true);
    const toastId = toast.loading(isNew ? 'Creating character...' : 'Saving changes...');
    try {
      const input = {
        ...data,
        rarity: Number(data.rarity),
        baseHp:  Number(data.baseHp  || 0),
        baseAtk: Number(data.baseAtk || 0),
        baseDef: Number(data.baseDef || 0),
        tier: data.tier || null,
        role: data.role || null,
        recommendedC: data.recommendedC || null,
        birthday: data.birthday || null,
        talentPriority: [],
      };
      await fetchGraphQL(
        `mutation Upsert($input: CharacterInput!) { upsertCharacter(input: $input) { id } }`,
        { input }
      );
      toast.success(isNew ? `${data.nameEn} created!` : `${data.nameEn} saved!`, { id: toastId });
      onSaved();
    } catch (e: any) {
      toast.error('Error: ' + e.message, { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  // Count errors per tab
  const errorFields = Object.keys(errors);
  const tabErrors: Record<string,number> = {
    basic: ['id','nameEn','nameVi','titleEn','titleVi','element','rarity','weapon','region','birthday','descriptionEn','descriptionVi'].filter(f => errorFields.includes(f)).length,
    media: ['avatarUrl','splashArtUrl','baseHp','baseAtk','baseDef'].filter(f => errorFields.includes(f)).length,
    tier: ['tier','role','recommendedC'].filter(f => errorFields.includes(f)).length,
  };

  const ec = ELEM_COLOR[elementVal] ?? '#c8a84b';

  return (
    <AdminModal
      open={open}
      onClose={onClose}
      title={isNew ? 'Add New Character' : 'Edit Character'}
      subtitle={isNew ? 'Fill in all required fields to create a new character.' : `Editing ${characterId}`}
      size="xl"
      footer={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isDirty && (
              <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#f0d080' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Unsaved changes
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} disabled={saving} className="px-5 py-2 rounded-xl text-sm font-bold" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)' }}>
              Cancel
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-black uppercase tracking-wide disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #f0d080, #c8a84b)', color: '#080812', boxShadow: '0 4px 16px rgba(200,168,75,0.3)' }}
            >
              {saving ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Saving...
                </>
              ) : (isNew ? '+ Create' : '✓ Save Changes')}
            </button>
          </div>
        </div>
      }
    >
      {/* Tabs */}
      <div
        className="flex gap-0 px-6 pt-4 pb-0 shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {TABS.map(t => {
          const active = tab === t.id;
          const eCount = tabErrors[t.id] ?? 0;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold relative"
              style={{
                color: active ? '#f0d080' : 'rgba(255,255,255,0.35)',
                borderBottom: active ? `2px solid ${ec}` : '2px solid transparent',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              <span>{t.icon}</span>
              <span style={{ fontFamily: active ? 'var(--font-cinzel, serif)' : 'inherit', fontSize: active ? '0.68rem' : undefined }}>
                {t.label}
              </span>
              {eCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] flex items-center justify-center text-white font-black">
                  {eCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Form content */}
      <form className="px-6 py-5 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>

        {/* ── Tab: Basic Info ── */}
        {tab === 'basic' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Field label="ID (slug)" required error={errors.id?.message}>
                <TextInput register={register} name="id" placeholder="e.g. hu-tao" error={errors.id} mono />
              </Field>
              <div className="grid grid-cols-2 gap-4 col-span-1">
                <Field label="Rarity" required error={errors.rarity?.message}>
                  <SelectInput register={register} name="rarity">
                    <option value={5}>⭐⭐⭐⭐⭐ 5-Star</option>
                    <option value={4}>⭐⭐⭐⭐ 4-Star</option>
                  </SelectInput>
                </Field>
                <Field label="Element" required error={errors.element?.message}>
                  <SelectInput register={register} name="element">
                    {ELEMENTS.map(e => <option key={e} value={e}>{e}</option>)}
                  </SelectInput>
                </Field>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Name (EN)" required error={errors.nameEn?.message}>
                <TextInput register={register} name="nameEn" placeholder="e.g. Hu Tao" error={errors.nameEn} />
              </Field>
              <Field label="Name (VI)" required error={errors.nameVi?.message}>
                <TextInput register={register} name="nameVi" placeholder="e.g. Hồ Đào" error={errors.nameVi} />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Title (EN)" error={errors.titleEn?.message}>
                <TextInput register={register} name="titleEn" placeholder="e.g. Fragrance in Thaw" />
              </Field>
              <Field label="Title (VI)" error={errors.titleVi?.message}>
                <TextInput register={register} name="titleVi" placeholder="e.g. Hương Xuân" />
              </Field>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Field label="Weapon Type" required error={errors.weapon?.message}>
                <SelectInput register={register} name="weapon">
                  {WEAPON_TYPES.map(w => <option key={w} value={w}>{w}</option>)}
                </SelectInput>
              </Field>
              <Field label="Region" error={errors.region?.message}>
                <SelectInput register={register} name="region">
                  <option value="">— Select —</option>
                  {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </SelectInput>
              </Field>
              <Field label="Birthday" error={errors.birthday?.message}>
                <TextInput register={register} name="birthday" placeholder="MM/DD e.g. 07/15" />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Description (EN)" error={errors.descriptionEn?.message}>
                <textarea
                  {...register('descriptionEn')}
                  rows={3}
                  placeholder="Character lore..."
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none resize-none"
                  style={{ background: 'rgba(4,4,10,0.8)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.85)' }}
                />
              </Field>
              <Field label="Description (VI)" error={errors.descriptionVi?.message}>
                <textarea
                  {...register('descriptionVi')}
                  rows={3}
                  placeholder="Lore nhân vật..."
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none resize-none"
                  style={{ background: 'rgba(4,4,10,0.8)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.85)' }}
                />
              </Field>
            </div>
          </>
        )}

        {/* ── Tab: Media & Stats ── */}
        {tab === 'media' && (
          <>
            <Controller
              control={control} name="avatarUrl"
              render={({ field }) => (
                <ImageUrlInput
                  label="Avatar URL" required value={field.value}
                  onChange={field.onChange} error={errors.avatarUrl?.message}
                  placeholder="https://cdn.../UI_AvatarIcon_..."
                />
              )}
            />
            <Controller
              control={control} name="splashArtUrl"
              render={({ field }) => (
                <ImageUrlInput
                  label="Splash Art URL" required value={field.value}
                  onChange={field.onChange} error={errors.splashArtUrl?.message}
                  placeholder="https://cdn.../Char_..._Splash_Art.png"
                />
              )}
            />
            <div className="grid grid-cols-3 gap-4">
              <Field label="Base HP" error={errors.baseHp?.message}>
                <TextInput register={register} name="baseHp" type="number" placeholder="e.g. 15552" mono />
              </Field>
              <Field label="Base ATK" error={errors.baseAtk?.message}>
                <TextInput register={register} name="baseAtk" type="number" placeholder="e.g. 106" mono />
              </Field>
              <Field label="Base DEF" error={errors.baseDef?.message}>
                <TextInput register={register} name="baseDef" type="number" placeholder="e.g. 876" mono />
              </Field>
            </div>
          </>
        )}

        {/* ── Tab: Tier & Role ── */}
        {tab === 'tier' && (
          <>
            <div className="grid grid-cols-3 gap-4">
              <Field label="Tier" error={errors.tier?.message}>
                <SelectInput register={register} name="tier">
                  <option value="">— None —</option>
                  {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
                </SelectInput>
              </Field>
              <Field label="Role" error={errors.role?.message}>
                <SelectInput register={register} name="role">
                  <option value="">— None —</option>
                  {['Main DPS','Sub-DPS','Support','Healer','Buffer','Shielder'].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Recommended Constellation" error={errors.recommendedC?.message}>
                <SelectInput register={register} name="recommendedC">
                  <option value="">— None —</option>
                  {['C0','C1','C2','C3','C4','C5','C6'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </SelectInput>
              </Field>
            </div>

            {/* Tier preview */}
            <div
              className="rounded-xl p-4"
              style={{ background: 'rgba(4,4,10,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <p className="text-xs font-bold text-white/25 uppercase tracking-wider mb-3">Preview</p>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black"
                  style={{
                    background: watch('tier') === 'SS' ? 'rgba(255,107,74,0.15)' : watch('tier') === 'S' ? 'rgba(255,213,79,0.12)' : 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    color: watch('tier') === 'SS' ? '#ff6b4a' : watch('tier') === 'S' ? '#ffd54f' : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {watch('tier') || '?'}
                </div>
                <div>
                  <div className="text-sm font-bold text-white/70">{watch('nameEn') || 'Character Name'}</div>
                  <div className="text-xs text-white/30">{watch('role') || 'Role'} · {watch('recommendedC') || 'C0'}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </form>
    </AdminModal>
  );
}
