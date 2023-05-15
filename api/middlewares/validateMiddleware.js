const { body } = require('express-validator');

exports.validateSignUp = [


    body('email')
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email address.'),
    body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 6 }).withMessage('Password should be at least 6 characters long.'),
];

exports.validateLogin = [
    body('email')
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email address.'),
    body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 6 }).withMessage('Password should be at least 6 characters long.'),
];