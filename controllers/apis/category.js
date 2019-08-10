const express = require('express');
const commentService = require('../../services/categories/category');
let router = express.Router();


router.post('/', categoryService.createCategory);

router.delete('/:id', categoryService.deleteCategory);

module.exports = router;