import Image from 'next/image';
import { WeaponBuild } from '@/types/character';

export default function WeaponCard({ weapon, index }: { weapon: WeaponBuild; index: number }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 p-3 rounded-xl border border-gray-700/50 bg-[#111115]/80">
        <div className="w-6 h-6 shrink-0 flex items-center justify-center rounded-full bg-[#1c2333] border border-[#26314a] text-[#7192d6] text-xs font-bold ml-1">
          {index + 1}
        </div>
        
        {weapon.iconUrl ? (
          <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-[#d9b28a] to-[#a37955] p-[1px]">
            <Image 
              src={weapon.iconUrl} 
              alt={weapon.name} 
              width={48} 
              height={48} 
              className="w-full h-full object-cover bg-black/20 rounded-md" 
            />
          </div>
        ) : (
          <div className="w-12 h-12 shrink-0 rounded-lg bg-gray-800 flex items-center justify-center text-xs text-gray-500">Img</div>
        )}
        
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-100 text-base">{weapon.name}</span>
            {weapon.refinement && weapon.refinement > 1 && (
              <span className="bg-[#1c2333] text-[#7192d6] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#26314a]">
                R{weapon.refinement}
              </span>
            )}
            {weapon.isF2P && (
              <span className="bg-green-900/30 text-green-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-green-800/50">
                F2P
              </span>
            )}
          </div>
          <span className="text-gray-400 text-xs mt-0.5">{weapon.subStat || 'Unknown Stat'}</span>
        </div>
      </div>
      
      {weapon.passiveDesc && (
        <p className="text-gray-400 text-sm mt-3 px-1 leading-relaxed">
          {weapon.passiveDesc.split(/(CRIT Rate|CRIT DMG|ATK%|Độ Tăng Tỷ Lệ Phá Tính|Tỷ Lệ Bạo Kích|ST Bạo Kích|Hiệu Quả Nạp Nguyên Tố|Tấn Công%|DMG chí)/g).map((part, i) => 
            /CRIT Rate|CRIT DMG|ATK%|Độ Tăng Tỷ Lệ Phá Tính|Tỷ Lệ Bạo Kích|ST Bạo Kích|Hiệu Quả Nạp Nguyên Tố|Tấn Công%|DMG chí/.test(part) ? (
              <span key={i} className="text-orange-400">{part}</span>
            ) : part
          )}
        </p>
      )}
    </div>
  );
}
