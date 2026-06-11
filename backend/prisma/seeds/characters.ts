import axios from 'axios';
import { PrismaClient } from '@prisma/client';

// Hàm chuẩn hóa ID
const toId = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
// Hàm chuẩn hóa avatar url Enka
const toAvatar = (name: string) => `/images/avatars/${toId(name)}.png`;
const toSplash = (name: string) => `/images/splash/${toId(name)}.png`;

const metaBuilds = [
  {
    characterId: "traveler-pyro",
    talentPriority: ["Skill", "Burst", "Normal Attack"],
    bestWeapons: [
      { rank: 1, nameVi: "Tây Phong Kiếm", nameEn: "Favonius Sword", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Kích hoạt bạo kích có tỷ lệ sinh ra một lượng nhỏ Nguyên Tố Hạt Nhân, hồi năng lượng cho toàn đội.", passiveDescEn: "CRIT hits generate Energy particles, accelerating team Burst uptime.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Zephyrus.png" },
      { rank: 2, nameVi: "Khúc Ca Núi Đá", nameEn: "Peak Patrol Song", subStat: "Phòng Ngự%", isF2P: false, refinement: "R1", passiveDescVi: "Sau khi dùng Kỹ Năng Nguyên Tố hoặc Nộ, tăng sát thương cho toàn đội 24% trong 15s.", passiveDescEn: "After using Skill or Burst, increases party damage by 24% for 15s.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_XochitlsTube.png" },
      { rank: 3, nameVi: "Lời Thề Tự Do Cổ Xưa", nameEn: "Freedom-Sworn", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Kích hoạt phản ứng nguyên tố tăng Tấn Công đánh thường/trọng kích/tấn công khi đáp thêm 16% và Tấn Công 20% cho cả đội.", passiveDescEn: "Triggering reactions builds stacks; at max, boosts team's Normal/Charged/Plunging ATK by 16% and ATK by 20%.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Widsith.png" },
      { rank: 4, nameVi: "Chìa Khóa Khaj-Nisut", nameEn: "Key of Khaj-Nisut", subStat: "HP%", isF2P: false, refinement: "R1", passiveDescVi: "Gia tăng HP và chuyển hóa HP thành Tinh Thông Nguyên Tố cho toàn đội từ 100-200 điểm, tối ưu hóa phản ứng.", passiveDescEn: "HP% substat and passive grant team 100-200 Elemental Mastery, perfect for Vaporize/Melt.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Deshret.png" },
      { rank: 5, nameVi: "Kiếm Tế Lễ", nameEn: "Sacrificial Sword", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Khi Kỹ Năng Nguyên Tố gây sát thương có tỷ lệ làm mới thời gian chờ kỹ năng đó, cho phép kích hoạt kỹ năng liên tiếp.", passiveDescEn: "Resets Skill cooldown on hit, allowing double Tap Ring or Hold Coordinated attacks.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Fossil.png" }
    ],
    bestArtifacts: [
      {
        setNameVi: "Bức Tranh Dũng Sĩ Thành Tro Tàn", setNameEn: "Scroll of the Hero of Cinder City",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "ATK%", "DEF%"]
      },
      {
        setNameVi: "Thiên Nham Vững Chắc", setNameEn: "Tenacity of the Millelith",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "ATK%", "DEF%"]
      },
      {
        setNameVi: "Nghi Thức Tông Thất Cổ", setNameEn: "Noblesse Oblige",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "ATK%", "DEF%"]
      },
      {
        setNameVi: "Giáo Quan", setNameEn: "Instructor",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "ATK%", "DEF%"]
      },
      {
        setNameVi: "Mix 2 bộ Hiệu Quả Nạp +20%", setNameEn: "Mix 2 bộ Hiệu Quả Nạp +20%",
        pieces: 2,
        sands: ["Hiệu Quả Nạp", "Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "ATK%", "DEF%"]
      }
    ],
    bestTeams: ["kinich", "emilie", "bennett", "mavuika", "furina", "xilonen"]
  },
  {
    characterId: "durin",
    talentPriority: ["Burst", "Skill", "Normal Attack"],
    bestWeapons: [
      { rank: 1, nameVi: "Hắc Ám Xâm Thực", nameEn: "Athame Artis", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Vũ khí trấn phái tốt nhất, tăng Tinh Thông Nguyên Tố và kích hoạt hiệu ứng Hỏa bổ trợ khi phản ứng Bốc Hơi/Tan Chảy.", passiveDescEn: "Boosts Elemental Mastery and triggers an Adj. Pyro effect on Vaporize/Melt, syncing with many other Burst hits.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Motsognir.png" },
      { rank: 2, nameVi: "Bàn Nham Kết Lục", nameEn: "Primordial Jade Cutter", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tỷ Lệ Bạo Kích cực cao và tăng Tấn Công dựa trên HP, tăng sát thương ổn định không cần điều kiện.", passiveDescEn: "High CRIT Rate substat and bonus ATK based on HP, benefitting overall damage without condition.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Morax.png" },
      { rank: 3, nameVi: "Thương Diệu", nameEn: "Azurelight", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Hồi năng lượng sau khi thi triển Kỹ Năng Nguyên Tố giúp duy trì chu kỳ Nộ; đáp ứng rất tốt nhu cầu Hiệu Quả Nạp.", passiveDescEn: "Energy refund on Skill usage helps maintain Burst uptime; satisfies Energy Recharge needs.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Miekka.png" },
      { rank: 4, nameVi: "Ánh Sáng Đêm Sương Mù", nameEn: "Mistsplitter Reforged", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tăng Sát Thương Nguyên Tố qua các tầng cộng dồn bằng cách sử dụng Kỹ Năng Nộ, duy trì sát thương ngoài sân cực tốt.", passiveDescEn: "Grants Elemental DMG Bonus with stacks, obtainable via Burst usage for sustained off-field damage.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Narukami.png" },
      { rank: 5, nameVi: "Haran Geppaku Futsu", nameEn: "Haran Geppaku Futsu", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tăng Sát Thương Nguyên Tố theo đòn đánh của đồng đội, có sự phối hợp tốt để tăng sát thương Kỹ Năng Nộ.", passiveDescEn: "Increases Elemental DMG Bonus with teammates' Skills, party-wide synergy boosts Burst damage.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Haran.png" },
      { rank: 6, nameVi: "Xá Tội", nameEn: "Absolution", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Sát Thương Bạo Kích cao và nội tại tăng sát thương Kỹ Năng Nguyên Tố lẫn Kỹ Năng Nộ, hoàn hảo cho dạng chiến đấu của Durin.", passiveDescEn: "High CRIT DMG and a passive that enhances Burst and Skill damage, perfect for Durin's form.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Estoc.png" },
      { rank: 7, nameVi: "Kiếm Chước Phong", nameEn: "Summit Shaper", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Tăng hiệu quả khiên và Tấn Công khi có khiên; khuyên dùng kèm nhân vật tạo khiên để tối đa hóa sát thương Nộ và an toàn.", passiveDescEn: "Shield strength and ATK bonus when shielded; use with a shielder to maximize Burst damage and safety.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Kunwu.png" },
      { rank: 8, nameVi: "Ánh Lá Phán Quyết", nameEn: "Light of Foliar Incision", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tăng Sát Thương Bạo Kích và sát thương đòn đánh thường; điều kiện đánh thường dễ dàng đạt được trước khi thi triển Nộ.", passiveDescEn: "Boosts CRIT DMG and normal attack damage; the normal attack requirement is easily met before Burst.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Alhatham.png" },
      { rank: 9, nameVi: "Lời Thề Tự Do Cổ Xưa", nameEn: "Freedom-Sworn", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Tăng Tinh Thông Nguyên Tố và Tấn Công cho cả đội sau khi kích hoạt phản ứng; lựa chọn rất tốt cho đội Bốc Hơi/Tan Chảy.", passiveDescEn: "Increases party Elemental Mastery and ATK after triggering reactions; excellent for Vaporize/Melt teams.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Widsith.png" },
      { rank: 10, nameVi: "Nhạc Khúc Biển Sâu", nameEn: "Finale of the Deep", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Cung cấp lượng lớn Tấn Công và tăng sát thương sau khi dùng Kỹ Năng Nguyên Tố nhờ cơ chế Khế Ước Sinh Mệnh.", passiveDescEn: "Provides significant ATK and boosts damage after using Elemental Skill via Bond of Life mechanics.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Bourbon.png" },
      { rank: 11, nameVi: "Nanh Sói", nameEn: "Wolf-Fang", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R5", passiveDescVi: "Tăng sát thương Nguyên Tố và Nộ thông qua chỉ số Tỷ Lệ Bạo Kích; dễ dàng kích hoạt nội tại từ các đòn đánh ngoài sân.", passiveDescEn: "Boosts Skill and Burst damage with CRIT Rate substat; easy to trigger passive via off-field hits.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_WolfFang.png" },
      { rank: 12, nameVi: "Uraku Misugiri", nameEn: "Uraku Misugiri", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tăng sát thương đánh thường và Kỹ Năng Nguyên Tố; hiệu quả tăng sát thương kỹ năng có hiệu lực trước khi Durin biến hình.", passiveDescEn: "Increases normal attack and Elemental Skill damage; the Skill damage bonus applies before entering Durin form.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Chiori.png" },
      { rank: 13, nameVi: "Sắc Nước Lộng Lẫy", nameEn: "Splendor of Tranquil Waters", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tăng HP giúp gia tăng sát thương Nộ nếu được scale theo HP; đồng thời tăng sát thương Nguyên Tố khi kích hoạt Kỹ Năng Nguyên Tố.", passiveDescEn: "HP% substat boosts Burst damage if scaled by HP; also increases Elem. damage for pre-Burst setup.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Furina.png" },
      { rank: 14, nameVi: "Mảnh Trăng Ánh Sáng", nameEn: "Lightbearing Moonshard", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Chỉ số Tấn Công cơ bản cao và nội tại tăng toàn bộ Sát Thương Nguyên Tố, giúp gia tăng đáng kể sát thương từ các đòn Nộ.", passiveDescEn: "High base ATK and a passive that increases All Elemental DMG, benefitting all Burst hits.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_SilverwareSaw.png" },
      { rank: 15, nameVi: "Bình Minh Của Người Dệt Trăng", nameEn: "Moonweaver's Dawn", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Tăng Tinh Thông Nguyên Tố và buff Tinh Thông Nguyên Tố cho đồng đội sau khi kích hoạt phản ứng, tăng sát thương Bốc Hơi/Tan Chảy.", passiveDescEn: "Imparts Elemental Mastery and a team EM buff after reaction, enhancing Vaporize/Melt multipliers.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Miekka.png" }
    ],
    bestArtifacts: [
      {
        setNameVi: "Ngày Nổi Gió", setNameEn: "A Day Carved From Rising Winds",
        pieces: 4,
        sands: ["Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa", "Tấn Công%"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Elemental Mastery", "Energy Recharge"]
      },
      {
        setNameVi: "Giấc Mộng Hoàng Kim", setNameEn: "Gilded Dreams",
        pieces: 4,
        sands: ["Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa", "Tấn Công%"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Elemental Mastery", "Energy Recharge"]
      },
      {
        setNameVi: "Diệm Liệt Ma Nữ Cháy Rực", setNameEn: "Crimson Witch of Flames",
        pieces: 4,
        sands: ["Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa", "Tấn Công%"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Elemental Mastery", "Energy Recharge"]
      },
      {
        setNameVi: "Dấu Ấn Ngăn Cách", setNameEn: "Emblem of Severed Fate",
        pieces: 4,
        sands: ["Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa", "Tấn Công%"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Energy Recharge"]
      },
      {
        setNameVi: "Mix 2 bộ Ma Nữ / Tấn Công / Tinh Thông / Hiệu Quả Nạp", setNameEn: "Mix 2 bộ Ma Nữ / Tấn Công / Tinh Thông / Hiệu Quả Nạp",
        pieces: 2,
        sands: ["Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa", "Tấn Công%"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Elemental Mastery", "Energy Recharge"]
      }
    ],
    bestTeams: ["venti", "faruzan", "bennett", "kinich", "emilie", "xilonen", "navia", "albedo", "varka", "chevreuse", "ororon"]
  },
  {
    characterId: "hu-tao",
    talentPriority: ["Normal Attack", "Skill", "Burst"],
    bestWeapons: [
      { rank: 1, nameVi: "Trượng Hộ Ma", nameEn: "Trượng Hộ Ma", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Vũ khí 'trấn phái' tốt nhất, cung cấp lượng lớn HP và chuyển hóa máu thành Tấn Công cực mạnh.", passiveDescEn: "Vũ khí 'trấn phái' tốt nhất, cung cấp lượng lớn HP và chuyển hóa máu thành Tấn Công cực mạnh.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Homa.png" },
      { rank: 2, nameVi: "Quyền Trượng Cát Đỏ", nameEn: "Quyền Trượng Cát Đỏ", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Lựa chọn thay thế mạnh mẽ nếu build theo hướng Tinh Thông Nguyên Tố cao, chuyển hóa TTNT thành Tấn Công.", passiveDescEn: "Lựa chọn thay thế mạnh mẽ nếu build theo hướng Tinh Thông Nguyên Tố cao, chuyển hóa TTNT thành Tấn Công.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Deshret.png" },
      { rank: 3, nameVi: "Khúc Ca Vịnh Hẹp", nameEn: "Khúc Ca Vịnh Hẹp", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R5", passiveDescVi: "Vũ khí 4 sao BP cực tốt khi đi kèm đội hình có ít nhất 3 nguyên tố khác nhau để buff thêm Tinh Thông Nguyên Tố.", passiveDescEn: "Vũ khí 4 sao BP cực tốt khi đi kèm đội hình có ít nhất 3 nguyên tố khác nhau để buff thêm Tinh Thông Nguyên Tố.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Shanty.png" },
      { rank: 4, nameVi: "Bi Ca Lumidouce", nameEn: "Bi Ca Lumidouce", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Không khuyến nghị do dòng phụ tăng ST Vật Lý bị lãng phí và nội tại yêu cầu kích hoạt Kỹ Năng Nguyên Tố liên tục.", passiveDescEn: "Không khuyến nghị do dòng phụ tăng ST Vật Lý bị lãng phí và nội tại yêu cầu kích hoạt Kỹ Năng Nguyên Tố liên tục.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Muguet.png" },
      { rank: 5, nameVi: "Tai Ương Của Rồng", nameEn: "Tai Ương Của Rồng", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R5", passiveDescVi: "Lựa chọn 4 sao đột phá cho đội hình Bốc Hơi nhờ lượng TTNT dồi dào và tăng sát thương lên kẻ địch bị ấn Thủy/Hỏa.", passiveDescEn: "Lựa chọn 4 sao đột phá cho đội hình Bốc Hơi nhờ lượng TTNT dồi dào và tăng sát thương lên kẻ địch bị ấn Thủy/Hỏa.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Stardust.png" },
      { rank: 6, nameVi: "Thương Quyết Chiến", nameEn: "Thương Quyết Chiến", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Chỉ số Tỷ Lệ Bạo Kích rất cao giúp cân bằng chỉ số dễ dàng, tuy nhiên lượng buff Tấn Công không quá ấn tượng.", passiveDescEn: "Chỉ số Tỷ Lệ Bạo Kích rất cao giúp cân bằng chỉ số dễ dàng, tuy nhiên lượng buff Tấn Công không quá ấn tượng.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Gladiator.png" },
      { rank: 7, nameVi: "Hòa Phác Diên", nameEn: "Hòa Phác Diên", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích cao và cộng dồn Tấn Công ổn định, tuy nhiên cần thời gian để tích tầng nội tại.", passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích cao và cộng dồn Tấn Công ổn định, tuy nhiên cần thời gian để tích tầng nội tại.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Morax.png" },
      { rank: 8, nameVi: "Thương Thiên Nham", nameEn: "Thương Thiên Nham", subStat: "Tấn Công%", isF2P: false, refinement: "R5", passiveDescVi: "Cực mạnh trong đội hình nhiều nhân vật Liyue (như Xingqiu, Zhongli) để được tăng Tỷ Lệ Bạo Kích và Tấn Công%.", passiveDescEn: "Cực mạnh trong đội hình nhiều nhân vật Liyue (như Xingqiu, Zhongli) để được tăng Tỷ Lệ Bạo Kích và Tấn Công%.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Lapis.png" },
      { rank: 9, nameVi: "Mũi Nhọn Của Gió", nameEn: "Mũi Nhọn Của Gió", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí Event F2P tăng Tấn Công% và Tinh Thông Nguyên Tố sau khi kích hoạt phản ứng, lựa chọn tạm ổn khi thiếu thốn.", passiveDescEn: "Vũ khí Event F2P tăng Tấn Công% và Tinh Thông Nguyên Tố sau khi kích hoạt phản ứng, lựa chọn tạm ổn khi thiếu thốn.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Windvane.png" },
      { rank: 10, nameVi: "Thương Bạch Anh", nameEn: "Thương Bạch Anh", subStat: "Tỷ Lệ Bạo Kích", isF2P: true, refinement: "R5", passiveDescVi: "Lựa chọn 3 sao F2P cực tốt ở giai đoạn đầu game nhờ buff Tỷ Lệ Bạo Kích và tăng sát thương đòn đánh thường.", passiveDescEn: "Lựa chọn 3 sao F2P cực tốt ở giai đoạn đầu game nhờ buff Tỷ Lệ Bạo Kích và tăng sát thương đòn đánh thường.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Ruby.png" },
      { rank: 11, nameVi: "Thương Hắc Nham", nameEn: "Thương Hắc Nham", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp lượng lớn Sát Thương Bạo Kích nhưng nội tại yêu cầu hạ gục quái để kích hoạt, kém hiệu quả khi đấu Boss.", passiveDescEn: "Cung cấp lượng lớn Sát Thương Bạo Kích nhưng nội tại yêu cầu hạ gục quái để kích hoạt, kém hiệu quả khi đấu Boss.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Blackrock.png" },
      { rank: 12, nameVi: "Giáo Thập Tự Kitain", nameEn: "Giáo Thập Tự Kitain", subStat: "Tinh Thông Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí rèn F2P cung cấp Tinh Thông Nguyên Tố, tuy nhiên nội tại tiêu hao năng lượng không thực sự hữu dụng với Hu Tao.", passiveDescEn: "Vũ khí rèn F2P cung cấp Tinh Thông Nguyên Tố, tuy nhiên nội tại tiêu hao năng lượng không thực sự hữu dụng với Hu Tao.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Bakufu.png" },
      { rank: 13, nameVi: "Thù Lao Của Chính Nghĩa", nameEn: "Thù Lao Của Chính Nghĩa", subStat: "HP%", isF2P: true, refinement: "R5", passiveDescVi: "Không khuyến nghị do dòng phụ Hiệu Quả Nạp bị lãng phí và nội tại yêu cầu hồi máu, mâu thuẫn lối chơi thấp máu của cô.", passiveDescEn: "Không khuyến nghị do dòng phụ Hiệu Quả Nạp bị lãng phí và nội tại yêu cầu hồi máu, mâu thuẫn lối chơi thấp máu của cô.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Vorpal.png" }
    ],
    bestArtifacts: [
      {
        setNameVi: "Diệm Liệt Ma Nữ Cháy Rực", setNameEn: "Diệm Liệt Ma Nữ Cháy Rực",
        pieces: 4,
        sands: ["HP%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "Elemental Mastery", "HP%", "ATK%"]
      },
      {
        setNameVi: "Dòng Hồi Ức Bất Tận", setNameEn: "Dòng Hồi Ức Bất Tận",
        pieces: 4,
        sands: ["HP%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "Elemental Mastery", "HP%", "ATK%"]
      },
      {
        setNameVi: "Giấc Mộng Hoàng Kim", setNameEn: "Giấc Mộng Hoàng Kim",
        pieces: 4,
        sands: ["HP%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "Elemental Mastery", "HP%", "ATK%"]
      },
      {
        setNameVi: "Mix 2 bộ Sát Thương Hỏa & 2 bộ Tinh Thông / HP", setNameEn: "Mix 2 bộ Sát Thương Hỏa & 2 bộ Tinh Thông / HP",
        pieces: 2,
        sands: ["HP%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "Elemental Mastery", "HP%", "ATK%"]
      },
      {
        setNameVi: "Thợ Săn Marechaussee", setNameEn: "Thợ Săn Marechaussee",
        pieces: 4,
        sands: ["HP%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "Elemental Mastery", "HP%", "ATK%"]
      }
    ]
  },
  {
    characterId: "raiden-shogun",
    bestWeapons: [
      { rank: 1, nameVi: "Đoạn Thảo Kính Phạt", nameEn: "Đoạn Thảo Kính Phạt", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Trấn phái hoàn hảo nhất, tăng mạnh Hiệu Quả Nạp và chuyển hóa nó thành Tấn Công%.", passiveDescEn: "Trấn phái hoàn hảo nhất, tăng mạnh Hiệu Quả Nạp và chuyển hóa nó thành Tấn Công%.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Narukami.png" },
      { rank: 2, nameVi: "Trượng Hộ Ma", nameEn: "Trượng Hộ Ma", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp lượng lớn Sát Thương Bạo Kích và Tấn Công% khi máu dưới 50%, là vũ khí đa dụng rất mạnh.", passiveDescEn: "Cung cấp lượng lớn Sát Thương Bạo Kích và Tấn Công% khi máu dưới 50%, là vũ khí đa dụng rất mạnh.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Homa.png" },
      { rank: 3, nameVi: "Quyền Trượng Cát Đỏ", nameEn: "Quyền Trượng Cát Đỏ", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Chuyển đổi Tinh Thông Nguyên Tố thành Tấn Công%, rất hữu dụng trong các đội hình phản ứng nguyên tố.", passiveDescEn: "Chuyển đổi Tinh Thông Nguyên Tố thành Tấn Công%, rất hữu dụng trong các đội hình phản ứng nguyên tố.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Deshret.png" },
      { rank: 4, nameVi: "Khúc Ca Hòa Điệu", nameEn: "Khúc Ca Hòa Điệu", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Lựa chọn tình huống cung cấp Hiệu Quả Nạp và buff cho đội, tuy không tối ưu nhưng vẫn dùng tốt.", passiveDescEn: "Lựa chọn tình huống cung cấp Hiệu Quả Nạp và buff cho đội, tuy không tối ưu nhưng vẫn dùng tốt.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Trident.png" },
      { rank: 5, nameVi: "Khúc Ca Vườn Sáng", nameEn: "Khúc Ca Vườn Sáng", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Không quá lý tưởng cho Raiden, ưu tiên lựa chọn khác trừ khi đội hình cần hiệu quả hỗ trợ của nó.", passiveDescEn: "Không quá lý tưởng cho Raiden, ưu tiên lựa chọn khác trừ khi đội hình cần hiệu quả hỗ trợ của nó.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Muguet.png" },
      { rank: 6, nameVi: "Hòa Phát Diên", nameEn: "Hòa Phát Diên", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Đem lại lượng lớn Tỷ Lệ Bạo Kích và tăng dần Tấn Công%, lựa chọn DPS tổng thể rất ổn định.", passiveDescEn: "Đem lại lượng lớn Tỷ Lệ Bạo Kích và tăng dần Tấn Công%, lựa chọn DPS tổng thể rất ổn định.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Morax.png" },
      { rank: 7, nameVi: "Hủy Diệt", nameEn: "Hủy Diệt", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp chỉ số Tấn Công% cực cao và buff cho Kỹ Năng Nguyên Tố, cạnh tranh tốt ở mức tinh luyện thấp.", passiveDescEn: "Cung cấp chỉ số Tấn Công% cực cao và buff cho Kỹ Năng Nguyên Tố, cạnh tranh tốt ở mức tinh luyện thấp.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Santika.png" },
      { rank: 8, nameVi: "Thương Quyết Chiến", nameEn: "Thương Quyết Chiến", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Vũ khí phân khúc giá rẻ giúp tăng Tỷ Lệ Bạo Kích, hiệu quả khi solo hoặc đối phó với ít kẻ địch.", passiveDescEn: "Vũ khí phân khúc giá rẻ giúp tăng Tỷ Lệ Bạo Kích, hiệu quả khi solo hoặc đối phó với ít kẻ địch.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Gladiator.png" },
      { rank: 9, nameVi: "Giáo Nịnh Thần", nameEn: "Giáo Nịnh Thần", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Tăng hiệu quả Khiên và Tấn Công%, yêu cầu có nhân vật tạo khiên trong đội để phát huy tối đa sức mạnh.", passiveDescEn: "Tăng hiệu quả Khiên và Tấn Công%, yêu cầu có nhân vật tạo khiên trong đội để phát huy tối đa sức mạnh.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Kunwu.png" },
      { rank: 10, nameVi: "Lao Xiên Cá", nameEn: "Lao Xiên Cá", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí F2P tốt nhất cho Raiden, tăng trực tiếp sát thương Nộ và Tỷ Lệ Bạo Kích của kỹ năng Nộ.", passiveDescEn: "Vũ khí F2P tốt nhất cho Raiden, tăng trực tiếp sát thương Nộ và Tỷ Lệ Bạo Kích của kỹ năng Nộ.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Mori.png" },
      { rank: 11, nameVi: "Xương Sống Thiên Không", nameEn: "Xương Sống Thiên Không", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Hiệu Quả Nạp và Tỷ Lệ Bạo Kích, là vũ khí đa dụng ổn nhưng dễ bị thay thế bởi lựa chọn khác.", passiveDescEn: "Cung cấp Hiệu Quả Nạp và Tỷ Lệ Bạo Kích, là vũ khí đa dụng ổn nhưng dễ bị thay thế bởi lựa chọn khác.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Dvalin.png" },
      { rank: 12, nameVi: "Vây Cá Chẻ Sóng", nameEn: "Vây Cá Chẻ Sóng", subStat: "Tấn Công%", isF2P: false, refinement: "R5", passiveDescVi: "Sát thương Nộ tăng theo tổng năng lượng tiêu hao của cả đội, cực mạnh trong các đội hình tốn nhiều năng lượng.", passiveDescEn: "Sát thương Nộ tăng theo tổng năng lượng tiêu hao của cả đội, cực mạnh trong các đội hình tốn nhiều năng lượng.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Maria.png" },
      { rank: 13, nameVi: "Thương Lập Kiếm", nameEn: "Thương Lập Kiếm", subStat: "Tấn Công%", isF2P: false, refinement: "R5", passiveDescVi: "Tăng mạnh Tấn Công% và Tỷ Lệ Bạo Kích dựa trên số thành viên Liyue trong đội hình.", passiveDescEn: "Tăng mạnh Tấn Công% và Tỷ Lệ Bạo Kích dựa trên số thành viên Liyue trong đội hình.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Lapis.png" },
      { rank: 14, nameVi: "Thương Tây Phong", nameEn: "Thương Tây Phong", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Ưu tiên nạp năng lượng cho cả đội thay vì sát thương cá nhân, tạo nhiều hạt nhân lượng khi bạo kích.", passiveDescEn: "Ưu tiên nạp năng lượng cho cả đội thay vì sát thương cá nhân, tạo nhiều hạt nhân lượng khi bạo kích.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Zephyrus.png" }
    ],
    talentPriority: ["Burst", "Skill", "Normal Attack"],
    bestArtifacts: [
      {
        setNameVi: "Dấu Ấn Ngăn Cách", setNameEn: "Dấu Ấn Ngăn Cách",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Lôi", "Tấn Công%"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Energy Recharge", "Elemental Mastery"]
      },
      {
        setNameVi: "Nghi Thức Tông Thất Cổ", setNameEn: "Nghi Thức Tông Thất Cổ",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Lôi", "Tấn Công%"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Energy Recharge", "Elemental Mastery"]
      },
      {
        setNameVi: "Mix 2 bộ Lôi & Tông Thất & Tấn Công & Dấu Ấn", setNameEn: "Mix 2 bộ Lôi & Tông Thất & Tấn Công & Dấu Ấn",
        pieces: 2,
        sands: ["Hiệu Quả Nạp", "Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Lôi", "Tấn Công%"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Energy Recharge", "Elemental Mastery"]
      },
      {
        setNameVi: "Thiên Nham Vững Chắc", setNameEn: "Thiên Nham Vững Chắc",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Lôi", "Tấn Công%"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Energy Recharge", "Elemental Mastery"]
      }
    ],
    bestTeams: ["kujou-sara", "kazuha", "bennett", "xiangling", "xingqiu", "chevreuse", "nahida", "yelan", "baizhu", "eula", "rosaria"]
  },
  {
    characterId: "zhongli",
    bestWeapons: [
      { rank: 1, nameVi: "Trượng Hộ Ma", nameEn: "Trượng Hộ Ma", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Dòng phụ Sát Thương Bạo Kích cao và khả năng chuyển hóa HP thành Tấn Công giúp gia tăng đáng kể sát thương của Kỹ Năng Nộ.", passiveDescEn: "Dòng phụ Sát Thương Bạo Kích cao và khả năng chuyển hóa HP thành Tấn Công giúp gia tăng đáng kể sát thương của Kỹ Năng Nộ.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Homa.png" },
      { rank: 2, nameVi: "Bi Ca Lumidouce", nameEn: "Bi Ca Lumidouce", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp lượng lớn Hiệu Quả Nạp và buff Tinh Thông Nguyên Tố/Tấn Công cho toàn đội sau khi dùng Kỹ Năng Nguyên Tố, tuy nhiên sát thương Nộ sẽ thấp hơn.", passiveDescEn: "Cung cấp lượng lớn Hiệu Quả Nạp và buff Tinh Thông Nguyên Tố/Tấn Công cho toàn đội sau khi dùng Kỹ Năng Nguyên Tố, tuy nhiên sát thương Nộ sẽ thấp hơn.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Muguet.png" },
      { rank: 3, nameVi: "Hòa Phát Diên", nameEn: "Hòa Phát Diên", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tấn Công cơ bản và Tỷ Lệ Bạo Kích cao. Nội tại tăng Tấn Công khi đánh trúng kẻ địch, giúp tích tầng trước khi thả Q.", passiveDescEn: "Tấn Công cơ bản và Tỷ Lệ Bạo Kích cao. Nội tại tăng Tấn Công khi đánh trúng kẻ địch, giúp tích tầng trước khi thả Q.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Morax.png" },
      { rank: 4, nameVi: "Xương Sống Thiên Không", nameEn: "Xương Sống Thiên Không", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp lượng lớn Hiệu Quả Nạp và thêm Tỷ Lệ Bạo Kích. Nội tại tạo thêm các đòn đánh AoE nhỏ sau khi dùng Kỹ Năng Nộ.", passiveDescEn: "Cung cấp lượng lớn Hiệu Quả Nạp và thêm Tỷ Lệ Bạo Kích. Nội tại tạo thêm các đòn đánh AoE nhỏ sau khi dùng Kỹ Năng Nộ.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Dvalin.png" },
      { rank: 5, nameVi: "Giáo Nịnh Thần", nameEn: "Giáo Nịnh Thần", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Tấn Công cơ bản và Tấn Công% cao nhưng yêu cầu duy trì khiên để nhận toàn bộ nội tại. Rất phù hợp với khiên tự tạo của Zhongli.", passiveDescEn: "Tấn Công cơ bản và Tấn Công% cao nhưng yêu cầu duy trì khiên để nhận toàn bộ nội tại. Rất phù hợp với khiên tự tạo của Zhongli.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Kunwu.png" },
      { rank: 6, nameVi: "Hủy Diệt", nameEn: "Hủy Diệt", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Tấn Công cơ bản và Tấn Công% cực cao sau khi dùng Kỹ Năng Nguyên Tố. Tốt cho sát thương nhưng cần thời gian đứng sân để kích hoạt.", passiveDescEn: "Tấn Công cơ bản và Tấn Công% cực cao sau khi dùng Kỹ Năng Nguyên Tố. Tốt cho sát thương nhưng cần thời gian đứng sân để kích hoạt.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Santika.png" },
      { rank: 7, nameVi: "Lao Xiên Cá", nameEn: "Lao Xiên Cá", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Tăng Tỷ Lệ Bạo Kích và sát thương của Kỹ Năng Nộ cùng Hiệu Quả Nạp. Lựa chọn F2P tuyệt vời giúp tối ưu hóa chu kỳ ra chiêu.", passiveDescEn: "Tăng Tỷ Lệ Bạo Kích và sát thương của Kỹ Năng Nộ cùng Hiệu Quả Nạp. Lựa chọn F2P tuyệt vời giúp tối ưu hóa chu kỳ ra chiêu.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Mori.png" },
      { rank: 8, nameVi: "Thương Quyết Chiến", nameEn: "Thương Quyết Chiến", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích và thêm Tấn Công khi có kẻ địch ở gần. Thích hợp để build sát thương nhưng ít hỗ trợ nạp năng lượng.", passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích và thêm Tấn Công khi có kẻ địch ở gần. Thích hợp để build sát thương nhưng ít hỗ trợ nạp năng lượng.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Gladiator.png" },
      { rank: 9, nameVi: "Đoạn Thảo Kính Phạt", nameEn: "Đoạn Thảo Kính Phạt", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Hiệu Quả Nạp cực cao và chuyển hóa dòng nạp thành Tấn Công%. Rất dễ bị thừa Nạp, nên cân nhắc kết hợp với đồng hồ Nạp nếu cần.", passiveDescEn: "Hiệu Quả Nạp cực cao và chuyển hóa dòng nạp thành Tấn Công%. Rất dễ bị thừa Nạp, nên cân nhắc kết hợp với đồng hồ Nạp nếu cần.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Narukami.png" },
      { rank: 10, nameVi: "Thương Thiên Nham", nameEn: "Thương Thiên Nham", subStat: "Tấn Công%", isF2P: false, refinement: "R5", passiveDescVi: "Tăng Tỷ Lệ Bạo Kích và Tấn Công% dựa trên số lượng nhân vật Liyue trong đội. Đạt hiệu quả cực cao trong đội hình thuần Liyue.", passiveDescEn: "Tăng Tỷ Lệ Bạo Kích và Tấn Công% dựa trên số lượng nhân vật Liyue trong đội. Đạt hiệu quả cực cao trong đội hình thuần Liyue.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Lapis.png" },
      { rank: 11, nameVi: "Thương Hắc Nham", nameEn: "Thương Hắc Nham", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Sát Thương Bạo Kích. Nội tại tăng Tấn Công sau khi hạ gục kẻ địch, nhưng không ổn định khi đối đầu với Boss đơn mục tiêu.", passiveDescEn: "Cung cấp Sát Thương Bạo Kích. Nội tại tăng Tấn Công sau khi hạ gục kẻ địch, nhưng không ổn định khi đối đầu với Boss đơn mục tiêu.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Blackrock.png" },
      { rank: 12, nameVi: "Mũi Nhọn Của Gió", nameEn: "Mũi Nhọn Của Gió", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí cán dài F2P cung cấp Tấn Công% và nội tại tăng Tấn Công% sau khi kích hoạt phản ứng nguyên tố. Tạm ổn cho lối chơi sát thương Nộ.", passiveDescEn: "Vũ khí cán dài F2P cung cấp Tấn Công% và nội tại tăng Tấn Công% sau khi kích hoạt phản ứng nguyên tố. Tạm ổn cho lối chơi sát thương Nộ.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Windvane.png" },
      { rank: 13, nameVi: "Thương Tây Phong", nameEn: "Thương Tây Phong", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Hiệu Quả Nạp cao và sinh hạt nhân lượng cho toàn đội. Cần ưu tiên chỉ số Tỷ Lệ Bạo Kích để dễ kích hoạt nội tại.", passiveDescEn: "Hiệu Quả Nạp cao và sinh hạt nhân lượng cho toàn đội. Cần ưu tiên chỉ số Tỷ Lệ Bạo Kích để dễ kích hoạt nội tại.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Zephyrus.png" }
    ],
    talentPriority: ["Skill", "Burst", "Normal Attack"],
    bestArtifacts: [
      {
        setNameVi: "Phiến Đá Lâu Đời", setNameEn: "Phiến Đá Lâu Đời",
        pieces: 4,
        sands: ["HP%"],
        goblet: ["HP%"],
        circlet: ["HP%", "Tỷ Lệ Bạo Kích"],
        subStatsPriority: ["HP%", "HP", "Energy Recharge"]
      },
      {
        setNameVi: "Bức Tranh Dũng Sĩ Thành Tro Tàn", setNameEn: "Bức Tranh Dũng Sĩ Thành Tro Tàn",
        pieces: 4,
        sands: ["HP%"],
        goblet: ["HP%"],
        circlet: ["HP%", "Tỷ Lệ Bạo Kích"],
        subStatsPriority: ["HP%", "HP", "Energy Recharge"]
      },
      {
        setNameVi: "Ký Ức Rừng Sâu", setNameEn: "Ký Ức Rừng Sâu",
        pieces: 4,
        sands: ["HP%"],
        goblet: ["HP%"],
        circlet: ["HP%", "Tỷ Lệ Bạo Kích"],
        subStatsPriority: ["HP%", "HP", "Energy Recharge"]
      },
      {
        setNameVi: "Giáo Quan", setNameEn: "Giáo Quan",
        pieces: 4,
        sands: ["HP%"],
        goblet: ["HP%"],
        circlet: ["HP%", "Tỷ Lệ Bạo Kích"],
        subStatsPriority: ["HP%", "HP", "Energy Recharge"]
      },
      {
        setNameVi: "Thiên Nham Vững Chắc", setNameEn: "Thiên Nham Vững Chắc",
        pieces: 4,
        sands: ["HP%"],
        goblet: ["HP%"],
        circlet: ["HP%", "Tỷ Lệ Bạo Kích"],
        subStatsPriority: ["HP%", "HP", "Energy Recharge"]
      },
      {
        setNameVi: "Mix 2 bộ Vầng Sáng Vourukasha & 2 bộ Thiên Nham Vững Chắc", setNameEn: "Mix 2 bộ Vầng Sáng Vourukasha & 2 bộ Thiên Nham Vững Chắc",
        pieces: 2,
        sands: ["HP%"],
        goblet: ["HP%"],
        circlet: ["HP%", "Tỷ Lệ Bạo Kích"],
        subStatsPriority: ["HP%", "HP", "Energy Recharge"]
      }
    ],
    bestTeams: ["keqing", "fischl", "xiao", "jean", "albedo", "hu-tao", "xingqiu", "kazuha", "ganyu", "mona", "venti", "ayaka", "eula", "chongyun", "xiangling", "bennett"]
  },
  {
    characterId: "neuvillette",
    bestWeapons: [
      { rank: 1, nameVi: "Nghi Thức Dòng Chảy Vĩnh Hằng", nameEn: "Nghi Thức Dòng Chảy Vĩnh Hằng", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Vũ khí trấn phái tốt nhất. Cung cấp chỉ số Sát Thương Bạo Kích cực cao, tăng HP% và gia tăng mạnh sát thương đòn Trọng Kích. Nội tại hoàn hảo cho cơ chế tăng giảm HP của Neuvillette.", passiveDescEn: "Vũ khí trấn phái tốt nhất. Cung cấp chỉ số Sát Thương Bạo Kích cực cao, tăng HP% và gia tăng mạnh sát thương đòn Trọng Kích. Nội tại hoàn hảo cho cơ chế tăng giảm HP của Neuvillette.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Iudex.png" },
      { rank: 2, nameVi: "Ngọc Quý Lưu Trong Biển Chết", nameEn: "Ngọc Quý Lưu Trong Biển Chết", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Vũ khí từ Nhật Ký Hành Trình cực kỳ mạnh mẽ, cung cấp lượng lớn Tỷ Lệ Bạo Kích và tăng mạnh HP% khi ở trong hàng chờ, cực kỳ thích hợp cho Neuvillette.", passiveDescEn: "Vũ khí từ Nhật Ký Hành Trình cực kỳ mạnh mẽ, cung cấp lượng lớn Tỷ Lệ Bạo Kích và tăng mạnh HP% khi ở trong hàng chờ, cực kỳ thích hợp cho Neuvillette.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Yue.png" },
      { rank: 3, nameVi: "Thời Khắc Lướt Sóng", nameEn: "Thời Khắc Lướt Sóng", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Pháp khí tăng chỉ số Sát Thương Bạo Kích lớn. Dù nội tại tập trung vào phản ứng Bốc Hơi của đòn đánh thường, vũ khí này vẫn là một 'stat stick' rất tốt cho Neuvillette.", passiveDescEn: "Pháp khí tăng chỉ số Sát Thương Bạo Kích lớn. Dù nội tại tập trung vào phản ứng Bốc Hơi của đòn đánh thường, vũ khí này vẫn là một 'stat stick' rất tốt cho Neuvillette.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_MechaPufferfish.png" },
      { rank: 4, nameVi: "Chân Ngôn Bí Hạp", nameEn: "Chân Ngôn Bí Hạp", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Một vũ khí tăng chỉ số Sát Thương Bạo Kích khác. Cung cấp Tỷ Lệ Bạo Kích nhỏ và gia tăng chỉ số Tinh Thông Nguyên Tố sau khi dùng Kỹ Năng Nguyên Tố.", passiveDescEn: "Một vũ khí tăng chỉ số Sát Thương Bạo Kích khác. Cung cấp Tỷ Lệ Bạo Kích nhỏ và gia tăng chỉ số Tinh Thông Nguyên Tố sau khi dùng Kỹ Năng Nguyên Tố.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Sistrum.png" },
      { rank: 5, nameVi: "Ngọc Bích Huy Hoàng", nameEn: "Ngọc Bích Huy Hoàng", subStat: "HP%", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp HP% lớn và hồi năng lượng sau khi dùng Kỹ Năng Nộ. Giúp giảm bớt áp lực Hiệu Quả Nạp cho Neuvillette và tăng sát thương dựa trên HP.", passiveDescEn: "Cung cấp HP% lớn và hồi năng lượng sau khi dùng Kỹ Năng Nộ. Giúp giảm bớt áp lực Hiệu Quả Nạp cho Neuvillette và tăng sát thương dựa trên HP.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Morax.png" },
      { rank: 6, nameVi: "Mẫu Kim Phách", nameEn: "Mẫu Kim Phách", subStat: "HP%", isF2P: true, refinement: "R5", passiveDescVi: "Lựa chọn rèn F2P hoàn hảo nhất. Tăng rất nhiều HP% và hỗ trợ hồi năng lượng cũng như hồi một lượng máu nhỏ cho toàn đội sau khi thi triển Nộ.", passiveDescEn: "Lựa chọn rèn F2P hoàn hảo nhất. Tăng rất nhiều HP% và hỗ trợ hồi năng lượng cũng như hồi một lượng máu nhỏ cho toàn đội sau khi thi triển Nộ.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Proto.png" },
      { rank: 7, nameVi: "Quản Đốc Vàng Ròng", nameEn: "Quản Đốc Vàng Ròng", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Chỉ số chính Tăng Tấn Công không quá hữu ích, nhưng dòng phụ Tỷ Lệ Bạo Kích cao và nội tại tăng sát thương Trọng Kích khi HP thay đổi vẫn rất ổn.", passiveDescEn: "Chỉ số chính Tăng Tấn Công không quá hữu ích, nhưng dòng phụ Tỷ Lệ Bạo Kích cao và nội tại tăng sát thương Trọng Kích khi HP thay đổi vẫn rất ổn.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Wheatley.png" },
      { rank: 8, nameVi: "Chương Nhạc Lang Thang", nameEn: "Chương Nhạc Lang Thang", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R5", passiveDescVi: "Cung cấp Sát Thương Bạo Kích lớn. Các hiệu ứng buff Tinh Thông Nguyên Tố hoặc Sát Thương Nguyên Tố rất tốt, nhưng buff Tấn Công% sẽ bị lãng phí.", passiveDescEn: "Cung cấp Sát Thương Bạo Kích lớn. Các hiệu ứng buff Tinh Thông Nguyên Tố hoặc Sát Thương Nguyên Tố rất tốt, nhưng buff Tấn Công% sẽ bị lãng phí.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Troupe.png" },
      { rank: 9, nameVi: "Chân Ý Của Kagura", nameEn: "Chân Ý Của Kagura", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Đóng vai trò làm vũ khí tăng chỉ số Sát Thương Bạo Kích. Nội tại tăng sát thương Kỹ Năng Nguyên Tố nhưng Neuvillette không tận dụng được tối đa.", passiveDescEn: "Đóng vai trò làm vũ khí tăng chỉ số Sát Thương Bạo Kích. Nội tại tăng sát thương Kỹ Năng Nguyên Tố nhưng Neuvillette không tận dụng được tối đa.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Narukami.png" },
      { rank: 10, nameVi: "Điển Tích Tây Phong", nameEn: "Điển Tích Tây Phong", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích cao và tăng tốc độ di chuyển. Tăng dần Sát Thương Nguyên Tố khi đứng sân lâu, phù hợp với thời gian đứng sân của Neuvillette.", passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích cao và tăng tốc độ di chuyển. Tăng dần Sát Thương Nguyên Tố khi đứng sân lâu, phù hợp với thời gian đứng sân của Neuvillette.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Fourwinds.png" },
      { rank: 11, nameVi: "Sừng Rượu Vân Xanh", nameEn: "Sừng Rượu Vân Xanh", subStat: "HP%", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí sự kiện F2P cung cấp HP%. Chỉ nên sử dụng nếu bạn hoàn toàn không có Mẫu Kim Phách hoặc các pháp khí tăng chỉ số khác.", passiveDescEn: "Vũ khí sự kiện F2P cung cấp HP%. Chỉ nên sử dụng nếu bạn hoàn toàn không có Mẫu Kim Phách hoặc các pháp khí tăng chỉ số khác.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_ConchSprayer.png" }
    ],
    talentPriority: ["Normal Attack", "Burst", "Skill"],
    bestArtifacts: [
      {
        setNameVi: "Thợ Săn Marechaussee", setNameEn: "Thợ Săn Marechaussee",
        pieces: 4,
        sands: ["HP%"],
        goblet: ["Sát Thương Nguyên Tố Thủy", "HP%"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "HP%"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "HP%", "HP"]
      },
      {
        setNameVi: "Trái Tim Trầm Luân", setNameEn: "Trái Tim Trầm Luân",
        pieces: 4,
        sands: ["HP%"],
        goblet: ["Sát Thương Nguyên Tố Thủy", "HP%"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "HP%"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "HP%", "HP"]
      },
      {
        setNameVi: "Mix 2 bộ Thủy / HP / Thợ Săn", setNameEn: "Mix 2 bộ Thủy / HP / Thợ Săn",
        pieces: 2,
        sands: ["HP%"],
        goblet: ["Sát Thương Nguyên Tố Thủy", "HP%"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "HP%"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "HP%", "HP"]
      },
      {
        setNameVi: "Sao Băng Bay Ngược", setNameEn: "Sao Băng Bay Ngược",
        pieces: 4,
        sands: ["HP%"],
        goblet: ["Sát Thương Nguyên Tố Thủy", "HP%"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "HP%"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "HP%", "HP"]
      },
      {
        setNameVi: "Đoàn Hát Lang Thang Đại Lục", setNameEn: "Đoàn Hát Lang Thang Đại Lục",
        pieces: 4,
        sands: ["HP%"],
        goblet: ["Sát Thương Nguyên Tố Thủy", "HP%"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "HP%"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "HP%", "HP"]
      },
      {
        setNameVi: "Giấc Mộng Thủy Tiên", setNameEn: "Giấc Mộng Thủy Tiên",
        pieces: 4,
        sands: ["HP%"],
        goblet: ["Sát Thương Nguyên Tố Thủy", "HP%"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "HP%"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "HP%", "HP"]
      }
    ],
    bestTeams: ["furina", "nahida", "raiden-shogun", "xiangling", "kazuha", "bennett", "yae-miko", "kuki-shinobu", "baizhu"]
  },
  {
    characterId: "furina",
    bestWeapons: [
      { rank: 1, nameVi: "Sắc Nước Thuần Khiết", nameEn: "Sắc Nước Thuần Khiết", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Vũ khí trấn phái tốt nhất. Tăng mạnh sát thương Kỹ Năng Nguyên Tố và buff lượng HP tối đa khi máu đồng đội thay đổi liên tục.", passiveDescEn: "Vũ khí trấn phái tốt nhất. Tăng mạnh sát thương Kỹ Năng Nguyên Tố và buff lượng HP tối đa khi máu đồng đội thay đổi liên tục.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Regalis.png" },
      { rank: 2, nameVi: "Bàn Nham Kết Lục", nameEn: "Bàn Nham Kết Lục", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích cực cao và lượng lớn Tấn Công dựa trên HP tối đa, giúp tăng mạnh sát thương và khả năng sinh tồn.", passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích cực cao và lượng lớn Tấn Công dựa trên HP tối đa, giúp tăng mạnh sát thương và khả năng sinh tồn.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Morax.png" },
      { rank: 3, nameVi: "Răng Nanh Rỉ Sét", nameEn: "Răng Nanh Rỉ Sét", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí sự kiện F2P tuyệt vời. Cung cấp Hiệu Quả Nạp lớn và gia tăng trực tiếp sát thương cũng như Tỷ Lệ Bạo Kích của Kỹ Năng Nguyên Tố.", passiveDescEn: "Vũ khí sự kiện F2P tuyệt vời. Cung cấp Hiệu Quả Nạp lớn và gia tăng trực tiếp sát thương cũng như Tỷ Lệ Bạo Kích của Kỹ Năng Nguyên Tố.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Magnum.png" },
      { rank: 4, nameVi: "Chìa Khóa Khaj-Nisut", nameEn: "Chìa Khóa Khaj-Nisut", subStat: "HP%", isF2P: false, refinement: "R1", passiveDescVi: "Chỉ số HP% khổng lồ và nội tại tăng Tinh Thông Nguyên Tố cho bản thân cùng toàn đội, cực kỳ thích hợp cho các đội hình phản ứng.", passiveDescEn: "Chỉ số HP% khổng lồ và nội tại tăng Tinh Thông Nguyên Tố cho bản thân cùng toàn đội, cực kỳ thích hợp cho các đội hình phản ứng.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Deshret.png" },
      { rank: 5, nameVi: "Uraku Misugiri", nameEn: "Uraku Misugiri", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Vũ khí tăng mạnh Sát Thương Bạo Kích và Kỹ Năng Nguyên Tố. Nội tại sẽ đạt hiệu quả tối đa khi trong đội có nhân vật hệ Nham.", passiveDescEn: "Vũ khí tăng mạnh Sát Thương Bạo Kích và Kỹ Năng Nguyên Tố. Nội tại sẽ đạt hiệu quả tối đa khi trong đội có nhân vật hệ Nham.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Needle.png" },
      { rank: 6, nameVi: "Ống Đồng Yêu Sinh Mệnh", nameEn: "Ống Đồng Yêu Sinh Mệnh", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí F2P từ hội Câu Cá Fontaine, giải quyết triệt để vấn đề nạp cho Furina đồng thời tăng Tỷ Lệ Bạo Kích cho Kỹ Năng Nguyên Tố.", passiveDescEn: "Vũ khí F2P từ hội Câu Cá Fontaine, giải quyết triệt để vấn đề nạp cho Furina đồng thời tăng Tỷ Lệ Bạo Kích cho Kỹ Năng Nguyên Tố.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Machination.png" },
      { rank: 7, nameVi: "Tây Phong Kiếm", nameEn: "Tây Phong Kiếm", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Cung cấp Hiệu Quả Nạp cao và tạo thêm nhiều hạt nhân lượng để sạc cho bản thân cũng như hỗ trợ nạp năng lượng cho toàn đội.", passiveDescEn: "Cung cấp Hiệu Quả Nạp cao và tạo thêm nhiều hạt nhân lượng để sạc cho bản thân cũng như hỗ trợ nạp năng lượng cho toàn đội.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Zephyrus.png" },
      { rank: 8, nameVi: "Nanh Sói", nameEn: "Nanh Sói", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Vũ khí từ Nhật Ký Hành Trình tăng Tỷ Lệ Bạo Kích và gia tăng sát thương Kỹ Năng Nguyên Tố/Nộ, giúp tối ưu lượng sát thương ngoài sân.", passiveDescEn: "Vũ khí từ Nhật Ký Hành Trình tăng Tỷ Lệ Bạo Kích và gia tăng sát thương Kỹ Năng Nguyên Tố/Nộ, giúp tối ưu lượng sát thương ngoài sân.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Boreas.png" },
      { rank: 9, nameVi: "Haran Geppaku Futsu", nameEn: "Haran Geppaku Futsu", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Dòng phụ Tỷ Lệ Bạo Kích cao và tăng nhẹ Sát Thương Nguyên Tố, là lựa chọn tăng chỉ số tốt cho Furina.", passiveDescEn: "Dòng phụ Tỷ Lệ Bạo Kích cao và tăng nhẹ Sát Thương Nguyên Tố, là lựa chọn tăng chỉ số tốt cho Furina.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Amenoma.png" },
      { rank: 10, nameVi: "Ánh Lá Phán Quyết", nameEn: "Ánh Lá Phán Quyết", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp lượng lớn Sát Thương Bạo Kích và một ít Tỷ Lệ Bạo Kích, thích hợp sử dụng như một vũ khí thuần tăng chỉ số bạo.", passiveDescEn: "Cung cấp lượng lớn Sát Thương Bạo Kích và một ít Tỷ Lệ Bạo Kích, thích hợp sử dụng như một vũ khí thuần tăng chỉ số bạo.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Ayus.png" },
      { rank: 11, nameVi: "Ánh Sáng Đêm Sương Mù", nameEn: "Ánh Sáng Đêm Sương Mù", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tăng mạnh Sát Thương Bạo Kích và Sát Thương Nguyên Tố. Tuy nhiên việc tích luỹ đủ tầng đòi hỏi Furina phải đứng sân đánh thường.", passiveDescEn: "Tăng mạnh Sát Thương Bạo Kích và Sát Thương Nguyên Tố. Tuy nhiên việc tích luỹ đủ tầng đòi hỏi Furina phải đứng sân đánh thường.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Narukami.png" },
      { rank: 12, nameVi: "Thiên Không Kiếm", nameEn: "Thiên Không Kiếm", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Giải quyết tốt vấn đề nạp cho Furina và cung cấp một lượng nhỏ Tỷ Lệ Bạo Kích, giúp tối ưu chu kỳ thi triển Kỹ Năng Nộ.", passiveDescEn: "Giải quyết tốt vấn đề nạp cho Furina và cung cấp một lượng nhỏ Tỷ Lệ Bạo Kích, giúp tối ưu chu kỳ thi triển Kỹ Năng Nộ.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Dvalin.png" },
      { rank: 13, nameVi: "Kiếm Bến Tàu", nameEn: "Kiếm Bến Tàu", subStat: "HP%", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí 4 sao giới hạn tăng chỉ số HP% và hồi phục năng lượng cho bản thân, giúp giảm bớt áp lực nạp và tăng lượng máu tối đa.", passiveDescEn: "Vũ khí 4 sao giới hạn tăng chỉ số HP% và hồi phục năng lượng cho bản thân, giúp giảm bớt áp lực nạp và tăng lượng máu tối đa.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Mechanic.png" },
      { rank: 14, nameVi: "Thần Kiếm Lê Minh", nameEn: "Thần Kiếm Lê Minh", subStat: "Sát Thương Bạo Kích", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí 3 sao F2P cực mạnh nếu duy trì được HP trên 90%. Nên đi kèm với các healer mạnh để đảm bảo nhận đầy đủ buff.", passiveDescEn: "Vũ khí 3 sao F2P cực mạnh nếu duy trì được HP trên 90%. Nên đi kèm với các healer mạnh để đảm bảo nhận đầy đủ buff.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Dawn.png" }
    ],
    talentPriority: ["Burst", "Skill", "Normal Attack"],
    bestArtifacts: [
      {
        setNameVi: "Đoàn Kịch Hoàng Kim", setNameEn: "Đoàn Kịch Hoàng Kim",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "HP%"],
        goblet: ["HP%", "Sát Thương Nguyên Tố Thủy"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Energy Recharge", "HP%", "CRIT Rate", "CRIT DMG", "HP"]
      },
      {
        setNameVi: "Thiên Nham Vững Chắc", setNameEn: "Thiên Nham Vững Chắc",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "HP%"],
        goblet: ["HP%", "Sát Thương Nguyên Tố Thủy"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Energy Recharge", "HP%", "CRIT Rate", "CRIT DMG", "HP"]
      },
      {
        setNameVi: "Mix 2 bộ Thủy / Đoàn Kịch / HP / Dấu Ấn", setNameEn: "Mix 2 bộ Thủy / Đoàn Kịch / HP / Dấu Ấn",
        pieces: 2,
        sands: ["Hiệu Quả Nạp", "HP%"],
        goblet: ["HP%", "Sát Thương Nguyên Tố Thủy"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Energy Recharge", "HP%", "CRIT Rate", "CRIT DMG", "HP"]
      }
    ],
    bestTeams: ["clorinde", "nahida", "baizhu", "neuvillette", "kazuha", "hu-tao", "yelan", "zhongli", "raiden-shogun", "jean", "nilou", "xiangling", "bennett", "noelle", "albedo", "gorou", "alhaitham", "yae-miko", "emilie"]
  },
  {
    characterId: "xinyan",
    bestWeapons: [
      { rank: 1, nameVi: "Xích Giác Phá Thạch Đao", nameEn: "Xích Giác Phá Thạch Đao", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tăng mạnh phòng ngự và sát thương đòn đánh thường/trọng kích dựa trên Phòng Ngự, rất phù hợp với khiên của Xinyan.", passiveDescEn: "Tăng mạnh phòng ngự và sát thương đòn đánh thường/trọng kích dựa trên Phòng Ngự, rất phù hợp với khiên của Xinyan.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Itadorimaru.png" },
      { rank: 2, nameVi: "Thiên Không Kiêu Ngạo", nameEn: "Thiên Không Kiêu Ngạo", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Hiệu Quả Nạp lớn giúp Xinyan dễ dàng nạp đầy Nộ và tạo thêm kiếm khí chân không gây sát thương Vật Lý.", passiveDescEn: "Cung cấp Hiệu Quả Nạp lớn giúp Xinyan dễ dàng nạp đầy Nộ và tạo thêm kiếm khí chân không gây sát thương Vật Lý.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Dvalin.png" },
      { rank: 3, nameVi: "Kiếm Li Cốt", nameEn: "Kiếm Li Cốt", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tích lũy sát thương tăng dần theo thời gian, đem lại lượng sát thương đầu ra cực kỳ ổn định nếu được bảo kê tốt.", passiveDescEn: "Tích lũy sát thương tăng dần theo thời gian, đem lại lượng sát thương đầu ra cực kỳ ổn định nếu được bảo kê tốt.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Kione.png" },
      { rank: 4, nameVi: "Kiếm Vô Công", nameEn: "Kiếm Vô Công", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Tăng mạnh Tấn Công% và cường hóa hiệu quả Khiên. Hoàn hảo khi kết hợp với nhân vật tạo khiên như Xinyan.", passiveDescEn: "Tăng mạnh Tấn Công% và cường hóa hiệu quả Khiên. Hoàn hảo khi kết hợp với nhân vật tạo khiên như Xinyan.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Kunwu.png" },
      { rank: 5, nameVi: "Tiếng Gió Trong Rừng Thông", nameEn: "Tiếng Gió Trong Rừng Thông", subStat: "Sát Thương Vật Lý", isF2P: false, refinement: "R1", passiveDescVi: "Tăng cực nhiều Sát Thương Vật Lý và tốc độ đánh cho cả đội, tối ưu chuỗi combo xoay trọng kích của Xinyan.", passiveDescEn: "Tăng cực nhiều Sát Thương Vật Lý và tốc độ đánh cho cả đội, tối ưu chuỗi combo xoay trọng kích của Xinyan.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Widsith.png" },
      { rank: 6, nameVi: "Đường Cùng Của Sói", nameEn: "Đường Cùng Của Sói", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Bơm lượng Tấn Công khổng lồ và tăng mạnh sát thương cho toàn đội khi đánh trúng kẻ địch thấp máu.", passiveDescEn: "Bơm lượng Tấn Công khổng lồ và tăng mạnh sát thương cho toàn đội khi đánh trúng kẻ địch thấp máu.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Wolfmound.png" },
      { rank: 7, nameVi: "Vua Biển Hàng Hiệu", nameEn: "Vua Biển Hàng Hiệu", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí Event F2P cực tốt, tăng chỉ số Tấn Công và gia tăng trực tiếp lượng sát thương từ Kỹ Năng Nộ.", passiveDescEn: "Vũ khí Event F2P cực tốt, tăng chỉ số Tấn Công và gia tăng trực tiếp lượng sát thương từ Kỹ Năng Nộ.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_MillenniaTuna.png" },
      { rank: 8, nameVi: "Tuyết Vùi Tinh Ngân", nameEn: "Tuyết Vùi Tinh Ngân", subStat: "Sát Thương Vật Lý", isF2P: true, refinement: "R5", passiveDescVi: "Lựa chọn rèn F2P tuyệt vời cung cấp chỉ số Sát Thương Vật Lý và tạo thêm băng rơi gây sát thương diện rộng.", passiveDescEn: "Lựa chọn rèn F2P tuyệt vời cung cấp chỉ số Sát Thương Vật Lý và tạo thêm băng rơi gây sát thương diện rộng.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Dragonfell.png" },
      { rank: 9, nameVi: "Mẫu Cổ Hoa", nameEn: "Mẫu Cổ Hoa", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí rèn quốc dân dễ tiếp cận, tăng Tấn Công và có tỷ lệ gây thêm sát thương vật lý diện rộng mỗi 15s.", passiveDescEn: "Vũ khí rèn quốc dân dễ tiếp cận, tăng Tấn Công và có tỷ lệ gây thêm sát thương vật lý diện rộng mỗi 15s.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Proto.png" }
    ],
    talentPriority: ["Normal Attack", "Burst", "Skill"],
    bestArtifacts: [
      {
        setNameVi: "Mix 2 bộ Lửa Trắng Xám / Kỵ Sĩ Đạo Nhuốm Máu", setNameEn: "Mix 2 bộ Lửa Trắng Xám / Kỵ Sĩ Đạo Nhuốm Máu",
        pieces: 2,
        sands: ["Tấn Công%", "Hiệu Quả Nạp"],
        goblet: ["Sát Thương Vật Lý"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "Tấn Công%", "Hiệu Quả Nạp", "Phòng Ngự%"]
      },
      {
        setNameVi: "Lửa Trắng Xám", setNameEn: "Lửa Trắng Xám",
        pieces: 4,
        sands: ["Tấn Công%", "Hiệu Quả Nạp"],
        goblet: ["Sát Thương Vật Lý"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "Tấn Công%", "Hiệu Quả Nạp", "Phòng Ngự%"]
      },
      {
        setNameVi: "Mix 2 bộ Dấu Ấn / Lửa Trắng Xám / Kỵ Sĩ", setNameEn: "Mix 2 bộ Dấu Ấn / Lửa Trắng Xám / Kỵ Sĩ",
        pieces: 2,
        sands: ["Tấn Công%", "Hiệu Quả Nạp"],
        goblet: ["Sát Thương Vật Lý"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "Tấn Công%", "Hiệu Quả Nạp", "Phòng Ngự%"]
      },
      {
        setNameVi: "Mix 2 bộ Vật Lý / Tấn Công / Tông Thất / Giáp", setNameEn: "Mix 2 bộ Vật Lý / Tấn Công / Tông Thất / Giáp",
        pieces: 2,
        sands: ["Tấn Công%", "Hiệu Quả Nạp"],
        goblet: ["Sát Thương Vật Lý"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "Tấn Công%", "Hiệu Quả Nạp", "Phòng Ngự%"]
      }
    ],
    bestTeams: ["eula", "beidou", "bennett", "razor", "qiqi", "fischl", "kazuha"]
  },
  {
    characterId: "yelan",
    bestWeapons: [
      { rank: 1, nameVi: "Tiếng Thở Dài Vô Tận", nameEn: "Tiếng Thở Dài Vô Tận", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Dòng phụ Hiệu Quả Nạp cao và khả năng dùng Kỹ Năng Nộ kích hoạt buff Tấn Công cho đội; lý tưởng cho lối build hỗ trợ cần nhiều Nạp.", passiveDescEn: "Dòng phụ Hiệu Quả Nạp cao và khả năng dùng Kỹ Năng Nộ kích hoạt buff Tấn Công cho đội; lý tưởng cho lối build hỗ trợ cần nhiều Nạp.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Dvalin.png" },
      { rank: 2, nameVi: "Cung Tây Phong", nameEn: "Cung Tây Phong", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Nội tại tinh luyện tạo hạt nhân lượng khi bạo kích bằng Kỹ Năng Nguyên Tố, giải quyết vấn đề nạp cho bản thân và toàn đội; Tấn Công cơ bản thấp không ảnh hưởng.", passiveDescEn: "Nội tại tinh luyện tạo hạt nhân lượng khi bạo kích bằng Kỹ Năng Nguyên Tố, giải quyết vấn đề nạp cho bản thân và toàn đội; Tấn Công cơ bản thấp không ảnh hưởng.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Zephyrus.png" },
      { rank: 3, nameVi: "Nhược Thủy", nameEn: "Nhược Thủy", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Dòng phụ Sát Thương Bạo Kích khổng lồ và nội tại tăng HP% giúp tăng mạnh sát thương, nhưng đòi hỏi Hiệu Quả Nạp cao từ thánh di vật; chỉ dùng khi có thể đạt trên 200% Nạp.", passiveDescEn: "Dòng phụ Sát Thương Bạo Kích khổng lồ và nội tại tăng HP% giúp tăng mạnh sát thương, nhưng đòi hỏi Hiệu Quả Nạp cao từ thánh di vật; chỉ dùng khi có thể đạt trên 200% Nạp.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Kirin.png" },
      { rank: 4, nameVi: "Cung Tế Lễ", nameEn: "Cung Tế Lễ", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R3", passiveDescVi: "Nội tại tinh luyện reset hồi chiêu Kỹ Năng Nguyên Tố, tạo thêm hạt năng lượng; dòng phụ Hiệu Quả Nạp cao giúp giảm áp lực nạp.", passiveDescEn: "Nội tại tinh luyện reset hồi chiêu Kỹ Năng Nguyên Tố, tạo thêm hạt năng lượng; dòng phụ Hiệu Quả Nạp cao giúp giảm áp lực nạp.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Fossil.png" }
    ],
    talentPriority: ["Burst", "Skill", "Normal Attack"],
    bestArtifacts: [
      {
        setNameVi: "Dấu Ấn Ngăn Cách", setNameEn: "Dấu Ấn Ngăn Cách",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "HP%"],
        goblet: ["Sát Thương Nguyên Tố Thủy", "HP%"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "HP%"],
        subStatsPriority: ["Energy Recharge", "HP%", "CRIT Rate", "CRIT DMG", "HP"]
      },
      {
        setNameVi: "Mix 2 bộ Dấu Ấn / HP / Thủy / Tông Thất", setNameEn: "Mix 2 bộ Dấu Ấn / HP / Thủy / Tông Thất",
        pieces: 2,
        sands: ["Hiệu Quả Nạp", "HP%"],
        goblet: ["Sát Thương Nguyên Tố Thủy", "HP%"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "HP%"],
        subStatsPriority: ["Energy Recharge", "HP%", "CRIT Rate", "CRIT DMG", "HP"]
      },
      {
        setNameVi: "Thợ Săn Marechaussee", setNameEn: "Thợ Săn Marechaussee",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "HP%"],
        goblet: ["Sát Thương Nguyên Tố Thủy", "HP%"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "HP%"],
        subStatsPriority: ["Energy Recharge", "HP%", "CRIT Rate", "CRIT DMG", "HP"]
      }
    ],
    bestTeams: ["arlecchino", "zhongli", "bennett", "hu-tao", "xingqiu", "wanderer", "faruzan", "thoma", "cyno", "nahida", "baizhu", "raiden-shogun", "xiangling", "kazuha", "nilou", "furina", "jean"]
  },
  {
    characterId: "kaedehara-kazuha",
    bestWeapons: [
      { rank: 1, nameVi: "Lời Thề Tự Do Cổ Xưa", nameEn: "Lời Thề Tự Do Cổ Xưa", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Tinh Thông Nguyên Tố cực cao và khả năng buff Tấn Công cho toàn đội. Trấn phái giúp tối đa hóa khả năng hỗ trợ và sát thương Khuếch Tán.", passiveDescEn: "Tinh Thông Nguyên Tố cực cao và khả năng buff Tấn Công cho toàn đội. Trấn phái giúp tối đa hóa khả năng hỗ trợ và sát thương Khuếch Tán.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Widsith.png" },
      { rank: 2, nameVi: "Tây Phong Kiếm", nameEn: "Tây Phong Kiếm", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Tạo hạt nhân lượng cho cả đội. Cực kỳ hữu dụng khi nhu cầu Hiệu Quả Nạp cao, đặc biệt khi đội hình không có Bennett.", passiveDescEn: "Tạo hạt nhân lượng cho cả đội. Cực kỳ hữu dụng khi nhu cầu Hiệu Quả Nạp cao, đặc biệt khi đội hình không có Bennett.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Zephyrus.png" },
      { rank: 3, nameVi: "Ánh Trăng Xiphos", nameEn: "Ánh Trăng Xiphos", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Chuyển hóa Tinh Thông Nguyên Tố thành Hiệu Quả Nạp cho bản thân và toàn đội. Giúp duy trì thời gian thi triển Kỹ Năng Nộ.", passiveDescEn: "Chuyển hóa Tinh Thông Nguyên Tố thành Hiệu Quả Nạp cho bản thân và toàn đội. Giúp duy trì thời gian thi triển Kỹ Năng Nộ.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Pleroma.png" },
      { rank: 4, nameVi: "Kiếm Tế Lễ", nameEn: "Kiếm Tế Lễ", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R5", passiveDescVi: "Reset thời gian hồi chiêu E để Khuếch Tán hai lần và tạo thêm nhiều hạt năng lượng. Gom quái cực tốt và sạc ổn định.", passiveDescEn: "Reset thời gian hồi chiêu E để Khuếch Tán hai lần và tạo thêm nhiều hạt năng lượng. Gom quái cực tốt và sạc ổn định.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Fossil.png" },
      { rank: 5, nameVi: "Ống Đồng Fleuve Cendre", nameEn: "Ống Đồng Fleuve Cendre", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Tăng Tỷ Lệ Bạo Kích Kỹ Năng Nguyên Tố và Hiệu Quả Nạp. Vũ khí F2P (đổi câu cá) giúp cân bằng giữa sát thương và khả năng nạp.", passiveDescEn: "Tăng Tỷ Lệ Bạo Kích Kỹ Năng Nguyên Tố và Hiệu Quả Nạp. Vũ khí F2P (đổi câu cá) giúp cân bằng giữa sát thương và khả năng nạp.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Machination.png" },
      { rank: 6, nameVi: "Thiên Không Kiếm", nameEn: "Thiên Không Kiếm", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Tấn Công cơ bản cao và Hiệu Quả Nạp tốt kèm hiệu ứng chân không nhỏ. Lựa chọn thay thế giúp tăng sát thương cá nhân và khả năng sạc.", passiveDescEn: "Tấn Công cơ bản cao và Hiệu Quả Nạp tốt kèm hiệu ứng chân không nhỏ. Lựa chọn thay thế giúp tăng sát thương cá nhân và khả năng sạc.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Dvalin.png" },
      { rank: 7, nameVi: "Thiết Phong Kích", nameEn: "Thiết Phong Kích", subStat: "Tinh Thông Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí thuần Tinh Thông Nguyên Tố dễ chế tạo. Lựa chọn giá rẻ giúp tăng sát thương Khuếch Tán và khả năng buff cho đội.", passiveDescEn: "Vũ khí thuần Tinh Thông Nguyên Tố dễ chế tạo. Lựa chọn giá rẻ giúp tăng sát thương Khuếch Tán và khả năng buff cho đội.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Exotic.png" },
      { rank: 8, nameVi: "Toukabou Shigure", nameEn: "Toukabou Shigure", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R5", passiveDescVi: "Cung cấp Tinh Thông Nguyên Tố và tăng nhẹ sát thương sau khi đánh trúng kẻ địch. Vũ khí Event giới hạn thay thế tốt cho Thiết Phong Kích.", passiveDescEn: "Cung cấp Tinh Thông Nguyên Tố và tăng nhẹ sát thương sau khi đánh trúng kẻ địch. Vũ khí Event giới hạn thay thế tốt cho Thiết Phong Kích.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Kasabouzu.png" },
      { rank: 9, nameVi: "Kiếm Phi Thiên", nameEn: "Kiếm Phi Thiên", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Tăng Tấn Công sau khi thi triển Nộ. Chỉ sử dụng khi không có lựa chọn nào khác; chỉ số cơ bản thấp khiến vũ khí này không tối ưu.", passiveDescEn: "Tăng Tấn Công sau khi thi triển Nộ. Chỉ sử dụng khi không có lựa chọn nào khác; chỉ số cơ bản thấp khiến vũ khí này không tối ưu.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Mitsurugi.png" }
    ],
    talentPriority: ["Burst", "Skill", "Normal Attack"],
    bestArtifacts: [
      {
        setNameVi: "Bóng Hình Màu Xanh", setNameEn: "Bóng Hình Màu Xanh",
        pieces: 4,
        sands: ["Tinh Thông Nguyên Tố", "Hiệu Quả Nạp"],
        goblet: ["Tinh Thông Nguyên Tố"],
        circlet: ["Tinh Thông Nguyên Tố"],
        subStatsPriority: ["Energy Recharge", "Elemental Mastery", "CRIT Rate"]
      },
      {
        setNameVi: "Như Sấm Thịnh Nộ", setNameEn: "Như Sấm Thịnh Nộ",
        pieces: 4,
        sands: ["Tinh Thông Nguyên Tố", "Hiệu Quả Nạp"],
        goblet: ["Tinh Thông Nguyên Tố"],
        circlet: ["Tinh Thông Nguyên Tố"],
        subStatsPriority: ["Energy Recharge", "Elemental Mastery", "CRIT Rate"]
      }
    ],
    bestTeams: ["yelan", "furina", "sigewinne", "clorinde", "fischl", "nahida", "tartaglia", "xiangling", "bennett", "arlecchino", "kachina", "klee"]
  },
  {
    characterId: "nahida",
    bestWeapons: [
      { rank: 1, nameVi: "Cõi Mộng Ngàn Đêm", nameEn: "Cõi Mộng Ngàn Đêm", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Vũ khí tốt nhất: cung cấp Tinh Thông Nguyên Tố cực lớn và buff thêm TTNT cho cả đội, giúp tăng mạnh sát thương phản ứng và khả năng hỗ trợ.", passiveDescEn: "Vũ khí tốt nhất: cung cấp Tinh Thông Nguyên Tố cực lớn và buff thêm TTNT cho cả đội, giúp tăng mạnh sát thương phản ứng và khả năng hỗ trợ.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Ayus.png" },
      { rank: 2, nameVi: "Hòa Giấc Trong Nắng Mai", nameEn: "Hòa Giấc Trong Nắng Mai", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Tấn Công cơ bản cao và dòng phụ Tỷ Lệ Bạo Kích; nội tại cung cấp lượng lớn Tinh Thông Nguyên Tố sau khi kích hoạt phản ứng.", passiveDescEn: "Tấn Công cơ bản cao và dòng phụ Tỷ Lệ Bạo Kích; nội tại cung cấp lượng lớn Tinh Thông Nguyên Tố sau khi kích hoạt phản ứng.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_SakuraFan.png" },
      { rank: 3, nameVi: "Chân Ý Của Kagura", nameEn: "Chân Ý Của Kagura", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp lượng lớn Sát Thương Bạo Kích và tăng sát thương Kỹ Năng Nguyên Tố từ các tầng nội tại, tuy nhiên cần đứng sân để duy trì.", passiveDescEn: "Cung cấp lượng lớn Sát Thương Bạo Kích và tăng sát thương Kỹ Năng Nguyên Tố từ các tầng nội tại, tuy nhiên cần đứng sân để duy trì.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Narukami.png" },
      { rank: 4, nameVi: "Mảnh Chương Tế Lễ", nameEn: "Mảnh Chương Tế Lễ", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R5", passiveDescVi: "Tinh Thông Nguyên Tố cao và có tỷ lệ reset thời gian hồi chiêu E, giúp kéo dài khả năng cấp Thảo ngoài sân.", passiveDescEn: "Tinh Thông Nguyên Tố cao và có tỷ lệ reset thời gian hồi chiêu E, giúp kéo dài khả năng cấp Thảo ngoài sân.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Fossil.png" },
      { rank: 5, nameVi: "Đàn Thiên Quang", nameEn: "Đàn Thiên Quang", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Cung cấp Hiệu Quả Nạp và tăng Tinh Thông Nguyên Tố cho toàn đội sau khi dùng Nộ, hỗ trợ đắc lực cho các phản ứng nguyên tố.", passiveDescEn: "Cung cấp Hiệu Quả Nạp và tăng Tinh Thông Nguyên Tố cho toàn đội sau khi dùng Nộ, hỗ trợ đắc lực cho các phản ứng nguyên tố.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_SeeliesLute.png" },
      { rank: 6, nameVi: "Sao Đêm Rong Ruổi", nameEn: "Sao Đêm Rong Ruổi", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Dòng phụ Tinh Thông Nguyên Tố và nội tại chuyển hóa thành Tấn Công cho Nahida và toàn đội, rất tốt cho lối chơi hỗ trợ.", passiveDescEn: "Dòng phụ Tinh Thông Nguyên Tố và nội tại chuyển hóa thành Tấn Công cho Nahida và toàn đội, rất tốt cho lối chơi hỗ trợ.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Pleroma.png" },
      { rank: 7, nameVi: "Chương Nhạc Lang Thang", nameEn: "Chương Nhạc Lang Thang", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R5", passiveDescVi: "Buff ngẫu nhiên cực mạnh (TTNT, Tấn Công, Sát Thương Nguyên Tố), tuy nhiên không ổn định cho hỗ trợ phản ứng.", passiveDescEn: "Buff ngẫu nhiên cực mạnh (TTNT, Tấn Công, Sát Thương Nguyên Tố), tuy nhiên không ổn định cho hỗ trợ phản ứng.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Troupe.png" },
      { rank: 8, nameVi: "Ngọc Bích Hiến Tế", nameEn: "Ngọc Bích Hiến Tế", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tỷ Lệ Bạo Kích cao và tăng HP/TTNT khi không đứng sân, phù hợp cho Nahida off-field sử dụng như một vũ khí tăng chỉ số.", passiveDescEn: "Tỷ Lệ Bạo Kích cao và tăng HP/TTNT khi không đứng sân, phù hợp cho Nahida off-field sử dụng như một vũ khí tăng chỉ số.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Yue.png" },
      { rank: 9, nameVi: "Quyển Thiên Không", nameEn: "Quyển Thiên Không", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Tấn Công cơ bản cao và buff Sát Thương Nguyên Tố; nội tại tạo thêm sát thương vật lý nhỏ nhưng thiếu Tinh Thông Nguyên Tố.", passiveDescEn: "Tấn Công cơ bản cao và buff Sát Thương Nguyên Tố; nội tại tạo thêm sát thương vật lý nhỏ nhưng thiếu Tinh Thông Nguyên Tố.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Dvalin.png" },
      { rank: 10, nameVi: "Điển Tích Tây Phong", nameEn: "Điển Tích Tây Phong", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tỷ Lệ Bạo Kích cao và tăng dần Sát Thương Nguyên Tố khi đứng sân; không tối ưu cho lối chơi quick-swap.", passiveDescEn: "Tỷ Lệ Bạo Kích cao và tăng dần Sát Thương Nguyên Tố khi đứng sân; không tối ưu cho lối chơi quick-swap.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Fourwinds.png" },
      { rank: 11, nameVi: "Khóa Trần Thế", nameEn: "Khóa Trần Thế", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Yêu cầu khiên để tối đa hóa cộng dồn Tấn Công%; không thực sự lý tưởng vì Nahida ưu tiên Tinh Thông Nguyên Tố hơn.", passiveDescEn: "Yêu cầu khiên để tối đa hóa cộng dồn Tấn Công%; không thực sự lý tưởng vì Nahida ưu tiên Tinh Thông Nguyên Tố hơn.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Kunwu.png" },
      { rank: 12, nameVi: "Nhật Nguyệt Hạp", nameEn: "Nhật Nguyệt Hạp", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R5", passiveDescVi: "Gia tăng sát thương Kỹ Năng Nguyên Tố và Kỹ Năng Nộ kèm Tỷ Lệ Bạo Kích; thiếu Tinh Thông Nguyên Tố và chỉ phù hợp khi đứng sân.", passiveDescEn: "Gia tăng sát thương Kỹ Năng Nguyên Tố và Kỹ Năng Nộ kèm Tỷ Lệ Bạo Kích; thiếu Tinh Thông Nguyên Tố và chỉ phù hợp khi đứng sân.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Resurrection.png" },
      { rank: 13, nameVi: "Tây Phong Mật Điển", nameEn: "Tây Phong Mật Điển", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R5", passiveDescVi: "Tạo hạt năng lượng cho cả đội; sử dụng nếu đội hình thiếu Nạp trầm trọng dù lượng Tinh Thông Nguyên Tố nhận lại thấp.", passiveDescEn: "Tạo hạt năng lượng cho cả đội; sử dụng nếu đội hình thiếu Nạp trầm trọng dù lượng Tinh Thông Nguyên Tố nhận lại thấp.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Zephyrus.png" },
      { rank: 14, nameVi: "Hải Đồ Vạn Quốc", nameEn: "Hải Đồ Vạn Quốc", subStat: "Tinh Thông Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí rèn dễ kiếm cung cấp Tinh Thông Nguyên Tố; nội tại tăng Sát Thương Nguyên Tố sau phản ứng, lựa chọn F2P ổn định.", passiveDescEn: "Vũ khí rèn dễ kiếm cung cấp Tinh Thông Nguyên Tố; nội tại tăng Sát Thương Nguyên Tố sau phản ứng, lựa chọn F2P ổn định.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Exotic.png" },
      { rank: 15, nameVi: "Tóm Tắt Ma Pháp", nameEn: "Tóm Tắt Ma Pháp", subStat: "Tinh Thông Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí 3 sao rẻ tiền cung cấp lượng Tinh Thông Nguyên Tố lớn; nội tại tăng sát thương lên kẻ địch dính ấn Thủy hoặc Lôi.", passiveDescEn: "Vũ khí 3 sao rẻ tiền cung cấp lượng Tinh Thông Nguyên Tố lớn; nội tại tăng sát thương lên kẻ địch dính ấn Thủy hoặc Lôi.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Intro.png" },
      { rank: 16, nameVi: "Vòng Bạch Thần", nameEn: "Vòng Bạch Thần", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí rèn cung cấp Hiệu Quả Nạp và buff Sát Thương Nguyên Tố liên quan đến Lôi; chỉ dùng trong đội hình phản ứng Lôi.", passiveDescEn: "Vũ khí rèn cung cấp Hiệu Quả Nạp và buff Sát Thương Nguyên Tố liên quan đến Lôi; chỉ dùng trong đội hình phản ứng Lôi.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Bakufu.png" },
      { rank: 17, nameVi: "Câu Chuyện Diệt Rồng", nameEn: "Câu Chuyện Diệt Rồng", subStat: "HP%", isF2P: true, refinement: "R5", passiveDescVi: "Cung cấp lượng lớn buff Tấn Công% cho nhân vật ra sân tiếp theo; chỉ dùng thuần hỗ trợ khi Nahida không gây sát thương.", passiveDescEn: "Cung cấp lượng lớn buff Tấn Công% cho nhân vật ra sân tiếp theo; chỉ dùng thuần hỗ trợ khi Nahida không gây sát thương.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Pulpfic.png" },
      { rank: 18, nameVi: "Mẫu Kim Phách", nameEn: "Mẫu Kim Phách", subStat: "HP%", isF2P: true, refinement: "R5", passiveDescVi: "Hồi máu và phục hồi năng lượng cho toàn đội; sử dụng nếu cần gia tăng khả năng sinh tồn và nạp năng lượng thay vì TTNT.", passiveDescEn: "Hồi máu và phục hồi năng lượng cho toàn đội; sử dụng nếu cần gia tăng khả năng sinh tồn và nạp năng lượng thay vì TTNT.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Proto.png" }
    ],
    talentPriority: ["Skill", "Burst", "Normal Attack"],
    bestArtifacts: [
      {
        setNameVi: "Ký Ức Rừng Sâu", setNameEn: "Ký Ức Rừng Sâu",
        pieces: 4,
        sands: ["Tinh Thông Nguyên Tố"],
        goblet: ["Tinh Thông Nguyên Tố", "Sát Thương Nguyên Tố Thảo"],
        circlet: ["Tinh Thông Nguyên Tố", "Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "Elemental Mastery", "ATK%"]
      },
      {
        setNameVi: "Giấc Mộng Hoàng Kim", setNameEn: "Giấc Mộng Hoàng Kim",
        pieces: 4,
        sands: ["Tinh Thông Nguyên Tố"],
        goblet: ["Tinh Thông Nguyên Tố", "Sát Thương Nguyên Tố Thảo"],
        circlet: ["Tinh Thông Nguyên Tố", "Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "Elemental Mastery", "ATK%"]
      },
      {
        setNameVi: "Đoàn Kịch Hoàng Kim", setNameEn: "Đoàn Kịch Hoàng Kim",
        pieces: 4,
        sands: ["Tinh Thông Nguyên Tố"],
        goblet: ["Tinh Thông Nguyên Tố", "Sát Thương Nguyên Tố Thảo"],
        circlet: ["Tinh Thông Nguyên Tố", "Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "Elemental Mastery", "ATK%"]
      },
      {
        setNameVi: "Mix 2 bộ Tinh Thông & 2 bộ Ký Ức Rừng Sâu", setNameEn: "Mix 2 bộ Tinh Thông & 2 bộ Ký Ức Rừng Sâu",
        pieces: 2,
        sands: ["Tinh Thông Nguyên Tố"],
        goblet: ["Tinh Thông Nguyên Tố", "Sát Thương Nguyên Tố Thảo"],
        circlet: ["Tinh Thông Nguyên Tố", "Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "Elemental Mastery", "ATK%"]
      },
      {
        setNameVi: "Thiên Nham Vững Chắc", setNameEn: "Thiên Nham Vững Chắc",
        pieces: 4,
        sands: ["Tinh Thông Nguyên Tố"],
        goblet: ["Tinh Thông Nguyên Tố", "Sát Thương Nguyên Tố Thảo"],
        circlet: ["Tinh Thông Nguyên Tố", "Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "Elemental Mastery", "ATK%"]
      },
      {
        setNameVi: "Đóa Hoa Trang Viên Thất Lạc", setNameEn: "Đóa Hoa Trang Viên Thất Lạc",
        pieces: 4,
        sands: ["Tinh Thông Nguyên Tố"],
        goblet: ["Tinh Thông Nguyên Tố", "Sát Thương Nguyên Tố Thảo"],
        circlet: ["Tinh Thông Nguyên Tố", "Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "Elemental Mastery", "ATK%"]
      }
    ],
    bestTeams: ["raiden-shogun", "thoma", "kuki-shinobu", "yae-miko", "fischl", "zhongli", "kokomi", "kazuha", "yelan", "nilou", "traveler", "xingqiu", "cyno", "beidou", "ganyu", "bennett", "razor"]
  },
  {
    characterId: "xiangling",
    bestWeapons: [
      { rank: 1, nameVi: "Quyền Trượng Cát Đỏ", nameEn: "Quyền Trượng Cát Đỏ", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tỷ Lệ Bạo Kích cực cao và Tấn Công cơ bản tốt. Nội tại chuyển hóa Tinh Thông Nguyên Tố thành Tấn Công, rất mạnh trong đội hình Bốc Hơi.", passiveDescEn: "Tỷ Lệ Bạo Kích cực cao và Tấn Công cơ bản tốt. Nội tại chuyển hóa Tinh Thông Nguyên Tố thành Tấn Công, rất mạnh trong đội hình Bốc Hơi.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Deshret.png" },
      { rank: 2, nameVi: "Bi Ca Lumidouce", nameEn: "Bi Ca Lumidouce", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Hiệu Quả Nạp tốt và gia tăng Tinh Thông Nguyên Tố cho toàn đội, giúp đẩy mạnh sát thương phản ứng.", passiveDescEn: "Cung cấp Hiệu Quả Nạp tốt và gia tăng Tinh Thông Nguyên Tố cho toàn đội, giúp đẩy mạnh sát thương phản ứng.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Muguet.png" },
      { rank: 3, nameVi: "Hào Quang Tách Rời", nameEn: "Hào Quang Tách Rời", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Vũ khí thử nghiệm cung cấp Sát Thương Bạo Kích, tuy nhiên chỉ số không tối ưu bằng các lựa chọn khác.", passiveDescEn: "Vũ khí thử nghiệm cung cấp Sát Thương Bạo Kích, tuy nhiên chỉ số không tối ưu bằng các lựa chọn khác.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Perdix.png" },
      { rank: 4, nameVi: "Trượng Hộ Ma", nameEn: "Trượng Hộ Ma", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Sát Thương Bạo Kích cao và nội tại tăng Tấn Công dựa trên HP. Sát thương đầu ra rất lớn nhưng yêu cầu tự bù đắp Hiệu Quả Nạp.", passiveDescEn: "Sát Thương Bạo Kích cao và nội tại tăng Tấn Công dựa trên HP. Sát thương đầu ra rất lớn nhưng yêu cầu tự bù đắp Hiệu Quả Nạp.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Homa.png" },
      { rank: 5, nameVi: "Đoạn Thảo Kính Phạt", nameEn: "Đoạn Thảo Kính Phạt", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Vũ khí tuyệt vời cung cấp lượng lớn Hiệu Quả Nạp và tự động chuyển hóa dòng Nạp thành Tấn Công%, giúp spam Nộ cực mượt.", passiveDescEn: "Vũ khí tuyệt vời cung cấp lượng lớn Hiệu Quả Nạp và tự động chuyển hóa dòng Nạp thành Tấn Công%, giúp spam Nộ cực mượt.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Narukami.png" },
      { rank: 6, nameVi: "Hòa Phát Diên", nameEn: "Hòa Phát Diên", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tỷ Lệ Bạo Kích cao và nội tại tăng Tấn Công khi đánh trúng kẻ địch. Sát thương ổn định nhưng cần đứng sân một chút để tích tầng.", passiveDescEn: "Tỷ Lệ Bạo Kích cao và nội tại tăng Tấn Công khi đánh trúng kẻ địch. Sát thương ổn định nhưng cần đứng sân một chút để tích tầng.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Morax.png" },
      { rank: 7, nameVi: "Tai Họa Và Hối Hận", nameEn: "Tai Họa Và Hối Hận", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Lựa chọn thay thế mang lại Sát Thương Bạo Kích cao, tuy nhiên nội tại không quá phù hợp cho Xiangling.", passiveDescEn: "Lựa chọn thay thế mang lại Sát Thương Bạo Kích cao, tuy nhiên nội tại không quá phù hợp cho Xiangling.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Carbine.png" },
      { rank: 8, nameVi: "Lao Xiên Cá", nameEn: "Lao Xiên Cá", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Lựa chọn F2P tốt nhất: Tăng trực tiếp Sát Thương và Tỷ Lệ Bạo Kích của Kỹ Năng Nộ cùng chỉ số Hiệu Quả Nạp cao.", passiveDescEn: "Lựa chọn F2P tốt nhất: Tăng trực tiếp Sát Thương và Tỷ Lệ Bạo Kích của Kỹ Năng Nộ cùng chỉ số Hiệu Quả Nạp cao.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Mori.png" },
      { rank: 9, nameVi: "Thương Quyết Chiến", nameEn: "Thương Quyết Chiến", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp lượng lớn Tỷ Lệ Bạo Kích và thêm Tấn Công dựa trên số lượng kẻ địch. Cần bù đắp Hiệu Quả Nạp từ thánh di vật.", passiveDescEn: "Cung cấp lượng lớn Tỷ Lệ Bạo Kích và thêm Tấn Công dựa trên số lượng kẻ địch. Cần bù đắp Hiệu Quả Nạp từ thánh di vật.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Gladiator.png" },
      { rank: 10, nameVi: "Khúc Ca Vịnh Hẹp", nameEn: "Khúc Ca Vịnh Hẹp", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích và tăng mạnh Tinh Thông Nguyên Tố nếu đội hình có từ 3 nguyên tố khác nhau trở lên.", passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích và tăng mạnh Tinh Thông Nguyên Tố nếu đội hình có từ 3 nguyên tố khác nhau trở lên.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Shanty.png" },
      { rank: 11, nameVi: "Hủy Diệt", nameEn: "Hủy Diệt", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Chỉ số Tấn Công% cực cao và buff cho Kỹ Năng Nguyên Tố. Thích hợp dùng làm vũ khí thuần tăng sát thương tấn công.", passiveDescEn: "Chỉ số Tấn Công% cực cao và buff cho Kỹ Năng Nguyên Tố. Thích hợp dùng làm vũ khí thuần tăng sát thương tấn công.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Santika.png" },
      { rank: 12, nameVi: "Giáo Nịnh Thần", nameEn: "Giáo Nịnh Thần", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Tăng hiệu quả Khiên và Tấn Công%. Yêu cầu có nhân vật tạo khiên trong đội để phát huy tối đa sức mạnh.", passiveDescEn: "Tăng hiệu quả Khiên và Tấn Công%. Yêu cầu có nhân vật tạo khiên trong đội để phát huy tối đa sức mạnh.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Kunwu.png" },
      { rank: 13, nameVi: "Hình Thái Xích Nguyệt", nameEn: "Hình Thái Xích Nguyệt", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Lựa chọn thay thế tạm ổn cung cấp Tỷ Lệ Bạo Kích, tuy nhiên nội tại tăng sát thương không hoạt động tối đa với Xiangling.", passiveDescEn: "Lựa chọn thay thế tạm ổn cung cấp Tỷ Lệ Bạo Kích, tuy nhiên nội tại tăng sát thương không hoạt động tối đa với Xiangling.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_BloodMoon.png" },
      { rank: 13, nameVi: "Tàn Tích Nhuốm Máu", nameEn: "Tàn Tích Nhuốm Máu", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Với vũ khí thử nghiệm, coi như vật giữ chỗ. Có lẽ không dùng được.", passiveDescEn: "Với vũ khí thử nghiệm, coi như vật giữ chỗ. Có lẽ không dùng được.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_TummaLyhty.png" },
      { rank: 15, nameVi: "Vây Cá Chẻ Sóng", nameEn: "Vây Cá Chẻ Sóng", subStat: "Tấn Công%", isF2P: false, refinement: "R5", passiveDescVi: "Gia tăng mạnh sát thương Kỹ Năng Nộ dựa trên tổng năng lượng tiêu hao của toàn đội. Đạt hiệu quả cực cao ở tinh luyện 5.", passiveDescEn: "Gia tăng mạnh sát thương Kỹ Năng Nộ dựa trên tổng năng lượng tiêu hao của toàn đội. Đạt hiệu quả cực cao ở tinh luyện 5.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Maria.png" },
      { rank: 16, nameVi: "Mũi Nhọn Của Gió", nameEn: "Mũi Nhọn Của Gió", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí Event F2P tăng Tấn Công% và Tinh Thông Nguyên Tố sau khi kích hoạt phản ứng, lựa chọn thay thế rất tốt.", passiveDescEn: "Vũ khí Event F2P tăng Tấn Công% và Tinh Thông Nguyên Tố sau khi kích hoạt phản ứng, lựa chọn thay thế rất tốt.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Windvane.png" },
      { rank: 17, nameVi: "Giáo Thập Tự Kitain", nameEn: "Giáo Thập Tự Kitain", subStat: "Tinh Thông Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Cung cấp Tinh Thông Nguyên Tố và khả năng hồi năng lượng khi dùng Kỹ Năng Nguyên Tố, giúp giảm nhẹ áp lực nạp.", passiveDescEn: "Cung cấp Tinh Thông Nguyên Tố và khả năng hồi năng lượng khi dùng Kỹ Năng Nguyên Tố, giúp giảm nhẹ áp lực nạp.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Bakufu.png" },
      { rank: 18, nameVi: "Thương Thiên Nham", nameEn: "Thương Thiên Nham", subStat: "Tấn Công%", isF2P: false, refinement: "R5", passiveDescVi: "Gia tăng Tỷ Lệ Bạo Kích và Tấn Công% dựa trên số lượng nhân vật Liyue trong đội. Phù hợp cho đội hình National truyền thống.", passiveDescEn: "Gia tăng Tỷ Lệ Bạo Kích và Tấn Công% dựa trên số lượng nhân vật Liyue trong đội. Phù hợp cho đội hình National truyền thống.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Lapis.png" },
      { rank: 19, nameVi: "Thương Tây Phong", nameEn: "Thương Tây Phong", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Hiệu Quả Nạp cao và nội tại sinh hạt năng lượng cho toàn đội khi bạo kích, giúp sạc nhanh cho bản thân và đồng đội.", passiveDescEn: "Hiệu Quả Nạp cao và nội tại sinh hạt năng lượng cho toàn đội khi bạo kích, giúp sạc nhanh cho bản thân và đồng đội.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Zephyrus.png" }
    ],
    talentPriority: ["Burst", "Skill", "Normal Attack"],
    bestArtifacts: [
      {
        setNameVi: "Dấu Ấn Ngăn Cách", setNameEn: "Dấu Ấn Ngăn Cách",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "ATK%", "Elemental Mastery"]
      },
      {
        setNameVi: "Diệm Liệt Ma Nữ Cháy Rực", setNameEn: "Diệm Liệt Ma Nữ Cháy Rực",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "ATK%", "Elemental Mastery"]
      },
      {
        setNameVi: "Giấc Mộng Hoàng Kim", setNameEn: "Giấc Mộng Hoàng Kim",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "ATK%", "Elemental Mastery"]
      },
      {
        setNameVi: "Mix 2 món Ma Nữ / Tông Thất / Tấn Công / Tinh Thông / Dấu Ấn", setNameEn: "Mix 2 món Ma Nữ / Tông Thất / Tấn Công / Tinh Thông / Dấu Ấn",
        pieces: 2,
        sands: ["Hiệu Quả Nạp", "Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "ATK%", "Elemental Mastery"]
      },
      {
        setNameVi: "Nghi Thức Tông Thất Cổ", setNameEn: "Nghi Thức Tông Thất Cổ",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "ATK%", "Elemental Mastery"]
      },
      {
        setNameVi: "Ký Ức Rừng Sâu", setNameEn: "Ký Ức Rừng Sâu",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "ATK%", "Elemental Mastery"]
      }
    ],
    bestTeams: ["tartaglia", "kazuha", "bennett", "kokomi", "xingqiu", "furina", "raiden-shogun", "kujou-sara", "keqing", "klee", "ganyu", "zhongli"]
  },
  {
    characterId: "klee",
    bestWeapons: [
      { rank: 1, nameVi: "Chân Ngôn Bí Hạp", nameEn: "Chân Ngôn Bí Hạp", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tấn công cơ bản cao và Sát Thương Bạo Kích cực lớn. Nội tại tăng Tỷ Lệ Bạo Kích và Tinh Thông Nguyên Tố sau khi dùng kỹ năng, rất thích hợp cho Klee.", passiveDescEn: "Tấn công cơ bản cao và Sát Thương Bạo Kích cực lớn. Nội tại tăng Tỷ Lệ Bạo Kích và Tinh Thông Nguyên Tố sau khi dùng kỹ năng, rất thích hợp cho Klee.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Sistrum.png" },
      { rank: 2, nameVi: "Điển Tích Tây Phong", nameEn: "Điển Tích Tây Phong", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Dòng phụ Tỷ Lệ Bạo Kích và nội tại tăng Tốc Chạy. Tăng Sát Thương Nguyên Tố theo thời gian đứng sân giúp Klee dồn dame cực tốt.", passiveDescEn: "Dòng phụ Tỷ Lệ Bạo Kích và nội tại tăng Tốc Chạy. Tăng Sát Thương Nguyên Tố theo thời gian đứng sân giúp Klee dồn dame cực tốt.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Fourwinds.png" },
      { rank: 3, nameVi: "Chân Ý Của Kagura", nameEn: "Chân Ý Của Kagura", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Sát Thương Bạo Kích cao. Nội tại tăng sát thương Kỹ Năng Nguyên Tố và tăng Sát Thương Nguyên Tố khi dùng kỹ năng liên tục.", passiveDescEn: "Sát Thương Bạo Kích cao. Nội tại tăng sát thương Kỹ Năng Nguyên Tố và tăng Sát Thương Nguyên Tố khi dùng kỹ năng liên tục.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Narukami.png" },
      { rank: 4, nameVi: "Tâm Niệm Sắc Màu", nameEn: "Tâm Niệm Sắc Màu", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Sát Thương Bạo Kích cao. Tăng Tấn Công% và Sát Thương Tấn Công Thường sau khi sử dụng Kỹ Năng Nguyên Tố, tối ưu hóa chuỗi combo của Klee.", passiveDescEn: "Sát Thương Bạo Kích cao. Tăng Tấn Công% và Sát Thương Tấn Công Thường sau khi sử dụng Kỹ Năng Nguyên Tố, tối ưu hóa chuỗi combo của Klee.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_VaresaTransformer.png" },
      { rank: 5, nameVi: "Nghi Thức Dòng Chảy Vĩnh Hằng", nameEn: "Nghi Thức Dòng Chảy Vĩnh Hằng", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tấn công cơ bản cao và Sát Thương Bạo Kích%. Sau khi trọng kích trúng địch sẽ tăng Tỷ Lệ Bạo Kích và Tấn Công.", passiveDescEn: "Tấn công cơ bản cao và Sát Thương Bạo Kích%. Sau khi trọng kích trúng địch sẽ tăng Tỷ Lệ Bạo Kích và Tấn Công.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Iudex.png" },
      { rank: 6, nameVi: "Quản Đốc Vàng Ròng", nameEn: "Quản Đốc Vàng Ròng", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích. Tăng sát thương Tấn Công Thường và sát thương Kỹ Năng Nguyên Tố, tương thích cao với bộ kỹ năng kép của Klee.", passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích. Tăng sát thương Tấn Công Thường và sát thương Kỹ Năng Nguyên Tố, tương thích cao với bộ kỹ năng kép của Klee.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Wheatley.png" },
      { rank: 7, nameVi: "Hồi Ức Tulaytullah", nameEn: "Hồi Ức Tulaytullah", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Dòng phụ Sát Thương Bạo Kích. Sau khi dùng Kỹ Năng Nguyên Tố sẽ tăng Tốc Độ Tấn Công Thường và Sát Thương Tấn Công Thường.", passiveDescEn: "Dòng phụ Sát Thương Bạo Kích. Sau khi dùng Kỹ Năng Nguyên Tố sẽ tăng Tốc Độ Tấn Công Thường và Sát Thương Tấn Công Thường.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Alaya.png" },
      { rank: 8, nameVi: "Thời Khắc Lướt Sóng", nameEn: "Thời Khắc Lướt Sóng", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích% (hoặc Sát Thương Bạo Kích%). Tăng sát thương Trọng Kích và hồi năng lượng, hỗ trợ nạp Nộ cho Klee.", passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích% (hoặc Sát Thương Bạo Kích%). Tăng sát thương Trọng Kích và hồi năng lượng, hỗ trợ nạp Nộ cho Klee.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_MechaPufferfish.png" },
      { rank: 9, nameVi: "Quyển Thiên Không", nameEn: "Quyển Thiên Không", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Tấn Công% dồi dào. Nội tại tạo thêm sát thương vật lý diện rộng và tăng Sát Thương Nguyên Tố ổn định.", passiveDescEn: "Tấn Công% dồi dào. Nội tại tạo thêm sát thương vật lý diện rộng và tăng Sát Thương Nguyên Tố ổn định.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Dvalin.png" },
      { rank: 10, nameVi: "Chương Nhạc Lang Thang", nameEn: "Chương Nhạc Lang Thang", subStat: "Sát Thương Bạo Kích", isF2P: true, refinement: "R1", passiveDescVi: "Sát Thương Bạo Kích cao. Nhận ngẫu nhiên lượng lớn Tấn Công%, Sát Thương Nguyên Tố hoặc Tinh Thông Nguyên Tố, cung cấp sát thương bùng nổ cực khủng.", passiveDescEn: "Sát Thương Bạo Kích cao. Nhận ngẫu nhiên lượng lớn Tấn Công%, Sát Thương Nguyên Tố hoặc Tinh Thông Nguyên Tố, cung cấp sát thương bùng nổ cực khủng.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Troupe.png" },
      { rank: 11, nameVi: "Nhật Nguyệt Hạp", nameEn: "Nhật Nguyệt Hạp", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích. Đòn đánh thường trúng địch tăng sát thương Kỹ Năng Nguyên Tố và Kỹ Năng Nộ.", passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích. Đòn đánh thường trúng địch tăng sát thương Kỹ Năng Nguyên Tố và Kỹ Năng Nộ.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Resurrection.png" },
      { rank: 12, nameVi: "Ngọc Bích Hiến Tế", nameEn: "Ngọc Bích Hiến Tế", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích. Tăng Tinh Thông Nguyên Tố và Tấn Công sau khi dùng kỹ năng, thích hợp cho đội phản ứng.", passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích. Tăng Tinh Thông Nguyên Tố và Tấn Công sau khi dùng kỹ năng, thích hợp cho đội phản ứng.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Yue.png" },
      { rank: 13, nameVi: "Dòng Chảy Tinh Khiết", nameEn: "Dòng Chảy Tinh Khiết", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Tăng mạnh Tấn Công% và tăng Sát Thương Nguyên Tố khi dùng kỹ năng, giảm áp lực nạp Nộ.", passiveDescEn: "Tăng mạnh Tấn Công% và tăng Sát Thương Nguyên Tố khi dùng kỹ năng, giảm áp lực nạp Nộ.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Vorpal.png" }
    ],
    talentPriority: ["Normal Attack", "Burst", "Skill"],
    bestArtifacts: [
      {
        setNameVi: "Ngày Nổi Gió", setNameEn: "Ngày Nổi Gió",
        pieces: 4,
        sands: ["Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Energy Recharge"]
      },
      {
        setNameVi: "Hiền Nhân Bốc Lửa", setNameEn: "Hiền Nhân Bốc Lửa",
        pieces: 4,
        sands: ["Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Energy Recharge"]
      },
      {
        setNameVi: "Dư Âm Tế Lễ", setNameEn: "Dư Âm Tế Lễ",
        pieces: 4,
        sands: ["Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Energy Recharge"]
      },
      {
        setNameVi: "Sử Ký Đình Đài Cát", setNameEn: "Sử Ký Đình Đài Cát",
        pieces: 4,
        sands: ["Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Energy Recharge"]
      },
      {
        setNameVi: "Mix 2 bộ Tấn Công / Ma Nữ / Thợ Săn", setNameEn: "Mix 2 bộ Tấn Công / Ma Nữ / Thợ Săn",
        pieces: 2,
        sands: ["Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Energy Recharge"]
      },
      {
        setNameVi: "Đoàn Hát Lang Thang Đại Lục", setNameEn: "Đoàn Hát Lang Thang Đại Lục",
        pieces: 4,
        sands: ["Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Energy Recharge"]
      },
      {
        setNameVi: "Mảnh Hài Hòa Bất Thường", setNameEn: "Mảnh Hài Hòa Bất Thường",
        pieces: 4,
        sands: ["Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Energy Recharge"]
      }
    ],
    bestTeams: ["xilonen", "furina", "bennett", "kazuha", "durin", "albedo", "fischl", "chevreuse", "citlali", "xianyun"]
  },
  {
    characterId: "diluc",
    bestWeapons: [
      { rank: 1, nameVi: "Hải Đăng Bờ Biển Lau", nameEn: "Hải Đăng Bờ Biển Lau", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tấn công cơ bản cao và Tỷ Lệ Bạo Kích cực tốt. Khi Kỹ Năng Nguyên Tố đánh trúng địch hoặc nhận sát thương sẽ tăng mạnh Tấn Công%, cực kỳ tối ưu cho Diluc đứng sân.", passiveDescEn: "Tấn công cơ bản cao và Tỷ Lệ Bạo Kích cực tốt. Khi Kỹ Năng Nguyên Tố đánh trúng địch hoặc nhận sát thương sẽ tăng mạnh Tấn Công%, cực kỳ tối ưu cho Diluc đứng sân.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Deshret.png" },
      { rank: 2, nameVi: "Xích Giác Phá Thạch Đao", nameEn: "Xích Giác Phá Thạch Đao", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp lượng khổng lồ Sát Thương Bạo Kích. Mặc dù Diluc không tận dụng nhiều từ quy đổi Phòng Thủ, chỉ số bạo kích thuần vẫn giúp nó là lựa chọn cực mạnh.", passiveDescEn: "Cung cấp lượng khổng lồ Sát Thương Bạo Kích. Mặc dù Diluc không tận dụng nhiều từ quy đổi Phòng Thủ, chỉ số bạo kích thuần vẫn giúp nó là lựa chọn cực mạnh.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Itadorimaru.png" },
      { rank: 3, nameVi: "Thiên Dương Rực Lửa", nameEn: "Thiên Dương Rực Lửa", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tăng Tỷ Lệ Bạo Kích và 20% sát thương Kỹ Năng Nguyên Tố. Sau khi kích hoạt Thiêu Đốt hoặc dùng Nộ sẽ tăng mạnh Sát Thương Nguyên Tố.", passiveDescEn: "Tăng Tỷ Lệ Bạo Kích và 20% sát thương Kỹ Năng Nguyên Tố. Sau khi kích hoạt Thiêu Đốt hoặc dùng Nộ sẽ tăng mạnh Sát Thương Nguyên Tố.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_RadianceSword.png" },
      { rank: 4, nameVi: "Phán Quyết", nameEn: "Phán Quyết", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tấn công cơ bản cao và Tỷ Lệ Bạo Kích dồi dào. Sau phản ứng Kết Tinh sẽ tăng Sát Thương Nguyên Tố cho Diluc, thích hợp khi đi cùng đồng đội hệ Nham.", passiveDescEn: "Tấn công cơ bản cao và Tỷ Lệ Bạo Kích dồi dào. Sau phản ứng Kết Tinh sẽ tăng Sát Thương Nguyên Tố cho Diluc, thích hợp khi đi cùng đồng đội hệ Nham.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_GoldenVerdict.png" },
      { rank: 5, nameVi: "Kiếm Li Cốt", nameEn: "Kiếm Li Cốt", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Vũ khí Battle Pass cực mạnh cho Diluc. Tăng sát thương đầu ra theo thời gian đứng sân, khuyên dùng đi kèm nhân vật tạo khiên để giữ tầng tích lũy.", passiveDescEn: "Vũ khí Battle Pass cực mạnh cho Diluc. Tăng sát thương đầu ra theo thời gian đứng sân, khuyên dùng đi kèm nhân vật tạo khiên để giữ tầng tích lũy.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Kione.png" },
      { rank: 6, nameVi: "Nanh Sơn Vương", nameEn: "Nanh Sơn Vương", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích. Sau khi Kỹ Năng Nguyên Tố đánh trúng kẻ địch sẽ tăng Tấn Công% và Tăng Sát Thương Nguyên Tố cho toàn bộ kỹ năng.", passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích. Sau khi Kỹ Năng Nguyên Tố đánh trúng kẻ địch sẽ tăng Tấn Công% và Tăng Sát Thương Nguyên Tố cho toàn bộ kỹ năng.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_EmeraldSword.png" },
      { rank: 7, nameVi: "Đường Cùng Của Sói", nameEn: "Đường Cùng Của Sói", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Lượng Tấn Công% khổng lồ giúp Diluc gây sát thương ổn định. Khi đánh trúng địch có HP dưới 30% sẽ buff thêm lượng lớn Tấn Công cho cả đội.", passiveDescEn: "Lượng Tấn Công% khổng lồ giúp Diluc gây sát thương ổn định. Khi đánh trúng địch có HP dưới 30% sẽ buff thêm lượng lớn Tấn Công cho cả đội.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Wolfmound.png" },
      { rank: 8, nameVi: "Kiếm Vô Công", nameEn: "Kiếm Vô Công", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Tăng hiệu quả Khiên và Tấn Công% cộng dồn khi đánh trúng địch. Yêu cầu bắt buộc có khiên (như Zhongli) để phát huy tối đa sức mạnh.", passiveDescEn: "Tăng hiệu quả Khiên và Tấn Công% cộng dồn khi đánh trúng địch. Yêu cầu bắt buộc có khiên (như Zhongli) để phát huy tối đa sức mạnh.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Kunwu.png" },
      { rank: 9, nameVi: "Tiếng Gió Trong Rừng Thông", nameEn: "Tiếng Gió Trong Rừng Thông", subStat: "Tăng Sát Thương Vật Lý", isF2P: false, refinement: "R1", passiveDescVi: "Chỉ số ATK cơ bản cực cao và nội tại tăng Tấn Công%, Tốc Độ Tấn Công khi tích đủ tầng, dù dòng phụ Sát Thương Vật Lý bị lãng phí.", passiveDescEn: "Chỉ số ATK cơ bản cực cao và nội tại tăng Tấn Công%, Tốc Độ Tấn Công khi tích đủ tầng, dù dòng phụ Sát Thương Vật Lý bị lãng phí.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Widsith.png" },
      { rank: 10, nameVi: "Vũ Tài", nameEn: "Vũ Tài", subStat: "Tinh Thông Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Cực kỳ mạnh trong các đội hình phản ứng Bốc Hơi nhờ lượng Tinh Thông Nguyên Tố lớn và tăng sát thương lên kẻ địch bị ấn Thủy.", passiveDescEn: "Cực kỳ mạnh trong các đội hình phản ứng Bốc Hơi nhờ lượng Tinh Thông Nguyên Tố lớn và tăng sát thương lên kẻ địch bị ấn Thủy.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Perdue.png" },
      { rank: 11, nameVi: "Đóa Hoa Tôn Màu Thép", nameEn: "Đóa Hoa Tôn Màu Thép", subStat: "Tinh Thông Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Lựa chọn F2P Event hoàn hảo cho đội phản ứng. Tăng Tinh Thông Nguyên Tố và Tấn Công% sau khi dùng Kỹ Năng Nguyên Tố.", passiveDescEn: "Lựa chọn F2P Event hoàn hảo cho đội phản ứng. Tăng Tinh Thông Nguyên Tố và Tấn Công% sau khi dùng Kỹ Năng Nguyên Tố.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Fleurfair.png" },
      { rank: 12, nameVi: "Bóng Tối Thủy Triều", nameEn: "Bóng Tối Thủy Triều", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí rèn Fontaine cung cấp lượng lớn Tấn Công% sau khi nhận hồi máu. Dễ dàng kích hoạt và tối ưu khi đi cùng Healer.", passiveDescEn: "Vũ khí rèn Fontaine cung cấp lượng lớn Tấn Công% sau khi nhận hồi máu. Dễ dàng kích hoạt và tối ưu khi đi cùng Healer.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Vorpal.png" },
      { rank: 13, nameVi: "Hắc Nham Trảm Đao", nameEn: "Hắc Nham Trảm Đao", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Sát Thương Bạo Kích tốt giúp dễ build chỉ số. Nội tại tăng Tấn Công khi hạ gục kẻ địch, thích hợp khi đấu nhiều quái lẻ.", passiveDescEn: "Cung cấp Sát Thương Bạo Kích tốt giúp dễ build chỉ số. Nội tại tăng Tấn Công khi hạ gục kẻ địch, thích hợp khi đấu nhiều quái lẻ.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Blackrock.png" },
      { rank: 14, nameVi: "Thiên Không Kiêu Ngạo", nameEn: "Thiên Không Kiêu Ngạo", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Hiệu Quả Nạp giúp spam Nộ mượt mà. Nội tại tăng nhẹ sát thương và tạo ra các lưỡi đao chân không gây dame vật lý.", passiveDescEn: "Cung cấp Hiệu Quả Nạp giúp spam Nộ mượt mà. Nội tại tăng nhẹ sát thương và tạo ra các lưỡi đao chân không gây dame vật lý.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Dvalin.png" },
      { rank: 15, nameVi: "Đao Chấn Động", nameEn: "Đao Chấn Động", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí rèn Natlan cung cấp Tấn Công%. Thích hợp dùng trong các đội hình phản ứng có liên quan hệ Thảo để buff sát thương.", passiveDescEn: "Vũ khí rèn Natlan cung cấp Tấn Công%. Thích hợp dùng trong các đội hình phản ứng có liên quan hệ Thảo để buff sát thương.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Isikhulu.png" }
    ],
    talentPriority: ["Normal Attack", "Skill", "Burst"],
    bestArtifacts: [
      {
        setNameVi: "Diệm Liệt Ma Nữ Cháy Rực", setNameEn: "Diệm Liệt Ma Nữ Cháy Rực",
        pieces: 4,
        sands: ["Tinh Thông Nguyên Tố", "Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Elemental Mastery", "Energy Recharge"]
      },
      {
        setNameVi: "Giấc Mộng Hoàng Kim", setNameEn: "Giấc Mộng Hoàng Kim",
        pieces: 4,
        sands: ["Tinh Thông Nguyên Tố", "Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Elemental Mastery", "Energy Recharge"]
      },
      {
        setNameVi: "Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công", setNameEn: "Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công",
        pieces: 2,
        sands: ["Tinh Thông Nguyên Tố", "Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Elemental Mastery", "Energy Recharge"]
      },
      {
        setNameVi: "Lễ Bế Mạc Của Giác Đấu Sĩ", setNameEn: "Lễ Bế Mạc Của Giác Đấu Sĩ",
        pieces: 4,
        sands: ["Tinh Thông Nguyên Tố", "Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Elemental Mastery", "Energy Recharge"]
      },
      {
        setNameVi: "Thợ Săn Marechaussee", setNameEn: "Thợ Săn Marechaussee",
        pieces: 4,
        sands: ["Tinh Thông Nguyên Tố", "Tấn Công%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Elemental Mastery", "Energy Recharge"]
      }
    ],
    bestTeams: ["xingqiu", "kazuha", "zhongli", "venti", "albedo", "furina", "xianyun", "bennett", "sucrose", "ganyu", "diona", "ayaka"]
  },
  {
    characterId: "bennett",
    bestWeapons: [
      { rank: 1, nameVi: "Ánh Sáng Đêm Sương Mù", nameEn: "Ánh Sáng Đêm Sương Mù", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tấn công cơ bản cao nhất game (674) giúp gia tăng tối đa lượng buff Tấn Công của Kỹ Năng Nộ, dù dòng phụ Sát Thương Bạo Kích ít có tác dụng hỗ trợ.", passiveDescEn: "Tấn công cơ bản cao nhất game (674) giúp gia tăng tối đa lượng buff Tấn Công của Kỹ Năng Nộ, dù dòng phụ Sát Thương Bạo Kích ít có tác dụng hỗ trợ.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Narukami.png" },
      { rank: 2, nameVi: "Xá Tội", nameEn: "Xá Tội", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tấn công cơ bản cực cao (674) giúp tối ưu hóa lượng buff Tấn Công. Chỉ số Sát Thương Bạo Kích tuy không quá lý tưởng cho lối chơi thuần hỗ trợ nhưng vẫn rất giá trị.", passiveDescEn: "Tấn công cơ bản cực cao (674) giúp tối ưu hóa lượng buff Tấn Công. Chỉ số Sát Thương Bạo Kích tuy không quá lý tưởng cho lối chơi thuần hỗ trợ nhưng vẫn rất giá trị.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Estoc.png" },
      { rank: 3, nameVi: "Thương Diệu", nameEn: "Thương Diệu", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tấn công cơ bản tối đa (674) kết hợp hoàn hảo cùng dòng phụ Tỷ Lệ Bạo Kích. Hỗ trợ sạc Nộ tốt và buff sát thương hiệu quả.", passiveDescEn: "Tấn công cơ bản tối đa (674) kết hợp hoàn hảo cùng dòng phụ Tỷ Lệ Bạo Kích. Hỗ trợ sạc Nộ tốt và buff sát thương hiệu quả.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_OuterSword.png" },
      { rank: 4, nameVi: "Phong Ưng Kiếm", nameEn: "Phong Ưng Kiếm", subStat: "Tăng Sát Thương Vật Lý", isF2P: false, refinement: "R1", passiveDescVi: "Tấn công cơ bản cao (674) giúp cung cấp lượng buff ATK cực lớn cho đồng đội. Dòng phụ Sát Thương Vật Lý bị lãng phí nhưng nội tại tự hồi máu thỉnh thoảng giúp ích.", passiveDescEn: "Tấn công cơ bản cao (674) giúp cung cấp lượng buff ATK cực lớn cho đồng đội. Dòng phụ Sát Thương Vật Lý bị lãng phí nhưng nội tại tự hồi máu thỉnh thoảng giúp ích.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Falcon.png" },
      { rank: 5, nameVi: "Tia Sáng Nơi Hẻm Tối", nameEn: "Tia Sáng Nơi Hẻm Tối", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Vũ khí 4 sao có Tấn Công cơ bản cao nhất (620). Tăng nhẹ sát thương cá nhân, dòng phụ Tinh Thông Nguyên Tố hỗ trợ phản ứng tốt.", passiveDescEn: "Vũ khí 4 sao có Tấn Công cơ bản cao nhất (620). Tăng nhẹ sát thương cá nhân, dòng phụ Tinh Thông Nguyên Tố hỗ trợ phản ứng tốt.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Outlaw.png" },
      { rank: 6, nameVi: "Lời Thề Tự Do Cổ Xưa", nameEn: "Lời Thề Tự Do Cổ Xưa", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Tấn công cơ bản khá tốt (608). Nội tại tăng Tấn Công% và sát thương đánh thường cho cả đội, hỗ trợ hoàn hảo cho đội hình phản ứng bốc hơi/tan chảy.", passiveDescEn: "Tấn công cơ bản khá tốt (608). Nội tại tăng Tấn Công% và sát thương đánh thường cho cả đội, hỗ trợ hoàn hảo cho đội hình phản ứng bốc hơi/tan chảy.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Widsith.png" },
      { rank: 7, nameVi: "Khúc Ca Núi Đá", nameEn: "Khúc Ca Núi Đá", subStat: "Phòng Thủ%", isF2P: false, refinement: "R1", passiveDescVi: "Tấn công cơ bản cực cao (674) tương tự Thương Diệu, giúp sạc Nộ tốt và gia tăng lượng buff Tấn Công khổng lồ.", passiveDescEn: "Tấn công cơ bản cực cao (674) tương tự Thương Diệu, giúp sạc Nộ tốt và gia tăng lượng buff Tấn Công khổng lồ.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_XochitlsTube.png" },
      { rank: 8, nameVi: "Thiên Không Kiếm", nameEn: "Thiên Không Kiếm", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Tấn công cơ bản cao (608) đi kèm dòng phụ Hiệu Quả Nạp rất lớn, giúp Bennett spam Nộ cực kỳ dễ dàng mà không lo thiếu nạp.", passiveDescEn: "Tấn công cơ bản cao (608) đi kèm dòng phụ Hiệu Quả Nạp rất lớn, giúp Bennett spam Nộ cực kỳ dễ dàng mà không lo thiếu nạp.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Dvalin.png" },
      { rank: 9, nameVi: "Kiếm Gỗ", nameEn: "Kiếm Gỗ", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí rèn Sumeru F2P tốt nhất cho Bennett. Tấn công cơ bản ổn định (565), dòng phụ Hiệu Quả Nạp và tạo hạt buff tinh thông cho đồng đội.", passiveDescEn: "Vũ khí rèn Sumeru F2P tốt nhất cho Bennett. Tấn công cơ bản ổn định (565), dòng phụ Hiệu Quả Nạp và tạo hạt buff tinh thông cho đồng đội.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Arakalari.png" },
      { rank: 10, nameVi: "Mẫu Trảm Nham", nameEn: "Mẫu Trảm Nham", subStat: "Tăng Sát Thương Vật Lý", isF2P: true, refinement: "R1", passiveDescVi: "Tấn công cơ bản tương đối tốt (565) cho vũ khí F2P dễ kiếm. Dòng phụ Vật Lý ít tác dụng, khuyên dùng khi không có lựa chọn nào khác.", passiveDescEn: "Tấn công cơ bản tương đối tốt (565) cho vũ khí F2P dễ kiếm. Dòng phụ Vật Lý ít tác dụng, khuyên dùng khi không có lựa chọn nào khác.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Proto.png" },
      { rank: 11, nameVi: "Tai Họa Eshu", nameEn: "Tai Họa Eshu", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Tấn công cơ bản cao (565) nhưng không có dòng phụ Hiệu Quả Nạp. Nội tại tăng Tấn Công% sau khi được hồi máu.", passiveDescEn: "Tấn công cơ bản cao (565) nhưng không có dòng phụ Hiệu Quả Nạp. Nội tại tăng Tấn Công% sau khi được hồi máu.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_SacrificialNgombe.png" },
      { rank: 12, nameVi: "Tây Phong Kiếm", nameEn: "Tây Phong Kiếm", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Tấn công cơ bản thấp (454) làm giảm lượng buff Tấn Công. Tuy nhiên dòng phụ Nạp rất cao và nội tại sinh hạt năng lượng giúp sạc nhanh cho cả đội.", passiveDescEn: "Tấn công cơ bản thấp (454) làm giảm lượng buff Tấn Công. Tuy nhiên dòng phụ Nạp rất cao và nội tại sinh hạt năng lượng giúp sạc nhanh cho cả đội.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Zephyrus.png" }
    ],
    talentPriority: ["Burst", "Skill", "Normal Attack"],
    bestArtifacts: [
      {
        setNameVi: "Nghi Thức Tông Thất Cổ", setNameEn: "Nghi Thức Tông Thất Cổ",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tấn Công%", "HP%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa", "HP%"],
        circlet: ["Tỷ Lệ Bạo Kích", "HP%", "Tăng Trị Liệu"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "HP%", "ATK%", "HP"]
      },
      {
        setNameVi: "Giáo Quan", setNameEn: "Giáo Quan",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tấn Công%", "HP%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa", "HP%"],
        circlet: ["Tỷ Lệ Bạo Kích", "HP%", "Tăng Trị Liệu"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "HP%", "ATK%", "HP"]
      },
      {
        setNameVi: "Bức Tranh Dũng Sĩ Thành Tro Tàn", setNameEn: "Bức Tranh Dũng Sĩ Thành Tro Tàn",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tấn Công%", "HP%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa", "HP%"],
        circlet: ["Tỷ Lệ Bạo Kích", "HP%", "Tăng Trị Liệu"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "HP%", "ATK%", "HP"]
      },
      {
        setNameVi: "Ký Ức Rừng Sâu", setNameEn: "Ký Ức Rừng Sâu",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tấn Công%", "HP%"],
        goblet: ["Sát Thương Nguyên Tố Hỏa", "HP%"],
        circlet: ["Tỷ Lệ Bạo Kích", "HP%", "Tăng Trị Liệu"],
        subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "HP%", "ATK%", "HP"]
      }
    ],
    bestTeams: ["tartaglia", "xiangling", "kazuha", "raiden-shogun", "kujou-sara", "yoimiya", "xingqiu", "klee", "ganyu", "diona", "hu-tao", "sucrose", "yanfei", "eula", "fischl"]
  },
  {
    characterId: "amber",
    bestWeapons: [
      { rank: 1, nameVi: "Màn Ảo Thuật Đầu Tiên", nameEn: "Màn Ảo Thuật Đầu Tiên", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tấn công cơ bản cao và Sát Thương Bạo Kích cực lớn. Nội tại tăng sát thương Trọng Kích và tăng Tấn Công%, rất thích hợp cho lối chơi ngắm bắn của Amber.", passiveDescEn: "Tấn công cơ bản cao và Sát Thương Bạo Kích cực lớn. Nội tại tăng sát thương Trọng Kích và tăng Tấn Công%, rất thích hợp cho lối chơi ngắm bắn của Amber.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Pledge.png" },
      { rank: 2, nameVi: "Nhược Thủy", nameEn: "Nhược Thủy", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Chỉ số Sát Thương Bạo Kích khổng lồ (88.2%). Nội tại tăng sát thương khi ở gần kẻ địch, giúp tối ưu hóa lượng dame phản ứng Tan Chảy.", passiveDescEn: "Chỉ số Sát Thương Bạo Kích khổng lồ (88.2%). Nội tại tăng sát thương khi ở gần kẻ địch, giúp tối ưu hóa lượng dame phản ứng Tan Chảy.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Kirin.png" },
      { rank: 3, nameVi: "Sấm Sét Rung Động", nameEn: "Sấm Sét Rung Động", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp lượng lớn Sát Thương Bạo Kích và nội tại tăng Tấn Công%, thích hợp cho lối chơi ngắm bắn kết hợp xả chiêu.", passiveDescEn: "Cung cấp lượng lớn Sát Thương Bạo Kích và nội tại tăng Tấn Công%, thích hợp cho lối chơi ngắm bắn kết hợp xả chiêu.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Narukami.png" },
      { rank: 4, nameVi: "Cánh Thiên Không", nameEn: "Cánh Thiên Không", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tỷ Lệ Bạo Kích cao và nội tại tăng thêm Sát Thương Bạo Kích%. Cung cấp thêm sát thương vật lý diện rộng thỉnh thoảng, rất đa dụng.", passiveDescEn: "Tỷ Lệ Bạo Kích cao và nội tại tăng thêm Sát Thương Bạo Kích%. Cung cấp thêm sát thương vật lý diện rộng thỉnh thoảng, rất đa dụng.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Dvalin.png" },
      { rank: 5, nameVi: "Ngôi Sao Cực Đông", nameEn: "Ngôi Sao Cực Đông", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích. Nội tại tích tầng tăng Tấn Công% khi đánh trúng địch bằng Kỹ Năng Nguyên Tố, Nộ, Thường và Trọng Kích.", passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích. Nội tại tích tầng tăng Tấn Công% khi đánh trúng địch bằng Kỹ Năng Nguyên Tố, Nộ, Thường và Trọng Kích.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Worldbane.png" },
      { rank: 6, nameVi: "Nỏ Kéo", nameEn: "Nỏ Kéo", subStat: "Tỷ Lệ Bạo Kích", isF2P: true, refinement: "R5", passiveDescVi: "Lựa chọn 3 sao F2P cực mạnh nhờ lượng Tỷ Lệ Bạo Kích dồi dào và nội tại tăng mạnh sát thương đòn ngắm bắn trong cự ly gần.", passiveDescEn: "Lựa chọn 3 sao F2P cực mạnh nhờ lượng Tỷ Lệ Bạo Kích dồi dào và nội tại tăng mạnh sát thương đòn ngắm bắn trong cự ly gần.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Sling.png" },
      { rank: 7, nameVi: "Cung Amos", nameEn: "Cung Amos", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Tấn Cống% cực cao. Tăng sát thương Tấn Công Thường và Ngắm Bắn, sát thương tăng thêm dựa trên thời gian bay của mũi tên.", passiveDescEn: "Tấn Cống% cực cao. Tăng sát thương Tấn Công Thường và Ngắm Bắn, sát thương tăng thêm dựa trên thời gian bay của mũi tên.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Amos.png" },
      { rank: 8, nameVi: "Con Đường Thợ Săn", nameEn: "Con Đường Thợ Săn", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tỷ Lệ Bạo Kích cao. Nội tại tăng sát thương Trọng Kích dựa trên Tinh Thông Nguyên Tố, cực mạnh trong đội hình Tan Chảy.", passiveDescEn: "Tỷ Lệ Bạo Kích cao. Nội tại tăng sát thương Trọng Kích dựa trên Tinh Thông Nguyên Tố, cực mạnh trong đội hình Tan Chảy.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Ayus.png" },
      { rank: 9, nameVi: "Mỏ Cò Xuyên Thấu", nameEn: "Mỏ Cò Xuyên Thấu", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí Event F2P tăng Tinh Thông Nguyên Tố sau khi đánh trúng địch bằng trọng kích, trực tiếp khuếch đại sát thương phản ứng.", passiveDescEn: "Vũ khí Event F2P tăng Tinh Thông Nguyên Tố sau khi đánh trúng địch bằng trọng kích, trực tiếp khuếch đại sát thương phản ứng.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Ibis.png" },
      { rank: 10, nameVi: "Cung Sắc Xanh", nameEn: "Cung Sắc Xanh", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Dòng phụ Tỷ Lệ Bạo Kích và nội tại tạo gió lốc nhỏ gom quái, giúp Amber dễ dàng thực hiện các phát bắn chuẩn xác.", passiveDescEn: "Dòng phụ Tỷ Lệ Bạo Kích và nội tại tạo gió lốc nhỏ gom quái, giúp Amber dễ dàng thực hiện các phát bắn chuẩn xác.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Viridescent.png" },
      { rank: 11, nameVi: "Cung Trừ Ma", nameEn: "Cung Trừ Ma", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí rèn Inazuma F2P tăng mạnh sát thương đòn ngắm bắn, hiệu quả tối đa khi giữ đầy thanh năng lượng Nộ.", passiveDescEn: "Vũ khí rèn Inazuma F2P tăng mạnh sát thương đòn ngắm bắn, hiệu quả tối đa khi giữ đầy thanh năng lượng Nộ.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Bakufu.png" },
      { rank: 12, nameVi: "Mẫu Đạm Nguyệt", nameEn: "Mẫu Đạm Nguyệt", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Cung cấp lượng lớn Tấn Công% sau khi bắn trúng điểm yếu của kẻ địch, lựa chọn ngắm bắn bắn tỉa rất tốt.", passiveDescEn: "Cung cấp lượng lớn Tấn Công% sau khi bắn trúng điểm yếu của kẻ địch, lựa chọn ngắm bắn bắn tỉa rất tốt.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Proto.png" },
      { rank: 13, nameVi: "Khúc Ca Tĩnh Lặng", nameEn: "Khúc Ca Tĩnh Lặng", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí rèn Fontaine tăng mạnh sát thương đòn đánh sau khi nhận trị liệu, dễ kích hoạt khi đi cùng Healer.", passiveDescEn: "Vũ khí rèn Fontaine tăng mạnh sát thương đòn đánh sau khi nhận trị liệu, dễ kích hoạt khi đi cùng Healer.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Vorpal.png" },
      { rank: 14, nameVi: "Bài Ca Hoa Gió", nameEn: "Bài Ca Hoa Gió", subStat: "Tinh Thông Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Tăng Tinh Thông Nguyên Tố và nhận thêm Tấn Công% sau khi dùng Kỹ Năng Nguyên Tố, hữu ích cho các pha phản ứng.", passiveDescEn: "Tăng Tinh Thông Nguyên Tố và nhận thêm Tấn Công% sau khi dùng Kỹ Năng Nguyên Tố, hữu ích cho các pha phản ứng.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Fleurfair.png" },
      { rank: 15, nameVi: "Tuyệt Huyền", nameEn: "Tuyệt Huyền", subStat: "Tinh Thông Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Tăng mạnh sát thương Kỹ Năng Nguyên Tố và Kỹ Năng Nộ, thích hợp cho lối chơi quickswap ném bù nhìn rối và xả Nộ.", passiveDescEn: "Tăng mạnh sát thương Kỹ Năng Nguyên Tố và Kỹ Năng Nộ, thích hợp cho lối chơi quickswap ném bù nhìn rối và xả Nộ.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Troupe.png" },
      { rank: 16, nameVi: "Lời Thề Xạ Thủ Thần", nameEn: "Lời Thề Xạ Thủ Thần", subStat: "Sát Thương Bạo Kích", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí 3 sao F2P hoàn hảo cho lối chơi bắn điểm yếu nhờ lượng lớn Sát Thương Bạo Kích và nội tại tăng 48% dame điểm yếu.", passiveDescEn: "Vũ khí 3 sao F2P hoàn hảo cho lối chơi bắn điểm yếu nhờ lượng lớn Sát Thương Bạo Kích và nội tại tăng 48% dame điểm yếu.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Arjuna.png" },
      { rank: 17, nameVi: "Cận Vệ Nhà Vua", nameEn: "Cận Vệ Nhà Vua", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí rèn Sumeru tăng Tinh Thông Nguyên Tố sau khi dùng kỹ năng, bổ trợ tốt cho các phản ứng nguyên tố.", passiveDescEn: "Vũ khí rèn Sumeru tăng Tinh Thông Nguyên Tố sau khi dùng kỹ năng, bổ trợ tốt cho các phản ứng nguyên tố.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Arakalari.png" },
      { rank: 18, nameVi: "Hậu Duệ Mặt Trời", nameEn: "Hậu Duệ Mặt Trời", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích. Đòn trọng kích trúng địch gây thêm sát thương Hỏa và tăng sát thương trọng kích tiếp theo lên mục tiêu đó.", passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích. Đòn trọng kích trúng địch gây thêm sát thương Hỏa và tăng sát thương trọng kích tiếp theo lên mục tiêu đó.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Gurabad.png" }
    ],
    talentPriority: ["Normal Attack", "Skill", "Burst"],
    bestArtifacts: [
      {
        setNameVi: "Dòng Hồi Ức Bất Tận", setNameEn: "Dòng Hồi Ức Bất Tận",
        pieces: 4,
        sands: ["Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT DMG", "ATK%", "Elemental Mastery"]
      },
      {
        setNameVi: "Đoàn Hát Lang Thang Đại Lục", setNameEn: "Đoàn Hát Lang Thang Đại Lục",
        pieces: 4,
        sands: ["Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT DMG", "ATK%", "Elemental Mastery"]
      },
      {
        setNameVi: "Diệm Liệt Ma Nữ Cháy Rực", setNameEn: "Diệm Liệt Ma Nữ Cháy Rực",
        pieces: 4,
        sands: ["Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT DMG", "ATK%", "Elemental Mastery"]
      },
      {
        setNameVi: "Giấc Mộng Hoàng Kim", setNameEn: "Giấc Mộng Hoàng Kim",
        pieces: 4,
        sands: ["Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT DMG", "ATK%", "Elemental Mastery"]
      },
      {
        setNameVi: "Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công", setNameEn: "Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công",
        pieces: 2,
        sands: ["Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Sát Thương Bạo Kích"],
        subStatsPriority: ["CRIT DMG", "ATK%", "Elemental Mastery"]
      }
    ],
    bestTeams: ["xingqiu", "kazuha", "bennett", "ayaka", "zhongli", "raiden-shogun", "fischl"]
  },
  {
    characterId: "yanfei",
    bestWeapons: [
      { rank: 1, nameVi: "Chân Ngôn Bí Hạp", nameEn: "Chân Ngôn Bí Hạp", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tấn công căn bản và Sát Thương Bạo Kích cao. Kỹ Năng Nộ giúp tăng Tinh Thông Nguyên Tố để phản ứng Bốc Hơi mạnh mẽ hơn.", passiveDescEn: "Tấn công căn bản và Sát Thương Bạo Kích cao. Kỹ Năng Nộ giúp tăng Tinh Thông Nguyên Tố để phản ứng Bốc Hơi mạnh mẽ hơn.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Sistrum.png" },
      { rank: 2, nameVi: "Nghi Thức Dòng Chảy Vĩnh Hằng", nameEn: "Nghi Thức Dòng Chảy Vĩnh Hằng", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Lượng Sát Thương Bạo Kích khổng lồ và tăng sát thương Đòn Đánh Thường. Hiệu ứng thay đổi HP dễ dàng được kích hoạt bởi các đòn Trọng Kích của Yanfei.", passiveDescEn: "Lượng Sát Thương Bạo Kích khổng lồ và tăng sát thương Đòn Đánh Thường. Hiệu ứng thay đổi HP dễ dàng được kích hoạt bởi các đòn Trọng Kích của Yanfei.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Iudex.png" },
      { rank: 3, nameVi: "Quản Đốc Vàng Ròng", nameEn: "Quản Đốc Vàng Ròng", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tỷ Lệ Bạo Kích cao và tăng Tấn Công% sau khi dùng Kỹ Năng Nguyên Tố, rất phù hợp với chu kỳ combo của Yanfei.", passiveDescEn: "Tỷ Lệ Bạo Kích cao và tăng Tấn Công% sau khi dùng Kỹ Năng Nguyên Tố, rất phù hợp với chu kỳ combo của Yanfei.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Wheatley.png" },
      { rank: 4, nameVi: "Tâm Niệm Sắc Màu", nameEn: "Tâm Niệm Sắc Màu", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Tinh Thông Nguyên Tố và Tỷ Lệ Bạo Kích. Sau khi kích hoạt phản ứng, cả đội nhận thêm Tấn Công%, có lợi cho cả Yanfei lẫn đồng đội hỗ trợ.", passiveDescEn: "Cung cấp Tinh Thông Nguyên Tố và Tỷ Lệ Bạo Kích. Sau khi kích hoạt phản ứng, cả đội nhận thêm Tấn Công%, có lợi cho cả Yanfei lẫn đồng đội hỗ trợ.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_VaresaTransformer.png" },
      { rank: 5, nameVi: "Thời Khắc Lướt Sóng", nameEn: "Thời Khắc Lướt Sóng", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Sát Thương Bạo Kích cao và tăng tốc độ Đánh Thường. Phản ứng Bốc Hơi giúp tăng thêm Tinh Thông Nguyên Tố.", passiveDescEn: "Sát Thương Bạo Kích cao và tăng tốc độ Đánh Thường. Phản ứng Bốc Hơi giúp tăng thêm Tinh Thông Nguyên Tố.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_MechaPufferfish.png" },
      { rank: 6, nameVi: "Cõi Mộng Ngàn Đêm", nameEn: "Cõi Mộng Ngàn Đêm", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Tăng Tinh Thông Nguyên Tố cho cả đội và lượng lớn TTNT cá nhân. Rất lý tưởng cho đội hình chuyên phản ứng, tăng mạnh sát thương Bốc Hơi.", passiveDescEn: "Tăng Tinh Thông Nguyên Tố cho cả đội và lượng lớn TTNT cá nhân. Rất lý tưởng cho đội hình chuyên phản ứng, tăng mạnh sát thương Bốc Hơi.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Ayus.png" },
      { rank: 7, nameVi: "Ánh Nhìn Tư Tế", nameEn: "Ánh Nhìn Tư Tế", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích và Hiệu Quả Nạp. Buff sát thương Kỹ Năng Nộ giúp tối ưu khả năng dồn sát thương của Yanfei.", passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích và Hiệu Quả Nạp. Buff sát thương Kỹ Năng Nộ giúp tối ưu khả năng dồn sát thương của Yanfei.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Figurines.png" },
      { rank: 8, nameVi: "Dòng Chảy Trong Trẻo", nameEn: "Dòng Chảy Trong Trẻo", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Lựa chọn rèn F2P cung cấp dòng phụ Tấn Công%. Nội tại tăng Sát Thương Nguyên Tố sau khi dùng Kỹ Năng Nguyên Tố, đơn giản nhưng hiệu quả.", passiveDescEn: "Lựa chọn rèn F2P cung cấp dòng phụ Tấn Công%. Nội tại tăng Sát Thương Nguyên Tố sau khi dùng Kỹ Năng Nguyên Tố, đơn giản nhưng hiệu quả.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Vorpal.png" },
      { rank: 9, nameVi: "Chương Nhạc Lang Thang", nameEn: "Chương Nhạc Lang Thang", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R5", passiveDescVi: "Nhận ngẫu nhiên các buff khi ra sân: Tấn Công%, Tăng Sát Thương Nguyên Tố hoặc Tinh Thông Nguyên Tố. Cả 3 buff đều cực kỳ có lợi cho lối chơi Bốc Hơi của Yanfei.", passiveDescEn: "Nhận ngẫu nhiên các buff khi ra sân: Tấn Công%, Tăng Sát Thương Nguyên Tố hoặc Tinh Thông Nguyên Tố. Cả 3 buff đều cực kỳ có lợi cho lối chơi Bốc Hơi của Yanfei.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Troupe.png" },
      { rank: 10, nameVi: "Sương Mai", nameEn: "Sương Mai", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Dòng phụ Sát Thương Bạo Kích. Sau khi kích hoạt phản ứng Nguyên Tố Hỏa, tăng Tấn Công và Tỷ Lệ Bạo Kích, rất đồng bộ với lối chơi của Yanfei.", passiveDescEn: "Dòng phụ Sát Thương Bạo Kích. Sau khi kích hoạt phản ứng Nguyên Tố Hỏa, tăng Tấn Công và Tỷ Lệ Bạo Kích, rất đồng bộ với lối chơi của Yanfei.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Ziedas.png" }
    ],
    talentPriority: ["Normal Attack", "Burst", "Skill"],
    bestArtifacts: [
      {
        setNameVi: "Diệm Liệt Ma Nữ Cháy Rực", setNameEn: "Diệm Liệt Ma Nữ Cháy Rực",
        pieces: 4,
        sands: ["Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "Tấn Công%", "Tinh Thông Nguyên Tố", "Hiệu Quả Nạp"]
      },
      {
        setNameVi: "Giấc Mộng Hoàng Kim", setNameEn: "Giấc Mộng Hoàng Kim",
        pieces: 4,
        sands: ["Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "Tấn Công%", "Tinh Thông Nguyên Tố", "Hiệu Quả Nạp"]
      },
      {
        setNameVi: "Đoàn Hát Lang Thang Đại Lục", setNameEn: "Đoàn Hát Lang Thang Đại Lục",
        pieces: 4,
        sands: ["Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "Tấn Công%", "Tinh Thông Nguyên Tố", "Hiệu Quả Nạp"]
      },
      {
        setNameVi: "Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công", setNameEn: "Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công",
        pieces: 2,
        sands: ["Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "Tấn Công%", "Tinh Thông Nguyên Tố", "Hiệu Quả Nạp"]
      },
      {
        setNameVi: "Thợ Săn Marechaussee", setNameEn: "Thợ Săn Marechaussee",
        pieces: 4,
        sands: ["Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "Tấn Công%", "Tinh Thông Nguyên Tố", "Hiệu Quả Nạp"]
      }
    ],
    bestTeams: ["yelan", "nahida", "zhongli", "xingqiu", "kazuha", "venti", "albedo", "sucrose", "bennett", "xiangling", "ganyu", "diona", "ayaka"]
  },
  {
    characterId: "yoimiya",
    bestWeapons: [
      { rank: 1, nameVi: "Sấm Sét Rung Động", nameEn: "Sấm Sét Rung Động", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Best-in-slot: high base ATK and CRIT DMG, passive boosts Normal Attack damage and stacks with her Pyro infusion.", passiveDescEn: "Best-in-slot: high base ATK and CRIT DMG, passive boosts Normal Attack damage and stacks with her Pyro infusion.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Narukami.png" },
      { rank: 2, nameVi: "Nhược Thủy", nameEn: "Nhược Thủy", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "High CRIT DMG and unconditional damage bonus. The passive condition (enemies nearby) is usually met in her attack range.", passiveDescEn: "High CRIT DMG and unconditional damage bonus. The passive condition (enemies nearby) is usually met in her attack range.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Kirin.png" },
      { rank: 3, nameVi: "Màn Ảo Thuật Đầu Tiên", nameEn: "Màn Ảo Thuật Đầu Tiên", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Provides CRIT DMG and ATK% based on party elemental diversity, which works well in reaction teams.", passiveDescEn: "Provides CRIT DMG and ATK% based on party elemental diversity, which works well in reaction teams.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Pledge.png" },
      { rank: 4, nameVi: "Ngôi Sao Cực Đông", nameEn: "Ngôi Sao Cực Đông", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "ATK% substat and passive that increases ATK and Skill/Burst damage. Requires stacking but effective.", passiveDescEn: "ATK% substat and passive that increases ATK and Skill/Burst damage. Requires stacking but effective.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Worldbane.png" },
      { rank: 5, nameVi: "Con Đường Thợ Săn", nameEn: "Con Đường Thợ Săn", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Decent CRIT Rate stat stick; the passive boosts Charged Attacks, which are rarely used, so it's a fallback option.", passiveDescEn: "Decent CRIT Rate stat stick; the passive boosts Charged Attacks, which are rarely used, so it's a fallback option.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Ayus.png" },
      { rank: 6, nameVi: "Cánh Thiên Không", nameEn: "Cánh Thiên Không", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Solid CRIT Rate and extra CRIT DMG from passive. A reliable stat stick.", passiveDescEn: "Solid CRIT Rate and extra CRIT DMG from passive. A reliable stat stick.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Dvalin.png" },
      { rank: 7, nameVi: "Nỏ Kéo", nameEn: "Nỏ Kéo", subStat: "Tỷ Lệ Bạo Kích", isF2P: true, refinement: "R5", passiveDescVi: "3-star weapon with high CRIT Rate. Passive works at close range; good early game but inconsistent at longer ranges.", passiveDescEn: "3-star weapon with high CRIT Rate. Passive works at close range; good early game but inconsistent at longer ranges.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Sling.png" },
      { rank: 8, nameVi: "Cung Amos", nameEn: "Cung Amos", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "High base ATK and passive that increases Normal and Charged Attack damage over time. Decent but outclassed by other options.", passiveDescEn: "High base ATK and passive that increases Normal and Charged Attack damage over time. Decent but outclassed by other options.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Amos.png" },
      { rank: 9, nameVi: "Cung Rỉ Sét", nameEn: "Cung Rỉ Sét", subStat: "Tấn Công%", isF2P: false, refinement: "R5", passiveDescVi: "ATK% substat and passive that boosts Normal Attack damage by up to 80% at R5 while reducing Charged Attack damage. Excellent for her playstyle.", passiveDescEn: "ATK% substat and passive that boosts Normal Attack damage by up to 80% at R5 while reducing Charged Attack damage. Excellent for her playstyle.", iconUrl: "/images/weapons/UI_EquipIcon_Bow_Recluse.png" }
    ],
    talentPriority: ["Normal Attack", "Skill", "Burst"],
    bestArtifacts: [
      {
        setNameVi: "Dòng Hồi Ức Bất Tận", setNameEn: "Dòng Hồi Ức Bất Tận",
        pieces: 4,
        sands: ["Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "Tấn Công%", "Tinh Thông Nguyên Tố", "Hiệu Quả Nạp"]
      },
      {
        setNameVi: "Diệm Liệt Ma Nữ Cháy Rực", setNameEn: "Diệm Liệt Ma Nữ Cháy Rực",
        pieces: 4,
        sands: ["Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "Tấn Công%", "Tinh Thông Nguyên Tố", "Hiệu Quả Nạp"]
      },
      {
        setNameVi: "Giấc Mộng Hoàng Kim", setNameEn: "Giấc Mộng Hoàng Kim",
        pieces: 4,
        sands: ["Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "Tấn Công%", "Tinh Thông Nguyên Tố", "Hiệu Quả Nạp"]
      },
      {
        setNameVi: "Dư Âm Tế Lễ", setNameEn: "Dư Âm Tế Lễ",
        pieces: 4,
        sands: ["Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "Tấn Công%", "Tinh Thông Nguyên Tố", "Hiệu Quả Nạp"]
      },
      {
        setNameVi: "Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công", setNameEn: "Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công",
        pieces: 2,
        sands: ["Tấn Công%", "Tinh Thông Nguyên Tố"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "Tấn Công%", "Tinh Thông Nguyên Tố", "Hiệu Quả Nạp"]
      }
    ],
    bestTeams: ["xingqiu", "yunjin", "zhongli", "ayato", "yelan", "ganyu", "kazuha", "diona", "raiden-shogun", "bennett", "venti", "fischl", "chevreuse"]
  },
  {
    characterId: "thoma",
    bestWeapons: [
      { rank: 1, nameVi: "Giáo Thập Tự Kitain", nameEn: "Giáo Thập Tự Kitain", subStat: "Tinh Thông Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Provides Elemental Mastery and refunds energy after using Skill, helping sustain Burst uptime.", passiveDescEn: "Provides Elemental Mastery and refunds energy after using Skill, helping sustain Burst uptime.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Bakufu.png" },
      { rank: 2, nameVi: "Thương Tây Phong", nameEn: "Thương Tây Phong", subStat: "Hiệu Quả Nạp", isF2P: true, refinement: "R5", passiveDescVi: "Generates energy particles for the team on CRIT, ensuring consistent Burst availability.", passiveDescEn: "Generates energy particles for the team on CRIT, ensuring consistent Burst availability.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Zephyrus.png" },
      { rank: 3, nameVi: "Tai Ương Của Rồng", nameEn: "Tai Ương Của Rồng", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R5", passiveDescVi: "High Elemental Mastery substat and passive boosts damage against enemies affected by Hydro or Pyro.", passiveDescEn: "High Elemental Mastery substat and passive boosts damage against enemies affected by Hydro or Pyro.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Stardust.png" },
      { rank: 4, nameVi: "Quán Nguyệt Thương", nameEn: "Quán Nguyệt Thương", subStat: "Tinh Thông Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Offers Elemental Mastery and creates a leaf that boosts ATK for the team, useful for driving reactions.", passiveDescEn: "Offers Elemental Mastery and creates a leaf that boosts ATK for the team, useful for driving reactions.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Arakalari.png" },
      { rank: 5, nameVi: "Hắc Anh Thương", nameEn: "Hắc Anh Thương", subStat: "HP%", isF2P: true, refinement: "R5", passiveDescVi: "Budget option providing HP% for stronger shields, but offers no Elemental Mastery or energy.", passiveDescEn: "Budget option providing HP% for stronger shields, but offers no Elemental Mastery or energy.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Noire.png" },
      { rank: 6, nameVi: "Thù Lao Của Chính Nghĩa", nameEn: "Thù Lao Của Chính Nghĩa", subStat: "HP%", isF2P: true, refinement: "R5", passiveDescVi: "F2P spear with HP% and energy regeneration when using Skill, aiding Burst uptime.", passiveDescEn: "F2P spear with HP% and energy regeneration when using Skill, aiding Burst uptime.", iconUrl: "/images/weapons/UI_EquipIcon_Pole_Vorpal.png" }
    ],
    talentPriority: ["Skill", "Burst", "Normal Attack"],
    bestArtifacts: [
      {
        setNameVi: "Đóa Hoa Trang Viên Thất Lạc", setNameEn: "Đóa Hoa Trang Viên Thất Lạc",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tinh Thông Nguyên Tố"],
        goblet: ["Tinh Thông Nguyên Tố"],
        circlet: ["Tinh Thông Nguyên Tố"],
        subStatsPriority: ["Hiệu Quả Nạp", "Tinh Thông Nguyên Tố", "HP%", "HP", "Tỷ Lệ Bạo Kích"]
      },
      {
        setNameVi: "Giấc Mộng Hoàng Kim", setNameEn: "Giấc Mộng Hoàng Kim",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tinh Thông Nguyên Tố"],
        goblet: ["Tinh Thông Nguyên Tố"],
        circlet: ["Tinh Thông Nguyên Tố"],
        subStatsPriority: ["Hiệu Quả Nạp", "Tinh Thông Nguyên Tố", "HP%", "HP", "Tỷ Lệ Bạo Kích"]
      },
      {
        setNameVi: "Mix 2 bộ Tinh Thông / Dấu Ấn", setNameEn: "Mix 2 bộ Tinh Thông / Dấu Ấn",
        pieces: 2,
        sands: ["Hiệu Quả Nạp", "Tinh Thông Nguyên Tố"],
        goblet: ["Tinh Thông Nguyên Tố"],
        circlet: ["Tinh Thông Nguyên Tố"],
        subStatsPriority: ["Hiệu Quả Nạp", "Tinh Thông Nguyên Tố", "HP%", "HP", "Tỷ Lệ Bạo Kích"]
      },
      {
        setNameVi: "Diệm Liệt Ma Nữ Cháy Rực", setNameEn: "Diệm Liệt Ma Nữ Cháy Rực",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tinh Thông Nguyên Tố"],
        goblet: ["Tinh Thông Nguyên Tố"],
        circlet: ["Tinh Thông Nguyên Tố"],
        subStatsPriority: ["Hiệu Quả Nạp", "Tinh Thông Nguyên Tố", "HP%", "HP", "Tỷ Lệ Bạo Kích"]
      }
    ],
    bestTeams: ["ayato", "yelan", "nahida", "xingqiu", "hu-tao", "kazuha", "chongyun", "bennett", "eula", "raiden-shogun", "rosaria", "fischl", "yanfei", "sucrose"]
  },
  {
    characterId: "dehya",
    bestWeapons: [
      { rank: 1, nameVi: "Hải Đăng Bờ Biển Lau", nameEn: "Hải Đăng Bờ Biển Lau", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tấn công căn bản và Tỷ Lệ Bạo Kích cao. Nội tại tăng Tấn Công% và HP% sau khi Kỹ Năng Nguyên Tố đánh trúng địch.", passiveDescEn: "Tấn công căn bản và Tỷ Lệ Bạo Kích cao. Nội tại tăng Tấn Công% và HP% sau khi Kỹ Năng Nguyên Tố đánh trúng địch.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Deshret.png" },
      { rank: 2, nameVi: "Xích Giác Phá Thạch Đao", nameEn: "Xích Giác Phá Thạch Đao", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Sát Thương Bạo Kích cao. Tuy chỉ số Phòng Ngự không quá hữu ích nhưng lượng ST bạo cao giúp bù đắp sát thương tốt.", passiveDescEn: "Sát Thương Bạo Kích cao. Tuy chỉ số Phòng Ngự không quá hữu ích nhưng lượng ST bạo cao giúp bù đắp sát thương tốt.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Itadorimaru.png" },
      { rank: 3, nameVi: "Phán Quyết", nameEn: "Phán Quyết", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tấn công căn bản cao và Tỷ Lệ Bạo Kích tốt. Nội tại tăng sát thương Kỹ Năng Nguyên Tố sau phản ứng Kết Tinh.", passiveDescEn: "Tấn công căn bản cao và Tỷ Lệ Bạo Kích tốt. Nội tại tăng sát thương Kỹ Năng Nguyên Tố sau phản ứng Kết Tinh.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_GoldenVerdict.png" },
      { rank: 4, nameVi: "Đường Cùng Của Sói", nameEn: "Đường Cùng Của Sói", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp lượng Tấn Công cực lớn cho Dehya và tăng sát thương cho toàn đội khi đánh trúng kẻ địch thấp máu.", passiveDescEn: "Cung cấp lượng Tấn Công cực lớn cho Dehya và tăng sát thương cho toàn đội khi đánh trúng kẻ địch thấp máu.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Wolfmound.png" },
      { rank: 5, nameVi: "Nanh Sơn Vương", nameEn: "Nanh Sơn Vương", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tỷ Lệ Bạo Kích cao và tăng sát thương đòn đánh sau khi trúng Kỹ Năng Nguyên Tố, rất phù hợp với lối chơi Burning.", passiveDescEn: "Tỷ Lệ Bạo Kích cao và tăng sát thương đòn đánh sau khi trúng Kỹ Năng Nguyên Tố, rất phù hợp với lối chơi Burning.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_EmeraldSword.png" },
      { rank: 6, nameVi: "Kiếm Li Cốt", nameEn: "Kiếm Li Cốt", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tăng sát thương đầu ra đáng kể khi tích đủ tầng nội tại, tuy nhiên cần duy trì khiên bảo vệ để tránh mất tầng.", passiveDescEn: "Tăng sát thương đầu ra đáng kể khi tích đủ tầng nội tại, tuy nhiên cần duy trì khiên bảo vệ để tránh mất tầng.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Kione.png" },
      { rank: 7, nameVi: "Đóa Hoa Tôn Màu Thép", nameEn: "Đóa Hoa Tôn Màu Thép", subStat: "Tinh Thông Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Lựa chọn F2P cung cấp Tinh Thông Nguyên Tố và Tấn Công% sau khi kích hoạt phản ứng nguyên tố, rất mạnh cho lối chơi Burgeon.", passiveDescEn: "Lựa chọn F2P cung cấp Tinh Thông Nguyên Tố và Tấn Công% sau khi kích hoạt phản ứng nguyên tố, rất mạnh cho lối chơi Burgeon.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Fleurfair.png" },
      { rank: 8, nameVi: "Vũ Tài", nameEn: "Vũ Tài", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R5", passiveDescVi: "Cung cấp Tinh Thông Nguyên Tố dồi dào và tăng mạnh sát thương lên kẻ địch bị ảnh hưởng bởi Thủy hoặc Lôi.", passiveDescEn: "Cung cấp Tinh Thông Nguyên Tố dồi dào và tăng mạnh sát thương lên kẻ địch bị ảnh hưởng bởi Thủy hoặc Lôi.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Perdue.png" },
      { rank: 9, nameVi: "Bóng Tối Thủy Triều", nameEn: "Bóng Tối Thủy Triều", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí rèn F2P tăng Tấn Công% đáng kể khi nhận trị liệu, dễ kích hoạt khi đi kèm Healer.", passiveDescEn: "Vũ khí rèn F2P tăng Tấn Công% đáng kể khi nhận trị liệu, dễ kích hoạt khi đi kèm Healer.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Vorpal.png" },
      { rank: 10, nameVi: "Bá Vương Tối Thượng Siêu Cấp Ma Kiếm", nameEn: "Bá Vương Tối Thượng Siêu Cấp Ma Kiếm", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí sự kiện F2P tuyệt vời cung cấp Hiệu Quả Nạp giúp giảm áp lực nạp nộ và tăng Tấn Công% dựa trên Melusine đã giúp đỡ.", passiveDescEn: "Vũ khí sự kiện F2P tuyệt vời cung cấp Hiệu Quả Nạp giúp giảm áp lực nạp nộ và tăng Tấn Công% dựa trên Melusine đã giúp đỡ.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Champion.png" },
      { rank: 11, nameVi: "Gậy Đàm Phán", nameEn: "Gậy Đàm Phán", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích và tăng sát thương sau khi chịu ảnh hưởng của các trạng thái nguyên tố.", passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích và tăng sát thương sau khi chịu ảnh hưởng của các trạng thái nguyên tố.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_BeastTamer.png" },
      { rank: 12, nameVi: "Kiếm Vô Công", nameEn: "Kiếm Vô Công", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Tấn Công% cao và gia tăng hiệu quả khiên, hoạt động tốt nhất khi đi kèm nhân vật tạo khiên.", passiveDescEn: "Tấn Công% cao và gia tăng hiệu quả khiên, hoạt động tốt nhất khi đi kèm nhân vật tạo khiên.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Kunwu.png" },
      { rank: 13, nameVi: "Thiên Dương Rực Lửa", nameEn: "Thiên Dương Rực Lửa", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tỷ Lệ Bạo Kích tốt và tăng mạnh Tấn Công sau khi kích hoạt phản ứng Nguyên Tố Hỏa hoặc Thiêu Đốt.", passiveDescEn: "Tỷ Lệ Bạo Kích tốt và tăng mạnh Tấn Công sau khi kích hoạt phản ứng Nguyên Tố Hỏa hoặc Thiêu Đốt.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_RadianceSword.png" },
      { rank: 14, nameVi: "Thiên Không Kiêu Ngạo", nameEn: "Thiên Không Kiêu Ngạo", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Hiệu Quả Nạp lớn giúp duy trì chu kỳ nộ nạp cho Dehya.", passiveDescEn: "Cung cấp Hiệu Quả Nạp lớn giúp duy trì chu kỳ nộ nạp cho Dehya.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Dvalin.png" },
      { rank: 15, nameVi: "Akuoumaru", nameEn: "Akuoumaru", subStat: "Tấn Công%", isF2P: false, refinement: "R5", passiveDescVi: "Tăng sát thương Kỹ Năng Nộ dựa trên tổng năng lượng nộ của cả đội, tối ưu hóa sát thương nổ của Dehya.", passiveDescEn: "Tăng sát thương Kỹ Năng Nộ dựa trên tổng năng lượng nộ của cả đội, tối ưu hóa sát thương nổ của Dehya.", iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Maria.png" }
    ],
    talentPriority: ["Burst", "Skill", "Normal Attack"],
    bestArtifacts: [
      {
        setNameVi: "Dấu Ấn Ngăn Cách", setNameEn: "Dấu Ấn Ngăn Cách",
        pieces: 4,
        sands: ["Tấn Công%", "Tinh Thông Nguyên Tố", "Hiệu Quả Nạp"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Hiệu Quả Nạp", "Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "Tấn Công%", "HP%", "Tinh Thông Nguyên Tố"]
      },
      {
        setNameVi: "Vầng Sáng Vourukasha", setNameEn: "Vầng Sáng Vourukasha",
        pieces: 4,
        sands: ["Tấn Công%", "Tinh Thông Nguyên Tố", "Hiệu Quả Nạp"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Hiệu Quả Nạp", "Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "Tấn Công%", "HP%", "Tinh Thông Nguyên Tố"]
      },
      {
        setNameVi: "Mix 2 bộ Ma Nữ / Tông Thất / Tấn Công", setNameEn: "Mix 2 bộ Ma Nữ / Tông Thất / Tấn Công",
        pieces: 2,
        sands: ["Tấn Công%", "Tinh Thông Nguyên Tố", "Hiệu Quả Nạp"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Hiệu Quả Nạp", "Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "Tấn Công%", "HP%", "Tinh Thông Nguyên Tố"]
      },
      {
        setNameVi: "Ảo Mộng Chưa Hoàn Thành", setNameEn: "Ảo Mộng Chưa Hoàn Thành",
        pieces: 4,
        sands: ["Tấn Công%", "Tinh Thông Nguyên Tố", "Hiệu Quả Nạp"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Hiệu Quả Nạp", "Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "Tấn Công%", "HP%", "Tinh Thông Nguyên Tố"]
      },
      {
        setNameVi: "Thợ Săn Marechaussee", setNameEn: "Thợ Săn Marechaussee",
        pieces: 4,
        sands: ["Tấn Công%", "Tinh Thông Nguyên Tố", "Hiệu Quả Nạp"],
        goblet: ["Sát Thương Nguyên Tố Hỏa"],
        circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Hiệu Quả Nạp", "Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích", "Tấn Công%", "HP%", "Tinh Thông Nguyên Tố"]
      }
    ],
    bestTeams: ["ganyu", "nahida", "bennett", "kazuha", "ayaka", "xiangling", "mona", "xingqiu", "shinobu", "mualani", "emilie"]
  },
  {
    characterId: "nicole",
    bestWeapons: [
      { rank: 1, nameVi: "Trần Quang Thất Dụ", nameEn: "Trần Quang Thất Dụ", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Tấn công cơ bản cao và dòng phụ Tấn Công% giúp việc đạt ngưỡng kích hoạt buff dễ dàng hơn.", passiveDescEn: "Tấn công cơ bản cao và dòng phụ Tấn Công% giúp việc đạt ngưỡng kích hoạt buff dễ dàng hơn.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_FairyGarden.png" },
      { rank: 2, nameVi: "Khóa Trần Thế", nameEn: "Khóa Trần Thế", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp lượng Tấn Công% cực lớn và tăng cường hiệu quả khiên, giúp tối ưu hóa cả khiên lẫn buff ATK.", passiveDescEn: "Cung cấp lượng Tấn Công% cực lớn và tăng cường hiệu quả khiên, giúp tối ưu hóa cả khiên lẫn buff ATK.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Kunwu.png" },
      { rank: 3, nameVi: "Dư Âm Tiếng Hạc", nameEn: "Dư Âm Tiếng Hạc", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Tăng Tấn Công% cho toàn đội sau khi sử dụng Kỹ Năng Nguyên Tố, rất phù hợp với lối chơi hỗ trợ đồng đội.", passiveDescEn: "Tăng Tấn Công% cho toàn đội sau khi sử dụng Kỹ Năng Nguyên Tố, rất phù hợp với lối chơi hỗ trợ đồng đội.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_MountainGale.png" },
      { rank: 4, nameVi: "Quyển Thiên Không", nameEn: "Quyển Thiên Không", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Tấn công cơ bản cao và dòng phụ Tấn Công% lớn giúp đạt ngưỡng chỉ số cần thiết; đồng thời tăng nhẹ sát thương Phong.", passiveDescEn: "Tấn công cơ bản cao và dòng phụ Tấn Công% lớn giúp đạt ngưỡng chỉ số cần thiết; đồng thời tăng nhẹ sát thương Phong.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Dvalin.png" },
      { rank: 5, nameVi: "Ánh Nhìn Tư Tế", nameEn: "Ánh Nhìn Tư Tế", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Cung cấp Hiệu Quả Nạp và buff Tấn Công cho đội sau khi tạo khiên, tăng khả năng hồi nộ và hỗ trợ đồng đội.", passiveDescEn: "Cung cấp Hiệu Quả Nạp và buff Tấn Công cho đội sau khi tạo khiên, tăng khả năng hồi nộ và hỗ trợ đồng đội.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Figurines.png" },
      { rank: 6, nameVi: "Con Ngươi Tuyên Thệ", nameEn: "Con Ngươi Tuyên Thệ", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Chỉ số Hiệu Quả Nạp Nguyên Tố cao giúp duy trì chu kỳ Nộ hồi liên tục khi cần thiết.", passiveDescEn: "Chỉ số Hiệu Quả Nạp Nguyên Tố cao giúp duy trì chu kỳ Nộ hồi liên tục khi cần thiết.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Jyanome.png" },
      { rank: 7, nameVi: "Vòng Bạch Thần", nameEn: "Vòng Bạch Thần", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Tăng sát thương Nguyên Tố Lôi cho đồng đội sau phản ứng, rất mạnh khi đi kèm với đội hình có Lôi.", passiveDescEn: "Tăng sát thương Nguyên Tố Lôi cho đồng đội sau phản ứng, rất mạnh khi đi kèm với đội hình có Lôi.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Bakufu.png" },
      { rank: 8, nameVi: "Dòng Chảy Tinh Khiết", nameEn: "Dòng Chảy Tinh Khiết", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Vũ khí rèn cung cấp Tấn Công% và cơ chế tự hồi phục, hỗ trợ đắc lực trong việc đạt ngưỡng chỉ số.", passiveDescEn: "Vũ khí rèn cung cấp Tấn Công% và cơ chế tự hồi phục, hỗ trợ đắc lực trong việc đạt ngưỡng chỉ số.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Vorpal.png" },
      { rank: 9, nameVi: "Tây Phong Mật Điển", nameEn: "Tây Phong Mật Điển", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", passiveDescVi: "Tạo thêm hạt nhân năng lượng khi bạo kích giúp giảm áp lực nạp cho cả đội.", passiveDescEn: "Tạo thêm hạt nhân năng lượng khi bạo kích giúp giảm áp lực nạp cho cả đội.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Zephyrus.png" },
      { rank: 10, nameVi: "Câu Chuyện Diệt Rồng", nameEn: "Câu Chuyện Diệt Rồng", subStat: "HP%", isF2P: true, refinement: "R5", passiveDescVi: "Tăng 48% Tấn Công cho nhân vật tiếp theo ra sân, là một lựa chọn hỗ trợ cổ điển nhưng cực kỳ mạnh mẽ.", passiveDescEn: "Tăng 48% Tấn Công cho nhân vật tiếp theo ra sân, là một lựa chọn hỗ trợ cổ điển nhưng cực kỳ mạnh mẽ.", iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Pulpfic.png" }
    ],
    talentPriority: ["Skill", "Burst", "Normal Attack"],
    bestArtifacts: [
      {
        setNameVi: "Phước Lành Trời Cao", setNameEn: "Phước Lành Trời Cao",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tấn Công%"],
        goblet: ["Tấn Công%"],
        circlet: ["Tấn Công%", "Tỷ Lệ Bạo Kích"],
        subStatsPriority: ["Hiệu Quả Nạp", "Tấn Công%", "Tỷ Lệ Bạo Kích"]
      },
      {
        setNameVi: "Bức Tranh Dũng Sĩ Thành Tro Tàn", setNameEn: "Bức Tranh Dũng Sĩ Thành Tro Tàn",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tấn Công%"],
        goblet: ["Tấn Công%"],
        circlet: ["Tấn Công%", "Tỷ Lệ Bạo Kích"],
        subStatsPriority: ["Hiệu Quả Nạp", "Tấn Công%", "Tỷ Lệ Bạo Kích"]
      },
      {
        setNameVi: "Nghi Thức Tông Thất Cổ", setNameEn: "Nghi Thức Tông Thất Cổ",
        pieces: 4,
        sands: ["Hiệu Quả Nạp", "Tấn Công%"],
        goblet: ["Tấn Công%"],
        circlet: ["Tấn Công%", "Tỷ Lệ Bạo Kích"],
        subStatsPriority: ["Hiệu Quả Nạp", "Tấn Công%", "Tỷ Lệ Bạo Kích"]
      },
      {
        setNameVi: "Mix 2 bộ Tấn Công / Hiệu Quả Nạp", setNameEn: "Mix 2 bộ Tấn Công / Hiệu Quả Nạp",
        pieces: 2,
        sands: ["Hiệu Quả Nạp", "Tấn Công%"],
        goblet: ["Tấn Công%"],
        circlet: ["Tấn Công%", "Tỷ Lệ Bạo Kích"],
        subStatsPriority: ["Hiệu Quả Nạp", "Tấn Công%", "Tỷ Lệ Bạo Kích"]
      }
    ],
    bestTeams: ["varka", "prune", "bennett", "durin", "venti", "faruzan", "kinich", "iansan"]
  }
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
      "Traveler (Pyro)|Pyro|Sword|5"
    ].map(c => ({ ...parseChar(c), region: "Other" }))
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
    avatarUrl: toAvatar(name),
    splashArtUrl: toSplash(name),
    talentPriority: (metaInfo && metaInfo.talentPriority) ? metaInfo.talentPriority : ["Normal Attack", "Elemental Skill", "Elemental Burst"],
    bestTeams: (metaInfo && metaInfo.bestTeams) ? metaInfo.bestTeams : ["bennett", "xingqiu", "zhongli"],
    description: `Đây là thông tin bách khoa của ${name}. Nhân vật này đến từ thế giới Teyvat...`,
    baseStats: { hp: 10000, atk: 300, def: 600 },
    fandomUrl: `https://genshin-impact.fandom.com/wiki/${name.replace(/ /g, '_')}`,
    bestWeapons: metaInfo ? metaInfo.bestWeapons.map(w => ({
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
      await prisma.character.delete({ where: { id: char.id } }).catch(() => {});
      
      await prisma.character.create({
        data: {
          id: char.id, nameEn: char.name, nameVi: char.name, titleEn: char.title, titleVi: title, rarity: char.rarity, element: char.element, weapon: char.weapon, region: finalRegion, birthday: finalBirthday, avatarUrl: char.avatarUrl, splashArtUrl: char.splashArtUrl, talentPriority: char.talentPriority, bestTeams: char.bestTeams,
          descriptionEn: char.description, descriptionVi: description, 
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

