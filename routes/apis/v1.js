const articleController = require('../../controllers/apis/article');
const commentController = require('../../controllers/apis/comment')

const express = require('express');
let router = express.Router();
router.use('/articles', articleController);
router.use('/comments', commentController);
router.use('/categorys',categoryController)
module.exports = router;