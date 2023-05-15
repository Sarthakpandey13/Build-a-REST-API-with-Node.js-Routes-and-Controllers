const mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    password: { type: String, required: true }
})

module.exports = mongoose.model('login', loginSchema);