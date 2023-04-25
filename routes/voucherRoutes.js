const express = require("express");
const { createVoucher, getAllVouchers, validateVoucher } = require("../controller/voucherController");
const router = express.Router();

// create new Voucher
router.post("/", createVoucher);

// get all vouchers
router.get("/", getAllVouchers);

// get validate voucher
router.get("/validate/:voucher", validateVoucher);


module.exports = router;