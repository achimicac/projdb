const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    username: {
        type: String,
        required: true,
        unique: true
    },
    pw: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    pfp: {
        data: Buffer,
        contentType: String
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
