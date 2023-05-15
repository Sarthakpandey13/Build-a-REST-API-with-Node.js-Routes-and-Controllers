const { body, param } = require('express-validator');

exports.createProductValidator = [
    body('productName').notEmpty().withMessage('Product name is required'),
    body('productDescription').notEmpty().withMessage('Product description is required'),
    body('qty').notEmpty().withMessage('Product quantity is required'),
    body('price').notEmpty().withMessage('Product price is required')
];

exports.updateProductValidator = [
    param('id').notEmpty().withMessage('Product ID is required'),
    body('productName').notEmpty().withMessage('Product name is required'),
    body('productDescription').notEmpty().withMessage('Product description is required'),
    body('qty').notEmpty().withMessage('Product quantity is required'),
    body('price').notEmpty().withMessage('Product price is required')
];

exports.getProductValidator = [
    param('id').notEmpty().withMessage('Product ID is required')
];

exports.deleteProductValidator = [
    param('id').notEmpty().withMessage('Product ID is required')
];