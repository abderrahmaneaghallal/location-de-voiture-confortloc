const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const bayonMatch = html.match(/(<!--\s*Hyundai Bayon\s*-->[\s\S]*?<div class="car-card__thumbnails">[\s\S]*?<\/div>)/);
if (bayonMatch) console.log("Bayon:", bayonMatch[1]);

const i20Match = html.match(/(<!--\s*Hyundai i20\s*-->[\s\S]*?<div class="car-card__thumbnails">[\s\S]*?<\/div>)/);
if (i20Match) console.log("i20:", i20Match[1]);
