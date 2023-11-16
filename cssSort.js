const fs = require('fs');
const path = require('path');

// Function to read, process, and write the CSS file
function processCSSFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    // Regular expression to match media queries
    const mediaQueryRegex = /@media[^{]+\{([\s\S]+?})\s*}/g;

    // Object to store grouped media queries
    let groupedMediaQueries = {};

    // Remove media queries and group them
    let modifiedCSS = data.replace(mediaQueryRegex, (match, content, offset, string) => {
      const mediaCondition = match.match(/@media[^{]+{/)[0];
      groupedMediaQueries[mediaCondition] = (groupedMediaQueries[mediaCondition] || '') + content;
      return '';
    });

    // Append grouped media queries at the end
    for (const [mediaCondition, content] of Object.entries(groupedMediaQueries)) {
      modifiedCSS += `${mediaCondition}{${content}}`;
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
const cssFilePath = path.join(__dirname, '/Users/mili/Documents/Git/philippe-pasquin/website-nov-2023/resources/css/style.css');
processCSSFile(cssFilePath);
