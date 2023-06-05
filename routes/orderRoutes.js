const express = require("express");
const { createOrder, getOrdersByUserId, getOrdersByStoreId, updateShippingStatusByStoreAndOrderId, getOrderByOrderId } = require("../controller/orderController");
const router = express.Router();

// create order
router.post("/", createOrder)

// get my order by user id
router.get("/my-orders/:userId", getOrdersByUserId)

// get all orders by store id
router.get("/store/:storeId", getOrdersByStoreId)

// update sipping status by store and order id
router.put("/update/status/:storeId/:orderId", updateShippingStatusByStoreAndOrderId)

router.get("/:orderId", getOrderByOrderId)



module.exports = router;