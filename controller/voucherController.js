const Voucher = require("../models/Voucher");

const createVoucher = async (req, res) => {
    try {
        const newVoucher = new Voucher(req.body)
        const result = await newVoucher.save()
        if (result) {
            res.status(200).json({
                status: "success",
                message: "New Voucher Created",
                data: req.body,
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Data couldn't insert z",
            error: error.message,
        });
    }
}

// get all vouchers
const getAllVouchers = async (req, res) => {
    try {
        const result = await Voucher.find()
        if (result) {
            res.status(200).json({
                status: "success",
                message: "get all Vouchers",
                data: result,
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Data couldn't get",
            error: error.message,
        });
    }
}

// get all vouchers
const validateVoucher = async (req, res) => {
    try {
        const { voucher } = req.params
        console.log(voucher);

        if (voucher) {
            const getVoucher = await Voucher.findOne({ code: voucher })
            if (getVoucher) {
                res.status(200).json({
                    valid: true,
                    status: "success",
                    message: "Voucher Validation Successfully",
                    discount: getVoucher?.discount
                });
            }
            else {
                return res.status(200).json({
                    valid: false,
                    status: "error",
                    message: "Voucher Validation unsuccess",
                });
            }
        }
        else {
            return res.status(200).json({
                valid: false,
                status: "error",
                message: "please provide voucher code",
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Data couldn't get",
            error: error.message,
        });
    }
}


module.exports = {
    createVoucher,
    getAllVouchers,
    validateVoucher,
}