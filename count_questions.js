const fs = require('fs');
const path = require('path');

const filePath = 'd:\\Coding\\Vitt\\src\\data\\questions.ts';

if (!fs.existsSync(filePath)) {
  console.error('File does not exist:', filePath);
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf-8');

const matches = content.match(/id:\s*"Q/g) || [];
console.log('Total Q-ids found:', matches.length);

const urbanMatch = content.match(/urban:\s*\[([\s\S]*?)\]\s*,\s*semi_urban/);
const semiMatch = content.match(/semi_urban:\s*\[([\s\S]*?)\]\s*,\s*rural/);
const ruralMatch = content.match(/rural:\s*\[([\s\S]*?)\]/);

if (urbanMatch) console.log('Urban count:', (urbanMatch[1].match(/id:\s*"Q/g) || []).length);
if (semiMatch) console.log('Semi-Urban count:', (semiMatch[1].match(/id:\s*"Q/g) || []).length);
if (ruralMatch) console.log('Rural count:', (ruralMatch[1].match(/id:\s*"Q/g) || []).length);
