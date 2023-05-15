const express = require('express');
const router = express.Router();
const { createUserValidator, updateUserValidator, getUserValidator, deleteUserValidator } = require('../validators/userValidators');

const User = require('../models/user');


module.exports = {
    async createUser(req, res) {
        console.log("request received");
        try {
            const user = new User(req.body);
            const a = req.header['device-type'];
            console.log(a);
            await user.save();
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.body.id, req.body, {
                new: true,
            });
            res.send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    async getUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            res.send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    },
};