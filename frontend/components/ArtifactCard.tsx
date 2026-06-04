import Image from 'next/image';
import { ArtifactBuild } from '@/types/character';

function getMixedSets(setName: string) {
  const lower = setName.toLowerCase();
  if (lower.includes("sát thương hỏa") || lower.includes("hỏa")) {
    return [
      {
        name: "Diệm Liệt Ma Nữ Cháy Rực",
        desc: "Tăng 15% Sát Thương Nguyên Tố Hỏa",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15006_4.png"
      },
      {
        name: "Bộ Tinh Thông Nguyên Tố +80",
        desc: "Đoàn Hát Lang Thang / Giấc Mộng Hoàng Kim / ...",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15026_4.png"
      },
      {
        name: "Bộ HP +20%",
        desc: "Thiên Nham Vững Chắc / Vầng Sáng Vạn Hữu / ...",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15017_4.png"
      }
    ];
  }
  if (lower.includes("ma nữ") && lower.includes("tinh thông") && lower.includes("tấn công")) {
    return [
      {
        name: "Diệm Liệt Ma Nữ Cháy Rực (2 món)",
        desc: "Tăng 15% Sát Thương Nguyên Tố Hỏa",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15006_4.png"
      },
      {
        name: "Bộ Tinh Thông Nguyên Tố +80 (2 món)",
        desc: "Đoàn Hát Lang Thang / Giấc Mộng Hoàng Kim / ...",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15026_4.png"
      },
      {
        name: "Bộ Tăng Tấn Công +18% (2 món)",
        desc: "Lễ Bế Mạc Của Giác Đấu Sĩ / Dòng Hồi Ức Bất Tận / ...",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15001_4.png"
      }
    ];
  }

  if (lower.includes("tấn công") && lower.includes("ma nữ") && lower.includes("thợ săn")) {
    return [
      {
        name: "Bộ Tăng Tấn Công +18% (2 món)",
        desc: "Lễ Bế Mạc Của Giác Đấu Sĩ / Dòng Hồi Ức Bất Tận / ...",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15001_4.png"
      },
      {
        name: "Diệm Liệt Ma Nữ Cháy Rực (2 món)",
        desc: "Tăng 15% Sát Thương Nguyên Tố Hỏa",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15006_4.png"
      },
      {
        name: "Thợ Săn Marechaussee (2 món)",
        desc: "Tăng 15% sát thương Đánh Thường & Trọng Kích",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15031_4.png"
      }
    ];
  }

  if (lower.includes("ma nữ") && lower.includes("tông thất") && lower.includes("dấu ấn")) {
    return [
      {
        name: "Diệm Liệt Ma Nữ Cháy Rực (2 món)",
        desc: "Tăng 15% Sát Thương Nguyên Tố Hỏa",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15006_4.png"
      },
      {
        name: "Nghi Thức Tông Thất Cổ (2 món)",
        desc: "Tăng 20% Sát Thương Kỹ Năng Nộ",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15007_4.png"
      },
      {
        name: "Bộ Tăng Tấn Công +18% (2 món)",
        desc: "Lễ Bế Mạc Của Giác Đấu Sĩ / Dòng Hồi Ức Bất Tận / ...",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15001_4.png"
      },
      {
        name: "Bộ Tinh Thông Nguyên Tố +80 (2 món)",
        desc: "Đoàn Hát Lang Thang / Giấc Mộng Hoàng Kim / ...",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15026_4.png"
      },
      {
        name: "Dấu Ấn Ngăn Cách (2 món)",
        desc: "Tăng 20% Hiệu Quả Nạp Nguyên Tố",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15020_4.png"
      }
    ];
  }

  if (lower.includes("dấu ấn") && (lower.includes("hp") || lower.includes("thủy") || lower.includes("tông thất") || lower.includes("thập"))) {
    return [
      {
        name: "Dấu Ấn Ngăn Cách (2 món)",
        desc: "Tăng 20% Hiệu Quả Nạp Nguyên Tố",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15020_4.png"
      },
      {
        name: "Bộ HP (2 món)",
        desc: "Thiên Nham Vững Chắc / Vầng Sáng Vourukasha (+20% HP)",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15017_4.png"
      },
      {
        name: "Bộ Thủy (2 món)",
        desc: "Trái Tim Trầm Luân / Giấc Mộng Thủy Tiên (+15% Sát Thương Thủy)",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15016_4.png"
      },
      {
        name: "Nghi Thức Tông Thất Cổ (2 món)",
        desc: "Tăng 20% Sát Thương Kỹ Năng Nộ",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15007_4.png"
      }
    ];
  }

  if (lower.includes("lôi") || lower.includes("tông thất") || lower.includes("dấu ấn")) {
    return [
      {
        name: "Nghi Thức Tông Thất Cổ",
        desc: "Tăng 20% Sát Thương Kỹ Năng Nộ",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15007_4.png"
      },
      {
        name: "Như Sấm Thịnh Nộ",
        desc: "Tăng 15% Sát Thương Nguyên Tố Lôi",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15005_4.png"
      },
      {
        name: "Bộ Tăng Tấn Công +18%",
        desc: "Giác Đấu Sĩ / Dòng Hồi Ức Bất Tận / ...",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15001_4.png"
      },
      {
        name: "Dấu Ấn Ngăn Cách",
        desc: "Tăng 20% Hiệu Quả Nạp Nguyên Tố",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15020_4.png"
      }
    ];
  }

  if (lower.includes("vourukasha") || lower.includes("thiên nham")) {
    return [
      {
        name: "Vầng Sáng Vourukasha",
        desc: "Tăng 20% HP tối đa",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15030_4.png"
      },
      {
        name: "Thiên Nham Vững Chắc",
        desc: "Tăng 20% HP tối đa",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15017_4.png"
      }
    ];
  }

  if (lower.includes("tinh thông") && lower.includes("ký ức")) {
    return [
      {
        name: "Bộ Tinh Thông Nguyên Tố +80",
        desc: "Đoàn Hát Lang Thang / Giấc Mộng Hoàng Kim / ...",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15026_4.png"
      },
      {
        name: "Ký Ức Rừng Sâu",
        desc: "Tăng 15% Sát Thương Nguyên Tố Thảo",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15025_4.png"
      }
    ];
  }

  if (lower.includes("thủy") && (lower.includes("hp") || lower.includes("thợ săn") || lower.includes("săn"))) {
    return [
      {
        name: "Bộ Thủy (2 món)",
        desc: "Trái Tim Trầm Luân / Giấc Mộng Thủy Tiên (+15% Sát Thương Thủy)",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15016_4.png"
      },
      {
        name: "Bộ HP (2 món)",
        desc: "Thiên Nham Vững Chắc / Vầng Sáng Vourukasha (+20% HP)",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15017_4.png"
      },
      {
        name: "Thợ Săn Marechaussee (2 món)",
        desc: "Tăng 15% sát thương Đánh Thường & Trọng Kích",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15031_4.png"
      }
    ];
  }

  if (lower.includes("đoàn kịch") || (lower.includes("đoàn") && lower.includes("mix"))) {
    return [
      {
        name: "Đoàn Kịch Hoàng Kim (2 món)",
        desc: "Tăng 20% sát thương Kỹ Năng Nguyên Tố",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15032_4.png"
      },
      {
        name: "Bộ Thủy (2 món)",
        desc: "Trái Tim Trầm Luân / Giấc Mộng Thủy Tiên (+15% Sát Thương Thủy)",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15016_4.png"
      },
      {
        name: "Bộ HP (2 món)",
        desc: "Thiên Nham Vững Chắc / Vầng Sáng Vourukasha (+20% HP)",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15017_4.png"
      },
      {
        name: "Dấu Ấn Ngăn Cách (2 món)",
        desc: "Tăng 20% Hiệu Quả Nạp Nguyên Tố",
      }
    ];
  }
  
  if (lower.includes("lửa trắng xám") && (lower.includes("kỵ sĩ") || lower.includes("nhuốm máu"))) {
    return [
      {
        name: "Lửa Trắng Xám (2 món)",
        desc: "Tăng 25% Sát Thương Vật Lý",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15018_4.png"
      },
      {
        name: "Kỵ Sĩ Đạo Nhuốm Máu (2 món)",
        desc: "Tăng 25% Sát Thương Vật Lý",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15008_4.png"
      }
    ];
  }

  if (lower.includes("dấu ấn") && (lower.includes("lửa trắng xám") || lower.includes("kỵ sĩ") || lower.includes("vật lý"))) {
    return [
      {
        name: "Dấu Ấn Ngăn Cách (2 món)",
        desc: "Tăng 20% Hiệu Quả Nạp Nguyên Tố",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15020_4.png"
      },
      {
        name: "Bộ Sát Thương Vật Lý +25% (2 món)",
        desc: "Lửa Trắng Xám / Kỵ Sĩ Đạo Nhuốm Máu",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15018_4.png"
      }
    ];
  }

  if (lower.includes("vật lý") && (lower.includes("tấn công") || lower.includes("tông thất") || lower.includes("giáp") || lower.includes("phù hoa"))) {
    return [
      {
        name: "Bộ Sát Thương Vật Lý +25% (2 món)",
        desc: "Lửa Trắng Xám / Kỵ Sĩ Đạo Nhuốm Máu",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15018_4.png"
      },
      {
        name: "Bộ Tăng Tấn Công +18% (2 món)",
        desc: "Lễ Bế Mạc Của Giác Đấu Sĩ / Dòng Hồi Ức Bất Tận / ...",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15001_4.png"
      },
      {
        name: "Nghi Thức Tông Thất Cổ (2 món)",
        desc: "Tăng 20% Sát Thương Kỹ Năng Nộ",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15007_4.png"
      },
      {
        name: "Giấc Mộng Phù Hoa (2 món)",
        desc: "Tăng 30% Phòng Ngự",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15023_4.png"
      }
    ];
  }

  if (lower.includes("tinh thông") && lower.includes("dấu ấn") && lower.includes("mix")) {
    return [
      {
        name: "Bộ Tinh Thông Nguyên Tố +80 (2 món)",
        desc: "Đoàn Hát Lang Thang / Giấc Mộng Hoàng Kim / ...",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15026_4.png"
      },
      {
        name: "Dấu Ấn Ngăn Cách (2 món)",
        desc: "Tăng 20% Hiệu Quả Nạp Nguyên Tố",
        iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15020_4.png"
      }
    ];
  }
  
  return [
    {
      name: "Bộ Chỉ Số 1 (2 món)",
      desc: "Tăng Tấn Công / Tinh Thông / Sát Thương Nguyên Tố",
      iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15003_4.png"
    },
    {
      name: "Bộ Chỉ Số 2 (2 món)",
      desc: "Tăng Hiệu Quả Nạp / HP / Tấn Công",
      iconUrl: "https://gi.yatta.moe/assets/UI/reliquary/UI_RelicIcon_15020_4.png"
    }
  ];
}

export default function ArtifactCard({ artifact }: { artifact: ArtifactBuild }) {
  const rarity = artifact.rarity || 5;
  const isMixed = artifact.setName.toLowerCase().includes('mix');

  let cardBg = "bg-[#111115]/80 border-purple-700/50";
  let imgBg = "bg-gradient-to-br from-[#a256e8] to-[#6f38a6]"; // 4-star default purple
  let badgeColor = "bg-purple-900/30 text-purple-400 border-purple-800/50";

  if (rarity === 5) {
    cardBg = "bg-[#1c1812]/80 border-amber-600/30";
    imgBg = "bg-gradient-to-br from-[#FFE082] via-[#FFB300] to-[#E65100]";
    badgeColor = "bg-amber-900/30 text-amber-400 border-amber-800/50";
  }

  return (
    <div className={`border rounded-xl p-5 mb-4 transition-all duration-300 ${cardBg}`}>
      <div className="flex items-center gap-4 border-b border-gray-800 pb-4 mb-4">
        {artifact.iconUrl ? (
          <div className={`w-12 h-12 shrink-0 rounded-lg overflow-hidden ${imgBg} p-[1px]`}>
            <Image 
              src={artifact.iconUrl} 
              alt={artifact.setName} 
              width={48} 
              height={48} 
              className="w-full h-full object-cover bg-black/20 rounded-md" 
            />
          </div>
        ) : (
          <div className="w-12 h-12 bg-yellow-900/20 rounded-lg flex items-center justify-center text-yellow-500 text-xl border border-yellow-700/30">✨</div>
        )}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h4 className="font-bold text-gray-100 text-lg">{artifact.setName}</h4>
            <div className="flex text-amber-500 text-xs">
              {"★".repeat(rarity)}
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${badgeColor}`}>
            {artifact.pieces}-Piece Set
          </span>
        </div>
      </div>

      {isMixed && (
        <div className="mb-4 bg-[#0b0b0e]/80 border border-gray-800/80 rounded-xl p-4 flex items-center gap-4">
          {/* Left Label "Choose 2" */}
          <div className="bg-blue-950/40 border border-blue-800/30 text-blue-400 text-xs font-black px-3 py-6 rounded-lg uppercase tracking-wider text-center shrink-0 [writing-mode:vertical-lr]">
            Choose 2
          </div>
          
          {/* Right List of Sets */}
          <div className="flex flex-col gap-3 w-full">
            {getMixedSets(artifact.setName).map((mSet, idx) => (
              <div key={idx} className="flex items-center justify-between bg-[#15151a]/60 border border-gray-800/50 rounded-lg p-2.5 hover:border-amber-500/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FFE082] via-[#FFB300] to-[#E65100] rounded-lg overflow-hidden shrink-0 p-[1px]">
                    <Image 
                      src={mSet.iconUrl} 
                      alt={mSet.name} 
                      width={40} 
                      height={40} 
                      className="w-full h-full object-cover bg-black/20 rounded-md" 
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-100 text-sm leading-tight">{mSet.name}</h5>
                    <span className="text-[10px] text-gray-400 font-semibold leading-none">{mSet.desc}</span>
                  </div>
                </div>
                
                <span className="w-6 h-6 rounded-full bg-blue-950/80 border border-blue-800/30 flex items-center justify-center text-blue-300 text-xs font-extrabold shadow-inner shrink-0">
                  2
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center mb-4">
        <div className="bg-[#15151a]/50 p-3 rounded-lg border border-gray-800/50 flex flex-col justify-center">
          <span className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Sands</span>
          <span className="text-gray-200 font-semibold text-sm">{artifact.sands.join(' / ')}</span>
        </div>
        <div className="bg-[#15151a]/50 p-3 rounded-lg border border-gray-800/50 flex flex-col justify-center">
          <span className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Goblet</span>
          <span className="text-gray-200 font-semibold text-sm">{artifact.goblet.join(' / ')}</span>
        </div>
        <div className="bg-[#15151a]/50 p-3 rounded-lg border border-gray-800/50 flex flex-col justify-center">
          <span className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Circlet</span>
          <span className="text-gray-200 font-semibold text-sm">{artifact.circlet.join(' / ')}</span>
        </div>
      </div>
      
      <div className="border-t border-gray-800/60 pt-4">
        <span className="text-gray-500 text-[10px] font-bold uppercase mb-2 block">Sub-stats Priority</span>
        <div className="flex flex-wrap items-center gap-2">
          {artifact.subStatsPriority.map((stat, sIdx) => (
            <div key={sIdx} className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded border ${sIdx === 0 ? 'bg-gray-800 border-gray-600 text-gray-200' : 'border-gray-800/50 text-gray-400'}`}>
                {stat}
              </span>
              {sIdx < artifact.subStatsPriority.length - 1 && <span className="text-gray-700 text-[10px]">➔</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
