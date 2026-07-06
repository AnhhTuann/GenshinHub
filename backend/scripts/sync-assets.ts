import { PrismaClient } from '@prisma/client';
import { downloadAndConvertToWebp } from '../src/utils/imageDownloader';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const ASSETS_DIR = path.join(__dirname, '../../../frontend/public');
const ENKA_CHARS_URL = 'https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/characters.json';
const ENKA_IMAGE_BASE = 'https://enka.network/ui';

async function fetchEnkaCharacters() {
  try {
    const res = await axios.get(ENKA_CHARS_URL);
    return res.data;
  } catch (error: any) {
    console.error('❌ Lỗi tải dữ liệu Enka Characters:', error.message);
    return null;
  }
}

function getInternalNameFromEnka(enkaData: any, localUrlSafe: string): string | null {
  // urlSafe is something like 'ayaka', 'hu_tao', 'tartaglia'
  const normalizedSafe = localUrlSafe.toLowerCase().replace(/[^a-z]/g, '');
  
  for (const key in enkaData) {
    const char = enkaData[key];
    if (char.SideIconName) {
      // e.g. UI_AvatarIcon_Side_Ayaka
      const internalName = char.SideIconName.replace('UI_AvatarIcon_Side_', '');
      if (internalName.toLowerCase() === normalizedSafe) {
        return internalName;
      }
      // handle hutao vs hu_tao
      if (internalName.toLowerCase().replace(/[^a-z]/g, '') === normalizedSafe) {
        return internalName;
      }
    }
  }
  return null;
}

async function syncCharacters(enkaData: any) {
  console.log('🔄 Bắt đầu kiểm tra ảnh Nhân Vật (Avatars/Splash)...');
  const characters = await prisma.character.findMany({
    select: { id: true, nameEn: true, avatarUrl: true, splashArtUrl: true }
  });

  let downloadedCount = 0;
  let errorCount = 0;

  for (const char of characters) {
    // Check avatar
    if (char.avatarUrl) {
      const localAvatarPath = path.join(ASSETS_DIR, char.avatarUrl);
      if (!fs.existsSync(localAvatarPath)) {
        console.log(`[Thiếu] Avatar cho ${char.nameEn}`);
        
        // Extract urlSafe from avatarUrl: /assets/characters/avatars/UI_AvatarIcon_albedo_avatar.webp
        const match = char.avatarUrl.match(/\/assets\/characters\/([a-zA-Z0-9_-]+)\/avatar\.webp/);
        if (match) {
          const urlSafe = match[1];
          let internalName = getInternalNameFromEnka(enkaData, urlSafe);
          
          if (!internalName) {
            // Fallback for names not exactly matching or missing in JSON
            internalName = urlSafe.charAt(0).toUpperCase() + urlSafe.slice(1).replace(/_(.)/g, (_, c) => c.toUpperCase());
            if (internalName === 'Hutao') internalName = 'Hutao';
            if (urlSafe === 'tartaglia') internalName = 'Tartaglia';
          }

          const enkaUrl = `${ENKA_IMAGE_BASE}/UI_AvatarIcon_${internalName}.png`;
          const success = await downloadAndConvertToWebp(enkaUrl, localAvatarPath);
          if (success) downloadedCount++; else errorCount++;
        }
      }
    }

    // Check splash
    if (char.splashArtUrl) {
      const localSplashPath = path.join(ASSETS_DIR, char.splashArtUrl);
      if (!fs.existsSync(localSplashPath)) {
        console.log(`[Thiếu] Splash Art cho ${char.nameEn}`);
        
        const match = char.splashArtUrl.match(/\/assets\/characters\/([a-zA-Z0-9_-]+)\/splash\.webp/);
        if (match) {
          const urlSafe = match[1];
          let internalName = getInternalNameFromEnka(enkaData, urlSafe);
          
          if (!internalName) {
            internalName = urlSafe.charAt(0).toUpperCase() + urlSafe.slice(1).replace(/_(.)/g, (_, c) => c.toUpperCase());
            if (internalName === 'Hutao') internalName = 'Hutao';
            if (urlSafe === 'tartaglia') internalName = 'Tartaglia';
          }

          const enkaUrl = `${ENKA_IMAGE_BASE}/UI_Gacha_AvatarImg_${internalName}.png`;
          const success = await downloadAndConvertToWebp(enkaUrl, localSplashPath);
          if (success) downloadedCount++; else errorCount++;
        }
      }
    }
  }

  return { downloadedCount, errorCount, total: characters.length };
}

async function syncWeapons() {
  console.log('🔄 Bắt đầu kiểm tra ảnh Vũ Khí (Weapons)...');
  const weapons = await prisma.weapon.findMany({
    select: { id: true, nameEn: true, iconUrl: true }
  });

  let downloadedCount = 0;
  let errorCount = 0;

  for (const wp of weapons) {
    if (wp.iconUrl) {
      const localPath = path.join(ASSETS_DIR, wp.iconUrl);
      if (!fs.existsSync(localPath)) {
        console.log(`[Thiếu] Icon cho Vũ Khí: ${wp.nameEn}`);
        
        // Match filename from URL
        const filename = path.basename(wp.iconUrl, '.webp'); // e.g., UI_EquipIcon_Sword_Falcon
        
        const enkaUrl = `${ENKA_IMAGE_BASE}/${filename}.png`;
        const success = await downloadAndConvertToWebp(enkaUrl, localPath);
        if (success) downloadedCount++; else errorCount++;
      }
    }
  }
  return { downloadedCount, errorCount, total: weapons.length };
}

async function syncArtifacts() {
  console.log('🔄 Bắt đầu kiểm tra ảnh Thánh Di Vật (Artifacts)...');
  const artifacts = await prisma.artifactSet.findMany({
    select: { id: true, nameEn: true, iconUrl: true }
  });

  let downloadedCount = 0;
  let errorCount = 0;

  for (const art of artifacts) {
    if (art.iconUrl) {
      const localPath = path.join(ASSETS_DIR, art.iconUrl);
      if (!fs.existsSync(localPath)) {
        console.log(`[Thiếu] Icon cho TDV: ${art.nameEn}`);
        
        const filename = path.basename(art.iconUrl, '.webp'); // e.g., UI_RelicIcon_15001_4
        
        const enkaUrl = `${ENKA_IMAGE_BASE}/${filename}.png`;
        const success = await downloadAndConvertToWebp(enkaUrl, localPath);
        if (success) downloadedCount++; else errorCount++;
      }
    }
  }
  return { downloadedCount, errorCount, total: artifacts.length };
}

async function run() {
  console.log('==========================================');
  console.log('🚀 LOCAL-FIRST ASSET SYNC SCRIPT 🚀');
  console.log('==========================================\n');

  const enkaData = await fetchEnkaCharacters();
  if (!enkaData) {
    console.error('Không thể lấy metadata từ Enka, dừng script.');
    process.exit(1);
  }

  const charResult = await syncCharacters(enkaData);
  const wpResult = await syncWeapons();
  const artResult = await syncArtifacts();
  
  console.log('\n==========================================');
  console.log('📋 BÁO CÁO TỔNG KẾT');
  console.log('==========================================');
  console.log(`- Đã quét: ${charResult.total} NV | ${wpResult.total} Vũ Khí | ${artResult.total} TDV`);
  console.log(`- Đã tải mới: NV(${charResult.downloadedCount}) | Vũ Khí(${wpResult.downloadedCount}) | TDV(${artResult.downloadedCount})`);
  console.log(`- Lỗi: NV(${charResult.errorCount}) | Vũ Khí(${wpResult.errorCount}) | TDV(${artResult.errorCount})`);
  console.log('==========================================');

  await prisma.$disconnect();
}

run();
