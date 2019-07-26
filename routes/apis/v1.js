const articleController = require('../../controllers/apis/article');

const express = require('express');
let router = express.Router();
router.use('/articles', articleController);
module.exports = router;