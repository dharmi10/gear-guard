// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();

// ADD createRequest to the import list below
const { getDashboardStats, createRequest } = require('../controllers/dashboardController');

// Now this will work because createRequest is defined
router.post('/requests', createRequest);

router.get('/stats', getDashboardStats);

module.exports = router;
// In your dashboardRoutes.js
router.put('/requests/:id', async (req, res) => {
    const { id } = req.params;
    const { stage } = req.body;
    try {
        await pool.query("UPDATE maintenance_requests SET stage = $1 WHERE id = $2", [stage, id]);
        res.json({ message: "Stage updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});