const express = require("express");
const { addToCart, getCartProducts, deleteCartProduct, addToCartWithOffer } = require("../controller/cartProductController");

const router = express.Router();

router.post("/", addToCart);
router.post("/addtocart/offer", addToCartWithOffer);

//get all products
router.get("/:userId", getCartProducts);
router.delete("/:id", deleteCartProduct);

module.exports = router;
