const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        default: 'No description'
    },
    petType: {
        type: String,
        required: true
    },
    articleLink: {
        type: String,
        required: true
    },
    articlePfp: {
        data: Buffer,
        contentType: String
    }
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;