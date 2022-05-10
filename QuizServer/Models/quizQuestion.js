const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OptionS = new Schema({
    text: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: false
    }
});
const QuizQuestionS = new Schema({
    text: {
        type: String,
        required: true
    },
    type: {
        type: Boolean,
        required: true
    },
    qizHeadId: {
        type: String,
        required: true
    },
    options: {
        type: [OptionS],
        required: false 
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const QuizQuestionModel = mongoose.model('quizQuestions', QuizQuestionS);

module.exports = QuizQuestionModel;