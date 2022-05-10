const Validator = require('validator');
const isEmpty = require('./isempty');
const validateQuestion = require('../validations/question');

module.exports = function validateCreateQuiz(data) {
    let errors = {};
    data.quizId = !isEmpty(data.quizId) ? data.quizId : '';


    if(Validator.isEmpty(data.quizId)) {
        errors.quizId = 'quizId is required';
    }
 
    return {
        errors,
        isValid: isEmpty(errors)
    }
}