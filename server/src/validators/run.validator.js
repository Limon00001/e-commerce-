// External Dependencies
const { validationResult } = require('express-validator');
const { errorResponse } = require('../controllers/response.controllers');

// 
const runValidation = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, {
                statusCode: 400,
                message: errors.errors[0].msg
            });
        }
        return next();
    } catch (error) {
        return next(error);
    }
};

// Module exports
module.exports = runValidation;