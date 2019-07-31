let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Comment = new Schema({
    content: {
        type: String,
        required : [ true, 'content is required'],
        unique : true,
        articleId : id,
        lowercase : true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', Comment);