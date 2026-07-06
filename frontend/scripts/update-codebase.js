const fs = require('fs');
const path = require('path');

const DIRECTORIES = [
  path.join(__dirname, '../components'),
  path.join(__dirname, '../app'),
  path.join(__dirname, '../data')
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  if (content.includes('<Image')) {
    // If we are about to replace <Image, make sure it's imported
    if (!content.includes('FallbackImage')) {
       const importRegex = /^import.*from.*;$/m;
       const match = content.match(importRegex);
       if (match) {
         content = content.replace(importRegex, `${match[0]}\nimport FallbackImage from '@/components/ui/FallbackImage';`);
       }
    }
    
    // Replace <Image (followed by space or newline) with <FallbackImage
    content = content.replace(/<Image([\s\n])/g, '<FallbackImage$1');
    content = content.replace(/<\/Image>/g, '</FallbackImage>');
    changed = true;
  }

  if (content.includes('/assets/')) {
    // Sử dụng (.*?) để bắt toàn bộ nội dung động bên trong template literal kể cả dấu ngoặc đơn
    content = content.replace(/\/images\/(.*?)\.webp/g, (match, p1) => {
      let newPath = p1;
      newPath = newPath.replace(/^avatars\//, 'characters/');
      newPath = newPath.replace(/^splash\//, 'characters/');
      newPath = newPath.replace(/^artifacts\//, 'items/');
      newPath = newPath.replace(/^materials\//, 'items/');
      return `/assets/${newPath}.webp`;
    });
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated:', filePath);
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  });
}

DIRECTORIES.forEach(dir => walk(dir));
console.log('Codebase update complete.');
