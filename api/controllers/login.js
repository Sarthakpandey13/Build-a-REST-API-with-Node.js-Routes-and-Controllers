const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User1 = require('../models/login');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { authSchema } = require('../helpers/validation_schema')
const createError = require('http-errors')
const client = require('../helpers/init_redis');

module.exports.register = async(req, res, next) => {
        try {
            const result = await authSchema.validateAsync(req.body)
            const doesExist = await User1.findOne({ email: result.email })
            if (doesExist) {
                throw createError.Conflict(`${result.email} is already registered`)
            }

            // Hash the user's password
            const hashedPassword = await bcrypt.hash(req.body.password, 10)

            // Create a new user document
            const user = new User1({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hashedPassword,
            })

            // Save the user document to the database
            await user.save()

            // Store the user's credentials in Redis
            const redisKey = user.email;
            const redisValue = hashedPassword;
            await client.set(redisKey, redisValue);

            // Return a 201 Created response
            res.status(201).json({ message: "User created" })
        } catch (error) {
            if (error.isJoi === true) {
                // Return a 422 Unprocessable Entity response with the error message
                return res.status(422).json({ error: error.message })
            }
            next(error)
        }
    },

    module.exports.login = async(req, res, next) => {
        try {
            const user = await User1.findOne({ email: req.body.email }).exec()
            if (!user) {
                return res.status(404).json({
                    message: "Email not found. User does not exist."
                })
            }

            // Check if password matches
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if (!isMatch) {
                return res.status(401).json({
                    message: "Authentication failed"
                })
            }

            // Get user's hashed password from Redis
            const hashedPassword = await client.get(user.email)
            if (!hashedPassword) {
                return res.status(401).json({
                    message: "Authentication failed"
                })
            }

            // Compare the user's hashed password with the hashed password in Redis
            const isPasswordMatch = await bcrypt.compare(req.body.password, hashedPassword)
            if (!isPasswordMatch) {
                return res.status(401).json({
                    message: "Authentication failed"
                })
            }

            // If authentication is successful, generate JWT token and send it in the response
            const token = jwt.sign({
                email: user.email,
                userId: user._id,
            }, process.env.JWT_KEY, {
                expiresIn: "1h"
            })

            return res.status(200).json({
                message: "Authentication successful",
                token: token,
                "username": user,
            })

        } catch (error) {
            next(error)
        }

    }