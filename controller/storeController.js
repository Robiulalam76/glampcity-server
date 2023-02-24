// const asyncHandler = require("express-async-handler");
// const products = require("../data/products");
const Product = require("../models/Product");
const Store = require("../models/storeModel");

// @desc Create new order
// @route POST /api/orders
// @access Private
const addStore = async (req, res) => {
  const { owner, name, image, description, address } = req.body;
  console.log(req.body);
  const store = new Store({
    // owner: owner ? owner : req.user._id,
    owner: "6341029b8e67f93114d8550a",
    name,
    image,
    description,
    address
  });

  const createdStore = await store.save();
  res.status(201).json(createdStore);
};

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
const getStore = async (req, res) => {
  const store = await Store.find({});

  if (!store) {
    res.status(200);
    throw new Error("Order list is empty..");
  }
  res.json(store);
};

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getStoreById = async (req, res) => {
  const store = await Store.findById(req.params.id);
  console.log("Params: ", req.params.id);
  const products = await Product.find({ store: `${req.params.id}` });
  console.log("products: ", products);

  if (store) {
    res
      .status(200)
      .json({ store, dataLength: products.length, data: products });
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
};

module.exports = {
  addStore,
  getStore,
  getStoreById,
};
