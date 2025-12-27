// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
// routes/dashboardRoutes.js
router.post('/requests', createRequest);

router.get('/stats', getDashboardStats);

module.exports = router;