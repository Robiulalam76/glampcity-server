const express = require("express");
const router = express.Router();

const {
  getStoreById,
  getStoreByUsername,
  addStore,
  getStore,
  addStoreBySeller,
  deleteSingleStore,
  getVerifiedStores,
} = require("../controller/storeController");
// const { protect } = require("../middleware/authMiddleware");

router.route("/").post(addStore).get(getStore);
router.route("/getVerifiedStores").get(getVerifiedStores);
router.route("/:id").get(getStoreById);
router.get("/getInfo/:username", getStoreByUsername);
router.post("/add/:id", addStoreBySeller);
router.delete("/:id", deleteSingleStore);
// router.route("/myorders").get(protect, getMyOrders);
// router.route('/:id/pay').put(protect, updateOrderToPaid)
// router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

module.exports = router;
