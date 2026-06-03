# TeyvatDB - Frontend 🎨

Đây là thư mục chứa mã nguồn giao diện người dùng của **TeyvatDB**, được phát triển dựa trên các công nghệ web hiện đại nhất để đảm bảo hiệu suất (Performance), tối ưu SEO và mang lại trải nghiệm tương tác mượt mà.

## 📦 Các Packages đã sử dụng và Công dụng

| Package | Phiên bản | Công dụng |
| :--- | :--- | :--- |
| **Next.js** | `15.x` | Framework React chính, sử dụng App Router, Server Components và Server Actions để SSR/SSG giúp tối ưu SEO và tốc độ tải trang. |
| **TailwindCSS** | `4.x` | Utility-first CSS framework để style giao diện trực tiếp trên class, giúp thiết kế nhanh và dễ dàng tạo các hiệu ứng Glassmorphism, Dark mode. |
| **motion** | `12.x` | Thư viện tạo animation (hiệu ứng chuyển động) cho các component (như danh sách nhân vật, modal, hiệu ứng hover) giúp UI sinh động hơn. |
| **lucide-react** | `0.553.x` | Bộ icon SVG nhẹ và sắc nét để dùng cho các nút bấm, thanh điều hướng và nhãn thông tin. |
| **clsx & tailwind-merge** | `2.x / 3.x` | Tiện ích giúp nối các chuỗi class Tailwind một cách thông minh, tránh xung đột CSS khi viết các Component có thể tái sử dụng. |
| **@google/genai** | `2.4.x` | Tích hợp Gemini AI (nếu có) để tạo các tính năng thông minh như chatbot gợi ý đội hình, tóm tắt tiểu sử nhân vật. |

## 📂 Cấu trúc thư mục (Directory Structure)

- **`app/`**: Chứa các trang (Pages) của Next.js App Router (như `page.tsx`, `layout.tsx`).
- **`components/`**: Chứa các UI Components độc lập và có thể tái sử dụng (như `CharacterGallery`, `Card`, `Navbar`).
- **`lib/`**: Chứa các hàm tiện ích, cấu hình kết nối API. Nổi bật là file `graphql.ts` chịu trách nhiệm gọi API GraphQL tới Backend.
- **`types/`**: Chứa định nghĩa kiểu dữ liệu (TypeScript Interfaces) để đảm bảo an toàn kiểu (Type-safe) khi code.

## ⚙️ Cách thức hoạt động

1. **Fetching Dữ liệu (GraphQL):** 
   Frontend không sử dụng Apollo Client cồng kềnh mà dùng trực tiếp `fetch()` API mặc định của Next.js thông qua file `lib/graphql.ts`. Lệnh fetch gọi POST request tới endpoint `http://localhost:4000/graphql`.
2. **Caching (Lưu bộ đệm):** 
   Dữ liệu trả về được Next.js cache tĩnh theo cơ chế ISR (`next: { revalidate: 60 }`). Nghĩa là cứ mỗi 60 giây, nếu có thay đổi từ DB, Next.js mới tải lại dữ liệu mới, giúp giảm tải cực lớn cho Backend và trang web tải ngay lập tức.
3. **Hiển thị (Rendering):** 
   Dữ liệu sau khi lấy được sẽ truyền vào các Server Components để render ra HTML trước khi gửi tới trình duyệt, tối ưu hoàn toàn cho các công cụ tìm kiếm (Google Bot).
