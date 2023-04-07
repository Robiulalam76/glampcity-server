const express = require("express");
const { getPopularProducts, getPopularProductById, addPopularProduct } = require("../controller/popularProductController");
const router = express.Router();

//get a product
// router.post("/:id", getProductById);
router.post("/", addPopularProduct);
router.get("/:id", getPopularProductById);

//get all products
router.get("/", getPopularProducts);

module.exports = router;
