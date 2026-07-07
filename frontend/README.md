# GenshinHub - Frontend 🎨

Đây là thư mục chứa mã nguồn giao diện người dùng của **GenshinHub**, được phát triển dựa trên các công nghệ web hiện đại để đảm bảo hiệu suất (Performance), tối ưu SEO và mang lại trải nghiệm tương tác mượt mà tuyệt đối (Giao diện Dark Mode + Glassmorphism Premium).

## 📦 Các Packages đã sử dụng và Công dụng

| Package | Phiên bản | Công dụng |
| :--- | :--- | :--- |
| **Next.js** | `15.x` | Framework React chính, sử dụng App Router, Server Components để tối ưu hiệu suất và SEO. Hỗ trợ i18n routing. |
| **React & React DOM** | `19.x` | Thư viện cốt lõi xây dựng giao diện người dùng. |
| **TailwindCSS** | `4.x` | Utility-first CSS framework để style giao diện, tích hợp qua `@tailwindcss/postcss`. |
| **Framer Motion** | `12.x` | Cung cấp hệ thống API animation mượt mà cho các hiệu ứng hover, danh sách và chuyển cảnh. |
| **next-intl** | `4.x` | Xử lý đa ngôn ngữ (i18n) cho Server và Client components (hiện hỗ trợ tiếng Anh và tiếng Việt). |
| **react-hook-form** | `7.x` | Quản lý form hiệu suất cao cho các trang Admin. |
| **zod** | `4.x` | Schema validation, kết hợp với react-hook-form qua `@hookform/resolvers`. |
| **lucide-react** | `1.x` | Bộ icon SVG hiện đại, thay thế heroicons. |
| **class-variance-authority** | `0.7.x` | Tiện ích (CVA) hỗ trợ quản lý các trạng thái (variants) của UI component một cách an toàn và gọn gàng. |
| **jose** | `6.x` | Xử lý JWT authentication cho admin session. |
| **react-hot-toast** | `2.x` | Hiển thị thông báo (toast) đẹp và nhẹ. |

## 📂 Cấu trúc thư mục (Directory Structure)

- **`app/`**: Chứa các trang (Pages) của Next.js App Router. Được bọc trong `[locale]` router để hỗ trợ đa ngôn ngữ.
  - `/characters`: Danh sách nhân vật và trang chi tiết.
  - `/teams`: Tier list các đội hình mạnh nhất hiện tại.
  - `/banners`: Lịch sử các phiên bản Banners đầy đủ từ 1.0 với hình ảnh tĩnh độ phân giải cao.
  - `/admin`: Trang quản trị bảo mật (Dashboard) cho phép thao tác trực tiếp với API GraphQL (tạo nhân vật AI, kéo thả tier list, sync nguyên liệu, quản lý backup JSON).
- **`components/`**: Chứa các UI Components độc lập và có thể tái sử dụng.
  - `admin/`: Các component đặc thù phục vụ chỉnh sửa dữ liệu nội bộ.
- **`lib/`**: Chứa các hàm tiện ích, cấu hình kết nối API. Nổi bật là file `graphql.ts` chịu trách nhiệm gọi API GraphQL tới Backend.
- **`data/`**: Chứa các dữ liệu tĩnh (như `banners.ts`, `teams.ts`) phục vụ cho các module ưu tiên hiệu suất cao không cần gọi GraphQL.
- **`messages/`**: Chứa các tệp dịch thuật (JSON) cho `next-intl`.
- **`public/`**: Thư mục chứa các tài nguyên tĩnh như hình ảnh nhân vật, vũ khí, nguyên tố và Banners gốc (hàng trăm ảnh lấy từ Fandom Wiki).

## ⚙️ Cách thức hoạt động

1. **Fetching Dữ liệu (GraphQL & Static Data):** 
   Frontend dùng `fetch()` API mặc định của Next.js thông qua file `lib/graphql.ts` gửi POST request tới `http://localhost:4000/graphql` cho danh sách nhân vật/vũ khí. Với Banners và Đội hình, dùng trực tiếp dữ liệu tĩnh (Static JSON) để tối đa hoá tốc độ tải trang.
2. **Đa Ngôn Ngữ (i18n):** 
   Người dùng có thể chuyển đổi ngôn ngữ (Tiếng Anh / Tiếng Việt) tại Navbar. `next-intl` xử lý routing và thay thế nội dung tĩnh thông qua `messages/`.
3. **Thiết Kế (Design System):** 
   Giao diện chú trọng thiết kế tối (Dark Mode) `#07070a`, kết hợp màu sắc nhận diện nguyên tố Genshin và kỹ thuật kính mờ `backdrop-blur` cho một UI thực sự cao cấp.
