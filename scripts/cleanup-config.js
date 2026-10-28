const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
console.log('-> Running pre-build config integrity check...');

try {
  const files = fs.readdirSync(rootDir);
  for (const file of files) {
    if (file.includes('next.config') && file !== 'next.config.js') {
      console.log(`-> Purging stray/duplicate config file: ${file}`);
      try {
        fs.unlinkSync(path.join(rootDir, file));
        console.log(`✓ Deleted ${file}`);
      } catch (err) {
        console.warn(`Could not remove ${file}:`, err.message);
      }
    }
  }
} catch (e) {
  console.warn('Config cleanup notice:', e.message);
}
