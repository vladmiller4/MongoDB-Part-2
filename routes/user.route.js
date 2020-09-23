const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/', userController.createUser);

router.put('/:userId', userController.updateUser);

router.get('/:userId', userController.getUser);

router.delete('/:userId', userController.deleteUser);

router.get('/:userId/articles', userController.getUserArticles);

module.exports = router;