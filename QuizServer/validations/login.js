const Validator = require('validator');
const isEmpty = require('./isempty');

module.exports = function validateLoginInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name is required';
    }
    if(!Validator.isLength(data.name, {min: 2, max: 50})) {
        errors.name = 'Name must have 2 & max 50 chars';
    }
    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }
    if(!Validator.isLength(data.password, {min: 2, max: 50})) {
        errors.password = 'Password must have 2 & max 50 chars';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}