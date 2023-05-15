const Order = require('../models/orders');
const express = require('express');
const router = express.Router();
// const { createOrderValidator, updateOrderValidator, getOrderValidator, deleteOrderValidator } = require('../validators/orderValidator');

module.exports = {


    async createOrder(req, res) {
        try {
            const order = new Order(req.body);
            await order.save();
            res.status(201).send(order);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    async updateOrder(req, res) {


        try {
            const order = await Order.findByIdAndUpdate(
                req.body.id,
                req.body, { new: true }
            );
            res.send(order);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    async getOrder(req, res) {
        try {
            const order = await Order.findById(req.params.id)
                .populate('customerId')
                .populate('productId');
            res.send(order);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    async deleteOrder(req, res) {
        try {
            const order = await Order.findByIdAndDelete(req.params.id);
            res.send(order);
        } catch (error) {
            res.status(400).send(error);
        }
    }
};