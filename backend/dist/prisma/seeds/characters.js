"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCharacters = seedCharacters;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Hàm chuẩn hóa ID
const toId = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const enkaNameMap = {
    "Raiden Shogun": "Shougun", "Kamisato Ayaka": "Ayaka", "Kamisato Ayato": "Ayato", "Sangonomiya Kokomi": "Kokomi",
    "Kaedehara Kazuha": "Kazuha", "Yae Miko": "Yae", "Kuki Shinobu": "Shinobu", "Arataki Itto": "Itto",
    "Shikanoin Heizou": "Heizo", "Kujou Sara": "Sara", "Yun Jin": "Yunjin", "Thoma": "Tohma", "Traveler": "PlayerBoy",
    "Hu Tao": "Hutao", "Lan Yan": "Lanyan", "Skirk": "SkirkNew", "Amber": "Ambor", "Jean": "Qin", "Noelle": "Noel",
    "Baizhu": "Baizhuer", "Yanfei": "Feiyan", "Xianyun": "Liuyun", "Alhaitham": "Alhatham", "Kirara": "Momoka",
    "Lyney": "Liney", "Lynette": "Linette", "Ororon": "Olorun",
    // Fix: folder name is YumemizukiMizuki (no space, no hyphen)
    "Yumemizuki Mizuki": "YumemizukiMizuki",
    "Manekin": "PlayerBoy", "Manekina": "PlayerGirl"
};
const forcedIdMap = {
    "lan-yan": "lanyan",
    "yumemizuki-mizuki": "yumemizu",
    "kirara": "momoka",
    "manekin": "traveler-boy",
    "manekina": "traveler-girl",
    "traveler": "traveler"
};
const getAvatarUrl = (name) => {
    let cleanName = name;
    if (name.startsWith("Traveler")) {
        cleanName = "Traveler";
    }
    const mapped = enkaNameMap[cleanName] || cleanName;
    const urlSafe = mapped.replace(/[^a-zA-Z]/g, '');
    const relativePath = `/assets/characters/${urlSafe}/avatar.webp`;
    const absolutePath = path_1.default.join(__dirname, '../../../frontend/public', relativePath);
    if (fs_1.default.existsSync(absolutePath)) {
        return relativePath;
    }
    return relativePath;
};
const getSplashUrl = (name) => {
    let cleanName = name;
    if (name.startsWith("Traveler")) {
        cleanName = "Traveler";
    }
    const mapped = enkaNameMap[cleanName] || cleanName;
    const urlSafe = mapped.replace(/[^a-zA-Z]/g, '');
    const relativePath = `/assets/characters/${urlSafe}/splash.webp`;
    const absolutePath = path_1.default.join(__dirname, '../../../frontend/public', relativePath);
    if (fs_1.default.existsSync(absolutePath)) {
        return relativePath;
    }
    return "";
};
const sayu_1 = require("./characters/sayu");
const sangonomiya_kokomi_1 = require("./characters/sangonomiya-kokomi");
const gorou_1 = require("./characters/gorou");
const kujou_sara_1 = require("./characters/kujou-sara");
const arataki_itto_1 = require("./characters/arataki-itto");
const yae_miko_1 = require("./characters/yae-miko");
const shikanoin_heizou_1 = require("./characters/shikanoin-heizou");
const yelan_1 = require("./characters/yelan");
const momoka_1 = require("./characters/momoka");
const aloy_1 = require("./characters/aloy");
const shenhe_1 = require("./characters/shenhe");
const yun_jin_1 = require("./characters/yun-jin");
const kuki_shinobu_1 = require("./characters/kuki-shinobu");
const kamisato_ayato_1 = require("./characters/kamisato-ayato");
const collei_1 = require("./characters/collei");
const dori_1 = require("./characters/dori");
const tighnari_1 = require("./characters/tighnari");
const nilou_1 = require("./characters/nilou");
const cyno_1 = require("./characters/cyno");
const candace_1 = require("./characters/candace");
const nahida_1 = require("./characters/nahida");
const layla_1 = require("./characters/layla");
const wanderer_1 = require("./characters/wanderer");
const faruzan_1 = require("./characters/faruzan");
const yaoyao_1 = require("./characters/yaoyao");
const alhaitham_1 = require("./characters/alhaitham");
const dehya_1 = require("./characters/dehya");
const mika_1 = require("./characters/mika");
const kaveh_1 = require("./characters/kaveh");
const baizhu_1 = require("./characters/baizhu");
const lynette_1 = require("./characters/lynette");
const lyney_1 = require("./characters/lyney");
const freminet_1 = require("./characters/freminet");
const wriothesley_1 = require("./characters/wriothesley");
const neuvillette_1 = require("./characters/neuvillette");
const charlotte_1 = require("./characters/charlotte");
const furina_1 = require("./characters/furina");
const chevreuse_1 = require("./characters/chevreuse");
const navia_1 = require("./characters/navia");
const gaming_1 = require("./characters/gaming");
const xianyun_1 = require("./characters/xianyun");
const chiori_1 = require("./characters/chiori");
const sigewinne_1 = require("./characters/sigewinne");
const arlecchino_1 = require("./characters/arlecchino");
const sethos_1 = require("./characters/sethos");
const clorinde_1 = require("./characters/clorinde");
const emilie_1 = require("./characters/emilie");
const kachina_1 = require("./characters/kachina");
const kinich_1 = require("./characters/kinich");
const mualani_1 = require("./characters/mualani");
const xilonen_1 = require("./characters/xilonen");
const chasca_1 = require("./characters/chasca");
const ororon_1 = require("./characters/ororon");
const mavuika_1 = require("./characters/mavuika");
const citlali_1 = require("./characters/citlali");
const lanyan_1 = require("./characters/lanyan");
const yumemizu_1 = require("./characters/yumemizu");
const iansan_1 = require("./characters/iansan");
const varesa_1 = require("./characters/varesa");
const ifa_1 = require("./characters/ifa");
const skirk_1 = require("./characters/skirk");
const dahlia_1 = require("./characters/dahlia");
const ineffa_1 = require("./characters/ineffa");
const traveler_boy_1 = require("./characters/traveler-boy");
const traveler_girl_1 = require("./characters/traveler-girl");
const lauma_1 = require("./characters/lauma");
const flins_1 = require("./characters/flins");
const aino_1 = require("./characters/aino");
const nefer_1 = require("./characters/nefer");
const durin_1 = require("./characters/durin");
const jahoda_1 = require("./characters/jahoda");
const columbina_1 = require("./characters/columbina");
const zibai_1 = require("./characters/zibai");
const illuga_1 = require("./characters/illuga");
const varka_1 = require("./characters/varka");
const lohen_1 = require("./characters/lohen");
const linnea_1 = require("./characters/linnea");
const nicole_1 = require("./characters/nicole");
const prune_1 = require("./characters/prune");
const traveler_anemo_1 = require("./characters/traveler-anemo");
const traveler_geo_1 = require("./characters/traveler-geo");
const traveler_electro_1 = require("./characters/traveler-electro");
const traveler_dendro_1 = require("./characters/traveler-dendro");
const traveler_hydro_1 = require("./characters/traveler-hydro");
const traveler_pyro_1 = require("./characters/traveler-pyro");
const traveler_1 = require("./characters/traveler");
const diona_1 = require("./characters/diona");
const escoffier_1 = require("./characters/escoffier");
const kamisato_ayaka_1 = require("./characters/kamisato-ayaka");
const jean_1 = require("./characters/jean");
const lisa_1 = require("./characters/lisa");
const barbara_1 = require("./characters/barbara");
const kaeya_1 = require("./characters/kaeya");
const diluc_1 = require("./characters/diluc");
const razor_1 = require("./characters/razor");
const amber_1 = require("./characters/amber");
const venti_1 = require("./characters/venti");
const xiangling_1 = require("./characters/xiangling");
const beidou_1 = require("./characters/beidou");
const xingqiu_1 = require("./characters/xingqiu");
const xiao_1 = require("./characters/xiao");
const ningguang_1 = require("./characters/ningguang");
const klee_1 = require("./characters/klee");
const zhongli_1 = require("./characters/zhongli");
const fischl_1 = require("./characters/fischl");
const bennett_1 = require("./characters/bennett");
const tartaglia_1 = require("./characters/tartaglia");
const noelle_1 = require("./characters/noelle");
const qiqi_1 = require("./characters/qiqi");
const chongyun_1 = require("./characters/chongyun");
const ganyu_1 = require("./characters/ganyu");
const albedo_1 = require("./characters/albedo");
const mona_1 = require("./characters/mona");
const keqing_1 = require("./characters/keqing");
const sucrose_1 = require("./characters/sucrose");
const xinyan_1 = require("./characters/xinyan");
const rosaria_1 = require("./characters/rosaria");
const hu_tao_1 = require("./characters/hu-tao");
const kaedehara_kazuha_1 = require("./characters/kaedehara-kazuha");
const yanfei_1 = require("./characters/yanfei");
const yoimiya_1 = require("./characters/yoimiya");
const thoma_1 = require("./characters/thoma");
const eula_1 = require("./characters/eula");
const raiden_shogun_1 = require("./characters/raiden-shogun");
const metaBuilds = [
    sayu_1.sayu,
    sangonomiya_kokomi_1.sangonomiyaKokomi,
    gorou_1.gorou,
    kujou_sara_1.kujouSara,
    arataki_itto_1.aratakiItto,
    yae_miko_1.yaeMiko,
    shikanoin_heizou_1.shikanoinHeizou,
    yelan_1.yelan,
    momoka_1.momoka,
    aloy_1.aloy,
    shenhe_1.shenhe,
    yun_jin_1.yunJin,
    kuki_shinobu_1.kukiShinobu,
    kamisato_ayato_1.kamisatoAyato,
    collei_1.collei,
    dori_1.dori,
    tighnari_1.tighnari,
    nilou_1.nilou,
    cyno_1.cyno,
    candace_1.candace,
    nahida_1.nahida,
    layla_1.layla,
    wanderer_1.wanderer,
    faruzan_1.faruzan,
    yaoyao_1.yaoyao,
    alhaitham_1.alhaitham,
    dehya_1.dehya,
    mika_1.mika,
    kaveh_1.kaveh,
    baizhu_1.baizhu,
    lynette_1.lynette,
    lyney_1.lyney,
    freminet_1.freminet,
    wriothesley_1.wriothesley,
    neuvillette_1.neuvillette,
    charlotte_1.charlotte,
    furina_1.furina,
    chevreuse_1.chevreuse,
    navia_1.navia,
    gaming_1.gaming,
    xianyun_1.xianyun,
    chiori_1.chiori,
    sigewinne_1.sigewinne,
    arlecchino_1.arlecchino,
    sethos_1.sethos,
    clorinde_1.clorinde,
    emilie_1.emilie,
    kachina_1.kachina,
    kinich_1.kinich,
    mualani_1.mualani,
    xilonen_1.xilonen,
    chasca_1.chasca,
    ororon_1.ororon,
    mavuika_1.mavuika,
    citlali_1.citlali,
    lanyan_1.lanyan,
    yumemizu_1.yumemizu,
    iansan_1.iansan,
    varesa_1.varesa,
    ifa_1.ifa,
    skirk_1.skirk,
    dahlia_1.dahlia,
    ineffa_1.ineffa,
    traveler_boy_1.travelerBoy,
    traveler_girl_1.travelerGirl,
    lauma_1.lauma,
    flins_1.flins,
    aino_1.aino,
    nefer_1.nefer,
    durin_1.durin,
    jahoda_1.jahoda,
    columbina_1.columbina,
    zibai_1.zibai,
    illuga_1.illuga,
    varka_1.varka,
    lohen_1.lohen,
    linnea_1.linnea,
    nicole_1.nicole,
    prune_1.prune,
    traveler_anemo_1.travelerAnemo,
    traveler_geo_1.travelerGeo,
    traveler_electro_1.travelerElectro,
    traveler_dendro_1.travelerDendro,
    traveler_hydro_1.travelerHydro,
    traveler_pyro_1.travelerPyro,
    traveler_1.traveler,
    diona_1.diona,
    escoffier_1.escoffier,
    kamisato_ayaka_1.kamisatoAyaka,
    jean_1.jean,
    lisa_1.lisa,
    barbara_1.barbara,
    kaeya_1.kaeya,
    diluc_1.diluc,
    razor_1.razor,
    amber_1.amber,
    venti_1.venti,
    xiangling_1.xiangling,
    beidou_1.beidou,
    xingqiu_1.xingqiu,
    xiao_1.xiao,
    ningguang_1.ningguang,
    klee_1.klee,
    zhongli_1.zhongli,
    fischl_1.fischl,
    bennett_1.bennett,
    tartaglia_1.tartaglia,
    noelle_1.noelle,
    qiqi_1.qiqi,
    chongyun_1.chongyun,
    ganyu_1.ganyu,
    albedo_1.albedo,
    mona_1.mona,
    keqing_1.keqing,
    sucrose_1.sucrose,
    xinyan_1.xinyan,
    rosaria_1.rosaria,
    hu_tao_1.huTao,
    kaedehara_kazuha_1.kaedeharaKazuha,
    yanfei_1.yanfei,
    yoimiya_1.yoimiya,
    thoma_1.thoma,
    eula_1.eula,
    raiden_shogun_1.raidenShogun
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
        "Escoffier|Cryo|Polearm|5",
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
        "Traveler|None|Sword|5",
        "Sandrone|Cryo|Catalyst|5"
    ].map(c => ({ ...parseChar(c), region: "Other" }))
];
function parseChar(dataStr) {
    const [name, element, weapon, rarity] = dataStr.split('|');
    const avatarKey = enkaNameMap[name] || name;
    let charId = toId(name);
    if (forcedIdMap[charId])
        charId = forcedIdMap[charId];
    const metaInfo = metaBuilds.find(m => m.characterId === charId);
    let defaultWeapons = [];
    switch (weapon) {
        case 'Sword':
            defaultWeapons = [
                { weaponId: "primordial-jade-cutter", nameVi: "Bàn Nham Kết Lục", nameEn: "Bàn Nham Kết Lục", rank: 5, isF2P: false, iconUrl: "/assets/weapons/UI_EquipIcon_Sword_Morax.webp", subStat: "Tỷ Lệ Bạo Kích", passiveDescVi: "Tăng HP và Tấn Công.", passiveDescEn: "Tăng HP và Tấn Công.", refinement: 1 },
                { weaponId: "amenoma-kageuchi", nameVi: "Đoản Đao Amenoma", nameEn: "Đoản Đao Amenoma", rank: 4, isF2P: true, iconUrl: "/assets/weapons/UI_EquipIcon_Sword_Bakufu.webp", subStat: "Tấn Công%", passiveDescVi: "Hồi năng lượng sau khi dùng Nộ.", passiveDescEn: "Hồi năng lượng sau khi dùng Nộ.", refinement: 5 }
            ];
            break;
        case 'Claymore':
            defaultWeapons = [
                { weaponId: "wolfs-gravestone", nameVi: "Đường Cùng Của Sói", nameEn: "Đường Cùng Của Sói", rank: 5, isF2P: false, iconUrl: "/assets/weapons/UI_EquipIcon_Claymore_Wolfmound.webp", subStat: "Tấn Công%", passiveDescVi: "Tăng mạnh Tấn Công.", passiveDescEn: "Tăng mạnh Tấn Công.", refinement: 1 },
                { weaponId: "prototype-archaic", nameVi: "Mẫu Cổ Hoa", nameEn: "Mẫu Cổ Hoa", rank: 4, isF2P: true, iconUrl: "/assets/weapons/UI_EquipIcon_Claymore_Proto.webp", subStat: "Tấn Công%", passiveDescVi: "Có xác suất gây sát thương AoE.", passiveDescEn: "Có xác suất gây sát thương AoE.", refinement: 5 }
            ];
            break;
        case 'Bow':
            defaultWeapons = [
                { weaponId: "skyward-harp", nameVi: "Cánh Thiên Không", nameEn: "Cánh Thiên Không", rank: 5, isF2P: false, iconUrl: "/assets/weapons/UI_EquipIcon_Bow_Dvalin.webp", subStat: "Tỷ Lệ Bạo Kích", passiveDescVi: "Tăng Sát Thương Bạo Kích và có xác suất gây sát thương vật lý.", passiveDescEn: "Tăng Sát Thương Bạo Kích và có xác suất gây sát thương vật lý.", refinement: 1 },
                { weaponId: "the-stringless", nameVi: "Tuyệt Huyền", nameEn: "Tuyệt Huyền", rank: 4, isF2P: false, iconUrl: "/assets/weapons/UI_EquipIcon_Bow_Troupe.webp", subStat: "Tinh Thông Nguyên Tố", passiveDescVi: "Tăng sát thương Kỹ năng Nguyên tố và Nộ.", passiveDescEn: "Tăng sát thương Kỹ năng Nguyên tố và Nộ.", refinement: 5 }
            ];
            break;
        case 'Catalyst':
            defaultWeapons = [
                { weaponId: "lost-prayer-to-the-sacred-winds", nameVi: "Điển Tích Tây Phong", nameEn: "Điển Tích Tây Phong", rank: 5, isF2P: false, iconUrl: "/assets/weapons/UI_EquipIcon_Catalyst_Fourwinds.webp", subStat: "Tỷ Lệ Bạo Kích", passiveDescVi: "Tăng tốc độ di chuyển và sát thương nguyên tố.", passiveDescEn: "Tăng tốc độ di chuyển và sát thương nguyên tố.", refinement: 1 },
                { weaponId: "the-widsith", nameVi: "Chương Nhạc Lang Thang", nameEn: "Chương Nhạc Lang Thang", rank: 4, isF2P: false, iconUrl: "/assets/weapons/UI_EquipIcon_Catalyst_Troupe.webp", subStat: "Sát Thương Bạo Kích", passiveDescVi: "Nhận ngẫu nhiên 1 trong 3 buff cực mạnh khi ra trận.", passiveDescEn: "Nhận ngẫu nhiên 1 trong 3 buff cực mạnh khi ra trận.", refinement: 5 }
            ];
            break;
        case 'Polearm':
        default:
            defaultWeapons = [
                { weaponId: "engulfing-lightning", nameVi: "Thương Diệu", nameEn: "Thương Diệu", rank: 5, isF2P: false, iconUrl: "/assets/weapons/UI_EquipIcon_Pole_Narukami.webp", subStat: "Hiệu Quả Nạp Nguyên Tố", passiveDescVi: "ATK cơ bản cao và Độ Tăng Tỷ Lệ Phá Tính thuộc tính phụ tương tác với spam tấn công bình thường.", passiveDescEn: "ATK cơ bản cao và Độ Tăng Tỷ Lệ Phá Tính thuộc tính phụ tương tác với spam tấn công bình thường.", refinement: 1 },
                { weaponId: "the-catch", nameVi: "Lao Xiên Cá", nameEn: "Lao Xiên Cá", rank: 4, isF2P: true, iconUrl: "/assets/weapons/UI_EquipIcon_Pole_Mori.webp", subStat: "Hiệu Quả Nạp Nguyên Tố", passiveDescVi: "Tăng sát thương Kỹ Năng Nộ và Tỷ Lệ Bạo Kích của Kỹ Năng Nộ.", passiveDescEn: "Tăng sát thương Kỹ Năng Nộ và Tỷ Lệ Bạo Kích của Kỹ Năng Nộ.", refinement: 5 }
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
        bestWeapons: metaInfo ? metaInfo.bestWeapons.map((w, index) => ({
            weaponId: w.nameVi.toLowerCase().replace(/ /g, '-'),
            nameVi: w.nameVi, nameEn: w.nameEn,
            rank: w.rank,
            isF2P: w.isF2P,
            iconUrl: w.iconUrl,
            subStat: w.subStat,
            passiveDescVi: w.passiveDescVi, passiveDescEn: w.passiveDescEn,
            refinement: parseInt(w.refinement.replace('R', '')) || 1,
            order: index
        })) : defaultWeapons.map((w, index) => ({ ...w, order: index })),
        bestArtifacts: (metaInfo && metaInfo.bestArtifacts) ? metaInfo.bestArtifacts.map((a, index) => ({ ...a, order: index })) : [
            { setNameVi: "Thánh Di Vật Đồ Cổ", setNameEn: "Thánh Di Vật Đồ Cổ", pieces: 4, order: 0 }
        ],
        tier: metaInfo?.tier || null,
        role: metaInfo?.role || null,
        recommendedC: metaInfo?.recommendedC || null,
        tierNoteEn: metaInfo?.tierNoteEn || [],
        tierNoteVi: metaInfo?.tierNoteVi || [],
        teams: metaInfo?.teams || [],
        stats: metaInfo?.stats || null,
        ascensionMats: metaInfo?.ascensionMats || null,
        talentMats: metaInfo?.talentMats || null,
        sands: metaInfo?.sands || [],
        goblet: metaInfo?.goblet || [],
        circlet: metaInfo?.circlet || [],
        subStatsPriority: metaInfo?.subStatsPriority || []
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
function removeVietnameseDiacritics(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
}
function matchName(dbName, rawName) {
    const clean = (s) => removeVietnameseDiacritics(s).toLowerCase().replace(/[^a-z0-9]/g, '');
    const dbClean = clean(dbName);
    const rawClean = clean(rawName);
    if (dbClean === rawClean)
        return true;
    if (dbClean.startsWith('traveler') && rawClean.startsWith('traveler')) {
        const travelerElements = {
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
    if (dbClean === 'kaedeharakazuha' && rawClean === 'kazuha')
        return true;
    if (dbClean === 'sangonomiyakokomi' && rawClean === 'kokomi')
        return true;
    if (dbClean === 'kamisatoayato' && rawClean === 'ayato')
        return true;
    if (dbClean === 'kamisatoayaka' && rawClean === 'ayaka')
        return true;
    if (dbClean === 'kujousara' && rawClean === 'sara')
        return true;
    if (dbClean === 'aratakiitto' && rawClean === 'itto')
        return true;
    if (dbClean === 'yaemiko' && rawClean === 'miko')
        return true;
    if (dbClean === 'shikanoinheizou' && rawClean === 'heizou')
        return true;
    if (dbClean === 'yumemizukimizuki' && rawClean === 'yumemizu')
        return true;
    if (dbClean === 'lanyan' && rawClean === 'lanyan')
        return true;
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
    const results = [];
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
        }
        else {
            const match = line.match(/^([A-Za-z\\s()]+?)(Mondstadt|Liyue|Inazuma|Sumeru|Fontaine|Natlan|Snezhnaya|Khaenri'ah|Thế giới khác|Chưa rõ)(.*)$/i);
            if (match) {
                name = match[1].trim();
                origin = match[2].trim();
                birthday = match[3].trim() || 'Chưa rõ';
            }
            else {
                continue;
            }
        }
        results.push({ name, origin, birthday });
    }
    return results;
}
async function seedCharacters(prisma) {
    const targetId = process.env.SEED_CHARACTER?.trim();
    let charsToSeed = finalData;
    if (targetId) {
        charsToSeed = finalData.filter(c => c.id === targetId);
        if (charsToSeed.length === 0) {
            console.log(`Không tìm thấy nhân vật nào có ID = ${targetId} để seed.`);
            return;
        }
        console.log(`Chạy seed riêng cho nhân vật: ${targetId}`);
    }
    else {
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
        const { data: enData } = await axios_1.default.get('https://gi.yatta.moe/api/v2/en/avatar');
        const items = enData?.data?.items || {};
        for (const key in items) {
            const name = items[key].name;
            // Dùng tên tiếng Anh viết thường để match với finalData
            ambrMap.set(name.toLowerCase(), key);
        }
        console.log(`Đã tải danh sách Ambr: ${ambrMap.size} nhân vật.`);
    }
    catch (e) {
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
            if (lookupName === "raiden shogun")
                lookupName = "raiden shogun";
            else if (lookupName === "tartaglia")
                lookupName = "tartaglia";
            if (lookupName.startsWith("traveler"))
                lookupName = "traveler";
            const ambrId = ambrMap.get(lookupName);
            if (ambrId) {
                // Lấy chi tiết bằng tiếng Việt
                await new Promise(r => setTimeout(r, 400));
                const { data: detailData } = await axios_1.default.get(`https://gi.yatta.moe/api/v2/vi/avatar/${ambrId}`);
                const { data: detailDataEn } = await axios_1.default.get(`https://gi.yatta.moe/api/v2/en/avatar/${ambrId}`);
                if (detailDataEn && detailDataEn.data) {
                    if (detailDataEn.data.fetter && detailDataEn.data.fetter.title) {
                        char.title = detailDataEn.data.fetter.title;
                    }
                    if (detailDataEn.data.fetter && detailDataEn.data.fetter.detail) {
                        char.description = detailDataEn.data.fetter.detail;
                    }
                    else if (detailDataEn.data.fetter && detailDataEn.data.fetter.story) {
                        const storyObj = detailDataEn.data.fetter.story[0] || detailDataEn.data.fetter.story[1];
                        if (storyObj && storyObj.context)
                            char.description = storyObj.context.replace(/\\n/g, '\n');
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
                        }
                        else if (detail.fetter.story) {
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
                            if (props.FIGHT_PROP_BASE_HP)
                                baseHp = Math.round(props.FIGHT_PROP_BASE_HP);
                            if (props.FIGHT_PROP_BASE_ATTACK)
                                baseAtk = Math.round(props.FIGHT_PROP_BASE_ATTACK);
                            if (props.FIGHT_PROP_BASE_DEFENSE)
                                baseDef = Math.round(props.FIGHT_PROP_BASE_DEFENSE);
                        }
                    }
                }
                console.log(`Đã map thành công data Ambr cho ${char.name}`);
            }
        }
        catch (e) {
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
            }
            else if (char.id === "manekin" || char.id === "manekina") {
                finalRegion = "Chưa rõ";
            }
        }
        catch (err) {
            // ignore
        }
        try {
            await prisma.characterWeapon.deleteMany({ where: { characterId: char.id } });
            await prisma.characterArtifact.deleteMany({ where: { characterId: char.id } });
            await prisma.characterTeam.deleteMany({ where: { characterId: char.id } });
            await prisma.character.delete({ where: { id: char.id } }).catch(() => { });
            await prisma.character.create({
                data: {
                    id: char.id, nameEn: char.name, nameVi: char.name, titleEn: char.title, titleVi: title, rarity: char.rarity, element: char.element, weapon: char.weapon, region: finalRegion, birthday: finalBirthday, avatarUrl: char.avatarUrl, splashArtUrl: char.splashArtUrl, talentPriority: char.talentPriority,
                    descriptionEn: char.description, descriptionVi: description,
                    baseHp: baseHp, baseAtk: baseAtk, baseDef: baseDef,
                    fandomUrl: char.fandomUrl,
                    tier: char.tier, role: char.role, recommendedC: char.recommendedC, tierNoteEn: char.tierNoteEn, tierNoteVi: char.tierNoteVi,
                    stats: char.stats, ascensionMats: char.ascensionMats, talentMats: char.talentMats,
                    sands: char.sands, goblet: char.goblet, circlet: char.circlet, subStatsPriority: char.subStatsPriority,
                    bestWeapons: { create: char.bestWeapons },
                    bestArtifacts: { create: char.bestArtifacts },
                    teams: {
                        create: char.teams.map((t, teamIndex) => ({
                            name: t.name,
                            rank: t.rank,
                            description: t.description,
                            order: teamIndex,
                            members: {
                                create: t.members.map((m, memberIndex) => ({
                                    characterId: m.characterId,
                                    role: m.role,
                                    roleDesc: m.roleDesc,
                                    weapons: m.weapons,
                                    artifacts: m.artifacts,
                                    substats: m.substats,
                                    order: memberIndex
                                }))
                            }
                        }))
                    }
                }
            });
        }
        catch (e) {
            console.log(`Lỗi khi insert ${char.name}:`, e.message);
        }
    }
    console.log('Seed dữ liệu thành công!');
}
