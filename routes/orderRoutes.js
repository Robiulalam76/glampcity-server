const express = require("express");
const { createOrder } = require("../controller/orderController");
const router = express.Router();


router.post("/", createOrder)
router.get("/allOrders/:storeId",)
router.patch("/update/shipping/:orderId",)



module.exports = router;