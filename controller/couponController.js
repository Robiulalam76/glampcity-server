const Coupon = require('../models/Coupon');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const Admin = require('../models/Admin');
const User = require('../models/User');
dayjs.extend(utc);

const addCoupon = async (req, res) => {
    try {
        const newCoupon = new Coupon(req.body);
        await newCoupon.save();
        res.send({ message: 'Coupon Added Successfully!' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


const addAllCoupon = async (req, res) => {
    try {
        await Coupon.insertMany(req.body);
        res.status(200).send({
            message: 'Coupon Added successfully!',
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};



// get all vouchers
const validateCoupon = async (req, res) => {
    try {
        const { coupon, price } = req.params;

        if (coupon) {
            const getCoupon = await Coupon.findOne({ couponCode: coupon })
            const currentDate = new Date();

            if (getCoupon) {
                const getPriceValidate = await Coupon.findOne({
                    couponCode: coupon,
                    minimumAmount: { $lte: price }, // Check if the minimum amount requirement is met
                });
                if (getPriceValidate) {
                    const getEndTimeValidate = await Coupon.findOne({
                        couponCode: coupon,
                        endTime: { $gt: currentDate }, // Check if the coupon has not expired
                    });
                    if (getEndTimeValidate) {
                        res.status(200).json({
                            valid: true,
                            status: "success",
                            message: "Coupon Validation Successful",
                            discount: getCoupon.discountPercentage,
                        });
                    }
                    else {
                        return res.status(200).json({
                            valid: false,
                            status: "error",
                            message: `Coupon Time Already expired`,
                        });
                    }

                }
                else {
                    return res.status(200).json({
                        valid: false,
                        status: "error",
                        message: `minimum Amount ${getCoupon?.minimumAmount}`,
                    });
                }
            }
            else {
                return res.status(200).json({
                    valid: false,
                    status: "error",
                    message: `Coupon is invalid`,
                });
            }

        }
        else {
            return res.status(200).json({
                valid: false,
                status: "error",
                message: "Please provide a Coupon code",
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Data couldn't be retrieved",
            error: error.message,
        });
    }
};



// get all coupons
const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({}).sort({ _id: -1 });
        res.send(coupons);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

const getCouponById = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        res.send(coupon);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

const updateCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        if (coupon) {
            coupon.title = req.body.title;
            coupon.couponCode = req.body.couponCode;
            coupon.endTime = dayjs().utc().format(req.body.endTime);
            coupon.discountPercentage = req.body.discountPercentage;
            coupon.minimumAmount = req.body.minimumAmount;
            coupon.productType = req.body.productType;
            coupon.logo = req.body.logo;
            await coupon.save();
            res.send({ message: 'Coupon Updated Successfully!' });
        }
    } catch (err) {
        res.status(404).send({ message: 'Coupon not found!' });
    }
};

const deleteCoupon = async (req, res) => {
    try {
        const { _id } = req.user
        const isAdmin = await Admin.findById({ _id: _id })
        const isSeller = await User.findById({ _id: _id })
        if (isAdmin?.role === 'admin') {
            const result = await Coupon.deleteOne({ _id: req.params.id })
            res.status(200).send({
                message: "Coupon Deleted Successfully!",
            });
        }
        if (isSeller?.role === 'seller') {
            const result = await Coupon.deleteOne({ _id: req.params.id })
            res.status(200).send({
                message: "Coupon Deleted Successfully!",
            });
        }

    } catch (error) {
        res.status(500).send({
            message: err.message,
        });
    }

};

module.exports = {
    addCoupon,
    addAllCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon,
    validateCoupon
};