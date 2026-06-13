# 📚 GenshinHub — Docs & Reference

Thư mục này chứa các tài liệu tham chiếu cho việc phát triển GenshinHub.

## 📁 Danh sách file

| File | Mô tả |
|---|---|
| [characters.md](./characters.md) | Mapping `UI_AvatarIcon_*.png` → Tên nhân vật EN/VN |
| [splashart.md](./splashart.md) | Mapping `UI_Gacha_AvatarImg_*.png` → Tên nhân vật EN/VN |
| [weapons.md](./weapons.md) | Mapping `UI_EquipIcon_*.png` → Tên vũ khí EN/VN |
| [artifacts.md](./artifacts.md) | Mapping `UI_RelicIcon_*.png` → Tên bộ thánh di vật EN/VN |
| [materials.md](./materials.md) | Mapping `UI_ItemIcon_*.png` → Tên nguyên liệu EN/VN |

---

## ⚡ Khi thêm nhân vật mới

1. **Download ảnh** về đúng thư mục:
   - Avatar → `frontend/public/images/avatars/UI_AvatarIcon_[Key].png`
   - Splash → `frontend/public/images/splash/UI_Gacha_AvatarImg_[Key].png`

2. **Tra cứu tên** trong `characters.md` — đặc biệt chú ý các tên dễ nhầm (Qin=Jean, Feiyan=Yanfei...)

3. **Thêm vào DB** qua backend API hoặc seed script

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
