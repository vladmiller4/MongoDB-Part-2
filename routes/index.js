const userRoutes = require('./user.route');
const articleRoutes = require('./article.route');
const express = require('express');
const router = express.Router();

router.use('/users', userRoutes);
router.use('/articles', articleRoutes);

module.exports = router;
