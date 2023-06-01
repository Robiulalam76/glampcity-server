const mongoose = require("mongoose");

const CartProductSchema = new mongoose.Schema(
    {
        product: {
            type: String,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        user: {
            type: String,
            ref: "User",
            required: true
        },
        store: {
            type: String,
            ref: "Store",
            required: true
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        }
    },

    {
        timestamps: true,
    }
);

const CartProduct = mongoose.model("CartProduct", CartProductSchema);

module.exports = CartProduct;
