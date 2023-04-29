const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema(
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
        description: {
            type: String,
            required: false,
        },
        price: {
            type: String,
            required: true,
            default: 0,
        },
        images: {
            type: [String],
            required: true,
        },
    },

    {
        timestamps: true,
    }
);

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = Wishlist;
