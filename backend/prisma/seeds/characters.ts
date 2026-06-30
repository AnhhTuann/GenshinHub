import axios from 'axios';
import { PrismaClient } from '@prisma/client';

import fs from 'fs';
import path from 'path';

// Hàm chuẩn hóa ID
const toId = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const enkaNameMap: Record<string, string> = {
  "Raiden Shogun": "Shougun", "Kamisato Ayaka": "Ayaka", "Kamisato Ayato": "Ayato", "Sangonomiya Kokomi": "Kokomi",
  "Kaedehara Kazuha": "Kazuha", "Yae Miko": "Yae", "Kuki Shinobu": "Shinobu", "Arataki Itto": "Itto",
  "Shikanoin Heizou": "Heizo", "Kujou Sara": "Sara", "Yun Jin": "Yunjin", "Thoma": "Tohma", "Traveler": "PlayerBoy",
  "Hu Tao": "Hutao", "Lan Yan": "Lanyan", "Skirk": "SkirkNew", "Amber": "Ambor", "Jean": "Qin", "Noelle": "Noel",
  "Baizhu": "Baizhuer", "Yanfei": "Feiyan", "Xianyun": "Liuyun", "Alhaitham": "Alhatham", "Kirara": "Momoka",
  "Lyney": "Liney", "Lynette": "Linette", "Ororon": "Olorun"
};

const forcedIdMap: Record<string, string> = {
  "lan-yan": "lanyan",
  "yumemizuki-mizuki": "yumemizu",
  "kirara": "momoka",
  "manekin": "traveler-boy",
  "manekina": "traveler-girl",
  "traveler": "traveler"
};

const getAvatarUrl = (name: string) => {
  let cleanName = name;
  if (name.startsWith("Traveler")) {
    cleanName = "Traveler";
  }
  const mapped = enkaNameMap[cleanName] || cleanName;
  const urlSafe = mapped.replace(/[^a-zA-Z]/g, '');
  const relativePath = `/images/avatars/UI_AvatarIcon_${urlSafe}.png`;
  const absolutePath = path.join(__dirname, '../../../frontend/public', relativePath);
  if (fs.existsSync(absolutePath)) {
    return relativePath;
  }
  return relativePath;
};

const getSplashUrl = (name: string) => {
  let cleanName = name;
  if (name.startsWith("Traveler")) {
    cleanName = "Traveler";
  }
  const mapped = enkaNameMap[cleanName] || cleanName;
  const urlSafe = mapped.replace(/[^a-zA-Z]/g, '');
  const relativePath = `/images/splash/UI_Gacha_AvatarImg_${urlSafe}.png`;
  const absolutePath = path.join(__dirname, '../../../frontend/public', relativePath);
  if (fs.existsSync(absolutePath)) {
    return relativePath;
  }
  return "";
};



























































import { gaming } from './characters/gaming';
import { jahoda } from './characters/jahoda';
import { xiangling } from './characters/xiangling';
import { kaeya } from './characters/kaeya';
import { albedo } from './characters/albedo';
import { chongyun } from './characters/chongyun';
import { xinyan } from './characters/xinyan';
import { zhongli } from './characters/zhongli';
import { fischl } from './characters/fischl';
import { thoma } from './characters/thoma';
import { nicole } from './characters/nicole';
import { gorou } from './characters/gorou';
import { nilou } from './characters/nilou';
import { kamisatoAyato } from './characters/kamisato-ayato';
import { dehya } from './characters/dehya';
import { lynette } from './characters/lynette';
import { furina } from './characters/furina';
import { freminet } from './characters/freminet';
import { columbina } from './characters/columbina';
import { chasca } from './characters/chasca';
import { iansan } from './characters/iansan';
import { razor } from './characters/razor';
import { dahlia } from './characters/dahlia';
import { citlali } from './characters/citlali';
import { mona } from './characters/mona';
import { travelerPyro } from './characters/traveler-pyro';
import { kinich } from './characters/kinich';
import { travelerDendro } from './characters/traveler-dendro';
import { arlecchino } from './characters/arlecchino';
import { momoka } from './characters/momoka';
import { varka } from './characters/varka';
import { tartaglia } from './characters/tartaglia';
import { bennett } from './characters/bennett';
import { barbara } from './characters/barbara';
import { raidenShogun } from './characters/raiden-shogun';
import { durin } from './characters/durin';
import { xiao } from './characters/xiao';
import { ningguang } from './characters/ningguang';
import { venti } from './characters/venti';
import { zibai } from './characters/zibai';
import { ororon } from './characters/ororon';
import { ganyu } from './characters/ganyu';
import { nahida } from './characters/nahida';
import { sethos } from './characters/sethos';
import { yoimiya } from './characters/yoimiya';
import { eula } from './characters/eula';
import { cyno } from './characters/cyno';
import { baizhu } from './characters/baizhu';
import { rosaria } from './characters/rosaria';
import { mika } from './characters/mika';
import { sangonomiyaKokomi } from './characters/sangonomiya-kokomi';
import { kukiShinobu } from './characters/kuki-shinobu';
import { amber } from './characters/amber';
import { faruzan } from './characters/faruzan';
import { shikanoinHeizou } from './characters/shikanoin-heizou';
import { navia } from './characters/navia';
import { charlotte } from './characters/charlotte';
import { yanfei } from './characters/yanfei';
import { mualani } from './characters/mualani';
import { emilie } from './characters/emilie';
import { yumemizu } from './characters/yumemizu';
import { travelerGirl } from './characters/traveler-girl';
import { travelerAnemo } from './characters/traveler-anemo';
import { travelerHydro } from './characters/traveler-hydro';
import { ifa } from './characters/ifa';
import { illuga } from './characters/illuga';
import { dori } from './characters/dori';
import { lanyan } from './characters/lanyan';
import { skirk } from './characters/skirk';
import { kamisatoAyaka } from './characters/kamisato-ayaka';
import { aino } from './characters/aino';
import { nefer } from './characters/nefer';
import { diona } from './characters/diona';
import { klee } from './characters/klee';
import { sigewinne } from './characters/sigewinne';
import { yunJin } from './characters/yun-jin';
import { wanderer } from './characters/wanderer';
import { xilonen } from './characters/xilonen';
import { neuvillette } from './characters/neuvillette';
import { yaoyao } from './characters/yaoyao';
import { travelerBoy } from './characters/traveler-boy';
import { keqing } from './characters/keqing';
import { sayu } from './characters/sayu';
import { travelerGeo } from './characters/traveler-geo';
import { yelan } from './characters/yelan';
import { jean } from './characters/jean';
import { noelle } from './characters/noelle';
import { clorinde } from './characters/clorinde';
import { qiqi } from './characters/qiqi';
import { prune } from './characters/prune';
import { aratakiItto } from './characters/arataki-itto';
import { linnea } from './characters/linnea';
import { traveler } from './characters/traveler';
import { layla } from './characters/layla';
import { lisa } from './characters/lisa';
import { beidou } from './characters/beidou';
import { chiori } from './characters/chiori';
import { xingqiu } from './characters/xingqiu';
import { varesa } from './characters/varesa';
import { kaedeharaKazuha } from './characters/kaedehara-kazuha';
import { collei } from './characters/collei';
import { lohen } from './characters/lohen';
import { wriothesley } from './characters/wriothesley';
import { kaveh } from './characters/kaveh';
import { mavuika } from './characters/mavuika';
import { flins } from './characters/flins';
import { xianyun } from './characters/xianyun';
import { candace } from './characters/candace';
import { travelerElectro } from './characters/traveler-electro';
import { lyney } from './characters/lyney';
import { sucrose } from './characters/sucrose';
import { huTao } from './characters/hu-tao';
import { kujouSara } from './characters/kujou-sara';
import { alhaitham } from './characters/alhaitham';
import { lauma } from './characters/lauma';
import { diluc } from './characters/diluc';
import { ineffa } from './characters/ineffa';
import { shenhe } from './characters/shenhe';
import { kachina } from './characters/kachina';
import { yaeMiko } from './characters/yae-miko';
import { aloy } from './characters/aloy';
import { chevreuse } from './characters/chevreuse';
import { tighnari } from './characters/tighnari';
import { escoffier } from './characters/escoffier';

const metaBuilds = [
  gaming,
  jahoda,
  xiangling,
  kaeya,
  albedo,
  chongyun,
  xinyan,
  zhongli,
  fischl,
  thoma,
  nicole,
  gorou,
  nilou,
  kamisatoAyato,
  dehya,
  lynette,
  furina,
  freminet,
  columbina,
  chasca,
  iansan,
  razor,
  dahlia,
  citlali,
  mona,
  travelerPyro,
  kinich,
  travelerDendro,
  arlecchino,
  momoka,
  varka,
  tartaglia,
  bennett,
  barbara,
  raidenShogun,
  durin,
  xiao,
  ningguang,
  venti,
  zibai,
  ororon,
  ganyu,
  nahida,
  sethos,
  yoimiya,
  eula,
  cyno,
  baizhu,
  rosaria,
  mika,
  sangonomiyaKokomi,
  kukiShinobu,
  amber,
  faruzan,
  shikanoinHeizou,
  navia,
  charlotte,
  yanfei,
  mualani,
  emilie,
  yumemizu,
  travelerGirl,
  travelerAnemo,
  travelerHydro,
  ifa,
  illuga,
  dori,
  lanyan,
  skirk,
  kamisatoAyaka,
  aino,
  nefer,
  diona,
  klee,
  sigewinne,
  yunJin,
  wanderer,
  xilonen,
  neuvillette,
  yaoyao,
  travelerBoy,
  keqing,
  sayu,
  travelerGeo,
  yelan,
  jean,
  noelle,
  clorinde,
  qiqi,
  prune,
  aratakiItto,
  linnea,
  traveler,
  layla,
  lisa,
  beidou,
  chiori,
  xingqiu,
  varesa,
  kaedeharaKazuha,
  collei,
  lohen,
  wriothesley,
  kaveh,
  mavuika,
  flins,
  xianyun,
  candace,
  travelerElectro,
  lyney,
  sucrose,
  huTao,
  kujouSara,
  alhaitham,
  lauma,
  diluc,
  ineffa,
  shenhe,
  kachina,
  yaeMiko,
  aloy,
  chevreuse,
  tighnari,
  escoffier
];

const charactersData = [
    ...[
      "Kamisato Ayaka|Cryo|Sword|5",
      "Jean|Anemo|Sword|5",
      "Lisa|Electro|Catalyst|4",
      "Barbara|Hydro|Catalyst|4",
      "Kaeya|Cryo|Sword|4",
      "Diluc|Pyro|Claymore|5",
      "Razor|Electro|Claymore|4",
      "Amber|Pyro|Bow|4",
      "Venti|Anemo|Bow|5",
      "Xiangling|Pyro|Polearm|4",
      "Beidou|Electro|Claymore|4",
      "Xingqiu|Hydro|Sword|4",
      "Xiao|Anemo|Polearm|5",
      "Ningguang|Geo|Catalyst|4",
      "Klee|Pyro|Catalyst|5",
      "Zhongli|Geo|Polearm|5",
      "Fischl|Electro|Bow|4",
      "Bennett|Pyro|Sword|4",
      "Tartaglia|Hydro|Bow|5",
      "Noelle|Geo|Claymore|4",
      "Qiqi|Cryo|Sword|5",
      "Chongyun|Cryo|Claymore|4",
      "Ganyu|Cryo|Bow|5",
      "Albedo|Geo|Sword|5",
      "Diona|Cryo|Bow|4",
      "Mona|Hydro|Catalyst|5",
      "Keqing|Electro|Sword|5",
      "Sucrose|Anemo|Catalyst|4",
      "Xinyan|Pyro|Claymore|4",
      "Rosaria|Cryo|Polearm|4",
      "Hu Tao|Pyro|Polearm|5",
      "Kaedehara Kazuha|Anemo|Sword|5",
      "Yanfei|Pyro|Catalyst|4",
      "Yoimiya|Pyro|Bow|5",
      "Thoma|Pyro|Polearm|4",
      "Eula|Cryo|Claymore|5",
      "Raiden Shogun|Electro|Polearm|5",
      "Sayu|Anemo|Claymore|4",
      "Sangonomiya Kokomi|Hydro|Catalyst|5",
      "Gorou|Geo|Bow|4",
      "Kujou Sara|Electro|Bow|4",
      "Arataki Itto|Geo|Claymore|5",
      "Yae Miko|Electro|Catalyst|5",
      "Shikanoin Heizou|Anemo|Catalyst|4",
      "Yelan|Hydro|Bow|5",
      "Kirara|Dendro|Sword|4",
      "Aloy|Cryo|Bow|5",
      "Shenhe|Cryo|Polearm|5",
      "Yun Jin|Geo|Polearm|4",
      "Kuki Shinobu|Electro|Sword|4",
      "Kamisato Ayato|Hydro|Sword|5",
      "Collei|Dendro|Bow|4",
      "Dori|Electro|Claymore|4",
      "Tighnari|Dendro|Bow|5",
      "Nilou|Hydro|Sword|5",
      "Cyno|Electro|Polearm|5",
      "Candace|Hydro|Polearm|4",
      "Nahida|Dendro|Catalyst|5",
      "Layla|Cryo|Sword|4",
      "Wanderer|Anemo|Catalyst|5",
      "Faruzan|Anemo|Bow|4",
      "Yaoyao|Dendro|Polearm|4",
      "Alhaitham|Dendro|Sword|5",
      "Dehya|Pyro|Claymore|5",
      "Mika|Cryo|Polearm|4",
      "Kaveh|Dendro|Claymore|4",
      "Baizhu|Dendro|Catalyst|5",
      "Lynette|Anemo|Sword|4",
      "Lyney|Pyro|Bow|5",
      "Freminet|Cryo|Claymore|4",
      "Wriothesley|Cryo|Catalyst|5",
      "Neuvillette|Hydro|Catalyst|5",
      "Charlotte|Cryo|Catalyst|4",
      "Furina|Hydro|Sword|5",
      "Chevreuse|Pyro|Polearm|4",
      "Navia|Geo|Claymore|5",
      "Gaming|Pyro|Claymore|4",
      "Xianyun|Anemo|Catalyst|5",
      "Chiori|Geo|Sword|5",
      "Sigewinne|Hydro|Bow|5",
      "Arlecchino|Pyro|Polearm|5",
      "Sethos|Electro|Bow|4",
      "Clorinde|Electro|Sword|5",
      "Emilie|Dendro|Polearm|5",
      "Kachina|Geo|Polearm|4",
      "Kinich|Dendro|Claymore|5",
      "Mualani|Hydro|Catalyst|5",
      "Xilonen|Geo|Sword|5",
      "Chasca|Anemo|Bow|5",
      "Ororon|Electro|Bow|4",
      "Mavuika|Pyro|Claymore|5",
      "Citlali|Cryo|Catalyst|5",
      "Lan Yan|Anemo|Catalyst|4",
      "Yumemizuki Mizuki|Anemo|Catalyst|5",
      "Iansan|Electro|Catalyst|4",
      "Varesa|Electro|Catalyst|5",
      "Escoffier|Cryo|Catalyst|5",
      "Ifa|Anemo|Catalyst|4",
      "Skirk|Cryo|Sword|5",
      "Dahlia|Hydro|Sword|4",
      "Ineffa|Electro|Catalyst|5",
      "Manekin|None|Sword|5",
      "Manekina|None|Sword|5",
      "Lauma|Dendro|Catalyst|5",
      "Flins|Electro|Catalyst|5",
      "Aino|Hydro|Claymore|4",
      "Nefer|Dendro|Catalyst|5",
      "Durin|Pyro|Sword|5",
      "Jahoda|Anemo|Bow|4",
      "Columbina|Hydro|Catalyst|5",
      "Zibai|Geo|Sword|5",
      "Illuga|Geo|Catalyst|4",
      "Varka|Anemo|Claymore|5",
      "Lohen|Cryo|Catalyst|5",
      "Linnea|Geo|Bow|5",
      "Nicole|Pyro|Catalyst|5",
      "Prune|Anemo|Catalyst|4",
      "Traveler (Anemo)|Anemo|Sword|5",
      "Traveler (Geo)|Geo|Sword|5",
      "Traveler (Electro)|Electro|Sword|5",
      "Traveler (Dendro)|Dendro|Sword|5",
      "Traveler (Hydro)|Hydro|Sword|5",
      "Traveler (Pyro)|Pyro|Sword|5",
      "Traveler|None|Sword|5"
    ].map(c => ({ ...parseChar(c), region: "Other" }))
  ];

function parseChar(dataStr: string) {
  const [name, element, weapon, rarity] = dataStr.split('|');
  const avatarKey = enkaNameMap[name] || name;

  let charId = toId(name);
  if (forcedIdMap[charId]) charId = forcedIdMap[charId];
  const metaInfo: any = metaBuilds.find(m => m.characterId === charId);

  let defaultWeapons: any[] = [];
  switch (weapon) {
    case 'Sword':
      defaultWeapons = [
        { weaponId: "primordial-jade-cutter", nameVi: "Bàn Nham Kết Lục", nameEn: "Bàn Nham Kết Lục", rank: 5, isF2P: false, iconUrl: "/images/weapons/UI_EquipIcon_Sword_Morax.png", subStat: "Tỷ Lệ Bạo Kích", passiveDescVi: "Tăng HP và Tấn Công.", passiveDescEn: "Tăng HP và Tấn Công.", refinement: 1 },
        { weaponId: "amenoma-kageuchi", nameVi: "Đoản Đao Amenoma", nameEn: "Đoản Đao Amenoma", rank: 4, isF2P: true, iconUrl: "/images/weapons/UI_EquipIcon_Sword_Bakufu.png", subStat: "Tấn Công%", passiveDescVi: "Hồi năng lượng sau khi dùng Nộ.", passiveDescEn: "Hồi năng lượng sau khi dùng Nộ.", refinement: 5 }
      ];
      break;
    case 'Claymore':
      defaultWeapons = [
        { weaponId: "wolfs-gravestone", nameVi: "Đường Cùng Của Sói", nameEn: "Đường Cùng Của Sói", rank: 5, isF2P: false, iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Wolfmound.png", subStat: "Tấn Công%", passiveDescVi: "Tăng mạnh Tấn Công.", passiveDescEn: "Tăng mạnh Tấn Công.", refinement: 1 },
        { weaponId: "prototype-archaic", nameVi: "Mẫu Cổ Hoa", nameEn: "Mẫu Cổ Hoa", rank: 4, isF2P: true, iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Proto.png", subStat: "Tấn Công%", passiveDescVi: "Có xác suất gây sát thương AoE.", passiveDescEn: "Có xác suất gây sát thương AoE.", refinement: 5 }
      ];
      break;
    case 'Bow':
      defaultWeapons = [
        { weaponId: "skyward-harp", nameVi: "Cánh Thiên Không", nameEn: "Cánh Thiên Không", rank: 5, isF2P: false, iconUrl: "/images/weapons/UI_EquipIcon_Bow_Dvalin.png", subStat: "Tỷ Lệ Bạo Kích", passiveDescVi: "Tăng Sát Thương Bạo Kích và có xác suất gây sát thương vật lý.", passiveDescEn: "Tăng Sát Thương Bạo Kích và có xác suất gây sát thương vật lý.", refinement: 1 },
        { weaponId: "the-stringless", nameVi: "Tuyệt Huyền", nameEn: "Tuyệt Huyền", rank: 4, isF2P: false, iconUrl: "/images/weapons/UI_EquipIcon_Bow_Troupe.png", subStat: "Tinh Thông Nguyên Tố", passiveDescVi: "Tăng sát thương Kỹ năng Nguyên tố và Nộ.", passiveDescEn: "Tăng sát thương Kỹ năng Nguyên tố và Nộ.", refinement: 5 }
      ];
      break;
    case 'Catalyst':
      defaultWeapons = [
        { weaponId: "lost-prayer-to-the-sacred-winds", nameVi: "Điển Tích Tây Phong", nameEn: "Điển Tích Tây Phong", rank: 5, isF2P: false, iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Fourwinds.png", subStat: "Tỷ Lệ Bạo Kích", passiveDescVi: "Tăng tốc độ di chuyển và sát thương nguyên tố.", passiveDescEn: "Tăng tốc độ di chuyển và sát thương nguyên tố.", refinement: 1 },
        { weaponId: "the-widsith", nameVi: "Chương Nhạc Lang Thang", nameEn: "Chương Nhạc Lang Thang", rank: 4, isF2P: false, iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Troupe.png", subStat: "Sát Thương Bạo Kích", passiveDescVi: "Nhận ngẫu nhiên 1 trong 3 buff cực mạnh khi ra trận.", passiveDescEn: "Nhận ngẫu nhiên 1 trong 3 buff cực mạnh khi ra trận.", refinement: 5 }
      ];
      break;
    case 'Polearm':
    default:
      defaultWeapons = [
        { weaponId: "engulfing-lightning", nameVi: "Thương Diệu", nameEn: "Thương Diệu", rank: 5, isF2P: false, iconUrl: "/images/weapons/UI_EquipIcon_Pole_Narukami.png", subStat: "Hiệu Quả Nạp Nguyên Tố", passiveDescVi: "ATK cơ bản cao và Độ Tăng Tỷ Lệ Phá Tính thuộc tính phụ tương tác với spam tấn công bình thường.", passiveDescEn: "ATK cơ bản cao và Độ Tăng Tỷ Lệ Phá Tính thuộc tính phụ tương tác với spam tấn công bình thường.", refinement: 1 },
        { weaponId: "the-catch", nameVi: "Lao Xiên Cá", nameEn: "Lao Xiên Cá", rank: 4, isF2P: true, iconUrl: "/images/weapons/UI_EquipIcon_Pole_Mori.png", subStat: "Hiệu Quả Nạp Nguyên Tố", passiveDescVi: "Tăng sát thương Kỹ Năng Nộ và Tỷ Lệ Bạo Kích của Kỹ Năng Nộ.", passiveDescEn: "Tăng sát thương Kỹ Năng Nộ và Tỷ Lệ Bạo Kích của Kỹ Năng Nộ.", refinement: 5 }
      ];
      break;
  }

  return {
    id: charId,
    name: name,
    title: name + " Title",
    rarity: parseInt(rarity) || 5,
    element: element,
    weapon: weapon,
    avatarUrl: getAvatarUrl(name),
    splashArtUrl: getSplashUrl(name),
    talentPriority: (metaInfo && metaInfo.talentPriority) ? metaInfo.talentPriority : ["Normal Attack", "Elemental Skill", "Elemental Burst"],
    bestTeams: (metaInfo && metaInfo.bestTeams) ? metaInfo.bestTeams : ["bennett", "xingqiu", "zhongli"],
    description: `Đây là thông tin bách khoa của ${name}. Nhân vật này đến từ thế giới Teyvat...`,
    baseStats: { hp: 10000, atk: 300, def: 600 },
    fandomUrl: `https://genshin-impact.fandom.com/wiki/${name.replace(/ /g, '_')}`,
    bestWeapons: metaInfo ? metaInfo.bestWeapons.map((w: any) => ({
      weaponId: w.nameVi.toLowerCase().replace(/ /g, '-'),
      nameVi: w.nameVi, nameEn: w.nameEn,
      rank: w.rank,
      isF2P: w.isF2P,
      iconUrl: w.iconUrl,
      subStat: w.subStat,
      passiveDescVi: w.passiveDescVi, passiveDescEn: w.passiveDescEn,
      refinement: parseInt(w.refinement.replace('R', '')) || 1
    })) : defaultWeapons,
    bestArtifacts: (metaInfo && metaInfo.bestArtifacts) ? metaInfo.bestArtifacts : [
      { setNameVi: "Thánh Di Vật Đề Cử", setNameEn: "Thánh Di Vật Đề Cử", pieces: 4, sands: ["ATK%"], goblet: ["Elemental DMG Bonus"], circlet: ["CRIT Rate"], subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%"] }
    ],
    tier: metaInfo?.tier || null,
    role: metaInfo?.role || null,
    recommendedC: metaInfo?.recommendedC || null,
    tierNoteEn: metaInfo?.tierNoteEn || [],
    tierNoteVi: metaInfo?.tierNoteVi || [],
    teams: metaInfo?.teams || []
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

function removeVietnameseDiacritics(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

function matchName(dbName: string, rawName: string) {
  const clean = (s: string) => removeVietnameseDiacritics(s).toLowerCase().replace(/[^a-z0-9]/g, '');
  const dbClean = clean(dbName);
  const rawClean = clean(rawName);

  if (dbClean === rawClean) return true;

  if (dbClean.startsWith('traveler') && rawClean.startsWith('traveler')) {
    const travelerElements: Record<string, string[]> = {
      anemo: ['phong', 'anemo'],
      geo: ['nham', 'geo'],
      electro: ['loi', 'electro'],
      dendro: ['thao', 'dendro'],
      hydro: ['thuy', 'hydro'],
      pyro: ['hoa', 'pyro']
    };
    for (const [el, aliases] of Object.entries(travelerElements)) {
      if (dbClean.includes(el)) {
        return aliases.some(alias => rawClean.includes(alias));
      }
    }
  }

  // Common aliases
  if (dbClean === 'kaedeharakazuha' && rawClean === 'kazuha') return true;
  if (dbClean === 'sangonomiyakokomi' && rawClean === 'kokomi') return true;
  if (dbClean === 'kamisatoayato' && rawClean === 'ayato') return true;
  if (dbClean === 'kamisatoayaka' && rawClean === 'ayaka') return true;
  if (dbClean === 'kujousara' && rawClean === 'sara') return true;
  if (dbClean === 'aratakiitto' && rawClean === 'itto') return true;
  if (dbClean === 'yaemiko' && rawClean === 'miko') return true;
  if (dbClean === 'shikanoinheizou' && rawClean === 'heizou') return true;
  if (dbClean === 'yumemizukimizuki' && rawClean === 'yumemizu') return true;
  if (dbClean === 'lanyan' && rawClean === 'lanyan') return true;

  return false;
}

const rawMetadata = `
🔥 Hỏa (Pyro)
Hu Tao | Liyue | 15/07
Xiangling | Liyue | 02/11
Amber | Mondstadt | 10/08
Diluc | Mondstadt | 30/04
Klee | Mondstadt | 27/07
Bennett | Mondstadt | 29/02
Yanfei | Liyue | 28/07
Yoimiya | Inazuma | 21/06
Xinyan | Liyue | 16/10
Thoma | Mondstadt / Inazuma | 09/01
Dehya | Sumeru | 07/04
Nicole | Hexenzirkel (Hội Ma Nữ) | Chưa rõ
Durin | Khởi nguồn từ Khaenri'ah | Chưa rõ
Traveler (Hỏa) | Thế giới khác | Do người chơi chọn
Mavuika | Natlan | Chưa rõ
Arlecchino | Fontaine / Snezhnaya (Fatui) | 22/08
Gaming | Liyue | 22/12
Chevreuse | Fontaine | 10/01
Lyney | Fontaine | 02/02

💧 Thủy (Hydro)
Neuvillette | Fontaine | 18/12
Furina | Fontaine | 13/10
Yelan | Liyue | 20/04
Columbina | Snezhnaya (Fatui) | Chưa rõ
Aino | Chưa rõ | Chưa rõ
Dahlia | Mondstadt | Chưa rõ
Mualani | Natlan | Chưa rõ
Sigewinne | Fontaine | 30/03
Traveler (Thủy) | Thế giới khác | Do người chơi chọn
Nilou | Sumeru | 03/12
Candace | Sumeru | 03/05
Kamisato Ayato | Inazuma | 26/03
Sangonomiya Kokomi | Inazuma | 22/02
Tartaglia | Snezhnaya | 20/07
Barbara | Mondstadt | 05/07
Mona | Mondstadt | 31/08
Xingqiu | Liyue | 09/10

🌪️ Phong (Anemo)
Kazuha | Inazuma | 29/10
Prune | Chưa rõ | Chưa rõ
Varka | Mondstadt | Chưa rõ
Jahoda | Chưa rõ | Chưa rõ
Ifa | Natlan | Chưa rõ
Yumemizu | Chưa rõ | Chưa rõ
Lan Yan | Liyue (Tin đồn) | Chưa rõ
Chasca | Natlan | Chưa rõ
Xianyun | Liyue | 11/04
Lynette | Fontaine | 02/02
Faruzan | Sumeru | 20/08
Wanderer | Inazuma / Sumeru | 03/01
Shikanoin Heizou | Inazuma | 24/07
Sayu | Inazuma | 19/10
Xiao | Liyue | 17/04
Jean | Mondstadt | 14/03
Sucrose | Mondstadt | 26/11
Traveler (Phong) | Thế giới khác | Do người chơi chọn
Venti | Mondstadt | 16/06

⚡ Lôi (Electro)
Raiden Shogun | Inazuma | 26/06
Flins | Chưa rõ | Chưa rõ
Ineffa | Chưa rõ | Chưa rõ
Iansan | Natlan | Chưa rõ
Varesa | Chưa rõ | Chưa rõ
Ororon | Natlan | Chưa rõ
Clorinde | Fontaine | 20/09
Sethos | Sumeru | 15/05
CynoSumeru23/06
DoriSumeru21/12
Kuki Shinobu | Inazuma | 27/07
Yae Miko | Inazuma | 27/06
Kujou Sara | Inazuma | 14/07
Traveler (Lôi) | Thế giới khác | Do người chơi chọn
Beidou | Liyue | 14/02
Fischl | Mondstadt | 27/05
Keqing | Liyue | 20/11
Lisa | Mondstadt | 09/06
Razor | Mondstadt | 09/09

🌿 Thảo (Dendro)
Nahida | Sumeru | 27/10
Nefer | Chưa rõ | Chưa rõ
Lauma | Chưa rõ | Chưa rõ
Kinich | Natlan | Chưa rõ
Emilie | Fontaine | 22/08
Kirara | Inazuma | 22/01
Baizhu | Liyue | 25/04
Kaveh | Sumeru | 09/07
Alhaitham | Sumeru | 11/02
Yaoyao | Liyue | 06/03
Collei | Sumeru | 08/05
Tighnari | Sumeru | 29/12
Traveler (Thảo) | Thế giới khác | Do người chơi chọn

❄️ Băng (Cryo)
Lohen | Chưa rõ | Chưa rõ
Skirk | Vực Sâu (Abyss) | Chưa rõ
Escoffier | Chưa rõ | Chưa rõ
Citlali | Natlan | Chưa rõ
Charlotte | Fontaine | 10/04
Wriothesley | Fontaine | 23/11
Freminet | Fontaine | 24/09
Mika | Mondstadt | 11/08
Layla | Sumeru | 19/12
Shenhe | Liyue | 10/03
Aloy | Thế giới khác (Horizon) | 04/04
Kamisato Ayaka | Inazuma | 28/09
Eula | Mondstadt | 25/10
Rosaria | Mondstadt | 24/01
Ganyu | Liyue | 02/12
Diona | Mondstadt | 18/01
Chongyun | Liyue | 07/09
Kaeya | Khaenri'ah / Mondstadt | 30/11
Qiqi | Liyue | 03/03

🪨 Nham (Geo)
Zhongli | Liyue | 31/12
Linnea | Chưa rõ | Chưa rõ
Illuga | Chưa rõ | Chưa rõ
Zibai | Chưa rõ | Chưa rõ
Xilonen | Natlan | Chưa rõ
Kachina | Natlan | Chưa rõ
Chiori | Inazuma / Fontaine | 13/03
Navia | Fontaine | 16/08
Yun Jin | Liyue | 21/05
Arataki Itto | Inazuma | 01/06
Gorou | Inazuma | 18/05
Albedo | Mondstadt | 13/09
Ningguang | Liyue | 26/08
Noelle | Mondstadt | 21/03
Traveler (Nham) | Thế giới khác | Do người chơi chọn
`;

function parseMetadata() {
  const lines = rawMetadata.split('\n');
  const results: { name: string; origin: string; birthday: string }[] = [];
  
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('🔥') || line.startsWith('💧') || line.startsWith('🌪️') || line.startsWith('⚡') || line.startsWith('🌿') || line.startsWith('❄️') || line.startsWith('🪨')) {
      continue;
    }
    
    let name = '';
    let origin = '';
    let birthday = '';
    
    if (line.includes('|')) {
      const parts = line.split('|').map(p => p.trim());
      name = parts[0];
      origin = parts[1];
      birthday = parts[2] || 'Chưa rõ';
    } else {
      const match = line.match(/^([A-Za-z\\s()]+?)(Mondstadt|Liyue|Inazuma|Sumeru|Fontaine|Natlan|Snezhnaya|Khaenri'ah|Thế giới khác|Chưa rõ)(.*)$/i);
      if (match) {
        name = match[1].trim();
        origin = match[2].trim();
        birthday = match[3].trim() || 'Chưa rõ';
      } else {
        continue;
      }
    }
    
    results.push({ name, origin, birthday });
  }
  return results;
}

export async function seedCharacters(prisma: PrismaClient) {
  const targetId = process.env.SEED_CHARACTER?.trim();
  let charsToSeed = finalData;

  if (targetId) {
    charsToSeed = finalData.filter(c => c.id === targetId);
    if (charsToSeed.length === 0) {
      console.log(`Không tìm thấy nhân vật nào có ID = ${targetId} để seed.`);
      return;
    }
    console.log(`Chạy seed riêng cho nhân vật: ${targetId}`);
  } else {
    console.log(`Bắt đầu xoá dữ liệu cũ...`);
    await prisma.characterWeapon.deleteMany({});
    await prisma.characterArtifact.deleteMany({});
    await prisma.characterTeam.deleteMany({});
    await prisma.character.deleteMany({});
  }
  
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

  console.log(`Bắt đầu seed dữ liệu mới (${charsToSeed.length} nhân vật)...`);
  for (const char of charsToSeed) {
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
      if (lookupName.startsWith("traveler")) lookupName = "traveler";
      
      const ambrId = ambrMap.get(lookupName);
      
      if (ambrId) {
        // Lấy chi tiết bằng tiếng Việt
        await new Promise(r => setTimeout(r, 200));
        await new Promise(r => setTimeout(r, 400)); const { data: detailData } = await axios.get(`https://gi.yatta.moe/api/v2/vi/avatar/${ambrId}`);
        const { data: detailDataEn } = await axios.get(`https://gi.yatta.moe/api/v2/en/avatar/${ambrId}`);
        if (detailDataEn && detailDataEn.data) {
          if (detailDataEn.data.fetter && detailDataEn.data.fetter.title) {
            char.title = detailDataEn.data.fetter.title;
          }
          if (detailDataEn.data.fetter && detailDataEn.data.fetter.detail) {
            char.description = detailDataEn.data.fetter.detail;
          } else if (detailDataEn.data.fetter && detailDataEn.data.fetter.story) {
            const storyObj = detailDataEn.data.fetter.story[0] || detailDataEn.data.fetter.story[1];
            if (storyObj && storyObj.context) char.description = storyObj.context.replace(/\\n/g, '\n');
          }
        }
        const detail = detailData?.data;
        
        if (detail) {
           // Cập nhật Danh xưng (Title) tiếng Việt
           if (detail.fetter && detail.fetter.title) {
             title = detail.fetter.title;
           }
           
           // Lấy cốt truyện/giới thiệu
           if (detail.fetter) {
             if (detail.fetter.detail) {
               description = detail.fetter.detail;
             } else if (detail.fetter.story) {
               const storyObj = detail.fetter.story[0] || detail.fetter.story[1];
               if (storyObj && storyObj.context) {
                 description = storyObj.context.replace(/\\n/g, '\n');
               }
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

    let finalRegion = char.region;
    let finalBirthday = "Chưa rõ";
    
    try {
      const parsedMeta = parseMetadata();
      const match = parsedMeta.find(m => matchName(char.name, m.name));
      if (match) {
        finalRegion = match.origin;
        finalBirthday = match.birthday;
      } else if (char.id === "manekin" || char.id === "manekina") {
        finalRegion = "Chưa rõ";
      }
    } catch (err) {
      // ignore
    }

    try {
      await prisma.characterWeapon.deleteMany({ where: { characterId: char.id } });
      await prisma.characterArtifact.deleteMany({ where: { characterId: char.id } });
      await prisma.characterTeam.deleteMany({ where: { characterId: char.id } });
      await prisma.character.delete({ where: { id: char.id } }).catch(() => {});
      
      await prisma.character.create({
        data: {
          id: char.id, nameEn: char.name, nameVi: char.name, titleEn: char.title, titleVi: title, rarity: char.rarity, element: char.element, weapon: char.weapon, region: finalRegion, birthday: finalBirthday, avatarUrl: char.avatarUrl, splashArtUrl: char.splashArtUrl, talentPriority: char.talentPriority,
          descriptionEn: char.description, descriptionVi: description, 
          baseHp: baseHp, baseAtk: baseAtk, baseDef: baseDef, 
          fandomUrl: char.fandomUrl,
          tier: char.tier, role: char.role, recommendedC: char.recommendedC, tierNoteEn: char.tierNoteEn, tierNoteVi: char.tierNoteVi,
          bestWeapons: { create: char.bestWeapons },
          bestArtifacts: { create: char.bestArtifacts },
          teams: {
            create: char.teams.map((t: any) => ({
              name: t.name,
              rank: t.rank,
              description: t.description,
              members: {
                create: t.members.map((m: any) => ({
                  characterId: m.characterId,
                  role: m.role,
                  roleDesc: m.roleDesc,
                  weapons: m.weapons,
                  artifacts: m.artifacts,
                  substats: m.substats
                }))
              }
            }))
          }
        }
      });
    } catch (e: any) {
      console.log(`Lỗi khi insert ${char.name}:`, e.message);
    }
  }
  console.log('Seed dữ liệu thành công!');
}

