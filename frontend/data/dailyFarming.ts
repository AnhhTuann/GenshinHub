export interface FarmingDomain {
  region: string;
  talentId: string;
  talentNameEn: string;
  talentNameVi: string;
  weaponId: string;
  weaponNameEn: string;
  weaponNameVi: string;
}

export interface DailySchedule {
  days: number[]; // 0=Sunday, 1=Monday, ...
  domains: FarmingDomain[];
}

export const dailyFarmingData: DailySchedule[] = [
  {
    days: [1, 4], // Monday, Thursday
    domains: [
      {
        region: "Mondstadt",
        talentId: "freedom", talentNameEn: "Freedom", talentNameVi: "Tự Do",
        weaponId: "decabrian", weaponNameEn: "Decarabian", weaponNameVi: "Decarabian"
      },
      {
        region: "Liyue",
        talentId: "prosperity", talentNameEn: "Prosperity", talentNameVi: "Phồn Vinh",
        weaponId: "guyun", weaponNameEn: "Guyun", weaponNameVi: "Cô Vân"
      },
      {
        region: "Inazuma",
        talentId: "transience", talentNameEn: "Transience", talentNameVi: "Phù Thế",
        weaponId: "distant_sea", weaponNameEn: "Distant Sea", weaponNameVi: "Biển Xa"
      },
      {
        region: "Sumeru",
        talentId: "admonition", talentNameEn: "Admonition", talentNameVi: "Khuyên Nhủ",
        weaponId: "forest_dew", weaponNameEn: "Forest Dew", weaponNameVi: "Rừng Sâu"
      },
      {
        region: "Fontaine",
        talentId: "equity", talentNameEn: "Equity", talentNameVi: "Công Bằng",
        weaponId: "ancient_chord", weaponNameEn: "Ancient Chord", weaponNameVi: "Hòa Âm Cổ"
      },
      {
        region: "Natlan",
        talentId: "contention", talentNameEn: "Contention", talentNameVi: "Tranh Chấp",
        weaponId: "delirious_decadence", weaponNameEn: "Delirious Decadence", weaponNameVi: "Suy Đồi Điên Cuồng"
      }
    ]
  },
  {
    days: [2, 5], // Tuesday, Friday
    domains: [
      {
        region: "Mondstadt",
        talentId: "resistance", talentNameEn: "Resistance", talentNameVi: "Kháng Chiến",
        weaponId: "boreal_wolf", weaponNameEn: "Boreal Wolf", weaponNameVi: "Sói Bắc Phong"
      },
      {
        region: "Liyue",
        talentId: "diligence", talentNameEn: "Diligence", talentNameVi: "Chăm Chỉ",
        weaponId: "elixir", weaponNameEn: "Aerosiderite", weaponNameVi: "Vân Cốc"
      },
      {
        region: "Inazuma",
        talentId: "elegance", talentNameEn: "Elegance", talentNameVi: "Nhã Nhặn",
        weaponId: "narukami", weaponNameEn: "Narukami", weaponNameVi: "Narukami"
      },
      {
        region: "Sumeru",
        talentId: "ingenuity", talentNameEn: "Ingenuity", talentNameVi: "Gian Xảo",
        weaponId: "oasis_garden", weaponNameEn: "Oasis Garden", weaponNameVi: "Ốc Đảo"
      },
      {
        region: "Fontaine",
        talentId: "justice", talentNameEn: "Justice", talentNameVi: "Công Lý",
        weaponId: "pure_sacred_dew", weaponNameEn: "Pure Sacred Dew", weaponNameVi: "Giọt Sương Thiêng"
      },
      {
        region: "Natlan",
        talentId: "kindling", talentNameEn: "Kindling", talentNameVi: "Thiêu Đốt",
        weaponId: "blazing_heart", weaponNameEn: "Blazing Heart", weaponNameVi: "Trái Tim Rực Lửa"
      }
    ]
  },
  {
    days: [3, 6], // Wednesday, Saturday
    domains: [
      {
        region: "Mondstadt",
        talentId: "ballad", talentNameEn: "Ballad", talentNameVi: "Thi Ca",
        weaponId: "dandelion_gladiator", weaponNameEn: "Dandelion Gladiator", weaponNameVi: "Đấu Sĩ Bồ Công Anh"
      },
      {
        region: "Liyue",
        talentId: "gold", talentNameEn: "Gold", talentNameVi: "Hoàng Kim",
        weaponId: "aerosiderite", weaponNameEn: "Aerosiderite", weaponNameVi: "Khí Vẫn" // Aerosiderite
      },
      {
        region: "Inazuma",
        talentId: "light", talentNameEn: "Light", talentNameVi: "Ánh Sáng",
        weaponId: "mask", weaponNameEn: "Mask", weaponNameVi: "Mặt Nạ"
      },
      {
        region: "Sumeru",
        talentId: "praxis", talentNameEn: "Praxis", talentNameVi: "Thực Hành",
        weaponId: "scorching_might", weaponNameEn: "Scorching Might", weaponNameVi: "Uy Quyền Cháy Bỏng"
      },
      {
        region: "Fontaine",
        talentId: "order", talentNameEn: "Order", talentNameVi: "Trật Tự",
        weaponId: "pristine_sea", weaponNameEn: "Pristine Sea", weaponNameVi: "Biển Tinh Khiết"
      },
      {
        region: "Natlan",
        talentId: "conflict", talentNameEn: "Conflict", talentNameVi: "Xung Đột",
        weaponId: "sacred_lord", weaponNameEn: "Sacred Lord", weaponNameVi: "Thánh Chúa"
      }
    ]
  }
];

export function getTodayFarmingData(timezoneOffset = 8): DailySchedule | null {
  // Get current day based on Asian server time (UTC+8) by default
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const serverTime = new Date(utc + (3600000 * timezoneOffset));
  const day = serverTime.getDay();
  
  if (day === 0) return null; // Sunday: everything is open
  return dailyFarmingData.find(schedule => schedule.days.includes(day)) || null;
}
