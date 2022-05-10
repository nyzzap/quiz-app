const Validator = require('validator');
const isEmpty = require('./isempty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }
    if(!Validator.isLength(data.name, { min: 2, max: 50 })) {
        errors.name = 'Name must be between 2 to 50 chars';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }
    if(!Validator.isLength(data.password, {min: 2, max: 50})) {
        errors.password = 'Password must have 2 chars & max 50';
    }

    if(Validator.isEmpty(data.password_confirm)) {
        errors.password_confirm = 'Password is required';
    }
    if(!Validator.isLength(data.password_confirm, {min: 2, max: 50})) {
        errors.password_confirm = 'Password must have 2 chars & max 50';
    }
    if(!Validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = 'Password and Confirm Password must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}