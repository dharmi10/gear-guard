// controllers/dashboardController.js
const pool = require('../db');

// --- 1. Get Dashboard Statistics ---
const getDashboardStats = async (req, res) => {
  try {
    // Red Box: Scrapped Assets
    const scrapRes = await pool.query("SELECT COUNT(*) FROM maintenance_requests WHERE stage = 'Scrap'");
    
    // Green Box: Pending & Overdue
    const pendingRes = await pool.query(`
      SELECT COUNT(*) FROM maintenance_requests 
      WHERE stage IN ('New', 'In Progress')
    `);

    // Blue Box: Workforce Utilization
    const utilizationRes = await pool.query("SELECT SUM(duration) as total_hours FROM maintenance_requests");
    const totalHours = utilizationRes.rows[0].total_hours || 0;
    const utilization = ((totalHours / 160) * 100).toFixed(1); 

    res.json({
      scrapCount: scrapRes.rows[0].count,
      pendingCount: pendingRes.rows[0].count,
      utilization: utilization
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- 2. Create Maintenance Request ---
const createRequest = async (req, res) => {
  const { subject, equipment_id, scheduled_date, type, team_name } = req.body;
  try {
    const newRequest = await pool.query(
      `INSERT INTO maintenance_requests 
       (subject, equipment_id, scheduled_date, type, maintenance_team, stage) 
       VALUES ($1, $2, $3, $4, $5, 'New') RETURNING *`,
      [subject, equipment_id, scheduled_date, type, team_name]
    );
    res.json(newRequest.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- 3. Unified CommonJS Exports ---
// This ensures that 'createRequest' is defined and not missing!
module.exports = { 
  getDashboardStats, 
  createRequest 
};