const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizHeadS = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const QuizHeadModel = mongoose.model('quizHeads', QuizHeadS);

module.exports = QuizHeadModel;