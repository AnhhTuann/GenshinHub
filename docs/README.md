# 📚 GenshinHub — Docs & Reference

Thư mục này chứa các tài liệu tham chiếu cho việc phát triển GenshinHub.

## 📁 Danh sách file

| File | Mô tả |
|---|---|
| [characters.md](./characters.md) | Mapping `UI_AvatarIcon_*.png` → Tên nhân vật EN/VN + folder assets |
| [splashart.md](./splashart.md) | Mapping `UI_Gacha_AvatarImg_*.png` → Tên nhân vật EN/VN |
| [weapons.md](./weapons.md) | Mapping `UI_EquipIcon_*.png` → Tên vũ khí EN/VN |
| [artifacts.md](./artifacts.md) | Mapping `UI_RelicIcon_*.png` → Tên bộ thánh di vật EN/VN |
| [materials.md](./materials.md) | Mapping `UI_ItemIcon_*.png` → Tên nguyên liệu EN/VN |
| [signature_weapons.md](./signature_weapons.md) | Danh sách nhân vật 5★ và vũ khí trấn |
| [Hybrid-Auto-Sync.md](./Hybrid-Auto-Sync.md) | Kiến trúc Hybrid Auto-Sync tài nguyên & Fallback 3 tầng |

---

## 📂 Cấu trúc thư mục ảnh nhân vật

```
frontend/public/assets/characters/
├── Hutao/
│   ├── avatar.webp     # Icon nhân vật (256x256)
│   └── splash.webp     # Splash art full size
├── Kazuha/
│   ├── avatar.webp
│   └── splash.webp
└── ...
```

> **Quan trọng:** Tên folder dạng **PascalCase, không dấu cách** (Hutao, Kazuha, Albedo...).  
> Để lấy đường dẫn ảnh, dùng hàm trong [`utils/assetMap.ts`](../frontend/utils/assetMap.ts):
> ```ts
> getCharacterAvatar('hu-tao')   // → /assets/characters/Hutao/avatar.webp
> getCharacterSplash('hu-tao')   // → /assets/characters/Hutao/splash.webp
> ```

---

## ⚡ Khi thêm nhân vật mới

1. **Download ảnh** về đúng thư mục:
   - Chạy từ root: `npm run download-assets`
   - Ảnh sẽ lưu tại `frontend/public/assets/characters/<FolderName>/avatar.webp` và `splash.webp`

2. **Tra cứu tên folder** trong `characters.md` — đặc biệt chú ý các tên dễ nhầm (Qin=Jean, Feiyan=Yanfei...)

3. **Thêm vào DB** qua Admin Panel hoặc seed script:
   ```powershell
   cd backend
   $env:SEED_CHARACTER="<character-id>"; npm run seed
   ```

4. **Cache sẽ tự invalidate** — Next.js ISR revalidate mỗi 3600s (1 tiếng)

---

## 🔄 Cache Invalidation

GenshinHub dùng **Next.js ISR (Incremental Static Regeneration)**:

```
revalidate: 3600  // 1 tiếng tự refresh
```

Để force refresh ngay lập tức:
```bash
# Restart dev server
Ctrl+C và npm run dev lại

# Hoặc gọi revalidate endpoint (nếu có cài)
curl -X POST http://localhost:3000/api/revalidate?tag=characters
```
