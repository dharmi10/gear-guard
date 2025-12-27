const express = require('express');
const cors = require('cors');
const db = require('./db');
const dashboardRoutes = require('./routes/dashboardRoutes');
require('dotenv').config();

const app = express();

// ===========================================
// 1. MIDDLEWARE
// ===========================================
app.use(cors());
app.use(express.json()); // Allows server to read JSON data

// Simple Logging (Crash-Proof Version)
app.use((req, res, next) => {
  console.log(`📡 ${req.method} request to ${req.url}`);
  next();
});

// ===========================================
// 2. CONNECT DATABASE
// ===========================================
db.connect()
  .then(() => console.log('✅ Database connected'))
  .catch(err => console.error('❌ Database connection error:', err));

// ===========================================
// 3. ROUTES
// ===========================================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/listings', require('./routes/listings'));
app.use('/api/dashboard', dashboardRoutes);
// app.use('/api/stats', require('./routes/stats')); // Uncomment later

// Test Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// ===========================================
// 4. START SERVER
// ===========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));


// server.js (Simplified Example)
app.get('/api/requests', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM maintenance_requests');
    res.json(result.rows); // Sends data to your React frontend
  } catch (err) {
    res.status(500).send("Server Error");
  }
});