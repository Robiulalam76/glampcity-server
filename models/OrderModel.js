const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    totalPayment: {
        type: Number,
        required: true,
    },
    toalDiscount: {
        type: Number,
        required: false,
    },
    deliveryCharge: {
        type: Number,
        required: true,
    },
    store: {
        type: String,
        ref: "Store",
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    address: {
        type: String,
        ref: "Address",
        required: true
    },
    customer: {
        type: String,
        ref: "User",
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    products: [
        {
            name: String,
            productId: String,
            quantity: Number,
            price: Number,
        },
    ],
    shippingStatus: {
        type: String,
        enum: ['shopping soon', 'shipped', 'out for delivery', 'delivered'],
        default: 'shopping soon',
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order
