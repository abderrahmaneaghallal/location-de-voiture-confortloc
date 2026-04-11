const https = require('https');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets', 'img');
if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
}

https.get('https://favercar.com/location-voiture-luxe/', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        const regex1 = /<img[^>]+src="([^">]+)"/g;
        const regex2 = /<img[^>]+data-src="([^">]+)"/g;
        let match;
        const images = new Set();
        
        while ((match = regex1.exec(data)) !== null) {
            if (match[1].match(/\.(jpeg|jpg|gif|png|webp)/i)) {
                images.add(match[1]);
            }
        }
        while ((match = regex2.exec(data)) !== null) {
            if (match[1].match(/\.(jpeg|jpg|gif|png|webp)/i)) {
                images.add(match[1]);
            }
        }
        
        const urls = Array.from(images);
        let completed = 0;
        
        urls.forEach(url => {
            let filename = url.split('/').pop().split('?')[0];
            let filepath = path.join(imgDir, filename);
            const file = fs.createWriteStream(filepath);
            https.get(url, (response) => {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    completed++;
                    if (completed === urls.length) {
                        console.log(`Successfully downloaded ${completed} images to ${imgDir}`);
                    }
                });
            }).on('error', (err) => {
                fs.unlink(filepath, () => {});
                console.error(`Error downloading ${url}: ${err.message}`);
                completed++;
                if (completed === urls.length) {
                    console.log(`Finished with some errors. Downloaded ${completed} files.`);
                }
            });
        });
    });
}).on('error', (err) => {
    console.log("Error: " + err.message);
});
