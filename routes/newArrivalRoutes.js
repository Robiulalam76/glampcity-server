const express = require("express");
const { isAuth } = require("../config/auth");
const { getAllNewArrivalProducts, getNewArrivalProductById } = require("../controller/newArrivalController");
const router = express.Router();

//get a product
// router.post("/:id", getProductById);
router.get("/:id", getNewArrivalProductById);

//get all products
router.get("/", getAllNewArrivalProducts);

module.exports = router;
