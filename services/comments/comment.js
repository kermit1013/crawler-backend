const express = require('express');
const Comment = require('../../models/comment');

const getComments = async (req, res, next) => {
    try {

        let comments = await Comment.find({});

        if (comments.length > 0) {
            return res.status(200).json({
                'message': 'comments fetched successfully',
                'data': comments
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No comments found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const createComment = async (req, res, next) => {
    try {

        const {
            content
        } = req.body;

        if (content === undefined || content === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'content is required',
                'field': 'content'
            });
        }
        }


        const temp = {
            content: content
        }

        let newComment = await Comment.create(temp);

        if (newComment) {
            return res.status(201).json({
                'message': 'comment created successfully',
                'data': newComment
            });
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const editComment = async (req, res, next) => {
        const commentId = req.params.id;

        const {
            content
         } = req.body;


        const temp = {
            content: content
        };

        let isCommentExists = await Comment.findById(commentId);

        if (!isCommentExists) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No Comment found in the system'
            });
        }

        let updateComment = await Comment.findByIdAndUpdate(articleId, temp, {
            new: true
        });

        if (updateComment) {
            return res.status(200).json({
                'message': 'comment updated successfully',
                'data': updateComment
            });
        } else {
            throw new Error('something went worng');
        }
}

const deleteComment = async (req, res, next) => {
    try {
        const commentId = req.params.id

        let isCommentExists = await Comment.findById(commentId);

        if (!isCommentExists) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No comment found in the system'
            });
        }

        let delComment = await Comment.findByIdAndDelete(commentId,);

        if (delComment) {
            return res.status(201).json({
                'message': 'comment deleted successfully',
            });
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

module.exports = {
    getComment: getComments,
    createComment: createComment,
    editComment: editComment,
    deleteComment: deleteComment
}