const mongoose = require("mongoose");


const storeChatSchema = new mongoose.Schema(
    {
        members: {
            type: Array
        }
    },
    {
        timestamps: true,
    }
);

const StoreChat = mongoose.model("StoreChat", storeChatSchema);
module.exports = StoreChat;
