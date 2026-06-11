import Image from 'next/image';
import { CharacterData } from '@/types/character';
import { useLocale } from 'next-intl';

const getElementColorClass = (element: string) => {
  const el = element.toLowerCase();
  if (el === 'pyro') return 'text-red-500';
  if (el === 'hydro') return 'text-blue-400';
  if (el === 'anemo') return 'text-teal-400';
  if (el === 'electro') return 'text-purple-400';
  if (el === 'dendro') return 'text-green-400';
  if (el === 'cryo') return 'text-cyan-400';
  if (el === 'geo') return 'text-amber-500';
  return 'text-white';
};

const SIGNATURE_WEAPONS: Record<string, { name: string; icon: string; name2?: string; icon2?: string }> = {
  "hu tao": { name: "Staff of Homa", icon: "/images/weapons/UI_EquipIcon_Pole_Homa.png" },
  "diluc": { name: "Wolf's Gravestone", icon: "/images/weapons/UI_EquipIcon_Claymore_Wolfmound.png" },
  "klee": { name: "Lost Prayer to the Sacred Winds", icon: "/images/weapons/UI_EquipIcon_Catalyst_Fourwinds.png" },
  "yoimiya": { name: "Thundering Pulse", icon: "/images/weapons/UI_EquipIcon_Bow_Narukami.png" },
  "dehya": { name: "Beacon of the Reed Sea", icon: "/images/weapons/UI_EquipIcon_Claymore_Deshret.png" },
  "lyney": { name: "The First Great Magic", icon: "/images/weapons/UI_EquipIcon_Bow_Pledge.png" },
  "arlecchino": { name: "Crimson Moon's Semblance", icon: "/images/weapons/UI_EquipIcon_Pole_BloodMoon.png" },
  "tartaglia": { 
    name: "Polar Star", icon: "/images/weapons/UI_EquipIcon_Bow_Worldbane.png", 
    name2: "Skyward Harp", icon2: "/images/weapons/UI_EquipIcon_Bow_Dvalin.png" 
  },
  "mona": { 
    name: "Skyward Atlas", icon: "/images/weapons/UI_EquipIcon_Catalyst_Dvalin.png", 
    name2: "Lost Prayer to the Sacred Winds", icon2: "/images/weapons/UI_EquipIcon_Catalyst_Fourwinds.png" 
  },
  "kamisato ayato": { name: "Haran Geppaku Futsu", icon: "/images/weapons/UI_EquipIcon_Sword_Narukami.png" },
  "yelan": { name: "Aqua Simulacra", icon: "/images/weapons/UI_EquipIcon_Bow_Kirin.png" },
  "sangonomiya kokomi": { name: "Everlasting Moonglow", icon: "/images/weapons/UI_EquipIcon_Catalyst_FairyGarden.png" },
  "nilou": { name: "Key of Khaj-Nisut", icon: "/images/weapons/UI_EquipIcon_Sword_Deshret.png" },
  "neuvillette": { name: "Tome of the Eternal Flow", icon: "/images/weapons/UI_EquipIcon_Catalyst_Iudex.png" },
  "furina": { name: "Splendor of Tranquil Waters", icon: "/images/weapons/UI_EquipIcon_Sword_Regalis.png" },
  "sigewinne": { name: "Silvershower Heartstring", icon: "/images/weapons/UI_EquipIcon_Bow_Arcdange.png" },
  "venti": { 
    name: "Elegy for the End", icon: "/images/weapons/UI_EquipIcon_Bow_Widsith.png", 
    name2: "Skyward Harp", icon2: "/images/weapons/UI_EquipIcon_Bow_Dvalin.png" 
  },
  "jean": { name: "Aquila Favonia", icon: "/images/weapons/UI_EquipIcon_Sword_Falcon.png" },
  "xiao": { name: "Primordial Jade Winged-Spear", icon: "/images/weapons/UI_EquipIcon_Pole_Gladiator.png" },
  "kaedehara kazuha": { name: "Freedom-Sworn", icon: "/images/weapons/UI_EquipIcon_Sword_Widsith.png" },
  "wanderer": { name: "Tulaytullah's Remembrance", icon: "/images/weapons/UI_EquipIcon_Catalyst_Alaya.png" },
  "xianyun": { name: "Crane's Echoing Call", icon: "/images/weapons/UI_EquipIcon_Catalyst_MountainGale.png" },
  "chasca": { name: "Astral Vulture's Crimson Plumage", icon: "/images/weapons/UI_EquipIcon_Bow_Qoyllorsnova.png" },
  "keqing": { name: "Primordial Jade Cutter", icon: "/images/weapons/UI_EquipIcon_Sword_Morax.png" },
  "raiden shogun": { name: "Engulfing Lightning", icon: "/images/weapons/UI_EquipIcon_Pole_Shanty.png" },
  "yae miko": { name: "Kagura's Verity", icon: "/images/weapons/UI_EquipIcon_Catalyst_SakuraFan.png" },
  "cyno": { name: "Staff of the Scarlet Sands", icon: "/images/weapons/UI_EquipIcon_Pole_Deshret.png" },
  "clorinde": { name: "Absolution", icon: "/images/weapons/UI_EquipIcon_Sword_Pleroma.png" },
  "tighnari": { name: "Hunter's Path", icon: "/images/weapons/UI_EquipIcon_Bow_Ayus.png" },
  "nahida": { name: "A Thousand Floating Dreams", icon: "/images/weapons/UI_EquipIcon_Catalyst_Ayus.png" },
  "alhaitham": { name: "Light of Foliar Incision", icon: "/images/weapons/UI_EquipIcon_Sword_Ayus.png" },
  "baizhu": { name: "Jadefall's Splendor", icon: "/images/weapons/UI_EquipIcon_Catalyst_Morax.png" },
  "emilie": { name: "Lumidouce Elegy", icon: "/images/weapons/UI_EquipIcon_Pole_Muguet.png" },
  "kinich": { name: "Fang of the Mountain King", icon: "/images/weapons/UI_EquipIcon_Claymore_GoldenVerdict.png" },
  "qiqi": { 
    name: "Skyward Blade", icon: "/images/weapons/UI_EquipIcon_Sword_Dvalin.png", 
    name2: "Aquila Favonia", icon2: "/images/weapons/UI_EquipIcon_Sword_Falcon.png" 
  },
  "ganyu": { name: "Amos' Bow", icon: "/images/weapons/UI_EquipIcon_Bow_Amos.png" },
  "eula": { name: "Song of Broken Pines", icon: "/images/weapons/UI_EquipIcon_Claymore_RadianceSword.png" },
  "kamisato ayaka": { name: "Mistsplitter Reforged", icon: "/images/weapons/UI_EquipIcon_Sword_Narukami.png" },
  "shenhe": { name: "Calamity Queller", icon: "/images/weapons/UI_EquipIcon_Pole_Santika.png" },
  "wriothesley": { name: "Cashflow Supervision", icon: "/images/weapons/UI_EquipIcon_Catalyst_Wheatley.png" },
  "aloy": { name: "Predator", icon: "/images/weapons/UI_EquipIcon_Bow_Predator.png" },
  "zhongli": { name: "Vortex Vanquisher", icon: "/images/weapons/UI_EquipIcon_Pole_Morax.png" },
  "albedo": { 
    name: "Summit Shaper", icon: "/images/weapons/UI_EquipIcon_Sword_Morax.png", 
    name2: "Primordial Jade Cutter", icon2: "/images/weapons/UI_EquipIcon_Sword_Morax.png" 
  },
  "arataki itto": { name: "Redhorn Stonethresher", icon: "/images/weapons/UI_EquipIcon_Claymore_Itadorimaru.png" },
  "navia": { name: "Verdict", icon: "/images/weapons/UI_EquipIcon_Claymore_Champion.png" },
  "chiori": { name: "Uraku Misugiri", icon: "/images/weapons/UI_EquipIcon_Sword_Mitsurugi.png" },
  "xilonen": { name: "Peak Patrol Song", icon: "/images/weapons/UI_EquipIcon_Sword_XochitlsTube.png" },
  "mavuika": { name: "A Thousand Blazing Suns", icon: "/images/weapons/UI_EquipIcon_Claymore_RadianceSword.png" },
  "durin": { name: "Athame Artis", icon: "/images/weapons/UI_EquipIcon_Sword_Motsognir.png" },
  "nicole": { name: "Trần Quang Thất Dụ", icon: "/images/weapons/UI_EquipIcon_Catalyst_FairyGarden.png" }
};

function getSignatureWeapon(characterName: string) {
  const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const dbClean = clean(characterName);
  for (const [key, val] of Object.entries(SIGNATURE_WEAPONS)) {
    if (clean(key) === dbClean) {
      return val;
    }
  }
  return null;
}

export default function CharacterSidebar({ character }: { character: CharacterData }) {
  const locale = useLocale();
  const name = locale === 'en' ? character.nameEn : character.nameVi;
  const title = locale === 'en' ? character.titleEn : character.titleVi;
  const is5Star = character.rarity === 5;
  const signatureWeapon = getSignatureWeapon(character.nameEn);
  const borderTheme = is5Star ? 'border-amber-500/20' : 'border-purple-500/20';
  const gradientTheme = is5Star ? 'from-amber-900/10' : 'from-purple-900/10';

  return (
    <div className="flex flex-col gap-5">
      {/* Character Card Portrait */}
      <div className={`relative w-full aspect-[3/4] rounded-3xl overflow-hidden border ${borderTheme} shadow-2xl group`}>
        {/* Glow backdrop */}
        <div className={`absolute inset-0 bg-gradient-to-tr ${gradientTheme} to-transparent opacity-40 -z-10`}></div>
        
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-102 transition-transform duration-500"
          style={{ backgroundImage: character.splashArtUrl ? `url(${character.splashArtUrl})` : 'none' }}
        />
        
        {/* Dark overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>

        {/* Name tag and details overlay */}
        <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="relative w-5 h-5">
              <Image src={`/elements/${character.element.toLowerCase()}.png`} alt={character.element} fill className="object-contain" />
            </div>
            <span className="text-yellow-500 font-extrabold text-[10px] uppercase tracking-widest">{character.element}</span>
          </div>
          <h1 className={`text-3xl font-black leading-none font-display uppercase tracking-tight drop-shadow-md ${getElementColorClass(character.element)}`}>{name}</h1>
          <p className="text-gray-300 font-bold text-sm leading-tight italic opacity-90 drop-shadow-sm">{title}</p>
          
          <div className="flex text-yellow-400 text-xs mt-2 select-none">
            {Array(character.rarity).fill(0).map((_, i) => <span key={i}>★</span>)}
          </div>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-[#0d0d12]/50 border border-gray-900 p-3 rounded-xl flex flex-col justify-center">
          <span className="text-gray-500 text-[9px] font-black uppercase tracking-wider mb-1">Region</span>
          <span className="text-gray-100 font-bold text-xs truncate leading-normal font-display">{character.region}</span>
        </div>
        <div className="bg-[#0d0d12]/50 border border-gray-900 p-3 rounded-xl flex flex-col justify-center">
          <span className="text-gray-500 text-[9px] font-black uppercase tracking-wider mb-1">Birthday</span>
          <span className="text-gray-100 font-bold text-xs truncate leading-normal font-display">{character.birthday || 'Unknown'}</span>
        </div>
        <div className="bg-[#0d0d12]/50 border border-gray-900 p-3 rounded-xl flex flex-col justify-center">
          <span className="text-gray-500 text-[9px] font-black uppercase tracking-wider mb-1">Weapon</span>
          <span className="text-gray-100 font-bold text-xs truncate leading-normal font-display">{character.weapon}</span>
        </div>
      </div>

      {/* Signature Weapons Panel */}
      {is5Star && signatureWeapon && (
        <div className="bg-[#0d0d12]/50 border border-amber-500/10 p-5 rounded-2xl flex flex-col gap-3.5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
          <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest font-display">Signature Weapon</span>
          
          <div className="flex items-center gap-4 bg-[#050508]/85 border border-gray-900 p-3 rounded-xl hover:border-amber-500/20 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FFE082] via-[#FFB300] to-[#E65100] p-[1px] rounded-lg shrink-0 overflow-hidden shadow-[0_2px_10px_rgba(230,81,0,0.25)] flex items-center justify-center">
              <div className="w-full h-full bg-[#07070a]/90 rounded-lg overflow-hidden p-0.5">
                <Image 
                  src={signatureWeapon.icon} 
                  alt={signatureWeapon.name} 
                  width={46} 
                  height={46} 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-white font-extrabold text-sm leading-tight truncate font-display">{signatureWeapon.name}</span>
              <span className="text-amber-500 text-[9px] font-black uppercase tracking-wider mt-1">★★★★★ Signature</span>
            </div>
          </div>

          {signatureWeapon.name2 && signatureWeapon.icon2 && (
            <div className="flex items-center gap-4 bg-[#050508]/85 border border-gray-900 p-3 rounded-xl hover:border-amber-500/20 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FFE082] via-[#FFB300] to-[#E65100] p-[1px] rounded-lg shrink-0 overflow-hidden shadow-[0_2px_10px_rgba(230,81,0,0.25)] flex items-center justify-center">
                <div className="w-full h-full bg-[#07070a]/90 rounded-lg overflow-hidden p-0.5">
                  <Image 
                    src={signatureWeapon.icon2} 
                    alt={signatureWeapon.name2} 
                    width={46} 
                    height={46} 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white font-extrabold text-sm leading-tight truncate font-display">{signatureWeapon.name2}</span>
                <span className="text-amber-500/95 text-[9px] font-black uppercase tracking-wider mt-1">★★★★★ Alt. Signature</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
