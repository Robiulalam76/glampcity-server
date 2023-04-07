const express = require("express");
const { addTopRankingProduct, getTopRankingProductById, getTopRankingProducts } = require("../controller/topRankingProductController");
const router = express.Router();

//get a product
router.post("/", addTopRankingProduct);
router.get("/:id", getTopRankingProductById);

//get all products
router.get("/", getTopRankingProducts);

module.exports = router;
