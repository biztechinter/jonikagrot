// Root entrypoint fallback for Hostinger and cloud deployment platforms
const fs = require('fs');
const path = require('path');

const standaloneServer = path.join(__dirname, '.next', 'standalone', 'server.js');

if (fs.existsSync(standaloneServer)) {
  require(standaloneServer);
} else {
  console.error('Standalone server bundle not found at .next/standalone/server.js. Please run "npm run build" first.');
  process.exit(1);
}
