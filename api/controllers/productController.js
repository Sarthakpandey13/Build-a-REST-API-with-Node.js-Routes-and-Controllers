const Product = require('../models/product');
const express = require('express');
const router = express.Router();

// const { createProductValidator, updateProductValidator, getProductValidator, deleteProductValidator } = require('../validators/productValidator');


module.exports = {

    async createProduct(req, res) {
        try {
            const user = new Product(req.body);
            await user.save();
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    },



    async updateProduct(req, res) {
        console.log("request recieved")
        try {
            const productId = req.params.id;
            const updateFields = req.body;
            const updatedProduct = await Product.findByIdAndUpdate(productId, updateFields, {
                new: true,
            });
            res.send(updatedProduct);
        } catch (error) {
            console.error(`Error updating product: ${error}`);
            res.status(400).send(`Error updating product: ${error}`);
        }
    },


    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByIdAndDelete(id);
            res.status(200).json({ success: true, product });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    },
    async getProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);
            res.status(200).json({ success: true, product });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Server errors' });
        }
    }
}