const fs = require('fs');
const postcss = require('postcss');
const safeParser = require('postcss-safe-parser');

function removeClassesStartingWithW(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    postcss()
      .use((root) => {
        root.walkRules(rule => {
          // Split the selector to check each part for a class that starts with "w-"
          let selectors = rule.selector.split(/\s+|\[|\]|>|:|\+|~|\./);
          if (selectors.some(selector => selector.startsWith('w-'))) {
            rule.remove();
          }
        });
      })
      .process(data, { parser: safeParser })
      .then(result => {
        fs.writeFile(filePath, result.css, 'utf8', (writeErr) => {
          if (writeErr) {
            console.error('Error writing file:', writeErr);
            return;
          }
          console.log('CSS file updated successfully.');
        });
      });
  });
}


// Replace with your CSS file path
const cssFilePath = '/Users/mili/Documents/Git/philippe-pasquin/website-nov-2023/resources/css/style.css'; // Update the path to your CSS file
removeClassesStartingWithW(cssFilePath);
