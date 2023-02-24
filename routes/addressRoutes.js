const express = require("express");
const router = express.Router();

const {
  getAddressById,
  addAddress,
  getAddress,
} = require("../controller/addressController");
// const { protect } = require("../middleware/authMiddleware");

router.route("/").post(addAddress).get(getAddress);
router.route("/:id").get(getAddressById);
// router.route("/myorders").get(protect, getMyOrders);
// router.route('/:id/pay').put(protect, updateOrderToPaid)
// router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

module.exports = router;
