const fs = require('fs');

// Update CSS back to 85px
let style = fs.readFileSync('style.css', 'utf8');
style = style.replace('--header-h: 110px;', '--header-h: 85px;');
fs.writeFileSync('style.css', style);

// Update HTML to make it more visible but proportioned
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/style="height: 90px; object-fit: contain; width: auto; max-width: 250px;"/g, 'style="height: 60px; object-fit: contain; width: auto; max-width: 350px; transform: scale(1.15);"');
fs.writeFileSync('index.html', html);

console.log('Logo update complete');
