const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const procSchema = new Schema({
    procName: {
        type: String,
        required: true
    },
    petType: {
        type: String, 
        required: true
    },
    forAgeStart: {
        type: String,
    },
    forAgeEnd: {
        type: String,
    },
    forGender: {
        type: String,
        required: true
    },
    frequent: {
        type: Date,
        required: true
    },
    vacID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vaccine',
        required: true
    }
});

const Procedural = mongoose.model('Procedural', procSchema);
module.exports = Procedural;