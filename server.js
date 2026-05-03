require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error('ERROR: API_KEY is not set. Copy .env.example to .env and set a value.');
  process.exit(1);
}

app.use(express.json());

function requireApiKey(req, res, next) {
  const key = req.headers['x-api-key'] || req.query.api_key;
  if (!key || key !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: invalid or missing API key' });
  }
  next();
}

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use(express.static(path.join(__dirname)));

app.use('/api', requireApiKey);

app.get('/api/products', (req, res) => {
  res.json({
    products: [
      { id: 1, name: 'Product 1', affiliateUrl: 'https://www.amazon.com/?tag=your-tag' },
      { id: 2, name: 'Product 2', affiliateUrl: 'https://www.amazon.com/?tag=your-tag' },
      { id: 3, name: 'Product 3', affiliateUrl: 'https://www.amazon.com/?tag=your-tag' },
    ],
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('API routes are protected by API key (X-API-Key header or ?api_key= query param)');
  });
}

module.exports = app;
