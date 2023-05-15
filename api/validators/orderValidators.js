const { body, param } = require('express-validator');

exports.createOrderValidator = [
    body('customerId').notEmpty().withMessage('Customer ID is required'),
    body('productId').notEmpty().withMessage('Product ID is required')
];

exports.updateOrderValidator = [
    param('id').notEmpty().withMessage('Order ID is required'),
    body('orderStatus').notEmpty().withMessage('Order status is required')
];

exports.getOrderValidator = [
    param('id').notEmpty().withMessage('Order ID is required')
];

exports.deleteOrderValidator = [
    param('id').notEmpty().withMessage('Order ID is required')
];