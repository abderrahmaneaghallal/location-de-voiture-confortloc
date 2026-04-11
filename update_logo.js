const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newLogoHTML = `<img src="assets/img/logo.png" alt="COMFORLOC Logo" style="height: 50px; object-fit: contain;">`;

// Replace in header
html = html.replace(/<span class="logo__icon">⬥<\/span>\s*<span class="logo__text">CONFORT<span class="logo__accent">LOC<\/span><\/span>/g, newLogoHTML);

fs.writeFileSync('index.html', html);
console.log('Logo updated');
