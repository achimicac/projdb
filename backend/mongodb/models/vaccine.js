const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vaccineSchema = new Schema({
    vacName: {
        type: String,
        required: true
    },
    disease: {
        type: String,
        required: true
    }
});

const Vaccine = mongoose.model('Vaccine', vaccineSchema);
module.exports = Vaccine;