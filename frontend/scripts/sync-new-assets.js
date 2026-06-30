const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Cấu hình Nguồn API (Yatta / Ambr)
// Ambr.top Avatar list: https://api.ambr.top/v2/en/avatar
// Ambr.top Weapon list: https://api.ambr.top/v2/en/weapon
const API_BASE = 'https://api.ambr.top/v2/en';
const ASSETS_DIR = path.join(__dirname, '../public/assets');

async function fetchJson(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(`❌ Lỗi tải dữ liệu từ ${url}:`, error.message);
    return null;
  }
}

async function fetchImageBuffer(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  } catch (error) {
    console.error(`❌ Lỗi tải ảnh từ ${url}:`, error.message);
    return null;
  }
}

function getLocalAssets(folder) {
  const dir = path.join(ASSETS_DIR, folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const files = fs.readdirSync(dir);
  // Trả về Set các tên file không kèm đuôi
  return new Set(files.map(f => path.basename(f, path.extname(f))));
}

async function syncAvatars() {
  console.log('🔄 Bắt đầu đồng bộ Nhân Vật (Avatars)...');
  const data = await fetchJson(`${API_BASE}/avatar`);
  if (!data || !data.data || !data.data.items) return;

  const localAvatars = getLocalAssets('characters');
  let newCount = 0;

  // Lặp qua danh sách ID nhân vật
  for (const charId of Object.keys(data.data.items)) {
    // Tên file lưu trữ ở local theo chuẩn: charId_avatar
    const localName = `${charId}_avatar`;
    
    // Nếu chưa có file này ở local, tiến hành tải và nén
    if (!localAvatars.has(localName)) {
      console.log(`[Avatar] Phát hiện nhân vật mới: ${charId}`);
      // Đường dẫn tĩnh của Ambr: https://api.ambr.top/assets/UI/UI_AvatarIcon_{charId}.png
      const imgUrl = `https://api.ambr.top/assets/UI/UI_AvatarIcon_${charId}.png`;
      const buffer = await fetchImageBuffer(imgUrl);
      
      if (buffer) {
        const outPath = path.join(ASSETS_DIR, 'characters', `${localName}.webp`);
        await sharp(buffer)
          .webp({ quality: 80, effort: 4 })
          .toFile(outPath);
        console.log(`✅ Đã tải và nén: ${localName}.webp`);
        newCount++;
      }
    }
  }
  console.log(`✨ Hoàn tất đồng bộ Nhân vật. Tải mới: ${newCount} ảnh.\n`);
}

async function syncWeapons() {
  console.log('🔄 Bắt đầu đồng bộ Vũ khí (Weapons)...');
  const data = await fetchJson(`${API_BASE}/weapon`);
  if (!data || !data.data || !data.data.items) return;

  const localWeapons = getLocalAssets('weapons');
  let newCount = 0;

  for (const weaponId of Object.keys(data.data.items)) {
    // Ambr format: weaponId.png
    if (!localWeapons.has(weaponId)) {
      console.log(`[Weapon] Phát hiện vũ khí mới: ${weaponId}`);
      // Tùy theo cấu trúc icon vũ khí của Ambr. VD: UI_EquipIcon_Pole_Homa
      // Tuy nhiên đây là ví dụ demo logic Auto-Sync
      const imgUrl = `https://api.ambr.top/assets/UI/${data.data.items[weaponId].icon}.png`;
      const buffer = await fetchImageBuffer(imgUrl);
      
      if (buffer) {
        const outPath = path.join(ASSETS_DIR, 'weapons', `${weaponId}.webp`);
        await sharp(buffer)
          .webp({ quality: 80, effort: 4 })
          .toFile(outPath);
        console.log(`✅ Đã tải và nén: ${weaponId}.webp`);
        newCount++;
      }
    }
  }
  console.log(`✨ Hoàn tất đồng bộ Vũ khí. Tải mới: ${newCount} ảnh.\n`);
}

async function run() {
  console.log('🚀 KHỞI ĐỘNG HYBRID AUTO-SYNC SCRIPT 🚀');
  await syncAvatars();
  await syncWeapons();
  console.log('🎉 Toàn bộ tiến trình Auto-Sync đã kết thúc!');
}

run();
