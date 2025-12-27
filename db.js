// db.js
const { Pool } = require('pg');
require('dotenv').config();

// Use environment variables for security
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'gearguard',
  password: process.env.DB_PASSWORD || 'Kirti2006gami.', 
  port: process.env.DB_PORT || 5432,
});

// Test the connection immediately on startup
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
  } else {
    console.log('✅ Database connected successfully at:', res.rows[0].now);
  }
});

module.exports = pool;