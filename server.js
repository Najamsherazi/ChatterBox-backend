// server.js
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // only if you use JWT
require('dotenv').config(); // only used for local development

const app = express();

// Middleware
app.use(express.json());

// Environment variables from Render
const mongoURI = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;
const port = process.env.PORT || 5000; // use Render's PORT or fallback locally

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('ChatterBox backend is running!');
});

// Example: JWT usage (optional)
app.get('/token', (req, res) => {
  const token = jwt.sign({ user: 'testUser' }, jwtSecret, { expiresIn: '1h' });
  res.json({ token });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
