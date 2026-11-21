# GENSHINHUB — CONTINUE DEVIN WORK & COMPLETE FULL GAME DATABASE SYNC

## 1. BỐI CẢNH VÀ NHIỆM VỤ

Bạn đang tiếp tục phát triển dự án GenshinHub.

Trước đó, Devin đã triển khai phần lớn hệ thống `genshin-data-sync`, Asset Management, Prisma, Apollo GraphQL và Next.js.

Tuy nhiên, Devin đã hết token khi đang thực hiện nhiệm vụ mở rộng đồng bộ toàn bộ dữ liệu game.

**Nhiệm vụ của bạn là tiếp tục từ trạng thái codebase hiện tại, không làm lại từ đầu.**

Mục tiêu cuối cùng:

- Đồng bộ toàn bộ dữ liệu Genshin Impact mà GenshinHub đang hỗ trợ.
- Tự phát hiện dữ liệu mới từ các nguồn đã được phê duyệt.
- Cập nhật Characters, Weapons, Artifacts, Materials, Items và những dữ liệu game khác.
- Đồng bộ PostgreSQL thông qua Prisma.
- Đảm bảo Apollo GraphQL và Next.js hiển thị dữ liệu mới.
- Tự tải ảnh mới về local bằng Asset Sync Engine.
- Khắc phục vấn đề website chỉ hiển thị 125 nhân vật.
- Chuẩn bị hệ thống tự động cập nhật trên Oracle VPS.
- Không phụ thuộc bắt buộc vào GitHub Actions hoặc Vercel.

**Phải thực sự triển khai code, kiểm thử và báo cáo kết quả. Không chỉ viết kế hoạch.**

---

## 2. KIỂM TRA TIẾN ĐỘ DEVIN TRƯỚC KHI CODE

Đây là bước bắt buộc đầu tiên.

Chạy và phân tích:

```bash
git status
git diff
git diff --cached
git branch -vv
git log -5 --oneline
```

Sau đó:

1. Đọc `.agents/skills/genshin-data-sync/SKILL.md`.
2. Đọc toàn bộ Data Sync Engine hiện có.
3. Kiểm tra các thay đổi chưa commit do Devin để lại.
4. Kiểm tra các branch và commits gần nhất.
5. Kiểm tra Prisma Schema, GraphQL, Next.js và Asset Management.
6. Kiểm tra các bài kiểm thử đã có.
7. Kiểm tra tài liệu triển khai VPS.
8. Xác định rõ phần đã làm, phần chưa làm và phần chưa kiểm thử.

**Không xóa, reset, checkout đè hoặc ghi đè các thay đổi chưa commit.**

Không mặc định công việc đã hoàn thành chỉ vì có file hoặc tài liệu tương ứng.

Sau khi kiểm tra, đưa ra báo cáo tiến độ ngắn gọn rồi tiếp tục triển khai.

---

## 3. AUDIT TOÀN BỘ PRISMA DATABASE

Không giới hạn ở Character, Weapon, Artifact và Material.

Phân tích:

- `backend/prisma/schema.prisma`
- Tất cả Prisma models.
- Database relations.
- Các trường JSON chứa dữ liệu game.
- GraphQL types, queries, mutations và resolvers.
- Frontend pages, components và hooks.
- Data Sync Engine.
- Các script seed hoặc import dữ liệu cũ.
- Asset Sync Engine.

Phân loại tất cả models thành ba nhóm.

### A. Game Data — Có thể đồng bộ

Kiểm tra những loại dữ liệu thực sự tồn tại trong dự án:

- Characters và biến thể Traveler.
- Weapons.
- Artifact Sets và Artifact Pieces.
- Materials và Items.
- Character Ascension Materials.
- Weapon Ascension Materials.
- Talent Materials.
- Skills, Talents và Constellations.
- Character Stats.
- Weapon Stats và Passives.
- Enemies, Bosses và Drops.
- Domains.
- Regions và Elements.
- Food và Recipes.
- Achievements.
- Các loại dữ liệu game khác mà Prisma Schema hỗ trợ.

Đây là danh sách tham khảo. Không tự giả định tất cả các models đều tồn tại.

### B. Admin-managed Data — Phải bảo vệ

Ví dụ:

- Tier List.
- Recommended Weapons.
- Recommended Artifacts.
- Character Builds.
- Team Compositions.
- Meta Rankings.
- Build Notes.
- `tier`, `role`, `recommendedC`.
- `bestWeapons`, `bestArtifacts`, `teams`.
- `sands`, `goblet`, `circlet`.
- `subStatsPriority`.

Không cho phép nguồn game bên ngoài tự ghi đè.

### C. System & User Data — Không được đồng bộ từ game API

Ví dụ:

- Users.
- Authentication.
- Roles và Permissions.
- Inventory người dùng.
- Favorites.
- Settings.
- User-generated content.

Không được tự thay đổi hoặc xóa.

### Báo cáo bắt buộc

Với mỗi model, liệt kê:

- Tên model.
- Số lượng bản ghi hiện tại.
- Nguồn dữ liệu.
- Có hỗ trợ đồng bộ hay không.
- Những trường cho phép cập nhật.
- Những trường được bảo vệ.
- Trạng thái đầy đủ, missing hoặc pending.

Không bịa số lượng bản ghi.

---

## 4. KHẮC PHỤC VẤN ĐỀ WEBSITE CHỈ HIỂN THỊ 125 NHÂN VẬT

**ƯU TIÊN CAO NHẤT SAU DATABASE AUDIT.**

Hiện GenshinHub chỉ hiển thị 125 nhân vật, bao gồm Main Character/Traveler và một số biến thể.

Phải tìm nguyên nhân thực tế, không đoán.

Đối chiếu:

1. Tổng số nhân vật trong genshin-db đang cài.
2. Tổng số nhân vật trong phiên bản genshin-db mới nhất.
3. Tổng số nhân vật Sync Engine phát hiện.
4. Tổng số Character records trong PostgreSQL development.
5. Tổng số nhân vật Apollo GraphQL trả về.
6. Tổng số nhân vật Next.js hiển thị.

Kiểm tra:

- Package genshin-db lỗi thời.
- ID mapping sai.
- Traveler và các biến thể đặc biệt.
- Nhân vật chưa phát hành.
- Pagination hoặc limit 125.
- Danh sách hardcode.
- Filters.
- GraphQL resolver.
- Cache hoặc ISR.
- Nhân vật có trong database nhưng bị ẩn.
- Sai API endpoint hoặc database environment.

Phải xác định 125 có thực sự là dữ liệu thiếu hay chỉ là cách đếm hoặc lọc hợp lệ.

Nếu có nhân vật mới hợp lệ:

- Cập nhật genshin-db an toàn trên development.
- Chạy dry-run.
- Đồng bộ vào development PostgreSQL.
- Tải ảnh nhân vật còn thiếu.
- Xác nhận GraphQL trả dữ liệu.
- Kiểm tra trang danh sách và chi tiết Next.js.
- Báo cáo tên, ID và số nhân vật được bổ sung.

Không tạo nhân vật giả hoặc nhân vật chưa đủ dữ liệu xác thực.

---

## 5. KIỂM TRA DỮ LIỆU THIẾU Ở TẤT CẢ DANH MỤC

Không chỉ xử lý nhân vật.

Áp dụng quy trình kiểm tra tương tự cho:

- Weapons.
- Artifact Sets.
- Artifact Pieces.
- Materials.
- Items.
- Skills và Talents.
- Các Game Models khác được hỗ trợ.

Đối chiếu:

`Source → Detector → PostgreSQL → GraphQL → Next.js`

Với mỗi danh mục:

1. Đếm tổng dữ liệu nguồn.
2. Đếm dữ liệu trong database.
3. Đếm dữ liệu GraphQL trả về.
4. Đếm dữ liệu frontend hiển thị.
5. So sánh ID.
6. Phát hiện dữ liệu thiếu.
7. Xác định nguyên nhân.
8. Sửa đúng tầng bị lỗi.

Không coi chênh lệch số lượng là lỗi nếu nguồn chứa các bản ghi chưa phát hành, biến thể, dữ liệu bị loại hợp lệ hoặc loại dữ liệu ngoài phạm vi.

Báo cáo các trường hợp này rõ ràng.

---

## 6. TỰ ĐỘNG PHÁT HIỆN VÀ NÂNG CẤP GENSHIN-DB

Thiết kế cơ chế kiểm tra phiên bản genshin-db từ npm registry.

Yêu cầu:

1. Đọc phiên bản thực tế đang cài.
2. Kiểm tra phiên bản mới nhất trên npm.
3. So sánh phiên bản bằng semver.
4. Phát hiện bản cập nhật mới.
5. Tạo báo cáo thay đổi.
6. Kiểm tra breaking changes.
7. Chuẩn bị nâng cấp package và lockfile trên branch development.
8. Chạy build, validation và E2E trước khi chấp thuận.
9. Không nâng cấp trực tiếp trên production.
10. Không tự merge hoặc deploy bản chưa được phê duyệt.

Phân biệt rõ hai quá trình:

- Nâng cấp dependency genshin-db.
- Đồng bộ nội dung game từ dependency vào database.

Nếu genshin-db không cung cấp một loại dữ liệu, hãy kiểm tra nguồn phù hợp khác mà dự án đã sử dụng.

Mỗi nguồn bổ sung phải có mapping, validation và adapter rõ ràng.

Không scraping tùy tiện hoặc dùng nguồn không được phép.

---

## 7. FULL GAME DATABASE SYNC ENGINE

Tận dụng các module hiện tại:

- `idMapper.ts`
- `detector.ts`
- `syncEngine.ts`
- `assetSync.ts`
- `sync-assets.ts`

Không viết lại toàn bộ engine.

Mở rộng hệ thống để hỗ trợ mọi Game Model đủ điều kiện.

### Yêu cầu kỹ thuật

- ID chuẩn hóa và ổn định.
- Source-to-Prisma mapping.
- Prisma upsert.
- Kiểm tra relations.
- Phát hiện bản ghi mới.
- Phát hiện bản ghi đã thay đổi.
- Báo cáo bản ghi không còn ở nguồn.
- Không tự xóa bản ghi cũ.
- Không dùng `deleteMany` trong quy trình sync dữ liệu chính.
- Không tạo dữ liệu giả.
- Không ghi đè dữ liệu Admin.
- Không chỉnh sửa dữ liệu người dùng.
- Hỗ trợ dry-run.
- Validation trước khi ghi.
- Snapshot và database backup.
- Rollback.
- Idempotent.
- Xử lý dữ liệu pending.
- Báo cáo diff.

Nếu phát hiện loại dữ liệu mới chưa có Prisma Model tương ứng, hãy báo cáo và đề xuất migration để review.

**Không tự tạo bảng database mới khi chưa được phê duyệt.**

### Khả năng mở rộng

Ưu tiên kiến trúc adapter hoặc registry tái sử dụng code hiện có.

Không tạo một script đồng bộ riêng biệt cho từng loại dữ liệu nếu có thể dùng chung engine.

---

## 8. DATABASE RELATIONS & CONSISTENCY

Kiểm tra những quan hệ thực tế có trong Prisma Schema.

Ví dụ:

- Character → Skills.
- Character → Talents.
- Character → Constellations.
- Character → Ascension Materials.
- Weapon → Ascension Materials.
- Artifact Set → Artifact Pieces.
- Enemy → Drops.
- Recipe → Ingredients.

Chỉ xử lý các quan hệ thực sự tồn tại.

Yêu cầu:

- Không tạo foreign key sai.
- Không mất quan hệ cũ.
- Không tạo quan hệ giả.
- Đồng bộ đúng thứ tự phụ thuộc.
- Dữ liệu thiếu thông tin phải được đánh dấu pending.
- Dùng transaction khi phù hợp.
- Không để database không nhất quán nếu sync thất bại giữa chừng.

---

## 9. TỰ ĐỘNG ĐỒNG BỘ TOÀN BỘ HÌNH ẢNH

GenshinHub đã có Asset Management và lưu WebP local.

Phải tận dụng hệ thống này.

Kiểm tra ảnh cho mọi loại Game Data được hỗ trợ:

- Character portraits.
- Character icons.
- Weapon icons.
- Artifact icons.
- Material icons.
- Item icons.
- Skill icons.
- Talent icons.
- Enemy icons.
- Các trường ảnh game khác.

### Quy trình

`Check → Download Missing → Validate → Convert WebP → Atomic Save → Update URL`

Yêu cầu:

1. Không tải lại ảnh hợp lệ.
2. Không ghi đè ảnh Admin chỉnh sửa.
3. Phát hiện file hỏng.
4. Kiểm tra ảnh bằng Sharp.
5. WebP phù hợp.
6. Atomic write.
7. Retry có giới hạn.
8. CDN fallback.
9. Không tạo placeholder sai.
10. Không xóa assets đang được sử dụng.
11. Báo cáo ảnh missing.
12. Không để một ảnh 404 làm hỏng toàn bộ batch.

Tiếp tục kiểm tra 198 material icons còn thiếu theo báo cáo Devin.

Bốn material đang pending phải được giữ pending nếu chưa có nguồn dữ liệu rarity đáng tin cậy.

Không bịa dữ liệu để hoàn thành số lượng.

---

## 10. ĐỒNG BỘ PRISMA → GRAPHQL → NEXT.JS

Kiểm tra toàn bộ luồng:

`Game Sources → Sync Engine → Prisma → PostgreSQL → Apollo GraphQL → Next.js`

Với mỗi loại dữ liệu được hỗ trợ:

- GraphQL trả đúng bản ghi mới.
- Relations hợp lệ.
- Frontend nhận dữ liệu chính xác.
- Danh sách hiển thị đầy đủ theo bộ lọc hợp lệ.
- Pagination hoạt động.
- Search hoạt động.
- Trang chi tiết hoạt động.
- Assets local hiển thị.
- Không phụ thuộc hardcoded IDs không cần thiết.
- Cache Next.js được làm mới sau khi đồng bộ.

Nếu database có model nhưng frontend chưa có giao diện tương ứng, phải báo cáo rõ.

Không tự tạo hàng loạt frontend pages ngoài phạm vi dự án.

Chỉ chạy GraphQL Code Generator nếu schema GraphQL thay đổi.

---

## 11. CHUẨN BỊ TỰ ĐỘNG ĐỒNG BỘ TRÊN ORACLE VPS

GenshinHub dự kiến self-host toàn bộ trên Oracle VPS.

**Hiện tại chưa được deploy.**

Chuẩn bị hệ thống không phụ thuộc GitHub Actions hoặc Vercel.

### A. Daily Data Check Service

Tạo systemd service/timer mẫu để:

- Kiểm tra phiên bản genshin-db.
- Kiểm tra dữ liệu game mới.
- Kiểm tra bản ghi thiếu.
- Kiểm tra assets thiếu.
- Kiểm tra mapping errors.
- Tạo báo cáo dry-run.
- Ghi log.

Không tự ghi production DB.

### B. Data Apply Service

Tạo service riêng có khả năng:

1. Kiểm tra phiên bản nguồn đã được phê duyệt.
2. Validation.
3. Backup PostgreSQL.
4. Kiểm tra protected fields.
5. Prisma upsert.
6. Kiểm tra dữ liệu sau sync.
7. Làm mới cache Next.js.
8. Logging.
9. Rollback khi thất bại.

Không tự bật production apply.

### C. Asset Sync Service

Chuẩn bị lưu ảnh ở:

`ASSET_STORAGE_PATH=/srv/genshinhub/assets`

Yêu cầu:

- Không phụ thuộc frontend/public khi chạy production.
- Không tải lại ảnh đã hợp lệ.
- Nginx phục vụ `/assets/`.
- Có cache headers phù hợp.
- Ngăn path traversal.
- Assets tồn tại sau deploy hoặc restart.
- Hỗ trợ persistent Docker volume nếu dùng Docker Compose.

### D. Dependency Update

Chuẩn bị script kiểm tra phiên bản genshin-db từ npm.

Không chạy `npm install latest` trực tiếp trên production.

Chỉ triển khai dependency đã được kiểm thử và phê duyệt.

### E. Hỗ trợ hai phương án triển khai

Chuẩn bị template cho:

1. Node.js + systemd + Nginx.
2. Docker Compose + Nginx + persistent volumes.

Không bắt buộc triển khai cả hai cách ngay.

Không kết nối hoặc thay đổi VPS thật.

---

## 12. BACKUP, SECURITY & ROLLBACK

Yêu cầu:

- Kiểm tra đúng môi trường development/test.
- Không chạy trên production.
- Không đưa secrets vào repository.
- Không upload database dump chưa mã hóa lên nơi công khai.
- Backup trước khi ghi dữ liệu quan trọng.
- Kiểm tra phục hồi backup.
- Có rollback an toàn.
- Chống chạy nhiều tiến trình sync ghi đồng thời.
- Xử lý network timeout.
- Không ghi đè dữ liệu Admin.
- Không xóa dữ liệu người dùng.
- Không tự động migration production.

Nếu thiếu cấu hình an toàn cần thiết, phải dừng thao tác ghi và báo cáo rõ.

---

## 13. KIỂM THỬ BẮT BUỘC

Tận dụng những bài test Devin đã triển khai:

- 21 Data Sync E2E tests.
- 39 Asset Integration Tests.

Chạy lại các kiểm tra:

- Backend TypeScript build.
- Frontend TypeScript.
- Frontend lint.
- Prisma validation.
- Sync dry-run.
- Sync validation.
- Asset check.
- Asset integration tests.
- GraphQL integration tests.
- Data Sync E2E.

Bổ sung kiểm thử cho toàn bộ Game Models được hỗ trợ.

### Test Case

Với mỗi model có đồng bộ:

1. Nguồn có bản ghi mới.
2. Detector phát hiện đúng.
3. Dry-run không ghi DB.
4. Sync tạo bản ghi đúng.
5. Relations hợp lệ.
6. GraphQL truy vấn được dữ liệu mới.
7. Frontend hiển thị nếu có giao diện.
8. Asset được tải và lưu chính xác.
9. Sync lần hai không tạo dữ liệu trùng.
10. Protected fields giữ nguyên.
11. Bản ghi cũ không bị xóa khi thiếu trong nguồn.
12. Rollback hoạt động.

Kiểm tra thêm:

- Version checker phát hiện dependency mới.
- Systemd unit/timer hợp lệ.
- Persistent storage path.
- Nginx asset configuration.
- Trang nhân vật hiển thị đúng số lượng.
- Pagination không giới hạn dữ liệu bất thường.
- Thư viện và frontend tương thích sau nâng cấp.

Sử dụng fixture và database development/test.

Không dùng production database.

---

## 14. CIRCLECI & GITHUB

Hiện GitHub Actions của tài khoản bị khóa do billing.

CircleCI đã được cấu hình thay thế.

Hãy:

1. Kiểm tra `.circleci/config.yml` nếu tồn tại.
2. Kiểm tra branch và commit đang được CI kiểm thử.
3. Không mặc định CI đã pass cho các thay đổi mới.
4. Giữ tương thích với workflow GitHub Actions hiện có.
5. Không phụ thuộc vào GitHub Actions cho vận hành sync trên VPS.
6. Không tự push hoặc merge PR.
7. Báo cáo những bước kiểm thử vẫn cần chạy trên CircleCI sau khi thay đổi code.

---

## 15. BÁO CÁO CUỐI CÙNG

Sau khi hoàn thành, phải cung cấp báo cáo rõ ràng gồm:

1. Những công việc Devin đã hoàn thành.
2. Những công việc Codex tiếp tục thực hiện.
3. Danh sách tất cả Prisma Models đã phân tích.
4. Models thuộc Game Data.
5. Models được bảo vệ.
6. Models chưa có nguồn đồng bộ đáng tin cậy.
7. Tổng số bản ghi từng loại trước và sau.
8. Nguyên nhân website hiện chỉ hiển thị 125 nhân vật.
9. Danh sách nhân vật mới thực sự được bổ sung.
10. Danh sách Weapons, Artifacts, Items hoặc dữ liệu khác được bổ sung.
11. Phiên bản genshin-db cũ và mới.
12. Kết quả Data Sync.
13. Kết quả Asset Sync.
14. Kết quả GraphQL.
15. Kết quả Next.js.
16. Kết quả Integration/E2E tests.
17. Những dữ liệu missing hoặc pending.
18. File được tạo hoặc chỉnh sửa.
19. Trạng thái cấu hình systemd services/timers.
20. Phần nào tự động được, phần nào cần phê duyệt.
21. Những phần chưa kiểm thử trên VPS.
22. Hướng dẫn chạy thủ công trên development.
23. Những bước cần làm trước khi deploy VPS thật.

Phải có bảng **Database Sync Coverage** thể hiện tình trạng đồng bộ của mọi Game Model.

Không tuyên bố hoàn thành nếu chưa có kết quả kiểm thử thực tế.

---

## 16. NGUYÊN TẮC BẮT BUỘC

- KHÔNG viết lại hệ thống đã hoàn thành.
- KHÔNG xóa thay đổi chưa commit của Devin.
- KHÔNG tạo hệ thống sync thứ hai.
- KHÔNG tạo dữ liệu giả.
- KHÔNG xóa dữ liệu game cũ.
- KHÔNG ghi đè dữ liệu Admin.
- KHÔNG thay đổi dữ liệu người dùng.
- KHÔNG kết nối production database.
- KHÔNG deploy VPS.
- KHÔNG bật production timers.
- KHÔNG tự merge PR.
- KHÔNG push main.
- KHÔNG tự push branch khi chưa được yêu cầu.
- KHÔNG đưa secrets vào repository.
- KHÔNG tự tạo Prisma Models khi chưa được duyệt.
- KHÔNG tự thay đổi production schema.
- KHÔNG bỏ qua tests thất bại.
- KHÔNG tuyên bố tính năng hoạt động nếu mới chỉ tạo cấu hình.

## 17. THỨ TỰ THỰC HIỆN

Bắt buộc ưu tiên theo thứ tự:

1. Kiểm tra git status và tiến độ Devin.
2. Audit toàn bộ Prisma database.
3. Xác định nguyên nhân chỉ hiển thị 125 nhân vật và các dữ liệu khác bị thiếu.
4. Kiểm tra, nâng cấp nguồn genshin-db an toàn trên development.
5. Hoàn thiện Full Game Database Sync cho những models đủ điều kiện.
6. Kiểm tra dữ liệu mới đi qua Prisma, GraphQL và Next.js.
7. Hoàn thiện Asset Sync cho toàn bộ loại dữ liệu hỗ trợ.
8. Chuẩn bị systemd, Nginx, persistent storage và VPS deployment templates.
9. Chạy toàn bộ tests.
10. Báo cáo kết quả cuối cùng và các giới hạn còn tồn tại.

## 18. YÊU CẦU CUỐI

**Hãy thực sự tiếp tục triển khai code mà Devin chưa hoàn thành. Không chỉ tạo kế hoạch hoặc phân tích.**

Không được xem 125 nhân vật là số lượng đúng hoặc sai trước khi có bằng chứng đối chiếu.

Không được coi mọi loại dữ liệu từ API là dữ liệu có thể tự đồng bộ nếu chưa được phân loại và xác minh.

Không được thay đổi production.

**MỤC TIÊU CUỐI CÙNG:**

GenshinHub có khả năng phát hiện nội dung mới thuộc tất cả các danh mục game đang được hỗ trợ, cập nhật chính xác vào PostgreSQL, đồng bộ quan hệ, cung cấp dữ liệu qua Apollo GraphQL, tải ảnh local WebP và hiển thị đầy đủ trên Next.js.

Sau này khi triển khai Oracle VPS, hệ thống có thể kiểm tra dữ liệu tự động bằng systemd mà không cần GitHub Actions.

Bắt đầu bằng việc phân tích codebase hiện tại và tiếp tục phần Devin đang làm dở.
