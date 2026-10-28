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

// 5. Verify & hoist server.js if nested by Next.js tracing
const topServerPath = path.join(standaloneDir, 'server.js');
if (!fs.existsSync(topServerPath)) {
  console.log('-> Searching for nested server.js in standalone directory...');
  function findFile(dir, targetFile, maxDepth = 4, depth = 0) {
    if (depth > maxDepth || !fs.existsSync(dir)) return null;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isFile() && entry.name === targetFile) return full;
      if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.next') {
        const res = findFile(full, targetFile, maxDepth, depth + 1);
        if (res) return res;
      }
    }
    return null;
  }

  const nestedServer = findFile(standaloneDir, 'server.js');
  if (nestedServer) {
    console.log(`-> Hoisting nested server.js from ${nestedServer} to ${topServerPath}...`);
    fs.copyFileSync(nestedServer, topServerPath);
  }
}

// 6. Confirm server.js exists, else fail build explicitly
if (!fs.existsSync(topServerPath)) {
  console.error('FATAL: Standalone server.js was NOT found in .next/standalone/server.js!');
  console.error('Directory contents of .next:');
  if (fs.existsSync(path.join(rootDir, '.next'))) {
    console.error(fs.readdirSync(path.join(rootDir, '.next')));
  }
  process.exit(1);
} else {
  console.log('✓ Verified: Standalone server.js is ready at .next/standalone/server.js');
}

// 7. Package into jonik-hostinger-bundle.zip (on local development machines)
if (process.platform === 'win32' && !process.env.CI) {
  try {
    const { execSync } = require('child_process');
    console.log('-> Compressing standalone package into jonik-hostinger-bundle.zip...');
    const zipPath = path.join(rootDir, 'jonik-hostinger-bundle.zip');
    if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
    execSync('tar.exe -a -c -f jonik-hostinger-bundle.zip -C .next/standalone .', { cwd: rootDir });
    console.log('✓ Created jonik-hostinger-bundle.zip ready for Hostinger upload!');
  } catch (e) {
    console.log('Note: Automatic zip packaging skipped.');
  }
}

console.log('Hostinger packaging complete!');
console.log('Your production bundle is ready in: .next/standalone');
console.log('Your upload archive is ready at: jonik-hostinger-bundle.zip');
