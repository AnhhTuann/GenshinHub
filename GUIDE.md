# 📖 GenshinHub — Hướng Dẫn Sử Dụng & Phát Triển

> **GenshinHub** là nền tảng bách khoa toàn thư Genshin Impact với đầy đủ thông tin nhân vật, build, tier list và lịch sử banner. Hướng dẫn này dành cho **developer / admin** quản lý và phát triển dự án.

---

## 📋 Mục Lục

1. [Cấu Trúc Dự Án](#1-cấu-trúc-dự-án)
2. [Cài Đặt & Khởi Chạy](#2-cài-đặt--khởi-chạy)
3. [Quản Lý Dữ Liệu Nhân Vật](#3-quản-lý-dữ-liệu-nhân-vật)
4. [Quản Lý Assets (Hình Ảnh)](#4-quản-lý-assets-hình-ảnh)
5. [Scripts Tự Động Hóa](#5-scripts-tự-động-hóa)
6. [Seed Database](#6-seed-database)
7. [Admin Panel](#7-admin-panel)
8. [Backup & Restore](#8-backup--restore)
9. [Triển Khai (Deployment)](#9-triển-khai-deployment)
10. [Workflow Thêm Nhân Vật Mới](#10-workflow-thêm-nhân-vật-mới)
11. [Xử Lý Lỗi Thường Gặp](#11-xử-lý-lỗi-thường-gặp)

---

## 1. Cấu Trúc Dự Án

```
GenshinHub/
├── frontend/               # Next.js 15 + React 19 + TailwindCSS 4 + next-intl@3.25
│   ├── public/
│   │   └── assets/
│   │       ├── characters/     # Ảnh nhân vật (per-folder)
│   │       │   └── iansan/
│   │       │       ├── avatar.webp   # Icon nhân vật
│   │       │       └── splash.webp  # Splash art
│   │       ├── weapons/        # Icon vũ khí
│   │       ├── artifacts/      # Icon thánh di vật
│   │       └── items/          # Icon nguyên liệu
│   └── src/
│       ├── app/               # Next.js App Router
│       ├── components/        # React components
│       └── ...
│
├── backend/                # Apollo GraphQL + Express + Prisma
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   ├── seed.ts            # Entry point seed
│   │   └── seeds/
│   │       ├── characters.ts  # Danh sách + logic seed nhân vật
│   │       └── characters/    # Thư mục data từng nhân vật
│   │           ├── iansan/
│   │           │   ├── index.ts    # Export tổng hợp
│   │           │   ├── profile.ts  # Tier, role, recommendedC
│   │           │   ├── stats.ts    # Chỉ số theo cấp độ
│   │           │   ├── build.ts    # Weapon & artifact recommendations
│   │           │   └── teams.ts    # Meta teams
│   │           └── ...
│   ├── src/
│   │   ├── index.ts           # Server entry point
│   │   ├── schema/            # GraphQL schema & resolvers
│   │   └── ...
│   ├── .env                   # Biến môi trường (DATABASE_URL, GEMINI_API_KEY...)
│   └── backups/               # File backup JSON
│
├── scripts/                # Scripts tiện ích (root level)
│   ├── download_assets.mjs    # Tải và chuyển đổi ảnh từ Enka
│   └── sync_character_data.mjs # Tạo seed data cho nhân vật mới
│
├── docs/                   # Tài liệu bổ sung
├── package.json            # Root scripts
└── README.md
```

---

## 2. Cài Đặt & Khởi Chạy

### Yêu Cầu Hệ Thống
- **Node.js** ≥ 18
- **Docker** (để chạy PostgreSQL local)
- **Git**

### Bước 1 — Clone & Cài Dependencies

```bash
git clone <repo-url>
cd GenshinHub

# Cài root dependencies (sharp, script tools)
npm install

# Cài backend dependencies
cd backend
npm install

# Cài frontend dependencies
cd ../frontend
npm install
```

### Bước 2 — Cấu Hình Môi Trường

Tạo file `backend/.env` từ mẫu:

```bash
cd backend
cp .env.example .env
```

Chỉnh sửa `.env`:

```env
DATABASE_URL="postgresql://postgres:postgrespassword@localhost:5433/genshinhub"
GEMINI_API_KEY="your_gemini_api_key_here"
ADMIN_PASSWORD="your_admin_password_here"
```

### Bước 3 — Khởi Động Database

```bash
cd backend
docker-compose up -d
```

> Database sẽ chạy ở port `5433`. Kiểm tra bằng: `docker ps`

### Bước 4 — Khởi Tạo Database Schema

```bash
cd backend
npx prisma db push        # Tạo tables từ schema.prisma
```

### Bước 5 — Seed Dữ Liệu

```bash
cd backend
npm run seed              # Nạp toàn bộ dữ liệu (~125 nhân vật)
```

> ⚠️ Quá trình seed mất **10-30 phút** do có gọi API Yatta để lấy mô tả tiếng Việt.

### Bước 6 — Chạy Development Server

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# → http://localhost:4000/graphql
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# → http://localhost:3000
```

---

## 3. Quản Lý Dữ Liệu Nhân Vật

### Cấu Trúc File Seed

Mỗi nhân vật có thư mục riêng trong `backend/prisma/seeds/characters/<id>/`:

#### `profile.ts` — Thông tin tier và role
```typescript
export const profile = {
  characterId: 'iansan',
  tier: 'A',                    // S, A, B, C
  role: 'Sub DPS',              // Main DPS, Sub DPS, Support, Healer, Shield
  recommendedC: 'C0',           // C0, C1, C2, C6
  tierNoteEn: ['Strong in Overvaporize teams'],
  tierNoteVi: ['Mạnh trong đội Overvaporize']
};
```

#### `build.ts` — Vũ khí & thánh di vật gợi ý
```typescript
export const build = {
  talentPriority: ['Elemental Burst', 'Elemental Skill', 'Normal Attack'],
  sands: ['ATK%'],
  goblet: ['Electro DMG Bonus'],
  circlet: ['CRIT Rate'],
  subStatsPriority: ['CRIT Rate', 'CRIT DMG', 'ATK%', 'Energy Recharge'],
  signatureWeapons: [],
  bestWeapons: [
    {
      rank: 5,
      nameVi: 'Hắc Nham Kiếm',
      nameEn: 'Aquila Favonia',
      subStat: 'Tấn Công%',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Mô tả passive...',
      passiveDescEn: 'Passive description...',
      iconUrl: '/assets/weapons/UI_EquipIcon_Sword_xxx.webp'
    }
  ],
  bestArtifacts: [
    {
      setNameVi: 'Thơ Ca Chiến Binh Ngọn Lửa',
      setNameEn: 'Crimson Witch of Flames',
      pieces: 4
    }
  ]
};
```

#### `stats.ts` — Chỉ số theo cấp độ (14 mốc)
```typescript
export const stats = [
  { level: 'Lv.1',  ascend: 0, baseHp: 1000, baseAtk: 25,  baseDef: 60,  specialStatName: 'ATK', specialStatValue: '0.0%' },
  { level: 'Lv.90', ascend: 6, baseHp: 11500, baseAtk: 277, baseDef: 690, specialStatName: 'ATK', specialStatValue: '24.0%' },
  // ... 12 mốc khác
];
```

#### `teams.ts` — Đội hình meta
```typescript
export const teams = [
  {
    name: 'Hyperbloom Team',
    rank: 1,
    description: 'Đội hình mạnh nhất hiện tại...',
    members: [
      {
        characterId: 'iansan',
        role: 'Main DPS',
        roleDesc: 'Gây sát thương chính...',
        weapons: ['catalyst-name'],
        artifacts: ['thundering-fury'],
        substats: ['CRIT Rate', 'CRIT DMG']
      }
      // ... 3 thành viên khác
    ]
  }
];
```

#### `index.ts` — Export tổng hợp
```typescript
import { profile } from './profile';
import { stats } from './stats';
import { build } from './build';
import { teams } from './teams';

export const iansan = { ...profile, stats, ...build, teams };
```

---

## 4. Quản Lý Assets (Hình Ảnh)

### Cấu Trúc Thư Mục Ảnh

```
frontend/public/assets/characters/
├── Iansan/
│   ├── avatar.webp     # 256x256, chất lượng 90
│   └── splash.webp     # Full art, chất lượng 90
├── YumemizukiMizuki/   # Tên folder = Enka folder name (không dấu cách)
│   ├── avatar.webp
│   └── splash.webp
└── ...
```

> ⚠️ **Quan trọng:** Tên folder nhân vật phải khớp với Enka API name (xem bảng mapping bên dưới).

### Bảng Mapping Tên Đặc Biệt

| Tên trong Game | Folder Assets | Ghi Chú |
|---|---|---|
| Yumemizuki Mizuki | `YumemizukiMizuki` | Ghép liền không dấu cách |
| Raiden Shogun | `Shougun` | Tên Enka khác |
| Hu Tao | `Hutao` | Ghép liền |
| Kamisato Ayaka | `Ayaka` | Chỉ lấy tên |
| Lan Yan | `Lanyan` | Ghép liền |
| Skirk | `SkirkNew` | Phiên bản mới |
| Kirara | `Momoka` | Tên JP |
| Amber | `Ambor` | Tên Enka cũ |
| Traveler (Male) | `PlayerBoy` | |
| Traveler (Female) | `PlayerGirl` | |

---

## 5. Scripts Tự Động Hóa

### `npm run download-assets` — Tải Ảnh Từ Enka

```bash
# Từ thư mục root:
npm run download-assets
```

Script sẽ:
- Kiểm tra 236+ ảnh từ Enka Network API
- **Skip** ảnh đã tồn tại (không tải lại)
- Chuyển đổi PNG → WebP (quality 90)
- Lưu vào đúng folder theo cấu trúc `/assets/characters/<Name>/`

```
Found 236 images to check/download.
Progress: 0 downloaded, 50 skipped, 59/236 checked
✅ Asset sync completed!
```

### `npm run sync-data` — Tạo Data Cho Nhân Vật Mới

```bash
# Từ thư mục root:
npm run sync-data
```

Script sẽ:
- Đọc danh sách nhân vật từ `characters.ts`
- Phát hiện nhân vật chưa có thư mục seed
- Tạo tự động các file template (`profile.ts`, `stats.ts`, `build.ts`, `teams.ts`, `index.ts`)
- **Skip** nhân vật đã có data (an toàn để chạy nhiều lần)

```
🔍 Parsing characters from characters.ts...
   Found 125 characters in seed list.
🆕 New character: Dahlia (id: dahlia, Hydro Sword 4★)
   📁 Created seed directory: dahlia/
✅ Sync complete!
   - New seed data created: 1
```

---

## 6. Seed Database

### Seed Toàn Bộ (Full Seed)

```bash
cd backend
npm run seed
```

> Xoá toàn bộ DB cũ và nạp lại từ đầu. Dùng khi setup lần đầu hoặc reset dữ liệu.

### Seed Một Nhân Vật (Không Xoá DB)

**PowerShell (Windows):**
```powershell
cd backend
$env:SEED_CHARACTER="iansan"; npm run seed
```

**CMD (Windows):**
```cmd
cd backend
set SEED_CHARACTER=iansan && npm run seed
```

**macOS/Linux:**
```bash
cd backend
SEED_CHARACTER=iansan npm run seed
```

> `iansan` là `characterId` (xem trong folder `backend/prisma/seeds/characters/`).

### Danh Sách Character ID Thường Dùng

| Nhân Vật | Character ID |
|---|---|
| Yumemizuki Mizuki | `yumemizu` |
| Kaedehara Kazuha | `kaedehara-kazuha` |
| Raiden Shogun | `raiden-shogun` |
| Hu Tao | `hu-tao` |
| Traveler (Pyro) | `traveler-pyro` |
| Traveler (Hydro) | `traveler-hydro` |
| Lan Yan | `lanyan` |

---

## 7. Admin Panel

Truy cập tại: `http://localhost:3000/admin` (cần đăng nhập với `ADMIN_PASSWORD`).

### Các Chức Năng Chính

| Tab | Chức Năng |
|---|---|
| **Tier List** | Kéo thả nhân vật để thay đổi tier S/A/B/C |
| **Characters** | Sửa thông tin, weapons, artifacts, teams |
| **Materials** | Đồng bộ nguyên liệu từ Yatta API |
| **Export/Import** | Backup và restore toàn bộ database |

### AI Generator (Tạo Nhanh Bằng AI)

1. Vào **Admin → Characters**
2. Chọn nhân vật cần generate
3. Bấm **"Generate with AI"**
4. AI (Gemini Flash) sẽ tự điền: mô tả, tier, role, vũ khí gợi ý, chỉ số ưu tiên

### Shortcut Tìm Kiếm Nhanh

Nhấn `Ctrl + K` (hoặc `Cmd + K` trên Mac) ở **bất kỳ trang nào** để mở Command Palette.

---

## 8. Backup & Restore

### Tạo Backup

**Cách 1 — Qua Admin Panel:**
- Admin → Export/Backup → **"Create Full JSON Backup"**
- File lưu tại `backend/backups/backup_YYYY-MM-DD.json`

**Cách 2 — Qua Terminal:**
```bash
cd backend
npm run export
```

> Hệ thống tự giữ tối đa **10 bản backup mới nhất**, các bản cũ hơn tự động xóa.

### Restore Từ Backup

```bash
# Xem danh sách backup có sẵn
ls backend/backups/

# Restore qua API
curl -X POST http://localhost:4000/admin/restore \
  -F "file=@backend/backups/backup_2025-01-01.json" \
  -H "Authorization: Bearer YOUR_ADMIN_PASSWORD"
```

> ⚠️ **Cảnh báo:** Restore sẽ **ghi đè toàn bộ** database hiện tại!

### Sync Nguyên Liệu (Materials)

Khi có nhân vật mới hoặc icon hiển thị `NO ICON`:

1. Vào **Admin → Materials**
2. Bấm **"Sync All Materials from API"**

Hoặc dùng terminal:
```bash
cd backend
npx ts-node fix_materials.ts
```

> ⚠️ Không bấm nhiều lần liên tục để tránh bị Yatta API block IP.

---

## 9. Triển Khai (Deployment)

### Các Dịch Vụ Đang Dùng

| Component | Dịch Vụ | URL |
|---|---|---|
| Frontend | Vercel | https://genshin-hub-rho.vercel.app |
| Backend API | Render | https://genshinhub.onrender.com/graphql |
| Database | Neon PostgreSQL | (Serverless) |

### Deploy Backend Lên Render

1. Push code lên GitHub
2. Render tự động detect `Dockerfile` trong `backend/`
3. Cài biến môi trường trong Render Dashboard:
   - `DATABASE_URL` — Neon connection string
   - `GEMINI_API_KEY` — Google AI Studio key
   - `ADMIN_PASSWORD` — Mật khẩu admin

### Deploy Frontend Lên Vercel

```bash
cd frontend
vercel --prod
```

Hoặc kết nối GitHub repo với Vercel, mỗi lần push sẽ tự động deploy.

> **Lưu ý:** Khi build frontend, Next.js cần gọi API để SSG. Set biến:
> `NEXT_PUBLIC_GRAPHQL_URL=https://genshinhub.onrender.com/graphql`

### Docker (Self-host)

```bash
# Backend
cd backend
docker-compose up -d          # Khởi động PostgreSQL
docker build -t genshinhub-backend .
docker run -p 4000:4000 \
  -e DATABASE_URL="postgresql://..." \
  genshinhub-backend

# Frontend
cd frontend
docker build -t genshinhub-frontend .
docker run -p 3000:3000 genshinhub-frontend
```

---

## 10. Workflow Thêm Nhân Vật Mới

Khi Genshin Impact ra nhân vật mới (vd: `Dahlia`), làm theo thứ tự:

### Bước 1 — Thêm Vào Danh Sách Characters

Mở `backend/prisma/seeds/characters.ts`, tìm mảng `charactersData`, thêm dòng:

```typescript
"Dahlia|Hydro|Sword|4",
```

Format: `"<TênGame>|<Nguyên Tố>|<Vũ Khí>|<Độ Hiếm>"`

### Bước 2 — Chạy Sync Data

```bash
# Từ thư mục root:
npm run sync-data
```

Script tự tạo thư mục `backend/prisma/seeds/characters/dahlia/` với 5 file template.

### Bước 3 — Tải Ảnh

```bash
# Thêm vào ALL_CHARACTERS trong scripts/download_assets.mjs nếu chưa có:
# "Dahlia" (Enka folder name)

npm run download-assets
```

Ảnh sẽ được tải về `frontend/public/assets/characters/Dahlia/`.

### Bước 4 — Điền Thông Tin Chi Tiết

Chỉnh sửa các file trong `backend/prisma/seeds/characters/dahlia/`:

- `profile.ts` → Cập nhật tier, role thực tế
- `build.ts` → Điền weapon và artifact recommendations thực tế
- `stats.ts` → Điền chỉ số từ game/wiki
- `teams.ts` → Xây dựng meta teams

### Bước 5 — Seed Nhân Vật Vào Database

```powershell
cd backend
$env:SEED_CHARACTER="dahlia"; npm run seed
```

### Bước 6 — Kiểm Tra

Mở `http://localhost:3000/characters/dahlia` để xem kết quả.

---

## 11. Xử Lý Lỗi Thường Gặp

### ❌ `Cannot find module './characters/xxx'`

**Nguyên nhân:** File `characters.ts` đang import một character folder chưa tồn tại.

**Fix:**
```bash
npm run sync-data    # Tạo folder còn thiếu
```

---

### ❌ Ảnh không hiển thị, báo 404

**Nguyên nhân 1:** Tên folder trong Enka name map sai.

**Fix:** Kiểm tra `backend/prisma/seeds/characters.ts`, đảm bảo có mapping đúng:
```typescript
"Yumemizuki Mizuki": "YumemizukiMizuki",  // Folder: YumemizukiMizuki/
```

**Nguyên nhân 2:** Ảnh chưa được tải về.

**Fix:**
```bash
npm run download-assets
```

---

### ❌ Seed chạy nhưng nhân vật không có tier/build

**Nguyên nhân:** File `profile.ts` hoặc `build.ts` trống (template mặc định).

**Fix:** Điền thông tin thủ công vào các file trong `backend/prisma/seeds/characters/<id>/`, sau đó re-seed:
```powershell
$env:SEED_CHARACTER="<id>"; npm run seed
```

---

### ❌ `Unauthorized` khi gọi Admin API

**Fix:** Đảm bảo `ADMIN_PASSWORD` trong `.env` khớp với password đang dùng.

---

### ❌ Database lỗi `relation does not exist`

**Nguyên nhân:** Schema chưa được push lên database.

**Fix:**
```bash
cd backend
npx prisma db push
```

---

### ❌ Download assets lỗi ENOENT với path rất dài

**Nguyên nhân cũ (đã fix):** Script cũ đọc `.tsbuildinfo` và match regex sai → URL rác.

**Trạng thái:** Đã được fix trong `scripts/download_assets.mjs`. Nếu gặp lại, kiểm tra xem có file `.ts` nào > 100KB trong `backend/prisma/seeds/` không.

---

## 📌 Tài Liệu Bổ Sung

| Tài Liệu | Mô Tả |
|---|---|
| [docs/characters.md](./docs/characters.md) | Schema chi tiết của Characters |
| [docs/weapons.md](./docs/weapons.md) | Cấu trúc dữ liệu Weapons |
| [docs/artifacts.md](./docs/artifacts.md) | Cấu trúc Artifacts |
| [docs/materials.md](./docs/materials.md) | Hướng dẫn sync Materials |
| [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) | Hướng dẫn Admin Panel chi tiết |
| [GRAPHQL_GUIDE.md](./GRAPHQL_GUIDE.md) | Tài liệu GraphQL API |
| [backend/README.md](./backend/README.md) | Hướng dẫn riêng của Backend |

---

*Cập nhật lần cuối: 2026-07-07 | GenshinHub v2.0*
