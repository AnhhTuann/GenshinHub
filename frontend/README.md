# TeyvatDB - Frontend 🎨

Đây là thư mục chứa mã nguồn giao diện người dùng của **TeyvatDB**, được phát triển dựa trên các công nghệ web hiện đại để đảm bảo hiệu suất (Performance), tối ưu SEO và mang lại trải nghiệm tương tác mượt mà.

## 📦 Các Packages đã sử dụng và Công dụng

| Package | Phiên bản | Công dụng |
| :--- | :--- | :--- |
| **Next.js** | `15.x` | Framework React chính, sử dụng App Router, Server Components để tối ưu hiệu suất và SEO. |
| **React & React DOM** | `19.x` | Thư viện cốt lõi xây dựng giao diện người dùng. |
| **TailwindCSS** | `4.x` | Utility-first CSS framework để style giao diện, hỗ trợ tích hợp sâu qua `@tailwindcss/postcss`. |
| **tw-animate-css** | `1.4.x` | Thư viện hỗ trợ tạo các hiệu ứng chuyển động (animations) phong phú dựa trên Tailwind. |
| **class-variance-authority** | `0.7.x` | Tiện ích (CVA) hỗ trợ quản lý các trạng thái (variants) của UI component một cách an toàn và gọn gàng. |
| **@hookform/resolvers** | `5.2.x` | Tích hợp xác thực dữ liệu (validation) cho form. |

## 📂 Cấu trúc thư mục (Directory Structure)

- **`app/`**: Chứa các trang (Pages) của Next.js App Router (như `page.tsx`, `layout.tsx`).
- **`components/`**: (Nếu có) Chứa các UI Components độc lập và có thể tái sử dụng.
- **`lib/`**: Chứa các hàm tiện ích, cấu hình kết nối API. Nổi bật là file `graphql.ts` chịu trách nhiệm gọi API GraphQL tới Backend.
- **`public/`**: Thư mục chứa các tài nguyên tĩnh như hình ảnh, biểu tượng.

## ⚙️ Cách thức hoạt động

1. **Fetching Dữ liệu (GraphQL):** 
   Frontend dùng `fetch()` API mặc định của Next.js thông qua file `lib/graphql.ts` gửi POST request tới `http://localhost:4000/graphql`.
2. **Caching (Lưu bộ đệm):** 
   Dữ liệu có thể được Next.js cache tĩnh để giảm tải cho Backend và tăng tốc độ tải trang.
3. **Hiển thị (Rendering):** 
   Sử dụng Server Components để render sẵn HTML từ phía server, thân thiện với các công cụ tìm kiếm và cải thiện hiệu suất.
