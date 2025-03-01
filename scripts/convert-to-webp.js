const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const GALLERY_DIR = path.join(__dirname, '../public/images/gallery');
const QUALITY = 80; // Adjust quality as needed (0-100)

function convertToWebP(inputPath) {
  const dir = path.dirname(inputPath);
  const filename = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(dir, `${filename}.webp`);
  
  try {
    // Using sips for macOS (since we detected darwin OS)
    execSync(`sips -s format webp "${inputPath}" --out "${outputPath}" --setProperty formatOptions '${QUALITY}'`);
    console.log(`✓ Converted: ${path.relative(GALLERY_DIR, outputPath)}`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to convert: ${path.relative(GALLERY_DIR, inputPath)}`);
    console.error(error.message);
    return false;
  }
}

function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
      continue;
    }
    
    // Skip .DS_Store and other hidden files
    if (item.startsWith('.')) continue;
    
    // Process only image files
    if (/\.(jpg|jpeg|png)$/i.test(item)) {
      convertToWebP(fullPath);
    }
  }
}

console.log('Starting image conversion to WebP format...');
processDirectory(GALLERY_DIR);
console.log('Conversion complete!'); 