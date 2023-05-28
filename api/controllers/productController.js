const Product = require('../models/product');
const express = require('express');
const router = express.Router();
const { ResponseBody, sendResponse } = require('../../lib/SendResponse');
const client = require('../helpers/init_redis');
client.debug_mode = true;


module.exports = {

    async createProduct(req, res) {
        const product = new Product(req.body);
        const deviceType = req.header('device-type');
        if (product) {
            const responseBody = new ResponseBody(201, 'Product Created successfully', product);
            product.save();
            console.log(deviceType)
                // Send the response with the appropriate headers
            res.status(responseBody.statusCode)
                .set('device-type', deviceType)
                .json(responseBody);
        } else {
            // Handle the case when user is null
            res.status(404).send('Product not found');
        }

    },



    async updateProduct(req, res) {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, });
        const deviceType = req.header('device-type');
        if (product) {
            const responseBody = new ResponseBody(201, 'Product Created successfully', product);
            // Send the response with the appropriate headers
            res.status(responseBody.statusCode)
                .header('device-type', deviceType)
                .json(responseBody);
        } else {
            // Handle the case when user is null
            res.status(404).send('Product not found');
        }
    },


    async deleteProduct(req, res) {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (product) {
            const responseBody = new ResponseBody(201, 'User deleted successfully', product);
            // Send the response with the appropriate headers
            res.status(responseBody.statusCode).json(responseBody);
        } else {
            // Handle the case when user is null
            res.status(404).send('product not found');
        }
    },
    // async getProduct(req, res) {
    //     const product = await Product.findById(req.params.id);
    //     if (product) {
    //         const responseBody = new ResponseBody(201, 'User deleted successfully', product);
    //         // Send the response with the appropriate headers
    //         res.status(responseBody.statusCode).json(responseBody);
    //     } else {
    //         // Handle the case when user is null
    //         res.status(404).send('product not found');
    //     }

    // }
    async getProduct(req, res) {

        const key = req.params.id;
        try {
            const cachedResult = await client.get(key);
            if (cachedResult) {
                console.log('Data from cache.');
                console.log(cachedResult);
                const productData = JSON.parse(cachedResult);
                const responseBody = new ResponseBody(200, 'Product retrieved successfully', productData);
                res.status(responseBody.statusCode).json(responseBody);
            } else {
                // Product data not found in Redis, fetch it from the database
                const product = Product.findById(productId);
                if (product) {
                    console.log("error3");
                    // Store product data in Redis for future use
                    client.set(`product:${productId}`, JSON.stringify(product));

                    const responseBody = new ResponseBody(200, 'Product retrieved successfully', product);
                    res.status(responseBody.statusCode).json(responseBody);
                } else {
                    res.status(404).send('Product not found');
                }
            }

        } catch (error) {
            console.error('Something happened to Redis', error);
            res.status(500).send('Internal Server Error');
        }


    }
}