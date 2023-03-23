const express = require("express");
const { addToCart, getCartProducts, deleteCartProduct } = require("../controller/cartProductController");

const router = express.Router();

router.post("/", addToCart);

//get all products
router.get("/:userId", getCartProducts);
router.delete("/:id", deleteCartProduct);

module.exports = router;
