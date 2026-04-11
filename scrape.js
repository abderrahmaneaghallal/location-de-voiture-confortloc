const https = require('https');

https.get('https://favercar.com/location-voiture-luxe/', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        const regex = /<img[^>]+src="([^">]+)"/g;
        let match;
        const images = new Set();
        while ((match = regex.exec(data)) !== null) {
            if (match[1].match(/\.(jpeg|jpg|gif|png|webp)/i)) {
                images.add(match[1]);
            }
        }
        
        // Also look for data-src
        const regexDataSrc = /<img[^>]+data-src="([^">]+)"/g;
        while ((match = regexDataSrc.exec(data)) !== null) {
            if (match[1].match(/\.(jpeg|jpg|gif|png|webp)/i)) {
                images.add(match[1]);
            }
        }
        
        console.log(Array.from(images).join('\n'));
    });
}).on('error', (err) => {
    console.log("Error: " + err.message);
});
