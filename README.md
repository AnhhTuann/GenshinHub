# GenshinHub - Genshin Impact Wiki & Tracker 🌟

**GenshinHub** là một nền tảng cơ sở dữ liệu và bách khoa toàn thư toàn diện dành cho game Genshin Impact. Dự án cung cấp thông tin chi tiết về hệ thống nhân vật, vũ khí, thánh di vật, và nguyên liệu nâng cấp, đồng thời hỗ trợ tra cứu các đội hình (teams), bảng xếp hạng (tier list) và hướng dẫn build (artifacts & weapons) tối ưu nhất cho từng nhân vật. Đặc biệt là kho lưu trữ lịch sử các phiên bản Banners chi tiết và đầy đủ nhất bằng hình ảnh gốc chất lượng cao.

## 🎯 Mục đích và Công dụng
- **Tra cứu Bách Khoa Toàn Thư:** Xem chi tiết về cốt truyện, hình ảnh, thông số (level 90) và kỹ năng của mọi nhân vật trong Genshin Impact.
- **Hướng dẫn Build & Meta:** Gợi ý cách lên đồ, ưu tiên kỹ năng, cách xếp đội hình mạnh nhất cho từng nhân vật, kèm theo Tier List các đội hình mạnh nhất hiện nay.
- **Lịch Sử Banners:** Kho lưu trữ toàn bộ các phiên bản Banners từ 1.0 đến phiên bản mới nhất (sử dụng Wide Banners gốc) phân tách rõ ràng theo Phase 1 & 2.
- **Admin Dashboard (Mới):** Cung cấp giao diện quản trị trực quan, cho phép:
  - Generate thông tin nhân vật nhanh chóng bằng AI (Gemini Flash).
  - Kéo và thả (Drag & Drop) để điều chỉnh meta/tier list.
  - Tự động lấy icon và nguyên liệu nâng cấp từ Yatta API (1,000+ items).
  - Quản lý Full Backup/Restore dưới dạng file `.json`.
- **UI/UX Đỉnh cao:** Giao diện tối màu (Dark Mode) kết hợp hiệu ứng kính mờ (Glassmorphism), Command Palette tìm kiếm nhanh chóng, hỗ trợ đa ngôn ngữ (i18n).

## 🏗️ Cấu trúc Dự án
Dự án được phát triển theo mô hình Client-Server (Monorepo), bao gồm:
- **[frontend/](./frontend/)**: Giao diện người dùng được xây dựng bằng **Next.js 15**, **React 19**, **TailwindCSS 4** và **Framer Motion**, tập trung vào trải nghiệm mượt mà, tối ưu SEO.
- **[backend/](./backend/)**: API Server được xây dựng bằng **Apollo Server (GraphQL)**, **Express** và **Prisma (ORM)**, tương tác với cơ sở dữ liệu **PostgreSQL**.
- **[scratch/](./scratch/)**: Thư mục chứa các script hỗ trợ scraping dữ liệu tĩnh (ví dụ: cào lịch sử banner từ Fandom Wiki, tự động tải hình ảnh Splash Art, Banners gốc).

---

## 🌍 Live Demo & Triển khai (Deployment)
Dự án đã được triển khai (deploy) hoàn chỉnh lên các dịch vụ đám mây tốt nhất hiện nay để đảm bảo hiệu suất và khả năng mở rộng:
- **Trang web (Frontend):** [GenshinHub trên Vercel](https://genshin-hub-rho.vercel.app) *(Sử dụng tính năng Next.js Static Site Generation cực nhanh)*
- **Máy chủ (Backend API):** [GenshinHub GraphQL API trên Render](https://genshinhub.onrender.com/graphql)
- **Cơ sở dữ liệu (Database):** Triển khai PostgreSQL trên nền tảng **Neon Serverless Postgres** đám mây.

---

## 🚀 Hướng dẫn Cài đặt & Chạy Dự án

### 1. Khởi động Cơ sở dữ liệu (PostgreSQL)
Dự án sử dụng Docker Compose để khởi tạo PostgreSQL nhanh chóng:
```bash
cd backend
docker-compose up -d
```
*(Database sẽ chạy ở port 5433 với thông tin đăng nhập mặc định trong file `.env`)*

### 2. Khởi động Backend (GraphQL API)
Mở terminal và chạy các lệnh sau:
```bash
cd backend
npm install
npx prisma db push   # Khởi tạo các bảng trong Database
npm run dev          # Chạy server ở http://localhost:4000
```

### 3. Nạp dữ liệu mẫu (Seeding)
Dự án hỗ trợ 2 chế độ nạp dữ liệu:
- **Nạp toàn bộ dữ liệu (Full Seed):**
  ```bash
  cd backend
  npm run prisma:seed
  ```
- **Nạp nhanh cho một nhân vật (Single Character Seed):**
  Hữu ích khi bạn chỉ muốn cập nhật hoặc thêm một nhân vật cụ thể mà không muốn xoá toàn bộ cơ sở dữ liệu.
  ```bash
  # Trên CMD (Windows):
  cd backend
  set SEED_CHARACTER=traveler-pyro && npm run prisma:seed

  # Trên Powershell (Windows):
  cd backend
  $env:SEED_CHARACTER="traveler-pyro"; npm run prisma:seed
  ```
  *(Thay `traveler-pyro` bằng `id` nhân vật tương ứng)*

### 4. Khởi động Frontend (Next.js UI)
Mở một terminal khác và chạy:
```bash
cd frontend
npm install
npm run dev          # Chạy frontend ở http://localhost:3000
```

### 5. Khởi động bằng Docker (Dành cho Production/Deployment)
Cả Backend và Frontend đều đã được cấu hình sẵn `Dockerfile` để triển khai thực tế.
- **Backend Docker:**
  ```bash
  cd backend
  docker build -t genshinhub-backend .
  docker run -p 4000:4000 -e DATABASE_URL="postgresql://postgres:postgrespassword@host.docker.internal:5433/genshinhub" genshinhub-backend
  ```
  *(Lưu ý: Bạn cần chạy `docker-compose up -d` trước để có database, và dùng `host.docker.internal` để backend kết nối được tới database trên máy chủ)*

- **Frontend Docker:**
  ```bash
  cd frontend
  # Lưu ý: Khi build Frontend, Next.js sẽ cần gọi API để tạo trang tĩnh (SSG). 
  # Hãy đảm bảo Backend đang chạy hoặc truyền biến môi trường API thực tế vào:
  docker build --build-arg NEXT_PUBLIC_GRAPHQL_URL="http://host.docker.internal:4000/graphql" -t genshinhub-frontend .
  docker run -p 3000:3000 genshinhub-frontend
  ```

---

## 🗄️ Quản lý Cơ sở dữ liệu (Prisma Studio)
Để xem và chỉnh sửa dữ liệu trực quan:
```bash
cd backend
npx prisma studio
```
Truy cập `http://localhost:5555` để thao tác trực tiếp với Database.
