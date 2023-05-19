const { default: mongoose } = require("mongoose");

const offerSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    storeId: {
        type: String,
        required: true
    },
    buyerId: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        default: "1",
        required: false
    },
    description: {
        type: String,
        required: true,
    },
    requestType: {
        type: String,
        enum: ["store", "buyer"],
        required: true
    },
    show: {
        type: String,
        enum: ["true", "false"],
        default: "true",
        required: true
    },
    status: {
        type: String,
        enum: ["true", "false"],
        default: "false",
        required: true
    },
    approved: {
        type: String,
        enum: ["true", "false"],
        default: "false",
        required: true
    },
},
    {
        timestamps: true
    }
);


const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;