export const durin = {
    characterId: "durin",
    talentPriority: ["Burst", "Skill", "Normal Attack"],
    bestWeapons: [
      { rank: 1, nameVi: "Hắc Ám Xâm Thực", nameEn: "Athame Artis", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Vũ khí trấn phái tốt nhất, tăng Tinh Thông Nguyên Tố và kích hoạt hiệu ứng Hỏa bổ trợ khi phản ứng Bốc Hơi/Tan Chảy.", passiveDescEn: "Boosts Elemental Mastery and triggers an Adj. Pyro effect on Vaporize/Melt, syncing with many other Burst hits.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Motsognir.png" },
      { rank: 2, nameVi: "Bàn Nham Kết Lục", nameEn: "Primordial Jade Cutter", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tỷ Lệ Bạo Kích cực cao và tăng Tấn Công dựa trên HP, tăng sát thương ổn định không cần điều kiện.", passiveDescEn: "High CRIT Rate substat and bonus ATK based on HP, benefitting overall damage without condition.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Morax.png" },
      { rank: 3, nameVi: "Thương Diệu", nameEn: "Azurelight", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Hồi năng lượng sau khi thi triển Kỹ Năng Nguyên Tố giúp duy trì chu kỳ Nộ; đáp ứng rất tốt nhu cầu Hiệu Quả Nạp.", passiveDescEn: "Energy refund on Skill usage helps maintain Burst uptime; satisfies Energy Recharge needs.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Miekka.png" },
      { rank: 4, nameVi: "Ánh Sáng Đêm Sương Mù", nameEn: "Mistsplitter Reforged", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tăng Sát Thương Nguyên Tố qua các tầng cộng dồn bằng cách sử dụng Kỹ Năng Nộ, duy trì sát thương ngoài sân cực tốt.", passiveDescEn: "Grants Elemental DMG Bonus with stacks, obtainable via Burst usage for sustained off-field damage.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Narukami.png" },
      { rank: 5, nameVi: "Haran Geppaku Futsu", nameEn: "Haran Geppaku Futsu", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tăng Sát Thương Nguyên Tố theo đòn đánh của đồng đội, có sự phối hợp tốt để tăng sát thương Kỹ Năng Nộ.", passiveDescEn: "Increases Elemental DMG Bonus with teammates' Skills, party-wide synergy boosts Burst damage.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Amenoma.png" },
      { rank: 6, nameVi: "Xá Tội", nameEn: "Absolution", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Sát Thương Bạo Kích cao và nội tại tăng sát thương Kỹ Năng Nguyên Tố lẫn Kỹ Năng Nộ, hoàn hảo cho dạng chiến đấu của Durin.", passiveDescEn: "High CRIT DMG and a passive that enhances Burst and Skill damage, perfect for Durin's form.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Estoc.png" },
      { rank: 7, nameVi: "Kiếm Chước Phong", nameEn: "Summit Shaper", subStat: "Tấn Công%", isF2P: false, refinement: "R1", passiveDescVi: "Tăng hiệu quả khiên và Tấn Công khi có khiên; khuyên dùng kèm nhân vật tạo khiên để tối đa hóa sát thương Nộ và an toàn.", passiveDescEn: "Shield strength and ATK bonus when shielded; use with a shielder to maximize Burst damage and safety.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Kunwu.png" },
      { rank: 8, nameVi: "Ánh Lá Phán Quyết", nameEn: "Light of Foliar Incision", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tăng Sát Thương Bạo Kích và sát thương đòn đánh thường; điều kiện đánh thường dễ dàng đạt được trước khi thi triển Nộ.", passiveDescEn: "Boosts CRIT DMG and normal attack damage; the normal attack requirement is easily met before Burst.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Ayus.png" },
      { rank: 9, nameVi: "Lời Thề Tự Do Cổ Xưa", nameEn: "Freedom-Sworn", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R1", passiveDescVi: "Tăng Tinh Thông Nguyên Tố và Tấn Công cho cả đội sau khi kích hoạt phản ứng; lựa chọn rất tốt cho đội Bốc Hơi/Tan Chảy.", passiveDescEn: "Increases party Elemental Mastery and ATK after triggering reactions; excellent for Vaporize/Melt teams.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Widsith.png" },
      { rank: 10, nameVi: "Nhạc Khúc Biển Sâu", nameEn: "Finale of the Deep", subStat: "Tấn Công%", isF2P: true, refinement: "R5", passiveDescVi: "Cung cấp lượng lớn Tấn Công và tăng sát thương sau khi dùng Kỹ Năng Nguyên Tố nhờ cơ chế Khế Ước Sinh Mệnh.", passiveDescEn: "Provides significant ATK and boosts damage after using Elemental Skill via Bond of Life mechanics.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Vorpal.png" },
      { rank: 11, nameVi: "Nanh Sói", nameEn: "Wolf-Fang", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R5", passiveDescVi: "Tăng sát thương Nguyên Tố và Nộ thông qua chỉ số Tỷ Lệ Bạo Kích; dễ dàng kích hoạt nội tại từ các đòn đánh ngoài sân.", passiveDescEn: "Boosts Skill and Burst damage with CRIT Rate substat; easy to trigger passive via off-field hits.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_WolfsFang.png" },
      { rank: 12, nameVi: "Uraku Misugiri", nameEn: "Uraku Misugiri", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tăng sát thương đánh thường và Kỹ Năng Nguyên Tố; hiệu quả tăng sát thương kỹ năng có hiệu lực trước khi Durin biến hình.", passiveDescEn: "Increases normal attack and Elemental Skill damage; the Skill damage bonus applies before entering Durin form.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Mitsurugi.png" },
      { rank: 13, nameVi: "Sắc Nước Lộng Lẫy", nameEn: "Splendor of Tranquil Waters", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Tăng HP giúp gia tăng sát thương Nộ nếu được scale theo HP; đồng thời tăng sát thương Nguyên Tố khi kích hoạt Kỹ Năng Nguyên Tố.", passiveDescEn: "HP% substat boosts Burst damage if scaled by HP; also increases Elem. damage for pre-Burst setup.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Regalis.png" },
      { rank: 14, nameVi: "Mảnh Trăng Ánh Sáng", nameEn: "Lightbearing Moonshard", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", passiveDescVi: "Chỉ số Tấn Công cơ bản cao và nội tại tăng toàn bộ Sát Thương Nguyên Tố, giúp gia tăng đáng kể sát thương từ các đòn Nộ.", passiveDescEn: "High base ATK and a passive that increases All Elemental DMG, benefitting all Burst hits.", iconUrl: "/images/weapons/UI_EquipIcon_Sword_Zibai.png" },
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
  };
