// controllers/dashboardController.js
const pool = require('../db');

// --- 1. Get Dashboard Statistics ---
const getDashboardStats = async (req, res) => {
  try {
    // 1. Scrapped Assets - Check if your column is actually 'stage'
    const scrapRes = await pool.query("SELECT COUNT(*) FROM maintenance_requests WHERE stage = 'Scrap'");
    
    // 2. Pending & In Progress
    const pendingRes = await pool.query(`
      SELECT COUNT(*) FROM maintenance_requests 
      WHERE stage IN ('New', 'In Progress') OR stage IS NULL
    `);

    // 3. Workforce Utilization
    const utilizationRes = await pool.query("SELECT SUM(duration) as total_hours FROM maintenance_requests");
    const totalHours = parseFloat(utilizationRes.rows[0].total_hours) || 0;
    const utilization = ((totalHours / 160) * 100).toFixed(1); 

    // 4. ADDED: Recent Activity (To show your 7 simulated requests)
    const recentActivity = await pool.query(`
      SELECT r.description, e.equipment_name, r.created_at 
      FROM maintenance_requests r
      JOIN equipment e ON r.equipment_id = e.id
      ORDER BY r.created_at DESC LIMIT 5
    `);

    res.json({
      scrapCount: scrapRes.rows[0].count,
      pendingCount: pendingRes.rows[0].count,
      utilization: utilization,
      recentRequests: recentActivity.rows
    });
  } catch (err) {
    console.error("Dashboard Error:", err.message);
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