const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const checkAuth = require('../helpers/authMiddleware');

router.post('/createUser', checkAuth, userController.createUser);
router.post('/updateUser/:id', checkAuth, userController.updateUser);
router.get('/deleteUser/:id', checkAuth, userController.deleteUser);
router.get('/getUser/:id', checkAuth, userController.getUser);

console.log('routere recached server');
// Product routes
router.post('/createProduct', checkAuth, productController.createProduct);
router.post('/updateProduct/:id', checkAuth, productController.updateProduct);
router.get('/deleteProduct/:id', checkAuth, productController.deleteProduct);
router.get('/getProduct/:id', checkAuth, productController.getProduct);


router.post('/createOrder', checkAuth, orderController.createOrder);
router.post('/updateOrder/:id', checkAuth, orderController.updateOrder);
router.get('/getOrder/:id', checkAuth, orderController.getOrder);
router.get('/deleteOrder/:id', checkAuth, orderController.deleteOrder);

module.exports = router;