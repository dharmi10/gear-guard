// server.js - GearGuard Backend with Real-time Data Simulator
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const MaintenanceSimulator = require('./simulator');
// 1. Add this at the top with your other requires
const authRoutes = require('./routes/auth');

// ... (keep your existing middleware and database code) ...

// 2. Add this in your "ROUTES" section

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
  if (err) {
    console.error('❌ Database connection error:', err.message);
  } else {
    console.log('✅ Database connected successfully');
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// ROUTES
// ============================================
app.use('/api/auth', authRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: '🛠️ GearGuard API - Real-time Maintenance Tracker',
    version: '1.0.0',
    simulator: simulator.getStatus(),
    endpoints: {
      health: 'GET /api/health',
      users: 'GET /api/users',
      equipment: 'GET /api/equipment',
      requests: 'GET /api/requests',
      kanban: 'GET /api/requests/kanban',
      dashboard: 'GET /api/dashboard/stats',
      simulator: {
        start: 'POST /api/simulator/start',
        stop: 'POST /api/simulator/stop',
        status: 'GET /api/simulator/status'
      }
    }
  });
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const userCount = await pool.query('SELECT COUNT(*) FROM users');
    const equipCount = await pool.query('SELECT COUNT(*) FROM equipment');
    const reqCount = await pool.query('SELECT COUNT(*) FROM maintenance_requests');
    const teamCount = await pool.query('SELECT COUNT(*) FROM maintenance_teams');
    
    res.json({ 
      status: 'healthy',
      timestamp: new Date(),
      database: 'connected',
      simulator: simulator.getStatus(),
      statistics: {
        users: parseInt(userCount.rows[0].count),
        equipment: parseInt(equipCount.rows[0].count),
        requests: parseInt(reqCount.rows[0].count),
        teams: parseInt(teamCount.rows[0].count)
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// ============================================
// SIMULATOR CONTROL ENDPOINTS
// ============================================

// Start simulator
app.post('/api/simulator/start', (req, res) => {
  try {
    simulator.start();
    res.json({ 
      success: true, 
      message: 'Simulator started',
      status: simulator.getStatus()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Stop simulator
app.post('/api/simulator/stop', (req, res) => {
  try {
    simulator.stop();
    res.json({ 
      success: true, 
      message: 'Simulator stopped',
      status: simulator.getStatus()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get simulator status
app.get('/api/simulator/status', (req, res) => {
  res.json({ 
    success: true,
    ...simulator.getStatus()
  });
});

// Trigger manual breakdown
app.post('/api/simulator/breakdown', async (req, res) => {
  try {
    await simulator.generateBreakdown();
    res.json({ success: true, message: 'Breakdown generated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Trigger manual preventive maintenance
app.post('/api/simulator/preventive', async (req, res) => {
  try {
    await simulator.generatePreventiveMaintenance();
    res.json({ success: true, message: 'Preventive maintenance scheduled' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// DATA ENDPOINTS
// ============================================

app.get('/api/departments', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM departments ORDER BY name');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT u.id, u.username, u.email, u.full_name, u.role, u.is_active, u.created_at,
             d.name as department_name
      FROM users u
      LEFT JOIN departments d ON u.department_id = d.id
      ORDER BY u.created_at DESC
    `);
    res.json({ success: true, count: result.rows.length, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/teams', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT mt.*, COUNT(tm.user_id) as member_count
      FROM maintenance_teams mt
      LEFT JOIN team_members tm ON mt.id = tm.team_id
      GROUP BY mt.id
      ORDER BY mt.team_name
    `);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/equipment', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.*, ec.category_name, d.name as department_name, mt.team_name,
             u.full_name as assigned_to_name, t.full_name as default_technician_name
      FROM equipment e
      LEFT JOIN equipment_categories ec ON e.category_id = ec.id
      LEFT JOIN departments d ON e.department_id = d.id
      LEFT JOIN maintenance_teams mt ON e.maintenance_team_id = mt.id
      LEFT JOIN users u ON e.assigned_to_user_id = u.id
      LEFT JOIN users t ON e.default_technician_id = t.id
      ORDER BY e.created_at DESC
    `);
    res.json({ success: true, count: result.rows.length, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/equipment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const equipment = await pool.query(`
      SELECT e.*, ec.category_name, d.name as department_name, mt.team_name,
             u.full_name as assigned_to_name, t.full_name as default_technician_name
      FROM equipment e
      LEFT JOIN equipment_categories ec ON e.category_id = ec.id
      LEFT JOIN departments d ON e.department_id = d.id
      LEFT JOIN maintenance_teams mt ON e.maintenance_team_id = mt.id
      LEFT JOIN users u ON e.assigned_to_user_id = u.id
      LEFT JOIN users t ON e.default_technician_id = t.id
      WHERE e.id = $1
    `, [id]);

    if (equipment.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Equipment not found' });
    }

    const requests = await pool.query(`
      SELECT mr.*, rs.stage_name, rs.color_code,
             u.full_name as requested_by, au.full_name as assigned_to
      FROM maintenance_requests mr
      LEFT JOIN request_stages rs ON mr.stage_id = rs.id
      LEFT JOIN users u ON mr.requested_by_user_id = u.id
      LEFT JOIN users au ON mr.assigned_to_user_id = au.id
      WHERE mr.equipment_id = $1
      ORDER BY mr.created_at DESC
    `, [id]);

    res.json({ 
      success: true, 
      data: { ...equipment.rows[0], maintenance_history: requests.rows }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/requests', async (req, res) => {
  try {
    const { status, type, priority, limit = 100 } = req.query;
    
    let query = `
      SELECT mr.*, e.equipment_name, e.serial_number, ec.category_name,
             rs.stage_name, rs.color_code, rs.stage_order,
             u.full_name as requested_by, au.full_name as assigned_to, mt.team_name
      FROM maintenance_requests mr
      LEFT JOIN equipment e ON mr.equipment_id = e.id
      LEFT JOIN equipment_categories ec ON mr.category_id = ec.id
      LEFT JOIN request_stages rs ON mr.stage_id = rs.id
      LEFT JOIN users u ON mr.requested_by_user_id = u.id
      LEFT JOIN users au ON mr.assigned_to_user_id = au.id
      LEFT JOIN maintenance_teams mt ON mr.maintenance_team_id = mt.id
      WHERE 1=1
    `;
    
    const params = [];
    let paramCount = 1;

    if (status) {
      query += ` AND rs.stage_name = $${paramCount}`;
      params.push(status);
      paramCount++;
    }
    if (type) {
      query += ` AND mr.request_type = $${paramCount}`;
      params.push(type);
      paramCount++;
    }
    if (priority) {
      query += ` AND mr.priority = $${paramCount}`;
      params.push(priority);
      paramCount++;
    }

    query += ` ORDER BY mr.created_at DESC LIMIT $${paramCount}`;
    params.push(limit);

    const result = await pool.query(query, params);
    res.json({ success: true, count: result.rows.length, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/requests/kanban', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT rs.id as stage_id, rs.stage_name, rs.stage_order, rs.color_code,
             json_agg(
               json_build_object(
                 'id', mr.id, 'request_number', mr.request_number,
                 'subject', mr.subject, 'priority', mr.priority,
                 'is_overdue', mr.is_overdue, 'equipment_name', e.equipment_name,
                 'assigned_to', au.full_name, 'created_at', mr.created_at
               ) ORDER BY mr.created_at DESC
             ) FILTER (WHERE mr.id IS NOT NULL) as requests
      FROM request_stages rs
      LEFT JOIN maintenance_requests mr ON rs.id = mr.stage_id
      LEFT JOIN equipment e ON mr.equipment_id = e.id
      LEFT JOIN users au ON mr.assigned_to_user_id = au.id
      GROUP BY rs.id, rs.stage_name, rs.stage_order, rs.color_code
      ORDER BY rs.stage_order
    `);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/requests/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT mr.*, e.equipment_name, e.serial_number, e.location,
             ec.category_name, rs.stage_name, rs.color_code,
             u.full_name as requested_by, u.email as requested_by_email,
             au.full_name as assigned_to, au.email as assigned_to_email,
             mt.team_name, d.name as department_name
      FROM maintenance_requests mr
      LEFT JOIN equipment e ON mr.equipment_id = e.id
      LEFT JOIN equipment_categories ec ON mr.category_id = ec.id
      LEFT JOIN request_stages rs ON mr.stage_id = rs.id
      LEFT JOIN users u ON mr.requested_by_user_id = u.id
      LEFT JOIN users au ON mr.assigned_to_user_id = au.id
      LEFT JOIN maintenance_teams mt ON mr.maintenance_team_id = mt.id
      LEFT JOIN departments d ON e.department_id = d.id
      WHERE mr.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Request not found' });
    }

    const comments = await pool.query(`
      SELECT rc.*, u.full_name as author_name
      FROM request_comments rc
      JOIN users u ON rc.user_id = u.id
      WHERE rc.request_id = $1
      ORDER BY rc.created_at ASC
    `, [id]);

    res.json({ 
      success: true, 
      data: { ...result.rows[0], comments: comments.rows }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/requests', async (req, res) => {
  try {
    const { subject, description, request_type, equipment_id, requested_by_user_id, priority, scheduled_date } = req.body;

    if (!subject || !equipment_id || !requested_by_user_id || !request_type) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields'
      });
    }

    const stageResult = await pool.query("SELECT id FROM request_stages WHERE stage_name = 'New' LIMIT 1");
    const result = await pool.query(`
      INSERT INTO maintenance_requests 
      (subject, description, request_type, equipment_id, requested_by_user_id, stage_id, priority, scheduled_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [subject, description || null, request_type, equipment_id, requested_by_user_id, stageResult.rows[0].id, priority || 'medium', scheduled_date || null]);

    res.status(201).json({ success: true, message: 'Request created', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.patch('/api/requests/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const allowedFields = ['stage_id', 'assigned_to_user_id', 'priority', 'scheduled_date', 'duration_hours', 'notes'];
    const setClause = [];
    const values = [];
    let paramCount = 1;

    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        setClause.push(`${key} = $${paramCount}`);
        values.push(updates[key]);
        paramCount++;
      }
    });

    if (setClause.length === 0) {
      return res.status(400).json({ success: false, error: 'No valid fields to update' });
    }

    values.push(id);
    const result = await pool.query(`
      UPDATE maintenance_requests
      SET ${setClause.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramCount}
      RETURNING *
    `, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Request not found' });
    }

    res.json({ success: true, message: 'Request updated', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const totalEquip = await pool.query("SELECT COUNT(*) FROM equipment WHERE status = 'active'");
    const totalReq = await pool.query('SELECT COUNT(*) FROM maintenance_requests');
    const openReq = await pool.query("SELECT COUNT(*) FROM maintenance_requests mr JOIN request_stages rs ON mr.stage_id = rs.id WHERE rs.is_closed = false");
    const overdueReq = await pool.query('SELECT COUNT(*) FROM maintenance_requests WHERE is_overdue = true');
    const byPriority = await pool.query('SELECT priority, COUNT(*) as count FROM maintenance_requests GROUP BY priority');
    const byType = await pool.query('SELECT request_type, COUNT(*) as count FROM maintenance_requests GROUP BY request_type');

    res.json({
      success: true,
      data: {
        total_equipment: parseInt(totalEquip.rows[0].count),
        total_requests: parseInt(totalReq.rows[0].count),
        open_requests: parseInt(openReq.rows[0].count),
        overdue_requests: parseInt(overdueReq.rows[0].count),
        by_priority: byPriority.rows,
        by_type: byType.rows
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Error handlers
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ success: false, error: err.message });
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║   🛠️  GearGuard Real-time Tracker 🛠️         ║');
  console.log('╠════════════════════════════════════════════════╣');
  console.log(`║  Server: http://localhost:${PORT}                 ║`);
  console.log('║  Database: PostgreSQL                          ║');
  console.log('╚════════════════════════════════════════════════╝\n');
  
  // Auto-start simulator after 3 seconds
  setTimeout(() => {
    simulator.start();
  }, 3000);
});

// Graceful shutdown
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
  console.log('\n🛑 Shutting down...');
  simulator.stop();
  server.close(() => {
    pool.end(() => {
      console.log('✅ Shutdown complete');
      process.exit(0);
    });
  });
}

module.exports = { app, pool, simulator };
