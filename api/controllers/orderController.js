const Order = require('../models/orders');
const express = require('express');
const router = express.Router();
const { ResponseBody, sendResponse } = require('../../lib/SendResponse');

// const { createOrderValidator, updateOrderValidator, getOrderValidator, deleteOrderValidator } = require('../validators/orderValidator');

module.exports = {


    async createOrder(req, res) {

        const order = new Order(req.body);
        await order.save();

        if (order) {
            const responseBody = new ResponseBody(201, 'order Created successfully', order);
            // Send the response with the appropriate headers
            res.status(responseBody.statusCode)
                .json(responseBody);
        } else {
            // Handle the case when user is null
            res.status(404).send('order not found');
        }
    },

    async updateOrder(req, res) {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (order) {
            const responseBody = new ResponseBody(201, 'order updated successfully', order);
            // Send the response with the appropriate headers
            res.status(responseBody.statusCode)
                .json(responseBody);
        } else {
            // Handle the case when user is null
            res.status(404).send('order not found');
        }
    },

    async getOrder(req, res) {
        const order = await Order.findById(req.params.id)
            .populate('customerId')
            .populate('productId');
        if (order) {
            const responseBody = new ResponseBody(201, 'Order fetched successfully', order);
            // Send the response with the appropriate headers
            res.status(responseBody.statusCode)
                .json(responseBody);
        } else {
            // Handle the case when user is null
            res.status(404).send('order not found');
        }
    },

    async deleteOrder(req, res) {

        const order = await Order.findByIdAndDelete(req.params.id);
        if (order) {
            const responseBody = new ResponseBody(201, 'order deleted successfully', order);
            // Send the response with the appropriate headers
            res.status(responseBody.statusCode)
                .json(responseBody);
        } else {
            // Handle the case when user is null
            res.status(404).send('order not found');
        }
    }
};