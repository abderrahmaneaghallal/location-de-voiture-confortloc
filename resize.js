const fs = require('fs');

// Update CSS
let style = fs.readFileSync('style.css', 'utf8');
style = style.replace('--header-h: 72px;', '--header-h: 110px;');
fs.writeFileSync('style.css', style);

// Update HTML
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/style="height: 50px; object-fit: contain;"/g, 'style="height: 90px; object-fit: contain; width: auto; max-width: 250px;"');
fs.writeFileSync('index.html', html);

console.log('Resize complete');
