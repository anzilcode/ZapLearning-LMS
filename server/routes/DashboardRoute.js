const express = require('express');
const { getDashboardMetrics } = require('../controllers/DashboardController');

const router = express.Router();

router.get('/', getDashboardMetrics);

module.exports = router;
