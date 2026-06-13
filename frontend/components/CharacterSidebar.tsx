import Image from 'next/image';
import { CharacterData } from '@/types/character';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

const ELEMENT_COLOR: Record<string, string> = {
  Pyro:    '#ff6b4a',
  Hydro:   '#4fc3f7',
  Cryo:    '#80deea',
  Electro: '#ce93d8',
  Anemo:   '#4db6ac',
  Geo:     '#ffd54f',
  Dendro:  '#aed581',
};

const ELEMENT_TEXT: Record<string, string> = {
  Pyro:    'text-[#ff6b4a]',
  Hydro:   'text-[#4fc3f7]',
  Cryo:    'text-[#80deea]',
  Electro: 'text-[#ce93d8]',
  Anemo:   'text-[#4db6ac]',
  Geo:     'text-[#ffd54f]',
  Dendro:  'text-[#aed581]',
};

const SIGNATURE_WEAPONS: Record<string, { name: string; icon: string; name2?: string; icon2?: string }> = {
  "hu tao":          { name: "Staff of Homa",                    icon: "/images/weapons/UI_EquipIcon_Pole_Homa.png" },
  "diluc":           { name: "Wolf's Gravestone",                icon: "/images/weapons/UI_EquipIcon_Claymore_Wolfmound.png" },
  "klee":            { name: "Lost Prayer to the Sacred Winds",  icon: "/images/weapons/UI_EquipIcon_Catalyst_Fourwinds.png" },
  "yoimiya":         { name: "Thundering Pulse",                 icon: "/images/weapons/UI_EquipIcon_Bow_Narukami.png" },
  "dehya":           { name: "Beacon of the Reed Sea",           icon: "/images/weapons/UI_EquipIcon_Claymore_Deshret.png" },
  "lyney":           { name: "The First Great Magic",            icon: "/images/weapons/UI_EquipIcon_Bow_Pledge.png" },
  "arlecchino":      { name: "Crimson Moon's Semblance",         icon: "/images/weapons/UI_EquipIcon_Pole_BloodMoon.png" },
  "tartaglia":       { name: "Polar Star",                       icon: "/images/weapons/UI_EquipIcon_Bow_Worldbane.png",   name2: "Skyward Harp", icon2: "/images/weapons/UI_EquipIcon_Bow_Dvalin.png" },
  "mona":            { name: "Skyward Atlas",                    icon: "/images/weapons/UI_EquipIcon_Catalyst_Dvalin.png", name2: "Lost Prayer to the Sacred Winds", icon2: "/images/weapons/UI_EquipIcon_Catalyst_Fourwinds.png" },
  "kamisato ayato":  { name: "Haran Geppaku Futsu",             icon: "/images/weapons/UI_EquipIcon_Sword_Amenoma.png" },
  "yelan":           { name: "Aqua Simulacra",                   icon: "/images/weapons/UI_EquipIcon_Bow_Kirin.png" },
  "sangonomiya kokomi": { name: "Everlasting Moonglow",         icon: "/images/weapons/UI_EquipIcon_Catalyst_FairyGarden.png" },
  "nilou":           { name: "Key of Khaj-Nisut",                icon: "/images/weapons/UI_EquipIcon_Sword_Deshret.png" },
  "neuvillette":     { name: "Tome of the Eternal Flow",         icon: "/images/weapons/UI_EquipIcon_Catalyst_Iudex.png" },
  "furina":          { name: "Splendor of Tranquil Waters",      icon: "/images/weapons/UI_EquipIcon_Sword_Regalis.png" },
  "sigewinne":       { name: "Silvershower Heartstrings",        icon: "/images/weapons/UI_EquipIcon_Bow_Arcdange.png" },
  "venti":           { name: "Elegy for the End",                icon: "/images/weapons/UI_EquipIcon_Bow_Widsith.png",     name2: "Skyward Harp", icon2: "/images/weapons/UI_EquipIcon_Bow_Dvalin.png" },
  "jean":            { name: "Aquila Favonia",                   icon: "/images/weapons/UI_EquipIcon_Sword_Falcon.png" },
  "xiao":            { name: "Primordial Jade Winged-Spear",     icon: "/images/weapons/UI_EquipIcon_Pole_Gladiator.png" },
  "kaedehara kazuha":{ name: "Freedom-Sworn",                    icon: "/images/weapons/UI_EquipIcon_Sword_Widsith.png" },
  "wanderer":        { name: "Tulaytullah's Remembrance",        icon: "/images/weapons/UI_EquipIcon_Catalyst_Alaya.png" },
  "xianyun":         { name: "Crane's Echoing Call",             icon: "/images/weapons/UI_EquipIcon_Catalyst_MountainGale.png" },
  "chasca":          { name: "Astral Vulture's Crimson Plumage", icon: "/images/weapons/UI_EquipIcon_Bow_Qoyllorsnova.png" },
  "keqing":          { name: "Primordial Jade Cutter",           icon: "/images/weapons/UI_EquipIcon_Sword_Morax.png" },
  "raiden shogun":   { name: "Engulfing Lightning",              icon: "/images/weapons/UI_EquipIcon_Pole_Shanty.png" },
  "yae miko":        { name: "Kagura's Verity",                  icon: "/images/weapons/UI_EquipIcon_Catalyst_SakuraFan.png" },
  "cyno":            { name: "Staff of the Scarlet Sands",       icon: "/images/weapons/UI_EquipIcon_Pole_Deshret.png" },
  "clorinde":        { name: "Absolution",                       icon: "/images/weapons/UI_EquipIcon_Sword_Pleroma.png" },
  "tighnari":        { name: "Hunter's Path",                    icon: "/images/weapons/UI_EquipIcon_Bow_Ayus.png" },
  "nahida":          { name: "A Thousand Floating Dreams",       icon: "/images/weapons/UI_EquipIcon_Catalyst_Ayus.png" },
  "alhaitham":       { name: "Light of Foliar Incision",         icon: "/images/weapons/UI_EquipIcon_Sword_Ayus.png" },
  "baizhu":          { name: "Jadefall's Splendor",              icon: "/images/weapons/UI_EquipIcon_Catalyst_Morax.png" },
  "emilie":          { name: "Lumidouce Elegy",                  icon: "/images/weapons/UI_EquipIcon_Pole_Muguet.png" },
  "kinich":          { name: "Fang of the Mountain King",        icon: "/images/weapons/UI_EquipIcon_Claymore_GoldenVerdict.png" },
  "qiqi":            { name: "Skyward Blade",                    icon: "/images/weapons/UI_EquipIcon_Sword_Dvalin.png",   name2: "Aquila Favonia", icon2: "/images/weapons/UI_EquipIcon_Sword_Falcon.png" },
  "ganyu":           { name: "Amos' Bow",                        icon: "/images/weapons/UI_EquipIcon_Bow_Amos.png" },
  "eula":            { name: "Song of Broken Pines",             icon: "/images/weapons/UI_EquipIcon_Claymore_RadianceSword.png" },
  "kamisato ayaka":  { name: "Mistsplitter Reforged",            icon: "/images/weapons/UI_EquipIcon_Sword_Narukami.png" },
  "shenhe":          { name: "Calamity Queller",                 icon: "/images/weapons/UI_EquipIcon_Pole_Santika.png" },
  "wriothesley":     { name: "Cashflow Supervision",             icon: "/images/weapons/UI_EquipIcon_Catalyst_Wheatley.png" },
  "aloy":            { name: "Predator",                         icon: "/images/weapons/UI_EquipIcon_Bow_Predator.png" },
  "zhongli":         { name: "Vortex Vanquisher",                icon: "/images/weapons/UI_EquipIcon_Pole_Morax.png" },
  "arataki itto":    { name: "Redhorn Stonethresher",            icon: "/images/weapons/UI_EquipIcon_Claymore_Itadorimaru.png" },
  "navia":           { name: "Verdict",                          icon: "/images/weapons/UI_EquipIcon_Claymore_Champion.png" },
  "chiori":          { name: "Uraku Misugiri",                   icon: "/images/weapons/UI_EquipIcon_Sword_Mitsurugi.png" },
  "xilonen":         { name: "Peak Patrol Song",                 icon: "/images/weapons/UI_EquipIcon_Sword_XochitlsTube.png" },
  "mavuika":         { name: "A Thousand Blazing Suns",          icon: "/images/weapons/UI_EquipIcon_Claymore_RadianceSword.png" },
  "columbina":       { name: "Nocturne's Curtain Call",          icon: "/images/weapons/UI_EquipIcon_Catalyst_Brisingamen.png" },
  "mualani":         { name: "Surf's Up",                        icon: "/images/weapons/UI_EquipIcon_Catalyst_MechaPufferfish.png" },
};

function getSignatureWeapon(nameEn: string) {
  const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
  const key = clean(nameEn);
  for (const [k, v] of Object.entries(SIGNATURE_WEAPONS)) {
    if (clean(k) === key) return v;
  }
  return null;
}

function WeaponBadge({ name, icon, label }: { name: string; icon: string; label: string }) {
  return (
    <div className="flex items-center gap-3 bg-[#06060a]/70 border border-white/[0.06] p-2.5 rounded-xl hover:border-amber-500/20 transition-all duration-300 group/w">
      <div className="w-10 h-10 shrink-0 bg-gradient-to-br from-[#ffe082] via-[#ffb300] to-[#e65100] p-[1px] rounded-lg shadow-[0_2px_12px_rgba(230,81,0,0.2)] overflow-hidden">
        <div className="w-full h-full bg-[#0d0d14]/90 rounded-lg p-0.5">
          <Image src={icon} alt={name} width={36} height={36} className="w-full h-full object-contain" />
        </div>
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-white/85 font-bold text-sm leading-tight truncate">{name}</span>
        <span className="text-amber-400/60 text-[9px] font-black uppercase tracking-widest mt-0.5">{label}</span>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
      <span className="text-white/30 text-[10px] font-black uppercase tracking-wider">{label}</span>
      <span className="text-white/75 font-bold text-xs font-display">{value}</span>
    </div>
  );
}

export default function CharacterSidebar({ character }: { character: CharacterData }) {
  const locale   = useLocale();
  const name     = locale === 'en' ? character.nameEn : character.nameVi;
  const is5Star  = character.rarity === 5;
  const sig      = getSignatureWeapon(character.nameEn);
  const elColor  = ELEMENT_COLOR[character.element] ?? '#ffffff';

  const borderColor = is5Star ? 'border-amber-500/20' : 'border-purple-500/20';

  return (
    <div className="flex flex-col gap-3">

      {/* ── Info Panel (replaces portrait on sidebar) ── */}
      <div className={`relative bg-[#0d0d14]/80 border ${borderColor} rounded-2xl overflow-hidden`}
        style={{ boxShadow: `0 0 40px -12px ${elColor}25` }}>
        
        {/* Top element accent bar */}
        <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${elColor}80, transparent)` }} />
        
        {/* Character info rows */}
        <div className="p-4">
          <div className="flex flex-col">
            <InfoRow label="Element"  value={character.element} />
            <InfoRow label="Weapon"   value={character.weapon || '—'} />
            <InfoRow label="Region"   value={character.region || '—'} />
            <InfoRow label="Birthday" value={character.birthday || '—'} />
            <InfoRow label="Rarity"   value={is5Star ? '★★★★★' : '★★★★'} />
          </div>
        </div>
      </div>

      {/* ── Signature Weapon ── */}
      {is5Star && sig && (
        <div className="bg-[#0d0d14]/80 border border-amber-500/10 p-4 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.05] rounded-full blur-3xl pointer-events-none" />
          <span className="text-amber-400/70 text-[9px] font-black uppercase tracking-[0.2em] mb-2.5 block">Signature Weapon</span>
          <div className="flex flex-col gap-2">
            <WeaponBadge name={sig.name} icon={sig.icon} label="★★★★★ Signature" />
            {sig.name2 && sig.icon2 && (
              <WeaponBadge name={sig.name2} icon={sig.icon2} label="★★★★★ Alt. Signature" />
            )}
          </div>
        </div>
      )}

      {/* ── Fandom link ── */}
      {character.fandomUrl && (
        <a
          href={character.fandomUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors py-2.5 border border-white/[0.04] hover:border-white/[0.1] rounded-xl bg-[#0d0d14]/60"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
          View on Fandom Wiki
        </a>
      )}
    </div>
  );
}
