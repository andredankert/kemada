import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || process.env.SERVER_PORT || 8080;

// Middleware
app.use(cors({
  origin: ['http://localhost', 'http://localhost:80', 'https://kemada.de'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Add security headers
app.use((req, res, next) => {
  // Remove browsing-topics from Permissions-Policy
  res.setHeader('Permissions-Policy', 
    'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
  );
  next();
});

app.use(express.static(path.join(__dirname, 'dist')));

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Handle client-side routing
app.get('/*', function(req, res) {
  // Log the request
  console.log('Serving index.html for:', req.url);
  
  // Serve the main index.html file for all routes
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), err => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Error loading page');
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Static files served from:', path.join(__dirname, 'dist'));
}); 