const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema(
    {
        title: {
            type: String
        },
        code: {
            type: String
        },
        discount: {
            type: String
        },
        expireDate: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
    },

    {
        timestamps: true,
    }
);

const Voucher = mongoose.model("Voucher", voucherSchema);

module.exports = Voucher;
