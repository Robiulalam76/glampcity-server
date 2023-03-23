const express = require("express");
const { addWishlist, getWishlistProducts, deleteWishlistProduct } = require("../controller/wishlistController");

const router = express.Router();

router.post("/", addWishlist);

//get all products
router.get("/:userId", getWishlistProducts);
router.delete("/:id", deleteWishlistProduct);

module.exports = router;
