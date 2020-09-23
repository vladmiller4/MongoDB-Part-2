const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article');

router.post('/', articleController.createArticle);

router.put('/:articleId', articleController.updateArticle);

router.get('/', articleController.getArticles);

router.delete('/:articleId', articleController.deleteArticle);

module.exports = router;