// controllers/requestController.js
const createRequest = async (req, res) => {
  const { subject, description, request_type, equipment_id, priority } = req.body;
  
  // This comes from your Auth Middleware (the logged-in user)
  const requested_by_user_id = req.user.id; 

  try {
    const result = await pool.query(
      `INSERT INTO maintenance_requests 
        (subject, description, request_type, equipment_id, requested_by_user_id, stage_id, priority, request_number) 
       VALUES 
        ($1, $2, $3, $4, $5, 
        (SELECT id FROM request_stages WHERE name = 'New' LIMIT 1), 
        $6, 
        'REQ-' || TO_CHAR(NOW(), 'YYYYMMDD-HH24MISS')) 
       RETURNING *`,
      [subject, description, request_type || 'Repair', equipment_id, requested_by_user_id, priority || 'medium']
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("DATABASE ERROR:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};