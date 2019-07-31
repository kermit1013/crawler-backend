const express = require('express');
const commentService = require('../../services/comments/comment');
let router = express.Router();

router.get('/', commentService.getComments);

router.post('/', commentService.createComment);

router.put('/:id', commentService.editComment);

router.delete('/:id', commentService.deleteComment);

module.exports = router;