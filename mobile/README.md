# GenshinHub - Mobile App 📱

Đây là thư mục chứa mã nguồn ứng dụng di động của **GenshinHub**, được phát triển đa nền tảng (iOS & Android) bằng hệ sinh thái React Native và Expo. Ứng dụng là một phiên bản "1:1 Feature Parity" hoàn chỉnh so với Frontend Web, mang lại trải nghiệm mượt mà, tốc độ cao và thiết kế Dark Mode cao cấp.

## 📦 Các Packages đã sử dụng và Công dụng

| Package | Phiên bản | Công dụng |
| :--- | :--- | :--- |
| **Expo** | `~56.x` | Framework lõi xây dựng React Native app, quản lý môi trường, build quá trình và các thư viện native. |
| **Expo Router** | `~56.x` | Xử lý điều hướng (Navigation) bằng hệ thống File-based Routing tương tự App Router của Next.js, cực kỳ phù hợp để đồng bộ luồng từ web sang app. |
| **NativeWind** | `^4.x` | Trình biên dịch Tailwind CSS cho React Native. Tận dụng lại 100% logic UI/UX và các class màu sắc từ bản Web. |
| **React Native** | `0.85.x` | Nền tảng cốt lõi phát triển giao diện thiết bị di động. |
| **i18next & react-i18next** | `^26.x` | Xử lý đa ngôn ngữ (Tiếng Anh/Tiếng Việt) cho ứng dụng di động, đồng bộ tệp `messages` với Frontend. |
| **lucide-react-native** | `^1.x` | Thư viện SVG icon nhẹ, đồng bộ thiết kế với bản Web. |

## 📂 Cấu trúc thư mục (Directory Structure)

- **`src/app/`**: Chứa các file và thư mục điều hướng chính của Expo Router.
  - **`(tabs)/`**: Khu vực chứa cấu trúc Bottom Tab Navigation (Home, Characters, Weapons, Artifacts, More).
  - **`characters/`, `weapons/`, `artifacts/`**: Các Nested Stacks dùng để hiển thị trang chi tiết khi người dùng nhấn vào danh sách.
  - **`banners.tsx`, `tcg.tsx`, `teams.tsx`**: Các tính năng mở rộng kết nối trực tiếp từ Tab More.
- **`src/lib/`**: Chứa các file cấu hình và kết nối.
  - **`graphql.ts`**: Lớp tiện ích gửi các GraphQL query tới Backend (`10.0.2.2` trên Android hoặc `localhost` trên iOS/Web).
  - **`i18n.ts`**: Cấu hình khởi tạo đa ngôn ngữ.
- **`src/data/`**: Chứa dữ liệu tĩnh được copy 1:1 từ bản Web (như danh sách Banners, bộ bài TCG) giúp tăng hiệu suất.
- **`src/messages/`**: File JSON chứa các từ khóa dịch thuật Anh-Việt.

## ⚙️ Cách thức hoạt động

1. **Fetching Dữ liệu (GraphQL & Fetch):** 
   Tương tự web, Mobile App sử dụng hàm `fetchGraphQL` tuỳ chỉnh để lấy dữ liệu từ `localhost:4000/graphql`. Hàm này có cơ chế tự động chuyển IP thành `10.0.2.2` nếu phát hiện đang chạy trên máy ảo Android (Android Emulator).
2. **Hệ Thống Đa Ngôn Ngữ (i18n):** 
   Tích hợp sâu `useTranslation` hook tại các màn hình và cấu trúc Tab Bar. Cấu hình được đặt mặc định là tiếng Anh (en) và có thể chuyển đổi mượt mà qua nút bấm trong ứng dụng.
3. **Thiết Kế (Design System):** 
   Dự án sử dụng cơ chế Import CSS toàn cục (`global.css`) vào root file `_layout.tsx` thông qua NativeWind. Các style và màu sắc như `#cfa858` (gold) hay `#050508` (dark background) đều được tuân thủ chặt chẽ.

## 🚀 Hướng dẫn chạy dự án

1. Đảm bảo bạn đã cài đặt các công cụ phát triển React Native (Android Studio / Xcode).
2. Mở terminal, vào thư mục `mobile` và chạy `npm install` (nếu chưa cài đặt package).
3. Sử dụng lệnh khởi chạy server:
   ```bash
   npm run start
   ```
4. Bấm `a` để mở trên giả lập Android, `i` để mở trên giả lập iOS, hoặc dùng app Expo Go quét mã QR trên điện thoại thật.
