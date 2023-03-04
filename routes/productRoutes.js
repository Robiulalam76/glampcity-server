const express = require("express");
const { isAuth } = require("../config/auth");
// const { isAuth } = require("../config/auth");
const router = express.Router();
const {
  getAllProducts,
  getShowingProducts,
  getDiscountedProducts,
  getStockOutProducts,
  getProductById,
  getProductBySlug,
  addProduct,
  addAllProducts,
  updateProduct,
  updateStatus,
  deleteProduct,
  getSearchProducts,
  getProductByParent,
  Stripehandler,
  createProductReview,
} = require("../controller/productController");

//add a product
router.post("/add", addProduct);

//add multiple products
router.post("/all", addAllProducts);

// post payment
router.post("/payment", Stripehandler);

//get a product
// router.post("/:id", getProductById);
router.get("/:id", getProductById);

//get showing products only
router.get("/show", getShowingProducts);

//get discounted products only
router.get("/discount", getDiscountedProducts);

//get all products
router.get("/", getAllProducts);

//get all stock out products
router.get("/stock-out", getStockOutProducts);

//get a product by slug
router.get("/:slug", getProductBySlug);

// search

//get a product by slug
router.get("/cat/:parent", getProductByParent);

router.get("/search/:searchtitle", getSearchProducts);
//update a product
router.put("/:id", updateProduct);

//update a product status
router.put("/status/:id", updateStatus);

//reviews
// router.route("/:id/reviews").post(isAuth, createProductReview);
router.route("/:id/reviews").post(createProductReview);

//delete a product
router.delete("/:id", deleteProduct);

module.exports = router;
