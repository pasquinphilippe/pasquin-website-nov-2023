const fs = require('fs');
const path = require('path');

function processCSSFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    // Matches media queries and the following CSS until the closing brace
    const mediaQueryRegex = /@media[^{]*\{([\s\S]*?\})\s*\}/g;
    let match;
    let groupedMediaQueries = {};

    // Process each media query found
    while ((match = mediaQueryRegex.exec(data)) !== null) {
      const fullMatch = match[0];
      const mediaCondition = fullMatch.substring(0, fullMatch.indexOf('{')).trim();
      const mediaContent = match[1].trim();

      if (!groupedMediaQueries[mediaCondition]) {
        groupedMediaQueries[mediaCondition] = [];
      }
      groupedMediaQueries[mediaCondition].push(mediaContent);
    }

    // Remove original media queries from the CSS
    let modifiedCSS = data.replace(mediaQueryRegex, '');

    // Append grouped media queries at the end
    for (const [mediaCondition, contents] of Object.entries(groupedMediaQueries)) {
      modifiedCSS += `${mediaCondition} {\n${contents.join('\n')}\n}\n`;
    }

    // Write the modified CSS back to the file
    fs.writeFile(filePath, modifiedCSS, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing file:', writeErr);
        return;
      }
      console.log('CSS file processed successfully.');
    });
  });
}
// Replace with your CSS file path
const cssFilePath = path.join(__dirname, 'resources/css/style.css');
processCSSFile(cssFilePath);
