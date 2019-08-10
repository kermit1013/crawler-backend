let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Category = new Schema({
    name: {
        type: String,
        required : [ true, 'category is required'],
        lowercase : true
    },
    articleId: {
        type: String,
        required : [ true, 'articleId is required'],
        unique : true,
        lowercase : true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', Category);