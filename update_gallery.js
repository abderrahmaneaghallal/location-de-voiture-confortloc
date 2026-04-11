const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets', 'img');
const files = fs.readdirSync(imgDir).filter(f => f.match(/\.(png|jpe?g|webp)$/i));

let html = fs.readFileSync('index.html', 'utf8');

let carIndex = 0;
html = html.replace(/<div class="car-card__image">[\s\S]*?(?=<div class="car-card__body">)/g, (match) => {
    // Pick 4 images for this car
    let carImgs = [];
    for(let i=0; i<4; i++) {
        carImgs.push(files[(carIndex * 4 + i) % files.length]);
    }
    carIndex++;
    
    let result = `
                    <div class="car-card__image">
                        <img src="assets/img/${carImgs[0]}" alt="Car" class="car-card__main-img">
                        <div class="car-card__thumbnails">
                            <img src="assets/img/${carImgs[0]}" alt="Thumb 1" class="gallery-thumb active" data-src="assets/img/${carImgs[0]}">
                            <img src="assets/img/${carImgs[1]}" alt="Thumb 2" class="gallery-thumb" data-src="assets/img/${carImgs[1]}">
                            <img src="assets/img/${carImgs[2]}" alt="Thumb 3" class="gallery-thumb" data-src="assets/img/${carImgs[2]}">
                            <img src="assets/img/${carImgs[3]}" alt="Thumb 4" class="gallery-thumb" data-src="assets/img/${carImgs[3]}">
                        </div>
                    </div>
                    `;
    return result.trim() + '\n                    ';
});

fs.writeFileSync('index.html', html);
console.log('Updated ' + carIndex + ' car cards');
