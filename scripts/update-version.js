import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Increment version number
const versionFile = path.join(__dirname, '../src/config/version.ts');
const versionContent = fs.readFileSync(versionFile, 'utf8');
const currentVersion = versionContent.match(/number: '(.+?)'/)[1];

// Get current timestamp
const now = new Date();

// Generate version based on date (YYYY.MM.DD)
const newVersion = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;

// Update version file
const newContent = `// This file is automatically updated during the build process
export const version = {
  number: '${newVersion}',
  buildDate: new Date().toISOString(),
};`;

fs.writeFileSync(versionFile, newContent);
console.log(`Version updated to ${newVersion}`); 