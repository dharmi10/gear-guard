require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const MaintenanceSimulator = require('./simulator');
const authRoutes = require('./routes/auth');

const app = express();

// Database connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgresql',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'gearguard',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Initialize simulator
const simulator = new MaintenanceSimulator(pool);

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error('❌ Database connection error:', err.message);
  else console.log('✅ Database connected successfully');
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// ROUTES
// ============================================
app.use('/api/auth', authRoutes);

// --- NEW NOTIFICATION ENDPOINT ---
app.post('/api/notifications/send', async (req, res) => {
  const { technicianId, message, requestId } = req.body;
  try {
    // In a real app, this would trigger an Email/Push service
    console.log(`🔔 NOTIFICATION SENT to Tech ID ${technicianId}: ${message} (Ref: ${requestId})`);
    
    // We log it to the database so the tech can see it on their dashboard
    await pool.query(
      'INSERT INTO request_comments (request_id, user_id, comment_text) VALUES ($1, $2, $3)',
      [requestId, technicianId, `MANAGER ALERT: ${message}`]
    );

    res.json({ success: true, message: 'Technician notified successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- UPDATED MANAGER DASHBOARD DATA ---
app.get('/api/manager/dashboard', async (req, res) => {
  try {
    const query = `
      SELECT 
        mr.*, 
        e.equipment_name, 
        u.full_name as requester_name, 
        rs.stage_name, 
        rs.color_code,
        t.full_name as technician_name,
        t.id as technician_id,
        -- LOGIC: If date is past and stage isn't "Completed", it's overdue
        (mr.scheduled_date < NOW() AND rs.stage_name != 'Completed') as is_overdue
      FROM maintenance_requests mr
      LEFT JOIN equipment e ON mr.equipment_id = e.id
      LEFT JOIN users u ON mr.requested_by_user_id = u.id
      LEFT JOIN request_stages rs ON mr.stage_id = rs.id
      LEFT JOIN users t ON mr.assigned_to_user_id = t.id
      ORDER BY is_overdue DESC, mr.created_at DESC;
    `;
    const result = await pool.query(query);
    res.json({ success: true, count: result.rows.length, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// SIMULATOR CONTROL ENDPOINTS
// ============================================
app.post('/api/simulator/start', (req, res) => {
  simulator.start();
  res.json({ success: true, status: simulator.getStatus() });
});

app.post('/api/simulator/stop', (req, res) => {
  simulator.stop();
  res.json({ success: true, status: simulator.getStatus() });
});

// ============================================
// DATA ENDPOINTS (Requests & Equipment)
// ============================================

app.get('/api/requests', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT mr.*, e.equipment_name, rs.stage_name, u.full_name as requested_by
      FROM maintenance_requests mr
      LEFT JOIN equipment e ON mr.equipment_id = e.id
      LEFT JOIN request_stages rs ON mr.stage_id = rs.id
      LEFT JOIN users u ON mr.requested_by_user_id = u.id
      ORDER BY mr.created_at DESC
    `);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const totalEquip = await pool.query("SELECT COUNT(*) FROM equipment");
    const totalReq = await pool.query('SELECT COUNT(*) FROM maintenance_requests');
    const openReq = await pool.query("SELECT COUNT(*) FROM maintenance_requests mr JOIN request_stages rs ON mr.stage_id = rs.id WHERE rs.stage_name != 'Completed'");
    const overdueReq = await pool.query('SELECT COUNT(*) FROM maintenance_requests WHERE scheduled_date < NOW()');

    res.json({
      success: true,
      data: {
        total_equipment: parseInt(totalEquip.rows[0].count),
        total_requests: parseInt(totalReq.rows[0].count),
        open_requests: parseInt(openReq.rows[0].count),
        overdue_requests: parseInt(overdueReq.rows[0].count)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Error handling and Server Start
app.use((req, res) => res.status(404).json({ success: false, error: 'Route not found' }));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`\n🚀 GearGuard Server running on http://localhost:${PORT}`);
  setTimeout(() => simulator.start(), 3000);
});

module.exports = { app, pool, simulator };