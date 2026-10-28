const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const standaloneDir = path.join(rootDir, '.next', 'standalone');
const staticSrc = path.join(rootDir, '.next', 'static');
const staticDest = path.join(standaloneDir, '.next', 'static');
const publicSrc = path.join(rootDir, 'public');
const publicDest = path.join(standaloneDir, 'public');

function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(source)) return;
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = fs.readdirSync(source);
  for (const file of files) {
    const curSource = path.join(source, file);
    const curTarget = path.join(target, file);
    if (fs.lstatSync(curSource).isDirectory()) {
      copyFolderRecursiveSync(curSource, curTarget);
    } else {
      fs.copyFileSync(curSource, curTarget);
    }
  }
}

console.log('Packaging standalone bundle for Hostinger...');

// 1. Copy .next/static to .next/standalone/.next/static
if (fs.existsSync(staticSrc)) {
  console.log('-> Copying .next/static to standalone bundle...');
  copyFolderRecursiveSync(staticSrc, staticDest);
}

// 2. Copy public to .next/standalone/public
if (fs.existsSync(publicSrc)) {
  console.log('-> Copying public directory to standalone bundle...');
  copyFolderRecursiveSync(publicSrc, publicDest);
}

// 3. Copy server-storage to .next/standalone/server-storage (data room files and JSON DB)
const serverStorageSrc = path.join(rootDir, 'server-storage');
const serverStorageDest = path.join(standaloneDir, 'server-storage');
if (fs.existsSync(serverStorageSrc)) {
  console.log('-> Copying server-storage directory to standalone bundle...');
  copyFolderRecursiveSync(serverStorageSrc, serverStorageDest);
}

// 4. Create .htaccess for Hostinger LiteSpeed/Apache routing fallback (if needed)
const htaccessPath = path.join(standaloneDir, '.htaccess');
const htaccessContent = `# Hostinger Node.js Environment Setup
RewriteEngine On
RewriteRule ^$ http://127.0.0.1:3000/ [P,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
`;
fs.writeFileSync(htaccessPath, htaccessContent, 'utf-8');

// 5. Package into jonik-hostinger-bundle.zip
try {
  const { execSync } = require('child_process');
  console.log('-> Compressing standalone package into jonik-hostinger-bundle.zip...');
  const zipPath = path.join(rootDir, 'jonik-hostinger-bundle.zip');
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
  execSync('tar.exe -a -c -f jonik-hostinger-bundle.zip -C .next/standalone .', { cwd: rootDir });
  console.log('✓ Created jonik-hostinger-bundle.zip ready for Hostinger upload!');
} catch (e) {
  console.log('Note: Automatic zip packaging skipped. You can manually zip the contents of .next/standalone');
}

console.log('Hostinger packaging complete!');
console.log('Your production bundle is ready in: .next/standalone');
console.log('Your upload archive is ready at: jonik-hostinger-bundle.zip');
