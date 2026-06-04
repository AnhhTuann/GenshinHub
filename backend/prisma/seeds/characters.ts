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
      { rank: 1, name: "Trượng Hộ Ma", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", reason: "Vũ khí 'trấn phái' tốt nhất, cung cấp lượng lớn HP và chuyển hóa máu thành Tấn Công cực mạnh.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Homa.png" },
      { rank: 2, name: "Quyền Trượng Cát Đỏ", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", reason: "Lựa chọn thay thế mạnh mẽ nếu build theo hướng Tinh Thông Nguyên Tố cao, chuyển hóa TTNT thành Tấn Công.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Deshret.png" },
      { rank: 3, name: "Quyền Trượng Fjord", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R5", reason: "Vũ khí 4 sao BP cực tốt khi đi kèm đội hình có ít nhất 3 nguyên tố khác nhau để buff thêm Tinh Thông Nguyên Tố.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Shanty.png" },
      { rank: 4, name: "Khúc Ca Vườn Sáng", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", reason: "Không khuyến nghị do dòng phụ tăng ST Vật Lý bị lãng phí và nội tại yêu cầu kích hoạt Kỹ Năng Nguyên Tố liên tục.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Muguet.png" },
      { rank: 5, name: "Tai Ương Của Rồng", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R5", reason: "Lựa chọn 4 sao đột phá cho đội hình Bốc Hơi nhờ lượng TTNT dồi dào và tăng sát thương lên kẻ địch bị ấn Thủy/Hỏa.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Stardust.png" },
      { rank: 6, name: "Thương Quyết Chiến", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", reason: "Chỉ số Tỷ Lệ Bạo Kích rất cao giúp cân bằng chỉ số dễ dàng, tuy nhiên lượng buff Tấn Công không quá ấn tượng.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Gladiator.png" },
      { rank: 7, name: "Hòa Phát Diên", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", reason: "Cung cấp Tỷ Lệ Bạo Kích cao và cộng dồn Tấn Công ổn định, tuy nhiên cần thời gian để tích tầng nội tại.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Morax.png" },
      { rank: 8, name: "Thương Lập Kiếm", subStat: "Tấn Công%", isF2P: false, refinement: "R5", reason: "Cực mạnh trong đội hình nhiều nhân vật Liyue (như Xingqiu, Zhongli) để được tăng Tỷ Lệ Bạo Kích và Tấn Công%.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Lapis.png" },
      { rank: 9, name: "Thương Gió Gửi Thư", subStat: "Tấn Công%", isF2P: true, refinement: "R5", reason: "Vũ khí Event F2P tăng Tấn Công% và Tinh Thông Nguyên Tố sau khi kích hoạt phản ứng, lựa chọn tạm ổn khi thiếu thốn.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Windvane.png" },
      { rank: 10, name: "Thương Bạch Nhị", subStat: "Tỷ Lệ Bạo Kích", isF2P: true, refinement: "R5", reason: "Lựa chọn 3 sao F2P cực tốt ở giai đoạn đầu game nhờ buff Tỷ Lệ Bạo Kích và tăng sát thương đòn đánh thường.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Ruby.png" },
      { rank: 11, name: "Thương Hắc Nham", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", reason: "Cung cấp lượng lớn Sát Thương Bạo Kích nhưng nội tại yêu cầu hạ gục quái để kích hoạt, kém hiệu quả khi đấu Boss.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Blackrock.png" },
      { rank: 12, name: "Thương Thập Tự Kitain", subStat: "Tinh Thông Nguyên Tố", isF2P: true, refinement: "R5", reason: "Vũ khí rèn F2P cung cấp Tinh Thông Nguyên Tố, tuy nhiên nội tại tiêu hao năng lượng không thực sự hữu dụng với Hu Tao.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Bakufu.png" },
      { rank: 13, name: "Đền Đáp Của Công Lý", subStat: "HP%", isF2P: true, refinement: "R5", reason: "Không khuyến nghị do dòng phụ Hiệu Quả Nạp bị lãng phí và nội tại yêu cầu hồi máu, mâu thuẫn lối chơi thấp máu của cô.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Vorpal.png" }
    ]
  },
  {
    characterId: "raiden-shogun",
    bestWeapons: [
      { rank: 1, name: "Đoạn Thảo Kính Phạt", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R1", reason: "Trấn phái hoàn hảo nhất, tăng mạnh Hiệu Quả Nạp và chuyển hóa nó thành Tấn Công%.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Narukami.png" },
      { rank: 2, name: "Trượng Hộ Ma", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", reason: "Cung cấp lượng lớn Sát Thương Bạo Kích và Tấn Công% khi máu dưới 50%, là vũ khí đa dụng rất mạnh.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Homa.png" },
      { rank: 3, name: "Quyền Trượng Cát Đỏ", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", reason: "Chuyển đổi Tinh Thông Nguyên Tố thành Tấn Công%, rất hữu dụng trong các đội hình phản ứng nguyên tố.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Deshret.png" },
      { rank: 4, name: "Khúc Ca Hòa Điệu", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", reason: "Lựa chọn tình huống cung cấp Hiệu Quả Nạp và buff cho đội, tuy không tối ưu nhưng vẫn dùng tốt.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Trident.png" },
      { rank: 5, name: "Khúc Ca Vườn Sáng", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", reason: "Không quá lý tưởng cho Raiden, ưu tiên lựa chọn khác trừ khi đội hình cần hiệu quả hỗ trợ của nó.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Muguet.png" },
      { rank: 6, name: "Hòa Phát Diên", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", reason: "Đem lại lượng lớn Tỷ Lệ Bạo Kích và tăng dần Tấn Công%, lựa chọn DPS tổng thể rất ổn định.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Morax.png" },
      { rank: 7, name: "Hủy Diệt", subStat: "Tấn Công%", isF2P: false, refinement: "R1", reason: "Cung cấp chỉ số Tấn Công% cực cao và buff cho Kỹ Năng Nguyên Tố, cạnh tranh tốt ở mức tinh luyện thấp.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Santika.png" },
      { rank: 8, name: "Thương Quyết Chiến", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", reason: "Vũ khí phân khúc giá rẻ giúp tăng Tỷ Lệ Bạo Kích, hiệu quả khi solo hoặc đối phó với ít kẻ địch.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Gladiator.png" },
      { rank: 9, name: "Nịnh Thần", subStat: "Tấn Công%", isF2P: false, refinement: "R1", reason: "Tăng hiệu quả Khiên và Tấn Công%, yêu cầu có nhân vật tạo khiên trong đội để phát huy tối đa sức mạnh.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Kunwu.png" },
      { rank: 10, name: "Lao Xiên Cá", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", reason: "Vũ khí F2P tốt nhất cho Raiden, tăng trực tiếp sát thương Nộ và Tỷ Lệ Bạo Kích của kỹ năng Nộ.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Mori.png" },
      { rank: 11, name: "Xương Sống Thiên Không", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R1", reason: "Cung cấp Hiệu Quả Nạp và Tỷ Lệ Bạo Kích, là vũ khí đa dụng ổn nhưng dễ bị thay thế bởi lựa chọn khác.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Dvalin.png" },
      { rank: 12, name: "Vây Cá Chẻ Sóng", subStat: "Tấn Công%", isF2P: false, refinement: "R5", reason: "Sát thương Nộ tăng theo tổng năng lượng tiêu hao của cả đội, cực mạnh trong các đội hình tốn nhiều năng lượng.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Maria.png" },
      { rank: 13, name: "Thương Lập Kiếm", subStat: "Tấn Công%", isF2P: false, refinement: "R5", reason: "Tăng mạnh Tấn Công% và Tỷ Lệ Bạo Kích dựa trên số thành viên Liyue trong đội hình.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Lapis.png" },
      { rank: 14, name: "Thương Tây Phong", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", reason: "Ưu tiên nạp năng lượng cho cả đội thay vì sát thương cá nhân, tạo nhiều hạt nhân lượng khi bạo kích.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Zephyrus.png" }
    ]
  },
  {
    characterId: "zhongli",
    bestWeapons: [
      { rank: 1, name: "Trượng Hộ Ma", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", reason: "Dòng phụ Sát Thương Bạo Kích cao và khả năng chuyển hóa HP thành Tấn Công giúp gia tăng đáng kể sát thương của Kỹ Năng Nộ.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Homa.png" },
      { rank: 2, name: "Bi Ca Lumidouce", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", reason: "Cung cấp lượng lớn Hiệu Quả Nạp và buff Tinh Thông Nguyên Tố/Tấn Công cho toàn đội sau khi dùng Kỹ Năng Nguyên Tố, tuy nhiên sát thương Nộ sẽ thấp hơn.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Muguet.png" },
      { rank: 3, name: "Hòa Phát Diên", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", reason: "Tấn Công cơ bản và Tỷ Lệ Bạo Kích cao. Nội tại tăng Tấn Công khi đánh trúng kẻ địch, giúp tích tầng trước khi thả Q.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Morax.png" },
      { rank: 4, name: "Xương Sống Thiên Không", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R1", reason: "Cung cấp lượng lớn Hiệu Quả Nạp và thêm Tỷ Lệ Bạo Kích. Nội tại tạo thêm các đòn đánh AoE nhỏ sau khi dùng Kỹ Năng Nộ.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Dvalin.png" },
      { rank: 5, name: "Giáo Nịnh Thần", subStat: "Tấn Công%", isF2P: false, refinement: "R1", reason: "Tấn Công cơ bản và Tấn Công% cao nhưng yêu cầu duy trì khiên để nhận toàn bộ nội tại. Rất phù hợp với khiên tự tạo của Zhongli.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Kunwu.png" },
      { rank: 6, name: "Hủy Diệt", subStat: "Tấn Công%", isF2P: false, refinement: "R1", reason: "Tấn Công cơ bản và Tấn Công% cực cao sau khi dùng Kỹ Năng Nguyên Tố. Tốt cho sát thương nhưng cần thời gian đứng sân để kích hoạt.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Santika.png" },
      { rank: 7, name: "Lao Xiên Cá", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", reason: "Tăng Tỷ Lệ Bạo Kích và sát thương của Kỹ Năng Nộ cùng Hiệu Quả Nạp. Lựa chọn F2P tuyệt vời giúp tối ưu hóa chu kỳ ra chiêu.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Mori.png" },
      { rank: 8, name: "Thương Quyết Chiến", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", reason: "Cung cấp Tỷ Lệ Bạo Kích và thêm Tấn Công khi có kẻ địch ở gần. Thích hợp để build sát thương nhưng ít hỗ trợ nạp năng lượng.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Gladiator.png" },
      { rank: 9, name: "Đoạn Thảo Kính Phạt", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R1", reason: "Hiệu Quả Nạp cực cao và chuyển hóa dòng nạp thành Tấn Công%. Rất dễ bị thừa Nạp, nên cân nhắc kết hợp với đồng hồ Nạp nếu cần.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Narukami.png" },
      { rank: 10, name: "Thương Thiên Nham", subStat: "Tấn Công%", isF2P: false, refinement: "R5", reason: "Tăng Tỷ Lệ Bạo Kích và Tấn Công% dựa trên số lượng nhân vật Liyue trong đội. Đạt hiệu quả cực cao trong đội hình thuần Liyue.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Lapis.png" },
      { rank: 11, name: "Thương Hắc Nham", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", reason: "Cung cấp Sát Thương Bạo Kích. Nội tại tăng Tấn Công sau khi hạ gục kẻ địch, nhưng không ổn định khi đối đầu với Boss đơn mục tiêu.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Blackrock.png" },
      { rank: 12, name: "Mũi Nhọn Của Gió", subStat: "Tấn Công%", isF2P: true, refinement: "R5", reason: "Vũ khí cán dài F2P cung cấp Tấn Công% và nội tại tăng Tấn Công% sau khi kích hoạt phản ứng nguyên tố. Tạm ổn cho lối chơi sát thương Nộ.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Windvane.png" },
      { rank: 13, name: "Thương Tây Phong", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", reason: "Hiệu Quả Nạp cao và sinh hạt nhân lượng cho toàn đội. Cần ưu tiên chỉ số Tỷ Lệ Bạo Kích để dễ kích hoạt nội tại.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Zephyrus.png" }
    ],
    bestArtifacts: [
      {
        setName: "Thánh Di Vật Đề Cử",
        pieces: 4,
        sands: ["ATK%", "HP%"],
        goblet: ["Geo DMG Bonus"],
        circlet: ["CRIT Rate", "CRIT DMG"],
        subStatsPriority: ["CRIT Rate", "CRIT DMG", "HP%", "ATK%"]
      }
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
  },
  {
    characterId: "xinyan",
    bestWeapons: [
      { rank: 1, name: "Xích Giác Phá Thạch Đao", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", reason: "Tăng mạnh phòng ngự và sát thương đòn đánh thường/trọng kích dựa trên Phòng Ngự, rất phù hợp với khiên của Xinyan.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Itadorimaru.png" },
      { rank: 2, name: "Thiên Không Kiêu Ngạo", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R1", reason: "Cung cấp Hiệu Quả Nạp lớn giúp Xinyan dễ dàng nạp đầy Nộ và tạo thêm kiếm khí chân không gây sát thương Vật Lý.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Dvalin.png" },
      { rank: 3, name: "Ly Cốt Kiếm", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", reason: "Tích lũy sát thương tăng dần theo thời gian, đem lại lượng sát thương đầu ra cực kỳ ổn định nếu được bảo kê tốt.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Kione.png" },
      { rank: 4, name: "Kiếm Vô Công", subStat: "Tấn Công%", isF2P: false, refinement: "R1", reason: "Tăng mạnh Tấn Công% và cường hóa hiệu quả Khiên. Hoàn hảo khi kết hợp với nhân vật tạo khiên như Xinyan.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Kunwu.png" },
      { rank: 5, name: "Tiếng Gió Trong Rừng Thông", subStat: "Sát Thương Vật Lý", isF2P: false, refinement: "R1", reason: "Tăng cực nhiều Sát Thương Vật Lý và tốc độ đánh cho cả đội, tối ưu chuỗi combo xoay trọng kích của Xinyan.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Widsith.png" },
      { rank: 6, name: "Đường Cùng Của Sói", subStat: "Tấn Công%", isF2P: false, refinement: "R1", reason: "Bơm lượng Tấn Công khổng lồ và tăng mạnh sát thương cho toàn đội khi đánh trúng kẻ địch thấp máu.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Wolfmound.png" },
      { rank: 7, name: "Vua Biển Đút Túi", subStat: "Tấn Công%", isF2P: true, refinement: "R5", reason: "Vũ khí Event F2P cực tốt, tăng chỉ số Tấn Công và gia tăng trực tiếp lượng sát thương từ Kỹ Năng Nộ.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_MillenniaTuna.png" },
      { rank: 8, name: "Tuyết Vùi Tinh Bạc", subStat: "Sát Thương Vật Lý", isF2P: true, refinement: "R5", reason: "Lựa chọn rèn F2P tuyệt vời cung cấp chỉ số Sát Thương Vật Lý và tạo thêm băng rơi gây sát thương diện rộng.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Dragonfell.png" },
      { rank: 9, name: "Mẫu Cổ Hoa", subStat: "Tấn Công%", isF2P: true, refinement: "R5", reason: "Vũ khí rèn quốc dân dễ tiếp cận, tăng Tấn Công và có tỷ lệ gây thêm sát thương vật lý diện rộng mỗi 15s.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Proto.png" }
    ]
  },
  {
    characterId: "yelan",
    bestWeapons: [
      { rank: 1, name: "Tiếng Thở Dài Vô Tận", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R1", reason: "Dòng phụ Hiệu Quả Nạp cao và khả năng dùng Kỹ Năng Nộ kích hoạt buff Tấn Công cho đội; lý tưởng cho lối build hỗ trợ cần nhiều Nạp.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Dvalin.png" },
      { rank: 2, name: "Cung Tây Phong", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", reason: "Nội tại tinh luyện tạo hạt nhân lượng khi bạo kích bằng Kỹ Năng Nguyên Tố, giải quyết vấn đề nạp cho bản thân và toàn đội; Tấn Công cơ bản thấp không ảnh hưởng.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Zephyrus.png" },
      { rank: 3, name: "Nhược Thủy", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", reason: "Dòng phụ Sát Thương Bạo Kích khổng lồ và nội tại tăng HP% giúp tăng mạnh sát thương, nhưng đòi hỏi Hiệu Quả Nạp cao từ thánh di vật; chỉ dùng khi có thể đạt trên 200% Nạp.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Kirin.png" },
      { rank: 4, name: "Cung Tế Lễ", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R3", reason: "Nội tại tinh luyện reset hồi chiêu Kỹ Năng Nguyên Tố, tạo thêm hạt năng lượng; dòng phụ Hiệu Quả Nạp cao giúp giảm áp lực nạp.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Fossil.png" }
    ]
  },
  {
    characterId: "kazuha",
    bestWeapons: [
      { rank: 1, name: "Lời Thề Tự Do Cổ Xưa", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R1", reason: "Tinh Thông Nguyên Tố cực cao và khả năng buff Tấn Công cho toàn đội. Trấn phái giúp tối đa hóa khả năng hỗ trợ và sát thương Khuếch Tán.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Widsith.png" },
      { rank: 2, name: "Tây Phong Kiếm", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", reason: "Tạo hạt nhân lượng cho cả đội. Cực kỳ hữu dụng khi nhu cầu Hiệu Quả Nạp cao, đặc biệt khi đội hình không có Bennett.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Zephyrus.png" },
      { rank: 3, name: "Ánh Trăng Xiphos", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R1", reason: "Chuyển hóa Tinh Thông Nguyên Tố thành Hiệu Quả Nạp cho bản thân và toàn đội. Giúp duy trì thời gian thi triển Kỹ Năng Nộ.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Pleroma.png" },
      { rank: 4, name: "Kiếm Tế Lễ", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R5", reason: "Reset thời gian hồi chiêu E để Khuếch Tán hai lần và tạo thêm nhiều hạt năng lượng. Gom quái cực tốt và sạc ổn định.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Fossil.png" },
      { rank: 5, name: "Ống Đồng Fleuve Cendre", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", reason: "Tăng Tỷ Lệ Bạo Kích Kỹ Năng Nguyên Tố và Hiệu Quả Nạp. Vũ khí F2P (đổi câu cá) giúp cân bằng giữa sát thương và khả năng nạp.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Machination.png" },
      { rank: 6, name: "Thiên Không Kiếm", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R1", reason: "Tấn Công cơ bản cao và Hiệu Quả Nạp tốt kèm hiệu ứng chân không nhỏ. Lựa chọn thay thế giúp tăng sát thương cá nhân và khả năng sạc.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Dvalin.png" },
      { rank: 7, name: "Thiết Phong Kích", subStat: "Tinh Thông Nguyên Tố", isF2P: true, refinement: "R5", reason: "Vũ khí thuần Tinh Thông Nguyên Tố dễ chế tạo. Lựa chọn giá rẻ giúp tăng sát thương Khuếch Tán và khả năng buff cho đội.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Exotic.png" },
      { rank: 8, name: "Toukabou Shigure", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R5", reason: "Cung cấp Tinh Thông Nguyên Tố và tăng nhẹ sát thương sau khi đánh trúng kẻ địch. Vũ khí Event giới hạn thay thế tốt cho Thiết Phong Kích.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Kasabouzu.png" },
      { rank: 9, name: "Kiếm Phi Thiên", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", reason: "Tăng Tấn Công sau khi thi triển Nộ. Chỉ sử dụng khi không có lựa chọn nào khác; chỉ số cơ bản thấp khiến vũ khí này không tối ưu.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Mitsurugi.png" }
    ],
    bestArtifacts: [
      {
        setName: "Bóng Hình Màu Xanh",
        pieces: 4,
        sands: ["Tinh Thông Nguyên Tố", "Hiệu Quả Nạp"],
        goblet: ["Tinh Thông Nguyên Tố"],
        circlet: ["Tinh Thông Nguyên Tố"],
        subStatsPriority: ["Tinh Thông Nguyên Tố", "Hiệu Quả Nạp", "Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"]
      },
      {
        setName: "Giáo Quan",
        pieces: 4,
        sands: ["Tinh Thông Nguyên Tố", "Hiệu Quả Nạp"],
        goblet: ["Tinh Thông Nguyên Tố"],
        circlet: ["Tinh Thông Nguyên Tố"],
        subStatsPriority: ["Tinh Thông Nguyên Tố", "Hiệu Quả Nạp", "Tỷ Lệ Bạo Kích"]
      }
    ]
  },
  {
    characterId: "nahida",
    bestWeapons: [
      { rank: 1, name: "Cõi Mộng Ngàn Đêm", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R1", reason: "Vũ khí tốt nhất: cung cấp Tinh Thông Nguyên Tố cực lớn và buff thêm TTNT cho cả đội, giúp tăng mạnh sát thương phản ứng và khả năng hỗ trợ.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Ayus.png" },
      { rank: 2, name: "Hòa Giấc Trong Nắng Mai", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R1", reason: "Tấn Công cơ bản cao và dòng phụ Tỷ Lệ Bạo Kích; nội tại cung cấp lượng lớn Tinh Thông Nguyên Tố sau khi kích hoạt phản ứng.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_SakuraFan.png" },
      { rank: 3, name: "Chân Ý Của Kagura", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R1", reason: "Cung cấp lượng lớn Sát Thương Bạo Kích và tăng sát thương Kỹ Năng Nguyên Tố từ các tầng nội tại, tuy nhiên cần đứng sân để duy trì.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Narukami.png" },
      { rank: 4, name: "Mảnh Chương Tế Lễ", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R5", reason: "Tinh Thông Nguyên Tố cao và có tỷ lệ reset thời gian hồi chiêu E, giúp kéo dài khả năng cấp Thảo ngoài sân.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Fossil.png" },
      { rank: 5, name: "Đàn Thiên Quang", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", reason: "Cung cấp Hiệu Quả Nạp và tăng Tinh Thông Nguyên Tố cho toàn đội sau khi dùng Nộ, hỗ trợ đắc lực cho các phản ứng nguyên tố.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_SeeliesLute.png" },
      { rank: 6, name: "Sao Đêm Rong Ruổi", subStat: "Tinh Thông Nguyên Tố", isF2P: false, refinement: "R1", reason: "Dòng phụ Tinh Thông Nguyên Tố và nội tại chuyển hóa thành Tấn Công cho Nahida và toàn đội, rất tốt cho lối chơi hỗ trợ.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Pleroma.png" },
      { rank: 7, name: "Chương Nhạc Lang Thang", subStat: "Sát Thương Bạo Kích", isF2P: false, refinement: "R5", reason: "Buff ngẫu nhiên cực mạnh (TTNT, Tấn Công, Sát Thương Nguyên Tố), tuy nhiên không ổn định cho hỗ trợ phản ứng.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Troupe.png" },
      { rank: 8, name: "Ngọc Bích Hiến Tế", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", reason: "Tỷ Lệ Bạo Kích cao và tăng HP/TTNT khi không đứng sân, phù hợp cho Nahida off-field sử dụng như một vũ khí tăng chỉ số.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Yue.png" },
      { rank: 9, name: "Quyển Thiên Không", subStat: "Tấn Công%", isF2P: false, refinement: "R1", reason: "Tấn Công cơ bản cao và buff Sát Thương Nguyên Tố; nội tại tạo thêm sát thương vật lý nhỏ nhưng thiếu Tinh Thông Nguyên Tố.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Dvalin.png" },
      { rank: 10, name: "Điển Tích Tây Phong", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R1", reason: "Tỷ Lệ Bạo Kích cao và tăng dần Sát Thương Nguyên Tố khi đứng sân; không tối ưu cho lối chơi quick-swap.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Fourwinds.png" },
      { rank: 11, name: "Khóa Trần Thế", subStat: "Tấn Công%", isF2P: false, refinement: "R1", reason: "Yêu cầu khiên để tối đa hóa cộng dồn Tấn Công%; không thực sự lý tưởng vì Nahida ưu tiên Tinh Thông Nguyên Tố hơn.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Kunwu.png" },
      { rank: 12, name: "Nhật Nguyệt Hạp", subStat: "Tỷ Lệ Bạo Kích", isF2P: false, refinement: "R5", reason: "Gia tăng sát thương Kỹ Năng Nguyên Tố và Kỹ Năng Nộ kèm Tỷ Lệ Bạo Kích; thiếu Tinh Thông Nguyên Tố và chỉ phù hợp khi đứng sân.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Resurrection.png" },
      { rank: 13, name: "Tây Phong Mật Điển", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: false, refinement: "R5", reason: "Tạo hạt năng lượng cho cả đội; sử dụng nếu đội hình thiếu Nạp trầm trọng dù lượng Tinh Thông Nguyên Tố nhận lại thấp.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Zephyrus.png" },
      { rank: 14, name: "Hải Đồ Vạn Quốc", subStat: "Tinh Thông Nguyên Tố", isF2P: true, refinement: "R5", reason: "Vũ khí rèn dễ kiếm cung cấp Tinh Thông Nguyên Tố; nội tại tăng Sát Thương Nguyên Tố sau phản ứng, lựa chọn F2P ổn định.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Exotic.png" },
      { rank: 15, name: "Tóm Tắt Ma Pháp", subStat: "Tinh Thông Nguyên Tố", isF2P: true, refinement: "R5", reason: "Vũ khí 3 sao rẻ tiền cung cấp lượng Tinh Thông Nguyên Tố lớn; nội tại tăng sát thương lên kẻ địch dính ấn Thủy hoặc Lôi.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Intro.png" },
      { rank: 16, name: "Vòng Bạch Thần", subStat: "Hiệu Quả Nạp Nguyên Tố", isF2P: true, refinement: "R5", reason: "Vũ khí rèn cung cấp Hiệu Quả Nạp và buff Sát Thương Nguyên Tố liên quan đến Lôi; chỉ dùng trong đội hình phản ứng Lôi.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Bakufu.png" },
      { rank: 17, name: "Câu Chuyện Diệt Rồng", subStat: "HP%", isF2P: true, refinement: "R5", reason: "Cung cấp lượng lớn buff Tấn Công% cho nhân vật ra sân tiếp theo; chỉ dùng thuần hỗ trợ khi Nahida không gây sát thương.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Pulpfic.png" },
      { rank: 18, name: "Mẫu Kim Phách", subStat: "HP%", isF2P: true, refinement: "R5", reason: "Hồi máu và phục hồi năng lượng cho toàn đội; sử dụng nếu cần gia tăng khả năng sinh tồn và nạp năng lượng thay vì TTNT.", iconUrl: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Proto.png" }
    ],
    bestArtifacts: [
      {
        setName: "Ký Ức Rừng Sâu",
        pieces: 4,
        sands: ["Tinh Thông Nguyên Tố"],
        goblet: ["Tinh Thông Nguyên Tố", "Sát Thương Nguyên Tố Thảo"],
        circlet: ["Tinh Thông Nguyên Tố", "Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Tinh Thông Nguyên Tố", "Hiệu Quả Nạp", "Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"]
      },
      {
        setName: "Giấc Mộng Hoàng Kim",
        pieces: 4,
        sands: ["Tinh Thông Nguyên Tố"],
        goblet: ["Tinh Thông Nguyên Tố", "Sát Thương Nguyên Tố Thảo"],
        circlet: ["Tinh Thông Nguyên Tố", "Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Tinh Thông Nguyên Tố", "Hiệu Quả Nạp", "Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"]
      },
      {
        setName: "Đoàn Kịch Hoàng Kim",
        pieces: 4,
        sands: ["Tinh Thông Nguyên Tố"],
        goblet: ["Tinh Thông Nguyên Tố", "Sát Thương Nguyên Tố Thảo"],
        circlet: ["Tinh Thông Nguyên Tố", "Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
        subStatsPriority: ["Tinh Thông Nguyên Tố", "Hiệu Quả Nạp", "Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"]
      }
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
    bestArtifacts: (metaInfo && metaInfo.bestArtifacts) ? metaInfo.bestArtifacts : [
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
      await prisma.characterWeapon.deleteMany({ where: { characterId: char.id } });
      await prisma.characterArtifact.deleteMany({ where: { characterId: char.id } });
      await prisma.character.delete({ where: { id: char.id } }).catch(() => {});
      
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

