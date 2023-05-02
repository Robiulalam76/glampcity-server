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
  getProductsByParent,
  Stripehandler,
  createProductReview,
  getLatestProducts,
  getProductsBySlugAndChildrenSlug,
  addProperty
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
router.get("/show/all", getShowingProducts);

//get discounted products only
router.get("/discount/all", getDiscountedProducts);

//get all products
router.get("/", getAllProducts);


//get all latest products
router.get("/getProducts/latest", getLatestProducts);

//get all stock out products
router.get("/stock-out", getStockOutProducts);

//get a product by slug
router.get("/:slug", getProductBySlug);

//get a product by parent
// router.get("/cat/:parent", getProductByParent);
router.get("/cat/:slug", getProductsByParent);

// search children_slug
router.get("/cat/:slug/:children_slug", getProductsBySlugAndChildrenSlug);

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


//------------- addProperty
// router.patch("/addProperty", addProperty)

module.exports = router;
