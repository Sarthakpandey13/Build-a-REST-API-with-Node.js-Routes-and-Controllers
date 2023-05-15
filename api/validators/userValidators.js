const { body, param } = require('express-validator');

exports.createUserValidator = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('phone').notEmpty().withMessage('Phone number is required')
]

exports.updateUserValidator = [
    param('id').notEmpty().withMessage('User ID is required'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('phone').notEmpty().withMessage('Phone number is required')
];

exports.getUserValidator = [
    param('id').notEmpty().withMessage('User ID is required')
];

exports.deleteUserValidator = [
    param('id').notEmpty().withMessage('User ID is required')
];