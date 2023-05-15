const mongoose = require('mongoose');

// Set up product schema and model
const productSchema = new mongoose.Schema({
    productName: String,
    productDescription: String,
    qty: String,
    price: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;