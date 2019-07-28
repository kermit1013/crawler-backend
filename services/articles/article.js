const express = require('express');
const Article = require('../../models/article');

const getArticles = async (req, res, next) => {
    try {

        let articles = await Article.find({});

        if (articles.length > 0) {
            return res.status(200).json({
                'message': 'articles fetched successfully',
                'data': articles
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No articles found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const getArticleById = async (req, res, next) => {
    try {
        let article = await Article.findById(req.params.id);
        if (article) {
            return res.status(200).json({
                'message': `article with id ${req.params.id} fetched successfully`,
                'data': article
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No articles found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const createArticle = async (req, res, next) => {
    try {

        const {
            subject,
            content
        } = req.body;

        if (subject === undefined || subject === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'subject is required',
                'field': 'subject'
            });
        }

        if (content === undefined || content === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'content is required',
                'field': 'content'
            });
        }


        let iscontentExists = await Article.findOne({
            "content": content
        });

        if (iscontentExists) {
            return res.status(409).json({
                'code': 'ENTITY_ALREAY_EXISTS',
                'description': 'content already exists',
                'field': 'content'
            });
        }

        const temp = {
            subject: subject,
            content: content
        }

        let newArticle = await Article.create(temp);

        if (newArticle) {
            return res.status(201).json({
                'message': 'article created successfully',
                'data': newArticle
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

const editArticle = async (req, res, next) => {
        const articleId = req.params.id;

        const {
            subject,
            content
         } = req.body;


        const temp = {
            subject: subject,
            content: content
        };

        let isArticleExists = await Article.findById(articleId);

        if (!isArticleExists) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No article found in the system'
            });
        }

        let updateArticle = await Article.findByIdAndUpdate(articleId, temp, {
            new: true
        });

        if (updateArticle) {
            return res.status(200).json({
                'message': 'article updated successfully',
                'data': updateArticle
            });
        } else {
            throw new Error('something went worng');
        }
}

const deleteArticle = async (req, res, next) => {
    try {
        const articleId = req.params.id

        let isArticleExists = await Article.findById(articleId);

        if (!isArticleExists) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No article found in the system'
            });
        }

        let delArticle = await Article.findByIdAndDelete(articleId,);

        if (delArticle) {
            return res.status(201).json({
                'message': 'article deleted successfully',
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
    getArticles: getArticles,
    getArticleById: getArticleById,
    createArticle: createArticle,
    editArticle: editArticle,
    deleteArticle: deleteArticle
}