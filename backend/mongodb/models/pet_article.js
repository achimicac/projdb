const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petArticleSchema = new Schema({
    petID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    articleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        require: true
    }
});

const petArticle = mongoose.model('petArticle', petArticleSchema);
module.exports = petArticle;