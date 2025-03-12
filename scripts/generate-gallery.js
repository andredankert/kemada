import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const galleryDir = path.join(__dirname, '../public/images/gallery');

// Debug: Log the gallery directory path
console.log('Gallery directory:', galleryDir);

// Category name mapping (English to German)
const categoryNames = {
  'animals': 'Tiere',
  'christmas': 'Weihnachten',
  'deco': 'Dekoration',
  'easter': 'Ostern',
  'figures': 'Figuren',
  'halloween': 'Halloween',
  'earrings': 'Schmuck'
};

// Get all categories (directories) in the gallery
const categories = fs.readdirSync(galleryDir)
  .filter(item => {
    const fullPath = path.join(galleryDir, item);
    const isDir = fs.statSync(fullPath).isDirectory();
    // Debug: Log each item and whether it's a directory
    console.log(`Found item: ${item}, isDirectory: ${isDir}`);
    return isDir;
  });

// Debug: Log found categories
console.log('Found categories:', categories);

// Get images from each category
const categoryImages = categories.flatMap(category => {
  const categoryPath = path.join(galleryDir, category);
  console.log(`Processing category: ${category} at path: ${categoryPath}`);
  
  const files = fs.readdirSync(categoryPath);
  console.log(`Found ${files.length} files in ${category}`);
  
  return files
    .filter(file => {
      const isValid = /\.(jpg|jpeg|png|gif|webp)$/i.test(file) && !file.startsWith('.');
      // Debug: Log each file and whether it passes the filter
      console.log(`File: ${file}, isValid: ${isValid}`);
      return isValid;
    })
    .map(file => {
      const imageData = {
        src: `/images/gallery/${category}/${file}`,
        alt: file.replace(/\.[^/.]+$/, '').replace(/-/g, ' '),
        category: categoryNames[category] || category
      };
      // Debug: Log each processed image
      console.log(`Processed image:`, imageData);
      return imageData;
    });
});

// Write the gallery data to a JSON file
const outputPath = path.join(__dirname, '../public/gallery-data.json');
fs.writeFileSync(outputPath, JSON.stringify({ images: categoryImages }, null, 2));

// Debug: Log the final output
console.log(`Gallery data generated with ${categoryImages.length} images.`);
console.log('Gallery data written to:', outputPath);

// Debug: Verify the generated file
try {
  const verifyData = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
  console.log('Verification: Gallery data file contains', verifyData.images.length, 'images');
} catch (error) {
  console.error('Error verifying gallery data file:', error);
} 