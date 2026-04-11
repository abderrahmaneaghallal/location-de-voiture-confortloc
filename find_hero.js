fetch('https://favercar.com/')
  .then(response => response.text())
  .then(html => {
    // Find style tags containing url(
    const styleMatches = html.match(/url\(['"]?(https:\/\/[^'"\)]+\.(?:jpg|jpeg|png|webp))['"]?\)/gi);
    if (styleMatches) {
        console.log("Images found in url():");
        const unique = [...new Set(styleMatches)];
        console.log(unique.join('\n'));
    }
  });
