const Validator = require('validator');
const isEmpty = require('./isempty');
const validateQuestion = require('../validations/question');

module.exports = function validateCreateQuiz(data) {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : '';
    data.description = !isEmpty(data.description) ? data.description : '';


    if(Validator.isEmpty(data.title)) {
        errors.title = 'title is required';
    }
    if(Validator.isEmpty(data.description)) {
        errors.description = 'description is required';
    }
    if(!data.questions) {
        errors.questions = 'questions is required';
    }else{
        if(data.questions.lenght < 1 || data.questions.lenght > 50) {
            errors.questions = 'Quiz must have 1 & max 50 questions';
        }
        else{
            for (let i = 0; i < (Object.keys(data.questions).length); i++) {
                const  {errors: errorsQ, isValid: isValidQ } = validateQuestion(data.questions[i]);
                if(!isValidQ){
                    errors.questions =
                   (!isEmpty(errorsQ.text) ? errorsQ.text  : '') + " " +
                    (!isEmpty(errorsQ.type) ? errorsQ.type  : '' )+ " " +
                    (!isEmpty(errorsQ.options) ? errorsQ.options  : '') + " ";
                    break;
                }
            }
        }
    }
 
    return {
        errors,
        isValid: isEmpty(errors)
    }
}