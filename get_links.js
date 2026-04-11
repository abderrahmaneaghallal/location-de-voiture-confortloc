fetch('https://favercar.com/')
  .then(response => response.text())
  .then(html => {
    const regex = /https?:\/\/[^"'\s\)]+\.(?:jpg|jpeg|png|webp)/gi;
    const matches = html.match(regex);
    if (matches) {
      const unique = [...new Set(matches)];
      console.log(unique.join('\n'));
    } else {
      console.log("No images found.");
    }
  })
  .catch(err => console.error(err));
