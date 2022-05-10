const Validator = require('validator');
const isEmpty = require('./isempty');

module.exports = function validateQuestion(data) {
    let errors = {};
    data.text = !isEmpty(data.text) ? data.text : '';
    data.type = !isEmpty(data.type) ? data.type : '';

    if(Validator.isEmpty(data.text)) {
        errors.text = 'Text is required';
    }

    if(!data.type && data.type != 0) {
        errors.type = 'type is required';
    }else{
        if(data.type == 1){
            if(!data.options) {
                errors.options = 'options are required';
            }else{
                if((Object.keys(data.options).length) < 2 
                    || (Object.keys(data.options).length)> 10) {
                    errors.options = 'All Question (Choice) must have 2 & max 10 options';
                }
                else{
                    var countCorrectOption = 0;
                    for (let i = 0; i < (Object.keys(data.options).length); i++) {
                        if (Validator.isEmpty(data.options[i].text)) {
                            errors.options = 'All Text Description in Options are required';
                            break; 
                        }
                      if( data.options[i].isCorrect ){
                        countCorrectOption+=1;
                      }
                    }
                    if(isEmpty(errors.options) && countCorrectOption != 1 ){
                        errors.options = 'The question need ONE correct option marked';
                    }
                }
            }
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}