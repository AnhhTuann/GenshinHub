import { PrismaClient } from '@prisma/client';
import https from 'https';

const prisma = new PrismaClient();

function checkUrl(url: string): Promise<number> {
  return new Promise((resolve) => {
    https.get(url, (res) => resolve(res.statusCode || 0)).on('error', () => resolve(0));
  });
}

async function main() {
  const chars = await prisma.character.findMany({ select: { id: true, name: true, avatarUrl: true } });
  console.log(`Checking ${chars.length} characters...`);
  const broken: string[] = [];
  for (const c of chars) {
    const status = await checkUrl(c.avatarUrl);
    if (status !== 200) {
      broken.push(`${c.name} (${c.id}) -> ${c.avatarUrl} => ${status}`);
    }
  }
  if (broken.length === 0) {
    console.log('ALL images OK!');
  } else {
    console.log(`\n${broken.length} BROKEN images:`);
    broken.forEach(b => console.log(b));
  }
}

main().finally(() => prisma.$disconnect());
