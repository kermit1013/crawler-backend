let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Article = new Schema({
    subject: {
        type: String,
        required : [ true, 'subject is required'],
        lowercase : true
    },
    content: {
        type: String,
        required : [ true, 'content is required'],
        unique : true,
        lowercase : true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Article', Article);