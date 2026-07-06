const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '../frontend/public/images/banners');
const bannersTsFile = path.join(__dirname, '../frontend/data/banners.ts');

async function run() {
    const files = fs.readdirSync(dir);
    const pngFiles = files.filter(f => f.endsWith('.png'));
    
    console.log(`Found ${pngFiles.length} png files to convert...`);
    
    let converted = 0;
    for (const file of pngFiles) {
        const inputPath = path.join(dir, file);
        const outputPath = path.join(dir, file.replace('.png', '.webp'));
        
        try {
            await sharp(inputPath).webp().toFile(outputPath);
            fs.unlinkSync(inputPath);
            converted++;
            if (converted % 50 === 0) console.log(`Converted ${converted}/${pngFiles.length}...`);
        } catch (e) {
            console.error(`Failed to convert ${file}:`, e);
        }
    }
    
    console.log(`Successfully converted ${converted} files.`);
    
    // Update banners.ts
    if (fs.existsSync(bannersTsFile)) {
        let tsContent = fs.readFileSync(bannersTsFile, 'utf8');
        tsContent = tsContent.replace(/\.png"/g, '.webp"');
        fs.writeFileSync(bannersTsFile, tsContent, 'utf8');
        console.log('Updated frontend/data/banners.ts');
    }
}

run();
