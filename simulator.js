// simulator.js - Real-time Maintenance Data Simulator
const { Pool } = require('pg');

class MaintenanceSimulator {
  constructor(pool) {
    this.pool = pool;
    this.isRunning = false;
    this.intervals = [];
  }

  // Random helper functions
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  randomBool(probability = 0.5) {
    return Math.random() < probability;
  }

  // Start the simulator
  start() {
    if (this.isRunning) {
      console.log('⚠️  Simulator already running');
      return;
    }

    console.log('\n🤖 Starting Real-time Data Simulator...\n');
    this.isRunning = true;

    // 1. Generate new breakdowns every 30-60 seconds
    this.intervals.push(
      setInterval(() => this.generateBreakdown(), this.randomInt(30, 60) * 1000)
    );

    // 2. Update request statuses every 20-40 seconds
    this.intervals.push(
      setInterval(() => this.updateRequestStatus(), this.randomInt(20, 40) * 1000)
    );

    // 3. Assign technicians every 15-30 seconds
    this.intervals.push(
      setInterval(() => this.assignTechnician(), this.randomInt(15, 30) * 1000)
    );

    // 4. Generate preventive maintenance every 2-3 minutes
    this.intervals.push(
      setInterval(() => this.generatePreventiveMaintenance(), this.randomInt(120, 180) * 1000)
    );

    // 5. Check for overdue requests every minute
    this.intervals.push(
      setInterval(() => this.checkOverdueRequests(), 60 * 1000)
    );

    // 6. Simulate equipment status changes every 1-2 minutes
    this.intervals.push(
      setInterval(() => this.changeEquipmentStatus(), this.randomInt(60, 120) * 1000)
    );

    // 7. Add random comments every 45-90 seconds
    this.intervals.push(
      setInterval(() => this.addRandomComment(), this.randomInt(45, 90) * 1000)
    );

    console.log('✅ Simulator started with 7 active processes');
    console.log('   → Generating breakdowns');
    console.log('   → Updating request statuses');
    console.log('   → Assigning technicians');
    console.log('   → Creating preventive maintenance');
    console.log('   → Checking overdue requests');
    console.log('   → Changing equipment status');
    console.log('   → Adding comments\n');
  }

  // Stop the simulator
  stop() {
    if (!this.isRunning) {
      console.log('⚠️  Simulator not running');
      return;
    }

    console.log('\n⏹️  Stopping Data Simulator...');
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals = [];
    this.isRunning = false;
    console.log('✅ Simulator stopped\n');
  }

  // 1. Generate random equipment breakdowns
  async generateBreakdown() {
    try {
      const breakdownScenarios = [
        { subject: 'Unusual grinding noise detected', description: 'Machine making loud grinding sounds during operation' },
        { subject: 'Equipment overheating warning', description: 'Temperature reading 20% above normal range' },
        { subject: 'Hydraulic pressure loss', description: 'Pressure gauge showing lower values, possible leak' },
        { subject: 'Motor starting failure', description: 'Equipment fails to power on' },
        { subject: 'Conveyor belt stoppage', description: 'Belt stopped moving, possible obstruction' },
        { subject: 'Network connectivity lost', description: 'Device unable to connect to network' },
        { subject: 'Software crash detected', description: 'Control software repeatedly crashing' },
        { subject: 'Abnormal vibration pattern', description: 'Unusual vibration detected, potential issue' },
        { subject: 'Power supply intermittent', description: 'Equipment experiencing power interruptions' },
        { subject: 'Display malfunction', description: 'Control panel not showing correct info' },
        { subject: 'Emergency stop activated', description: 'Safety system triggered, requires inspection' },
        { subject: 'Sensor calibration error', description: 'Sensors providing inconsistent readings' },
        { subject: 'Cooling system failure', description: 'Cooling fan not operating' },
        { subject: 'Oil leak detected', description: 'Hydraulic oil pooling under equipment' },
        { subject: 'Belt wear excessive', description: 'Drive belt showing severe wear' }
      ];

      const equipmentResult = await this.pool.query(
        `SELECT id, equipment_name FROM equipment WHERE status = 'active' ORDER BY RANDOM() LIMIT 1`
      );

      if (equipmentResult.rows.length === 0) return;

      const userResult = await this.pool.query(
        `SELECT id FROM users WHERE role IN ('user', 'manager') ORDER BY RANDOM() LIMIT 1`
      );

      if (userResult.rows.length === 0) return;

      const scenario = this.randomChoice(breakdownScenarios);
      const priorities = ['low', 'medium', 'high', 'critical'];
      const priority = this.randomChoice(priorities);

      const stageResult = await this.pool.query(
        `SELECT id FROM request_stages WHERE stage_name = 'New' LIMIT 1`
      );

      const result = await this.pool.query(`
        INSERT INTO maintenance_requests 
        (subject, description, request_type, equipment_id, requested_by_user_id, stage_id, priority)
        VALUES ($1, $2, 'corrective', $3, $4, $5, $6)
        RETURNING request_number, subject
      `, [
        scenario.subject,
        scenario.description,
        equipmentResult.rows[0].id,
        userResult.rows[0].id,
        stageResult.rows[0].id,
        priority
      ]);

      console.log(`🔧 NEW BREAKDOWN: ${result.rows[0].request_number} - ${result.rows[0].subject} [${priority.toUpperCase()}]`);

    } catch (error) {
      console.error('Error generating breakdown:', error.message);
    }
  }

  // 2. Update request statuses
  async updateRequestStatus() {
    try {
      const requestResult = await this.pool.query(`
        SELECT mr.id, mr.request_number, mr.stage_id, rs.stage_name, rs.stage_order
        FROM maintenance_requests mr
        JOIN request_stages rs ON mr.stage_id = rs.id
        WHERE rs.is_closed = false
        ORDER BY RANDOM()
        LIMIT 1
      `);

      if (requestResult.rows.length === 0) return;

      const request = requestResult.rows[0];

      if (request.stage_name === 'New') {
        const newStageResult = await this.pool.query(
          `SELECT id FROM request_stages WHERE stage_name = 'In Progress' LIMIT 1`
        );

        await this.pool.query(`
          UPDATE maintenance_requests 
          SET stage_id = $1, started_at = CURRENT_TIMESTAMP
          WHERE id = $2
        `, [newStageResult.rows[0].id, request.id]);

        console.log(`🔄 STATUS UPDATE: ${request.request_number} → In Progress`);

      } else if (request.stage_name === 'In Progress') {
        if (this.randomBool(0.7)) {
          const repairedStageResult = await this.pool.query(
            `SELECT id FROM request_stages WHERE stage_name = 'Repaired' LIMIT 1`
          );

          const durationHours = (Math.random() * 8 + 0.5).toFixed(2);

          await this.pool.query(`
            UPDATE maintenance_requests 
            SET stage_id = $1, completed_at = CURRENT_TIMESTAMP, duration_hours = $2
            WHERE id = $3
          `, [repairedStageResult.rows[0].id, durationHours, request.id]);

          console.log(`✅ COMPLETED: ${request.request_number} (Duration: ${durationHours}h)`);
        }
      }

    } catch (error) {
      console.error('Error updating request status:', error.message);
    }
  }

  // 3. Assign technicians
  async assignTechnician() {
    try {
      const requestResult = await this.pool.query(`
        SELECT mr.id, mr.request_number, mr.maintenance_team_id
        FROM maintenance_requests mr
        JOIN request_stages rs ON mr.stage_id = rs.id
        WHERE mr.assigned_to_user_id IS NULL 
        AND rs.stage_name = 'New'
        ORDER BY RANDOM()
        LIMIT 1
      `);

      if (requestResult.rows.length === 0) return;

      const request = requestResult.rows[0];

      const technicianResult = await this.pool.query(`
        SELECT u.id, u.full_name
        FROM users u
        JOIN team_members tm ON u.id = tm.user_id
        WHERE tm.team_id = $1 AND u.role = 'technician'
        ORDER BY RANDOM()
        LIMIT 1
      `, [request.maintenance_team_id]);

      if (technicianResult.rows.length === 0) return;

      await this.pool.query(`
        UPDATE maintenance_requests 
        SET assigned_to_user_id = $1
        WHERE id = $2
      `, [technicianResult.rows[0].id, request.id]);

      console.log(`👷 ASSIGNED: ${request.request_number} → ${technicianResult.rows[0].full_name}`);

    } catch (error) {
      console.error('Error assigning technician:', error.message);
    }
  }

  // 4. Generate preventive maintenance
  async generatePreventiveMaintenance() {
    try {
      const maintenanceTasks = [
        'Routine inspection and lubrication',
        'Quarterly maintenance check',
        'Annual safety inspection',
        'Filter replacement scheduled',
        'Calibration check required',
        'Preventive parts replacement',
        'System diagnostics and testing',
        'Cleaning and maintenance service'
      ];

      const equipmentResult = await this.pool.query(
        `SELECT id, equipment_name FROM equipment WHERE status = 'active' ORDER BY RANDOM() LIMIT 1`
      );

      if (equipmentResult.rows.length === 0) return;

      const managerResult = await this.pool.query(
        `SELECT id FROM users WHERE role = 'manager' ORDER BY RANDOM() LIMIT 1`
      );

      if (managerResult.rows.length === 0) return;

      const stageResult = await this.pool.query(
        `SELECT id FROM request_stages WHERE stage_name = 'New' LIMIT 1`
      );

      const task = this.randomChoice(maintenanceTasks);
      const daysAhead = this.randomInt(1, 14);
      const scheduledDate = new Date();
      scheduledDate.setDate(scheduledDate.getDate() + daysAhead);

      const result = await this.pool.query(`
        INSERT INTO maintenance_requests 
        (subject, description, request_type, equipment_id, requested_by_user_id, 
         stage_id, priority, scheduled_date)
        VALUES ($1, $2, 'preventive', $3, $4, $5, 'medium', $6)
        RETURNING request_number, subject
      `, [
        `${task} - ${equipmentResult.rows[0].equipment_name}`,
        `Scheduled preventive maintenance task`,
        equipmentResult.rows[0].id,
        managerResult.rows[0].id,
        stageResult.rows[0].id,
        scheduledDate
      ]);

      console.log(`📅 PREVENTIVE SCHEDULED: ${result.rows[0].request_number} (in ${daysAhead} days)`);

    } catch (error) {
      console.error('Error generating preventive maintenance:', error.message);
    }
  }

  // 5. Check overdue requests
  async checkOverdueRequests() {
    try {
      const result = await this.pool.query(`
        UPDATE maintenance_requests
        SET is_overdue = true
        WHERE scheduled_date < CURRENT_TIMESTAMP
        AND completed_at IS NULL
        AND is_overdue = false
        RETURNING request_number
      `);

      if (result.rows.length > 0) {
        result.rows.forEach(req => {
          console.log(`⚠️  OVERDUE: ${req.request_number}`);
        });
      }

    } catch (error) {
      console.error('Error checking overdue requests:', error.message);
    }
  }

  // 6. Change equipment status
  async changeEquipmentStatus() {
    try {
      const equipmentResult = await this.pool.query(
        `SELECT id, equipment_name, status FROM equipment ORDER BY RANDOM() LIMIT 1`
      );

      if (equipmentResult.rows.length === 0) return;

      const equipment = equipmentResult.rows[0];
      let newStatus;

      if (equipment.status === 'active') {
        if (this.randomBool(0.1)) {
          newStatus = 'maintenance';
        }
      } else if (equipment.status === 'maintenance') {
        if (this.randomBool(0.5)) {
          newStatus = 'active';
        }
      }

      if (newStatus) {
        await this.pool.query(
          `UPDATE equipment SET status = $1 WHERE id = $2`,
          [newStatus, equipment.id]
        );

        console.log(`🔧 EQUIPMENT STATUS: ${equipment.equipment_name} → ${newStatus.toUpperCase()}`);
      }

    } catch (error) {
      console.error('Error changing equipment status:', error.message);
    }
  }

  // 7. Add random comments
  async addRandomComment() {
    try {
      const comments = [
        'Parts have been ordered, waiting for delivery',
        'Diagnosed the issue, preparing to fix',
        'Waiting for team lead approval',
        'Initial inspection completed',
        'Found additional issues during inspection',
        'Repair in progress, estimated completion soon',
        'Testing after repair, monitoring performance',
        'Consulting with manufacturer support',
        'Replacement parts installed, running tests',
        'Follow-up inspection scheduled'
      ];

      const requestResult = await this.pool.query(`
        SELECT mr.id, mr.request_number, mr.assigned_to_user_id
        FROM maintenance_requests mr
        JOIN request_stages rs ON mr.stage_id = rs.id
        WHERE rs.stage_name = 'In Progress'
        AND mr.assigned_to_user_id IS NOT NULL
        ORDER BY RANDOM()
        LIMIT 1
      `);

      if (requestResult.rows.length === 0) return;

      const comment = this.randomChoice(comments);

      await this.pool.query(`
        INSERT INTO request_comments (request_id, user_id, comment)
        VALUES ($1, $2, $3)
      `, [
        requestResult.rows[0].id,
        requestResult.rows[0].assigned_to_user_id,
        comment
      ]);

      console.log(`💬 COMMENT ADDED: ${requestResult.rows[0].request_number}`);

    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  }

  // Get simulator status
  getStatus() {
    return {
      running: this.isRunning,
      activeProcesses: this.intervals.length
    };
  }
}

module.exports = MaintenanceSimulator;