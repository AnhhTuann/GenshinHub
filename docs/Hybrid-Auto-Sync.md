# 🚀 Kiến Trúc: Hybrid Auto-Sync Tài Nguyên & Fallback 3 Tầng

Tài liệu này mô tả chi tiết cơ chế cập nhật tự động tài nguyên tĩnh (Hình ảnh Nhân vật, Vũ khí...) và hệ thống phòng thủ Runtime chống vỡ giao diện trong dự án GenshinHub.

---

## 1. Vấn Đề (Pain Points)
- Game liên tục ra phiên bản mới (chu kỳ 6 tuần/lần), kéo theo hàng loạt hình ảnh nhân vật, vũ khí, vật phẩm mới.
- Lưu trữ tất cả hình ảnh thô trên Github làm phình to dung lượng Repository.
- Nếu Server chưa kịp có ảnh của phiên bản mới mà User đã truy cập, web sẽ bị lỗi 404 hoặc bể Layout.
- Sử dụng toàn bộ ảnh từ API bên ngoài sẽ làm chậm tốc độ tải trang (Latency cao) và phụ thuộc vào Server bên thứ ba.

---

## 2. Cấu Trúc Lưu Trữ Ảnh (Hiện tại)

```
frontend/public/assets/
├── characters/          ← Ảnh nhân vật (theo folder PascalCase)
│   ├── Hutao/
│   │   ├── avatar.webp  ← Icon nhân vật
│   │   └── splash.webp  ← Splash art / gacha art
│   ├── Kazuha/
│   │   ├── avatar.webp
│   │   └── splash.webp
│   └── ...
├── weapons/             ← Icon vũ khí
├── artifacts/           ← Icon thánh di vật
├── items/               ← Icon nguyên liệu
├── elements/            ← Icon hệ nguyên tố
└── banners/             ← Ảnh banner lịch sử
```

---

## 3. Giải Pháp: Hybrid Auto-Sync
Cơ chế này kết hợp giữa tốc độ cực nhanh của **Local Assets (WebP)** và tính an toàn tuyệt đối của **External API**, thông qua 2 hệ thống cốt lõi:

### Hệ Thống 1: Cỗ Máy Tự Động Kéo Data (Pre-build Sync)
Được cấu hình bằng Node.js và chạy ngầm qua GitHub Actions.
1. **Lịch Trình:** `00:00 sáng Thứ 4 hàng tuần` (Trùng với chu kỳ bảo trì Update của Hoyoverse).
2. **Script `scripts/sync-new-assets.js`**:
   - Chọc vào Enka Network API để quét toàn bộ dữ liệu Nhân Vật và Vũ Khí mới nhất.
   - So chiếu với thư mục `public/assets/characters/` trên máy chủ. Lọc ra các nhân vật còn thiếu.
   - Tự động download ảnh thô (PNG), chạy xuyên qua bộ nén `sharp` để ép thành chuẩn `.webp` siêu nhẹ.
   - Trả file vừa nén vào đúng folder `characters/<Name>/avatar.webp` và `splash.webp`.
3. **Chốt Chặn Build Rác**: Script kiểm tra `git status --porcelain`. Chỉ khi thực sự có file WebP mới được tải về, Bot mới tiến hành `git commit` và `git push`. Việc này sẽ tự động Trigger hệ thống Vercel Deploy ra một bản Website hoàn toàn mới mà không cần lập trình viên đụng tay vào.

### Hệ Thống 2: Lá Chắn Runtime 3 Tầng (FallbackImage)
Trong trường hợp game **vừa cập nhật sáng nay**, nhưng Bot GitHub hẹn lịch chạy vào **đêm nay**, nếu User vào web lúc trưa thì hiển nhiên file ảnh Local sẽ không tồn tại (Lỗi 404).

Lúc này, Component `<FallbackImage />` đóng vai trò là một lá chắn phòng thủ 3 tầng:

- **Tầng 1 (Tốc Độ Bàn Thờ):** Ưu tiên bốc file WebP có sẵn từ Local Server (`public/assets/characters/<Name>/avatar.webp`). Nhanh, nhẹ, không phụ thuộc API.
- **Tầng 2 (Pha Cứu Cánh Chớp Nhoáng):** Nếu Tầng 1 báo lỗi 404 (do Bot chưa kịp chạy Sync), FallbackImage sẽ tự động bắt sự kiện `onError` và gán lại đường dẫn của ảnh thông qua prop `externalSrc` (URL từ DB hoặc Enka/Ambr.top). Lớp này đảm bảo User vẫn thấy được ảnh mới nhất dù hệ thống chưa cập nhật.
- **Tầng 3 (Biện Pháp Cuối Cùng):** Nếu xui xẻo API ngoài cũng bị sập, `onError` sẽ tiếp tục kích hoạt lần 2. Lúc này ảnh sẽ trượt về phương án cuối cùng là `fallback-icon.webp` (Hình Paimon thắc mắc), ngăn chặn triệt để tình trạng bể UI hoặc vòng lặp vô tận (Infinite Loop).

**Đặc biệt:** Cơ chế sử dụng hook `useEffect` theo dõi sự biến đổi của nhân vật để Reset lại State về Tầng 1, đảm bảo tính nguyên vẹn dữ liệu khi User điều hướng liên tục giữa các trang trong ứng dụng React (SPA).

---

## 4. Cách Sử Dụng Cho Lập Trình Viên

Bất cứ khi nào bạn code một màn hình mới, thay vì dùng `<Image />` mặc định, hãy dùng `<FallbackImage />` và đảm bảo nhồi thêm prop `externalSrc`:

```tsx
import FallbackImage from '@/components/ui/FallbackImage';
import { getCharacterAvatar } from '@/utils/assetMap';

// Ví dụ render ảnh Avatar của Citlali
<FallbackImage 
  src={getCharacterAvatar('citlali')}    // Tầng 1: /assets/characters/Citlali/avatar.webp
  externalSrc={character.avatarUrl}       // Tầng 2: URL từ database (external)
  alt="Citlali Avatar"
  fill
/>
```

Chỉ cần tuân thủ cấu trúc trên, bạn sẽ không bao giờ phải lo lắng về việc ảnh bị hỏng trong GenshinHub nữa!

---

## 5. Script Thủ Công

Khi cần tải ảnh cho nhân vật mới thủ công:

```bash
# Từ thư mục root:
npm run download-assets

# Ảnh sẽ tự động lưu vào:
# frontend/public/assets/characters/<EnkaFolderName>/avatar.webp
# frontend/public/assets/characters/<EnkaFolderName>/splash.webp
```
