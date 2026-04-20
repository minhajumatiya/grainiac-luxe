const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        name: { type: String, required: true },
        mobile: { type: String, required: true }
    },
    address: { type: String, required: true },
    items: [{
        name: String,
        price: Number,
        imageUrl: String,
        selectedSize: String,
        quantity: { type: Number, default: 1 }
    }],
    totalAmount: Number,
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);