# Hướng Dẫn Sử Dụng GenshinHub Admin

Chào mừng bạn đến với trang quản trị (Admin Dashboard) của **GenshinHub**. Trang quản trị cung cấp đầy đủ các công cụ mạnh mẽ để thêm, sửa, xóa và đồng bộ dữ liệu nhanh chóng từ API bên ngoài.

---

## 1. Cấu trúc Admin Panel

Trang Admin được chia thành các khu vực (tab) chức năng chính:
- **Tier List**: Sửa đổi bảng xếp hạng nhân vật hiện tại.
- **Characters**: Quản lý thông tin chi tiết, vũ khí, đội hình, thánh di vật và tài nguyên của nhân vật.
- **Weapons & Artifacts**: Quản lý kho vũ khí, thánh di vật.
- **Materials**: Đồng bộ và tải về các nguyên liệu nâng cấp từ Yatta API.
- **Export / Import**: Quản lý file backup `.json` (Lưu trữ và phục hồi toàn bộ cơ sở dữ liệu).

---

## 2. Quản Lý Nhân Vật (Characters)

Đây là nơi bạn có thể cập nhật mọi thông tin về 1 nhân vật trong Genshin Impact.
Hệ thống cho phép bạn:
- **Tạo nhân vật mới bằng AI (AI Generator):** Nếu lười nhập tay, bạn chỉ cần gõ tên nhân vật (vd: "Alhaitham") và bấm `Generate with AI`. AI sẽ tự động điền các thông tin như mô tả, độ hiếm, hệ, vũ khí khuyên dùng, và chỉ số ưu tiên!
- **Chỉnh sửa Trang bị tốt nhất (Best Weapons / Artifacts):**
  - Chỉ cần chọn vào ô và tìm kiếm tên vũ khí / bộ thánh di vật từ danh sách có sẵn.
  - Kéo thả để sắp xếp lại độ ưu tiên.
- **Chỉnh sửa Đội hình (Teams):**
  - Bạn có thể xây dựng các đội hình mạnh nhất (Meta Teams).
  - Tìm và thêm các thành viên vào đội hình, sửa mô tả (vai trò, combo, rotation).
- **Lưu dữ liệu:** Khi hoàn tất chỉnh sửa, bấm **Lưu thay đổi (Save)**. Hệ thống sẽ có pop-up (Toast Message) báo thành công hoặc thất bại.

---

## 3. Cập Nhật Nguyên Liệu (Materials Tracker)

Khi game có bản cập nhật mới (boss mới, hoa mới, sách thiên phú mới) hoặc khi bạn thấy các nguyên liệu trong trang chi tiết nhân vật bị báo `NO ICON`, hãy làm theo sau:
1. Vào tab **Materials** trên Menu Admin.
2. Tại đây, bạn sẽ thấy tổng số nguyên liệu đang có trong hệ thống (hiện tại hơn 1,000+).
3. Bấm vào nút **"Sync All Materials from API"** (hoặc chạy lệnh terminal `npx ts-node fix_materials.ts` trong thư mục `backend`).
4. Hệ thống sẽ tự động quét toàn bộ nhân vật, hỏi API của Yatta (tiếng Anh và tiếng Việt) để kéo về tất cả ảnh (icon) và thông tin nâng cấp còn thiếu. 

> **Lưu ý**: Hãy cẩn thận không bấm nhiều lần liên tục để tránh bị API của Yatta block IP.

---

## 4. Quản Lý File Sao Lưu (Export & Backup)

GenshinHub lưu trữ một khối lượng dữ liệu khổng lồ (Nhân vật, Vũ khí, TDV, Nguyên liệu). Để tránh mất mát dữ liệu hoặc để chia sẻ DB với người khác, bạn phải backup thường xuyên.

- **Tạo Backup:**
  - Chuyển sang tab **Export / Backup**.
  - Bấm nút **Create Full JSON Backup**.
  - Hệ thống sẽ đóng gói toàn bộ Data thành 1 file dạng `backup_YYYY-MM-DD.json` (dung lượng khoảng 3-4MB).
  - File này được lưu an toàn trong thư mục `backend/backups/`.

- **Phục Hồi (Restore / Import):**
  - Trong cùng giao diện, chọn file backup mới nhất.
  - Bấm **Restore from this Backup**.
  - *Cảnh báo: Hành động này sẽ ghi đè toàn bộ DB hiện tại bằng nội dung của file Backup.*

- **Quản lý giới hạn:** Hệ thống được cấu hình tự động giữ lại tối đa **10 bản backup mới nhất** để tránh nặng ổ cứng. Các bản cũ sẽ tự động bị xóa đi (auto cleanup).

---

## 5. Command Palette (Tìm Kiếm Nhanh)

Bạn không cần phải lục tung trang web để tìm một nhân vật. Dù đang ở bất kỳ trang nào, bạn chỉ cần:
- Nhấn tổ hợp phím **`Ctrl + K`** (hoặc `Cmd + K` trên Mac).
- Gõ tên nhân vật, hệ, hoặc vũ khí bạn muốn tìm.
- Bấm `Enter` để nhảy ngay đến trang chi tiết hoặc trang chỉnh sửa của Admin.

---

## 6. Lời Khuyên Hữu Ích
- Tất cả các API backend đều được bảo vệ. Nếu có lỗi **Unauthorized**, hãy đảm bảo bạn đang đăng nhập với quyền hạn `Admin`.
- Mọi chỉnh sửa ở Frontend sẽ được Server phản hồi trực tiếp. Bạn nên đợi Toast Message xanh (Success) hiện lên trước khi tắt trình duyệt. 
- Để xem sự thay đổi hình ảnh (ví dụ Banner), bạn có thể qua tab Nhân vật, nó sẽ được update ngay lập tức nhờ Next.js SSR.

Chúc bạn quản lý GenshinHub thật xịn xò!
