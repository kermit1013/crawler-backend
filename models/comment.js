let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Comment = new Schema({
    articleId: {
        type: String,
        required : [ true, 'articleId is required'],
        unique : true,
        lowercase : true
    },
    content: {
        type: String,
        required : [ true, 'content is required'],
        lowercase : true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', Comment);