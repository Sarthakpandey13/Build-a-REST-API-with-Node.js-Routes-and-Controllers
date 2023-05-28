const express = require('express');
const router = express.Router();
const { createUserValidator, updateUserValidator, getUserValidator, deleteUserValidator } = require('../validators/userValidators');
const { ResponseBody, sendResponse } = require('../../lib/SendResponse');
const User = require('../models/user');


module.exports = {
    async createUser(req, res) {
        const user = new User(req.body);
        const deviceType = req.header('device-type');

        if (user) {
            const responseBody = new ResponseBody(201, 'User Created successfully', user);
            user.save();
            // Send the response with the appropriate headers
            res.status(responseBody.statusCode)
                .header('device-type', deviceType)
                .json(responseBody);
        } else {
            // Handle the case when user is null
            res.status(404).send('User not found');
        }

    },
    // async updateUser(req, res) {
    //     try {
    //         console.log('Starting updateUser');

    //         const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //             new: true,
    //         });

    //         console.log('User found:', user);

    //         if (user) {
    //             const responseBody = new ResponseBody(201, 'User updated successfully', user);
    //             res.status(responseBody.statusCode).json(responseBody);
    //         } else {
    //             res.status(404).send('User not found');
    //         }
    //     } catch (error) {
    //         console.error('Error during updateUser:', error);
    //         res.status(500).send('Internal Server Error');
    //     }
    // },

    async updateUser(req, res) {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, });

        if (user) {
            const responseBody = new ResponseBody(201, 'User updated successfully', user);
            // Send the response with the appropriate headers
            res.status(responseBody.statusCode)
                .json(responseBody);
        } else {
            // Handle the case when user is null
            res.status(404).send('User not found');
        }
    },

    async deleteUser(req, res) {

        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            const responseBody = new ResponseBody(201, 'User deleted successfully', user);
            // Send the response with the appropriate headers
            res.status(responseBody.statusCode)
                .json(responseBody);
        } else {
            // Handle the case when user is null
            res.status(404).send('User not found');
        }
    },

    async getUser(req, res) {
        const user = await User.findById(req.params.id);
        if (user) {
            const responseBody = new ResponseBody(201, 'User Find successfully', user);
            // Send the response with the appropriate headers
            res.status(responseBody.statusCode)
                .json(responseBody);
        } else {
            // Handle the case when user is null
            res.status(404).send('User not found');
        }

    }
};