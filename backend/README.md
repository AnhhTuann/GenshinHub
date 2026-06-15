# GenshinHub - Backend ⚙️

Đây là máy chủ API của **GenshinHub**. Backend đóng vai trò làm trung tâm xử lý dữ liệu, giao tiếp với cơ sở dữ liệu PostgreSQL và cung cấp endpoint GraphQL duy nhất cho Frontend. Nó cũng chịu trách nhiệm cào dữ liệu (seeding) từ các nguồn bên ngoài và thiết lập dữ liệu Meta.

## 📦 Các Packages đã sử dụng và Công dụng

| Package | Phiên bản | Công dụng |
| :--- | :--- | :--- |
| **@apollo/server** | `5.5.x` | Xây dựng GraphQL Server. Giúp định nghĩa Schema, Resolvers và cung cấp môi trường chạy API. |
| **graphql** | `16.14.x` | Ngôn ngữ truy vấn chính để định nghĩa kiểu dữ liệu và thao tác. |
| **@prisma/client** | `5.10.x` | ORM (Object-Relational Mapping) tương tác với PostgreSQL qua TypeScript. |
| **express** | `5.2.x` | Web framework tích hợp cùng Apollo Server thông qua `@as-integrations/express5`. |
| **axios** | `1.16.x` | HTTP Client để gọi API ra bên ngoài trong các script cào dữ liệu (seeder). |
| **cors** & **helmet** | Mới nhất | Cấu hình bảo mật HTTP headers và cấp quyền truy cập chéo (CORS). |
| **compression** & **lru-cache** | Mới nhất | Nén dữ liệu trả về và thiết lập bộ nhớ đệm (cache) giúp tăng tốc độ API. |
| **dotenv** | `17.4.x` | Quản lý và tải các biến môi trường từ file `.env`. |
| **nodemon & ts-node** | `3.x / 10.x` | Môi trường phát triển giúp chạy file TypeScript và tự động restart server. |

## 📂 Cấu trúc thư mục (Directory Structure)

- **`prisma/`**: 
  - `schema.prisma`: Nơi định nghĩa toàn bộ cấu trúc bảng của database. Quản lý cả Character, Weapon, Team, TeamMember.
  - `seeds/`: Thư mục chứa các module cào dữ liệu được chia nhỏ (Nhân vật, Vũ khí, Thánh di vật, Nguyên liệu, Đội hình).
    - `characters/`: Chứa các file cấu hình build meta chi tiết của từng nhân vật riêng biệt (ví dụ: `durin.ts`, `hu-tao.ts`, ...).
  - `seed.ts`: File orchestrator tự động chạy tất cả các module seeder.
- **`src/`**: Chứa mã nguồn chính của GraphQL Server.
  - `index.ts`: Điểm khởi chạy của Apollo Server (tích hợp Express), khai báo Schema và Resolvers.
  - `migrateTeams.ts`: File hỗ trợ migrate schema đội hình.
- **`docker-compose.yml`**: Khởi chạy nhanh một container PostgreSQL cục bộ.

## ⚙️ Cách thức hoạt động

1. **Khởi tạo và Kết nối (Prisma):** 
   Server kết nối tới database PostgreSQL qua biến môi trường `DATABASE_URL` nằm trong file `.env`. Prisma Client được sinh tự động dựa trên `schema.prisma`.
2. **GraphQL Endpoint:** 
   Apollo Server (chạy trên nền Express) phơi bày một endpoint duy nhất tại `http://localhost:4000/graphql`.
3. **Seed Data (Thu thập dữ liệu):** 
   Hệ thống có các tập lệnh chạy ngoài luồng (seeder).
   - **Chế độ Full Seed (`npm run prisma:seed`):** Xoá sạch database cũ, tải danh sách từ API `gi.yatta.moe`, đối chiếu với dữ liệu Meta nội bộ tại thư mục `seeds/characters` để chèn lại toàn bộ nhân vật với chỉ số chuẩn xác.
   - **Chế độ Single Character Seed (`SEED_CHARACTER=char_id`):** Chỉ xoá và chèn lại đúng dữ liệu của nhân vật được chỉ định. Bỏ qua việc seed vũ khí, thánh di vật, nguyên liệu để tiết kiệm thời gian và tài nguyên mạng.
