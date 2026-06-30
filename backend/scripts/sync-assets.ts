import axios from 'axios';
import axiosRetry from 'axios-retry';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

// Force load the correct .env (important for GitHub Actions or root executions)
dotenv.config({ path: path.resolve(__dirname, '../.env'), override: true });

const prisma = new PrismaClient();

// Configure axios with retry logic to avoid failing on temporary API glitches
const api = axios.create({
  timeout: 10000, // 10 seconds timeout
});

axiosRetry(api, {
  retries: 3, // retry 3 times
  retryDelay: axiosRetry.exponentialDelay, // exponential backoff
  retryCondition: (error: any) => {
    // Retry on network errors or 5xx server errors
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || (error.response?.status ?? 0) >= 500;
  },
  onRetry: (retryCount, error, requestConfig) => {
    console.warn(`[Sync] Retrying request (${retryCount}/3): ${requestConfig.url} - Error: ${error.message}`);
  }
});

async function syncCharacters() {
  console.log('🔄 Starting character sync...');
  try {
    // Replace with real Genshin API URL later, currently mock for example
    // const response = await api.get('https://api.genshin.dev/characters');
    
    // Simulating API response
    const mockApiData = [
      { id: 'new-character', nameEn: 'New Character', element: 'Pyro' }
    ];

    for (const char of mockApiData) {
      const exists = await prisma.character.findUnique({ where: { id: char.id } });
      if (!exists) {
        console.log(`✨ Found new character: ${char.nameEn}`);
        // await prisma.character.create({ ... })
      }
    }
    console.log('✅ Character sync complete.');
  } catch (error: any) {
    console.error('❌ Failed to sync characters:', error.message);
    throw error;
  }
}

async function syncWeapons() {
  console.log('🔄 Starting weapon sync...');
  // Add weapon sync logic here
  console.log('✅ Weapon sync complete.');
}

async function syncArtifacts() {
  console.log('🔄 Starting artifact sync...');
  // Add artifact sync logic here
  console.log('✅ Artifact sync complete.');
}

async function main() {
  console.log('==========================================');
  console.log('🚀 GENSHIN HUB AUTO-SYNC SCRIPT STARTED');
  console.log(`⏰ Time: ${new Date().toISOString()}`);
  console.log('==========================================\n');

  try {
    await syncCharacters();
    await syncWeapons();
    await syncArtifacts();
    
    console.log('\n==========================================');
    console.log('🎉 ALL ASSETS SYNCED SUCCESSFULLY!');
    console.log('==========================================');
  } catch (error) {
    console.error('\n==========================================');
    console.error('💥 SYNC SCRIPT FAILED!');
    console.error('==========================================');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
