const mongoose = require("mongoose");

const CartProductSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true
        },
        sku: {
            type: String,
            required: false,
        },
        title: {
            type: String,
            required: false,
        },
        unit: {
            type: String,
            required: false,
        },
        userId: { type: String, required: true },
        description: {
            type: String,
            required: false,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        image: {
            type: String,
            required: true,
        },
    },

    {
        timestamps: true,
    }
);

const CartProduct = mongoose.model("CartProduct", CartProductSchema);

module.exports = CartProduct;
