# 🎴 Splash Art — Folder Mapping
> **Lưu ý quan trọng:** Kể từ phiên bản hiện tại, splash art **không còn** lưu ở folder riêng.  
> Mỗi nhân vật có **một folder duy nhất** chứa cả `avatar.webp` và `splash.webp`:
> ```
> frontend/public/assets/characters/<FolderName>/
> ├── avatar.webp   ← Icon nhân vật
> └── splash.webp   ← Splash art / gacha art
> ```

Xem bảng mapping Folder → ID tại [`characters.md`](./characters.md).

---

## 💡 Cách dùng trong code

```ts
import { getCharacterSplash } from '@/utils/assetMap';

// Ví dụ
getCharacterSplash('hu-tao')           // → /assets/characters/Hutao/splash.webp
getCharacterSplash('kaedehara-kazuha') // → /assets/characters/Kazuha/splash.webp
getCharacterSplash('raiden-shogun')    // → /assets/characters/Raidenshogun/splash.webp
```

Hoặc dùng trực tiếp URL từ database (`character.splashArtUrl`) nếu là URL remote.

---

## 📋 Tham chiếu nhanh (Enka Folder → ID DB)

| Folder | ID DB | Tên EN |
|---|---|---|
| `Hutao` | `hu-tao` | Hu Tao |
| `Kazuha` | `kaedehara-kazuha` | Kaedehara Kazuha |
| `Shougun` | `raiden-shogun` | Raiden Shogun |
| `Ayaka` | `kamisato-ayaka` | Kamisato Ayaka |
| `Kokomi` | `sangonomiya-kokomi` | Sangonomiya Kokomi |
| `SkirkNew` | `skirk` | Skirk |
| `YumemizukiMizuki` | `yumemizu` | Yumemizuki Mizuki |
| `Qin` | `jean` | Jean |
| `Feiyan` | `yanfei` | Yanfei |
| `Ambor` | `amber` | Amber |
| `Olorun` | `varesa` | Varesa |

> Danh sách đầy đủ xem tại [characters.md](./characters.md).

---

## 🔄 Lịch sử thay đổi

- **Trước:** Ảnh splash lưu tại `frontend/public/images/splash/UI_Gacha_AvatarImg_<Key>.png`
- **Hiện tại:** Ảnh lưu tại `frontend/public/assets/characters/<FolderName>/splash.webp` (định dạng WebP, đã nén)
