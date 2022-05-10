const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserS = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model('users', UserS);

module.exports = UserModel;