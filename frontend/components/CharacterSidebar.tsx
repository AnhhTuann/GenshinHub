import Image from 'next/image';
import { CharacterData } from '@/types/character';

const SIGNATURE_WEAPONS: Record<string, { name: string; icon: string; name2?: string; icon2?: string }> = {
  "hu tao": { name: "Trượng Hộ Ma", icon: "/images/weapons/UI_EquipIcon_Pole_Homa.png" },
  "diluc": { name: "Đường Cùng Của Sói", icon: "/images/weapons/UI_EquipIcon_Claymore_Wolfmound.png" },
  "klee": { name: "Tứ Phong Nguyên Điển", icon: "/images/weapons/UI_EquipIcon_Catalyst_Fourwinds.png" },
  "yoimiya": { name: "Sấm Sét Rung Động", icon: "/images/weapons/UI_EquipIcon_Bow_Narukami.png" },
  "dehya": { name: "Hải Đăng Bờ Biển Lau", icon: "/images/weapons/UI_EquipIcon_Claymore_Deshret.png" },
  "lyney": { name: "Màn Ảo Thuật Đầu Tiên", icon: "/images/weapons/UI_EquipIcon_Bow_Pledge.png" },
  "arlecchino": { name: "Hình Thái Xích Nguyệt", icon: "/images/weapons/UI_EquipIcon_Pole_BloodMoon.png" },
  "tartaglia": { 
    name: "Ngôi Sao Cực Đông", icon: "/images/weapons/UI_EquipIcon_Bow_Worldbane.png", 
    name2: "Cánh Thiên Không", icon2: "/images/weapons/UI_EquipIcon_Bow_Dvalin.png" 
  },
  "mona": { 
    name: "Quyển Thiên Không", icon: "/images/weapons/UI_EquipIcon_Catalyst_Dvalin.png", 
    name2: "Tứ Phong Nguyên Điển", icon2: "/images/weapons/UI_EquipIcon_Catalyst_Fourwinds.png" 
  },
  "kamisato ayato": { name: "Haran Geppaku Futsu", icon: "/images/weapons/UI_EquipIcon_Sword_Narukami.png" },
  "yelan": { name: "Nhược Thủy", icon: "/images/weapons/UI_EquipIcon_Bow_Kirin.png" },
  "sangonomiya kokomi": { name: "Vầng Trăng Bất Diệt", icon: "/images/weapons/UI_EquipIcon_Catalyst_FairyGarden.png" },
  "nilou": { name: "Chìa Khóa Khaj-Nisut", icon: "/images/weapons/UI_EquipIcon_Sword_Deshret.png" },
  "neuvillette": { name: "Nghi Thức Dòng Chảy Vĩnh Hằng", icon: "/images/weapons/UI_EquipIcon_Catalyst_Iudex.png" },
  "furina": { name: "Sắc Nước Lộng Lẫy", icon: "/images/weapons/UI_EquipIcon_Sword_Magnum.png" },
  "sigewinne": { name: "Màn Mưa Tơ Lòng", icon: "/images/weapons/UI_EquipIcon_Bow_Arcdange.png" },
  "venti": { 
    name: "Tiếng Thở Dài Vô Tận", icon: "/images/weapons/UI_EquipIcon_Bow_Widsith.png", 
    name2: "Cánh Thiên Không", icon2: "/images/weapons/UI_EquipIcon_Bow_Dvalin.png" 
  },
  "jean": { name: "Phong Ưng Kiếm", icon: "/images/weapons/UI_EquipIcon_Sword_Falcon.png" },
  "xiao": { name: "Hòa Phác Diên", icon: "/images/weapons/UI_EquipIcon_Pole_Gladiator.png" },
  "kaedehara kazuha": { name: "Lời Thề Tự Do Cổ Xưa", icon: "/images/weapons/UI_EquipIcon_Sword_Widsith.png" },
  "wanderer": { name: "Hồi Ức Tulaytullah", icon: "/images/weapons/UI_EquipIcon_Catalyst_Alaya.png" },
  "xianyun": { name: "Dư Âm Tiếng Hạc", icon: "/images/weapons/UI_EquipIcon_Catalyst_MountainGale.png" },
  "chasca": { name: "Xích Vũ Tinh Tựu", icon: "/images/weapons/UI_EquipIcon_Bow_Qoyllorsnova.png" },
  "keqing": { name: "Bàn Nham Kết Lục", icon: "/images/weapons/UI_EquipIcon_Sword_Morax.png" },
  "raiden shogun": { name: "Đoạn Thảo Trường Đao", icon: "/images/weapons/UI_EquipIcon_Pole_Shanty.png" },
  "yae miko": { name: "Chân Ý Của Kagura", icon: "/images/weapons/UI_EquipIcon_Catalyst_SakuraFan.png" },
  "cyno": { name: "Quyền Trượng Cát Đỏ", icon: "/images/weapons/UI_EquipIcon_Pole_Deshret.png" },
  "clorinde": { name: "Xá Tội", icon: "/images/weapons/UI_EquipIcon_Sword_Pleroma.png" },
  "tighnari": { name: "Con Đường Thợ Săn", icon: "/images/weapons/UI_EquipIcon_Bow_Ayus.png" },
  "nahida": { name: "Cõi Mộng Ngàn Đêm", icon: "/images/weapons/UI_EquipIcon_Catalyst_Ayus.png" },
  "alhaitham": { name: "Ánh Lá Phán Quyết", icon: "/images/weapons/UI_EquipIcon_Sword_Ayus.png" },
  "baizhu": { name: "Ngọc Bích Huy Hoàng", icon: "/images/weapons/UI_EquipIcon_Catalyst_Morax.png" },
  "emilie": { name: "Bi Ca Lumidouce", icon: "/images/weapons/UI_EquipIcon_Pole_Muguet.png" },
  "kinich": { name: "Nanh Sơn Vương", icon: "/images/weapons/UI_EquipIcon_Claymore_GoldenVerdict.png" },
  "qiqi": { 
    name: "Kiếm Thiên Không", icon: "/images/weapons/UI_EquipIcon_Sword_Dvalin.png", 
    name2: "Phong Ưng Kiếm", icon2: "/images/weapons/UI_EquipIcon_Sword_Falcon.png" 
  },
  "ganyu": { name: "Cung Amos", icon: "/images/weapons/UI_EquipIcon_Bow_Amos.png" },
  "eula": { name: "Tiếng Gió Trong Rừng Thông", icon: "/images/weapons/UI_EquipIcon_Claymore_RadianceSword.png" },
  "kamisato ayaka": { name: "Ánh Sáng Đêm Sương Mù", icon: "/images/weapons/UI_EquipIcon_Sword_Narukami.png" },
  "shenhe": { name: "Hủy Diệt (Tức Tai)", icon: "/images/weapons/UI_EquipIcon_Pole_Santika.png" },
  "wriothesley": { name: "Quản Đốc Vàng Ròng", icon: "/images/weapons/UI_EquipIcon_Catalyst_Wheatley.png" },
  "aloy": { name: "Predator", icon: "/images/weapons/UI_EquipIcon_Bow_Predator.png" },
  "zhongli": { name: "Giáo Nham (Vortex Vanquisher)", icon: "/images/weapons/UI_EquipIcon_Pole_Morax.png" },
  "albedo": { 
    name: "Kiếm Chước Phong", icon: "/images/weapons/UI_EquipIcon_Sword_Morax.png", 
    name2: "Bàn Nham Kết Lục", icon2: "/images/weapons/UI_EquipIcon_Sword_Morax.png" 
  },
  "arataki itto": { name: "Xích Giác Phá Thạch Đao", icon: "/images/weapons/UI_EquipIcon_Claymore_Itadorimaru.png" },
  "navia": { name: "Phán Quyết", icon: "/images/weapons/UI_EquipIcon_Claymore_Champion.png" },
  "chiori": { name: "Uraku Misugiri", icon: "/images/weapons/UI_EquipIcon_Sword_Mitsurugi.png" },
  "xilonen": { name: "Khúc Ca Núi Đá", icon: "/images/weapons/UI_EquipIcon_Sword_XochitlsTube.png" }
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
  const is5Star = character.rarity === 5;
  const signatureWeapon = getSignatureWeapon(character.name);
  const borderTheme = is5Star ? 'border-yellow-500/50' : 'border-purple-500/50';
  const gradientTheme = is5Star ? 'from-yellow-900/40' : 'from-purple-900/40';

  return (
    <div className="flex flex-col gap-4">
      <div className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden border ${borderTheme} shadow-2xl`}>
        
        <div className={`absolute inset-0 bg-gradient-to-tr ${gradientTheme} to-transparent opacity-50`}></div>
        
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: character.splashArtUrl ? `url(${character.splashArtUrl})` : 'none' }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Image src={`/elements/${character.element.toLowerCase()}.png`} alt={character.element} width={20} height={20} className="w-5 h-5 drop-shadow-md" />
            <span className="text-yellow-500 font-bold text-xs uppercase tracking-widest">{character.element}</span>
          </div>
          <h1 className="text-4xl font-black text-white mt-1 drop-shadow-lg">{character.name}</h1>
          <p className="text-gray-300 font-medium text-lg drop-shadow-md">{character.title}</p>
          
          <div className="flex text-yellow-400 text-sm mt-3">
            {Array(character.rarity).fill(0).map((_, i) => <span key={i}>★</span>)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-3">
        <div className="bg-[#15151a] border border-gray-800/60 p-3 rounded-xl flex flex-col">
          <span className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">Region</span>
          <span className="text-gray-100 font-semibold text-sm md:text-base truncate">{character.region}</span>
        </div>
        <div className="bg-[#15151a] border border-gray-800/60 p-3 rounded-xl flex flex-col">
          <span className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">Birthday</span>
          <span className="text-gray-100 font-semibold text-sm md:text-base truncate">{character.birthday || "Chưa rõ"}</span>
        </div>
        <div className="bg-[#15151a] border border-gray-800/60 p-3 rounded-xl flex flex-col">
          <span className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">Weapon</span>
          <span className="text-gray-100 font-semibold text-sm md:text-base truncate">{character.weapon}</span>
        </div>
      </div>

      {is5Star && signatureWeapon && (
        <div className="bg-[#15151a] border border-yellow-600/20 p-4 rounded-xl flex flex-col gap-3 shadow-lg">
          <span className="text-yellow-500 text-xs font-black uppercase tracking-widest">Vũ Khí Trấn Phái</span>
          
          <div className="flex items-center gap-4 bg-[#0b0b0e]/60 border border-gray-800/40 p-2.5 rounded-lg">
            <div className="w-14 h-14 bg-gradient-to-br from-[#FFE082] via-[#FFB300] to-[#E65100] p-[1px] rounded-lg shrink-0 overflow-hidden shadow-[0_2px_8px_rgba(230,81,0,0.3)]">
              <Image 
                src={signatureWeapon.icon} 
                alt={signatureWeapon.name} 
                width={56} 
                height={56} 
                className="w-full h-full object-cover bg-black/20"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-gray-100 font-bold text-sm leading-tight truncate">{signatureWeapon.name}</span>
              <span className="text-yellow-500/95 text-[10px] font-black uppercase tracking-widest mt-1">★★★★★ Trấn Phái</span>
            </div>
          </div>

          {signatureWeapon.name2 && signatureWeapon.icon2 && (
            <div className="flex items-center gap-4 bg-[#0b0b0e]/60 border border-gray-800/40 p-2.5 rounded-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-[#FFE082] via-[#FFB300] to-[#E65100] p-[1px] rounded-lg shrink-0 overflow-hidden shadow-[0_2px_8px_rgba(230,81,0,0.3)]">
                <Image 
                  src={signatureWeapon.icon2} 
                  alt={signatureWeapon.name2} 
                  width={56} 
                  height={56} 
                  className="w-full h-full object-cover bg-black/20"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-gray-100 font-bold text-sm leading-tight truncate">{signatureWeapon.name2}</span>
                <span className="text-yellow-500/95 text-[10px] font-black uppercase tracking-widest mt-1">★★★★★ Trấn Phối Hợp</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
