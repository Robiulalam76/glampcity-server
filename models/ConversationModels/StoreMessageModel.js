const mongoose = require("mongoose");

const StoreMessageSchema = new mongoose.Schema(
    {
        storeId: {
            type: String,
            required: true,
        },
        chatId: {
            type: String,
            required: true
        },
        senderId: {
            type: String,
            required: true,
        },
        members: {
            type: Array,
            required: true,
        },
        productId: {
            type: String,
            required: false,
        },
        text: {
            type: String,
            required: true,
        },
        questions: {
            type: Array,
            required: false,
        },
        // attachment: {
        //     type: String,
        //     required: false,
        // },

    },
    {
        timestamps: true
    }
)

const StoreMessage = mongoose.model("StoreMessage", StoreMessageSchema)
module.exports = StoreMessage;