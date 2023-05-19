const mongoose = require("mongoose");

const CartProductSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: false,
        },
        userId: { type: String, required: true },
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
