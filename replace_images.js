const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const images = [
    'r1-e1775076919670.jpeg',
    'a1-e1775076427604.jpeg',
    'WhatsApp-Image-2026-01-02-at-9.05.10-PM-scaled-e1768509348611.jpeg',
    'WhatsApp-Image-2026-01-02-at-9.07.04-PM-2-scaled.jpeg',
    'd4-e1775077230843.jpeg',
    'WhatsApp-Image-2026-01-02-at-9.09.06-PM-1-scaled.jpeg',
    'WhatsApp-Image-2026-01-02-at-9.11.44-PM-scaled-e1768669177430.jpeg',
    't5.jpeg',
    'WhatsApp-Image-2026-01-02-at-9.13.21-PM-scaled-e1768510051744.jpeg'
];

let count = 0;
html = html.replace(/<div class="car-card__placeholder"[\s\S]*?<\/div>/g, () => {
    const img = images[count % images.length];
    count++;
    return `<img src="assets/img/${img}" alt="Car" class="car-card__img" style="width: 100%; height: 200px; object-fit: cover; border-radius: 15px;">`;
});

fs.writeFileSync('index.html', html);
console.log('Replaced', count, 'images');
