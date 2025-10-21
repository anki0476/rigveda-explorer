import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of hymns with audio
const hymnsWithAudio = [
  '1.1', '1.32', '1.92', '1.154', '1.164',
  '2.12', '2.33',
  '3.62.10',
  '5.83',
  '7.86',
  '10.9', '10.10', '10.14', '10.34', '10.97', '10.125', '10.127', '10.129'
];

// Read hymns.json
const hymnsPath = path.join(__dirname, 'src/data/hymns.json');
const hymnsData = JSON.parse(fs.readFileSync(hymnsPath, 'utf8'));

// Add audioUrl to hymns that have audio files
hymnsData.hymns = hymnsData.hymns.map(hymn => {
  if (hymnsWithAudio.includes(hymn.id)) {
    return {
      ...hymn,
      audioUrl: `/audio/hymns/${hymn.id}.mp3`
    };
  }
  return hymn;
});

// Write back to file
fs.writeFileSync(hymnsPath, JSON.stringify(hymnsData, null, 2));

console.log('✅ Successfully added audio URLs to 18 hymns!');
console.log('📜 Updated hymns:', hymnsWithAudio.join(', '));
