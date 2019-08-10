const express = require('express');
const Comment = require('../../models/category');


const createCategory = async (req, res, next) => {
    try {

        const {
            name
        } = req.body;


        if (name === undefined || name === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        const temp = {
            name: name
        }

        let newCategory = await Category.create(temp);

        if (newCategory) {
            return res.status(201).json({
                'message': 'category created successfully',
                'data': newCategory
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

const deleteCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id

        let isCategoryExists = await Category.findById(categoryId);

        if (!isCategoryExists) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No category found in the system'
            });
        }

        let delCategory = await Category.findByIdAndDelete(categoryId,);

        if (delCategory) {
            return res.status(201).json({
                'message': 'category deleted successfully',
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
    createCategory: createCategory,
    deleteCategory: deleteCategory
}