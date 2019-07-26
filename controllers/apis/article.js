const express = require('express');
const articleService = require('../../services/articles/article');
let router = express.Router();

router.get('/', articleService.getArticles);

router.get('/:id', articleService.getArticleById);

router.post('/', articleService.createArticle);

module.exports = router;