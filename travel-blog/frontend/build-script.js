const fs = require('fs');
const path = require('path');

// Read the built index.html
const indexPath = path.join(__dirname, 'build', 'index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Replace %PUBLIC_URL% with actual path
const updatedContent = indexContent.replace(/%PUBLIC_URL%/g, '');

// Write back the updated content
fs.writeFileSync(indexPath, updatedContent);

console.log('✅ PUBLIC_URL replacement completed');
