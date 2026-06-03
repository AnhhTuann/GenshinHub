import axios from 'axios';
import { PrismaClient } from '@prisma/client';

// Hàm chuẩn hóa ID
const toId = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
// Hàm chuẩn hóa avatar url Enka
const toAvatar = (name: string) => `https://enka.network/ui/UI_AvatarIcon_${name.replace(/[^a-zA-Z]/g, '')}.png`;
const toSplash = (name: string) => `https://enka.network/ui/UI_Gacha_AvatarImg_${name.replace(/[^a-zA-Z]/g, '')}.png`;

const metaBuilds = [
  {
    characterId: "hu-tao",
    bestWeapons: [
      { rank: 1, name: "Trượng Hộ Ma", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", reason: "Vũ khí 'trấn phái' hoàn hảo nhất, cung cấp lượng lớn HP và chuyển hóa lượng máu bị mất thành Tấn công cực mạnh.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Homa.png" },
      { rank: 2, name: "Tai Ương Của Rồng", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R5", reason: "Lựa chọn 4 sao đột phá với đội hình Bốc Hơi, tăng sát thương cực lớn lên kẻ địch bị ấn Thủy hoặc Hỏa.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Stardust.png" },
      { rank: 3, name: "Thương Bạch Nhị", subStat: "Tỷ Lệ Bạo Kích", isF2P: true, refinement: "R5", reason: "Vũ khí 3 sao F2P cực ngon kiếm từ rương Liyue, bù đắp Tỷ Lệ Bạo Kích và tăng sát thương đòn đánh thường.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Halberd.png" }
    ]
  },
  {
    characterId: "raiden-shogun",
    bestWeapons: [
      { rank: 1, name: "Đoạn Thảo Kính Phạt", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R1", reason: "Vũ khí hoàn thiện tuyệt đối cho lôi thần, bơm mạnh Hiệu Quả Nạp và tự động chuyển hóa nó thành Tấn Công.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Narukami.png" },
      { rank: 2, name: "Lao Xiên Cá", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", reason: "Vũ khí F2P miễn phí (từ câu cá) tuyệt vời nhất, trực tiếp buff Sát thương và Tỷ lệ bạo kích cho Kỹ năng Nộ.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Mori.png" },
      { rank: 3, name: "Tây Phong Thương", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R5", reason: "Lựa chọn an toàn giúp Raiden Shogun spam Nộ mượt mà và làm sạc dự phòng cho các nhân vật tốn nhiều năng lượng trong đội.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Zephyrus.png" }
    ]
  },
  {
    characterId: "zhongli",
    bestWeapons: [
      { rank: 1, name: "Hắc Anh Thương", subStat: "HP%", isF2P: true, refinement: "R5", reason: "Vũ khí 3 sao huyền thoại rẻ tiền nhưng mang lại lượng HP khổng lồ, biến khiên của Nham thần thành bất tử.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Noire.png" },
      { rank: 2, name: "Tây Phong Thương", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R5", reason: "Lựa chọn đa dụng tối ưu cho lối chơi hỗ trợ, giúp Zhongli tạo hạt năng lượng trắng liên tục cho đồng đội.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Zephyrus.png" },
      { rank: 3, name: "Trượng Hộ Ma", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", reason: "Lựa chọn xa xỉ nếu bạn muốn Zhongli vừa có lượng Khiên đủ xài vừa thả thiên thạch bay màu quái vật.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Homa.png" }
    ]
  },
  {
    characterId: "neuvillette",
    bestWeapons: [
      { rank: 1, name: "Nghi Thức Dòng Chảy Vĩnh Hằng", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", reason: "Vũ khí sinh ra cho Neuvillette, tăng Sát thương Trọng Kích và hồi năng lượng mỗi khi lượng HP thay đổi.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Iudex.png" },
      { rank: 2, name: "Ngọc Quý Lưu Trong Biển Chết", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", reason: "Lựa chọn từ Nhật Ký Hành Trình cực kỳ mạnh, cung cấp rất nhiều HP tối đa khi nhân vật không đứng sân quá lâu.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Yue.png" },
      { rank: 3, name: "Mẫu Kim Phách", subStat: "HP%", isF2P: true, refinement: "R5", reason: "Vũ khí rèn F2P hoàn hảo, không chỉ bơm cực nhiều máu mà còn giải quyết bài toán hồi Năng lượng sau khi Nộ.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Proto.png" }
    ]
  },
  {
    characterId: "furina",
    bestWeapons: [
      { rank: 1, name: "Sắc Nước Thuần Khiết", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", reason: "Trấn phái tăng mạnh sát thương Kỹ Năng Nguyên Tố và buff lượng HP tối đa khi máu đồng đội lên xuống.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Regalis.png" },
      { rank: 2, name: "Răng Nanh Rỉ Sét", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", reason: "Vũ khí 4 sao Event phiên bản 1.2, cực ngon khi vừa giải quyết độ khát Năng lượng vừa buff thẳng Tỷ lệ Bạo Kích cho E.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Magnum.png" },
      { rank: 3, name: "Ống Đồng Yêu Sinh Mệnh", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", reason: "Vũ khí thay thế hoàn hảo cho Răng Nanh Rỉ Sét, cày cuốc miễn phí từ hội Câu Cá Fontaine, giải quyết dứt điểm thiếu hụt Nạp.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Machination.png" }
    ]
  }
];
const charactersData = [
  // 1. Mondstadt
  ...["Albedo|Geo|Sword|5", "Amber|Pyro|Bow|4", "Barbara|Hydro|Catalyst|4", "Bennett|Pyro|Sword|4", "Dahlia|Hydro|Catalyst|4", "Diluc|Pyro|Claymore|5", "Diona|Cryo|Bow|4", "Durin|Anemo|Sword|5", "Eula|Cryo|Claymore|5", "Fischl|Electro|Bow|4", "Jean|Anemo|Sword|5", "Kaeya|Cryo|Sword|4", "Klee|Pyro|Catalyst|5", "Lisa|Electro|Catalyst|4", "Mika|Cryo|Polearm|4", "Mona|Hydro|Catalyst|5", "Noelle|Geo|Claymore|4", "Razor|Electro|Claymore|4", "Rosaria|Cryo|Polearm|4", "Sucrose|Anemo|Catalyst|4", "Varka|Anemo|Claymore|5", "Venti|Anemo|Bow|5"].map(c => ({ ...parseChar(c), region: "Mondstadt" })),
  // 2. Liyue
  ...["Baizhu|Dendro|Catalyst|5", "Beidou|Electro|Claymore|4", "Chongyun|Cryo|Claymore|4", "Gaming|Pyro|Claymore|4", "Keqing|Electro|Sword|5", "Lan Yan|Anemo|Catalyst|4", "Ningguang|Geo|Catalyst|4", "Qiqi|Cryo|Sword|5", "Shenhe|Cryo|Polearm|5", "Xiangling|Pyro|Polearm|4", "Xianyun|Anemo|Catalyst|5", "Xiao|Anemo|Polearm|5", "Xingqiu|Hydro|Sword|4", "Xinyan|Pyro|Claymore|4", "Yanfei|Pyro|Catalyst|4", "Yaoyao|Dendro|Polearm|4", "Yun Jin|Geo|Polearm|4", "Zibai|Geo|Sword|4", "Hu Tao|Pyro|Polearm|5", "Zhongli|Geo|Polearm|5", "Yelan|Hydro|Bow|5", "Ganyu|Cryo|Bow|5"].map(c => ({ ...parseChar(c), region: "Liyue" })),
  // 3. Inazuma
  ...["Ayato|Hydro|Sword|5", "Chiori|Geo|Sword|5", "Gorou|Geo|Bow|4", "Heizou|Anemo|Catalyst|4", "Itto|Geo|Claymore|5", "Kirara|Dendro|Sword|4", "Kokomi|Hydro|Catalyst|5", "Kujou Sara|Electro|Bow|4", "Mizuki|Hydro|Bow|4", "Sayu|Anemo|Claymore|4", "Shinobu|Electro|Sword|4", "Thoma|Pyro|Polearm|4", "Yae Miko|Electro|Catalyst|5", "Yoimiya|Pyro|Bow|5", "Ayaka|Cryo|Sword|5", "Kazuha|Anemo|Sword|5", "Raiden Shogun|Electro|Polearm|5"].map(c => ({ ...parseChar(c), region: "Inazuma" })),
  // 4. Sumeru
  ...["Alhaitham|Dendro|Sword|5", "Candace|Hydro|Polearm|4", "Collei|Dendro|Bow|4", "Cyno|Electro|Polearm|5", "Dehya|Pyro|Claymore|5", "Dori|Electro|Claymore|4", "Faruzan|Anemo|Bow|4", "Kaveh|Dendro|Claymore|4", "Layla|Cryo|Sword|4", "Nilou|Hydro|Sword|5", "Sethos|Electro|Bow|4", "Tighnari|Dendro|Bow|5", "Wanderer|Anemo|Catalyst|5", "Nahida|Dendro|Catalyst|5"].map(c => ({ ...parseChar(c), region: "Sumeru" })),
  // 5. Fontaine
  ...["Charlotte|Cryo|Catalyst|4", "Chevreuse|Pyro|Polearm|4", "Emilie|Dendro|Polearm|5", "Escoffier|Hydro|Sword|4", "Freminet|Cryo|Claymore|4", "Linnea|Hydro|Bow|4", "Lynette|Anemo|Sword|4", "Lyney|Pyro|Bow|5", "Sigewinne|Hydro|Bow|5", "Wriothesley|Cryo|Catalyst|5", "Furina|Hydro|Sword|5", "Neuvillette|Hydro|Catalyst|5", "Navia|Geo|Claymore|5"].map(c => ({ ...parseChar(c), region: "Fontaine" })),
  // 6. Natlan & Others
  ...["Aloy|Cryo|Bow|5", "Chasca|Anemo|Bow|5", "Tartaglia|Hydro|Bow|5", "Citlali|Cryo|Catalyst|5", "Columbina|Cryo|Sword|5", "Flins|Pyro|Claymore|4", "Iansan|Electro|Polearm|4", "Ifa|Dendro|Catalyst|4", "Illuga|Geo|Sword|4", "Ineffa|Anemo|Bow|4", "Kinich|Dendro|Claymore|5", "Mavuika|Pyro|Claymore|5", "Mualani|Hydro|Catalyst|5", "Nicole|Hydro|Catalyst|5", "Skirk|Void|Sword|5", "Traveler|Anemo|Sword|5", "Xilonen|Geo|Sword|5", "Arlecchino|Pyro|Polearm|5"].map(c => ({ ...parseChar(c), region: "Other" }))
];


function parseChar(dataStr: string) {
  const [name, element, weapon, rarity] = dataStr.split('|');
  const enkaNameMap: any = {
    "Raiden Shogun": "Shougun", "Ayato": "Ayato", "Heizou": "Heizo", "Itto": "Itto", "Kokomi": "Kokomi", "Shinobu": "Shinobu", "Yae Miko": "Yae", "Wanderer": "Wanderer", "Tartaglia": "Tartaglia",
    "Amber": "Ambor", "Jean": "Qin", "Noelle": "Noel", "Baizhu": "Baizhuer", "Yanfei": "Feiyan", "Xianyun": "Liuyun", "Alhaitham": "Alhatham", "Kirara": "Momoka", "Lyney": "Liney", "Lynette": "Linette",
    "Kujou Sara": "Sara", "Yun Jin": "Yunjin", "Thoma": "Tohma", "Traveler": "PlayerBoy", "Hu Tao": "Hutao", "Lan Yan": "Lanyan", "Skirk": "SkirkNew"
  };
  const avatarKey = enkaNameMap[name] || name;

  const charId = toId(name);
  const metaInfo = metaBuilds.find(m => m.characterId === charId);

  return {
    id: charId,
    name: name,
    title: name + " Title",
    rarity: parseInt(rarity) || 5,
    element: element,
    weapon: weapon,
    avatarUrl: toAvatar(avatarKey),
    splashArtUrl: toSplash(avatarKey),
    talentPriority: ["Normal Attack", "Elemental Skill", "Elemental Burst"],
    bestTeams: ["bennett", "xingqiu", "zhongli"],
    description: `Đây là thông tin bách khoa của ${name}. Nhân vật này đến từ thế giới Teyvat...`,
    baseStats: { hp: 10000, atk: 300, def: 600 },
    fandomUrl: `https://genshin-impact.fandom.com/wiki/${name.replace(/ /g, '_')}`,
    bestWeapons: metaInfo ? metaInfo.bestWeapons.map(w => ({
      weaponId: w.name.toLowerCase().replace(/ /g, '-'),
      name: w.name,
      rank: w.rank,
      isF2P: w.isF2P,
      iconUrl: w.iconUrl,
      subStat: w.subStat,
      passiveDesc: w.reason,
      refinement: parseInt(w.refinement.replace('R', '')) || 1
    })) : [
      { weaponId: "engulfing-lightning", name: "Thương Diệu", rank: 1, isF2P: false, iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Narukami.png", subStat: "Hiệu Quả Nạp Nguyên Tố", passiveDesc: "ATK cơ bản cao và Độ Tăng Tỷ Lệ Phá Tính thuộc tính phụ tương tác với spam tấn công bình thường.", refinement: 1 },
      { weaponId: "the-catch", name: "Lao Xiên Cá", rank: 2, isF2P: true, iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Mori.png", subStat: "Hiệu Quả Nạp Nguyên Tố", passiveDesc: "Tăng sát thương Kỹ Năng Nộ và Tỷ Lệ Bạo Kích của Kỹ Năng Nộ.", refinement: 5 },
      { weaponId: "primordial-jade-winged-spear", name: "Hòa Phát Diên", rank: 3, isF2P: false, iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Morax.png", subStat: "Tỷ Lệ Bạo Kích", passiveDesc: "Tăng ATK khi đánh trúng kẻ địch. Stack tối đa 7 lần, ở mức tối đa tăng thêm sát thương bạo kích.", refinement: 1 },
    ],
    bestArtifacts: [
      { setName: "Thánh Di Vật Đề Cử", pieces: 4, sands: ["ATK%"], goblet: ["Elemental DMG Bonus"], circlet: ["CRIT Rate"], subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%"] }
    ]
  };
}

// Lọc trùng ID (ưu tiên bản đã có trong seed cũ)
const uniqueMap = new Map();
for (const char of charactersData) {
  if (!uniqueMap.has(char.id)) {
    uniqueMap.set(char.id, char);
  }
}
const finalData = Array.from(uniqueMap.values());

export async function seedCharacters(prisma: PrismaClient) {
  console.log(`Bắt đầu xoá dữ liệu cũ...`);
  await prisma.characterWeapon.deleteMany({});
  await prisma.characterArtifact.deleteMany({});
  await prisma.character.deleteMany({});
  
  console.log(`Bắt đầu lấy dữ liệu từ api.ambr.top...`);
  const ambrMap = new Map();
  try {
    // Lấy list Avatar tiếng Anh để map tên dễ dàng hơn
    const { data: enData } = await axios.get('https://gi.yatta.moe/api/v2/en/avatar');
    const items = enData?.data?.items || {};
    
    for (const key in items) {
      const name = items[key].name;
      // Dùng tên tiếng Anh viết thường để match với finalData
      ambrMap.set(name.toLowerCase(), key);
    }
    console.log(`Đã tải danh sách Ambr: ${ambrMap.size} nhân vật.`);
  } catch (e: any) {
    console.log(`Lỗi không lấy được list Ambr: ${e.message}`);
  }

  console.log(`Bắt đầu seed dữ liệu mới (${finalData.length} nhân vật)...`);
  for (const char of finalData) {
    let description = char.description;
    let baseHp = char.baseStats.hp;
    let baseAtk = char.baseStats.atk;
    let baseDef = char.baseStats.def;
    let title = char.title;

    try {
      // Map tên của mình với Ambr
      // Một số nhân vật có tên khác biệt giữa các API, ta có thể hardcode một chút hoặc dùng mặc định
      let lookupName = char.name.toLowerCase();
      if (lookupName === "raiden shogun") lookupName = "raiden shogun";
      else if (lookupName === "tartaglia") lookupName = "tartaglia";
      else if (lookupName === "traveler") lookupName = "traveler (anemo)"; // Ví dụ
      
      const ambrId = ambrMap.get(lookupName);
      
      if (ambrId) {
        // Lấy chi tiết bằng tiếng Việt
        await new Promise(r => setTimeout(r, 200));
        const { data: detailData } = await axios.get(`https://gi.yatta.moe/api/v2/vi/avatar/${ambrId}`);
        const detail = detailData?.data;
        
        if (detail) {
           // Cập nhật Danh xưng (Title) tiếng Việt
           if (detail.fetter && detail.fetter.title) {
             title = detail.fetter.title;
           }
           
           // Lấy cốt truyện
           if (detail.fetter && detail.fetter.story) {
             const storyObj = detail.fetter.story[0] || detail.fetter.story[1];
             if (storyObj && storyObj.context) {
               description = storyObj.context.replace(/\\n/g, '\n');
             }
           }
           
           // Lấy chỉ số cấp 90
           if (detail.upgrade && detail.upgrade.promote) {
             // Promote cuối cùng thường là level 90
             const maxLevel = detail.upgrade.promote[detail.upgrade.promote.length - 1];
             if (maxLevel && maxLevel.addProps) {
               const props = maxLevel.addProps;
               if (props.FIGHT_PROP_BASE_HP) baseHp = Math.round(props.FIGHT_PROP_BASE_HP);
               if (props.FIGHT_PROP_BASE_ATTACK) baseAtk = Math.round(props.FIGHT_PROP_BASE_ATTACK);
               if (props.FIGHT_PROP_BASE_DEFENSE) baseDef = Math.round(props.FIGHT_PROP_BASE_DEFENSE);
             }
           }
        }
        console.log(`Đã map thành công data Ambr cho ${char.name}`);
      }
    } catch (e: any) {
       console.log(`Bỏ qua Ambr fetch cho ${char.name}: ${e.message}`);
    }

    try {
      await prisma.character.create({
        data: {
          id: char.id, name: char.name, title: title, rarity: char.rarity, element: char.element, weapon: char.weapon, region: char.region, avatarUrl: char.avatarUrl, splashArtUrl: char.splashArtUrl, talentPriority: char.talentPriority, bestTeams: char.bestTeams,
          description: description, 
          baseHp: baseHp, baseAtk: baseAtk, baseDef: baseDef, 
          fandomUrl: char.fandomUrl,
          bestWeapons: { create: char.bestWeapons },
          bestArtifacts: { create: char.bestArtifacts }
        }
      });
    } catch (e: any) {
      console.log(`Lỗi khi insert ${char.name}:`, e.message);
    }
  }
  console.log('Seed dữ liệu thành công!');
}

