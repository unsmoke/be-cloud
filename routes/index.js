const express = require('express');
const testRoutes = require('./testRouter');

const router = express.Router();

router.use('/test', testRoutes);

module.exports = router;
