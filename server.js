const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all routes — serve the corresponding HTML file
app.get('*', (req, res) => {
  let filePath = req.path;

  // Remove trailing slash
  if (filePath !== '/' && filePath.endsWith('/')) {
    filePath = filePath.slice(0, -1);
  }

  // If no extension, try .html
  if (!path.extname(filePath)) {
    filePath = filePath + '.html';
  }

  const fullPath = path.join(__dirname, 'dist', filePath);

  res.sendFile(fullPath, (err) => {
    if (err) {
      // Fallback to index.html
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
