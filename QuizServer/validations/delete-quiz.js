const Validator = require('validator');
const isEmpty = require('./isempty');
module.exports = function validateDeleteQuiz(data) {
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