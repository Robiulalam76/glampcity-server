const express = require('express');
const router = express.Router();
const {
    addCoupon,
    addAllCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon,
} = require('../controller/couponController');
const { isAuth } = require('../config/auth');

//add a coupon
router.post('/add', isAuth, addCoupon);

//add multiple coupon
router.post('/all', isAuth, addAllCoupon);

//get all coupon
router.get('/', getAllCoupons);

//get a coupon
router.get('/:id', getCouponById);

//update a coupon
router.put('/:id', isAuth, updateCoupon);

//delete a coupon
router.delete('/:id', isAuth, deleteCoupon);

module.exports = router;