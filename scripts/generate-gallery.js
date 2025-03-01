import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const galleryDir = path.join(__dirname, '../public/images/gallery');

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
  .filter(item => fs.statSync(path.join(galleryDir, item)).isDirectory());

// Get images from each category
const categoryImages = categories.flatMap(category => {
  const categoryPath = path.join(galleryDir, category);
  return fs.readdirSync(categoryPath)
    .filter(file => 
      /\.(jpg|jpeg|png|gif)$/i.test(file) &&
      !file.startsWith('.')
    )
    .map(file => ({
      src: `/images/gallery/${category}/${file}`,
      alt: file.replace(/\.[^/.]+$/, '').replace(/-/g, ' '),
      category: categoryNames[category] || category // Use German name or fallback to directory name
    }));
});

// Write the gallery data to a JSON file
const outputPath = path.join(__dirname, '../public/gallery-data.json');
fs.writeFileSync(outputPath, JSON.stringify({ images: categoryImages }, null, 2));

console.log(`Gallery data generated with ${categoryImages.length} images.`); 