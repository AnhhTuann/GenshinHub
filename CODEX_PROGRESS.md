# Báo cáo tiến độ triển khai Balanced Fantasy Motion & Character Spotlight

- **Branch hiện tại:** `feat/balanced-fantasy-motion`
- **Git status:** 37 file sửa đổi (working tree), 13 file mới chưa commit (untracked). Tất cả được bảo vệ nguyên vẹn.
- **Môi trường:** Arch Linux, Node 20.x, Chromium (`/usr/bin/google-chrome-stable`), Python venv Playwright (`/tmp/genshinhub-playwright-env`).

---

## 1. Trạng thái các hạng mục (DONE / PARTIAL / MISSING / BLOCKED)

| Hạng mục | Trạng thái | Chi tiết kỹ thuật & Bằng chứng | Component / File liên quan |
| --- | --- | --- | --- |
| **Motion Foundation** | **DONE** | Hệ thống tokens thời gian và easing (`--motion-character: 500ms`, `--motion-modal: 320ms`, v.v.), loại bỏ `AnimatePresence` cấp route để tránh re-mount, dùng `@starting-style` và `allow-discrete` cho exit transitions. | `globals.css`, `PageTransition.tsx`, `template.tsx` |
| **Character Spotlight (Home & Detail)** | **DONE** | Responsive desktop & mobile (390/768/1024/1440px), bảng thông số nguyên tố GraphQL, gradient theo element, hiệu ứng parallax qua `MotionDepth`. | `CharacterSpotlight.tsx`, `CharacterHero.tsx`, `SpotlightPanel.tsx`, `MotionDepth.tsx` |
| **Spotlight Crossfade** | **DONE** | Lớp outgoing có `z-index: 2` mờ dần trên lớp current `z-index: 1`. Thêm xử lý `onAnimationEnd` dọn dẹp frame cũ, bọc kiểm tra matching source (tránh xóa nhầm khi chuyển nhanh), timeout 600ms fallback và hỗ trợ `prefers-reduced-motion`. | `SpotlightArtwork.tsx`, `globals.css` |
| **Character Preview (Dialog & Exit)** | **DONE** | Native `<dialog>` mở modal với `@starting-style`, phím Tab trap, phím Escape đóng, click ngoài đóng. Transition exit mượt mà không giật layout. | `SplashArtOverlay.tsx`, `CharacterCard.tsx`, `globals.css` |
| **Weapons & Artifacts Motion** | **DONE** | Grid hover micro-interaction, glow theo độ hiếm 5★/4★ (`--collection-glow`), keyboard focus ring, thuộc tính `aria-pressed` đầy đủ. Detail page có skeleton loading riêng biệt. | `WeaponsClient.tsx`, `WeaponDetailClient.tsx`, `ArtifactsClient.tsx`, `ArtifactDetailClient.tsx`, `CollectionDetailSkeleton.tsx`, `globals.css` |
| **Materials Catalogue** | **DONE** | Tải theo đợt 48 thẻ (`visibleCount`), nút Load More lũy tiến, tìm kiếm client trên toàn bộ dataset trước khi phân trang, skeleton lúc fetch, xử lý CORS với backend. | `materials/page.tsx`, `MaterialCard.tsx`, `globals.css` |
| **Tier List & Banner History** | **DONE** | Dùng một `IntersectionObserver` duy nhất qua `MotionRevealGroup` cho tất cả hàng `[data-motion-row]` để tối ưu tài nguyên; timeline banner có glow bản phát hành mới nhất. | `TierListClient.tsx`, `BannersClient.tsx`, `MotionRevealGroup.tsx`, `globals.css` |
| **Teams, Daily Farming, Auth & Admin** | **DONE** | Teams accordion với `aria-expanded`, Daily Farming chuyển ngày không flicker, Login/Register form validation `:user-invalid` và `aria-busy`, Admin mobile drawer dùng `inert` khi đóng. | `TeamsClient.tsx`, `DailyFarming.tsx`, `login/page.tsx`, `register/page.tsx`, `AdminLayoutClient.tsx` |
| **Reduced Motion & A11y** | **DONE** | CSS `@media (prefers-reduced-motion: reduce)` tắt triệt để transition/transform/animation; `MotionConfig reducedMotion="user"`; pass kiểm thử bàn phím và screen-reader hints. | `globals.css`, `PageTransition.tsx`, `test-motion.py` |
| **Cross-site Regression Suite** | **DONE** | Đã sửa race-condition hydrat hóa: `open_path` chờ `wait_until="load"` và `networkidle`, `cards.first.wait_for()`. Toàn bộ 14 URL test đều PASS không lỗi hydration. | `test-motion.py`, `test-motion-regression.py` |
| **Core Web Vitals & FPS** | **PARTIAL** | Đã đo đạc thành công trên Chromium development; cuộn 60.0 FPS, CLS 0.038, LCP 1.988s. Chưa có baseline production field để so sánh tương quan chính thức. | `performance.json` |
| **Admin Write Flow & Real Auth** | **BLOCKED (Scope)** | Cố tình ngoài phạm vi test tự động để bảo vệ dữ liệu development/test, tránh tạo tài khoản rác hoặc ghi đè cấu hình Admin. | `AdminLayoutClient.tsx`, `auth/*` |

---

## 2. Kết quả kiểm thử đã xác minh thực tế

Các lệnh kiểm thử đã được chạy **tuần tự** trên hệ thống và xác nhận PASS 100%:

1. **TypeScript Typecheck:**
   - Lệnh: `npx tsc --noEmit` (tại thư mục `frontend/`)
   - Kết quả: **Exit code 0** (0 lỗi type).

2. **ESLint:**
   - Lệnh: `npm run lint` (tại thư mục `frontend/`)
   - Kết quả: **Exit code 0** (0 lỗi lint trên toàn bộ các file mới và sửa đổi).

3. **Playwright Motion Unit E2E:**
   - Lệnh: `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/google-chrome-stable GENSHIN_MOTION_URL="http://127.0.0.1:55441" /tmp/genshinhub-playwright-env/bin/python frontend/scripts/test-motion.py`
   - Kết quả: **PASS**. Xác nhận: Preview mở/đóng, bẫy tiêu điểm phím Tab/Shift+Tab, phím Escape, reduced motion, responsive artwork Citlali, chuyển đổi nhân vật.

4. **Playwright Full Motion Regression & Performance Audit:**
   - Lệnh: `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/google-chrome-stable GENSHIN_MOTION_URL="http://127.0.0.1:55441" /tmp/genshinhub-playwright-env/bin/python frontend/scripts/test-motion-regression.py`
   - Kết quả: **PASS**. Duyệt qua 14 URL (Home, Characters, Preview, Weapons, Weapon Detail, Artifacts, Artifact Detail, Materials, Tier List, Banner History, Teams, Login, Register, Admin). Không có bất kỳ lỗi hydration mismatch hay pageerror nào.

---

## 3. Báo cáo hiệu năng và điều kiện đo đạc

Dữ liệu ghi nhận tại file `/tmp/genshin-motion-evidence/performance.json`:

```json
{
  "lcpMs": 1988,
  "cls": 0.03789019505935115,
  "scroll": {
    "frames": 72,
    "durationMs": 1200,
    "over33Ms": 0,
    "largestGapMs": 17,
    "estimatedFps": 60.0
  },
  "previewCold": {
    "frames": 18,
    "durationMs": 662.8,
    "over33Ms": 8,
    "largestGapMs": 67,
    "estimatedFps": 27.2
  },
  "previewWarm": {
    "frames": 26,
    "durationMs": 660.5,
    "over33Ms": 3,
    "largestGapMs": 67,
    "estimatedFps": 39.4
  }
}
```

- **Điều kiện đo:** Trình duyệt Google Chrome Stable headless trên Arch Linux, chạy trên Next.js development server (chưa nén/bundle production) qua `PerformanceObserver` và `requestAnimationFrame`.
- **Ghi chú quan trọng:** Đây là số đo trong môi trường phát triển (development lab measurement), không dùng để so sánh before/after chính thức khi chưa có baseline runtime production trước đợt nâng cấp. Tuy nhiên, các chỉ số CLS (0.038 < 0.1) và Scroll FPS (60.0 FPS, không có khoảng cách khung hình nào vượt quá 33.4ms) cho thấy chuyển động không gây giật lag luồng chính.

---

## 4. Những thay đổi chưa commit cần giữ nguyên

Tất cả 50 files (37 modified, 13 untracked) thuộc nhánh `feat/balanced-fantasy-motion` được bảo toàn:
- `frontend/app/globals.css`: Toàn bộ hệ thống token, CSS transitions, `@starting-style`, `@keyframes`.
- `frontend/components/characters/SpotlightArtwork.tsx`: Cơ chế crossfade 2 tầng với `z-index: 2` và `onAnimationEnd` an toàn.
- `frontend/components/characters/SpotlightPanel.tsx`: Panel nhân vật dùng chung cho Home, Preview và Detail.
- `frontend/components/ui/SplashArtOverlay.tsx`: Dialog xem trước dùng native modal và clean exit.
- `frontend/components/shared/MotionRevealGroup.tsx`: Intersection observer duy nhất cho Tier List và Banner History.
- `frontend/components/shared/CollectionDetailSkeleton.tsx`: Skeleton chuyên biệt cho vũ khí và thánh di vật.
- `frontend/components/shared/MotionDepth.tsx`: Parallax desktop tương thích reduced motion.
- `frontend/scripts/test-motion.py` & `frontend/scripts/test-motion-regression.py`: Test suite hồi quy đã fix timing.
- Các client components Weapons, Artifacts, Materials, Teams, Tier List, Banners, Auth, Admin.

---

## 5. Hướng dẫn chạy kiểm thử tuần tự cho phiên tiếp theo

Để đảm bảo máy Arch Linux hoạt động ổn định và không bị nghẽn tài nguyên:

1. **Khởi động backend (nếu chưa chạy):**
   ```bash
   cd backend
   FRONTEND_URL="http://127.0.0.1:55441" PORT=55442 node node_modules/.bin/ts-node src/index.ts
   ```

2. **Khởi động frontend (nếu chưa chạy):**
   ```bash
   cd frontend
   NEXT_PUBLIC_GRAPHQL_URL="http://127.0.0.1:55442/graphql" PORT=55441 npx next dev -p 55441
   ```

3. **Chạy kiểm tra type và lint:**
   ```bash
   cd frontend
   npx tsc --noEmit
   npm run lint
   ```

4. **Chạy E2E regression Playwright:**
   ```bash
   PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/google-chrome-stable GENSHIN_MOTION_URL="http://127.0.0.1:55441" /tmp/genshinhub-playwright-env/bin/python frontend/scripts/test-motion.py
   PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/google-chrome-stable GENSHIN_MOTION_URL="http://127.0.0.1:55441" /tmp/genshinhub-playwright-env/bin/python frontend/scripts/test-motion-regression.py
   ```

---

## 6. Nhiệm vụ đề xuất cho đợt tiếp theo

1. **Tạo snapshot video/hình ảnh mới:** Nếu cần bằng chứng demo cho người dùng, có thể kích hoạt ghi video qua Playwright context tracing.
2. **Chuẩn bị production build:** Khi người dùng yêu cầu, tiến hành chạy `npm run build` trên `frontend/` để kiểm tra kích thước First Load JS cuối cùng.
3. **Giữ nguyên trạng thái:** Không push, không merge, không xóa bất kỳ thay đổi nào trước khi có sự chấp thuận của người dùng.

## Modern Teyvat Atlas — Redesign UI/UX

Nhánh `feat/balanced-fantasy-motion`. Khi bắt đầu có 37 file modified và 13 file untracked. Bản sao của 50 file nằm ở `/tmp/genshinhub-atlas-qa/working-tree.tar`. Checksum của `CharacterCard.tsx` khớp với lúc bắt đầu. Bộ lọc, lưới, search, số lượng và phân trang vẫn dùng dữ liệu hiện hành gồm 131 nhân vật.

| Phase | Thay đổi và bằng chứng |
| --- | --- |
| 0. Audit | Đọc báo cáo motion, kiểm tra Tailwind 4 và stylesheet hiện có. Bốn ảnh được nhắc trong yêu cầu không có trong phiên này. Đã chụp lại bốn màn hình trên development tại 390 và 1440 px làm baseline. |
| 1. Element icon | Dùng chung ElementIcon 24 px với WebP gốc 64×64 và nền tint. Trong repo không có SVG tương ứng. Áp dụng cho bộ lọc nhân vật, Teams, Spotlight, Teyvat, lịch farming, sinh nhật và các khu vực liên quan ở trang chi tiết. |
| 2. Homepage | Hero sáng hơn, CTA tím, bản đồ la bàn Teyvat và lối tắt nhỏ gọn. Chụp thêm spotlight, điều hướng và các khối Plan your day. Crossfade của spotlight dùng cơ chế hiện có. |
| 3. Character Detail | Tái phân bố panel vũ khí, thánh di vật và ưu tiên chỉ số. Kiểm tra Albedo từ hero tới overview, bảng chỉ số và nguyên liệu. Logic và số liệu sử dụng dữ liệu hiện có. |
| 4. Artifacts | Lưới rộng, ảnh contain và bộ lọc chung. Bonus đầy đủ ở trang chi tiết. Danh sách từng món dùng dữ liệu tiếng Anh và tiếng Việt từ bản genshin-db đã cài sẵn trong repo. |
| 5. Characters | Heading, tìm kiếm, độ hiếm, vũ khí, nguyên tố và bộ đếm có trạng thái chọn rõ. Mục tiêu tương tác chính từ 44 px, icon 24 px. |
| 6. Trang phụ | Áp dụng các thành phần phù hợp cho Weapons, Materials, Tier List, Banner History, Teams, Authentication và Admin Dashboard. Daily Farming được kiểm tra trên homepage. Materials hiện có trang danh sách. |
| 7–8. Visual QA | Ảnh baseline và ảnh nghiệm thu trong `/tmp/genshinhub-atlas-qa/`. Visual QA dùng Chromium và duyệt tuần tự trên một browser. Có ảnh Light/Dark và ảnh các phần bên dưới hero. |

Ảnh đối chiếu dùng dữ liệu development. Các kiểm tra auth và admin chỉ đọc giao diện và trạng thái xác thực, không ghi dữ liệu. Các thay đổi đồng thời trong backend được giữ nguyên.

### Nghiệm thu trình duyệt

- Lượt kiểm tra chính ghi nhận 51 tổ hợp trang và chiều rộng, cùng một bài kiểm tra chạm bộ lọc trong Dark Mode. Các màn hình chính được kiểm tra tại 390, 768, 1024, 1440 và 1920 px. Các trang phụ được chụp ở 390 và 1440 px.
- Ảnh của Homepage và Albedo được chụp lại sau khi cân đối khối Plan your day và xếp cạnh nhau hai bảng nguyên liệu ở desktop. Teams và Tier List được chụp lại sau khi gộp tiêu đề trùng.
- Ảnh ghi nhận Admin Access và các biểu mẫu tài khoản. Các màn hình yêu cầu phiên đăng nhập thật chưa được nghiệm thu sau đăng nhập.
- Artifact Detail Heart of the Furnace hiển thị đúng năm món. Characters có 131 bản ghi. Lượt kiểm tra chọn và bỏ chọn nguyên tố dùng cả bàn phím và touch.
- Bộ ảnh đối chiếu là `before-after-desktop.png`, `before-after-mobile.png`, `dark-1440.png` và `dark-390.png` trong thư mục QA. Các lượt kiểm tra được ghi trong `visual.log`, `layout-polish.log` và `catalogue-polish.log`.

- TypeScript và ESLint chạy xong với mã thoát 0. ESLint còn các cảnh báo có sẵn về React Hook Form và ảnh trong một số component.
- Cả hai bộ Playwright của Balanced Fantasy Motion đã chạy qua. Bộ hồi quy đầy đủ đã chạy lại trên bản sao QA sau khi tách đầu ra Next.js và quản lý vòng đời backend cùng phiên kiểm thử.
- Đo trên Chromium development cho trang Characters cho kết quả LCP 1,104 ms, CLS 0,0375 và 56,7 FPS trong mẫu cuộn 1,2 giây. Đây là một lần đo development, không phải số liệu production. Chi tiết nằm trong `motion/performance.json`.

## Vá Dark Mode và độ đọc của Character Card

- Kiểm tra lúc bắt đầu trên nhánh `feat/balanced-fantasy-motion` ghi nhận 67 file modified và 18 file untracked. Phạm vi sửa là giao diện nêu dưới đây.
- Nguyên nhân chính là rule Light Mode cố định surface sáng khi foreground đã chuyển theo Dark Mode. Rule của Spotlight dùng selector hậu duệ cho bộ lọc nằm ở khối ngang hàng. Navbar cũng dùng utility màu slate cố định ở từng điều khiển, còn carousel và grid có chữ giảm opacity và metadata nhỏ. Rule ẩn Search cũ còn áp dụng nhầm cho nút mobile.
- `frontend/app/globals.css` hợp nhất rule carousel và navbar, bổ sung `--control-border`, `--selected-surface` và token rarity theo theme. `CharacterSpotlight.tsx` dùng ElementIcon 24 px, dấu chọn, surface thông tin theo theme, nút cuộn có trạng thái ở hai đầu và reduced motion tương thích hydration. `CharacterCard.tsx` chỉ chỉnh icon, tier, sao và weapon badge trên layout hiện có.
- Các file navbar đã chỉnh gồm `Navbar.tsx`, `CommandPalette.tsx`, `UISoundToggle.tsx`, `navbar/LanguageDropdown.tsx`, `navbar/MobileMenu.tsx` và `navbar/UserNav.tsx`, đều trong `frontend/components/shared/`.
- Chromium đã kiểm tra cả hai theme ở 390, 768, 1024, 1440 và 1920 px. Đã thử chọn bộ lọc, cuộn carousel, hover, focus bằng Tab, Search, đóng Language bằng Escape và điều hướng bằng touch. Kiểm tra cuối không ghi nhận hydration mismatch hay tràn ngang cấp trang.
- Tương phản chữ ở các mẫu đã đo đạt từ 5,88:1 đến 14,55:1. Bộ đếm filter đạt 7,87:1 ở Dark Mode, tên carousel 12,51:1, metadata vùng 8,66:1 và weapon badge trong grid 12,42:1. Viền pill nguyên tố được kiểm tra đạt ít nhất 3:1 với surface của pill ở cả hai theme.
- TypeScript, ESLint và `frontend/scripts/test-motion.py` thoát mã 0. ESLint còn cảnh báo có sẵn. Chưa có phép đo hiệu năng mới và menu tài khoản sau đăng nhập chưa được xác minh trực tiếp.
- Ảnh trước và sau cùng log phép đo nằm trong `/tmp/genshin-dark-qa/`. Baseline được chụp từ development vì bốn ảnh nhắc trong yêu cầu không hiện trong phiên.
