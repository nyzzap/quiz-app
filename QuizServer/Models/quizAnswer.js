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
const AnswerS = new Schema({
    textQ: {
        type: String,
        required: true
    }, 
    typeQ: {
        type: Boolean,
        required: true
    },
    optionsQ: {
        type: [OptionS],
        required: false 
    },
    text: {
        type: String,
        required: true
    },
    success: {
        type: Boolean,
        default: false
    }
});
const QuizAnswerS = new Schema({
    playerName: {
        type: String,
        required: true
    }, 
    playerId: {
        type: String,
        required: true
    }, 
    authorName: {
        type: String,
        required: true
    }, 
    authorId: {
        type: String,
        required: true
    }, 
    quizId: {
        type: String,
        required: true
    }, 
    quizTitle: {
        type: String,
        required: true
    }, 
    Answers: {
        type: [AnswerS],
        required: true 
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const QuizAnswerModel = mongoose.model('quizAnswers', QuizAnswerS);

module.exports = QuizAnswerModel;