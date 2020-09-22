const userRoutes = require('./user.route');
const express = require('express');
const router = express.Router();

router.use('/user', userRoutes);

module.exports = router;
