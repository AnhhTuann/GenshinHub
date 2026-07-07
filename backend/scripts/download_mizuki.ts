import { downloadAndConvertToWebp } from '../src/utils/imageDownloader';
import path from 'path';

async function run() {
  const targetDir = path.join(__dirname, '../../frontend/public/assets/characters/YumemizukiMizuki');
  
  // URL from user's suggestion
  const enkaUrl = 'https://enka.network/ui/UI_Gacha_AvatarImg_Mizuki.png';
  const ambrUrl = 'https://api.ambr.top/assets/UI/UI_Gacha_AvatarImg_Mizuki.png';
  
  const destFile = path.join(targetDir, 'splash.webp');
  
  console.log(`Đang tải splash art cho Mizuki...`);
  
  try {
    const successEnka = await downloadAndConvertToWebp(enkaUrl, destFile);
    if (successEnka) {
      console.log('✅ Tải thành công từ Enka API!');
      return;
    }
  } catch (e) {
    console.log('❌ Lỗi Enka API');
  }
  
  try {
    const successAmbr = await downloadAndConvertToWebp(ambrUrl, destFile);
    if (successAmbr) {
      console.log('✅ Tải thành công từ Ambr API!');
      return;
    }
  } catch (e) {
    console.log('❌ Lỗi Ambr API');
  }
  
  console.log('❌ Không thể tải ảnh từ cả 2 nguồn với tên Mizuki.');
}

run();
