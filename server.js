// server.js
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // only if you use JWT
require('dotenv').config(); // loads .env locally; Render injects env vars automatically

const app = express();

// Middleware
app.use(express.json());

// Environment variables
const mongoURI = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;
const port = process.env.PORT || 5000; // fallback for local dev

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

// Example JWT route (optional)
app.get('/token', (req, res) => {
  if (!jwtSecret) return res.status(500).json({ error: 'JWT secret not set' });

  const token = jwt.sign({ user: 'testUser' }, jwtSecret, { expiresIn: '1h' });
  res.json({ token });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
