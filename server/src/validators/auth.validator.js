// External Dependencies
const { body } = require('express-validator');

// Registration
const registerValidationRules = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required.')
        .isLength({ max: 31, min: 3 })
        .withMessage('Name must be at least 3 characters long.'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Invalid email address. Please enter your valid email address.'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required.')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'),
    body('address')
        .trim()
        .notEmpty()
        .withMessage('Address is required.')
        .isLength({ min: 3 })
        .withMessage('Address must be at least 3 characters long'),
    body('phone')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required.')
        .isLength({ min: 11, max: 11 })
        .withMessage('Phone number must be 11 characters long.'),
    // For String Type image
    // body('image')
    //     .optional()
    //     .isString()
    //     .withMessage('Invalid image format. Please upload a valid image file.'),
    // For Buffer Type image
    body('image')
        .custom((value, { req }) => {
            if (!req.file || !req.file.buffer) throw new Error('Image is required.');
            return true;
        })
        .withMessage('Invalid image format. Please upload a valid image file.')
];

// Module Exports
module.exports = { registerValidationRules };