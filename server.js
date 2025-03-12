import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { dirname } from 'path';

// ES modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
const envResult = dotenv.config({ path: '.env.local' });
if (envResult.error) {
  console.warn('Error loading .env.local:', envResult.error);
} else {
  console.log('Environment variables loaded successfully');
}

const app = express();
const PORT = process.env.PORT || process.env.SERVER_PORT || 8080;

// Create API Router
const apiRouter = express.Router();

// API endpoint for contact form
apiRouter.post('/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields', success: false });
  }

  try {
    console.log('Creating email transporter with config:', {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        // password hidden for security
      }
    });

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASSWORD || '',
      },
      debug: true, // Enable debug output
      logger: true // Log information into the console
    });

    // Verify connection configuration
    console.log('Verifying email connection...');
    await transporter.verify();
    console.log('Email connection verified successfully');

    // Email content
    console.log('Preparing to send email to:', 'info@kemada.de');
    const mailOptions = {
      from: `"Kemada Website" <${process.env.EMAIL_USER || 'noreply@kemada.de'}>`,
      to: 'info@kemada.de',
      subject: `Neue Kontaktanfrage von ${name}`,
      text: `
Name: ${name}
Email: ${email}
Telefon: ${phone || 'Nicht angegeben'}

Nachricht:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #9c6644;">Neue Kontaktanfrage von der Kemada Website</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Telefon:</strong> ${phone || 'Nicht angegeben'}</p>
  <p><strong>Nachricht:</strong></p>
  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
    ${message.replace(/\n/g, '<br>')}
  </div>
</div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Email sent successfully', success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending email', success: false });
  }
});

// API endpoint for testimonials form
apiRouter.post('/testimonials', async (req, res) => {
  const { name, email, message, rating, position } = req.body;

  if (!name || !email || !message || !rating) {
    return res.status(400).json({ message: 'Missing required fields', success: false });
  }

  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASSWORD || '',
      },
    });

    // Email content
    const mailOptions = {
      from: `"Kemada Website" <${process.env.EMAIL_USER || 'noreply@kemada.de'}>`,
      to: 'info@kemada.de',
      subject: `Neue Bewertung von ${name}`,
      text: `
Name: ${name}
Email: ${email}
Rolle: ${position || 'Nicht angegeben'}
Bewertung: ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5)

Nachricht:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #9c6644;">Neue Bewertung von der Kemada Website</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Rolle:</strong> ${position || 'Nicht angegeben'}</p>
  <p><strong>Bewertung:</strong> 
    <span style="color: #f59e0b;">${'★'.repeat(rating)}</span><span style="color: #d1d5db;">${'☆'.repeat(5 - rating)}</span> (${rating}/5)
  </p>
  <p><strong>Nachricht:</strong></p>
  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
    ${message.replace(/\n/g, '<br>')}
  </div>
</div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Testimonial sent successfully', success: true });
  } catch (error) {
    console.error('Error sending testimonial:', error);
    return res.status(500).json({ message: 'Error sending testimonial', success: false });
  }
});

// Middleware
app.use(cors({
  origin: ['http://localhost', 'http://localhost:80', 'https://kemada.de'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Mount API router
app.use('/api', apiRouter);

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





// Handle client-side routing - must be after API routes but before catch-all
app.get('/*', function(req, res, next) {
  // Skip API routes
  if (req.url.startsWith('/api/')) {
    return next();
  }
  
  // Log the request
  console.log('Serving index.html for:', req.url);
  
  // Serve the main index.html file for all other routes
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